﻿﻿"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import DesignDocPanel from "@/components/DesignDocPanel";
import HeroBar from "@/components/HeroBar";
import RightRail from "@/components/RightRail";
import SectionCard from "@/components/SectionCard";
import TopTabs, { TabKey } from "@/components/TopTabs";
import InfoGrid from "@/components/InfoGrid";
import DataTable from "@/components/DataTable";
import ChemicalTable, { ChemicalRow } from "@/components/ChemicalTable";

const PANEL_WIDTH = 420;
const paramTabs = ["性能参数", "加工参数", "黄卡参数"];
const certs = [
  { name: "E207780", icon: "/cert-icons/image@2x.png" },
  { name: "RoHS", icon: "/cert-icons/image@2x-2.png" },
  { name: "ISO 9001", icon: "/cert-icons/image@2x-3.png" },
  { name: "REACH", icon: "/cert-icons/image@2x-4.png" },
  { name: "ISO 14001", icon: "/cert-icons/image@2x-5.png" }
];

const physicalRows = [
  ["密度", "-", "1.18 g/cm3", "ASTM D792"],
  ["吸水率", "24 hr 23 ℃", "0.10 %", "ASTM D570"],
  ["吸水率，平衡", "24 hr 23 ℃", "0.40 %", "ASTM D570"],
  ["模具收缩率，平行", "3.2 mm", "0.4-0.6 %", "-"],
  ["模具收缩率，垂直", "3.2 mm", "0.4-0.6 %", "-"],
  ["熔融指数，质量", "2.16 kg,260 C, Condition E", "1063 g/10min", "ASTM D1238"],
  ["洛氏硬度", "-", "123", "ASTM D785"]
];

const mechanicalRows = [
  ["拉伸模量", "-", "2100 MPa", "ISO 527-2/1A"],
  ["拉伸强度，屈服", "-", "53.0 MPa", "ISO 527-2/1A/50"],
  ["拉伸强度，断裂", "-", "30.0 MPa", "ISO 527-2/1A/50"],
  ["拉伸应变，屈服", "-", "10 %", "ISO 527-2/1A/50"],
  ["拉伸应变，断裂", "-", "> 50 %", "ISO 527-2/1A/50"],
  ["简支梁冲击强度，缺口", "23℃", "6.0 kJ/m²", "ISO 179 1eA"]
];

const thermalRows = [
  ["热变形温度，未退火", "0.45 MPa", "165 ℃", "ISO 75-2/B"],
  ["热变形温度，未退火", "1.8 MPa", "55.0 ℃", "ISO 75-2/A"],
  ["玻璃化温度 (Tg)", "10℃,min", "60.0 ℃", "ISO 11357-2"],
  ["熔点", "10℃/min", "225 ℃", "ISO 11357-3"],
  ["线性热膨胀系数(CTE)，平行", "-", "1.1E-4 cm/cm/℃", "ISO 11359-2"],
  ["阻燃等级", "1mm", "HB", "UL 94"]
];

const electricalRows = [
  ["表面电阻", "-", "> 1.0E+15 Ohms", "IEC 60093"],
  ["体积电阻", "-", "> 1.0E+15 Ohms·cm", "IEC 60093"],
  ["介电常数", "100 Hz", "3.50", "IEC 60250"],
  ["介电常数", "1.0e+6 Hz", "3.50", "IEC 60250"],
  ["介电损耗(耗散因子)", "100 Hz", "3.0E-3", "IEC 60250"],
  ["介电损耗(耗散因子)", "1.0e+6 Hz", "0.021", "IEC 60250"]
];

const processRows = [
  ["干燥温度", "120", "℃", "原版"],
  ["干燥时间", "2-4", "hrs", "原版"],
  ["干燥时间，累计", "48", "hrs", "原版"],
  ["最大含水率", "0.02", "%", "原版"],
  ["熔融温度", "280-315", "℃", "原版"],
  ["射嘴温度", "270-310", "℃", "原版"],
  ["前段温度<注塑>", "280-315", "℃", "原版"],
  ["中段温度<注塑>", "270-305", "℃", "原版"],
  ["后段温度<注塑>", "270-295", "℃", "原版"]
];

