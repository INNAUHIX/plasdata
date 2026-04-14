interface DataTableProps {
  headers: string[];
  rows: string[][];
  titleNote?: string;
  onCompareToggle?: (rowIndex: number) => void;
  onFavoriteToggle?: (rowIndex: number) => void;
  comparedRows?: Set<number>;
  favoriteRows?: Set<number>;
}

export default function DataTable({ 
  headers, 
  rows, 
  titleNote, 
  onCompareToggle, 
  onFavoriteToggle, 
  comparedRows = new Set(), 
  favoriteRows = new Set() 
}: DataTableProps) {
  return (
    <div className="overflow-hidden rounded-xl border border-[#e7edf5]">
      <table className="w-full border-collapse text-left text-[14px]">
        <thead>
          <tr className="bg-[#f8fafc] text-[#667085]">
            {headers.map((header, index) => {
              let widthClass = "";
              if (index === 0) widthClass = "w-[300px]";
              if (index === 1) widthClass = "w-[150px]";
              if (index === 2) widthClass = "w-[195px]";
              if (index === 3) widthClass = "w-[150px]";
              return (
                <th key={header} className={`${widthClass} border-b border-r border-[#e7edf5] px-5 py-4 font-bold last:border-r-0`}>
                  {index === 0 && titleNote ? (
                    <div className="flex items-center justify-between gap-3">
                      <span>{header}</span>
                      <span className="text-[12px] font-semibold text-[#f65201]">
                        {titleNote}
                      </span>
                    </div>
                  ) : (
                    header
                  )}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => {
            const isCategoryHeader = row.length > 1 && row[1] === "" && (row.length <= 2 || row[2] === "");
            const isCompared = comparedRows.has(rowIndex);
            const isFavorited = favoriteRows.has(rowIndex);
            
            // Check if current row has the same first cell as previous row
            const isSameAsPrevious = rowIndex > 0 && row[0] === rows[rowIndex - 1][0];
            
            // Check if next row has the same first cell as current row
            const isSameAsNext = rowIndex < rows.length - 1 && row[0] === rows[rowIndex + 1][0];
            
            // Calculate rowSpan for merged cells
            let rowSpan = 1;
            if (!isSameAsPrevious) {
              for (let i = rowIndex + 1; i < rows.length; i++) {
                if (rows[i][0] === row[0]) {
                  rowSpan++;
                } else {
                  break;
                }
              }
            }
            
            return (
              <tr
                key={`${row[0]}-${rowIndex}`}
                className={`${isCategoryHeader ? "bg-[#f8fafc] font-bold text-[#667085]" : "text-[#556274]"}`}
              >
                {row.map((cell, index) => {
                  let widthClass = "";
                  if (index === 0) widthClass = "w-[300px]";
                  if (index === 1) widthClass = "w-[150px]";
                  if (index === 2) widthClass = "w-[195px]";
                  if (index === 3) widthClass = "w-[150px]";
                  
                  // Handle merged cells for the first column
                  if (index === 0 && isSameAsPrevious) {
                    return null; // Skip rendering this cell if it's a duplicate
                  }
                  
                  return (
                    <td
                      key={`${row[0]}-${rowIndex}-${index}`}
                      rowSpan={index === 0 && !isSameAsPrevious ? rowSpan : 1}
                      className={`${widthClass} border-r border-t border-[#e7edf5] px-5 py-4 last:border-r-0 ${isCategoryHeader ? "border-t-2 border-t-[#e7edf5]" : ""} ${index === 0 && !isSameAsPrevious ? "align-middle" : ""}`}
                    >
                      {index === 3 && headers[index] === "操作" ? (
                        <div className="flex space-x-4">
                          <span 
                            className={`cursor-pointer hover:underline ${isCompared ? "text-[#98a2b3]" : "text-[#f65201]"}`}
                            onClick={() => onCompareToggle?.(rowIndex)}
                          >
                            {isCompared ? "已加入" : "加对比"}
                          </span>
                          <span 
                            className={`cursor-pointer hover:underline ${isFavorited ? "text-[#98a2b3]" : "text-[#f65201]"}`}
                            onClick={() => onFavoriteToggle?.(rowIndex)}
                          >
                            {isFavorited ? "已收藏" : "收藏"}
                          </span>
                        </div>
                      ) : (
                        cell
                      )}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
