import { createClient } from "@supabase/supabase-js";

// ============================================================================
// KONFIGURASI SUPABASE
// Ganti dua nilai di bawah dengan milik project Supabase Anda.
// Ambil dari dashboard Supabase: Project Settings → API
//   - Project URL      → SUPABASE_URL
//   - anon / public key → SUPABASE_ANON_KEY
// (anon key aman berada di kode front-end; ia dilindungi oleh aturan
//  Auth/RLS di sisi Supabase, bukan rahasia.)
// ============================================================================

export const SUPABASE_URL = "https://bmoilhmcfyycigfhradq.supabase.co";
export const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJtb2lsaG1jZnl5Y2lnZmhyYWRxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODEzNzg3NzIsImV4cCI6MjA5Njk1NDc3Mn0.hJ_3PVsS0yrd5V-1Lu-6Y37_lIWeOgFBU2Qfh0k2JjQ";

// True hanya bila kedua nilai sudah diisi (bukan placeholder bawaan).
export const isConfigured =
  !!SUPABASE_URL &&
  !!SUPABASE_ANON_KEY &&
  !SUPABASE_URL.startsWith("__") &&
  !SUPABASE_ANON_KEY.startsWith("__");

// Client dibuat hanya bila konfigurasi sudah diisi, supaya app tidak crash
// bila ter-deploy sebelum key dimasukkan (AuthGate akan menampilkan pesan).
export const supabase = isConfigured
  ? createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
      auth: {
        persistSession: true,      // sesi disimpan di localStorage browser
        autoRefreshToken: true,    // token diperbarui otomatis
        detectSessionInUrl: false, // tak perlu; kita tidak pakai magic-link/OAuth redirect
      },
    })
  : null;
