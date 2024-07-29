"use server";

import { revalidatePath, revalidateTag } from "next/cache";
import cloudinary from "~/lib/cloudinary";
import { supabase } from "~/lib/supabase";

export const createImage = async (url: string, public_id: string) => {
  await supabase.from("images").insert([
    {
      url: url,
      public_id: public_id,
    },
  ]);

  console.table({
    url,
    public_id,
  });

  // revalidatePath("/gallery");
  revalidateTag("images");
};

export const setAsFavorite = async (public_id: string, isFavorite: boolean) => {
  if (isFavorite) {
    await cloudinary.uploader.remove_tag("favorite", [public_id]);
  } else {
    await cloudinary.uploader.add_tag("favorite", [public_id]);
  }

  const updatedPost = await supabase
    .from("images")
    .update({ favorite: !isFavorite })
    .match({ public_id: public_id });

  console.log(updatedPost);

  revalidateTag("images");
};

export const setAsTags = async (public_id: string, tags: string[]) => {
  // Dapatkan image dari public_id
  const { data: image, error: imageError } = await supabase
    .from("images")
    .select("uid")
    .eq("public_id", public_id)
    .single();

  if (imageError) {
    console.error("Error fetching image:", imageError);
    return;
  }

  const imageId = image.uid;

  // Loop through each tag and handle them
  for (const tagName of tags) {
    // Periksa apakah tag sudah ada
    const { data: existingTag, error: tagError } = await supabase
      .from("tags")
      .select("id")
      .eq("name", tagName)
      .single();

    let tagId;
    if (existingTag) {
      // Jika tag sudah ada, gunakan id-nya
      tagId = existingTag.id;
    } else {
      // Jika tag belum ada, tambahkan ke tabel tags
      const { data: newTag, error: newTagError } = await supabase
        .from("tags")
        .insert({ name: tagName })
        .select()
        .single();

      if (newTagError) {
        console.error("Error inserting new tag:", newTagError);
        continue;
      }

      tagId = newTag.id;
    }

    // Hubungkan image dengan tag di tabel image_tags
    const { error: imageTagError } = await supabase
      .from("image_tags")
      .insert({ image_id: imageId, tag_id: tagId });

    if (imageTagError) {
      console.error("Error inserting into image_tags:", imageTagError);
      continue;
    }
  }

  // Menambahkan tag ke cloudinary
  for (const tag of tags) {
    await cloudinary.uploader.add_tag(tag, [public_id]);
  }

  // Revalidate tags cache
  revalidateTag("images");
};
