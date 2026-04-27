"use client";

import { useState } from "react";

type ThemeKey = "orange" | "green" | "blue";

const THEMES = {
  orange: {
    grad:        "linear-gradient(160deg, #fff7ed 0%, #ffedd5 50%, #fed7aa 100%)",
    icon:        "linear-gradient(135deg, #f97316, #ea580c)",
    iconShadow:  "rgba(249,115,22,0.35)",
    accent:      "#f97316",
    accentDark:  "#ea580c",
    accentLight: "#fff7ed",
    accentFocus: "rgba(249,115,22,0.12)",
    border:      "#e7e5e4",
    text:        "#1c1917",
    textMid:     "#44403c",
    textSub:     "#78716c",
    textLight:   "#a8a29e",
    inputBg:     "#fafaf9",
  },
  green: {
    grad:        "linear-gradient(160deg, #f0fdf4 0%, #dcfce7 50%, #bbf7d0 100%)",
    icon:        "linear-gradient(135deg, #22c55e, #16a34a)",
    iconShadow:  "rgba(34,197,94,0.35)",
    accent:      "#16a34a",
    accentDark:  "#15803d",
    accentLight: "#f0fdf4",
    accentFocus: "rgba(22,163,74,0.12)",
    border:      "#e7e5e4",
    text:        "#1c1917",
    textMid:     "#44403c",
    textSub:     "#78716c",
    textLight:   "#a8a29e",
    inputBg:     "#fafaf9",
  },
  blue: {
    grad:        "linear-gradient(160deg, #eff6ff 0%, #dbeafe 50%, #bfdbfe 100%)",
    icon:        "linear-gradient(135deg, #3b82f6, #2563eb)",
    iconShadow:  "rgba(59,130,246,0.35)",
    accent:      "#2563eb",
    accentDark:  "#1d4ed8",
    accentLight: "#eff6ff",
    accentFocus: "rgba(37,99,235,0.12)",
    border:      "#e7e5e4",
    text:        "#1c1917",
    textMid:     "#44403c",
    textSub:     "#78716c",
    textLight:   "#a8a29e",
    inputBg:     "#fafaf9",
  },
};

const SWATCHES: { key: ThemeKey; color: string; label: string }[] = [
  { key: "orange", color: "#f97316", label: "オレンジ" },
  { key: "green",  color: "#16a34a", label: "グリーン" },
  { key: "blue",   color: "#2563eb", label: "ブルー"   },
];

