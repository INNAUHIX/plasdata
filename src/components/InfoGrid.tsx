const overviewRows = [
  ['制造商', 'SABIC', '种类', 'PC(聚碳酸酯)'],
  ['型号', 'EXL1414', '商标', 'LEXAN™'],
  ['填充物', '-', '形态', '颗粒'],
  ['行业应用', '汽车应用；消费品；医疗应用；工业；电气相关应用；建筑施工；文交通', '特性', '低温冲击性能；高韧性；继PC']
];

export default function InfoGrid() {
  return (
    <div className="grid grid-cols-[120px_1fr_120px_1fr] overflow-hidden rounded-xl border border-[#e7edf5] bg-white">
      {overviewRows.flatMap((row, rowIndex) =>
        row.map((cell, cellIndex) => {
          const isLabel = cellIndex % 2 === 0;
          return (
            <div
              key={`${rowIndex}-${cellIndex}`}
              className={`min-h-[56px] border-b border-r border-[#e7edf5] px-4 py-4 text-[14px] leading-7 ${
                isLabel ? 'bg-[#f8fafc] font-semibold text-[#5f6c7d]' : 'text-[#596678]'
              } ${rowIndex === overviewRows.length - 1 ? 'border-b-0' : ''} ${cellIndex === row.length - 1 ? 'border-r-0' : ''}`}
            >
              {cell}
            </div>
          );
        })
      )}
    </div>
  );
}
