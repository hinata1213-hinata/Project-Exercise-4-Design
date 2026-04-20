"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import logo from "./images.png";

// ── floating particle effect ──────────────────────────────
function spawnParticle(container: HTMLElement, color: string) {
  const el = document.createElement("div");
  const size    = Math.random() * 10 + 4;
  const dur     = Math.random() * 3 + 2;
  const delay   = Math.random() * 1.5;
  const opacity = Math.random() * 0.35 + 0.1;
  el.style.cssText = `
    position:fixed; pointer-events:none;
    width:${size}px; height:${size}px;
    border-radius:50%; background:${color}; opacity:0;
    left:${Math.random() * 100}%; bottom:-20px;
    animation:rise-particle ${dur}s ease-in ${delay}s forwards;
  `;
  el.style.setProperty("--max-opacity", String(opacity));
  container.appendChild(el);
  setTimeout(() => el.remove(), (dur + delay) * 1000 + 200);
}

// ── queue layout ──────────────────────────────────────────
const COLS = 5;
const ROWS = 3;
const CW   = 40;
const CH   = 40;
const PAD  = 16;
const SVG_W = PAD * 2 + COLS * CW;         // 216
const SVG_H = PAD + ROWS * CH + PAD + 28;  // 172

// ジグザグ順に座標を生成
const POSITIONS: { x: number; y: number }[] = [];
for (let r = 0; r < ROWS; r++) {
  const y = PAD + CH / 2 + r * CH;
  if (r % 2 === 0) {
    for (let c = 0; c < COLS; c++) POSITIONS.push({ x: PAD + CW / 2 + c * CW, y });
  } else {
    for (let c = COLS - 1; c >= 0; c--) POSITIONS.push({ x: PAD + CW / 2 + c * CW, y });
  }
}

const QUEUE_TOTAL      = 9;
const WAIT_PER_PERSON  = 2; // 分/人

function Arrow({ x, y, dir }: { x: number; y: number; dir: "right" | "left" | "down" }) {
  const c = "#FF8C00"; const w = 2;
  if (dir === "right")
    return <polyline points={`${x-6},${y-3.5} ${x},${y} ${x-6},${y+3.5}`}
                     fill="none" stroke={c} strokeWidth={w} strokeLinecap="round" strokeLinejoin="round" />;
  if (dir === "left")
    return <polyline points={`${x+6},${y-3.5} ${x},${y} ${x+6},${y+3.5}`}
                     fill="none" stroke={c} strokeWidth={w} strokeLinecap="round" strokeLinejoin="round" />;
  // down
  return <polyline points={`${x-3.5},${y-6} ${x},${y} ${x+3.5},${y-6}`}
                   fill="none" stroke={c} strokeWidth={w} strokeLinecap="round" strokeLinejoin="round" />;
}

