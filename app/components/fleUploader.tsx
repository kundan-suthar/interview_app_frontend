import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Upload } from "lucide-react";

interface MyDropzoneProps {
  onFileSelect: (file: File) => void;
  onError?: (error: string) => void;
}

export default function MyDropzone({ onFileSelect, onError }: MyDropzoneProps) {
  const onDrop = useCallback(
    (acceptedFiles: File[], fileRejections: any[]) => {
      if (fileRejections.length > 0) {
        const rejection = fileRejections[0];
        let errorMessage = "Invalid file.";

        if (rejection.errors[0]?.code === "file-too-large") {
          errorMessage = "The file is too large. Maximum size is 10MB.";
        } else if (rejection.errors[0]?.code === "file-invalid-type") {
          errorMessage = "Invalid file type. Please upload a PDF file.";
        }

        onError?.(errorMessage);
        return;
      }

      if (acceptedFiles.length > 0) {
        onFileSelect(acceptedFiles[0]);
      }
    },
    [onFileSelect, onError]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
    },
    maxSize: 10 * 1024 * 1024, // 10MB
    multiple: false,
  });

  return (
    <div
      {...getRootProps()}
      className="p-8 rounded-xl bg-(--surface-container-low) border-2 border-dashed border-(--outline-variant)/30 flex flex-col items-center justify-center gap-4 group cursor-pointer hover:border-(--primary)/50 transition-all"
    >
      <input {...getInputProps()} />
      <div className="w-12 h-12 rounded-full bg-(--surface-container-highest) flex items-center justify-center group-hover:scale-110 transition-transform">
        <Upload className="text-(--on-surface-variant)" size={20} />
      </div>
      <div className="text-center">
        {isDragActive ? (
          <p className="text-(--primary) font-medium animate-pulse">
            Drop the PDF here...
          </p>
        ) : (
          <>
            <p className="text-(--on-surface) font-medium">
              Drop resume or <span className="text-(--primary)">Browse</span> files
            </p>
            <p className="text-xs text-(--on-surface-variant) mt-1">
              PDF up to 10MB
            </p>
          </>
        )}
      </div>
    </div>
  );
}
