"use client";

import type Vapi from "@vapi-ai/web";
import { useState, useEffect, useCallback } from "react";
import type { Analyser } from 'tone';

export type CallStatus = "idle" | "connecting" | "active" | "ended" | "error";

export const useVapi = () => {
  const [callStatus, setCallStatus] = useState<CallStatus>("idle");
  const [isSpeechActive, setIsSpeechActive] = useState(false);
  const [speaker, setSpeaker] = useState<'user' | 'bot' | null>(null);
  const [analyser, setAnalyser] = useState<Analyser | null>(null);
  const [vapiInstance, setVapiInstance] = useState<Vapi | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const initializeVapi = async () => {
      const VapiModule = (await import("@vapi-ai/web")).default;
      const publicKey = process.env.NEXT_PUBLIC_VAPI_PUBLIC_KEY;
      
      if (publicKey && publicKey !== "YOUR_VAPI_PUBLIC_KEY_HERE") {
        setVapiInstance(new VapiModule(publicKey));
      } else {
        setError("VAPI public key is missing. Please add NEXT_PUBLIC_VAPI_PUBLIC_KEY to your .env.local file.");
        setCallStatus("error");
      }
    };
    initializeVapi();

    return () => {
      setVapiInstance(v => {
        v?.destroy();
        return null;
      });
    };
  }, []); 


  const start = useCallback(async () => {
    if (!vapiInstance) {
        setError("Vapi is not initialized.");
        setCallStatus("error");
        return;
    };
    setCallStatus("connecting");
    const assistantId = process.env.NEXT_PUBLIC_VAPI_ASSISTANT_ID;
    if (!assistantId || assistantId === "YOUR_VAPI_ASSISTANT_ID_HERE") {
        setError("VAPI assistant ID is missing. Please add NEXT_PUBLIC_VAPI_ASSISTANT_ID to your .env.local file.");
        setCallStatus("error");
        return;
    }

    try {
        const Tone = await import('tone');
        await Tone.start();
        const newAnalyser = new Tone.Analyser("waveform", 1024);

        vapiInstance.start(assistantId);

        const mic = new Tone.UserMedia();
        await mic.open();
        mic.connect(newAnalyser);

        const assistantNode = vapiInstance.getAudioNode();
        if (assistantNode) {
            Tone.connect(assistantNode, newAnalyser);
        } else {
            console.warn("Could not get Vapi audio node to connect to visualizer.");
        }

        setAnalyser(newAnalyser);

    } catch (e) {
        console.error("Error starting Vapi call or Tone.js:", e);
        setError("Failed to start audio session.");
        setCallStatus("error");
    }

  }, [vapiInstance]);

  const stop = useCallback(() => {
    if (!vapiInstance) return;
    setCallStatus("ended");
    vapiInstance.stop();
  }, [vapiInstance]);

  useEffect(() => {
    if (!vapiInstance) return;

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
      const errorMessage = e?.message || "An unknown Vapi error occurred.";
      setError(errorMessage);
      console.error(e);
      setCallStatus("error");
    };

    vapiInstance.on("call-start", onCallStart);
    vapiInstance.on("call-end", onCallEnd);
    vapiInstance.on("speech-start", onSpeechStart);
    vapiInstance.on("speech-end", onSpeechEnd);
    vapiInstance.on("error", onError);

    return () => {
      vapiInstance.off("call-start", onCallStart);
      vapiInstance.off("call-end", onCallEnd);
      vapiInstance.off("speech-start", onSpeechStart);
      vapiInstance.off("speech-end", onSpeechEnd);
      vapiInstance.off("error", onError);
    };
  }, [vapiInstance, analyser]);

  return { callStatus, isSpeechActive, speaker, analyser, error, start, stop };
};
