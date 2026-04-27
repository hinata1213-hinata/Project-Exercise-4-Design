"use client";

import { useState } from "react";

type Theme = {
  bg: string; navy: string; navyMid: string; accent: string;
  accentLight: string; border: string; text: string; textMid: string;
  textLight: string; white: string; error: string; errorBg: string;
};

const THEMES: Record<string, Theme> = {
  green: {
    bg: "#F0F5F2", navy: "#1A3A2A", navyMid: "#245C3A", accent: "#16A34A",
    accentLight: "#F0FDF4", border: "#D1D5DB", text: "#111827", textMid: "#6B7280",
    textLight: "#9CA3AF", white: "#FFFFFF", error: "#DC2626", errorBg: "#FEF2F2",
  },
  orange: {
    bg: "#FDF6F0", navy: "#3A1F0A", navyMid: "#7A3A10", accent: "#EA580C",
    accentLight: "#FFF7ED", border: "#D1D5DB", text: "#111827", textMid: "#6B7280",
    textLight: "#9CA3AF", white: "#FFFFFF", error: "#DC2626", errorBg: "#FEF2F2",
  },
  blue: {
    bg: "#F0F2F5", navy: "#1B2A4A", navyMid: "#253860", accent: "#2563EB",
    accentLight: "#EFF6FF", border: "#D1D5DB", text: "#111827", textMid: "#6B7280",
    textLight: "#9CA3AF", white: "#FFFFFF", error: "#DC2626", errorBg: "#FEF2F2",
  },
};

