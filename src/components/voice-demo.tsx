"use client";

import { Button } from "@/components/ui/button";
import { Mic, MicOff, Square, LoaderCircle, AlertTriangle } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { textToSpeech, askWebsite } from "@/app/actions";

type VoiceStatus = "idle" | "listening" | "processing" | "speaking" | "error";

export function VoiceDemo() {
  const [status, setStatus] = useState<VoiceStatus>("idle");
  const [lastTranscript, setLastTranscript] = useState("");
  const [error, setError] = useState<string | null>(null);
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-US';

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setLastTranscript(transcript);
        handleUserSpeech(transcript);
      };

      recognition.onerror = (event) => {
        console.error("Speech recognition error", event.error);
        setError(`Speech recognition error: ${event.error}. Please ensure microphone access is granted.`);
        setStatus("error");
      };
      
      recognition.onend = () => {
        if (status === 'listening') {
          setStatus("idle");
        }
      };

      recognitionRef.current = recognition;
    } else {
      setError("Speech recognition is not supported in this browser.");
      setStatus("error");
    }
  }, [status]);
  
  const handleUserSpeech = async (transcript: string) => {
      setStatus("processing");
      let fullTextResponse = "";

      try {
        const stream = await askWebsite({ question: transcript });
        const reader = stream.getReader();
        const decoder = new TextDecoder();

        while (true) {
          const { value, done } = await reader.read();
          if (done) break;
          fullTextResponse += decoder.decode(value, { stream: true });
        }
        
        if (fullTextResponse) {
          const { audioBase64, error: ttsError } = await textToSpeech({ text: fullTextResponse });
          if (ttsError || !audioBase64) {
            throw new Error(ttsError || "Failed to generate audio.");
          }

          const audioSrc = `data:audio/mp3;base64,${audioBase64}`;
          const audio = new Audio(audioSrc);
          audioRef.current = audio;

          audio.onplay = () => setStatus("speaking");
          audio.onended = () => setStatus("idle");
          audio.onerror = () => {
            setError("Failed to play audio response.");
            setStatus("error");
          };
          audio.play();

        } else {
          throw new Error("Received an empty response from the AI.");
        }

      } catch (e: any) {
        console.error("Voice demo error:", e);
        setError(e.message || "An unexpected error occurred.");
        setStatus("error");
      }
  };


  const handleButtonClick = () => {
    if (status === "idle") {
      recognitionRef.current?.start();
      setStatus("listening");
    } else if (status === "listening") {
      recognitionRef.current?.stop();
      setStatus("idle");
    } else if (status === 'speaking') {
      audioRef.current?.pause();
      setStatus('idle');
    }
  };

  const getButtonContent = () => {
    switch (status) {
      case "listening":
        return (
          <>
            <Mic className="h-12 w-12" />
            <span className="text-xl font-bold tracking-wider">LISTENING...</span>
          </>
        );
      case "processing":
        return (
          <>
            <LoaderCircle className="h-12 w-12 animate-spin" />
            <span className="text-xl font-bold tracking-wider">PROCESSING</span>
          </>
        );
      case "speaking":
        return (
          <>
            <Square className="h-12 w-12" />
            <span className="text-xl font-bold tracking-wider">STOP</span>
          </>
        );
      case "error":
         return (
          <>
            <AlertTriangle className="h-12 w-12" />
            <span className="text-xl font-bold tracking-wider">ERROR</span>
          </>
        );
      case "idle":
      default:
        return (
          <>
            <Mic className="h-12 w-12" />
            <span className="text-xl font-bold tracking-wider">ACTIVATE MIC</span>
          </>
        );
    }
  };

  const getButtonClassName = () => {
     switch (status) {
      case "listening":
        return "border-destructive/80 bg-destructive/20 text-destructive-foreground animate-pulse";
      case "processing":
        return "border-accent/80 bg-accent/20 text-accent cursor-not-allowed";
      case "speaking":
        return "border-accent/80 bg-accent/20 text-accent-foreground";
      case "error":
        return "border-destructive/80 bg-destructive/20 text-destructive-foreground cursor-not-allowed";
      case "idle":
      default:
        return "border-accent bg-accent/20 text-accent hover:bg-accent/30";
    }
  }

  return (
    <div className="flex flex-col h-[60vh] items-center justify-center bg-black/5 dark:bg-black/50 border border-accent/20 rounded-lg p-4 gap-8">
      <div className="h-12 text-center text-muted-foreground">
        {status === 'error' && <p className="text-destructive max-w-sm">{error}</p>}
        {lastTranscript && status !== 'error' && (
          <>
            <p className="text-xs">You said:</p>
            <p className="font-code text-accent">&quot;{lastTranscript}&quot;</p>
          </>
        )}
      </div>

      <Button
        onClick={handleButtonClick}
        className={`relative flex flex-col items-center justify-center w-64 h-64 rounded-full border-4 transition-all duration-300 ease-in-out font-code ${getButtonClassName()}`}
        disabled={status === "processing" || status === "error"}
      >
        {getButtonContent()}
      </Button>

      <p className="h-4 text-muted-foreground">
        {status === 'listening' ? "Feel free to speak now." : status === 'speaking' ? "Agent is responding..." : "Click the button to start."}
      </p>
    </div>
  );
}
