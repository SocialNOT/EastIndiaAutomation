"use client";

import Vapi from "@vapi-ai/web";
import { useState, useMemo, useEffect, useCallback } from "react";

export type CallStatus = "idle" | "connecting" | "active" | "ended";

export const useVapi = () => {
  const [callStatus, setCallStatus] = useState<CallStatus>("idle");
  const [isSpeechActive, setIsSpeechActive] = useState(false);
  const [speaker, setSpeaker] = useState<'user' | 'bot' | null>(null);

  const vapi = useMemo(() => {
    const publicKey = process.env.NEXT_PUBLIC_VAPI_PUBLIC_KEY;
    if (!publicKey) {
      console.error("VAPI public key not found in environment variables.");
      return null;
    }
    return new Vapi(publicKey);
  }, []);

  const start = useCallback(() => {
    if (!vapi) return;
    setCallStatus("connecting");
    const assistantId = process.env.NEXT_PUBLIC_VAPI_ASSISTANT_ID;
    if (!assistantId) {
        console.error("VAPI assistant ID not found.");
        setCallStatus("ended");
        return;
    }
    vapi.start(assistantId);
  }, [vapi]);

  const stop = useCallback(() => {
    if (!vapi) return;
    setCallStatus("ended");
    vapi.stop();
  }, [vapi]);

  useEffect(() => {
    if (!vapi) return;

    const onCallStart = () => setCallStatus("active");
    const onCallEnd = () => setCallStatus("ended");
    const onSpeechStart = (payload: any) => {
        setIsSpeechActive(true)
        setSpeaker(payload.role === 'assistant' ? 'bot' : 'user');
    };
    const onSpeechEnd = () => {
        setIsSpeechActive(false)
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
  }, [vapi]);

  return { callStatus, isSpeechActive, speaker, start, stop };
};
