import React from 'react';
import { Hash, Search, Bell, Users, HelpCircle, Inbox, Smile, Paperclip, Send } from 'lucide-react';

export default function ChatArea() {
  return (
    <main className="flex-1 flex flex-col bg-[#151824]">
      {/* Header */}
      <header className="h-16 border-b border-[#0B0D12] flex items-center px-6 justify-between">
        <div className="flex items-center gap-2 text-white font-bold">
          <Hash className="text-[#b5bac1]" />
          <span>geral</span>
        </div>
        <div className="flex items-center gap-4 text-[#b5bac1]">
          <Bell size={20} className="cursor-pointer hover:text-white" />
          <Users size={20} className="cursor-pointer hover:text-white" />
          <div className="relative">
            <input className="bg-[#0B0D12] rounded-md px-3 py-1 text-sm w-48" placeholder="Search" />
            <Search size={16} className="absolute right-2 top-2" />
          </div>
          <Inbox size={20} className="cursor-pointer hover:text-white" />
          <HelpCircle size={20} className="cursor-pointer hover:text-white" />
        </div>
      </header>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex gap-4 group">
            <div className="w-10 h-10 rounded-full bg-[#5865F2] flex items-center justify-center text-white font-bold">U</div>
            <div className="flex-1">
              <div className="flex items-baseline gap-2">
                <span className="font-bold text-white">User {i}</span>
                <span className="text-xs text-[#b5bac1]">10:00 AM</span>
              </div>
              <p className="text-[#f2f3f5]">This is message number {i}.</p>
            </div>
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="p-6">
        <div className="bg-[#1e1f26] rounded-xl p-3 flex items-center gap-3">
          <Paperclip className="text-[#b5bac1] cursor-pointer" />
          <input className="flex-1 bg-transparent border-none focus:ring-0 text-white" placeholder="Message #geral" />
          <Smile className="text-[#b5bac1] cursor-pointer" />
          <Send className="text-[#5865F2] cursor-pointer" />
        </div>
      </div>
    </main>
  );
}
