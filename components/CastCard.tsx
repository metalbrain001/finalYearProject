import React from "react";

interface CastCardProps {
  name: string;
  character: string;
  profile_path: string | null;
}

const CastCard: React.FC<CastCardProps> = ({
  name,
  character,
  profile_path,
}) => {
  const imageUrl = profile_path
    ? `https://image.tmdb.org/t/p/w500${profile_path}`
    : "/images/fallback.webp"; // ✅ Default fallback image

  return (
    <div className="text-white rounded-lg flex flex-col items-center p-4">
      <img
        src={imageUrl}
        alt={name}
        className="w-24 h-24 rounded-full object-cover shadow"
        loading="lazy"
        onError={(e) => (e.currentTarget.src = "/images/fallback.webp")}
      />
      <div className="text-center mt-2">
        <h3 className="font-semibold text-lg">{name}</h3>
        <p className="text-sm text-gray-400">{character}</p>
      </div>
    </div>
  );
};

export default CastCard;
