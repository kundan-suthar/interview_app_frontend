"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import {
    Calendar,
    Clock,
    Briefcase,
    Award,
    Search,
    MoreVertical,
    Volume2,
    Copy,
    Trophy,
    CheckCircle2,
    MessageSquare,
    Loader2,
    AlertCircle
} from "lucide-react";
import {
    CircularProgressbar,
    buildStyles,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { apiClient } from "@/lib/api/client";

interface Message {
    role: string;
    content: string;
}

interface ConclusionData {
    required_job_title: string;
    candidate_experince: string;
    date: string;
    transcript: Message[];
    analysis_status: string;
    performance_summary: string;
    ratings: {
        technical_depth: number;
        communication: number;
        confidence: number;
        problem_solving?: number;
    };
    hirability_score: number;
    key_strengths: string[];
    areas_to_improve: string[];
    actionable_items: string[];
}

const ConclusionPage = () => {
    const { thread_id } = useParams();
    const [data, setData] = useState<ConclusionData | null>(null);
    const [loading, setLoading] = useState(true);
    const [status, setStatus] = useState<'pending' | 'completed' | 'failed'>('pending');
    useEffect(() => {
        let pollInterval: NodeJS.Timeout;
        let isMounted = true;

        const fetchConclusion = async () => {
            try {
                const res = await apiClient<ConclusionData>(`/api/interview/conclusion/${thread_id}`);

                if (isMounted) {
                    if (res?.analysis_status === 'pending') {
                        // Still processing, continue polling
                        setStatus('pending');
                        setLoading(false);
                    } else if (res?.analysis_status === 'completed') {
                        setData(res as ConclusionData);
                        setStatus('completed');
                        setLoading(false);
                        clearInterval(pollInterval);
                    } else if (res?.analysis_status === 'failed') {
                        setStatus('failed');
                        setLoading(false);
                        clearInterval(pollInterval);
                    }
                }
            } catch (err) {
                if (isMounted) {
                    console.error("Failed to fetch conclusion:", err);
                    setStatus('failed');
                    setLoading(false);
                    clearInterval(pollInterval);
                }
            }
        };

        if (thread_id) {
            // Initial fetch
            fetchConclusion();

            // Set up polling every 2 seconds
            pollInterval = setInterval(fetchConclusion, 2000);
        }

        return () => {
            isMounted = false;
            if (pollInterval) clearInterval(pollInterval);
        };
    }, [thread_id]);

    if (loading) {
        return (
            <div className="min-h-screen bg-(--surface) flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-(--primary)" />
            </div>
        );
    }
    if (status === 'pending') {
        return (
            <div className="min-h-screen bg-(--surface) flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-(--primary)" />
                <p className="text-white">Pending</p>
            </div>
        )
    }
    if (status === 'failed') {
        return (
            <div className="min-h-screen bg-(--surface) flex items-center justify-center">
                <AlertCircle className="w-8 h-8 animate-spin text-(--primary)" />
                <p className="text-white">Failed to fetch conclusion</p>
            </div>
        )
    }

    if (!data) {
        return (
            <div className="min-h-screen bg-(--surface) flex items-center justify-center text-white">
                No data available for this interview.
            </div>
        );
    }

    const formattedDate = new Date(data.date).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
    });

    return (
        <div className="min-h-screen bg-(--surface) text-(--on-surface) px-4 lg:px-8 py-8 dot-grid font-body overflow-y-auto no-scrollbar">
            <div className="max-w-7xl mx-auto space-y-10 pb-20">

                {/* Main Content Grid: Top Header */}
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-12 items-center border-b border-(--outline-variant)/10 pb-10">
                    <header className="space-y-4">
                        <h1 className="text-5xl lg:text-7xl font-display font-bold tracking-tight text-white leading-[1.1]">
                            Interview<br />Review
                        </h1>
                        <p className="text-lg lg:text-xl text-(--on-surface-variant) font-medium italic opacity-70">
                            Transcription & Performance Analysis
                        </p>
                    </header>

                    <div className="space-y-6">
                        <div className="flex flex-wrap sm:flex-nowrap gap-3">
                            <div className="bg-(--surface-container-high) border border-(--outline-variant)/10 px-5 py-3.5 rounded-xl min-w-[180px]">
                                <div className="text-[9px] font-bold uppercase tracking-[0.2em] text-(--on-surface-variant) mb-1.5 grayscale opacity-70">
                                    Interview Type
                                </div>
                                <div className="text-base font-bold text-white">
                                    {data.required_job_title}
                                </div>
                            </div>

                            <div className="bg-(--surface-container-high) border border-(--outline-variant)/10 px-5 py-3.5 rounded-xl min-w-[110px]">
                                <div className="text-[9px] font-bold uppercase tracking-[0.2em] text-(--on-surface-variant) mb-1.5 grayscale opacity-70">
                                    Experience
                                </div>
                                <div className="text-base font-bold text-white text-nowrap">
                                    {data.candidate_experince} Years
                                </div>
                            </div>

                            <div className="bg-(--surface-container-high) border border-(--outline-variant)/10 px-5 py-3.5 rounded-xl min-w-[130px]">
                                <div className="text-[9px] font-bold uppercase tracking-[0.2em] text-(--on-surface-variant) mb-1.5 grayscale opacity-70">
                                    Date
                                </div>
                                <div className="text-base font-bold text-white">
                                    {formattedDate}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Results Section Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

                    {/* Left Column: Verdict & Matrix */}
                    <div className="lg:col-span-4 space-y-8">

                        {/* Hire Verdict Card */}
                        <div className="bg-(--surface-container) border border-(--outline-variant)/10 rounded-3xl p-8 flex flex-col items-center text-center space-y-6">
                            <div className="w-40 h-40 relative">
                                <CircularProgressbar
                                    value={data.hirability_score}
                                    maxValue={10}
                                    strokeWidth={10}
                                    styles={buildStyles({
                                        pathColor: data.hirability_score > 5 ? "var(--primary)" : "var(--error)",
                                        trailColor: "var(--surface-container-low)",
                                        strokeLinecap: "round",
                                    })}
                                />
                                <div className="absolute inset-0 flex flex-col items-center justify-center">
                                    <span className="text-4xl font-bold text-white">{data.hirability_score}</span>
                                    <span className="text-xs text-(--on-surface-variant) font-medium opacity-60">/ 10</span>
                                </div>
                            </div>

                            <div className="px-10 py-2.5 bg-(--primary) text-(--surface) rounded-full font-bold tracking-widest text-sm shadow-[0_0_20px_rgba(106,242,222,0.3)]">
                                HIRE
                            </div>

                            <p className="text-xs text-(--on-surface-variant) max-w-[220px] leading-relaxed italic">
                                Verdict based on {data.performance_summary.split('.')[0]}.
                            </p>
                        </div>

                        {/* Competency Matrix Card */}
                        <div className="bg-(--surface-container) border border-(--outline-variant)/10 rounded-3xl p-8 space-y-8">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-(--primary)/10 rounded-lg">
                                    <Trophy size={18} className="text-(--primary)" />
                                </div>
                                <h3 className="text-lg font-bold text-white">Competency Matrix</h3>
                            </div>

                            <div className="space-y-6">
                                {[
                                    { label: "Technical Depth", value: data.ratings.technical_depth, max: 5 },
                                    { label: "Communication", value: data.ratings.communication, max: 5 },
                                    { label: "Confidence", value: data.ratings.confidence, max: 5 },
                                    { label: "Problem Solving", value: data.ratings.problem_solving || 4.2, max: 5 },
                                ].map((item) => (
                                    <div key={item.label} className="space-y-2">
                                        <div className="flex justify-between items-end">
                                            <span className="text-xs font-bold text-(--on-surface-variant) uppercase tracking-wider">{item.label}</span>
                                            <span className="text-xs font-bold text-(--primary)">{item.value}<span className="text-[10px] text-(--on-surface-variant)/50 ml-1">/ {item.max}</span></span>
                                        </div>
                                        <div className="h-1.5 w-full bg-(--surface-container-highest)/50 rounded-full overflow-hidden">
                                            <div
                                                className="h-full bg-(--primary) rounded-full transition-all duration-1000 ease-out shadow-[0_0_10px_rgba(106,242,222,0.2)]"
                                                style={{ width: `${(item.value / item.max) * 100}%` }}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Transcript */}
                    <div className="lg:col-span-8 bg-(--surface-container) border border-(--outline-variant)/10 rounded-3xl flex flex-col h-[750px]">
                        {/* Transcript Header */}
                        <div className="p-6 border-b border-(--outline-variant)/5 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <MessageSquare size={18} className="text-(--primary)" />
                                <h3 className="text-lg font-bold text-white">Transcript</h3>
                            </div>

                        </div>

                        {/* Transcript Feed */}
                        <div className="flex-1 overflow-y-auto p-6 space-y-6 no-scrollbar">
                            {data.transcript.slice(1, data.transcript.length - 1).map((msg, idx) => {
                                const isAI = msg.role.toLowerCase() === 'ai' || msg.role.toLowerCase() === 'assistant' || msg.role.toLowerCase() === 'system';
                                return (
                                    <div key={idx} className={`flex flex-col ${isAI ? 'items-start' : 'items-end'} space-y-2`}>
                                        <div className={`flex items-center gap-2 mb-1 px-1`}>
                                            <span className={`text-[10px] font-bold uppercase tracking-widest ${isAI ? 'text-(--primary)' : 'text-(--on-surface-variant)'}`}>
                                                {isAI ? 'InterviewIQ Mentor' : 'You'}
                                            </span>
                                        </div>
                                        <div className={`relative max-w-[90%] p-5 rounded-2xl text-sm leading-relaxed ${isAI
                                            ? 'bg-(--surface-container-low) border border-(--outline-variant)/10 text-(--on-surface) rounded-tl-none'
                                            : 'bg-(--surface-container-high) border border-(--primary)/5 text-white shadow-xl rounded-tr-none'
                                            }`}>
                                            {msg.content}
                                        </div>


                                    </div>
                                );
                            })}
                        </div>
                    </div>

                </div>

                {/* Insights Section: Strengths, Improvements, Tips */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Key Strengths */}
                    <div className="bg-(--surface-container) border border-(--outline-variant)/10 rounded-3xl p-8 space-y-6 hover:bg-(--surface-container-high) transition-all">
                        <div className="flex items-center gap-3">
                            <CheckCircle2 size={20} className="text-cyan-400" />
                            <h3 className="text-lg font-bold text-white">Key Strengths</h3>
                        </div>
                        <ul className="space-y-4">
                            {data.key_strengths.map((str, i) => (
                                <li key={i} className="flex gap-3 text-sm text-(--on-surface-variant) leading-relaxed">
                                    <span className="mt-1.5 w-1.5 h-1.5 bg-cyan-400 rounded-sm shrink-0" />
                                    {str}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Areas to Improve */}
                    <div className="bg-(--surface-container) border border-(--outline-variant)/10 rounded-3xl p-8 space-y-6 hover:bg-(--surface-container-high) transition-all">
                        <div className="flex items-center gap-3">
                            <AlertCircle size={20} className="text-rose-400" />
                            <h3 className="text-lg font-bold text-white text-nowrap">Areas to Improve</h3>
                        </div>
                        <ul className="space-y-4">
                            {data.areas_to_improve.map((area, i) => (
                                <li key={i} className="flex gap-3 text-sm text-(--on-surface-variant) leading-relaxed">
                                    <span className="mt-1.5 w-1.5 h-1.5 bg-rose-400 rounded-sm shrink-0" />
                                    {area}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Actionable Tips */}
                    <div className="bg-(--surface-container) border border-(--outline-variant)/10 rounded-3xl p-8 space-y-6 hover:bg-(--surface-container-high) transition-all">
                        <div className="flex items-center gap-3">
                            <Briefcase size={20} className="text-(--primary)" />
                            <h3 className="text-lg font-bold text-white text-nowrap">Actionable Tips</h3>
                        </div>
                        <ul className="space-y-4">
                            {data.actionable_items.map((tip, i) => (
                                <li key={i} className="flex gap-3 text-sm text-(--on-surface-variant) leading-relaxed">
                                    <span className="mt-1.5 w-1.5 h-1.5 bg-(--primary) rounded-sm shrink-0" />
                                    {tip}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Performance Summary Section */}
                <div className="bg-(--surface-container) border border-(--outline-variant)/10 rounded-3xl p-10 space-y-6">
                    <h3 className="text-xl lg:text-2xl font-bold text-white">Performance Summary</h3>
                    <p className="text-base lg:text-lg text-(--on-surface-variant)/90 leading-relaxed font-medium">
                        {data.performance_summary}
                    </p>
                </div>

            </div>
        </div>
    );
};

export default ConclusionPage;
