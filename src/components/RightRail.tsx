"use client";

import { useMemo, useState } from "react";

type TrendPoint = {
  label: string;
  value: number;
};

type TrendOption = {
  id: string;
  name: string;
  current: number;
  delta: number;
  pct: number;
  points: TrendPoint[];
};

const trendOptions: TrendOption[] = [
  {
    id: "21092",
    name: "2004-2T-21092",
    current: 2735,
    delta: -49.81,
    pct: 1.79,
    points: [
      { label: "1-25", value: 1912 },
      { label: "2-4", value: 2261 },
      { label: "2-14", value: 2610 },
      { label: "2-24", value: 2668 },
      { label: "3-6", value: 2785 },
      { label: "3-16", value: 2735 }
    ]
  },
  {
    id: "21093",
    name: "2004-2T-21093",
    current: 2580,
    delta: -36.2,
    pct: 1.38,
    points: [
      { label: "1-25", value: 1888 },
      { label: "2-4", value: 2198 },
      { label: "2-14", value: 2488 },
      { label: "2-24", value: 2520 },
      { label: "3-6", value: 2618 },
      { label: "3-16", value: 2580 }
    ]
  }
];

const serviceItems = ["新品选材", "3000+ 合作案例", "结构推荐", "6小时真人1V1跟进"];
const yTicks = [2785, 2610, 2436, 2261, 2087, 1912];
const axisLeft = 38;
const axisRight = 280;
const axisTop = 18;
const axisBottom = 132;

function formatDateCN(label: string) {
  const [m, d] = label.split("-");
  return `2026年${Number(m)}月${Number(d)}日`;
}

function SideCard({ children }: { children: React.ReactNode }) {
  return (
    <section className="rounded-xl border border-[rgba(218,226,239,0.95)] bg-white/96 p-5 shadow-[0_10px_30px_rgba(31,41,55,0.06)] backdrop-blur-sm">
      {children}
    </section>
  );
}

function TrendChart({ option }: { option: TrendOption }) {
  const [hoveredIndex, setHoveredIndex] = useState<number>(option.points.length - 1);
  const [isHovered, setIsHovered] = useState(false);

  const geometry = useMemo(() => {
    const min = Math.min(...option.points.map((point) => point.value));
    const max = Math.max(...option.points.map((point) => point.value));
    const range = max - min || 1;

    return option.points.map((point, index) => {
      const ratio = index / (option.points.length - 1 || 1);
      const x = axisLeft + ratio * (axisRight - axisLeft);
      const y = axisBottom - ((point.value - min) / range) * (axisBottom - axisTop);
      return { ...point, x, y };
    });
  }, [option]);

  const activePoint = geometry[hoveredIndex] ?? geometry[geometry.length - 1];
  const polyline = geometry.map((point) => `${point.x},${point.y}`).join(" ");

  return (
    <div className="relative mt-3">
      <div className="relative h-[182px] overflow-hidden rounded-xl border border-[#dbe3ef] bg-[linear-gradient(180deg,#ffffff,#fbfcff)]">
        <svg viewBox="0 0 300 160" className="h-full w-full">
          {yTicks.map((tick, index) => (
            <line key={tick} x1="0" x2="300" y1={22 + index * 24} y2={22 + index * 24} stroke="#edf2f8" />
          ))}
          <polyline points={polyline} fill="none" stroke="#f65201" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          <line x1={activePoint.x} x2={activePoint.x} y1={axisTop} y2={axisBottom + 10} stroke="rgba(246,82,1,0.18)" strokeDasharray="4 4" />
          <circle cx={activePoint.x} cy={activePoint.y} r="5" fill="#fff" stroke="#f65201" strokeWidth="2" />
        </svg>

        <div className="pointer-events-none absolute inset-y-0 left-0 w-12">
          {yTicks.map((tick, index) => (
            <span
              key={tick}
              className="absolute left-2 -translate-y-1/2 text-[11px] font-semibold text-[#7b8798]"
              style={{ top: `${24 + index * 24}px` }}
            >
              {tick}
            </span>
          ))}
        </div>

        <div className="pointer-events-none absolute inset-x-0 bottom-3 flex justify-between px-7 text-[11px] font-semibold text-[#7b8798]">
          {option.points.map((point) => (
            <span key={point.label}>{point.label}</span>
          ))}
        </div>

        <div
          className="absolute inset-0 z-10 flex"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {geometry.map((point, index) => (
            <button
              key={point.label}
              type="button"
              className="h-full flex-1"
              onMouseEnter={() => setHoveredIndex(index)}
              onFocus={() => setHoveredIndex(index)}
              aria-label={point.label}
            />
          ))}
        </div>
      </div>

      {isHovered && (
        <div
          className="pointer-events-none absolute -top-1 rounded-lg bg-[rgba(31,41,55,0.92)] px-3 py-2 text-[11px] text-white shadow-[0_18px_40px_rgba(0,0,0,0.2)]"
          style={{
            left: `calc(${((activePoint.x - axisLeft) / (axisRight - axisLeft || 1)) * 100}% + 38px)`,
            transform: (() => {
              // 计算提示框的位置，确保它不会超出卡片边界
              const ratio = (activePoint.x - axisLeft) / (axisRight - axisLeft || 1);
              if (ratio > 0.8) {
                // 当靠近右侧时，调整transform使其向左移动更多
                return "translateX(-80%)";
              } else if (ratio > 0.6) {
                // 当在右侧中间时，调整transform使其向左移动更多
                return "translateX(-60%)";
              }
              return "translateX(-50%)";
            })(),
            maxWidth: "100%",
            wordBreak: "keep-all"
          }}
        >
          <div className="font-bold">{formatDateCN(activePoint.label)}</div>
          <div>价格: {activePoint.value.toFixed(2)}</div>
        </div>
      )}
    </div>
  );
}

