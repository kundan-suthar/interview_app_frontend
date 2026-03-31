"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Bot,
  User,
  Timer,
  LogOut,
  Mic,
  Volume2,
  SendHorizontal,
  FileText,
  Zap,
  ChevronRight,
  MoreVertical,
} from "lucide-react";
import Link from "next/link";
import { apiClient } from "@/lib/api/client";
import { useParams } from "next/navigation";

interface Message {
  id: string;
  sender: "ai" | "user";
  text: string;
  timestamp: string;
  type?: "follow-up" | "initial";
}

export default function InterviewChatPage() {
  const [input, setInput] = useState("");
  const [timer, setTimer] = useState("12:34");
  const scrollRef = useRef<HTMLDivElement>(null);
  const { thread_id } = useParams();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      sender: "ai",
      text: "Tell me about a challenging project you've led recently. What was the core problem and how did you approach it?",
      timestamp: "12:30",
    },
    {
      id: "2",
      sender: "user",
      text: "Sure! At my last role, I led a migration from monolith to microservices. The main challenge was maintaining 99.9% uptime while decoupling three core data domains that were tightly integrated at the database level.",
      timestamp: "12:32",
    },
    {
      id: "3",
      sender: "ai",
      text: "Interesting. What was the biggest technical challenge during that decoupling phase, and how did you handle data consistency?",
      timestamp: "12:34",
      type: "follow-up",
    },
  ]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  // useEffect(() => {
  //   const payload = {
  //     user_message: "hello",
  //   };
  //   const fetchInterviewSession = async () => {
  //     try {
  //       const response = await apiClient(
  //         `/api/v1/interview/chat/?session_id=${thread_id}`,
  //         {
  //           method: "POST",
  //           body: JSON.stringify(payload),
  //         },
  //       );
  //       console.log(response);
  //       const reader = response?.body?.getReader();
  //       const decoder = new TextDecoder("utf-8");

  //       if (!reader) return;

  //       let done = false;

  //       while (!done) {
  //         const { value, done: doneReading } = await reader.read();
  //         done = doneReading;

  //         const chunk = decoder.decode(value);

  //         // 🔥 Append chunk to last AI message
  //         setMessages((prev) =>
  //           prev.map((msg) =>
  //             msg.id === aiMessageId
  //               ? { ...msg, text: msg.text + chunk }
  //               : msg
  //           )
  //         );
  //     } catch (error) {
  //       console.log("error", error);
  //     }
  //   };
  //   fetchInterviewSession();
  // }, [thread_id]);

  // const handleSend = () => {
  //   if (!input.trim()) return;
  //   const newMessage: Message = {
  //     id: Date.now().toString(),
  //     sender: "user",
  //     text: input,
  //     timestamp: new Date().toLocaleTimeString([], {
  //       hour: "2-digit",
  //       minute: "2-digit",
  //     }),
  //   };
  //   setMessages([...messages, newMessage]);
  //   setInput("");
  // };
  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      sender: "user",
      text: input,
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    const aiMessageId = (Date.now() + 1).toString();

    setMessages((prev) => [
      ...prev,
      {
        id: aiMessageId,
        sender: "ai",
        text: "",
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      },
    ]);

    // ❗ SSE connection
    const eventSource = new EventSource(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/interview/chat?session_id=${thread_id}&user_message=${encodeURIComponent(
        input,
      )}`,
    );

    // 🔹 Token stream
    eventSource.addEventListener("token", (event) => {
      const token = event.data;

      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === aiMessageId ? { ...msg, text: msg.text + token } : msg,
        ),
      );
    });

    // 🔹 Time updates
    eventSource.addEventListener("time", (event) => {
      const timeData = JSON.parse(event.data);
      console.log("time:", timeData);
    });

    // 🔹 Status updates
    eventSource.addEventListener("status", (event) => {
      const status = JSON.parse(event.data);
      console.log("status:", status);
    });

    // 🔹 Done event
    eventSource.addEventListener("done", () => {
      eventSource.close();
    });

    // 🔹 Error handling
    eventSource.onerror = () => {
      eventSource.close();
    };
  };

  return (
    <div className="flex flex-col h-screen bg-(--surface) text-(--on-surface) font-body overflow-hidden dot-grid">
      {/* Header */}
      <header className="h-[72px] border-b border-(--outline-variant)/10 flex items-center justify-between px-8 shrink-0 bg-(--surface)/80 backdrop-blur-md z-50">
        <div className="flex items-center gap-3">
          <Link href="/dashboard" className="flex items-center gap-2 group">
            <div className="w-9 h-9 bg-(--surface-container-highest) rounded-lg flex items-center justify-center group-hover:bg-(--surface-bright) transition-colors">
              <Zap
                className="text-(--primary)"
                size={18}
                fill="currentColor"
                fillOpacity={0.2}
              />
            </div>
            <span className="font-display font-bold text-lg tracking-tight">
              Interview
              <span className="font-medium text-(--on-surface-variant)">
                IQ
              </span>
            </span>
          </Link>
        </div>

        <div className="flex flex-col items-center">
          <h1 className="text-sm font-display font-bold tracking-wide">
            Software Engineer @ Google — Round 1
          </h1>
          <span className="text-[10px] font-bold text-(--on-surface-variant) uppercase tracking-[0.2em] mt-0.5">
            Live Simulation
          </span>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 bg-(--surface-container-low) px-4 py-2 rounded-xl border border-(--outline-variant)/10">
            <Timer size={14} className="text-(--error)" />
            <span className="text-sm font-bold font-mono tracking-wider text-(--on-surface)">
              {timer}
            </span>
          </div>
          <button className="flex items-center gap-2 bg-(--error)/10 hover:bg-(--error)/20 text-(--error) px-4 py-2 rounded-xl border border-(--error)/20 transition-all font-bold text-sm">
            <LogOut size={16} />
            End Interview
          </button>
        </div>
      </header>

      {/* Main Content Split */}
      <main className="flex-1 flex flex-row  overflow-hidden relative">
        {/* Video Feeds Section */}

        <section className="grid grid-rows-2 grid-cols-1 gap-6 p-6 w-2/5">
          {/* AI Interviewer */}
          <div className="relative group rounded-2xl overflow-hidden bg-(--surface-container-lowest) border border-(--outline-variant)/10  flex items-center justify-center">
            {/* Background Grid/Effect */}
            <div className="absolute inset-0 dot-grid opacity-30" />

            {/* AI Avatar Central */}
            <div className="relative">
              <div className="w-24 h-24 rounded-full bg-(--surface-container-highest) flex items-center justify-center relative z-10 border border-(--primary)/20 shadow-[0_0_50px_rgba(106,242,222,0.15)] animate-pulse">
                <Bot size={40} className="text-(--primary)" />
              </div>
              {/* Outer Glows */}
              <div className="absolute inset-0 bg-(--primary) opacity-20 blur-3xl rounded-full scale-150 animate-pulse" />
            </div>

            {/* Badge */}
            <div className="absolute bottom-4 left-4 flex items-center gap-2 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/5">
              <div className="w-2 h-2 rounded-full bg-(--primary) animate-pulse" />
              <span className="text-[10px] font-bold uppercase tracking-wider">
                AI Interviewer
              </span>
            </div>

            {/* Audio Indicator */}
            <div className="absolute bottom-4 right-4 w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center border border-white/5">
              <Volume2 size={14} className="text-(--on-surface-variant)" />
            </div>
          </div>

          {/* User Video (Fallback/Placeholder) */}
          <div className="relative group rounded-2xl overflow-hidden bg-(--surface-container-lowest) border border-(--outline-variant)/10 flex items-center justify-center">
            {/* AI Avatar Central */}
            <div className="w-20 h-20 rounded-full bg-(--surface-container-highest) flex items-center justify-center border border-(--outline-variant)/10">
              <User size={36} className="text-(--on-surface-variant)" />
            </div>

            {/* Badge */}
            <div className="absolute bottom-4 left-4 flex items-center gap-2 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/5">
              <span className="text-[10px] font-bold uppercase tracking-wider">
                You
              </span>
            </div>

            {/* Analysis Overlay */}
            {/* <div className="absolute bottom-4 right-4 w-44 glass-panel border border-(--outline-variant)/20 rounded-xl p-4 space-y-4">
              <div className="flex flex-col gap-1">
                <span className="text-[9px] font-bold text-(--on-surface-variant) uppercase tracking-widest">
                  Live Analysis
                </span>
              </div>

              <div className="space-y-3">
                <div className="space-y-1.5">
                  <div className="flex justify-between items-center text-[10px] font-bold">
                    <span>Pacing</span>
                    <span className="text-(--primary)">Excellent</span>
                  </div>
                  <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-primary-gradient w-[85%]" />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <div className="flex justify-between items-center text-[10px] font-bold">
                    <span>Clarity</span>
                    <span className="text-(--secondary)">Good</span>
                  </div>
                  <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-(--secondary) w-[70%]" />
                  </div>
                </div>
              </div>
            </div> */}
          </div>
        </section>
        <div>
          {/* Chat History Section */}
          <section
            ref={scrollRef}
            className="flex-1 h-[80%] overflow-y-auto px-12 py-8 space-y-10 scroll-smooth"
          >
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex items-start gap-4 ${
                  msg.sender === "user" ? "flex-row-reverse" : "flex-row"
                }`}
              >
                {/* Avatar */}
                <div
                  className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 border border-(--outline-variant)/10 ${
                    msg.sender === "ai"
                      ? "bg-(--surface-container-highest)"
                      : "bg-(--surface-container-low)"
                  }`}
                >
                  {msg.sender === "ai" ? (
                    <Bot size={16} className="text-(--primary)" />
                  ) : (
                    <User size={16} className="text-(--on-surface-variant)" />
                  )}
                </div>

                {/* Message Bubble */}
                <div
                  className={`flex flex-col gap-2 max-w-[60%] ${
                    msg.sender === "user" ? "items-end" : "items-start"
                  }`}
                >
                  <div
                    className={`relative p-5 rounded-2xl text-sm leading-relaxed ${
                      msg.sender === "user"
                        ? "bg-white text-black font-medium rounded-tr-none"
                        : "bg-(--surface-container) text-(--on-surface) border border-(--outline-variant)/5 rounded-tl-none"
                    }`}
                  >
                    {msg.type === "follow-up" && (
                      <div className="mb-3">
                        <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-(--primary)/10 text-(--primary) text-[9px] font-bold uppercase tracking-wider border border-(--primary)/20">
                          Follow-up
                        </span>
                      </div>
                    )}
                    {msg.text}
                  </div>

                  <div className="flex items-center gap-2 text-[10px] font-bold text-(--on-surface-variant) uppercase tracking-widest px-1">
                    <span>
                      {msg.sender === "ai" ? "AI Interviewer" : "You"}
                    </span>
                    <span>•</span>
                    <span>{msg.timestamp}</span>
                  </div>
                </div>
              </div>
            ))}
          </section>

          {/* Input Area */}
          <section className="p-8 pt-0">
            <div className="relative group max-w-5xl mx-auto">
              <div className="flex items-center gap-4 bg-(--surface-container-lowest) border border-(--outline-variant)/20 rounded-2xl p-2.5 focus-within:border-(--primary)/50 focus-within:ring-1 focus-within:ring-(--primary)/20 transition-all shadow-2xl">
                <div className="flex-1 px-4">
                  <textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        handleSend();
                      }
                    }}
                    placeholder="Type your answer..."
                    className="w-full bg-transparent border-none focus:ring-0 text-sm py-3 resize-none max-h-32 min-h-[44px] placeholder:text-(--on-surface-variant)/50"
                    rows={1}
                  />
                </div>

                <div className="flex items-center gap-3 pr-2">
                  <button className="p-2 text-(--on-surface-variant) hover:text-(--on-surface) transition-colors hover:bg-white/5 rounded-xl">
                    <FileText size={20} />
                  </button>
                  <button
                    onClick={handleSend}
                    disabled={!input.trim()}
                    className="p-3 bg-primary-gradient text-(--surface) rounded-xl hover:opacity-90 active:scale-95 transition-all disabled:opacity-30 disabled:pointer-events-none shadow-lg shadow-(--primary)/10"
                  >
                    <SendHorizontal size={20} />
                  </button>
                </div>
              </div>

              {/* Hint text - Positioned below the input */}
              <div className="mt-4 flex justify-center items-center gap-1.5 opacity-40">
                <span className="text-[10px] font-medium tracking-wide">
                  Press Enter to send, Shift + Enter for new line
                </span>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
