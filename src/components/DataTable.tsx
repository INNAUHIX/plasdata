interface DataTableProps {
  headers: string[];
  rows: string[][];
  titleNote?: string;
}

export default function DataTable({ headers, rows, titleNote }: DataTableProps) {
  return (
    <div className="overflow-hidden rounded-xl border border-[#e7edf5]">
      <table className="w-full border-collapse text-left text-[14px]">
        <thead>
          <tr className="bg-[#f8fafc] text-[#667085]">
            {headers.map((header, index) => {
              let widthClass = "";
              if (index === 0) widthClass = "w-[300px]";
              if (index === 1) widthClass = "w-[200px]";
              if (index === 2) widthClass = "w-[200px]";
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
            return (
              <tr
                key={`${row[0]}-${rowIndex}`}
                className={`${isCategoryHeader ? "bg-[#f8fafc] font-bold text-[#667085]" : "text-[#556274]"}`}
              >
                {row.map((cell, index) => {
                  let widthClass = "";
                  if (index === 0) widthClass = "w-[300px]";
                  if (index === 1) widthClass = "w-[200px]";
                  if (index === 2) widthClass = "w-[200px]";
                  return (
                    <td
                      key={`${row[0]}-${rowIndex}-${index}`}
                      className={`${widthClass} border-r border-t border-[#e7edf5] px-5 py-4 last:border-r-0 ${isCategoryHeader ? "border-t-2 border-t-[#e7edf5]" : ""}`}
                    >
                      {index === 2 && headers[index] === "操作" ? (
                        <div className="flex space-x-4">
                          {cell.split(" ").map((btn, btnIndex) => (
                            <span key={btnIndex} className="cursor-pointer text-[#f65201] hover:underline">
                              {btn}
                            </span>
                          ))}
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
