"use client";

import React, { useEffect, useRef } from "react";

interface TrailerModalProps {
  videoKey: string | null;
  videoTitle: string;
  isOpen: boolean;
  onClose: () => void;
}

const TrailerModal: React.FC<TrailerModalProps> = ({
  videoKey,
  videoTitle,
  isOpen,
  onClose,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  // Close modal when ESC key is pressed
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
    }
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !videoKey) return null; // Prevent rendering when closed or no trailer

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 transition-opacity duration-300"
      onClick={onClose}
    >
      <div
        ref={modalRef}
        className="rounded-lg overflow-hidden shadow-lg max-w-4xl w-full outline-none transform transition-all duration-300 scale-95 md:scale-100"
        onClick={(e) => e.stopPropagation()}
        tabIndex={-1}
      >
        <div className="relative">
          <iframe
            className="w-full h-[300px] md:h-[500px]"
            src={`https://www.youtube.com/embed/${videoKey}?autoplay=1`}
            title={videoTitle}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
          <button
            className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition duration-200"
            onClick={onClose}
            aria-label="Close trailer"
          >
            ✕
          </button>
        </div>
      </div>
    </div>
  );
};

export default TrailerModal;
