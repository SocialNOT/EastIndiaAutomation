"use client";

import { Button } from "@/components/ui/button";
import { useVapi, type CallStatus } from "@/hooks/use-vapi";
import { cn } from "@/lib/utils";
import { Mic, MicOff, PhoneOff } from "lucide-react";
import { useEffect, useRef } from "react";
import * as Tone from "tone";

const WaveformVisualizer = ({ speaker }: { speaker: 'user' | 'bot' | null }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const analyserRef = useRef<Tone.Analyser | null>(null);
  const userMediaRef = useRef<Tone.UserMedia | null>(null);

  useEffect(() => {
    let animationFrameId: number;

    const setupAudio = async () => {
      try {
        await Tone.start();
        userMediaRef.current = new Tone.UserMedia();
        await userMediaRef.current.open();

        analyserRef.current = new Tone.Analyser("waveform", 1024);
        userMediaRef.current.connect(analyserRef.current);
      } catch (error) {
        console.error("Error setting up audio:", error);
      }
    };

    setupAudio();

    const draw = () => {
      animationFrameId = requestAnimationFrame(draw);
      if (!canvasRef.current || !analyserRef.current) return;

      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");
      const analyser = analyserRef.current;

      if (!context) return;

      const values = analyser.getValue();
      context.clearRect(0, 0, canvas.width, canvas.height);
      
      let color = "hsl(var(--primary))"; // Bronze for user
      if(speaker === 'bot') {
        color = 'rgb(34 211 238)'; // Electric Cyan for bot
      }

      context.lineWidth = 2;
      context.strokeStyle = color;
      context.beginPath();

      const sliceWidth = (canvas.width * 1.0) / values.length;
      let x = 0;

      for (let i = 0; i < values.length; i++) {
        const v = (values[i] as number) / 2.0; // values are -1 to 1
        const y = (v * canvas.height) / 2 + canvas.height / 2;

        if (i === 0) {
          context.moveTo(x, y);
        } else {
          context.lineTo(x, y);
        }

        x += sliceWidth;
      }

      context.lineTo(canvas.width, canvas.height / 2);
      context.stroke();
    };

    draw();

    return () => {
      cancelAnimationFrame(animationFrameId);
      userMediaRef.current?.close();
    };
  }, [speaker]);

  return <canvas ref={canvasRef} className="w-full h-full" />;
};


export function VoiceDemo() {
  const { callStatus, isSpeechActive, speaker, start, stop } = useVapi();

  const getButtonContent = (status: CallStatus) => {
    switch (status) {
      case "idle":
        return (
          <>
            <Mic className="h-12 w-12" />
            <span className="text-xl font-bold tracking-wider">ACTIVATE MIC</span>
          </>
        );
      case "connecting":
        return <span className="text-xl font-bold tracking-wider">CONNECTING...</span>;
      case "active":
        return (
          <>
            <PhoneOff className="h-12 w-12" />
            <span className="text-xl font-bold tracking-wider">END CALL</span>
          </>
        );
      case "ended":
        return (
          <>
            <MicOff className="h-12 w-12" />
            <span className="text-xl font-bold tracking-wider">CALL ENDED</span>
          </>
        );
    }
  };

  const handleButtonClick = () => {
    if (callStatus === "active" || callStatus === "connecting") {
      stop();
    } else {
      start();
    }
  };

  return (
    <div className="flex flex-col h-[60vh] items-center justify-center bg-black/50 border border-primary/20 rounded-lg p-4 gap-8">
      <div className="relative w-full h-32">
        {(callStatus === 'active' && isSpeechActive) && <WaveformVisualizer speaker={speaker} />}
      </div>
      <Button
        onClick={handleButtonClick}
        className={cn(
            "relative flex flex-col items-center justify-center w-64 h-64 rounded-full border-4 transition-all duration-300 ease-in-out",
            callStatus === 'connecting' && 'animate-pulse',
            callStatus === 'active' && 'border-destructive/80 bg-destructive/20 text-destructive-foreground hover:bg-destructive/30',
            callStatus === 'idle' && 'border-primary bg-primary/20 text-primary-foreground hover:bg-primary/30',
            callStatus === 'ended' && 'border-muted-foreground bg-muted/20 text-muted-foreground cursor-not-allowed'
        )}
        disabled={callStatus === "ended"}
      >
        {getButtonContent(callStatus)}
      </Button>
      <p className="text-muted-foreground h-4">
        {callStatus === 'active' ? (isSpeechActive ? (speaker === 'bot' ? "AI is speaking..." : "You are speaking...") : "Listening...") : ""}
      </p>
    </div>
  );
}
