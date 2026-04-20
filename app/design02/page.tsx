"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const SHAPES = ["✿", "❋", "✻", "❀", "✾", "⬟"];
const COLORS = ["#22C55E", "#16A34A", "#4ADE80", "#86EFAC", "#15803D"];

function spawnLeaf(container: HTMLElement) {
  const el = document.createElement("div");
  el.className = "leaf-sparkle";
  const size  = Math.random() * 14 + 8;
  const color = COLORS[Math.floor(Math.random() * COLORS.length)];
  const shape = SHAPES[Math.floor(Math.random() * SHAPES.length)];
  const dur   = Math.random() * 1.4 + 0.9;
  const delay = Math.random() * 0.4;
  el.style.fontSize   = `${size}px`;
  el.style.color      = color;
  el.style.left       = `${Math.random() * 95}%`;
  el.style.top        = `${Math.random() * 90}%`;
  el.style.textShadow = `0 0 10px ${color}`;
  el.style.setProperty("--dur",   `${dur}s`);
  el.style.setProperty("--delay", `${delay}s`);
  el.innerText = shape;
  container.appendChild(el);
  setTimeout(() => el.remove(), (dur + delay) * 1000 + 100);
}

const QUEUE_TOTAL = 8;

const ROUTE_POSITIONS = [
  { x: 204, y: 115 }, { x: 159, y: 115 }, { x: 114, y: 115 }, { x: 69, y: 115 }, { x: 24, y: 115 },
  { x: 24,  y: 72  }, { x: 69,  y: 72  }, { x: 114, y: 72  }, { x: 159, y: 72  }, { x: 204, y: 72  },
  { x: 204, y: 28  }, { x: 159, y: 28  },
];

function Arrow({ x, y, dir }: { x: number; y: number; dir: "right" | "left" | "down" }) {
  const c = "#16A34A";
  const w = 2.2;
  if (dir === "right") return <polyline points={`${x-7},${y-4} ${x},${y} ${x-7},${y+4}`} fill="none" stroke={c} strokeWidth={w} strokeLinecap="round" strokeLinejoin="round"/>;
  if (dir === "left")  return <polyline points={`${x+7},${y-4} ${x},${y} ${x+7},${y+4}`} fill="none" stroke={c} strokeWidth={w} strokeLinecap="round" strokeLinejoin="round"/>;
  if (dir === "down")  return <polyline points={`${x-4},${y-7} ${x},${y} ${x+4},${y-7}`} fill="none" stroke={c} strokeWidth={w} strokeLinecap="round" strokeLinejoin="round"/>;
  return null;
}

