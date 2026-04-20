"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import logo from "./images.png";

// ── floating particle effect ──────────────────────────────
// 色・形に依存しない汎用パーティクル（円）
function spawnParticle(container: HTMLElement, accentColor: string) {
  const el = document.createElement("div");
  const size  = Math.random() * 10 + 4;
  const dur   = Math.random() * 3 + 2;
  const delay = Math.random() * 1.5;
  const x     = Math.random() * 100;
  const opacity = Math.random() * 0.35 + 0.1;

  el.style.cssText = `
    position: fixed;
    pointer-events: none;
    width: ${size}px;
    height: ${size}px;
    border-radius: 50%;
    background: ${accentColor};
    opacity: 0;
    left: ${x}%;
    bottom: -20px;
    animation: rise-particle ${dur}s ease-in ${delay}s forwards;
  `;
  // opacity は animation 内で制御するので初期は 0
  el.style.setProperty("--max-opacity", String(opacity));
  container.appendChild(el);
  setTimeout(() => el.remove(), (dur + delay) * 1000 + 200);
}

const QUEUE_TOTAL = 7;
const START_TIME  = "14:00";


export default function Home() {
  const particleRef = useRef<HTMLDivElement>(null);
  const [joined,   setJoined]   = useState(false);
  const [myNumber, setMyNumber] = useState(0);

  useEffect(() => {
    const c = particleRef.current;
    if (!c) return;
    const accent = "#FF8C00";
    // 初期バースト
    for (let i = 0; i < 20; i++) setTimeout(() => spawnParticle(c, accent), i * 120);
    const id = setInterval(() => spawnParticle(c, accent), 400);
    return () => clearInterval(id);
  }, []);

  function handleJoin() {
    setMyNumber(QUEUE_TOTAL + 1);
    setJoined(true);
  }

  return (
    <>
      {/* グローバルに rise-particle キーフレームを注入 */}
      <style>{`
        @keyframes rise-particle {
          0%   { transform: translateY(0)    scale(1);    opacity: 0; }
          15%  { opacity: var(--max-opacity); }
          80%  { opacity: var(--max-opacity); }
          100% { transform: translateY(-100vh) scale(0.4); opacity: 0; }
        }
      `}</style>

      <main
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        style={{ background: "linear-gradient(135deg, #C45A00 0%, #D97000 40%, #E08020 70%, #C45A00 100%)" }}
      >
        {/* nav */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 z-20 flex gap-2 flex-wrap justify-center">
          {[1, 2, 3, 4].map(n => (
            <Link key={n} href={`/design0${n}`}
                  className="px-4 py-1.5 rounded-full text-xs font-black transition-opacity hover:opacity-80"
                  style={{ background: "rgba(0,0,0,0.15)", color: "rgba(255,255,255,0.7)" }}>
              Design 0{n}
            </Link>
          ))}
          <span className="px-4 py-1.5 rounded-full text-xs font-black"
                style={{ background: "rgba(0,0,0,0.25)", color: "#fff" }}>
            Design 05
          </span>
        </div>

        {/* bg dots */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.07]"
             style={{ backgroundImage: "radial-gradient(circle, #fff 1.5px, transparent 1.5px)", backgroundSize: "32px 32px" }} />
        <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full pointer-events-none"
             style={{ background: "rgba(0,0,0,0.08)" }} />
        <div className="absolute -bottom-24 -left-24 w-80 h-80 rounded-full pointer-events-none"
             style={{ background: "rgba(0,0,0,0.06)" }} />

        {/* パーティクルコンテナ */}
        <div ref={particleRef} className="fixed inset-0 pointer-events-none" />

        {/* card */}
        <div className="float-card relative z-10 mx-4">
          <div className="ring-spin absolute -inset-3 rounded-3xl border-4 border-dashed border-white/30 pointer-events-none" />

          <div className="relative rounded-3xl overflow-hidden" style={{ width: "340px" }}>
            {/* top bar */}
            <div className="h-3 w-full"
                 style={{ background: "linear-gradient(90deg, #B84800, #D97000, #C45A00, #D97000, #B84800)" }} />

            <div className="px-6 pt-6 pb-6" style={{ background: "#FFFAF4" }}>

              {/* ラベル */}
              <div className="text-center mb-5">
                <span className="inline-block text-xs font-black tracking-widest uppercase px-3 py-1 rounded-full mb-3"
                      style={{ background: "rgba(180,80,0,0.12)", color: "#B04500" }}>
                  QUEUE TICKET
                </span>

                {/* 店舗ロゴ */}
                <div className="flex justify-center mb-1">
                  <Image src={logo} alt="店舗ロゴ" height={64} style={{ objectFit: "contain" }} />
                </div>
                <p className="text-xs" style={{ color: "#A05030" }}>
                  この列にお並びください
                </p>
              </div>

              {/* 開始時間 — メインビジュアル */}
              <div className="rounded-2xl px-6 py-5 mb-5 text-center"
                   style={{
                     background: "linear-gradient(135deg, #C45A00, #E07800)",
                     boxShadow: "0 6px 20px rgba(180,80,0,0.45)",
                   }}>
                <p className="text-xs font-black mb-2"
                   style={{ color: "rgba(255,255,255,0.75)", letterSpacing: "0.15em" }}>
                  開始時間
                </p>
                <p className="font-black text-white leading-none"
                   style={{ fontSize: "52px", letterSpacing: "0.05em" }}>
                  {START_TIME}
                </p>
                <p className="text-xs mt-2" style={{ color: "rgba(255,255,255,0.65)" }}>
                  時間になりましたら順番にご案内します
                </p>
              </div>

              {/* 待ち状況 */}
              <div className="flex gap-3 mb-5">
                <div className="flex-1 rounded-2xl px-4 py-3 text-center"
                     style={{ background: "linear-gradient(135deg, #FDE8C8, #F5D0A0)", border: "2px solid rgba(180,90,0,0.2)" }}>
                  <p className="text-xs font-bold mb-1" style={{ color: "#8B4500" }}>現在の待ち</p>
                  <p className="text-2xl font-black" style={{ color: "#7A3000" }}>
                    {joined ? QUEUE_TOTAL + 1 : QUEUE_TOTAL}
                    <span className="text-sm ml-0.5 font-bold" style={{ color: "#A05000" }}>人</span>
                  </p>
                </div>
                <div className="flex-1 rounded-2xl px-4 py-3 text-center"
                     style={{ background: "linear-gradient(135deg, #FDE8C8, #F5D0A0)", border: "2px solid rgba(180,90,0,0.2)" }}>
                  <p className="text-xs font-bold mb-1" style={{ color: "#8B4500" }}>目安の時間</p>
                  <p className="text-2xl font-black" style={{ color: "#7A3000" }}>
                    約 15<span className="text-sm ml-0.5 font-bold" style={{ color: "#A05000" }}>分</span>
                  </p>
                </div>
              </div>

              {/* 整理番号（参加後） */}
              {joined && (
                <div className="rounded-2xl px-5 py-3 mb-5 flex items-center justify-between"
                     style={{ background: "rgba(180,80,0,0.1)", border: "2px solid rgba(180,80,0,0.2)" }}>
                  <p className="text-sm font-black" style={{ color: "#8B3A00" }}>あなたの番号</p>
                  <p className="text-3xl font-black" style={{ color: "#7A3000" }}>
                    {myNumber}<span className="text-base ml-1 font-bold" style={{ color: "#A05000" }}>番</span>
                  </p>
                </div>
              )}

              {/* ボタン */}
              {!joined ? (
                <button
                  onClick={handleJoin}
                  className="w-full py-5 rounded-2xl text-xl font-black tracking-widest transition-all duration-300 hover:scale-105 active:scale-95"
                  style={{
                    background: "linear-gradient(135deg, #B84800, #D06000)",
                    color: "#fff",
                    boxShadow: "0 8px 24px rgba(160,70,0,0.5), inset 0 1px 0 rgba(255,255,255,0.2)",
                    letterSpacing: "0.15em",
                  }}
                >
                  ここに並ぶ
                </button>
              ) : (
                <div className="flex justify-center gap-2 py-2">
                  <span className="dot1 inline-block w-3 h-3 rounded-full" style={{ background: "#FF6B00" }} />
                  <span className="dot2 inline-block w-3 h-3 rounded-full" style={{ background: "#FF8C00" }} />
                  <span className="dot3 inline-block w-3 h-3 rounded-full" style={{ background: "#FFD700" }} />
                </div>
              )}

            </div>

            {/* bottom bar */}
            <div className="h-2 w-full"
                 style={{ background: "linear-gradient(90deg, #D97000, #C45A00, #B84800, #C45A00, #D97000)" }} />
          </div>
        </div>
      </main>
    </>
  );
}
