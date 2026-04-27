"use client";

import { useState } from "react";

export default function UserLoginPage() {
  const [email,    setEmail]    = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading,  setLoading]  = useState(false);
  const [error,    setError]    = useState("");
  const [focusId,  setFocusId]  = useState<"email" | "password" | null>(null);

  function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
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
      background: "linear-gradient(160deg, #fff7ed 0%, #ffedd5 50%, #fed7aa 100%)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "24px 16px",
      fontFamily: "'Helvetica Neue', Arial, 'Hiragino Sans', sans-serif",
    }}>

      <div style={{ width: "100%", maxWidth: "400px" }}>

        {/* ロゴ・ウェルカムエリア */}
        <div style={{ textAlign: "center", marginBottom: "32px" }}>
          <div style={{
            width: "72px", height: "72px", borderRadius: "20px",
            background: "linear-gradient(135deg, #f97316, #ea580c)",
            display: "inline-flex", alignItems: "center", justifyContent: "center",
            boxShadow: "0 8px 24px rgba(249,115,22,0.35)",
            marginBottom: "16px",
          }}>
            <svg width="38" height="38" viewBox="0 0 38 38" fill="none">
              <circle cx="19" cy="13" r="6" fill="white" opacity="0.9"/>
              <path d="M6 32c0-7.2 5.8-13 13-13s13 5.8 13 13" stroke="white" strokeWidth="2.5" strokeLinecap="round" opacity="0.9"/>
            </svg>
          </div>
          <h1 style={{ margin: "0 0 6px", fontSize: "26px", fontWeight: 800, color: "#1c1917", letterSpacing: "-0.01em" }}>
            ようこそ
          </h1>
          <p style={{ margin: 0, fontSize: "14px", color: "#78716c" }}>
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

          {/* エラー */}
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
              <label style={{ display: "block", fontSize: "13px", fontWeight: 600, color: "#44403c", marginBottom: "7px" }}>
                メールアドレス
              </label>
              <div style={{ position: "relative" }}>
                <div style={{ position: "absolute", left: "13px", top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }}>
                  <svg width="17" height="17" viewBox="0 0 17 17" fill="none">
                    <rect x="1.5" y="3.5" width="14" height="10" rx="2" stroke={focusId === "email" ? "#f97316" : "#a8a29e"} strokeWidth="1.4"/>
                    <path d="M1.5 6l7 4.5 7-4.5" stroke={focusId === "email" ? "#f97316" : "#a8a29e"} strokeWidth="1.4" strokeLinecap="round"/>
                  </svg>
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  onFocus={() => setFocusId("email")}
                  onBlur={() => setFocusId(null)}
                  placeholder="example@email.com"
                  autoComplete="email"
                  style={{
                    width: "100%", padding: "12px 14px 12px 40px",
                    fontSize: "15px",
                    border: `1.5px solid ${focusId === "email" ? "#f97316" : "#e7e5e4"}`,
                    borderRadius: "10px", outline: "none", color: "#1c1917",
                    background: focusId === "email" ? "#fff7ed" : "#fafaf9",
                    boxSizing: "border-box", transition: "all 0.15s",
                    boxShadow: focusId === "email" ? "0 0 0 3px rgba(249,115,22,0.12)" : "none",
                  }}
                />
              </div>
            </div>

            {/* パスワード */}
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "7px" }}>
                <label style={{ fontSize: "13px", fontWeight: 600, color: "#44403c" }}>
                  パスワード
                </label>
                <button type="button" style={{ fontSize: "12px", color: "#f97316", background: "none", border: "none", cursor: "pointer", padding: 0, fontWeight: 600 }}>
                  忘れた場合
                </button>
              </div>
              <div style={{ position: "relative" }}>
                <div style={{ position: "absolute", left: "13px", top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }}>
                  <svg width="17" height="17" viewBox="0 0 17 17" fill="none">
                    <rect x="3" y="8" width="11" height="7" rx="1.5" stroke={focusId === "password" ? "#f97316" : "#a8a29e"} strokeWidth="1.4"/>
                    <path d="M5.5 8V6a3 3 0 0 1 6 0v2" stroke={focusId === "password" ? "#f97316" : "#a8a29e"} strokeWidth="1.4" strokeLinecap="round"/>
                    <circle cx="8.5" cy="11.5" r="1" fill={focusId === "password" ? "#f97316" : "#a8a29e"}/>
                  </svg>
                </div>
                <input
                  type={showPass ? "text" : "password"}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  onFocus={() => setFocusId("password")}
                  onBlur={() => setFocusId(null)}
                  placeholder="パスワードを入力"
                  autoComplete="current-password"
                  style={{
                    width: "100%", padding: "12px 42px 12px 40px",
                    fontSize: "15px",
                    border: `1.5px solid ${focusId === "password" ? "#f97316" : "#e7e5e4"}`,
                    borderRadius: "10px", outline: "none", color: "#1c1917",
                    background: focusId === "password" ? "#fff7ed" : "#fafaf9",
                    boxSizing: "border-box", transition: "all 0.15s",
                    boxShadow: focusId === "password" ? "0 0 0 3px rgba(249,115,22,0.12)" : "none",
                    letterSpacing: showPass ? "normal" : "0.12em",
                  }}
                />
                <button type="button" onClick={() => setShowPass(v => !v)}
                        style={{ position: "absolute", right: "12px", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", padding: "4px", color: "#a8a29e", display: "flex", alignItems: "center" }}>
                  {showPass ? (
                    <svg width="17" height="17" viewBox="0 0 17 17" fill="none">
                      <path d="M1.5 8.5s2.8-5.5 7-5.5 7 5.5 7 5.5-2.8 5.5-7 5.5-7-5.5-7-5.5z" stroke="#a8a29e" strokeWidth="1.3"/>
                      <circle cx="8.5" cy="8.5" r="2" stroke="#a8a29e" strokeWidth="1.3"/>
                      <line x1="2" y1="2" x2="15" y2="15" stroke="#a8a29e" strokeWidth="1.3" strokeLinecap="round"/>
                    </svg>
                  ) : (
                    <svg width="17" height="17" viewBox="0 0 17 17" fill="none">
                      <path d="M1.5 8.5s2.8-5.5 7-5.5 7 5.5 7 5.5-2.8 5.5-7 5.5-7-5.5-7-5.5z" stroke="#a8a29e" strokeWidth="1.3"/>
                      <circle cx="8.5" cy="8.5" r="2" stroke="#a8a29e" strokeWidth="1.3"/>
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* ログインボタン */}
            <button type="submit" disabled={loading}
                    style={{
                      width: "100%", padding: "14px",
                      background: loading ? "#fdba74" : "linear-gradient(135deg, #f97316, #ea580c)",
                      color: "white", border: "none", borderRadius: "12px",
                      fontSize: "15px", fontWeight: 700, letterSpacing: "0.04em",
                      cursor: loading ? "not-allowed" : "pointer",
                      boxShadow: loading ? "none" : "0 4px 16px rgba(249,115,22,0.40)",
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

          {/* 区切り */}
          <div style={{ display: "flex", alignItems: "center", gap: "12px", margin: "20px 0" }}>
            <div style={{ flex: 1, height: "1px", background: "#e7e5e4" }} />
            <span style={{ fontSize: "12px", color: "#a8a29e" }}>または</span>
            <div style={{ flex: 1, height: "1px", background: "#e7e5e4" }} />
          </div>

          {/* 新規登録リンク */}
          <div style={{ textAlign: "center" }}>
            <span style={{ fontSize: "13px", color: "#78716c" }}>アカウントをお持ちでない方は</span>
            <button type="button" style={{ fontSize: "13px", color: "#f97316", background: "none", border: "none", cursor: "pointer", fontWeight: 700, marginLeft: "4px", padding: 0 }}>
              新規登録
            </button>
          </div>

        </div>

        {/* フッター */}
        <p style={{ textAlign: "center", marginTop: "24px", fontSize: "11px", color: "#a8a29e" }}>
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
