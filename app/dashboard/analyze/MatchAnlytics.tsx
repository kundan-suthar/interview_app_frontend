"use client";

import React, { useState } from "react";
import {
  CircularProgressbar,
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import {
  ChevronLeft,
  CheckCircle2,
  AlertCircle,
  MapPin,
  Briefcase,
  Sparkles,
  ArrowRight,
  Info,
  MapPinned,
} from "lucide-react";
import Link from "next/link";
import { ResumeAnalysisResponse, InterviewSessionResponse } from "./types";
import { apiClient } from "@/lib/api/client";
import { useRouter } from "next/navigation";

interface SkillTagProps {
  name: string;
  type: "matched" | "missing";
}

const SkillTag = ({ name, type }: SkillTagProps) => (
  <span
    className={`px-4 py-2 rounded-lg text-sm font-medium border border-(--outline-variant)/10 ${
      type === "matched"
        ? "bg-(--surface-container-highest) text-(--on-surface) hover:bg-(--surface-bright) transition-colors"
        : "bg-(--surface-container-low) text-(--on-surface-variant) hover:bg-(--surface-container) transition-colors"
    }`}
  >
    {name}
  </span>
);

export default function MatchAnalytics({
  profileData,
  jobDescription,
  handleShowAnalytics,
}: {
  profileData: ResumeAnalysisResponse;
  jobDescription: string;
  handleShowAnalytics: () => void;
}) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  console.log("profileData", profileData);
  const matchedSkills = profileData.matching_skills;

  const missingSkills = profileData.missing_skills;

  const matchScore = profileData.profile_match;
  const handleStartInterview = async () => {
    try {
      setLoading(true);
      let response;

      response = (await apiClient("/api/v1/interview/start", {
        method: "POST",
        body: JSON.stringify({
          ...profileData,
          job_description: jobDescription,
        }),
      })) as InterviewSessionResponse;

      if (response?.session_id) {
        router.push(`/interviewChat/${response.session_id}`);
      }
      console.log("response", response);
    } catch (error) {
      console.log("error", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="py-8 max-w-7xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Top Navigation / Action Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-6">
          <button
            onClick={handleShowAnalytics}
            className="flex items-center gap-2 text-sm font-medium text-(--on-surface-variant) hover:text-(--on-surface) transition-colors group"
          >
            <ChevronLeft
              size={18}
              className="group-hover:-translate-x-1 transition-transform"
            />
            Change Job
          </button>
          {/* <div className="px-6 py-2.5 rounded-full bg-(--surface-container-low) border border-(--outline-variant)/10 text-xs font-bold tracking-widest text-(--on-surface) uppercase">
              Senior Software Engineer @ Google
            </div> */}
        </div>

        <button
          onClick={handleStartInterview}
          className="px-8 py-3 rounded-xl bg-primary-gradient text-(--surface) font-bold flex items-center gap-3 hover:opacity-90 active:scale-[0.98] transition-all group shadow-lg shadow-(--primary)/10 cursor-pointer"
          disabled={loading}
        >
          {loading ? "Starting..." : "Start Interview"}
          <ArrowRight
            size={20}
            className="group-hover:translate-x-1 transition-transform"
          />
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Analytics & Skills */}
        <div className="lg:col-span-7 space-y-8">
          {/* Match Score Card */}
          <div className="p-10 rounded-2xl bg-(--surface-container) border border-(--outline-variant)/5 relative overflow-hidden group">
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-primary-gradient opacity-30" />

            <div className="flex flex-col items-center justify-center py-6 space-y-10">
              <div className="w-64 h-64 relative">
                <CircularProgressbarWithChildren
                  value={matchScore}
                  strokeWidth={8}
                  styles={buildStyles({
                    pathColor: "var(--primary)",
                    trailColor: "var(--surface-container-highest)",
                    strokeLinecap: "round",
                    pathTransitionDuration: 1.5,
                  })}
                >
                  <div className="text-center">
                    <div className="text-6xl font-display font-bold text-(--on-surface)">
                      {matchScore}%
                    </div>
                    <div className="text-[10px] uppercase tracking-widest font-bold text-(--on-surface-variant) mt-1">
                      Profile Match
                    </div>
                  </div>
                </CircularProgressbarWithChildren>
                <div className="absolute inset-0 bg-(--primary) opacity-[0.03] blur-3xl rounded-full" />
              </div>

              <div className="flex items-center gap-4 w-full">
                <div className="flex-1 p-4 rounded-xl bg-(--surface-container-low) border border-(--outline-variant)/10 flex items-center justify-center gap-3 group/btn">
                  <div className="w-6 h-6 rounded-full bg-(--primary)/10 flex items-center justify-center">
                    <CheckCircle2 size={14} className="text-(--primary)" />
                  </div>
                  <span className="text-sm font-bold text-(--on-surface)">
                    {`${matchedSkills.length} Skills Matched`}
                  </span>
                </div>
                <div className="flex-1 p-4 rounded-xl bg-(--surface-container-low) border border-(--outline-variant)/10 flex items-center justify-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-(--error)/10 flex items-center justify-center">
                    <AlertCircle size={14} className="text-(--error)" />
                  </div>
                  <span className="text-sm font-bold text-(--on-surface)">
                    {`${missingSkills.length} Skills Missing`}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Matching Skills Section */}
          <div className="p-10 rounded-2xl bg-(--surface-container) border border-(--outline-variant)/5 space-y-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-(--primary)/10 flex items-center justify-center">
                <CheckCircle2 size={20} className="text-(--primary)" />
              </div>
              <h3 className="text-xl font-display font-bold text-(--on-surface)">
                Matching Skills
              </h3>
            </div>
            <div className="flex flex-wrap gap-3">
              {matchedSkills.map((skill) => (
                <SkillTag key={skill} name={skill} type="matched" />
              ))}
            </div>
          </div>

          {/* Missing Skills Section */}
          <div className="p-10 rounded-2xl bg-(--surface-container) border border-(--outline-variant)/5 space-y-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-(--error)/10 flex items-center justify-center">
                <AlertCircle size={20} className="text-(--error-container)" />
              </div>
              <h3 className="text-xl font-display font-bold text-(--on-surface)">
                Missing Skills
              </h3>
            </div>
            <div className="flex flex-wrap gap-3">
              {missingSkills.map((skill) => (
                <SkillTag key={skill} name={skill} type="missing" />
              ))}
            </div>
            <div className="flex items-start gap-3 p-4 rounded-xl bg-(--surface-container-low)/50 text-xs text-(--on-surface-variant)">
              <Info size={14} className="shrink-0 mt-0.5" />
              <p>
                These topics may come up — reviewing them could improve your
                score.
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Profile & Settings */}
        <div className="lg:col-span-5 space-y-8">
          {/* User Profile Card */}
          <div className="p-10 rounded-2xl bg-(--surface-container) border border-(--outline-variant)/5 text-center space-y-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-(--primary) opacity-[0.02] blur-2xl" />
            <div className="relative inline-block">
              <div className="w-32 h-32 rounded-full border-2 border-(--primary)/20 p-1">
                <div className="w-full h-full rounded-full bg-(--surface-container-highest) overflow-hidden flex items-center justify-center">
                  <div className="text-4xl font-bold text-(--primary)/40">
                    {profileData.full_name.split(" ")[0][0].toUpperCase() +
                      " " +
                      profileData.full_name.split(" ")[1][0].toUpperCase()}
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-primary-gradient border-4 border-(--surface-container) flex items-center justify-center">
                <CheckCircle2 size={12} className="text-(--surface)" />
              </div>
            </div>
            <div className="space-y-1">
              <h2 className="text-3xl font-display font-bold text-(--on-surface)">
                {profileData.full_name}
              </h2>
              <div className="text-xs font-bold tracking-widest text-(--primary) uppercase">
                {profileData.job_title}
              </div>
            </div>
            <div className="flex items-center justify-center gap-4 text-xs text-(--on-surface-variant)">
              <div className="flex items-center gap-1.5">
                <MapPin size={14} />
                {profileData.last_company}
              </div>
              <div className="w-1 h-1 rounded-full bg-(--outline-variant)/30" />
              <div className="flex items-center gap-1.5">
                <Briefcase size={14} />
                {profileData.experience} years exp.
              </div>
            </div>
            {/* <p className="text-sm leading-relaxed text-(--on-surface-variant) px-4">
              Experienced engineer with a strong background in distributed
              systems and frontend architecture. Previously at Razorpay and
              Flipkart.
            </p> */}
          </div>

          {/* Last Experience Card */}
          {/* <div className="p-8 rounded-2xl bg-(--surface-container) border border-(--outline-variant)/5 space-y-6">
            <div className="text-[10px] uppercase tracking-widest font-bold text-(--on-surface-variant)">
              Last Experience
            </div>
            <div className="flex gap-5">
              <div className="w-14 h-14 rounded-xl bg-(--surface-container-highest) border border-(--outline-variant)/10 flex items-center justify-center shrink-0">
                <Briefcase size={24} className="text-(--primary)" />
              </div>
              <div className="space-y-1">
                <h4 className="font-bold text-(--on-surface)">Razorpay</h4>
                <p className="text-xs font-semibold text-(--primary)">
                  Senior Frontend Engineer
                </p>
                <p className="text-[10px] text-(--on-surface-variant)">
                  Jan 2022 – Present · 2 yrs 3 mos
                </p>
              </div>
            </div>
            <ul className="space-y-3.5 pl-1.5">
              {[
                "Led migration of payment dashboard to React + TypeScript",
                "Reduced bundle size by 40% via code splitting",
                "Mentored team of 4 junior engineers",
              ].map((item, i) => (
                <li
                  key={i}
                  className="flex gap-3 text-sm text-(--on-surface-variant)"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-(--primary)/40 mt-1.5 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div> */}

          {/* AI Summary Card */}
          <div className="p-8 rounded-2xl bg-(--primary)/5 border border-(--primary)/10 space-y-4 relative">
            <div className="flex items-center gap-2 px-3 py-1 rounded-md bg-(--primary)/10 w-fit">
              <Sparkles size={12} className="text-(--primary)" />
              <span className="text-[10px] font-bold text-(--primary) uppercase tracking-widest">
                AI Summary
              </span>
            </div>
            <p className="text-sm italic leading-relaxed text-(--on-surface-variant)/90">
              {profileData.resume_summary}
            </p>
          </div>

          {/* Interview Settings */}
          <div className="space-y-6 pt-4">
            <div className="space-y-4">
              <div className="text-[10px] uppercase tracking-widest font-bold text-(--on-surface-variant)">
                Interview Type
              </div>
              <div className="flex p-1 rounded-xl bg-(--surface-container-low) border border-(--outline-variant)/10">
                {["Technical", "Behavioral", "Mixed"].map((type) => (
                  <button
                    key={type}
                    className={`flex-1 py-3 text-xs font-bold rounded-lg transition-all ${
                      type === "Technical"
                        ? "bg-(--primary) text-(--surface)"
                        : "text-(--on-surface-variant) hover:text-(--on-surface)"
                    }`}
                  >
                    {type.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>

            {/* <div className="space-y-4">
              <div className="text-[10px] uppercase tracking-widest font-bold text-(--on-surface-variant)">
                Difficulty
              </div>
              <div className="flex p-1 rounded-xl bg-(--surface-container-low) border border-(--outline-variant)/10">
                {["Junior", "Mid", "Senior"].map((diff) => (
                  <button
                    key={diff}
                    className={`flex-1 py-3 text-xs font-bold rounded-lg transition-all ${
                      diff === "Mid"
                        ? "bg-(--primary) text-(--surface)"
                        : "text-(--on-surface-variant) hover:text-(--on-surface)"
                    }`}
                  >
                    {diff.toUpperCase()}
                  </button>
                ))}
              </div>
            </div> */}

            <div className="space-y-4">
              <div className="text-[10px] uppercase tracking-widest font-bold text-(--on-surface-variant)">
                Interview Duration
              </div>
              <div className="flex p-1 rounded-xl bg-(--surface-container-low) border border-(--outline-variant)/10">
                {["5 min", "10 min", "15 min", "20 min"].map((dur) => (
                  <button
                    key={dur}
                    className={`flex-1 py-3 text-xs font-bold rounded-lg transition-all ${
                      dur === "5 min"
                        ? "bg-(--primary) text-(--surface)"
                        : "text-(--on-surface-variant) hover:text-(--on-surface)"
                    }`}
                  >
                    {dur.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
