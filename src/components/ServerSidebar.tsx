import React from 'react';
import { Home, Plus, Hash, Code, Palette, Music, Compass } from 'lucide-react';

export default function ServerSidebar() {
  return (
    <aside className="w-[72px] bg-[#0B0D12] h-screen flex flex-col items-center py-4 gap-3">
      <div className="w-12 h-12 bg-gradient-to-tr from-[#5865F2] to-[#bec2ff] rounded-[16px] flex items-center justify-center mb-2 cursor-pointer">
        <Home className="text-white" />
      </div>
      <div className="w-8 h-[2px] bg-[#1e1f26] rounded-full mb-2" />
      
      {/* Server Icons */}
      <div className="flex flex-col gap-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="w-12 h-12 bg-[#151824] rounded-full hover:rounded-[16px] transition-all duration-300 flex items-center justify-center text-[#5865F2] cursor-pointer hover:bg-[#5865F2] hover:text-white">
            <Hash size={24} />
          </div>
        ))}
      </div>
      
      <button className="mt-auto w-12 h-12 bg-[#151824] rounded-full flex items-center justify-center text-[#5865F2] hover:bg-[#5865F2] hover:text-white transition-all">
        <Plus size={24} />
      </button>
    </aside>
  );
}
