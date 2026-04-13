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
      <div className="w-full max-w-[560px] rounded-2xl overflow-hidden shadow-2xl">
        <img 
          src={certName === "E207780" ? "/cert-icons/塑库网版会员@2x.png" : "/cert-icons/塑库网版@2x.png"} 
          alt="证书资源下载" 
          className="w-full h-auto" 
        />
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 rounded-full p-2 bg-white/80 text-[14px] text-[#98a2b3] hover:bg-white flex items-center justify-center"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 4L4 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M4 4L12 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>
    </div>
  );
}
