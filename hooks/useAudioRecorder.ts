// hooks/useAudioRecorder.ts
import { useRef, useState } from "react";

export type RecorderState = "idle" | "recording" | "processing";

export function useAudioRecorder() {
  const [recorderState, setRecorderState] = useState<RecorderState>("idle");
  const [error, setError] = useState<string | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);

  const startRecording = async () => {
    setError(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

      // Pick a MIME type Groq Whisper accepts
      const mimeType = MediaRecorder.isTypeSupported("audio/webm;codecs=opus")
        ? "audio/webm;codecs=opus"
        : "audio/webm";

      const recorder = new MediaRecorder(stream, { mimeType });
      chunksRef.current = [];

      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data);
      };

      mediaRecorderRef.current = recorder;
      recorder.start(250); // collect chunks every 250ms
      setRecorderState("recording");
    } catch (err) {
      setError("Microphone access denied.");
      console.error(err);
    }
  };

  const stopRecording = (): Promise<Blob> => {
    return new Promise((resolve, reject) => {
      const recorder = mediaRecorderRef.current;
      if (!recorder) return reject(new Error("No active recorder"));

      setRecorderState("processing");

      recorder.onstop = () => {
        const blob = new Blob(chunksRef.current, {
          type: recorder.mimeType,
        });
        // Stop all mic tracks to release the mic indicator
        recorder.stream.getTracks().forEach((t) => t.stop());
        resolve(blob);
      };

      recorder.stop();
    });
  };

  const reset = () => setRecorderState("idle");

  return { recorderState, error, startRecording, stopRecording, reset };
}