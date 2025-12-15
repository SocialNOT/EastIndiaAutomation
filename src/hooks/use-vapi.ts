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
      try {
        const VapiModule = (await import("@vapi-ai/web")).default;
        const publicKey = process.env.NEXT_PUBLIC_VAPI_PUBLIC_KEY;
        const assistantId = process.env.NEXT_PUBLIC_VAPI_ASSISTANT_ID;

        if (!publicKey) {
          setError("Vapi Error: `NEXT_PUBLIC_VAPI_PUBLIC_KEY` is not configured in the environment. Voice agent is disabled.");
          setCallStatus("error");
          return;
        }
         if (!assistantId) {
          setError("Vapi Error: `NEXT_PUBLIC_VAPI_ASSISTANT_ID` is not configured. Voice agent is disabled.");
          setCallStatus("error");
          return;
        }

        const vapi = new VapiModule(publicKey);
        setVapiInstance(vapi);

        vapi.on("call-start", () => setCallStatus("active"));
        vapi.on("call-end", () => {
          setCallStatus("ended");
          analyser?.dispose();
          setAnalyser(null);
        });
        vapi.on("speech-start", (payload: any) => {
            setIsSpeechActive(true);
            setSpeaker(payload.role === 'assistant' ? 'bot' : 'user');
        });
        vapi.on("speech-end", () => {
            setIsSpeechActive(false);
            setSpeaker(null);
        });
        vapi.on("error", (e: any) => {
          const errorMessage = e?.message || "An unknown Vapi error occurred.";
          setError(errorMessage);
          console.error("Vapi SDK Error:", e);
          setCallStatus("error");
        });

      } catch (e: any) {
        console.error("Failed to initialize Vapi:", e);
        setError(`Initialization failed: ${e.message}`);
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  const start = useCallback(async () => {
    if (!vapiInstance) {
        setError("Vapi is not initialized. Cannot start call.");
        setCallStatus("error");
        return;
    }
    
    setCallStatus("connecting");
    const assistantId = process.env.NEXT_PUBLIC_VAPI_ASSISTANT_ID;

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

    } catch (e: any) {
        console.error("Error starting Vapi call or Tone.js:", e);
        setError(`Failed to start audio session: ${e.message}. Please check microphone permissions.`);
        setCallStatus("error");
    }

  }, [vapiInstance]);

  const stop = useCallback(() => {
    if (!vapiInstance) return;
    setCallStatus("ended");
    vapiInstance.stop();
  }, [vapiInstance]);

  return { callStatus, isSpeechActive, speaker, analyser, error, start, stop };
};