export default function Design02() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [joined, setJoined]     = useState(false);
  const [myNumber, setMyNumber] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    for (let i = 0; i < 18; i++) setTimeout(() => spawnLeaf(container), i * 150);
    const id = setInterval(() => spawnLeaf(container), 380);
    return () => clearInterval(id);
  }, []);

  function handleJoin() {
    setMyNumber(QUEUE_TOTAL + 1);
    setJoined(true);
  }

  const totalInQueue = joined ? QUEUE_TOTAL + 1 : QUEUE_TOTAL;

  return (
    <main
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ background: "linear-gradient(135deg, #052E16 0%, #14532D 40%, #166534 70%, #052E16 100%)" }}
    >
      {/* デザイン切り替えリンク */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        <Link href="/design01"
              className="px-4 py-1.5 rounded-full text-xs font-black transition-opacity hover:opacity-80"
              style={{ background: "rgba(0,0,0,0.15)", color: "rgba(255,255,255,0.7)" }}>
          Design 01
        </Link>
        <span className="px-4 py-1.5 rounded-full text-xs font-black"
              style={{ background: "rgba(0,0,0,0.25)", color: "#fff" }}>
          Design 02
        </span>
      </div>

      {/* 背景ドット */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.06]"
        style={{ backgroundImage: "radial-gradient(circle, #86efac 1.5px, transparent 1.5px)", backgroundSize: "32px 32px" }}
      />

      {/* 装飾丸 */}
      <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full pointer-events-none"
           style={{ background: "rgba(134,239,172,0.07)" }} />
      <div className="absolute -bottom-24 -left-24 w-80 h-80 rounded-full pointer-events-none"
           style={{ background: "rgba(134,239,172,0.05)" }} />

      {/* きらめき */}
      <div ref={containerRef} className="fixed inset-0 pointer-events-none" />

      <div className="float-card relative z-10 mx-4">
        {/* 回転リング */}
        <div className="ring-spin absolute -inset-3 rounded-3xl border-4 border-dashed border-green-400/30 pointer-events-none" />

        <div className="relative rounded-3xl overflow-hidden" style={{ width: "340px" }}>
          {/* カード上部バー */}
          <div className="h-3 w-full"
               style={{ background: "linear-gradient(90deg, #14532D, #22C55E, #16A34A, #22C55E, #14532D)" }} />

          <div className="px-6 pt-5 pb-6" style={{ background: "#F0FDF4" }}>

            {/* タイトル */}
            <div className="text-center mb-4">
              <span
                className="inline-block text-xs font-black tracking-widest uppercase px-3 py-1 rounded-full mb-2"
                style={{ background: "rgba(22,163,74,0.12)", color: "#15803D" }}
              >
                QUEUE GUIDANCE
              </span>
              <p className="text-xl font-black" style={{ color: "#14532D" }}>
                列に並んでお待ちください
              </p>
            </div>

            {/* 案内図 */}
            <div
              className="rounded-2xl overflow-hidden mb-4"
              style={{ background: "#F0FDF4", border: "2px solid rgba(34,197,94,0.3)" }}
            >
              <svg viewBox="0 0 228 178" width="100%" style={{ display: "block" }}>

                {/* 外枠 */}
                <rect x="6" y="6" width="216" height="130" rx="8"
                      fill="rgba(34,197,94,0.06)" stroke="#22C55E" strokeWidth="1.5" strokeOpacity="0.35"/>

                {/* 「外」ラベル */}
                <text x="13" y="17" fontSize="6" fill="#16A34A" fontFamily="Arial"
                      fontWeight="bold" fillOpacity="0.55">外（待機エリア）</text>

                {/* レーン仕切り */}
                <line x1="13" y1="50" x2="196" y2="50"
                      stroke="#22C55E" strokeWidth="1.2" strokeLinecap="round"
                      strokeDasharray="5 3" strokeOpacity="0.4"/>
                <line x1="32" y1="94" x2="221" y2="94"
                      stroke="#22C55E" strokeWidth="1.2" strokeLinecap="round"
                      strokeDasharray="5 3" strokeOpacity="0.4"/>

                {/* 折り返し角 */}
                <path d="M196,50 Q214,50 214,28" fill="none" stroke="#22C55E"
                      strokeWidth="1" strokeDasharray="3 3" strokeOpacity="0.3"/>
                <path d="M32,94 Q14,94 14,116" fill="none" stroke="#22C55E"
                      strokeWidth="1" strokeDasharray="3 3" strokeOpacity="0.3"/>

                {/* 方向矢印 */}
                <Arrow x={182} y={28}  dir="right" />
                <Arrow x={214} y={50}  dir="down"  />
                <Arrow x={92}  y={72}  dir="left"  />
                <Arrow x={13}  y={94}  dir="down"  />
                <Arrow x={137} y={115} dir="right" />

                {/* 店舗エリア */}
                <line x1="6" y1="136" x2="222" y2="136"
                      stroke="#22C55E" strokeWidth="1.8" strokeOpacity="0.5"/>
                <rect x="6" y="136" width="216" height="36"
                      fill="rgba(34,197,94,0.10)"/>
                <text x="18" y="159" fontSize="7.5" fill="#16A34A" fontFamily="Arial"
                      fontWeight="black" letterSpacing="2" fillOpacity="0.65">SHOP</text>

                {/* 入口ラベル */}
                <rect x="150" y="144" width="68" height="22" rx="6"
                      fill="#16A34A" fillOpacity="0.9"/>
                <text x="184" y="159" textAnchor="middle" fontSize="9.5"
                      fill="white" fontFamily="Arial" fontWeight="bold" letterSpacing="1">入口</text>

                {/* 人アイコン */}
                {ROUTE_POSITIONS.slice(0, totalInQueue).map((pos, i) => {
                  const isYou = joined && i === totalInQueue - 1;
                  const color = isYou ? "#15803D" : "#22C55E";
                  return (
                    <g key={i} transform={`translate(${pos.x},${pos.y})`}>
                      {isYou && (
                        <text y="-17" textAnchor="middle" fontSize="6.5"
                              fill="#15803D" fontFamily="Arial" fontWeight="black">YOU</text>
                      )}
                      <circle cx="0" cy="-7" r="4.5" fill={color} fillOpacity={isYou ? 1 : 0.85}/>
                      <path d="M-5.5,1 Q0,11 5.5,1" fill={color} fillOpacity={isYou ? 1 : 0.85}/>
                    </g>
                  );
                })}

              </svg>
            </div>

            {/* 待ち人数 & 待ち時間 */}
            <div className="flex gap-3 mb-4">
              <div
                className="flex-1 rounded-2xl px-4 py-3 text-center"
                style={{ background: "linear-gradient(135deg, #DCFCE7, #BBF7D0)", border: "2px solid rgba(22,163,74,0.25)" }}
              >
                <p className="text-xs font-bold mb-1" style={{ color: "#15803D" }}>待ち人数</p>
                <p className="text-2xl font-black" style={{ color: "#14532D" }}>
                  {totalInQueue}<span className="text-sm ml-0.5 font-bold" style={{ color: "#166534" }}>人</span>
                </p>
              </div>
              <div
                className="flex-1 rounded-2xl px-4 py-3 text-center"
                style={{ background: "linear-gradient(135deg, #DCFCE7, #BBF7D0)", border: "2px solid rgba(22,163,74,0.25)" }}
              >
                <p className="text-xs font-bold mb-1" style={{ color: "#15803D" }}>待ち時間</p>
                <p className="text-2xl font-black" style={{ color: "#14532D" }}>
                  10<span className="text-sm ml-0.5 font-bold" style={{ color: "#166534" }}>分</span>
                </p>
              </div>
            </div>

            {/* あなたの番号 */}
            {joined && (
              <div
                className="rounded-2xl px-5 py-3 mb-4 flex items-center justify-between"
                style={{ background: "linear-gradient(135deg, #15803D, #22C55E)", boxShadow: "0 4px 14px rgba(22,163,74,0.4)" }}
              >
                <p className="text-sm font-black text-white">あなたの番号</p>
                <p className="text-3xl font-black text-white">
                  {myNumber}<span className="text-base ml-1 font-bold opacity-80">番</span>
                </p>
              </div>
            )}

            {/* ボタン or ドット */}
            {!joined ? (
              <button
                onClick={handleJoin}
                className="w-full py-4 rounded-2xl text-base font-black tracking-wider transition-all duration-300 hover:scale-105 active:scale-95"
                style={{
                  background: "linear-gradient(135deg, #14532D, #16A34A)",
                  color: "#fff",
                  boxShadow: "0 6px 20px rgba(22,163,74,0.45), inset 0 1px 0 rgba(255,255,255,0.15)",
                }}
              >
                ここに並ぶ
              </button>
            ) : (
              <div className="flex justify-center gap-2 py-2">
                <span className="dot1 inline-block w-3 h-3 rounded-full" style={{ background: "#22C55E" }} />
                <span className="dot2 inline-block w-3 h-3 rounded-full" style={{ background: "#4ADE80" }} />
                <span className="dot3 inline-block w-3 h-3 rounded-full" style={{ background: "#86EFAC" }} />
              </div>
            )}

          </div>

          {/* カード下部バー */}
          <div className="h-2 w-full"
               style={{ background: "linear-gradient(90deg, #22C55E, #14532D, #16A34A, #14532D, #22C55E)" }} />
        </div>
      </div>
    </main>
  );
}
