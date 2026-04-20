"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const SHAPES = ["★", "✦", "●", "♦", "◆"];
const SPARK_COLORS = ["#FF8C00", "#FFB300", "#FF6B00", "#FFD700", "#FF4500"];

function spawnSparkle(container: HTMLElement) {
  const el = document.createElement("div");
  el.className = "sparkle";
  const size  = Math.random() * 14 + 7;
  const color = SPARK_COLORS[Math.floor(Math.random() * SPARK_COLORS.length)];
  const shape = SHAPES[Math.floor(Math.random() * SHAPES.length)];
  const dur   = Math.random() * 1.2 + 0.8;
  const delay = Math.random() * 0.3;
  el.style.fontSize   = `${size}px`;
  el.style.color      = color;
  el.style.left       = `${Math.random() * 95}%`;
  el.style.top        = `${Math.random() * 90}%`;
  el.style.textShadow = `0 0 8px ${color}`;
  el.style.setProperty("--dur",   `${dur}s`);
  el.style.setProperty("--delay", `${delay}s`);
  el.innerText = shape;
  container.appendChild(el);
  setTimeout(() => el.remove(), (dur + delay) * 1000 + 100);
}

type Step = { id: number; action: string; icon: string };

const STEPS: Step[] = [
  { id: 1, action: "入口で整理券を受け取る",   icon: "🎫" },
  { id: 2, action: "待機エリア A で待つ",       icon: "🪑" },
  { id: 3, action: "B エリアへ移動する",        icon: "🚶" },
  { id: 4, action: "カウンターでお手続きする",  icon: "🏪" },
];

const QUEUE_TOTAL = 8;