export default function RightRail() {
  const [selectedId, setSelectedId] = useState(trendOptions[0].id);
  const current = trendOptions.find((item) => item.id === selectedId) ?? trendOptions[0];

  return (
    <aside className="space-y-[10px]">
      <SideCard>
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-[20px] font-bold text-[#2b3240]">价格趋势</h3>
          <span className="text-[14px] text-[#8c95a3]">更多价格</span>
        </div>

        <div className="relative">
          <select
            value={selectedId}
            onChange={(event) => setSelectedId(event.target.value)}
            className="w-full appearance-none rounded-xl border border-[#e5ebf3] bg-white px-5 py-3 text-[14px] font-medium text-[#3f4c5d] shadow-sm outline-none transition focus:border-[#f65201] focus:shadow-[0_0_0_3px_rgba(246,82,1,0.1)]"
          >
            {trendOptions.map((option) => (
              <option key={option.id} value={option.id}>
                {option.name}
              </option>
            ))}
          </select>
          <span className="pointer-events-none absolute right-5 top-1/2 h-0 w-0 -translate-y-1/2 border-l-[6px] border-r-[6px] border-t-[7px] border-l-transparent border-r-transparent border-t-[#98a2b3]" />
        </div>

        <div className="mt-4 flex items-start justify-between">
          <div>
            <div className="text-[14px] font-extrabold leading-none text-[#11a66f]">{current.current}</div>
            <div className="mt-1 text-[12px] text-[#7c8796]">元/吨（含税）</div>
          </div>
          <div>
            <div className="text-[14px] font-extrabold leading-none text-[#11a66f]">{current.delta.toFixed(2)}</div>
            <div className="mt-1 text-[12px] text-[#7c8796]">涨跌额</div>
          </div>
          <div>
            <div className="text-[14px] font-extrabold leading-none text-[#11a66f]">{current.pct.toFixed(2)}%</div>
            <div className="mt-1 text-[12px] text-[#7c8796]">涨跌幅</div>
          </div>
        </div>

        <TrendChart option={current} />
        <div className="mt-4 flex items-center gap-2 text-[13px] text-[#f97316]">
          <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-[#fff2ea]">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </span>
          市场预估价，仅供参考。
        </div>
      </SideCard>

      <SideCard>
        <h3 className="mb-3 text-[18px] font-bold text-[#2b3240]">塑库专家服务</h3>
        <p className="mb-4 text-[13px] leading-6 text-[#8d96a4]">需求太少？帮你精准匹配，联系工程师快速反馈</p>
        <div className="grid grid-cols-2 gap-x-5 gap-y-4 text-[14px] text-[#677283]">
          {serviceItems.map((item) => (
            <div key={item} className="flex items-center gap-2">
              <span className="text-[10px] text-[#f65201]">●</span>
              <span>{item}</span>
            </div>
          ))}
        </div>
        <button className="mt-5 w-full rounded-panel bg-[linear-gradient(135deg,#f65201,#ff8a3d)] px-4 py-3 text-[14px] font-semibold text-white shadow-[0_10px_22px_rgba(246,82,1,0.24)]">
          立即咨询
        </button>
      </SideCard>

      <SideCard>
        <div className="rounded-xl bg-[linear-gradient(135deg,#e8f2ff,#d7e7ff)] p-5 text-[#2b5fab]">
          <h3 className="mb-3 text-[18px] font-bold">材料计算器</h3>
          <p className="text-[13px] leading-6">输入材料基础属性，快速计算密度、拉伸强度等核心性能参数信息</p>
          <button className="mt-5 rounded-full bg-[#4a7bff] px-5 py-2.5 text-[13px] font-semibold text-white">开始性能计算</button>
        </div>
      </SideCard>
    </aside>
  );
}
