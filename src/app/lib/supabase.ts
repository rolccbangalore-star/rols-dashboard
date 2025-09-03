// src/app/lib/supabase.ts
import { createClient } from "@supabase/supabase-js";
import { Database } from "@/types/database.types"; // ✅ fixed import

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;

// Typed client for Supabase
export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);