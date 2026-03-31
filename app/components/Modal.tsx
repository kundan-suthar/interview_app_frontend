"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export default function Modal({ isOpen, onClose, title, children }: ModalProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || !isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div className="relative bg-(--surface-container-high) border border-(--outline-variant)/30 rounded-2xl shadow-2xl w-full max-w-md overflow-hidden transform transition-all">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-(--outline-variant)/20">
          <h3 className="text-lg font-bold text-(--on-surface)">
            {title}
          </h3>
          <button 
            onClick={onClose}
            className="text-(--on-surface-variant) hover:text-white transition-colors p-1 rounded-lg hover:bg-(--surface-bright)"
          >
            <X size={20} />
          </button>
        </div>
        
        {/* Body */}
        <div className="p-6 text-(--on-surface-variant) text-sm leading-relaxed">
          {children}
        </div>
        
        {/* Footer */}
        <div className="px-6 py-4 bg-[#040813]/50 border-t border-(--outline-variant)/10 flex justify-end">
          <button 
            onClick={onClose}
            className="bg-(--primary) hover:bg-(--primary-container) text-black font-semibold py-2 px-6 rounded-lg transition-colors"
          >
            Got it
          </button>
        </div>
      </div>
    </div>
  );
}
