"use client";

import type Vapi from "@vapi-ai/web";
import { useState, useEffect, useCallback } from "react";
import * as Tone from 'tone';

export type CallStatus = "idle" | "connecting" | "active" | "ended";

export const useVapi = () => {
  const [callStatus, setCallStatus] = useState<CallStatus>("idle");
  const [isSpeechActive, setIsSpeechActive] = useState(false);
  const [speaker, setSpeaker] = useState<'user' | 'bot' | null>(null);
  const [analyser, setAnalyser] = useState<Tone.Analyser | null>(null);
  const [vapi, setVapi] = useState<Vapi | null>(null);

  useEffect(() => {
    // Initialize Vapi on the client side only
    const initializeVapi = async () => {
      const VapiModule = (await import("@vapi-ai/web")).default;
      const publicKey = process.env.NEXT_PUBLIC_VAPI_PUBLIC_KEY;
      if (!publicKey || publicKey === "your-vapi-public-key-here") {
        console.warn("VAPI public key not found or is a placeholder. Voice demo will be disabled.");
        setCallStatus("ended");
        return;
      }
      setVapi(new VapiModule(publicKey));
    };
    initializeVapi();
  }, []);

  const start = useCallback(async () => {
    if (!vapi) {
        setCallStatus("ended");
        console.error("Vapi is not initialized. Please check your VAPI_PUBLIC_KEY.");
        return;
    };
    setCallStatus("connecting");
    const assistantId = process.env.NEXT_PUBLIC_VAPI_ASSISTANT_ID;
    if (!assistantId || assistantId === "your-vapi-assistant-id-here") {
        console.error("VAPI assistant ID not found or is a placeholder. Cannot start call.");
        setCallStatus("ended");
        return;
    }

    try {
        await Tone.start();
        const newAnalyser = new Tone.Analyser("waveform", 1024);

        vapi.start(assistantId);

        // Connect microphone to analyser
        const mic = new Tone.UserMedia();
        await mic.open();
        mic.connect(newAnalyser);

        // Connect assistant audio to analyser
        const assistantNode = vapi.getAudioNode();
        if (assistantNode) {
            Tone.connect(assistantNode, newAnalyser);
        } else {
            console.warn("Could not get Vapi audio node to connect to visualizer.");
        }

        setAnalyser(newAnalyser);

    } catch (e) {
        console.error("Error starting Vapi call or Tone.js:", e);
        setCallStatus("ended");
    }

  }, [vapi]);

  const stop = useCallback(() => {
    if (!vapi) return;
    setCallStatus("ended");
    vapi.stop();
  }, [vapi]);

  useEffect(() => {
    if (!vapi) return;

    const onCallStart = () => setCallStatus("active");
    const onCallEnd = () => {
      setCallStatus("ended");
      analyser?.dispose();
      setAnalyser(null);
    };
    const onSpeechStart = (payload: any) => {
        setIsSpeechActive(true);
        setSpeaker(payload.role === 'assistant' ? 'bot' : 'user');
    };
    const onSpeechEnd = () => {
        setIsSpeechActive(false);
        setSpeaker(null);
    };
    const onError = (e: any) => {
      console.error(e);
      setCallStatus("ended");
    };

    vapi.on("call-start", onCallStart);
    vapi.on("call-end", onCallEnd);
    vapi.on("speech-start", onSpeechStart);
    vapi.on("speech-end", onSpeechEnd);
    vapi.on("error", onError);

    return () => {
      vapi.off("call-start", onCallStart);
      vapi.off("call-end", onCallEnd);
      vapi.off("speech-start", onSpeechStart);
      vapi.off("speech-end", onSpeechEnd);
      vapi.off("error", onError);
    };
  }, [vapi, analyser]);

  return { callStatus, isSpeechActive, speaker, analyser, start, stop };
};