function LoginCard({ C }: { C: Theme }) {
  const [userId,   setUserId]   = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading,  setLoading]  = useState(false);
  const [error,    setError]    = useState("");
  const [focusId,  setFocusId]  = useState<"userId" | "password" | null>(null);

  function handleSubmit(e: { preventDefault(): void }) {
    e.preventDefault();
    if (!userId || !password) {
      setError("ユーザーID・パスワードを入力してください。");
      return;
    }
    setError("");
    setLoading(true);
    setTimeout(() => setLoading(false), 1200);
  }

  return (
    <div style={{ background: C.white, borderRadius: "10px", boxShadow: "0 4px 24px rgba(0,0,0,0.10), 0 1px 4px rgba(0,0,0,0.06)", overflow: "hidden", width: "340px", flexShrink: 0 }}>

      <div style={{ height: "4px", background: `linear-gradient(90deg, ${C.navy}, ${C.accent}, ${C.navyMid})` }} />

      <div style={{ padding: "36px 36px 32px" }}>

        <div style={{ marginBottom: "28px" }}>
          <h1 style={{ margin: "0 0 6px", fontSize: "22px", fontWeight: 700, color: C.text }}>
            ログイン
          </h1>
          <p style={{ margin: 0, fontSize: "13px", color: C.textMid }}>
            業務システムへようこそ。認証情報を入力してください。
          </p>
        </div>

        {error && (
          <div style={{ background: C.errorBg, border: `1px solid ${C.error}30`, borderLeft: `3px solid ${C.error}`, borderRadius: "6px", padding: "10px 14px", marginBottom: "20px", display: "flex", alignItems: "center", gap: "8px" }}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <circle cx="7" cy="7" r="6.5" stroke={C.error} strokeWidth="1.2"/>
              <line x1="7" y1="4" x2="7" y2="8" stroke={C.error} strokeWidth="1.5" strokeLinecap="round"/>
              <circle cx="7" cy="10.5" r="0.8" fill={C.error}/>
            </svg>
            <span style={{ fontSize: "12px", color: C.error, fontWeight: 500 }}>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "18px" }}>

          <div>
            <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: C.text, marginBottom: "6px", letterSpacing: "0.02em" }}>
              ユーザーID
            </label>
            <div style={{ position: "relative" }}>
              <div style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <circle cx="8" cy="5.5" r="2.5" stroke={focusId === "userId" ? C.accent : C.textLight} strokeWidth="1.4"/>
                  <path d="M2 13c0-2.8 2.7-5 6-5s6 2.2 6 5" stroke={focusId === "userId" ? C.accent : C.textLight} strokeWidth="1.4" strokeLinecap="round"/>
                </svg>
              </div>
              <input
                type="text" value={userId}
                onChange={e => setUserId(e.target.value)}
                onFocus={() => setFocusId("userId")}
                onBlur={() => setFocusId(null)}
                placeholder="例）user001" autoComplete="username"
                style={{
                  width: "100%", padding: "11px 14px 11px 38px", fontSize: "14px",
                  border: `1.5px solid ${focusId === "userId" ? C.accent : C.border}`,
                  borderRadius: "6px", outline: "none", color: C.text,
                  background: focusId === "userId" ? C.accentLight : C.white,
                  boxSizing: "border-box", transition: "all 0.15s",
                  boxShadow: focusId === "userId" ? `0 0 0 3px ${C.accent}22` : "none",
                }}
              />
            </div>
          </div>

          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px" }}>
              <label style={{ fontSize: "12px", fontWeight: 600, color: C.text, letterSpacing: "0.02em" }}>パスワード</label>
              <button type="button" style={{ fontSize: "11px", color: C.accent, background: "none", border: "none", cursor: "pointer", padding: 0, fontWeight: 500 }}>
                パスワードを忘れた方
              </button>
            </div>
            <div style={{ position: "relative" }}>
              <div style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <rect x="3" y="7" width="10" height="7" rx="1.5" stroke={focusId === "password" ? C.accent : C.textLight} strokeWidth="1.4"/>
                  <path d="M5 7V5a3 3 0 0 1 6 0v2" stroke={focusId === "password" ? C.accent : C.textLight} strokeWidth="1.4" strokeLinecap="round"/>
                  <circle cx="8" cy="10.5" r="1" fill={focusId === "password" ? C.accent : C.textLight}/>
                </svg>
              </div>
              <input
                type={showPass ? "text" : "password"} value={password}
                onChange={e => setPassword(e.target.value)}
                onFocus={() => setFocusId("password")}
                onBlur={() => setFocusId(null)}
                placeholder="••••••••" autoComplete="current-password"
                style={{
                  width: "100%", padding: "11px 40px 11px 38px", fontSize: "14px",
                  border: `1.5px solid ${focusId === "password" ? C.accent : C.border}`,
                  borderRadius: "6px", outline: "none", color: C.text,
                  background: focusId === "password" ? C.accentLight : C.white,
                  boxSizing: "border-box", transition: "all 0.15s",
                  boxShadow: focusId === "password" ? `0 0 0 3px ${C.accent}22` : "none",
                  letterSpacing: showPass ? "normal" : "0.15em",
                }}
              />
              <button type="button" onClick={() => setShowPass(v => !v)}
                      style={{ position: "absolute", right: "10px", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", padding: "4px", color: C.textMid, display: "flex", alignItems: "center" }}>
                {showPass ? (
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M1 8s2.5-5 7-5 7 5 7 5-2.5 5-7 5-7-5-7-5z" stroke={C.textMid} strokeWidth="1.3"/>
                    <circle cx="8" cy="8" r="2" stroke={C.textMid} strokeWidth="1.3"/>
                    <line x1="2" y1="2" x2="14" y2="14" stroke={C.textMid} strokeWidth="1.3" strokeLinecap="round"/>
                  </svg>
                ) : (
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M1 8s2.5-5 7-5 7 5 7 5-2.5 5-7 5-7-5-7-5z" stroke={C.textMid} strokeWidth="1.3"/>
                    <circle cx="8" cy="8" r="2" stroke={C.textMid} strokeWidth="1.3"/>
                  </svg>
                )}
              </button>
            </div>
          </div>

          <label style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer" }}>
            <div style={{ width: "16px", height: "16px", border: `1.5px solid ${C.border}`, borderRadius: "3px", flexShrink: 0, background: C.white }} />
            <span style={{ fontSize: "12px", color: C.textMid }}>ログイン状態を保持する</span>
          </label>

          <button type="submit" disabled={loading}
                  style={{
                    width: "100%", padding: "13px",
                    background: loading ? `${C.accent}88` : `linear-gradient(135deg, ${C.accent}, ${C.navyMid})`,
                    color: C.white, border: "none", borderRadius: "6px",
                    fontSize: "14px", fontWeight: 700, letterSpacing: "0.05em",
                    cursor: loading ? "not-allowed" : "pointer",
                    boxShadow: loading ? "none" : `0 3px 12px ${C.accent}59`,
                    transition: "all 0.2s", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
                  }}>
            {loading ? (
              <>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ animation: "spin 0.9s linear infinite" }}>
                  <circle cx="8" cy="8" r="6" stroke="rgba(255,255,255,0.35)" strokeWidth="2"/>
                  <path d="M8 2a6 6 0 0 1 6 6" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                </svg>
                認証中…
              </>
            ) : "ログイン"}
          </button>

        </form>
      </div>

      <div style={{ background: "#F8F9FB", borderTop: `1px solid ${C.border}`, padding: "14px 36px" }}>
        <span style={{ fontSize: "11px", color: C.textLight }}>アカウント登録は管理者へお問い合わせください</span>
      </div>
    </div>
  );
}

export default function LoginAdminPage() {
  return (
    <div style={{
      minHeight: "100vh", background: "#ECECEC", display: "flex", alignItems: "center",
      justifyContent: "center", padding: "40px 24px",
      fontFamily: "'Helvetica Neue', Arial, sans-serif", overflowX: "auto",
    }}>
      <div style={{ display: "flex", gap: "28px", alignItems: "flex-start" }}>
        <LoginCard C={THEMES.green} />
        <LoginCard C={THEMES.orange} />
        <LoginCard C={THEMES.blue} />
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        input::placeholder { color: #C0C4CC; }
        button[type="submit"]:hover:not(:disabled) { opacity: 0.92; transform: translateY(-1px); }
      `}</style>
    </div>
  );
}
