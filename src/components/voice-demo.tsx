"use client";

import { Button } from "@/components/ui/button";
import { useVapi, type CallStatus } from "@/hooks/use-vapi";
import { cn } from "@/lib/utils";
import { Mic, MicOff, PhoneOff, CircleDotDashed, AlertTriangle } from "lucide-react";
import { useEffect, useRef } from "react";
import * as Tone from "tone";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";

const WaveformVisualizer = ({ analyser, speaker }: { analyser: Tone.Analyser | null, speaker: 'user' | 'bot' | null }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    let animationFrameId: number;

    const draw = () => {
      animationFrameId = requestAnimationFrame(draw);
      if (!canvasRef.current || !analyser) return;

      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");
      if (!context) return;

      const values = analyser.getValue();
      context.clearRect(0, 0, canvas.width, canvas.height);
      
      let color = speaker === 'bot' ? 'hsl(var(--accent))' : "hsl(var(--primary))";

      context.lineWidth = 2;
      context.strokeStyle = color;
      context.beginPath();

      const sliceWidth = (canvas.width * 1.0) / values.length;
      let x = 0;

      for (let i = 0; i < values.length; i++) {
        const v = (values[i] as number) / 2.0;
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

    if (analyser) {
      draw();
    }

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [analyser, speaker]);

  return <canvas ref={canvasRef} className="w-full h-full" />;
};


export function VoiceDemo() {
  const { callStatus, isSpeechActive, speaker, start, stop, analyser, error } = useVapi();

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
        return (
          <>
            <CircleDotDashed className="h-12 w-12 animate-spin" />
            <span className="text-xl font-bold tracking-wider">CONNECTING...</span>
          </>
        );
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
      case "error":
        return (
            <>
                <AlertTriangle className="h-12 w-12" />
                <span className="text-xl font-bold tracking-wider">ERROR</span>
            </>
        )
    }
  };

  const handleButtonClick = () => {
    if (callStatus === "active" || callStatus === "connecting") {
      stop();
    } else {
      start();
    }
  };
  
  if (error) {
    return (
        <div className="flex flex-col h-[60vh] items-center justify-center bg-black/5 dark:bg-black/50 border border-destructive/50 rounded-lg p-4 gap-4 text-center">
            <Alert variant="destructive">
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>Voice Agent Error</AlertTitle>
                <AlertDescription>
                    {error}
                </AlertDescription>
            </Alert>
        </div>
    )
  }


  return (
    <div className="flex flex-col h-[60vh] items-center justify-center bg-black/5 dark:bg-black/50 border border-accent/20 rounded-lg p-4 gap-8">
      <p className="text-muted-foreground text-center">Experience real-time accent-agnostic voice AI.</p>
      <div className="relative w-full h-32">
        {(callStatus === 'active') && <WaveformVisualizer analyser={analyser} speaker={speaker} />}
      </div>
      <Button
        onClick={handleButtonClick}
        className={cn(
            "relative flex flex-col items-center justify-center w-64 h-64 rounded-full border-4 transition-all duration-300 ease-in-out font-code",
            "disabled:pointer-events-none",
            callStatus === 'connecting' && 'animate-pulse border-accent/80 bg-accent/20 text-accent',
            callStatus === 'active' && 'border-destructive/80 bg-destructive/20 text-destructive-foreground hover:bg-destructive/30',
            callStatus === 'idle' && 'border-accent bg-accent/20 text-accent hover:bg-accent/30',
            callStatus === 'ended' && 'border-muted-foreground bg-muted/20 text-muted-foreground',
            callStatus === 'error' && 'border-destructive/80 bg-destructive/20 text-destructive-foreground'
        )}
        disabled={callStatus === "ended" || callStatus === "error"}
      >
        {getButtonContent(callStatus)}
      </Button>
      <p className="text-muted-foreground h-4 text-accent">
        {callStatus === 'active' ? (isSpeechActive ? (speaker === 'bot' ? "AI is speaking..." : "You are speaking...") : "Listening...") : ""}
      </p>
    </div>
  );
}