const yellowCardRows: string[][] = [
  ["Flammability", "0.70 mm UL", "HB, HB75 (ALL)", "UL94,IEC 60695-11-10"],
  ["Flammability", "1.1 mm UL", "HB, HB75 (ALL)", "UL94,IEC 60695-11-10"],
  ["Flammability", "1.5 mm UL", "HB, HB75 (ALL)", "UL94,IEC 60695-11-10"],
  ["Flammability", "3.0 mm UL", "HB, HB40 (ALL)", "UL94,IEC 60695-11-10"]
];

const chemicalRows: ChemicalRow[] = [
  { name: "异丙醇", category: "醇", grade: "E" },
  { name: "醇类: 丙基(1-丙醇)", category: "醇", grade: "E" },
  { name: "硫化钠", category: "盐", grade: "E" },
  { name: "苯", category: "芳烃", grade: "F" },
  { name: "氯化钙, 10%", category: "盐", grade: "E" },
  { name: "氢氧化钙(碱液), 10%", category: "碱", grade: "E" },
  { name: "乙酸, 5%", category: "酸", grade: "G" },
  { name: "甲苯", category: "芳烃", grade: "F" },
  { name: "汽油", category: "燃油", grade: "P" },
  { name: "发动机油", category: "润滑油", grade: "G" },
  { name: "碳酸钠溶液", category: "盐", grade: "E" },
  { name: "氨水, 10%", category: "碱", grade: "G" },
  { name: "硝酸钙", category: "盐", grade: "E" },
  { name: "硫酸镁, 10%", category: "盐", grade: "E" },
  { name: "石炭酸(苯酚)", category: "酚", grade: "P" },
  { name: "碳酸(碳酸水)", category: "弱酸", grade: "E" },
  { name: "铬酸, 5%", category: "酸", grade: "E" },
  { name: "铬酸, 10%", category: "酸", grade: "E" },
  { name: "铬酸, 30%", category: "酸", grade: "E" },
  { name: "铬酸, 50%", category: "强酸", grade: "E" },
  { name: "柠檬酸, 10%水溶液", category: "酸", grade: "F" },
  { name: "氯化铜", category: "盐", grade: "E" },
  { name: "硫酸铜, 5%", category: "盐", grade: "E" },
  { name: "环己烷", category: "脂肪烃", grade: "E" },
  { name: "乙酸乙酯", category: "酯", grade: "E" },
  { name: "乙二醇", category: "醇", grade: "E" },
  { name: "脂肪酸", category: "弱酸", grade: "E" },
  { name: "硝酸铁", category: "盐", grade: "F" },
  { name: "硫酸铁", category: "盐", grade: "E" },
  { name: "汽油(高芳烃)", category: "混合矿:矿物油", grade: "F" },
  { name: "盐酸, 20%", category: "强酸", grade: "E" },
  { name: "盐酸, 37%", category: "强酸", grade: "E" },
  { name: "氢氟酸, 20%", category: "强酸", grade: "E" },
  { name: "氢氟酸, 50%", category: "强酸", grade: "E" }
];

