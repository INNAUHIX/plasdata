"use client";

import type { ReactNode } from "react";

function IconWrap({ children }: { children: ReactNode }) {
  return <span className="inline-flex h-[15px] w-[15px] items-center justify-center text-current">{children}</span>;
}

function ActionIcon({ kind }: { kind: "star" | "compare" | "mini" | "cart" | "download" }) {
  if (kind === "star") {
    return (
      <IconWrap>
        <svg viewBox="0 0 24 24" className="h-[15px] w-[15px] stroke-current" fill="none" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 3.8l2.6 5.28 5.83.85-4.22 4.11 1 5.8L12 17.06l-5.21 2.78 1-5.8-4.22-4.11 5.83-.85L12 3.8z" />
        </svg>
      </IconWrap>
    );
  }
  if (kind === "compare") {
    return (
      <IconWrap>
        <svg viewBox="0 0 24 24" className="h-[15px] w-[15px] stroke-current" fill="none" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
          <rect x="4" y="7" width="7.5" height="10" rx="1.6" />
          <rect x="12.5" y="7" width="7.5" height="10" rx="1.6" />
          <path d="M8 5.5V3.8M16 5.5V3.8" />
        </svg>
      </IconWrap>
    );
  }
  if (kind === "mini") {
    return (
      <IconWrap>
        <svg viewBox="0 0 24 24" className="h-[15px] w-[15px] stroke-current" fill="none" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M8.3 9.2c0 2.5-2.02 4.5-4.5 4.5-.65 0-1.26-.14-1.8-.39l1.05-1.66A4.48 4.48 0 0 1 3.8 9.2c0-2.48 2.02-4.5 4.5-4.5 2.5 0 4.5 2.02 4.5 4.5 0 .88-.25 1.69-.69 2.38l1.03 1.08c.6-.94.96-2.05.96-3.27 0-3.34-2.7-6.04-6.04-6.04S2.26 5.86 2.26 9.2" />
          <path d="M15.7 14.8c0-2.5 2.02-4.5 4.5-4.5.65 0 1.26.14 1.8.39l-1.05 1.66c-.3-.12-.62-.19-.95-.19-2.48 0-4.5 2.02-4.5 4.5 0 2.48 2.02 4.5 4.5 4.5 2.5 0 4.5-2.02 4.5-4.5 0-.88-.25-1.69-.69-2.38l-1.03-1.08c.6.94.96 2.05.96 3.27 0 3.34-2.7 6.04-6.04 6.04s-6.04-2.7-6.04-6.04" />
        </svg>
      </IconWrap>
    );
  }
  if (kind === "cart") {
    return (
      <IconWrap>
        <svg viewBox="0 0 24 24" className="h-[14px] w-[14px] stroke-current" fill="none" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="9" cy="19" r="1.6" />
          <circle cx="17" cy="19" r="1.6" />
          <path d="M3.5 5h2.2l1.8 8.1h9.35l2.15-5.85H7.25" />
        </svg>
      </IconWrap>
    );
  }
  return (
    <IconWrap>
      <svg viewBox="0 0 24 24" className="h-[14px] w-[14px] stroke-current" fill="none" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 4.5v9.5" />
        <path d="M8.5 10.8L12 14.3l3.5-3.5" />
        <path d="M5 18.5h14" />
      </svg>
    </IconWrap>
  );
}

const miniActions = [
  { label: "收藏材料", icon: "star" as const },
  { label: "加入对比", icon: "compare" as const },
  { label: "小程序查看", icon: "mini" as const }
];

const ghostButton =
  "relative inline-flex items-center gap-2 rounded-panel border border-[#d8dee8] bg-[rgba(255,255,255,0.96)] px-7 py-[15px] text-[14px] font-semibold leading-none text-[#526071] shadow-[0_1px_2px_rgba(17,24,39,0.03)] transition duration-200 hover:-translate-y-px hover:border-[rgba(246,82,1,0.4)] hover:shadow-[0_4px_16px_rgba(246,82,1,0.12)]";

export default function HeroBar() {
  return (
    <section className="relative overflow-hidden rounded-xl border border-[rgba(59,130,246,0.08)] bg-[linear-gradient(135deg,rgba(246,82,1,0.07),rgba(255,255,255,0.94)_38%,rgba(245,248,255,0.92))] px-8 pb-6 pt-8 shadow-card">
      <div className="pointer-events-none absolute -right-5 -top-10 h-[210px] w-[210px] rounded-full bg-[radial-gradient(circle,rgba(246,82,1,0.12),transparent_68%)]" />
      <div className="relative z-10">
        <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div className="text-[24px] font-extrabold leading-[1.35] text-txt-strong">塞拉尼斯/Celanex@2004-2T PBT</div>
          <div className="flex flex-wrap gap-[18px] text-[14px] text-slate-500">
            {miniActions.map((item) => (
              <span key={item.label} className="inline-flex items-center gap-[8px]">
                <ActionIcon kind={item.icon} />
                {item.label}
              </span>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap gap-4">
            <button className="inline-flex items-center gap-3 rounded-panel border border-[#ff6c1a] bg-[linear-gradient(180deg,#ff7a25_0%,#ff640f_100%)] px-7 py-[15px] text-[16px] font-bold leading-none text-white shadow-[0_12px_28px_rgba(255,106,26,0.34)] transition duration-200 hover:-translate-y-px hover:shadow-[0_14px_30px_rgba(255,106,26,0.38)]">
              <ActionIcon kind="cart" />
              询价采购
            </button>
            <button className={ghostButton}>
              <ActionIcon kind="download" />
              下载资料
            </button>
          </div>
          <div className="flex flex-wrap gap-4">
            <button className={ghostButton}>发布需求/供应</button>
            <button className={ghostButton}>查看供应（1）</button>
          </div>
        </div>
      </div>
    </section>
  );
}
