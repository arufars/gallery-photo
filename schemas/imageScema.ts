import { z } from "zod";

export const imageSchema = z.object({
  uid: z.string(),
  url: z.string(),
  public_id: z.string(),
  favorite: z.boolean(),
  created_at: z.date(),
  updated_at: z.date(),
});

export type ImageType = z.infer<typeof imageSchema>;
