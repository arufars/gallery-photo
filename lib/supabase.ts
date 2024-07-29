import "server-only";

import { createClient } from "@supabase/supabase-js";

// Gantilah dengan URL dan kunci Supabase Anda
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const bucketName = process.env.SUPABASE_BUCKET;

if (!supabaseUrl || !supabaseKey || !bucketName) {
  throw new Error("Please provide Supabase URL, key, and bucket name");
}

const supabase = createClient(supabaseUrl, supabaseKey);
// const supabaseBucket = supabase.storage.from(bucketName);

export { supabase, bucketName };
