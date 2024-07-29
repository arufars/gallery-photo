import "server-only";

import { cache } from "react";
import { supabase } from "~/lib/supabase";
import { ImageType } from "~/schemas/imageScema";
import { unstable_cache } from "next/cache";

export const getImages = cache(async () => {
  const response = await supabase.from("images").select("*");

  if (response.error) {
    throw new Error(response.error.message);
  }

  return response.data.map((image) => getImageDTO(image));
});

export const getImageCache = unstable_cache(
  async () => {
    const response = await supabase.from("images").select("*");

    if (response.error) {
      throw new Error(response.error.message);
    }

    return response.data.map((image) => getImageDTO(image));
  },
  ["images"],
  {
    tags: ["images"],
  }
);

export const getImageNoCache = async () => {
  const response = await supabase.from("images").select("*");

  if (response.error) {
    throw new Error(response.error.message);
  }

  return response.data.map((image) => getImageDTO(image));
};

const getImageDTO = (image: ImageType) => {
  return {
    id: image.uid,
    url: image.url,
    public_id: image.public_id,
    favorite: image.favorite,
    created_at: new Date(image.created_at),
    updated_at: new Date(image.updated_at),
  };
};