export default function UserLoginPage() {
  const [themeKey, setThemeKey] = useState<ThemeKey>("orange");
  const [email,    setEmail]    = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading,  setLoading]  = useState(false);
  const [error,    setError]    = useState("");
  const [focusId,  setFocusId]  = useState<"email" | "password" | null>(null);

  const T = THEMES[themeKey];

  function handleSubmit(e: { preventDefault(): void }) {
    e.preventDefault();
    if (!email || !password) {
      setError("メールアドレスとパスワードを入力してください。");
      return;
    }
    setError("");
    setLoading(true);
    setTimeout(() => setLoading(false), 1400);
  }

  return (
    <div style={{
      minHeight: "100vh",
      background: T.grad,
      display: "flex", alignItems: "center", justifyContent: "center",
      padding: "24px 16px",
      fontFamily: "'Helvetica Neue', Arial, 'Hiragino Sans', sans-serif",
      transition: "background 0.3s",
      position: "relative",
    }}>

      {/* 左側カラー切り替え */}
      <div style={{
        position: "fixed", left: "24px", top: "50%", transform: "translateY(-50%)",
        display: "flex", flexDirection: "column", gap: "12px",
        background: "rgba(255,255,255,0.7)", backdropFilter: "blur(8px)",
        borderRadius: "999px", padding: "12px 8px",
        boxShadow: "0 2px 12px rgba(0,0,0,0.10)",
      }}>
        {SWATCHES.map(s => (
          <button key={s.key} onClick={() => setThemeKey(s.key)} title={s.label}
                  style={{
                    width: "28px", height: "28px", borderRadius: "50%",
                    background: s.color, border: "none", cursor: "pointer",
                    boxShadow: themeKey === s.key
                      ? `0 0 0 3px white, 0 0 0 5px ${s.color}`
                      : "0 1px 4px rgba(0,0,0,0.2)",
                    transform: themeKey === s.key ? "scale(1.18)" : "scale(1)",
                    transition: "all 0.2s",
                  }} />
        ))}
      </div>

      <div style={{ width: "100%", maxWidth: "400px" }}>

        {/* ロゴ */}
        <div style={{ textAlign: "center", marginBottom: "28px" }}>
          <div style={{
            width: "72px", height: "72px", borderRadius: "20px",
            background: T.icon,
            display: "inline-flex", alignItems: "center", justifyContent: "center",
            boxShadow: `0 8px 24px ${T.iconShadow}`,
            marginBottom: "14px",
            transition: "background 0.3s, box-shadow 0.3s",
          }}>
            <svg width="38" height="38" viewBox="0 0 38 38" fill="none">
              <circle cx="19" cy="13" r="6" fill="white" opacity="0.9"/>
              <path d="M6 32c0-7.2 5.8-13 13-13s13 5.8 13 13" stroke="white" strokeWidth="2.5" strokeLinecap="round" opacity="0.9"/>
            </svg>
          </div>
          <h1 style={{ margin: "0 0 6px", fontSize: "26px", fontWeight: 800, color: T.text, letterSpacing: "-0.01em" }}>
            ようこそ
          </h1>
          <p style={{ margin: 0, fontSize: "14px", color: T.textSub }}>
            アカウントにログインしてください
          </p>
        </div>

        {/* カード */}
        <div style={{
          background: "rgba(255,255,255,0.85)",
          backdropFilter: "blur(12px)",
          borderRadius: "20px",
          boxShadow: "0 4px 32px rgba(0,0,0,0.08), 0 1px 4px rgba(0,0,0,0.04)",
          padding: "32px 28px",
          border: "1px solid rgba(255,255,255,0.9)",
        }}>

          {error && (
            <div style={{
              background: "#fef2f2", border: "1px solid #fecaca",
              borderRadius: "10px", padding: "12px 14px", marginBottom: "20px",
              display: "flex", alignItems: "center", gap: "8px",
            }}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <circle cx="8" cy="8" r="7" stroke="#ef4444" strokeWidth="1.3"/>
                <line x1="8" y1="5" x2="8" y2="9" stroke="#ef4444" strokeWidth="1.5" strokeLinecap="round"/>
                <circle cx="8" cy="11.5" r="0.8" fill="#ef4444"/>
              </svg>
              <span style={{ fontSize: "13px", color: "#ef4444" }}>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>

            {/* メールアドレス */}
            <div>
              <label style={{ display: "block", fontSize: "13px", fontWeight: 600, color: T.textMid, marginBottom: "7px" }}>
                メールアドレス
              </label>
              <div style={{ position: "relative" }}>
                <div style={{ position: "absolute", left: "13px", top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }}>
                  <svg width="17" height="17" viewBox="0 0 17 17" fill="none">
                    <rect x="1.5" y="3.5" width="14" height="10" rx="2" stroke={focusId === "email" ? T.accent : T.textLight} strokeWidth="1.4"/>
                    <path d="M1.5 6l7 4.5 7-4.5" stroke={focusId === "email" ? T.accent : T.textLight} strokeWidth="1.4" strokeLinecap="round"/>
                  </svg>
                </div>
                <input
                  type="email" value={email}
                  onChange={e => setEmail(e.target.value)}
                  onFocus={() => setFocusId("email")}
                  onBlur={() => setFocusId(null)}
                  placeholder="example@email.com" autoComplete="email"
                  style={{
                    width: "100%", padding: "12px 14px 12px 40px", fontSize: "15px",
                    border: `1.5px solid ${focusId === "email" ? T.accent : T.border}`,
                    borderRadius: "10px", outline: "none", color: T.text,
                    background: focusId === "email" ? T.accentLight : T.inputBg,
                    boxSizing: "border-box", transition: "all 0.15s",
                    boxShadow: focusId === "email" ? `0 0 0 3px ${T.accentFocus}` : "none",
                  }}
                />
              </div>
            </div>

            {/* パスワード */}
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "7px" }}>
                <label style={{ fontSize: "13px", fontWeight: 600, color: T.textMid }}>パスワード</label>
                <button type="button" style={{ fontSize: "12px", color: T.accent, background: "none", border: "none", cursor: "pointer", padding: 0, fontWeight: 600, transition: "color 0.2s" }}>
                  忘れた場合
                </button>
              </div>
              <div style={{ position: "relative" }}>
                <div style={{ position: "absolute", left: "13px", top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }}>
                  <svg width="17" height="17" viewBox="0 0 17 17" fill="none">
                    <rect x="3" y="8" width="11" height="7" rx="1.5" stroke={focusId === "password" ? T.accent : T.textLight} strokeWidth="1.4"/>
                    <path d="M5.5 8V6a3 3 0 0 1 6 0v2" stroke={focusId === "password" ? T.accent : T.textLight} strokeWidth="1.4" strokeLinecap="round"/>
                    <circle cx="8.5" cy="11.5" r="1" fill={focusId === "password" ? T.accent : T.textLight}/>
                  </svg>
                </div>
                <input
                  type={showPass ? "text" : "password"} value={password}
                  onChange={e => setPassword(e.target.value)}
                  onFocus={() => setFocusId("password")}
                  onBlur={() => setFocusId(null)}
                  placeholder="パスワードを入力" autoComplete="current-password"
                  style={{
                    width: "100%", padding: "12px 42px 12px 40px", fontSize: "15px",
                    border: `1.5px solid ${focusId === "password" ? T.accent : T.border}`,
                    borderRadius: "10px", outline: "none", color: T.text,
                    background: focusId === "password" ? T.accentLight : T.inputBg,
                    boxSizing: "border-box", transition: "all 0.15s",
                    boxShadow: focusId === "password" ? `0 0 0 3px ${T.accentFocus}` : "none",
                    letterSpacing: showPass ? "normal" : "0.12em",
                  }}
                />
                <button type="button" onClick={() => setShowPass(v => !v)}
                        style={{ position: "absolute", right: "12px", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", padding: "4px", color: T.textLight, display: "flex", alignItems: "center" }}>
                  {showPass ? (
                    <svg width="17" height="17" viewBox="0 0 17 17" fill="none">
                      <path d="M1.5 8.5s2.8-5.5 7-5.5 7 5.5 7 5.5-2.8 5.5-7 5.5-7-5.5-7-5.5z" stroke={T.textLight} strokeWidth="1.3"/>
                      <circle cx="8.5" cy="8.5" r="2" stroke={T.textLight} strokeWidth="1.3"/>
                      <line x1="2" y1="2" x2="15" y2="15" stroke={T.textLight} strokeWidth="1.3" strokeLinecap="round"/>
                    </svg>
                  ) : (
                    <svg width="17" height="17" viewBox="0 0 17 17" fill="none">
                      <path d="M1.5 8.5s2.8-5.5 7-5.5 7 5.5 7 5.5-2.8 5.5-7 5.5-7-5.5-7-5.5z" stroke={T.textLight} strokeWidth="1.3"/>
                      <circle cx="8.5" cy="8.5" r="2" stroke={T.textLight} strokeWidth="1.3"/>
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* ログインボタン */}
            <button type="submit" disabled={loading}
                    style={{
                      width: "100%", padding: "14px",
                      background: loading ? `${T.accent}88` : `linear-gradient(135deg, ${T.accent}, ${T.accentDark})`,
                      color: "white", border: "none", borderRadius: "12px",
                      fontSize: "15px", fontWeight: 700, letterSpacing: "0.04em",
                      cursor: loading ? "not-allowed" : "pointer",
                      boxShadow: loading ? "none" : `0 4px 16px ${T.iconShadow}`,
                      transition: "all 0.2s",
                      display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
                      marginTop: "4px",
                    }}>
              {loading ? (
                <>
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" style={{ animation: "spin 0.9s linear infinite" }}>
                    <circle cx="9" cy="9" r="7" stroke="rgba(255,255,255,0.4)" strokeWidth="2"/>
                    <path d="M9 2a7 7 0 0 1 7 7" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                  ログイン中…
                </>
              ) : "ログイン"}
            </button>

          </form>

          <div style={{ display: "flex", alignItems: "center", gap: "12px", margin: "20px 0" }}>
            <div style={{ flex: 1, height: "1px", background: T.border }} />
            <span style={{ fontSize: "12px", color: T.textLight }}>または</span>
            <div style={{ flex: 1, height: "1px", background: T.border }} />
          </div>

          <div style={{ textAlign: "center" }}>
            <span style={{ fontSize: "13px", color: T.textSub }}>アカウントをお持ちでない方は</span>
            <button type="button" style={{ fontSize: "13px", color: T.accent, background: "none", border: "none", cursor: "pointer", fontWeight: 700, marginLeft: "4px", padding: 0, transition: "color 0.2s" }}>
              新規登録
            </button>
          </div>

        </div>

        <p style={{ textAlign: "center", marginTop: "24px", fontSize: "11px", color: T.textLight }}>
          ログインすることで利用規約・プライバシーポリシーに同意したものとみなします
        </p>

      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        input::placeholder { color: #c4bfbb; }
        button[type="submit"]:hover:not(:disabled) { opacity: 0.9; transform: translateY(-1px); }
      `}</style>
    </div>
  );
}
