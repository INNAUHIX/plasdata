import { ReactNode } from 'react';

const tabs = [
  { key: 'material', label: '材料信息' },
  { key: 'cert', label: '认证证书' },
  { key: 'property', label: '物性参数' },
  { key: 'chemical', label: '耐化参数' },
  { key: 'replace', label: '替代材料' },
  { key: 'charts', label: '图表曲线' },
  { key: 'materials', label: '相关资料' }
] as const;

export type TabKey = (typeof tabs)[number]['key'];

interface TopTabsProps {
  activeTab: TabKey;
  onSelect: (key: TabKey) => void;
}

export default function TopTabs({ activeTab, onSelect }: TopTabsProps) {
  return (
    <div className="soft-scrollbar flex h-[56px] items-end gap-7 overflow-x-auto rounded-xl border border-[#e5ebf3] border-b border-[#e7edf5] bg-white px-7 shadow-sm">
      {tabs.map((tab) => (
        <button
          key={tab.key}
          type="button"
          onClick={() => onSelect(tab.key)}
          className={`whitespace-nowrap border-b-[3px] pb-4 text-[15px] font-semibold transition ${
            activeTab === tab.key ? 'border-[#f65201] text-[#f65201]' : 'border-transparent text-[#6b7280] hover:text-[#f65201]'
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
