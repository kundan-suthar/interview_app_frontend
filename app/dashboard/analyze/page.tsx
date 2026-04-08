"use client";

import { useEffect, useState } from "react";
import {
  ArrowRight,
  CheckCircle2,
  Search,
  BarChart3,
  Target,
  ShieldCheck,
  Cpu,
} from "lucide-react";
import Link from "next/link";
import MyDropzone from "@/app/components/fleUploader";
import Modal from "@/app/components/Modal";
import { apiClient } from "@/lib/api/client";
import MatchAnalytics from "./MatchAnlytics";
import { ResumeAnalysisResponse } from "./types";
import { reschedulePrefetchTask } from "next/dist/client/components/segment-cache/scheduler";

export default function AnalyzePage() {
  const [resumeUploaded, setResumeUploaded] = useState<File | null>(null);
  const [resumeName, setResumeName] = useState("");
  const [errorStatus, setErrorStatus] = useState<string | null>(null);
  const [jobDescription, setJobDescription] = useState("");
  const [jobDescriptionError, setJobDescriptionError] = useState<string | null>(
    null,
  );
  const [resumeError, setResumeError] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showAnalytics, setShowAnalytics] = useState(false);
  const [profileData, setProfileData] = useState<ResumeAnalysisResponse | null>(
    null,
  );

  async function handleAnalyze() {
    setIsAnalyzing(true);
    if (!resumeUploaded) {
      setResumeError("Please upload your resume");
    }
    if (!jobDescription) {
      setJobDescriptionError("Please enter the job description");
    }
    if (resumeError || jobDescriptionError) {
      return;
    }
    try {
      const formData = new FormData();

      formData.append("resume", resumeUploaded as File);
      formData.append("job_description", jobDescription);
      // console.log("data", typeof resumeUploaded, jobDescription);
      const response = await apiClient("/api/v1/interview/analyze", {
        method: "POST",
        body: formData,
      });
      setProfileData(response as ResumeAnalysisResponse);
      // console.log("response", response);
      setShowAnalytics(true);
    } catch (error) {
      console.log("error", error);
    } finally {
      setIsAnalyzing(false);
    }
  }
  useEffect(() => {
    if (resumeUploaded) {
      setResumeError(null);
    }
    if (jobDescription) {
      setJobDescriptionError(null);
    }
  }, [resumeUploaded, jobDescription]);
  const handleShowAnalytics = () => {
    setShowAnalytics(false);
  };
  if (showAnalytics && profileData) {
    return (
      <MatchAnalytics
        handleShowAnalytics={handleShowAnalytics}
        profileData={profileData}
        jobDescription={jobDescription}
      />
    );
  }

  return (
    <div className="py-6 lg:py-12 max-w-6xl mx-auto px-1">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        {/* Left Column: Forms */}
        <div className="lg:col-span-7 space-y-8 lg:space-y-10">
          <header className="space-y-3">
            <h1 className="font-display text-3xl lg:text-4xl font-bold tracking-tight text-(--on-surface)">
              Apply for this Interview
            </h1>
            <p className="text-(--on-surface-variant) text-base lg:text-lg">
              Upload your resume and job description to get your match analysis
            </p>
          </header>

          <div className="space-y-6 lg:space-y-8">
            {/* Upload Resume Section */}
            <div className="space-y-4">
              <label className="text-(--on-surface-variant) font-bold text-xs uppercase tracking-widest">
                Upload Resume
              </label>

              {resumeUploaded ? (
                <div className="p-4 lg:p-6 rounded-xl bg-(--surface-container-low) border border-(--primary)/20 flex items-center justify-between group transition-all hover:bg-(--surface-container-high)">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-lg bg-(--surface-container-highest) flex items-center justify-center">
                      <CheckCircle2 className="text-(--primary)" size={20} />
                    </div>
                    <div className="min-w-0">
                      <h4 className="font-medium text-(--on-surface) truncate max-w-[150px] sm:max-w-xs">
                        {resumeName}
                      </h4>
                      <p className="text-[10px] lg:text-xs text-(--primary) flex items-center gap-1">
                        Uploaded successfully
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setResumeUploaded(null)}
                    className="text-xs font-bold text-(--primary) border-b border-(--primary)/30 hover:border-(--primary) transition-all whitespace-nowrap"
                  >
                    Re-upload
                  </button>
                </div>
              ) : (
                <MyDropzone
                  onFileSelect={(file) => {
                    setResumeName(file.name);
                    setResumeUploaded(file);
                  }}
                  onError={(error) => setErrorStatus(error)}
                />
              )}
            </div>
            {resumeError && (
              <p className="text-sm text-(--error)">{resumeError}</p>
            )}

            {/* Upload Job Description Section */}
            <div className="space-y-4">
              <label className="text-(--on-surface-variant) font-bold text-xs uppercase tracking-widest">
                Job Description
              </label>

              <div className="relative">
                <textarea
                  placeholder="Paste the job description here..."
                  className="w-full h-48 p-4 lg:p-6 rounded-xl bg-(--surface-container-lowest) border border-(--outline-variant)/30 focus:border-(--primary)/50 focus:ring-1 focus:ring-(--primary)/20 outline-none resize-none transition-all placeholder:text-(--on-surface-variant)/50 text-sm lg:text-base"
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                />
                {jobDescriptionError && (
                  <p className="text-sm text-(--error)">
                    {jobDescriptionError}
                  </p>
                )}
              </div>
            </div>

            <button
              onClick={handleAnalyze}
              disabled={isAnalyzing}
              className="w-full py-4 rounded-xl bg-primary-gradient text-(--surface) font-bold text-lg flex items-center justify-center gap-2 group transition-all hover:opacity-90 active:scale-[0.98] cursor-pointer"
            >
              {isAnalyzing ? "Analyzing..." : "Analyze & Continue"}
              <ArrowRight
                size={20}
                className="group-hover:translate-x-1 transition-transform"
              />
            </button>

            <p className="text-center text-xs text-(--on-surface-variant)">
              We'll match your profile against the JD before starting
            </p>
          </div>
        </div>

        {/* Right Column: Steps & Info */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-6 lg:p-10 rounded-2xl bg-(--surface-container) border border-(--outline-variant)/5 relative overflow-hidden group">
            {/* Signature teal indicator */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-primary-gradient opacity-80" />

            {/* Subtle glow effect */}
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-(--primary) opacity-5 blur-[80px]" />

            <h3 className="text-xl lg:text-2xl font-display font-semibold mb-8 lg:mb-10 text-(--on-surface)">
              What happens next?
            </h3>

            <div className="space-y-10 lg:space-y-12 relative">
              {/* Vertical Line */}
              <div className="absolute left-[20px] lg:left-[23px] top-6 bottom-6 w-[2px] bg-linear-to-b from-[#1d2539] via-[#2a3449] to-[#1d2539]" />

              {/* Step 01 */}
              <div className="flex gap-4 lg:gap-6 relative">
                <div className="z-10 w-10 h-10 lg:w-12 lg:h-12 rounded-xl bg-(--surface-container-highest) border border-(--outline-variant)/20 flex items-center justify-center shrink-0">
                  <Search className="text-(--primary)" size={18} />
                </div>
                <div className="space-y-1">
                  <span className="text-(--primary) font-bold text-[10px] tracking-widest uppercase">
                    Step 01
                  </span>
                  <p className="text-(--on-surface) font-medium text-sm lg:text-base leading-relaxed">
                    We parse your resume and extract your experience
                  </p>
                </div>
              </div>

              {/* Step 02 */}
              <div className="flex gap-4 lg:gap-6 relative">
                <div className="z-10 w-10 h-10 lg:w-12 lg:h-12 rounded-xl bg-(--surface-container-highest) border border-(--outline-variant)/20 flex items-center justify-center shrink-0">
                  <BarChart3 className="text-(--primary)" size={18} />
                </div>
                <div className="space-y-1">
                  <span className="text-(--primary) font-bold text-[10px] tracking-widest uppercase">
                    Step 02
                  </span>
                  <p className="text-(--on-surface) font-medium text-sm lg:text-base leading-relaxed">
                    We score your profile against the job description
                  </p>
                </div>
              </div>

              {/* Step 03 */}
              <div className="flex gap-4 lg:gap-6 relative">
                <div className="z-10 w-10 h-10 lg:w-12 lg:h-12 rounded-xl bg-(--surface-container-highest) border border-(--outline-variant)/20 flex items-center justify-center shrink-0">
                  <Target className="text-(--primary)" size={18} />
                </div>
                <div className="space-y-1">
                  <span className="text-(--primary) font-bold text-[10px] tracking-widest uppercase">
                    Step 03
                  </span>
                  <p className="text-(--on-surface) font-medium text-sm lg:text-base leading-relaxed">
                    You see your match report before the interview starts
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-10 lg:mt-12 pt-6 lg:pt-8 border-t border-(--outline-variant)/10 flex items-center gap-3 text-xs text-(--on-surface-variant)">
              <ShieldCheck size={16} className="text-(--primary)" />
              Your data is never stored or shared
            </div>
          </div>

          <div className="p-4 lg:p-6 rounded-xl bg-(--surface-container-low) border border-(--outline-variant)/10 flex items-center gap-4 lg:gap-5">
            <div className="w-12 h-12 lg:w-14 lg:h-14 rounded-xl bg-(--surface-container-highest) flex items-center justify-center shrink-0 border border-(--outline-variant)/20 shadow-inner">
              <Cpu className="text-(--primary)" size={20} />
            </div>
            <div>
              <h5 className="text-(--primary) font-bold text-[10px] tracking-widest uppercase">
                AI Readiness
              </h5>
              <p className="text-xs lg:text-sm text-(--on-surface-variant) leading-tight mt-1">
                Matching technology powered by neural parsing models.
              </p>
            </div>
          </div>
        </div>
      </div>

      <footer className="mt-12 lg:mt-20 py-8 border-t border-(--outline-variant)/10 flex flex-col md:flex-row justify-between items-center gap-6 text-xs text-(--on-surface-variant)">
        <div>© 2024 INTERVIEW.AI — Professional Interview Intelligence</div>
        <div className="flex flex-wrap justify-center gap-4 lg:gap-8">
          <Link
            href="/privacy"
            className="hover:text-(--on-surface) transition-colors"
          >
            Privacy Policy
          </Link>
          <Link
            href="/terms"
            className="hover:text-(--on-surface) transition-colors"
          >
            Terms of Service
          </Link>
          <Link
            href="/support"
            className="hover:text-(--on-surface) transition-colors"
          >
            Support
          </Link>
        </div>
      </footer>

      {/* Error Modal */}
      <Modal
        isOpen={!!errorStatus}
        onClose={() => setErrorStatus(null)}
        title="Invalid Data"
      >
        <div className="flex flex-col items-center text-center gap-4 py-2">
          <div className="w-12 h-12 rounded-full bg-(--error)/10 flex items-center justify-center">
            <ShieldCheck className="text-(--error-container)" size={24} />
          </div>
          <p className="text-lg text-(--on-surface)">
            Oops! There was a problem with your file.
          </p>
          <p className="text-sm text-(--on-surface-variant)">{errorStatus}</p>
        </div>
      </Modal>
    </div>
  );
}
