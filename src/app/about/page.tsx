import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-2xl shadow-sm border border-[#e5ebf3]">
      <h1 className="text-2xl font-bold text-[#202938] mb-6">关于我们</h1>
      <p className="text-[#66758a] mb-8">
        我们是一家专注于材料信息管理的平台，提供详细的材料数据和分析工具，帮助用户快速找到所需的材料信息。
      </p>
      
      <div className="flex space-x-4">
        <Link 
          href="/" 
          className="px-4 py-2 bg-[#f65201] text-white rounded-full hover:bg-[#e54800] transition"
        >
          返回材料详情页
        </Link>
      </div>
    </div>
  );
}
