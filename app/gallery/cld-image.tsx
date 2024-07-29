"use client";

import { CldImage } from "next-cloudinary";
import React, { useState, useOptimistic } from "react";
import { Icons } from "~/components/icons/icons";
import { setAsFavorite } from "./_action";
import { cn } from "~/lib/utils";

function LoadingSpinner() {
  return <div className="spinner">Loading...</div>; // Ganti ini dengan komponen spinner yang kamu inginkan
}

export default function CloudinaryImage({
  favorite,
  public_id,
  src,
  alt,
}: {
  public_id: string;
  favorite: boolean;
  src: string;
  alt?: string;
}) {
  const [loading, setLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(favorite);
  const [optimisticFavorite, setOptimisticFavorite] = useOptimistic(favorite);

  const handleLoad = () => {
    setLoading(false);
  };

  const handleFavoriteToggle = async () => {
    setIsFavorite(!isFavorite);

    setOptimisticFavorite((prev: any) => !prev);

    await setAsFavorite(public_id, isFavorite);
  };

  return (
    <div className="image-container relative">
      {loading && <LoadingSpinner />}
      <CldImage
        // {...props}
        onLoad={handleLoad}
        className={`image ${loading ? "loading" : "loaded"}`}
        src={src}
        alt={alt ? alt : "Image Created by User"}
        width="400"
        height="300"
        crop="fill"
        sizes="100vw"
        priority
      />
      <div className="absolute top-2 right-2 cursor-pointer" onClick={handleFavoriteToggle}>
        {optimisticFavorite ? (
          <Icons.FullHeart className="w-6 h-6 text-red-500 hover:text-white" />
        ) : (
          <Icons.Heart
            className={cn("w-6 h-6 hover:text-red-500", optimisticFavorite ? "text-red-500" : "")}
          />
        )}
      </div>
    </div>
  );
}
