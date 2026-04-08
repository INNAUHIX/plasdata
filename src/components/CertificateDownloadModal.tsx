"use client";

import { useMemo, useState } from "react";

type CertAccessType = "member" | "service";

interface CertificateDownloadModalProps {
  open: boolean;
  certName: string;
  certCode?: string;
  accessType: CertAccessType;
  isMember: boolean;
  revisionDate?: string;
  previewContent?: string[];
  isFavorite: boolean;
  onToggleFavorite: () => void;
  onClose: () => void;
}

export default function CertificateDownloadModal({
  open,
  certName,
  certCode,
  accessType,
  isMember,
  revisionDate,
  previewContent = [],
  isFavorite,
  onToggleFavorite,
  onClose
}: CertificateDownloadModalProps) {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [shareDone, setShareDone] = useState(false);

  const shareLink = useMemo(() => {
    if (typeof window === "undefined") return "";
    const encoded = encodeURIComponent(certName || certCode || "certificate");
    return `${window.location.origin}${window.location.pathname}?cert=${encoded}`;
  }, [certCode, certName]);

  if (!open) return null;

  const canDownload = accessType === "member" && isMember;
  const needMembership = accessType === "member" && !isMember;
  const needService = accessType === "service";
  const showRevision = accessType === "member" && !!revisionDate;

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: `${certName} 证书资源`,
          text: `查看 ${certName} 证书资源`,
          url: shareLink
        });
      } else if (navigator.clipboard) {
        await navigator.clipboard.writeText(shareLink);
      }
      setShareDone(true);
      window.setTimeout(() => setShareDone(false), 1500);
    } catch {
      setShareDone(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-[70] flex items-center justify-center bg-black/45 px-4"
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div className="w-full max-w-[560px] rounded-2xl border border-[#e7edf5] bg-[#F7F8FA] px-6 pt-6 pb-0 shadow-2xl">
        {!needService && (
          <div className="mb-4 flex items-start justify-between gap-4">
            <div>
              <h3 className="text-[18px] font-bold text-[#202938]">证书资源下载</h3>
              {showRevision ? (
                <p className="mt-1 text-[12px] font-semibold text-[#f65201]">{revisionDate} 修订</p>
              ) : null}
            </div>
            <button
              type="button"
              onClick={onClose}
              className="rounded-full p-2 text-[14px] text-[#98a2b3] hover:bg-[#f4f7fb] flex items-center justify-center"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 4L4 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M4 4L12 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        )}
        {needService && (
          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={onClose}
              className="rounded-full p-2 text-[14px] text-[#98a2b3] hover:bg-[#f4f7fb] flex items-center justify-center"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 4L4 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M4 4L12 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        )}

        {!needService && (
          <>
            <div className="mb-4 flex items-center gap-3">
              <button
                type="button"
                onClick={onToggleFavorite}
                className={`rounded-lg px-3 py-1.5 text-[12px] font-semibold ${
                  isFavorite ? "bg-[#fff1e8] text-[#f65201]" : "bg-[#f4f7fb] text-[#667085]"
                }`}
              >
                {isFavorite ? "已收藏" : "收藏"}
              </button>
              <button
                type="button"
                onClick={handleShare}
                className="rounded-lg bg-[#f4f7fb] px-3 py-1.5 text-[12px] font-semibold text-[#667085]"
              >
                {shareDone ? "已复制链接" : "分享"}
              </button>
              <button
                type="button"
                onClick={() => setPreviewOpen((prev) => !prev)}
                className="rounded-lg bg-[#f4f7fb] px-3 py-1.5 text-[12px] font-semibold text-[#667085]"
              >
                {previewOpen ? "收起预览" : "预览证书内容"}
              </button>
            </div>

            {previewOpen ? (
              <div className="mb-4 rounded-xl border border-[#e7edf5] bg-[#fafcff] p-4 text-[13px] leading-6 text-[#4b5563]">
                {previewContent.length ? (
                  previewContent.map((line, idx) => <p key={`${line}-${idx}`}>{line}</p>)
                ) : (
                  <p>暂无可预览内容。</p>
                )}
              </div>
            ) : null}

            {needMembership ? (
              <div className="rounded-xl bg-[#fff7ed] px-4 py-4 text-[14px] text-[#9a3412]">
                该证书资源仅限会员下载。开通会员后可直接获取完整证书文件。
              </div>
            ) : null}

            {canDownload ? (
              <div className="rounded-xl bg-[#ecfdf3] px-4 py-4 text-[14px] text-[#166534]">
                当前账号具备会员权限，可直接下载该证书资源。
              </div>
            ) : null}

            <div className="mt-6 flex flex-wrap justify-end gap-3">
              {needMembership ? (
                <button
                  type="button"
                  className="rounded-lg bg-[linear-gradient(135deg,#f65201,#ff8a3d)] px-4 py-2 text-[13px] font-semibold text-white shadow-[0_8px_20px_rgba(246,82,1,0.25)]"
                >
                  开通会员
                </button>
              ) : null}

              {canDownload ? (
                <button
                  type="button"
                  className="rounded-lg bg-[linear-gradient(135deg,#f65201,#ff8a3d)] px-4 py-2 text-[13px] font-semibold text-white shadow-[0_8px_20px_rgba(246,82,1,0.25)]"
                >
                  立即下载
                </button>
              ) : null}
            </div>
          </>
        )}

        {needService ? (
          <div className="mt-2 -mx-6 rounded-b-2xl bg-white p-0">
            <img src="/cert-icons/塑库网版@2x.png" alt="证书资源下载" className="w-full h-auto" />
          </div>
        ) : null}
      </div>
    </div>
  );
}
