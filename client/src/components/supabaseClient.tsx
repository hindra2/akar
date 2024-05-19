// supabaseClient.js (for JavaScript)
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://ldyytltiuekjyuketpzm.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxkeXl0bHRpdWVranl1a2V0cHptIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTU5OTk3MTIsImV4cCI6MjAzMTU3NTcxMn0.90VUxXQpagNneWy1UJ7t4zDRfJMgqjlYV4pQOdheWB4";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
