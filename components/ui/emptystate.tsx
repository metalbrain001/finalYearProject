// components/ui/EmptyState.tsx
import React from "react";

interface EmptyStateProps {
  title?: string;
  message?: string;
  icon?: React.ReactNode;
  imageSrc?: string;
  className?: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  title = "Nothing here yet",
  message = "There is no data to display at the moment.",
  icon,
  imageSrc,
  className = "",
}) => {
  return (
    <div
      className={`flex flex-col items-center justify-center text-center text-gray-400 py-8 px-4 ${className}`}
    >
      {icon && <div className="mb-3">{icon}</div>}

      {imageSrc && (
        <img
          src={imageSrc}
          alt={title}
          className="w-20 h-20 mb-3 opacity-60 object-contain"
        />
      )}

      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-sm mt-1 max-w-md">{message}</p>
    </div>
  );
};

export default EmptyState;
