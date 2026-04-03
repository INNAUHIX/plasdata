import { useState } from 'react';

export type ChemicalRow = {
  name: string;
  category: string;
  grade: 'E' | 'G' | 'P' | 'F';
};

interface ChemicalGradeProps {
  grade: ChemicalRow['grade'];
}

function ChemicalGrade({ grade }: ChemicalGradeProps) {
  const styles = {
    E: 'text-[#f65201]',
    G: 'text-[#2f6bdb]',
    P: 'text-[#4b7cff]',
    F: 'text-[#7b8798]'
  } as const;

  return <span className={`font-bold ${styles[grade]}`}>{grade}</span>;
}

interface ChemicalTableProps {
  rows: ChemicalRow[];
}

const DEFAULT_VISIBLE_ROWS = 12;

export default function ChemicalTable({ rows }: ChemicalTableProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const visibleRows = isExpanded ? rows : rows.slice(0, DEFAULT_VISIBLE_ROWS);

  return (
    <div className="overflow-hidden rounded-xl border border-[#e7edf5]">
      <table className="w-full border-collapse text-left text-[14px]">
        <thead>
          <tr className="bg-[#f5f7fa] text-[#2f3c4d]">
            <th className="w-[400px] border-b border-r border-[#e7edf5] px-5 py-4 font-bold">耐化学参数</th>
            <th className="w-[150px] border-b border-r border-[#e7edf5] px-5 py-4 font-bold">分类</th>
            <th className="w-[150px] border-b px-5 py-4 font-bold">测试评级</th>
          </tr>
        </thead>
        <tbody>
          {visibleRows.map((row) => (
            <tr key={`${row.name}-${row.category}`} className="text-[#556274]">
              <td className="w-[400px] border-r border-t border-[#e7edf5] px-5 py-4 text-[#273140]">{row.name}</td>
              <td className="w-[150px] border-r border-t border-[#e7edf5] px-5 py-4 text-[#738095]">{row.category}</td>
              <td className="w-[150px] border-t border-[#e7edf5] px-5 py-4">
                <ChemicalGrade grade={row.grade} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      
      {rows.length > DEFAULT_VISIBLE_ROWS && (
        <div className="border-t border-[#e7edf5] bg-[#f8fafc] px-5 py-3 text-center">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-[14px] font-medium text-[#f65201] hover:underline"
          >
            {isExpanded ? '收起' : `展开更多 (${rows.length - DEFAULT_VISIBLE_ROWS})`}
          </button>
        </div>
      )}
    </div>
  );
}
