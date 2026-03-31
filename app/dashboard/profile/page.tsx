"use client";

import { useRef, useState } from "react";
import { Upload, X, User, ArrowRight, ArrowLeft } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Modal from "@/app/components/Modal";
import { apiClient } from "@/lib/api/client";

const schema = z.object({
  headline: z.string().min(1, "Headline is required"),
  bio: z.string().min(1, "Bio is required"),
  skills: z.string(),
});

type FormData = z.infer<typeof schema>;

export default function ProfilePage() {
  const [skills, setSkills] = useState<string[]>([]);
  const [newSkill, setNewSkill] = useState("");
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [image, setImage] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [errorModalOpen, setErrorModalOpen] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setErrorModalOpen(false);
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type and size
    const validExtensions = [
      "image/jpeg",
      "image/png",
      "image/gif",
      "image/tiff",
      "image/heif",
      "image/webp",
    ];
    if (!validExtensions.includes(file.type) || file.size > 4 * 1024 * 1024) {
      setErrorModalOpen(true);
      return;
    }

    setImageFile(file); // store File object
    setImage(URL.createObjectURL(file)); // preview
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: any) => {
    try {
      const payload = {
        skills: skills.join(","),
        headline: data.headline,
        bio: data.bio,
      };
      console.log(payload);
      const response = await apiClient<FormData>("/api/v1/profile", {
        method: "POST",
        body: JSON.stringify(payload),
      });
      console.log("Profile updated successfully:", response);
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      alert(
        error instanceof Error ? error.message : "Failed to update profile",
      );
    }
  };

  const handleAddSkill = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && newSkill.trim()) {
      e.preventDefault();
      if (skills.length < 10 && !skills.includes(newSkill.trim())) {
        setSkills([...skills, newSkill.trim()]);
        setNewSkill("");
      }
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setSkills(skills.filter((s) => s !== skillToRemove));
  };

  return (
    <div className="max-w-[960px] mx-auto py-12 md:py-16">
      {/* Header */}
      <div className="mb-12">
        <h1 className="text-3xl sm:text-4xl font-display font-bold text-(--on-surface) mb-3 tracking-tight">
          Build your profile
        </h1>
        <p className="text-(--on-surface-variant) text-lg font-body max-w-2xl">
          Personalize your AI interviewer's context to get more accurate
          feedback and realistic simulations.
        </p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="mx-auto ">
        <div className="grid grid-cols-1 gap-6 mb-6">
          {/* <div className="bg-(--surface-container-high) border border-(--outline-variant)/20 rounded-2xl p-8 flex flex-col items-center justify-center relative shadow-[0_8px_30px_rgb(0,0,0,0.12)] min-h-[300px]">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/png, image/jpeg, image/svg+xml"
              className="hidden"
            />

            <div className="relative mb-6" onClick={handleClick}>
              <div className="w-32 h-32 rounded-full border border-dashed border-(--outline-variant) flex items-center justify-center bg-(--surface-container) overflow-hidden">
                {image ? (
                  <img
                    src={image}
                    alt="Profile Preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <User className="text-(--on-surface-variant)" size={48} />
                )}
              </div>

              <button
                type="button"
                className="absolute bottom-1 right-1 w-8 h-8 bg-(--primary) rounded-full flex items-center justify-center text-black shadow-lg hover:scale-105 transition-transform z-10"
              >
                <Upload size={14} />
              </button>
            </div>

            <h3 className="text-[11px] font-bold tracking-widest uppercase text-(--on-surface) mb-2">
              Profile Photo
            </h3>

            <p className="text-[10px] text-(--on-surface-variant)/80 uppercase tracking-widest text-center">
              SVG, PNG, or JPG (max. 5MB)
            </p>
          </div> */}

          {/* Professional Details */}
          <div className="bg-(--surface-container-high) border border-(--outline-variant)/20 rounded-2xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.12)] flex flex-col gap-6">
            {/* Professional Headline Input */}
            <div className="flex flex-col gap-2">
              <label className="text-[11px] font-bold tracking-widest uppercase text-(--on-surface-variant) flex items-center gap-2">
                Professional Headline
                <div className="w-[14px] h-[14px] rounded-full bg-(--surface-bright) font-serif text-[9px] flex items-center justify-center text-(--on-surface-variant)">
                  i
                </div>
              </label>
              <input
                type="text"
                {...register("headline")}
                placeholder="e.g., Senior Frontend Engineer at Acme"
                className="w-full bg-[#040813] border border-(--outline-variant)/30 rounded-lg px-4 py-3.5 text-sm text-(--on-surface) placeholder-(--on-surface-variant)/30 focus:outline-none focus:ring-2 focus:ring-(--primary)/50 focus:border-(--primary) transition-all shadow-inner"
              />
              {errors.headline && (
                <p className="text-(--error) text-sm mt-1">
                  {errors.headline.message}
                </p>
              )}
            </div>

            {/* Bio Textarea */}
            <div className="flex flex-col gap-2 flex-grow">
              <label className="text-[11px] font-bold tracking-widest uppercase text-(--on-surface-variant)">
                Bio
              </label>
              <textarea
                {...register("bio")}
                placeholder="Briefly describe your career journey, expertise, and what you're aiming for next..."
                className="w-full flex-grow h-32 md:h-full min-h-[120px] resize-none bg-[#040813] border border-(--outline-variant)/30 rounded-lg px-4 py-3 text-sm text-(--on-surface) placeholder-(--on-surface-variant)/30 focus:outline-none focus:ring-2 focus:ring-(--primary)/50 focus:border-(--primary) transition-all shadow-inner"
              ></textarea>
              {errors.bio && (
                <p className="text-(--error) text-sm mt-1">
                  {errors.bio.message}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Skills & Technologies */}
        <div className="bg-(--surface-container-high) border border-(--outline-variant)/20 rounded-2xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.12)] mb-10">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h3 className="text-sm font-bold tracking-wide text-(--on-surface) mb-1">
                Core Skills & Technologies
              </h3>
              <p className="text-xs text-(--on-surface-variant)">
                These keywords help the AI tailor technical questions.
              </p>
            </div>
            <div className="bg-[#10b7a5]/10 border border-(--primary)/20 text-(--primary) text-[11px] font-mono font-medium px-3 py-1.5 rounded flex items-center">
              {skills.length}/10 Added
            </div>
          </div>

          <div className="bg-[#040813] border border-(--outline-variant)/30 rounded-xl p-4 min-h-[96px] flex flex-wrap gap-2 items-start focus-within:ring-2 focus-within:ring-(--primary)/50 focus-within:border-(--primary) transition-all shadow-inner">
            {skills.map((skill) => (
              <span
                key={skill}
                className="bg-[#222c41] border border-(--outline-variant)/30 text-(--primary) text-[13px] font-medium px-3 py-1.5 rounded-lg flex items-center gap-2"
              >
                {skill}
                <button
                  onClick={() => removeSkill(skill)}
                  className="text-white/60 hover:text-white transition-colors flex items-center justify-center p-0.5"
                >
                  <X size={14} />
                </button>
              </span>
            ))}
            {skills.length < 10 && (
              <>
                <input
                  type="text"
                  {...register("skills")}
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  onKeyDown={handleAddSkill}
                  placeholder="Add skill and press enter..."
                  className="bg-transparent border-none outline-none text-sm text-(--on-surface) placeholder-(--on-surface-variant)/40 flex-grow min-w-[120px] py-1.5 px-2 font-medium"
                />
              </>
            )}
          </div>
          {errors.skills && (
            <p className="text-(--error) text-sm mt-1">
              {errors.skills.message}
            </p>
          )}
        </div>
        {/* Footer Actions */}
        <div className="flex flex-col-reverse sm:flex-row items-center justify-end gap-6 mt-12 mb-20">
          {/* <button className="flex items-center gap-2 text-sm font-medium text-(--on-surface-variant) hover:text-(--on-surface) transition-colors py-2">
          <ArrowLeft size={16} />
          Previous Step
        </button> */}
          <button
            type="submit"
            className="w-full sm:w-auto bg-(--primary) hover:bg-(--primary-container) text-[#000000] font-bold py-3.5 px-8 rounded-lg transition-all transform hover:scale-[1.02] shadow-[0_0_20px_rgba(106,242,222,0.3)] flex justify-center items-center gap-2"
          >
            Save & Continue
            <ArrowRight size={18} />
          </button>
        </div>
      </form>

      {/* Upload Error Modal */}
      <Modal
        isOpen={errorModalOpen}
        onClose={() => setErrorModalOpen(false)}
        title="Can't Read Files"
      >
        Your photos couldn't be uploaded. Photos should be less than 4 MB and
        saved as JPG, PNG, GIF, TIFF, HEIF or WebP files.
      </Modal>
    </div>
  );
}
