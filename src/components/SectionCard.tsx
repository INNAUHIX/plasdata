import type { ReactNode } from "react";

type Props = {
  title?: string;
  id?: string;
  header?: ReactNode;
  children: ReactNode;
  className?: string;
};

export default function SectionCard({ title, id, header, children, className = "" }: Props) {
  return (
    <section id={id} className={`rounded-xl border border-line bg-white shadow-card ${className}`}>
      {header}
      <div className="p-[22px]">
        {title ? <h3 className="mb-3 text-lg font-bold text-txt-strong">{title}</h3> : null}
        {children}
      </div>
    </section>
  );
}
