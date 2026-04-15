import React from 'react';
import { Hash, Volume2, ChevronDown } from 'lucide-react';

export default function ChannelSidebar() {
  const channels = ['geral', 'chat', 'ideias', 'suporte'];
  
  return (
    <aside className="w-60 bg-[#151824] h-screen flex flex-col">
      <div className="h-16 flex items-center px-4 shadow-sm border-b border-[#0B0D12]">
        <h2 className="font-bold text-white truncate">Ethereal Collective</h2>
        <ChevronDown className="ml-auto text-[#b5bac1]" size={20} />
      </div>
      
      <div className="flex-1 overflow-y-auto p-3 space-y-6">
        <div>
          <div className="flex items-center text-[#b5bac1] font-bold text-xs uppercase mb-2">
            <ChevronDown size={14} className="mr-1" />
            Text Channels
          </div>
          <div className="space-y-1">
            {channels.map((channel) => (
              <div key={channel} className={`flex items-center gap-2 px-2 py-1.5 rounded-md cursor-pointer ${channel === 'geral' ? 'bg-[#1e1f26] text-white' : 'text-[#b5bac1] hover:bg-[#1e1f26]/50 hover:text-white'}`}>
                <Hash size={18} />
                <span className="text-sm">{channel}</span>
              </div>
            ))}
          </div>
        </div>
        
        <div>
          <div className="flex items-center text-[#b5bac1] font-bold text-xs uppercase mb-2">
            <ChevronDown size={14} className="mr-1" />
            Voice Channels
          </div>
          <div className="flex items-center gap-2 px-2 py-1.5 text-[#b5bac1] hover:bg-[#1e1f26]/50 hover:text-white rounded-md cursor-pointer">
            <Volume2 size={18} />
            <span className="text-sm">voice-lounge</span>
          </div>
        </div>
      </div>
    </aside>
  );
}
