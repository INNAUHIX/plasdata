"use client";

import Link from 'next/link';

export default function Header() {
  return (
    <header className="sticky top-0 z-30 border-b border-[#e8edf5] bg-white/98 backdrop-blur">
      <div className="mx-auto flex h-[76px] w-full max-w-7xl items-center justify-between gap-5 px-4 xl:px-0">
        <div className="shrink-0">
          <Link href="/" className="inline-block text-2xl font-bold text-[#f97316]">
            塑库网
          </Link>
        </div>

        <nav className="hidden flex-1 items-center justify-center gap-9 lg:flex">
          <Link href="/" className="text-[16px] font-medium text-[#334155] transition hover:text-[#f97316]">
            首页
          </Link>
          <Link href="/about" className="text-[16px] font-medium text-[#334155] transition hover:text-[#f97316]">
            关于我们
          </Link>
        </nav>
      </div>
    </header>
  );
}
