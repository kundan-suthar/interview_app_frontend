// lib/transcribeAudio.ts
export async function transcribeAudio(
  audioBlob: Blob,
): Promise<string> {
  const formData = new FormData();
  // Filename extension matters — Groq infers format from it
  formData.append("file", audioBlob, "recording.webm");

  const res = await fetch("/api/transcribe", {
    method: "POST",
    // headers: { Authorization: `Bearer ${accessToken}` },
    body: formData,
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error ?? "Transcription failed");
  }

  const data = await res.json();
  return data.text as string;
}