export default function Home() {
  const sparkRef = useRef<HTMLDivElement>(null);
  const [joined,    setJoined]    = useState(false);
  const [myNumber,  setMyNumber]  = useState(0);
  const [stepIndex, setStepIndex] = useState(0);

  useEffect(() => {
    const c = sparkRef.current;
    if (!c) return;
    for (let i = 0; i < 18; i++) setTimeout(() => spawnSparkle(c), i * 150);
    const id = setInterval(() => spawnSparkle(c), 350);
    return () => clearInterval(id);
  }, []);

  function handleJoin() {
    setMyNumber(QUEUE_TOTAL + 1);
    setJoined(true);
  }

  function handleNextStep() {
    if (stepIndex < STEPS.length - 1) setStepIndex(s => s + 1);
  }

  const ahead     = Math.max(0, QUEUE_TOTAL - stepIndex * 2);
  const waitMin   = Math.max(1, 10 - stepIndex * 3);
  const current   = STEPS[stepIndex];
  const next      = STEPS[stepIndex + 1];
  const completed = stepIndex === STEPS.length - 1;

  return (
    <main
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ background: "linear-gradient(135deg, #C45A00 0%, #D97000 40%, #E08020 70%, #C45A00 100%)" }}
    >
      {/* nav */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 z-20 flex gap-2 flex-wrap justify-center">
        {[1, 2, 3].map(n => (
          <Link key={n} href={`/design0${n}`}
                className="px-4 py-1.5 rounded-full text-xs font-black transition-opacity hover:opacity-80"
                style={{ background: "rgba(0,0,0,0.15)", color: "rgba(255,255,255,0.7)" }}>
            Design 0{n}
          </Link>
        ))}
        <span className="px-4 py-1.5 rounded-full text-xs font-black"
              style={{ background: "rgba(0,0,0,0.25)", color: "#fff" }}>
          Design 04
        </span>
      </div>

      {/* bg */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.07]"
           style={{ backgroundImage: "radial-gradient(circle, #fff 1.5px, transparent 1.5px)", backgroundSize: "32px 32px" }} />
      <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full pointer-events-none"
           style={{ background: "rgba(0,0,0,0.08)" }} />
      <div className="absolute -bottom-24 -left-24 w-80 h-80 rounded-full pointer-events-none"
           style={{ background: "rgba(0,0,0,0.06)" }} />
      <div ref={sparkRef} className="fixed inset-0 pointer-events-none" />

      {/* card */}
      <div className="float-card relative z-10 mx-4 my-16">
        <div className="ring-spin absolute -inset-3 rounded-3xl border-4 border-dashed border-white/30 pointer-events-none" />

        <div className="relative rounded-3xl overflow-hidden" style={{ width: "340px" }}>
          <div className="h-3 w-full"
               style={{ background: "linear-gradient(90deg, #B84800, #D97000, #C45A00, #D97000, #B84800)" }} />

          <div className="px-6 pt-6 pb-6" style={{ background: "#FFFAF4" }}>

            {/* ===== 未参加 ===== */}
            {!joined && (
              <>
                {/* タイトル */}
                <div className="text-center mb-5">
                  <span className="inline-block text-xs font-black tracking-widest uppercase px-3 py-1 rounded-full mb-2"
                        style={{ background: "rgba(180,80,0,0.12)", color: "#B04500" }}>
                    SMART QUEUE
                  </span>
                  <p className="text-2xl font-black" style={{ color: "#8B3A00" }}>行列ガイド</p>
                  <p className="text-xs mt-1" style={{ color: "#A05030" }}>
                    並び方・次の行動をお知らせします
                  </p>
                </div>

                {/* 待ち状況 */}
                <div className="flex gap-3 mb-5">
                  <div className="flex-1 rounded-2xl px-4 py-3 text-center"
                       style={{ background: "linear-gradient(135deg, #FDE8C8, #F5D0A0)", border: "2px solid rgba(180,90,0,0.2)" }}>
                    <p className="text-xs font-bold mb-1" style={{ color: "#8B4500" }}>現在の待ち</p>
                    <p className="text-2xl font-black" style={{ color: "#7A3000" }}>
                      {QUEUE_TOTAL}<span className="text-sm ml-0.5 font-bold" style={{ color: "#A05000" }}>人</span>
                    </p>
                  </div>
                  <div className="flex-1 rounded-2xl px-4 py-3 text-center"
                       style={{ background: "linear-gradient(135deg, #FDE8C8, #F5D0A0)", border: "2px solid rgba(180,90,0,0.2)" }}>
                    <p className="text-xs font-bold mb-1" style={{ color: "#8B4500" }}>目安の時間</p>
                    <p className="text-2xl font-black" style={{ color: "#7A3000" }}>
                      10<span className="text-sm ml-0.5 font-bold" style={{ color: "#A05000" }}>分</span>
                    </p>
                  </div>
                </div>

                {/* 大きなボタン */}
                <button
                  onClick={handleJoin}
                  className="w-full py-5 rounded-2xl text-xl font-black tracking-widest transition-all duration-300 hover:scale-105 active:scale-95 mb-5"
                  style={{
                    background: "linear-gradient(135deg, #B84800, #D06000)",
                    color: "#fff",
                    boxShadow: "0 8px 24px rgba(160,70,0,0.5), inset 0 1px 0 rgba(255,255,255,0.2)",
                    letterSpacing: "0.15em",
                  }}
                >
                  ここに並ぶ
                </button>

                {/* 流れの説明 */}
                <div className="rounded-2xl px-4 py-4"
                     style={{ background: "#FFF3E6", border: "2px solid rgba(255,140,0,0.2)" }}>
                  <p className="text-xs font-black mb-3" style={{ color: "#8B4500" }}>並んだあとの流れ</p>
                  <div className="flex flex-col gap-2">
                    {STEPS.map((step, i) => (
                      <div key={step.id} className="flex items-center gap-3">
                        <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-black shrink-0"
                             style={{ background: "rgba(255,140,0,0.15)", color: "#B04500" }}>
                          {step.id}
                        </div>
                        <span className="text-sm" style={{ color: "#7A3000" }}>
                          {step.icon} {step.action}
                        </span>
                        {i < STEPS.length - 1 && (
                          <div className="ml-auto text-xs" style={{ color: "rgba(180,100,0,0.3)" }}>↓</div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}

            {/* ===== 参加後 ===== */}
            {joined && (
              <>
                {/* 整理券番号 */}
                <div className="rounded-2xl px-5 py-4 mb-4 flex items-center justify-between"
                     style={{
                       background: "linear-gradient(135deg, #C45A00, #E07800)",
                       boxShadow: "0 4px 16px rgba(180,80,0,0.4)",
                     }}>
                  <div>
                    <p className="text-xs font-black text-white/80 mb-0.5">あなたの整理番号</p>
                    <p className="text-4xl font-black text-white leading-none">
                      {myNumber}<span className="text-lg ml-1 font-bold opacity-80">番</span>
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-white/70 mb-0.5">前の人数</p>
                    <p className="text-2xl font-black text-white">{ahead}<span className="text-sm ml-0.5 opacity-80">人</span></p>
                    <p className="text-xs text-white/70 mt-1">約 {waitMin} 分</p>
                  </div>
                </div>

                {/* 今すること — メイン */}
                {!completed ? (
                  <div className="rounded-2xl px-5 py-5 mb-4 text-center"
                       style={{ background: "#FFF3E6", border: "2px solid rgba(255,140,0,0.3)" }}>
                    <p className="text-xs font-black mb-2" style={{ color: "#B04500" }}>今すること</p>
                    <p className="text-5xl mb-3">{current.icon}</p>
                    <p className="text-lg font-black leading-snug" style={{ color: "#7A3000" }}>
                      {current.action}
                    </p>
                    {next && (
                      <p className="text-xs mt-3 px-3 py-1.5 rounded-full inline-block"
                         style={{ background: "rgba(255,140,0,0.12)", color: "#A05000" }}>
                        次 → {next.icon} {next.action}
                      </p>
                    )}
                  </div>
                ) : (
                  <div className="rounded-2xl px-5 py-5 mb-4 text-center"
                       style={{ background: "linear-gradient(135deg, #e8f5e9, #c8e6c9)", border: "2px solid rgba(56,142,60,0.3)" }}>
                    <p className="text-5xl mb-2">🎉</p>
                    <p className="text-lg font-black" style={{ color: "#2E7D32" }}>お手続き完了です！</p>
                    <p className="text-xs mt-1" style={{ color: "#4CAF50" }}>ありがとうございました</p>
                  </div>
                )}

                {/* ステップ進捗 */}
                <div className="flex items-center mb-4 px-1">
                  {STEPS.map((step, i) => (
                    <div key={step.id} className="flex items-center flex-1">
                      <div className="flex flex-col items-center"
                           style={{ minWidth: "40px" }}>
                        <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-black border-2 transition-all duration-500"
                             style={{
                               background: i < stepIndex ? "#D97000" : i === stepIndex ? "#FF8C00" : "transparent",
                               borderColor: i <= stepIndex ? "#D97000" : "rgba(255,140,0,0.25)",
                               color: i <= stepIndex ? "#fff" : "rgba(180,100,0,0.35)",
                               boxShadow: i === stepIndex ? "0 0 10px rgba(255,140,0,0.55)" : "none",
                             }}>
                          {i < stepIndex ? "✓" : step.id}
                        </div>
                        <p className="text-center mt-1"
                           style={{
                             fontSize: "8px",
                             fontWeight: i === stepIndex ? 900 : 600,
                             color: i < stepIndex ? "#B05000" : i === stepIndex ? "#7A3000" : "rgba(180,100,0,0.3)",
                           }}>
                          {step.icon}
                        </p>
                      </div>
                      {i < STEPS.length - 1 && (
                        <div className="flex-1 h-0.5 mx-1 relative" style={{ background: "rgba(255,140,0,0.15)" }}>
                          <div className="absolute inset-0 transition-all duration-700"
                               style={{
                                 width: i < stepIndex ? "100%" : "0%",
                                 background: "linear-gradient(90deg, #B84800, #FF8C00)",
                               }} />
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* 次へボタン */}
                {!completed ? (
                  <button
                    onClick={handleNextStep}
                    className="w-full py-4 rounded-2xl text-base font-black tracking-wider transition-all duration-300 hover:scale-105 active:scale-95"
                    style={{
                      background: "linear-gradient(135deg, #B84800, #D06000)",
                      color: "#fff",
                      boxShadow: "0 6px 20px rgba(160,70,0,0.45), inset 0 1px 0 rgba(255,255,255,0.2)",
                    }}
                  >
                    次のステップへ ▶
                  </button>
                ) : (
                  <div className="flex justify-center gap-2 py-2">
                    <span className="dot1 inline-block w-3 h-3 rounded-full" style={{ background: "#FF6B00" }} />
                    <span className="dot2 inline-block w-3 h-3 rounded-full" style={{ background: "#FF8C00" }} />
                    <span className="dot3 inline-block w-3 h-3 rounded-full" style={{ background: "#FFD700" }} />
                  </div>
                )}
              </>
            )}

          </div>

          <div className="h-2 w-full"
               style={{ background: "linear-gradient(90deg, #D97000, #C45A00, #B84800, #C45A00, #D97000)" }} />
        </div>
      </div>
    </main>
  );
}
