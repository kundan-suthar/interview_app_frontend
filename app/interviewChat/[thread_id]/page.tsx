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
import { useAuthStore } from "@/store/authStore";

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
  const [messages, setMessages] = useState<Message[]>([]);

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
  const readChatStream = async (query: string, aiId: string) => {
    const { accessToken } = useAuthStore.getState();
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/interview/chat?session_id=${thread_id}&user_message=${encodeURIComponent(query)}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        },
      });

      const reader = res.body?.getReader();
      if (!reader) return;

      const decoder = new TextDecoder();
      let buffer = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        // Append new chunk to buffer and split by SSE message delimiter
        buffer += decoder.decode(value, { stream: true });
        const parts = buffer.split("\n\n");
        buffer = parts.pop() || "";

        for (const part of parts) {
          if (!part.trim()) continue;

          const lines = part.split("\n");
          let eventType = "";
          let data = "";

          for (const line of lines) {
            if (line.startsWith("event: ")) {
              eventType = line.slice(7).trim();
            } else if (line.startsWith("data: ")) {
              data = line.slice(6);
            }
          }

          // If it's a 'token' event, append data to the current AI message
          if (eventType === "token" && data) {
            setMessages((prev) =>
              prev.map((msg) =>
                msg.id === aiId ? { ...msg, text: msg.text + data } : msg
              )
            );
          }
        }
      }
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  const handleSend = async (query: string) => {
    if (!query.trim()) return;

    const currentInput = query;
    setInput("");

    // Add user message to UI immediately
    const userMessage: Message = {
      id: Date.now().toString(),
      sender: "user",
      text: currentInput,
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
    setMessages((prev) => [...prev, userMessage]);

    // Prepare a placeholder for the AI streaming response
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

    await readChatStream(currentInput, aiMessageId);
  };
  const hasRun = useRef(false);

  useEffect(() => {
    if (hasRun.current) return;
    hasRun.current = true;

    const getFirstMessage = async () => {
      const aiMessageId = Date.now().toString();

      // Add a placeholder for the first AI message
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

      // Trigger the stream for the initial greeting
      await readChatStream("Hello", aiMessageId);

    };

    if (thread_id) {
      getFirstMessage();
    }


  }, [thread_id]);

  return (
    <div className="flex flex-col h-[100dvh] bg-(--surface) text-(--on-surface) font-body overflow-hidden dot-grid">
      {/* Header */}
      <header className="h-[64px] lg:h-[72px] border-b border-(--outline-variant)/10 flex items-center justify-between px-4 lg:px-8 shrink-0 bg-(--surface)/80 backdrop-blur-md z-50">
        <div className="flex items-center gap-3">
          <Link href="/dashboard" className="flex items-center gap-2 group">
            <div className="w-8 h-8 lg:w-9 lg:h-9 bg-(--surface-container-highest) rounded-lg flex items-center justify-center group-hover:bg-(--surface-bright) transition-colors">
              <Zap
                className="text-(--primary)"
                size={16}
                fill="currentColor"
                fillOpacity={0.2}
              />
            </div>
            <span className="font-display font-bold text-base lg:text-lg tracking-tight hidden sm:inline">
              Interview
              <span className="font-medium text-(--on-surface-variant)">
                IQ
              </span>
            </span>
          </Link>
        </div>

        <div className="flex flex-col items-center flex-1 mx-2 min-w-0">
          <h1 className="text-xs lg:text-sm font-display font-bold tracking-wide truncate max-w-full">
            Software Engineer <span className="hidden sm:inline">@ Google — Round 1</span>
          </h1>
          <span className="text-[9px] lg:text-[10px] font-bold text-(--on-surface-variant) uppercase tracking-[0.2em] mt-0.5 whitespace-nowrap">
            Live Simulation
          </span>
        </div>

        <div className="flex items-center gap-2 lg:gap-4">
          <div className="flex items-center gap-2 bg-(--surface-container-low) px-2 lg:px-4 py-1.5 lg:py-2 rounded-xl border border-(--outline-variant)/10">
            <Timer size={14} className="text-(--error)" />
            <span className="text-xs lg:text-sm font-bold font-mono tracking-wider text-(--on-surface)">
              {timer}
            </span>
          </div>
          <button className="flex items-center gap-2 bg-(--error)/10 hover:bg-(--error)/20 text-(--error) px-2 lg:px-4 py-1.5 lg:py-2 rounded-xl border border-(--error)/20 transition-all font-bold text-xs lg:text-sm">
            <LogOut size={16} />
            <span className="hidden sm:inline">End Interview</span>
          </button>
        </div>
      </header>

      {/* Main Content Split */}
      <main className="flex-1 flex flex-col lg:flex-row overflow-hidden relative">
        {/* Video Feeds Section */}
        <section className="hidden sm:flex sm:flex-row lg:flex-col lg:w-2/5 gap-3 lg:gap-6 p-4 lg:p-6 shrink-0 h-[200px] lg:h-auto overflow-x-auto lg:overflow-y-auto no-scrollbar ">
          {/* AI Interviewer */}
          <div className="relative group rounded-2xl overflow-hidden bg-(--surface-container-lowest) border border-(--outline-variant)/10 flex-1 flex items-center justify-center min-w-[200px] lg:min-w-0 lg:h-[calc(50%-12px)]">
            <div className="absolute inset-0 dot-grid opacity-30" />
            <div className="relative">
              <div className="w-16 h-16 lg:w-24 lg:h-24 rounded-full bg-(--surface-container-highest) flex items-center justify-center relative z-10 border border-(--primary)/20 shadow-[0_0_50px_rgba(106,242,222,0.15)] animate-pulse">
                <Bot size={28} className="text-(--primary) lg:size-[40px]" />
              </div>
              <div className="absolute inset-0 bg-(--primary) opacity-20 blur-3xl rounded-full scale-150 animate-pulse" />
            </div>

            <div className="absolute bottom-3 lg:bottom-4 left-3 lg:left-4 flex items-center gap-2 bg-black/40 backdrop-blur-md px-2 lg:px-3 py-1 rounded-lg border border-white/5">
              <div className="w-1.5 h-1.5 rounded-full bg-(--primary) animate-pulse" />
              <span className="text-[9px] lg:text-[10px] font-bold uppercase tracking-wider">
                AI Interviewer
              </span>
            </div>

            <div className="absolute bottom-3 lg:bottom-4 right-3 lg:right-4 w-6 h-6 lg:w-8 lg:h-8 rounded-lg bg-white/5 flex items-center justify-center border border-white/5">
              <Volume2 size={12} className="text-(--on-surface-variant) lg:size-[14px]" />
            </div>
          </div>

          {/* User Video Placeholder */}
          <div className="relative group rounded-2xl overflow-hidden bg-(--surface-container-lowest) border border-(--outline-variant)/10 flex-1 flex items-center justify-center min-w-[200px] lg:min-w-0 lg:h-[calc(50%-12px)]">
            <div className="w-16 h-16 lg:w-20 lg:h-20 rounded-full bg-(--surface-container-highest) flex items-center justify-center border border-(--outline-variant)/10">
              <User size={28} className="text-(--on-surface-variant) lg:size-[36px]" />
            </div>
            <div className="absolute bottom-3 lg:bottom-4 left-3 lg:left-4 flex items-center gap-2 bg-black/40 backdrop-blur-md px-2 lg:px-3 py-1 rounded-lg border border-white/5">
              <span className="text-[9px] lg:text-[10px] font-bold uppercase tracking-wider">
                You
              </span>
            </div>
          </div>
        </section>

        {/* Chat Section Wrapper */}
        <div className="flex-1 flex flex-col min-h-0 min-w-0 lg:border-l border-(--outline-variant)/10">
          {/* Chat History Section */}
          <section
            ref={scrollRef}
            className="flex-1 overflow-y-auto px-4 lg:px-12 py-4 lg:py-8 space-y-6 lg:space-y-10 scroll-smooth"
          >
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex items-start gap-3 lg:gap-4 ${msg.sender === "user" ? "flex-row-reverse" : "flex-row"
                  }`}
              >
                <div
                  className={`w-7 h-7 lg:w-8 lg:h-8 rounded-lg flex items-center justify-center shrink-0 border border-(--outline-variant)/10 ${msg.sender === "ai"
                    ? "bg-(--surface-container-highest)"
                    : "bg-(--surface-container-low)"
                    }`}
                >
                  {msg.sender === "ai" ? (
                    <Bot size={14} className="text-(--primary) lg:size-[16px]" />
                  ) : (
                    <User size={14} className="text-(--on-surface-variant) lg:size-[16px]" />
                  )}
                </div>

                <div
                  className={`flex flex-col gap-2 max-w-[85%] lg:max-w-[70%] ${msg.sender === "user" ? "items-end" : "items-start"
                    }`}
                >
                  <div
                    className={`relative p-3.5 lg:p-5 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap ${msg.sender === "user"
                      ? "bg-white text-black font-medium rounded-tr-none"
                      : "bg-(--surface-container) text-(--on-surface) border border-(--outline-variant)/5 rounded-tl-none"
                      }`}
                  >
                    {msg.type === "follow-up" && (
                      <div className="mb-2 lg:mb-3">
                        <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-(--primary)/10 text-(--primary) text-[9px] font-bold uppercase tracking-wider border border-(--primary)/20">
                          Follow-up
                        </span>
                      </div>
                    )}
                    {msg.text}
                  </div>

                  <div className="flex items-center gap-2 text-[9px] lg:text-[10px] font-bold text-(--on-surface-variant) uppercase tracking-widest px-1">
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
          <section className="p-4 lg:p-8 pt-0 shrink-0">
            <div className="relative group max-w-5xl mx-auto">
              <div className="flex items-center gap-2 lg:gap-4 bg-(--surface-container-lowest) border border-(--outline-variant)/20 rounded-2xl p-1.5 lg:p-2.5 focus-within:border-(--primary)/50 focus-within:ring-1 focus-within:ring-(--primary)/20 transition-all shadow-xl lg:shadow-2xl">
                <div className="flex-1 px-2 lg:px-4">
                  <textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        handleSend(input);
                      }
                    }}
                    placeholder="Type your answer..."
                    className="w-full bg-transparent border-none focus:ring-0 text-sm py-2.5 lg:py-3 resize-none max-h-32 min-h-[40px] placeholder:text-(--on-surface-variant)/50"
                    rows={1}
                  />
                </div>

                <div className="flex items-center gap-2 lg:gap-3 pr-1 lg:pr-2">
                  <button className="hidden sm:flex p-2 text-(--on-surface-variant) hover:text-(--on-surface) transition-colors hover:bg-white/5 rounded-xl">
                    <FileText size={18} className="lg:size-[20px]" />
                  </button>
                  <button
                    onClick={() => handleSend(input)}
                    disabled={!input.trim()}
                    className="p-2.5 lg:p-3 bg-primary-gradient text-(--surface) rounded-xl hover:opacity-90 active:scale-95 transition-all disabled:opacity-30 disabled:pointer-events-none shadow-lg shadow-(--primary)/10 shrink-0"
                  >
                    <SendHorizontal size={18} className="lg:size-[20px]" />
                  </button>
                </div>
              </div>

              {/* Hint text */}
              <div className="mt-3 lg:mt-4 flex justify-center items-center gap-1.5 opacity-40">
                <span className="text-[9px] lg:text-[10px] font-medium tracking-wide">
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