export default function Home() {
  const particleRef = useRef<HTMLDivElement>(null);
  const [joined,   setJoined]   = useState(false);
  const [myNumber, setMyNumber] = useState(0);

  useEffect(() => {
    const c = particleRef.current;
    if (!c) return;
    for (let i = 0; i < 20; i++) setTimeout(() => spawnParticle(c, "#FF8C00"), i * 120);
    const id = setInterval(() => spawnParticle(c, "#FF8C00"), 400);
    return () => clearInterval(id);
  }, []);

  function handleJoin() {
    setMyNumber(QUEUE_TOTAL + 1);
    setJoined(true);
  }

  const totalInQueue = joined ? QUEUE_TOTAL + 1 : QUEUE_TOTAL;
  const waitMin      = totalInQueue * WAIT_PER_PERSON;

  return (
    <>
      <style>{`
        @keyframes rise-particle {
          0%   { transform:translateY(0) scale(1);    opacity:0; }
          15%  { opacity:var(--max-opacity); }
          80%  { opacity:var(--max-opacity); }
          100% { transform:translateY(-100vh) scale(0.4); opacity:0; }
        }
      `}</style>

      <main
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        style={{ background: "linear-gradient(135deg, #C45A00 0%, #D97000 40%, #E08020 70%, #C45A00 100%)" }}
      >
        {/* nav */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 z-20 flex gap-2 flex-wrap justify-center">
          {[1, 2, 3, 4, 5].map(n => (
            <Link key={n} href={`/design0${n}`}
                  className="px-4 py-1.5 rounded-full text-xs font-black transition-opacity hover:opacity-80"
                  style={{ background: "rgba(0,0,0,0.15)", color: "rgba(255,255,255,0.7)" }}>
              Design 0{n}
            </Link>
          ))}
          <span className="px-4 py-1.5 rounded-full text-xs font-black"
                style={{ background: "rgba(0,0,0,0.25)", color: "#fff" }}>
            Design 06
          </span>
        </div>

        {/* bg */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.07]"
             style={{ backgroundImage: "radial-gradient(circle, #fff 1.5px, transparent 1.5px)", backgroundSize: "32px 32px" }} />
        <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full pointer-events-none"
             style={{ background: "rgba(0,0,0,0.08)" }} />
        <div className="absolute -bottom-24 -left-24 w-80 h-80 rounded-full pointer-events-none"
             style={{ background: "rgba(0,0,0,0.06)" }} />
        <div ref={particleRef} className="fixed inset-0 pointer-events-none" />

        {/* card */}
        <div className="float-card relative z-10 mx-4">
          <div className="ring-spin absolute -inset-3 rounded-3xl border-4 border-dashed border-white/30 pointer-events-none" />

          <div className="relative rounded-3xl overflow-hidden" style={{ width: "340px" }}>
            <div className="h-3 w-full"
                 style={{ background: "linear-gradient(90deg, #B84800, #D97000, #C45A00, #D97000, #B84800)" }} />

            <div className="px-6 pt-5 pb-6" style={{ background: "#FFFAF4" }}>

              {/* ロゴ */}
              <div className="text-center mb-4">
                <span className="inline-block text-xs font-black tracking-widest uppercase px-3 py-1 rounded-full mb-3"
                      style={{ background: "rgba(180,80,0,0.12)", color: "#B04500" }}>
                  QUEUE GUIDE
                </span>
                <div className="flex justify-center mb-2">
                  <Image src={logo} alt="店舗ロゴ" height={52} style={{ objectFit: "contain" }} />
                </div>
                <p className="text-xs" style={{ color: "#A05030" }}>この列にお並びください</p>
              </div>

              {/* ジグザグ待ち列マップ */}
              <div className="rounded-2xl overflow-hidden mb-4"
                   style={{ background: "#FFF8F0", border: "2px solid rgba(255,140,0,0.25)" }}>
                <svg viewBox={`0 0 ${SVG_W} ${SVG_H}`} width="100%" style={{ display: "block" }}>

                  {/* 外枠 */}
                  <rect x="4" y="4" width={SVG_W - 8} height={SVG_H - 8} rx="8"
                        fill="rgba(255,140,0,0.04)" stroke="#FF8C00" strokeWidth="1.5" strokeOpacity="0.22" />

                  {/* 段区切りの破線 */}
                  {[1, 2].map(r => (
                    <line key={r}
                          x1={PAD} y1={PAD + r * CH}
                          x2={SVG_W - PAD} y2={PAD + r * CH}
                          stroke="#FF8C00" strokeWidth="1" strokeDasharray="4 3" strokeOpacity="0.22" />
                  ))}

                  {/* 折り返し弧（右端・左端） */}
                  {/* row0→row1: 右端 */}
                  <path d={`M ${SVG_W - PAD} ${PAD + CH * 0 + CH / 2}
                             Q ${SVG_W - PAD + 12} ${PAD + CH * 0 + CH / 2}
                               ${SVG_W - PAD + 12} ${PAD + CH * 1}
                             Q ${SVG_W - PAD + 12} ${PAD + CH * 1 + CH / 2}
                               ${SVG_W - PAD} ${PAD + CH * 1 + CH / 2}`}
                        fill="none" stroke="#FF8C00" strokeWidth="1.2"
                        strokeDasharray="3 3" strokeOpacity="0.35" />
                  {/* row1→row2: 左端 */}
                  <path d={`M ${PAD} ${PAD + CH * 1 + CH / 2}
                             Q ${PAD - 12} ${PAD + CH * 1 + CH / 2}
                               ${PAD - 12} ${PAD + CH * 2}
                             Q ${PAD - 12} ${PAD + CH * 2 + CH / 2}
                               ${PAD} ${PAD + CH * 2 + CH / 2}`}
                        fill="none" stroke="#FF8C00" strokeWidth="1.2"
                        strokeDasharray="3 3" strokeOpacity="0.35" />

                  {/* 進行方向矢印 */}
                  <Arrow x={PAD + CW * 2 + CW / 2} y={PAD + CH * 0 + CH / 2} dir="right" />
                  <Arrow x={PAD + CW * 2 + CW / 2} y={PAD + CH * 1 + CH / 2} dir="left"  />
                  <Arrow x={PAD + CW * 2 + CW / 2} y={PAD + CH * 2 + CH / 2} dir="right" />

                  {/* 折り返し点の下向き矢印 */}
                  <Arrow x={SVG_W - PAD + 12} y={PAD + CH + 6} dir="down" />
                  <Arrow x={PAD - 12}         y={PAD + CH * 2 + 6} dir="down" />

                  {/* SHOP エリア */}
                  <line x1="4" y1={PAD + ROWS * CH + 6} x2={SVG_W - 4} y2={PAD + ROWS * CH + 6}
                        stroke="#FF8C00" strokeWidth="1.8" strokeOpacity="0.45" />
                  <rect x="4" y={PAD + ROWS * CH + 6} width={SVG_W - 8} height={22}
                        fill="rgba(255,140,0,0.08)" />
                  <text x="14" y={PAD + ROWS * CH + 20} fontSize="7" fill="#FF6B00"
                        fontFamily="Arial" fontWeight="bold" letterSpacing="2" fillOpacity="0.6">
                    SHOP
                  </text>
                  <rect x={SVG_W - 66} y={PAD + ROWS * CH + 9} width="58" height="16" rx="4"
                        fill="#FF8C00" fillOpacity="0.9" />
                  <text x={SVG_W - 37} y={PAD + ROWS * CH + 20} textAnchor="middle" fontSize="9"
                        fill="white" fontFamily="Arial" fontWeight="bold" letterSpacing="1">
                    入口
                  </text>

                  {/* 人アイコン */}
                  {POSITIONS.slice(0, totalInQueue).map((pos, i) => {
                    const isYou = joined && i === totalInQueue - 1;
                    const color = isYou ? "#FF4500" : "#FF8C00";
                    return (
                      <g key={i} transform={`translate(${pos.x},${pos.y})`}>
                        {isYou && (
                          <text y="-15" textAnchor="middle" fontSize="6" fill="#FF4500"
                                fontFamily="Arial" fontWeight="black">YOU</text>
                        )}
                        <circle cx="0" cy="-6" r="4" fill={color} fillOpacity={isYou ? 1 : 0.8} />
                        <path d="M-5,1 Q0,10 5,1" fill={color} fillOpacity={isYou ? 1 : 0.8} />
                      </g>
                    );
                  })}

                </svg>
              </div>

              {/* 待ち人数（大） + 推定時間（小） */}
              <div className="flex items-center gap-3 mb-4">
                <div className="flex-1 rounded-2xl px-4 py-3 text-center"
                     style={{ background: "linear-gradient(135deg, #FDE8C8, #F5D0A0)", border: "2px solid rgba(180,90,0,0.2)" }}>
                  <p className="text-xs font-bold mb-1" style={{ color: "#8B4500" }}>待ち人数</p>
                  <p className="text-3xl font-black" style={{ color: "#7A3000" }}>
                    {totalInQueue}
                    <span className="text-sm ml-0.5 font-bold" style={{ color: "#A05000" }}>人</span>
                  </p>
                </div>
                {/* 推定時間は小さめ */}
                <div className="rounded-2xl px-4 py-3 text-center"
                     style={{ background: "rgba(255,140,0,0.08)", border: "1.5px solid rgba(180,90,0,0.15)" }}>
                  <p style={{ fontSize: "9px", fontWeight: 700, color: "#8B4500", marginBottom: "3px" }}>推定時間</p>
                  <p className="font-black leading-none" style={{ fontSize: "20px", color: "#7A3000" }}>
                    {waitMin}
                    <span style={{ fontSize: "11px", marginLeft: "2px", fontWeight: 700, color: "#A05000" }}>分</span>
                  </p>
                </div>
              </div>

              {/* 整理番号（参加後） */}
              {joined && (
                <div className="rounded-2xl px-5 py-3 mb-4 flex items-center justify-between"
                     style={{ background: "linear-gradient(135deg, #C45A00, #E07800)", boxShadow: "0 4px 14px rgba(180,80,0,0.4)" }}>
                  <p className="text-sm font-black text-white">あなたの番号</p>
                  <p className="text-3xl font-black text-white">
                    {myNumber}<span className="text-base ml-1 font-bold opacity-80">番</span>
                  </p>
                </div>
              )}

              {/* ボタン */}
              {!joined ? (
                <button
                  onClick={handleJoin}
                  className="w-full py-4 rounded-2xl text-base font-black tracking-wider transition-all duration-300 hover:scale-105 active:scale-95"
                  style={{
                    background: "linear-gradient(135deg, #B84800, #D06000)",
                    color: "#fff",
                    boxShadow: "0 6px 20px rgba(160,70,0,0.45), inset 0 1px 0 rgba(255,255,255,0.2)",
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

            <div className="h-2 w-full"
                 style={{ background: "linear-gradient(90deg, #D97000, #C45A00, #B84800, #C45A00, #D97000)" }} />
          </div>
        </div>
      </main>
    </>
  );
}
