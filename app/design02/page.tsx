"use client";

import { useEffect, useRef, useState } from "react";

// ── particle effect ───────────────────────────────────────
function spawnParticle(container: HTMLElement, color: string) {
  const el = document.createElement("div");
  const size    = Math.random() * 10 + 4;
  const dur     = Math.random() * 3 + 2;
  const delay   = Math.random() * 1.5;
  const opacity = Math.random() * 0.3 + 0.08;
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

// ── destination data ───────────────────────────────────────
type Dir = "up" | "down" | "left" | "right";
type Dest = { id: string; dir: Dir; label: string; sub: string; guide: string };

const DESTINATIONS: Dest[] = [
  { id: "goods",  dir: "up",    label: "グッズ売り場", sub: "GOODS SHOP", guide: "まっすぐ前に進んでください"     },
  { id: "venueA", dir: "left",  label: "会場 A",       sub: "VENUE A",    guide: "左に曲がって進んでください"     },
  { id: "venueB", dir: "right", label: "会場 B",       sub: "VENUE B",    guide: "右に曲がって進んでください"     },
  { id: "exit",   dir: "down",  label: "出口",          sub: "EXIT",       guide: "後ろ（来た方向）に戻ってください" },
];

// ── SVG constants ──────────────────────────────────────────
const W  = 320; const H  = 320;
const CX = 160; const CY = 160;
const PR = 24;   // person radius
const BW = 68;   const BH = 46;  const BRX = 13; // box size

// box centres —十分な余白を確保
const BC: Record<Dir, [number, number]> = {
  up:    [CX,  40],
  down:  [CX,  280],
  left:  [40,  CY],
  right: [280, CY],
};

// path endpoints
const FROM: Record<Dir, [number, number]> = {
  up:    [CX,       CY - PR - 2],
  down:  [CX,       CY + PR + 2],
  left:  [CX - PR - 2, CY],
  right: [CX + PR + 2, CY],
};
const TO: Record<Dir, [number, number]> = {
  up:    [CX,       BC.up[1]    + BH / 2 + 3],
  down:  [CX,       BC.down[1]  - BH / 2 - 3],
  left:  [BC.left[0]  + BW / 2 + 3, CY],
  right: [BC.right[0] - BW / 2 - 3, CY],
};

function ArrowHead({ dir }: { dir: Dir }) {
  const [tx, ty] = TO[dir];
  const s = 5;
  const pts: Record<Dir, string> = {
    up:    `${tx},${ty}   ${tx-s},${ty+s*1.6} ${tx+s},${ty+s*1.6}`,
    down:  `${tx},${ty}   ${tx-s},${ty-s*1.6} ${tx+s},${ty-s*1.6}`,
    left:  `${tx},${ty}   ${tx+s*1.6},${ty-s} ${tx+s*1.6},${ty+s}`,
    right: `${tx},${ty}   ${tx-s*1.6},${ty-s} ${tx-s*1.6},${ty+s}`,
  };
  return <polygon points={pts[dir]} fill="#27AE60" opacity="0.85" />;
}

function IconGoods() {
  return (
    <g>
      <path d="M-11,-3 L-11,11 Q-11,14 -8,14 L8,14 Q11,14 11,11 L11,-3 Z"
            fill="white" opacity="0.95" />
      <path d="M-5,-3 Q-5,-9 0,-9 Q5,-9 5,-3"
            fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" />
      <text textAnchor="middle" y="9" fontSize="9" fill="#27AE60" fontWeight="bold">★</text>
    </g>
  );
}
function IconFlag() {
  return (
    <g>
      <line x1="0" y1="-13" x2="0" y2="13" stroke="white" strokeWidth="2" strokeLinecap="round" />
      <path d="M0,-13 L14,-7 L0,-1 Z" fill="white" opacity="0.95" />
    </g>
  );
}
function IconExit() {
  return (
    <g>
      <rect x="-9" y="-13" width="18" height="24" rx="2"
            fill="none" stroke="white" strokeWidth="2" />
      <rect x="-6" y="-10" width="10" height="18" rx="1" fill="white" opacity="0.25" />
      <path d="M-2,1 L5,1" stroke="white" strokeWidth="2" strokeLinecap="round" />
      <path d="M3,-1.5 L5,1 L3,3.5" fill="none" stroke="white" strokeWidth="1.8"
            strokeLinecap="round" strokeLinejoin="round" />
    </g>
  );
}
function DestIcon({ id }: { id: string }) {
  if (id === "goods") return <IconGoods />;
  if (id === "exit")  return <IconExit />;
  return <IconFlag />;
}

export default function Home() {
  const particleRef = useRef<HTMLDivElement>(null);
  const [selected, setSelected] = useState<string | null>(null);

  useEffect(() => {
    const c = particleRef.current;
    if (!c) return;
    for (let i = 0; i < 16; i++) setTimeout(() => spawnParticle(c, "#FF8C00"), i * 130);
    const id = setInterval(() => spawnParticle(c, "#FF8C00"), 450);
    return () => clearInterval(id);
  }, []);

  const selectedDest = DESTINATIONS.find(d => d.id === selected);

  return (
    <>
      <style>{`
        @keyframes rise-particle {
          0%   { transform:translateY(0) scale(1);    opacity:0; }
          15%  { opacity:var(--max-opacity); }
          80%  { opacity:var(--max-opacity); }
          100% { transform:translateY(-100vh) scale(0.4); opacity:0; }
        }
        .dest-btn { cursor:pointer; }
        .dest-btn rect { transition: filter 0.18s; }
        .dest-btn:hover rect { filter:brightness(1.15) !important; }
      `}</style>

      <main
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        style={{ background: "linear-gradient(135deg, #C45A00 0%, #D97000 40%, #E08020 70%, #C45A00 100%)" }}
      >
        {/* bg dots */}
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

          <div className="relative rounded-3xl overflow-hidden" style={{ width: "420px" }}>
            <div className="h-3 w-full"
                 style={{ background: "linear-gradient(90deg, #B84800, #D97000, #C45A00, #D97000, #B84800)" }} />

            <div className="px-6 pt-6 pb-7" style={{ background: "#FFFAF4" }}>

              {/* タイトル */}
              <div className="text-center mb-5">
                <span className="inline-block text-xs font-black tracking-widest uppercase px-3 py-1 rounded-full mb-2"
                      style={{ background: "rgba(180,80,0,0.12)", color: "#B04500" }}>
                  MAP GUIDE
                </span>
                <p className="text-2xl font-black" style={{ color: "#8B3A00" }}>現在地から案内</p>
                <p className="text-xs mt-1" style={{ color: "#A05030" }}>行き先をタップしてください</p>
              </div>

              {/* マップ SVG */}
              <div className="rounded-2xl overflow-visible mb-5"
                   style={{ background: "linear-gradient(145deg, #f0f8ef, #e6f4e1)", border: "2px solid rgba(39,174,96,0.22)" }}>
                <svg viewBox={`0 0 ${W} ${H}`} width="100%" style={{ display: "block", overflow: "visible" }}>
                  <defs>
                    <radialGradient id="personGrad" cx="38%" cy="32%">
                      <stop offset="0%"   stopColor="#FFB340" />
                      <stop offset="100%" stopColor="#D06000" />
                    </radialGradient>
                  </defs>

                  {/* グリッド */}
                  <line x1={CX} y1="8" x2={CX} y2={H - 8}
                        stroke="#27AE60" strokeWidth="1" strokeDasharray="5 4" strokeOpacity="0.15" />
                  <line x1="8" y1={CY} x2={W - 8} y2={CY}
                        stroke="#27AE60" strokeWidth="1" strokeDasharray="5 4" strokeOpacity="0.15" />
                  <circle cx={CX} cy={CY} r="80" fill="none" stroke="#27AE60" strokeWidth="0.7" strokeOpacity="0.1" />
                  <circle cx={CX} cy={CY} r="50" fill="none" stroke="#27AE60" strokeWidth="0.5" strokeOpacity="0.08" />

                  {/* パス */}
                  {DESTINATIONS.map(d => {
                    const [fx, fy] = FROM[d.dir];
                    const [tx, ty] = TO[d.dir];
                    const sel = selected === d.id;
                    return (
                      <line key={d.id} x1={fx} y1={fy} x2={tx} y2={ty}
                            stroke={sel ? "#1A8A50" : "#27AE60"}
                            strokeWidth={sel ? 2.8 : 2}
                            strokeDasharray={sel ? "0" : "6 3"}
                            strokeOpacity={sel ? 1 : 0.5}
                            strokeLinecap="round" />
                    );
                  })}
                  {DESTINATIONS.map(d => <ArrowHead key={d.id} dir={d.dir} />)}

                  {/* 行き先バッジ + ラベル */}
                  {DESTINATIONS.map(d => {
                    const [bx, by] = BC[d.dir];
                    const sel = selected === d.id;

                    // ラベルの配置：バッジの外側（被らない位置）
                    const labelX = d.dir === "left"  ? bx - BW / 2 - 6
                                 : d.dir === "right" ? bx + BW / 2 + 6
                                 : bx;
                    const labelY = d.dir === "up"   ? by - BH / 2 - 18
                                 : d.dir === "down" ? by + BH / 2 + 18
                                 : by - BH / 2 - 10;
                    const anchor = d.dir === "left"  ? "end"
                                 : d.dir === "right" ? "start"
                                 : "middle";
                    return (
                      <g key={d.id} className="dest-btn"
                         onClick={() => setSelected(selected === d.id ? null : d.id)}>
                        {sel && (
                          <rect x={bx - BW / 2 - 5} y={by - BH / 2 - 5}
                                width={BW + 10} height={BH + 10} rx={BRX + 4}
                                fill="#1DB954" opacity="0.2" />
                        )}
                        <rect x={bx - BW / 2} y={by - BH / 2}
                              width={BW} height={BH} rx={BRX}
                              fill={sel ? "#1A8A50" : "#27AE60"}
                              style={{ filter: sel
                                ? "drop-shadow(0 4px 8px rgba(27,142,60,0.55))"
                                : "drop-shadow(0 2px 5px rgba(39,174,96,0.35))" }} />
                        <g transform={`translate(${bx},${by - 1})`}>
                          <DestIcon id={d.id} />
                        </g>
                        {/* ラベル（バッジの外） */}
                        <text x={labelX} y={labelY}
                              textAnchor={anchor}
                              fontSize="10.5" fontFamily="Arial" fontWeight="900"
                              fill={sel ? "#145C35" : "#236B45"}
                              letterSpacing="0.3">
                          {d.label}
                        </text>
                        <text x={labelX} y={labelY + 13}
                              textAnchor={anchor}
                              fontSize="7.5" fontFamily="Arial" fontWeight="bold"
                              fill="#2ECC71" letterSpacing="1" opacity="0.8">
                          {d.sub}
                        </text>
                      </g>
                    );
                  })}

                  {/* 人（中央） */}
                  <circle cx={CX} cy={CY} r={PR + 6}
                          fill="none" stroke="#FF8C00" strokeWidth="2" strokeOpacity="0.25">
                    <animate attributeName="r"
                             values={`${PR + 4};${PR + 16};${PR + 4}`}
                             dur="2s" repeatCount="indefinite" />
                    <animate attributeName="stroke-opacity"
                             values="0.4;0;0.4" dur="2s" repeatCount="indefinite" />
                  </circle>
                  <circle cx={CX} cy={CY + 3} r={PR} fill="rgba(0,0,0,0.12)" />
                  <circle cx={CX} cy={CY} r={PR} fill="url(#personGrad)"
                          style={{ filter: "drop-shadow(0 3px 8px rgba(200,100,0,0.5))" }} />
                  <circle cx={CX} cy={CY - 11} r="7" fill="white" opacity="0.9" />
                  <path d={`M${CX - 8},${CY - 2} L${CX},${CY + 14} L${CX + 8},${CY - 2} Z`}
                        fill="white" opacity="0.7" />
                  <text x={CX} y={CY + 38} textAnchor="middle"
                        fontSize="9" fontFamily="Arial" fontWeight="900"
                        fill="#B84800" letterSpacing="1.5">YOU</text>
                </svg>
              </div>

              {/* 案内パネル */}
              <div className="rounded-2xl px-5 py-4 transition-all duration-300"
                   style={{
                     background: selectedDest
                       ? "linear-gradient(135deg, #1A8A50, #27AE60)"
                       : "rgba(39,174,96,0.08)",
                     border: selectedDest ? "none" : "1.5px solid rgba(39,174,96,0.25)",
                     boxShadow: selectedDest ? "0 4px 16px rgba(27,142,60,0.35)" : "none",
                     minHeight: "60px",
                   }}>
                {selectedDest ? (
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">
                      {selectedDest.dir === "up"    ? "⬆️"
                     : selectedDest.dir === "down"  ? "⬇️"
                     : selectedDest.dir === "left"  ? "⬅️"
                     :                               "➡️"}
                    </span>
                    <div>
                      <p className="text-lg font-black text-white leading-tight">
                        {selectedDest.label}
                      </p>
                      <p className="text-xs text-white/80 mt-0.5">{selectedDest.guide}</p>
                    </div>
                  </div>
                ) : (
                  <p className="text-sm font-bold text-center"
                     style={{ color: "rgba(39,174,96,0.55)", lineHeight: "36px" }}>
                    行き先をタップすると案内が表示されます
                  </p>
                )}
              </div>

            </div>

            <div className="h-2 w-full"
                 style={{ background: "linear-gradient(90deg, #D97000, #C45A00, #B84800, #C45A00, #D97000)" }} />
          </div>
        </div>
      </main>
    </>
  );
}
