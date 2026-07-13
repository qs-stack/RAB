import React, { useState } from "react";
import { supabase } from "./supabaseClient.js";

const FD = "'Space Grotesk','Segoe UI',system-ui,sans-serif";
const FB = "'Inter',system-ui,sans-serif";
const FM = "'IBM Plex Mono','SFMono-Regular',Consolas,monospace";
const ACC = "#818CF8";

// Terjemahkan pesan error Supabase ke Bahasa Indonesia yang ramah.
function pesanError(msg) {
  const m = (msg || "").toLowerCase();
  if (m.includes("invalid login credentials")) return "Email atau password salah.";
  if (m.includes("email not confirmed")) return "Email belum dikonfirmasi. Cek kotak masuk Anda.";
  if (m.includes("rate limit") || m.includes("too many"))
    return "Terlalu banyak percobaan. Coba lagi beberapa saat.";
  if (m.includes("failed to fetch") || m.includes("network"))
    return "Gagal menghubungi server. Periksa koneksi / konfigurasi Supabase.";
  return msg || "Terjadi kesalahan. Coba lagi.";
}

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    if (busy) return;
    setErr("");
    setBusy(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });
      if (error) setErr(pesanError(error.message));
      // Bila sukses, AuthGate mendeteksi perubahan sesi & menampilkan app.
    } catch (e2) {
      setErr(pesanError(e2 && e2.message));
    } finally {
      setBusy(false);
    }
  };

  const field = {
    width: "100%",
    boxSizing: "border-box",
    border: "1px solid #2A2E37",
    background: "#141821",
    borderRadius: 10,
    padding: "11px 13px",
    fontSize: 14,
    color: "#F7F8FA",
    fontFamily: FB,
    outline: "none",
  };
  const label = {
    display: "block",
    fontSize: 11,
    letterSpacing: 0.5,
    textTransform: "uppercase",
    color: "#8A93A3",
    fontFamily: FM,
    marginBottom: 6,
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0F1115",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
        fontFamily: FB,
      }}
    >
      <form
        onSubmit={submit}
        style={{
          width: "100%",
          maxWidth: 380,
          background: "#171B24",
          border: "1px solid rgba(255,255,255,.08)",
          borderRadius: 18,
          padding: "34px 30px 30px",
          boxShadow: "0 20px 60px rgba(0,0,0,.45)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
          <span
            style={{
              width: 30,
              height: 30,
              borderRadius: 8,
              background: ACC,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#0F1115",
              fontFamily: FD,
              fontWeight: 800,
              fontSize: 16,
            }}
          >
            R
          </span>
          <span
            style={{
              color: "#fff",
              fontFamily: FD,
              fontWeight: 700,
              fontSize: 19,
              letterSpacing: 0.4,
            }}
          >
            RAB STUDIO
          </span>
        </div>
        <div style={{ color: "#8A93A3", fontSize: 13, marginBottom: 24, marginLeft: 40 }}>
          Masuk untuk melanjutkan
        </div>

        <div style={{ marginBottom: 15 }}>
          <label style={label} htmlFor="rab-email">Email</label>
          <input
            id="rab-email"
            type="email"
            autoComplete="username"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={field}
            placeholder="nama@perusahaan.com"
          />
        </div>

        <div style={{ marginBottom: 18 }}>
          <label style={label} htmlFor="rab-pass">Password</label>
          <input
            id="rab-pass"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={field}
            placeholder="••••••••"
          />
        </div>

        {err && (
          <div
            role="alert"
            style={{
              background: "rgba(248,113,113,.10)",
              border: "1px solid rgba(248,113,113,.35)",
              color: "#FCA5A5",
              borderRadius: 10,
              padding: "9px 12px",
              fontSize: 12.5,
              marginBottom: 16,
            }}
          >
            {err}
          </div>
        )}

        <button
          type="submit"
          disabled={busy}
          style={{
            width: "100%",
            border: "none",
            borderRadius: 10,
            padding: "12px 14px",
            fontSize: 14,
            fontWeight: 600,
            fontFamily: FB,
            cursor: busy ? "default" : "pointer",
            background: busy ? "#4B5169" : ACC,
            color: busy ? "#C7CBD6" : "#0F1115",
            transition: "background .15s",
          }}
        >
          {busy ? "Memproses…" : "Masuk"}
        </button>

        <div
          style={{
            marginTop: 18,
            fontSize: 11,
            color: "#5E6675",
            fontFamily: FM,
            textAlign: "center",
          }}
        >
          Akses khusus tim EPCC — akun dibuat oleh administrator.
        </div>
      </form>
    </div>
  );
}