const replaceRows = [
  ["SO.F.TER./Pibiter® N200 NAT001", "更高冲击强度", "加入对比", "收藏"],
  ["SO.F.TER./Pibiter® N100 NAT001", "更高耐热性", "加入对比", "收藏"],
  ["巴斯夫/Ultradur® B 4520 FC Aqua PBT", "阻燃性能较好", "加入对比", "收藏"],
  ["巴斯夫/Ultradur® B 4520 PBT", "各项性能最接近", "加入对比", "收藏"],
  ["巴斯夫 Ultradur® B 4520 BKO0110 PBT", "各项性能最接近", "加入对比", "收藏"],
  ["巴斯夫 Ultradur® B 4406 GG Q717 PBT", "更高耐热性", "加入对比", "收藏"],
  ["巴斯夫 Ultradur® S 4090 G6 LS BK15077 PBT/ASA", "更高冲击强度", "加入对比", "收藏"],
  ["塞拉尼斯 Crastin® FG6134 NC010 PBT", "更高冲击强度", "加入对比", "收藏"],
  ["赢创 VESTODUR® 2000 PBT", "更高冲击强度", "加入对比", "收藏"],
  ["ESTOPLAST EP 1500GY165 PBT", "更高冲击强度", "加入对比", "收藏"]
];

const chartCards = [
  "VeradelPESU 的耐热性",
  "VeradelPESU 的阻燃性",
  "VeradelRPESU的机械性能",
  "VeradelRPESU的机械性能",
  "VeradelPESU 的耐热性",
  "VeradelPESU 的阻燃性",
  "VeradelRPESU的机械性能",
  "VeradelRPESU的机械性能"
];

const chemicalLegend = [
  { grade: "E", label: "EXCELLENT 优", chip: "bg-[#fff2ea] text-[#f65201]" },
  { grade: "G", label: "GOOD 好", chip: "bg-[#edf4ff] text-[#2f6bdb]" },
  { grade: "P", label: "POOR 弱", chip: "bg-[#edf5ff] text-[#4b7cff]" },
  { grade: "F", label: "FAIL 差", chip: "bg-[#f3f4f6] text-[#7b8798]" }
] as const;

