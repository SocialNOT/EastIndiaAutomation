"use client";

import { Button } from "@/components/ui/button";
import { Mic, MicOff, Square, LoaderCircle, AlertTriangle, ShieldAlert } from "lucide-react";
import { useState, useRef, useEffect, useCallback } from "react";
import { textToSpeech, askWebsite } from "@/app/actions";

type VoiceStatus = "idle" | "permission_denied" | "permission_pending" | "listening" | "processing" | "speaking" | "error";

export function VoiceDemo() {
  const [status, setStatus] = useState<VoiceStatus>("idle");
  const [lastTranscript, setLastTranscript] = useState("");
  const [error, setError] = useState<string | null>(null);
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const initializeRecognition = useCallback(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setError("Speech recognition is not supported in this browser.");
      setStatus("error");
      return;
    }

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
      let errorMessage = `Speech recognition error: ${event.error}.`;
      if (event.error === 'not-allowed') {
        errorMessage = "Microphone access was denied. Please enable it in your browser settings to use the voice channel.";
        setStatus("permission_denied");
      } else if (event.error === 'no-speech') {
        errorMessage = "No speech was detected. Please try speaking again.";
      }
      setError(errorMessage);
      setStatus("error");
    };
    
    recognition.onend = () => {
      if (status === 'listening') {
        setStatus("idle");
      }
    };

    recognitionRef.current = recognition;
  }, [status]);
  
  useEffect(() => {
    initializeRecognition();
  }, [initializeRecognition]);

  const handleUserSpeech = async (transcript: string) => {
      setStatus("processing");
      setError(null);
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

  const handleButtonClick = async () => {
    setError(null);

    if (status === 'speaking' && audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
        setStatus('idle');
        return;
    }

    if (status === 'listening' && recognitionRef.current) {
        recognitionRef.current.stop();
        setStatus('idle');
        return;
    }

    // Check permissions first
    try {
      const permissionStatus = await navigator.permissions.query({ name: 'microphone' as PermissionName });
      if (permissionStatus.state === 'denied') {
        setError("Microphone access was denied. Please enable it in your browser settings to use the voice channel.");
        setStatus('permission_denied');
        return;
      }
    } catch (err) {
      console.error("Could not check microphone permissions:", err);
    }
    
    // If we are here, we either have permission or it's 'prompt'
    if (recognitionRef.current) {
      setStatus("listening");
      recognitionRef.current.start();
    } else {
      setError("Speech recognition is not initialized.");
      setStatus("error");
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
      case "permission_denied":
        return (
          <>
            <MicOff className="h-12 w-12" />
            <span className="text-xl font-bold tracking-wider">MIC DENIED</span>
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
      case "permission_denied":
        return "border-destructive/80 bg-destructive/20 text-destructive-foreground cursor-not-allowed";
      case "idle":
      default:
        return "border-accent bg-accent/20 text-accent hover:bg-accent/30";
    }
  }
  
  const getHelperText = () => {
    switch (status) {
        case 'listening': return 'Feel free to speak now.';
        case 'speaking': return 'Agent is responding...';
        case 'permission_denied': return 'Enable mic access in browser settings.';
        case 'error': return 'An error occurred. Please try again.';
        case 'processing': return 'Thinking...';
        default: return 'Click the button to start.';
    }
  }

  return (
    <div className="flex flex-col h-[60vh] items-center justify-center bg-black/5 dark:bg-black/50 border border-accent/20 rounded-lg p-4 gap-8">
      <div className="h-12 text-center text-muted-foreground">
        {error && <p className="text-destructive max-w-sm">{error}</p>}
        {lastTranscript && !error && (
          <>
            <p className="text-xs">You said:</p>
            <p className="font-code text-accent">&quot;{lastTranscript}&quot;</p>
          </>
        )}
      </div>

      <Button
        onClick={handleButtonClick}
        className={`relative flex flex-col items-center justify-center w-64 h-64 rounded-full border-4 transition-all duration-300 ease-in-out font-code ${getButtonClassName()}`}
        disabled={status === "processing" || status === "permission_denied"}
      >
        {getButtonContent()}
      </Button>

      <p className="h-4 text-muted-foreground">
        {getHelperText()}
      </p>
    </div>
  );
}
