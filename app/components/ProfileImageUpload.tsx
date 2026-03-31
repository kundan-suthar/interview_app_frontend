"use client";

import { useRef, useState } from "react";
import { User, Upload } from "lucide-react";

export default function ProfileImageUpload() {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [image, setImage] = useState<string | null>(null);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate type
    if (!file.type.startsWith("image/")) {
      alert("Only image files are allowed");
      return;
    }

    // Validate size (5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert("File size should be less than 5MB");
      return;
    }

    const imageUrl = URL.createObjectURL(file);
    setImage(imageUrl);
  };

  return (
    <div className="bg-(--surface-container-high) border border-(--outline-variant)/20 rounded-2xl p-8 flex flex-col items-center justify-center relative shadow-[0_8px_30px_rgb(0,0,0,0.12)] min-h-[300px]">
      {/* Hidden Input */}
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
    </div>
  );
}
