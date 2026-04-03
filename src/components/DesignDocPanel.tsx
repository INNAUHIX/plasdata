"use client";

import { useEffect, useMemo, useState } from "react";
import { designDocs } from "@/data/designDocs";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  width: number;
};

function renderMarkdown(content: string) {
  const lines = content.split("\n");
  const elements: JSX.Element[] = [];
  let listItems: string[] = [];
  let tableRows: string[][] = [];

  const flushList = () => {
    if (!listItems.length) return;
    elements.push(
      <ul key={`list-${elements.length}`} className="mb-5 list-disc space-y-2 pl-5 text-sm leading-7 text-slate-600">
        {listItems.map((item, index) => (
          <li key={`${item}-${index}`}>{item}</li>
        ))}
      </ul>
    );
    listItems = [];
  };

  const flushTable = () => {
    if (!tableRows.length) return;
    const bodyRows = tableRows.filter((row) => !row.every((cell) => /^-+$/.test(cell)));
    if (bodyRows.length >= 2) {
      elements.push(
        <div key={`table-${elements.length}`} className="mb-5 overflow-hidden rounded-xl border border-line shadow-soft">
          <table className="w-full border-collapse bg-white text-left text-sm">
            <thead className="bg-slate-50 text-slate-500">
              <tr>
                {bodyRows[0].map((cell) => (
                  <th key={cell} className="border-b border-line px-4 py-3 font-semibold">
                    {cell}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {bodyRows.slice(1).map((row, rowIndex) => (
                <tr key={`row-${rowIndex}`} className="text-slate-600">
                  {row.map((cell, cellIndex) => (
                    <td key={`${cell}-${cellIndex}`} className="border-t border-line px-4 py-3 align-top">
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }
    tableRows = [];
  };

  lines.forEach((rawLine, index) => {
    const line = rawLine.trim();
    if (!line) {
      flushList();
      flushTable();
      return;
    }
    if (line.startsWith("|")) {
      flushList();
      tableRows.push(line.split("|").map((cell) => cell.trim()).filter(Boolean));
      return;
    }
    flushTable();
    if (line === "---") {
      flushList();
      elements.push(<hr key={`hr-${index}`} className="my-6 border-line" />);
      return;
    }
    if (line.startsWith("- ")) {
      listItems.push(line.slice(2));
      return;
    }
    flushList();
    if (line.startsWith("# ")) {
      elements.push(
        <h1 key={`h1-${index}`} className="mb-4 text-xl font-bold text-slate-900">
          {line.slice(2)}
        </h1>
      );
      return;
    }
    if (line.startsWith("## ")) {
      elements.push(
        <h2 key={`h2-${index}`} className="mb-3 mt-6 text-sm font-bold tracking-wide text-slate-900">
          {line.slice(3)}
        </h2>
      );
      return;
    }
    if (line.startsWith("### ")) {
      elements.push(
        <h3 key={`h3-${index}`} className="mb-2 mt-4 text-sm font-semibold text-slate-800">
          {line.slice(4)}
        </h3>
      );
      return;
    }
    if (line.startsWith("> ")) {
      elements.push(
        <blockquote
          key={`quote-${index}`}
          className="mb-5 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm leading-7 text-slate-600"
        >
          {line.slice(2)}
        </blockquote>
      );
      return;
    }
    elements.push(
      <p key={`p-${index}`} className="mb-4 text-sm leading-7 text-slate-600">
        {line}
      </p>
    );
  });

  flushList();
  flushTable();

  return elements;
}

export default function DesignDocPanel({ open, onOpenChange, width }: Props) {
  const [activeId, setActiveId] = useState(designDocs[0]?.id ?? "");
  const [copied, setCopied] = useState(false);

  const activeDoc = useMemo(
    () => designDocs.find((doc) => doc.id === activeId) ?? designDocs[0],
    [activeId]
  );

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onOpenChange(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onOpenChange]);

  const handleCopy = async () => {
    if (!activeDoc) return;
    await navigator.clipboard.writeText(activeDoc.content);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <button
        type="button"
        onClick={() => onOpenChange(true)}
        className="fixed bottom-6 right-6 z-40 rounded-full bg-slate-900 px-4 py-3 text-sm font-semibold text-white shadow-2xl transition hover:bg-slate-800"
      >
        设计文档 {designDocs.length}
      </button>
      <aside
        className="fixed right-0 top-0 z-50 h-screen border-l border-line bg-white shadow-2xl transition-transform duration-300"
        style={{ width, transform: open ? "translateX(0)" : `translateX(${width}px)` }}
      >
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between border-b border-line px-5 py-4">
            <div>
              <div className="text-base font-bold text-slate-900">设计文档</div>
              <div className="text-xs text-slate-400">原型说明与变更记录</div>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleCopy}
                className={`rounded-full px-3 py-1.5 text-xs font-semibold ${
                  copied ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-700"
                }`}
              >
                {copied ? "已复制" : "复制"}
              </button>
              <button
                type="button"
                onClick={() => onOpenChange(false)}
                className="rounded-full bg-slate-100 px-2.5 py-1.5 text-sm text-slate-500"
              >
                ×
              </button>
            </div>
          </div>

          <div className="border-b border-line px-3 py-3">
            <div className="soft-scrollbar flex gap-2 overflow-x-auto">
              {designDocs.map((doc) => {
                const active = doc.id === activeDoc?.id;
                return (
                  <button
                    key={doc.id}
                    type="button"
                    onClick={() => setActiveId(doc.id)}
                    className={`whitespace-nowrap rounded-full border px-3 py-2 text-xs font-semibold transition ${
                      active
                        ? "border-brand bg-brand-soft text-brand"
                        : "border-line bg-white text-slate-500 hover:border-slate-300"
                    }`}
                  >
                    {doc.title}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="soft-scrollbar flex-1 overflow-y-auto px-5 py-5">
            {activeDoc ? (
              <>
                <div className="mb-4 text-xs font-medium text-slate-400">{activeDoc.date}</div>
                {renderMarkdown(activeDoc.content)}
              </>
            ) : null}
          </div>
        </div>
      </aside>
    </>
  );
}
