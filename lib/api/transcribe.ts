// app/api/transcribe/route.ts
import Groq from "groq-sdk";
import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file");

    if (!file || !(file instanceof Blob)) {
      return NextResponse.json({ error: "No audio file provided" }, { status: 400 });
    }

    // Convert Blob → File so Groq SDK gets a proper filename + type
    const audioFile = new File([file], "recording.webm", { type: file.type });

    // const transcription = await groq.audio.transcriptions.create({
    //   file: audioFile,
    //   model: "whisper-large-v3-turbo",
    //   language: "en",
    //   response_format: "json",  // just .text, no timestamps needed
    //   temperature: 0.0,
    // });
    const transcription = await openai.audio.transcriptions.create({
      file: audioFile,
      model: "gpt-4o-transcribe", 
    });

    return NextResponse.json({ text: transcription.text });
  } catch (err) {
    console.error("Transcription error:", err);
    return NextResponse.json({ error: "Transcription failed" }, { status: 500 });
  }
}