export default function Page() {
  const [panelOpen, setPanelOpen] = useState(false);
  const [activeParamTab, setActiveParamTab] = useState(paramTabs[0]);
  const [chemicalQuery, setChemicalQuery] = useState("");
  const [chemicalCategory, setChemicalCategory] = useState("全部");
  const [chemicalGrade, setChemicalGrade] = useState("全部");
  const [activeTab, setActiveTab] = useState<TabKey>("material");
  const [showBackToTop, setShowBackToTop] = useState(false);

  const materialRef = useRef<HTMLElement | null>(null);
  const certRef = useRef<HTMLElement | null>(null);
  const propertyRef = useRef<HTMLElement | null>(null);
  const chemicalRef = useRef<HTMLElement | null>(null);
  const replaceRef = useRef<HTMLElement | null>(null);
  const chartsRef = useRef<HTMLElement | null>(null);
  const materialsRef = useRef<HTMLElement | null>(null);

  const shellStyle = useMemo(() => (panelOpen ? { marginRight: PANEL_WIDTH } : undefined), [panelOpen]);

  const sectionRefs: Record<TabKey, React.RefObject<HTMLElement | null>> = {
    material: materialRef,
    cert: certRef,
    property: propertyRef,
    chemical: chemicalRef,
    replace: replaceRef,
    charts: chartsRef,
    materials: materialsRef
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible?.target?.id) {
          setActiveTab(visible.target.id as TabKey);
        }
      },
      {
        rootMargin: "-120px 0px -55% 0px",
        threshold: [0.2, 0.35, 0.5]
      }
    );

    Object.values(sectionRefs).forEach((ref) => {
      if (ref.current) observer.observe(ref.current);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const filteredChemicalRows = useMemo(() => {
    return chemicalRows.filter((row) => {
      const matchedQuery = !chemicalQuery || row.name.includes(chemicalQuery.trim());
      const matchedCategory = chemicalCategory === "全部" || row.category === chemicalCategory;
      const matchedGrade = chemicalGrade === "全部" || row.grade === chemicalGrade;
      return matchedQuery && matchedCategory && matchedGrade;
    });
  }, [chemicalCategory, chemicalGrade, chemicalQuery]);

  const activeParamTables = useMemo(() => {
    if (activeParamTab === "加工参数") {
      return [{
        headers: ["加工类型", "数值", "单位", "数据来源"],
        rows: processRows
      }];
    }
    if (activeParamTab === "黄卡参数") {
      return [{
        headers: ["黄卡参数", "测试条件", "数值", "测试标准"],
        rows: yellowCardRows
      }];
    }
    
    return [
      {
        headers: ["物理性能", "测试条件", "测试数值", "测试标准"],
        rows: physicalRows
      },
      {
        headers: ["机械性能", "测试条件", "测试数值", "测试标准"],
        rows: mechanicalRows
      },
      {
        headers: ["热学性能", "测试条件", "测试数值", "测试标准"],
        rows: thermalRows
      },
      {
        headers: ["电气性能", "测试条件", "测试数值", "测试标准"],
        rows: electricalRows
      }
    ];
  }, [activeParamTab]);

  const handleTabSelect = (key: TabKey) => {
    setActiveTab(key);
    const target = sectionRefs[key].current;
    if (!target) return;

    const headerOffset = 86;
    const top = target.getBoundingClientRect().top + window.scrollY - headerOffset;
    window.scrollTo({ top, behavior: "smooth" });
  };

  const handleBackToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <div className="mx-auto w-full max-w-7xl transition-all duration-300" style={shellStyle}>
        <div className="mb-[10px]">
          <HeroBar />
        </div>

        <div className="mb-[10px]">
          <TopTabs activeTab={activeTab} onSelect={handleTabSelect} />
        </div>

        <div className="grid w-full grid-cols-1 gap-[10px] xl:grid-cols-[minmax(0,1fr)_328px]">
          <div className="min-w-0 space-y-[10px]">
            <section ref={materialRef} id="material" className="overflow-hidden rounded-xl border border-[#e5ebf3] bg-white shadow-[0_10px_30px_rgba(31,41,55,0.06)]">
              <div className="p-7">
                <h2 className="mb-5 text-[20px] font-bold text-[#202938]">材料信息</h2>
                <p className="mb-6 text-[14px] leading-8 text-[#66758a]">
                  ELCRIN EXL1414B是基于聚碳酸酯(PC)连续聚共聚物，是一种中高不透明注射成型(M)级，主要成分由生物源合成。该树脂具有极低的熔融温度和稳定性，具有出色的可加工性和脱模释放性，与标准PC相比，可缩短周期。ELCRIN EXL1414B树脂有多种不透明颜色可供选择，适用于多种应用。
                </p>
                <InfoGrid />
              </div>
            </section>

            <section ref={certRef} id="cert">
              <SectionCard className="rounded-lg border-[#e5ebf3]">
                <div className="mb-5 flex items-center justify-between">
                  <h3 className="text-[18px] font-bold text-[#202938]">认证证书</h3>
                  <span className="text-[14px] text-[#98a2b3]">查询更多</span>
                </div>
                <div className="flex flex-wrap gap-4">
                  {certs.map((cert) => (
                    <div key={cert.name} className="flex items-center gap-2 rounded-full border border-[#dde5ef] bg-white px-3 py-1.5 text-[13px] text-[#5f6b7c] shadow-[0_6px_18px_rgba(31,41,55,0.04)]">
                      <img src={cert.icon} alt={cert.name} className="h-5 w-5" />
                      {cert.name}
                    </div>
                  ))}
                </div>
              </SectionCard>
            </section>

            <section ref={propertyRef} id="property">
              <SectionCard className="rounded-lg border-[#e5ebf3]">
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="text-[18px] font-bold text-[#202938]">物性参数</h3>
                </div>
                <div className="mb-5 flex flex-wrap gap-2">
                  {paramTabs.map((tab) => {
                    const active = tab === activeParamTab;
                    return (
                      <button
                        key={tab}
                        type="button"
                        onClick={() => setActiveParamTab(tab)}
                        className={`rounded-full border px-4 py-2 text-[12px] font-semibold transition ${
                          active
                            ? "border-transparent bg-[linear-gradient(135deg,#f65201,#ff8a3d)] text-white shadow-[0_10px_22px_rgba(246,82,1,0.22)]"
                            : "border-[#dfe7f0] bg-white text-[#667085]"
                        }`}
                      >
                        {tab}
                      </button>
                    );
                  })}
                </div>
                
                {activeParamTables.map((table, index) => (
                  <div key={index} className="mb-6">
                    <DataTable headers={table.headers} rows={table.rows} />
                  </div>
                ))}
              </SectionCard>
            </section>

            <section ref={chemicalRef} id="chemical">
              <SectionCard className="rounded-lg border-[#e5ebf3]">
                <div className="mb-6 flex items-center justify-between">
                  <h3 className="text-[18px] font-bold text-[#202938]">耐化参数</h3>
                </div>

                <div className="grid grid-cols-1 gap-4 xl:grid-cols-[1.15fr_0.95fr_0.95fr]">
                  <label className="flex items-center gap-4 text-[14px] text-[#273140]">
                    <span className="shrink-0">搜索参数名称</span>
                    <input
                      value={chemicalQuery}
                      onChange={(event) => setChemicalQuery(event.target.value)}
                      placeholder="请输入参数名称"
                      className="h-[40px] w-full rounded-[8px] border border-[#dbe3ef] bg-[#f9fbfe] px-4 text-[14px] text-[#344256] outline-none transition focus:border-[#f65201] focus:bg-white"
                    />
                  </label>

                  <label className="flex items-center gap-4 text-[14px] text-[#273140]">
                    <span className="shrink-0">参数分类</span>
                    <select
                      value={chemicalCategory}
                      onChange={(event) => setChemicalCategory(event.target.value)}
                      className="h-[40px] w-full rounded-[8px] border border-[#dbe3ef] bg-[#f9fbfe] px-4 text-[14px] text-[#344256] outline-none transition focus:border-[#f65201] focus:bg-white"
                    >
                      {["全部", "醇", "盐", "芳烃", "酸", "碱", "燃油", "润滑油"].map((item) => (
                        <option key={item} value={item}>
                          {item}
                        </option>
                      ))}
                    </select>
                  </label>

                  <label className="flex items-center gap-4 text-[14px] text-[#273140]">
                    <span className="shrink-0">测试评级</span>
                    <select
                      value={chemicalGrade}
                      onChange={(event) => setChemicalGrade(event.target.value)}
                      className="h-[40px] w-full rounded-[8px] border border-[#dbe3ef] bg-[#f9fbfe] px-4 text-[14px] text-[#344256] outline-none transition focus:border-[#f65201] focus:bg-white"
                    >
                      {["全部", "E", "G", "P", "F"].map((item) => (
                        <option key={item} value={item}>
                          {item}
                        </option>
                      ))}
                    </select>
                  </label>
                </div>

                <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
                  <div className="inline-flex items-center gap-3 text-[14px] text-[#7b8798]">
                    <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-[#fff2ea] text-[16px] font-bold text-[#f65201]">!</span>
                    以下数据来源于塑库网推测
                  </div>

                  <div className="flex flex-wrap items-center gap-5 text-[13px] text-[#8090a5]">
                    {chemicalLegend.map((item) => (
                      <span key={item.grade} className="inline-flex items-center gap-2">
                        <span className={`inline-flex h-8 min-w-8 items-center justify-center rounded-[6px] px-2 font-bold ${item.chip}`}>
                          {item.grade}
                        </span>
                        {item.label}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-5">
                  <ChemicalTable rows={filteredChemicalRows} />
                </div>
              </SectionCard>
            </section>

            <section ref={replaceRef} id="replace">
              <SectionCard className="rounded-lg border-[#e5ebf3]">
                <h3 className="mb-5 text-[18px] font-bold text-[#202938]">替代材料推荐</h3>
                <DataTable headers={["替代型号", "推荐原因", "操作"]} rows={replaceRows.map((row) => [row[0], row[1], `${row[2]} ${row[3]}`])} />
              </SectionCard>
            </section>

            <section ref={chartsRef} id="charts">
              <SectionCard className="rounded-xl border-[#e5ebf3]">
                <div className="mb-5 flex items-center justify-between">
                  <h3 className="text-[18px] font-bold text-[#202938]">图表曲线</h3>
                  <span className="text-[14px] text-[#98a2b3]">查看全部</span>
                </div>
                <div className="grid grid-cols-1 gap-[10px] md:grid-cols-2 xl:grid-cols-4">
                  {chartCards.map((title, index) => (
                    <div key={`${title}-${index}`}>
                      <div className="h-[118px] rounded-lg border border-[#edf1f5] bg-[linear-gradient(180deg,#f3f6fa_0%,#fbfcfe_100%)]" />
                      <div className="mt-2 text-[12px] leading-[1.4] text-[#444]">{title}</div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 text-center text-[13px] text-[#a0a0a0]">更多资料</div>
              </SectionCard>
            </section>

            <section ref={materialsRef} id="materials">
              <SectionCard className="rounded-xl border-[#e5ebf3]">
                <div className="mb-5 flex items-center justify-between">
                  <h3 className="text-[18px] font-bold text-[#202938]">相关资料</h3>
                  <span className="text-[14px] text-[#98a2b3]">更多相关资料 &gt;</span>
                </div>
                <div className="mb-5 flex flex-wrap gap-2">
                  {["推荐", "成功案例", "品牌案例", "选材资料", "加工指南"].map((tab) => (
                    <button
                      key={tab}
                      type="button"
                      className={`rounded-full border px-4 py-2 text-[12px] font-semibold transition ${
                        tab === "推荐"
                          ? "border-transparent bg-[linear-gradient(135deg,#f65201,#ff8a3d)] text-white shadow-[0_10px_22px_rgba(246,82,1,0.22)]"
                          : "border-[#dfe7f0] bg-white text-[#667085]"
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
                <div className="grid grid-cols-1 gap-[10px] md:grid-cols-2 xl:grid-cols-4">
                  {Array(8).fill(0).map((_, index) => (
                    <div key={index} className="rounded-lg border border-[#e7edf5] bg-white p-0 overflow-hidden">
                      <div className="relative h-[118px] w-full bg-[linear-gradient(180deg,#f3f6fa_0%,#fbfcfe_100%)]">
                        <div className="absolute left-3 top-3 inline-block rounded-sm bg-gray-100 px-2 py-1 text-[12px] text-[#64748b]">产品手册</div>
                      </div>
                      <div className="p-4">
                        <div className="mb-3 line-clamp-2 text-[14px] font-medium leading-[1.4] text-[#273140]">从轻量化到自动驾驶，Avient埃万特全方位赋能新能源汽</div>
                        <div className="flex items-center gap-2 text-[12px] text-[#98a2b3]">
                          <span>塑库网</span>
                          <span>|</span>
                          <span>2025-12-03</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </SectionCard>
            </section>
          </div>

          <div className="xl:justify-self-stretch">
            <RightRail />
          </div>
        </div>
      </div>

      <DesignDocPanel open={panelOpen} onOpenChange={setPanelOpen} width={PANEL_WIDTH} />

      {showBackToTop && (
        <button
          onClick={handleBackToTop}
          className="fixed bottom-20 right-6 z-50 h-12 w-12 rounded-full bg-[#f65201] text-white shadow-lg transition-all duration-300 hover:bg-[#e54800] hover:scale-110 flex items-center justify-center"
          aria-label="返回顶部"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
          </svg>
        </button>
      )}
    </>
  );
}
