import "react-native-url-polyfill/auto";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://pofffnjiaxllvyawfufr.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBvZmZmbmppYXhsbHZ5YXdmdWZyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjcwMzQwMDMsImV4cCI6MjA0MjYxMDAwM30.-ynsqfcqVD22dJx3E57GgEr6SuMAP1dQAvmKdh0fRrs";

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
