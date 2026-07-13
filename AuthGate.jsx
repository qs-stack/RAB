import React, { useEffect, useState } from "react";
import { supabase, isConfigured } from "./supabaseClient.js";
import Login from "./Login.jsx";

const FD = "'Space Grotesk','Segoe UI',system-ui,sans-serif";
const FB = "'Inter',system-ui,sans-serif";
const FM = "'IBM Plex Mono','SFMono-Regular',Consolas,monospace";

function Splash() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0F1115",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#5E6675",
        fontFamily: FM,
        fontSize: 13,
      }}
    >
      Memuat…
    </div>
  );
}

function ConfigNotice() {
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
      <div
        style={{
          maxWidth: 440,
          background: "#171B24",
          border: "1px solid rgba(255,255,255,.08)",
          borderRadius: 16,
          padding: "28px 30px",
          color: "#C7CBD6",
        }}
      >
        <div style={{ fontFamily: FD, fontWeight: 700, color: "#fff", fontSize: 17, marginBottom: 10 }}>
          Supabase belum dikonfigurasi
        </div>
        <div style={{ fontSize: 13.5, lineHeight: 1.6, color: "#8A93A3" }}>
          Isi <code style={{ fontFamily: FM, color: "#A5B4FC" }}>SUPABASE_URL</code> dan{" "}
          <code style={{ fontFamily: FM, color: "#A5B4FC" }}>SUPABASE_ANON_KEY</code> pada file{" "}
          <code style={{ fontFamily: FM, color: "#A5B4FC" }}>supabaseClient.js</code>, lalu build ulang.
        </div>
      </div>
    </div>
  );
}

function LogoutButton({ email }) {
  const [busy, setBusy] = useState(false);
  const doLogout = async () => {
    if (busy) return;
    setBusy(true);
    try {
      await supabase.auth.signOut();
    } finally {
      setBusy(false);
    }
    // onAuthStateChange di AuthGate akan mengembalikan ke layar Login.
  };
  return (
    <div
      style={{
        position: "fixed",
        right: 14,
        bottom: 14,
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        gap: 8,
        background: "rgba(23,27,36,.92)",
        border: "1px solid rgba(255,255,255,.12)",
        borderRadius: 999,
        padding: "6px 8px 6px 13px",
        boxShadow: "0 6px 20px rgba(0,0,0,.35)",
        backdropFilter: "blur(6px)",
      }}
    >
      {email && (
        <span
          style={{
            fontFamily: FM,
            fontSize: 11.5,
            color: "#9AA3B2",
            maxWidth: 180,
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
          title={email}
        >
          {email}
        </span>
      )}
      <button
        onClick={doLogout}
        disabled={busy}
        title="Keluar"
        style={{
          border: "1px solid rgba(255,255,255,.14)",
          background: "rgba(255,255,255,.06)",
          color: "#F87171",
          borderRadius: 999,
          padding: "5px 12px",
          fontSize: 12,
          fontFamily: FB,
          fontWeight: 600,
          cursor: busy ? "default" : "pointer",
        }}
      >
        {busy ? "…" : "Keluar"}
      </button>
    </div>
  );
}

export default function AuthGate({ children }) {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isConfigured) {
      setLoading(false);
      return;
    }
    let alive = true;
    supabase.auth.getSession().then(({ data }) => {
      if (!alive) return;
      setSession(data ? data.session : null);
      setLoading(false);
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_event, s) => {
      if (alive) setSession(s);
    });
    return () => {
      alive = false;
      if (sub && sub.subscription) sub.subscription.unsubscribe();
    };
  }, []);

  if (!isConfigured) return <ConfigNotice />;
  if (loading) return <Splash />;
  if (!session) return <Login />;

  return (
    <>
      {children}
      <LogoutButton email={session.user && session.user.email} />
    </>
  );
}
