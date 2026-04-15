import React, { useState, useEffect } from 'react';
import { Hash, Volume2, ChevronDown } from 'lucide-react';
import { collection, query, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';
import { Channel } from '../types';

interface Props {
  serverId: string;
  onSelectChannel: (channel: Channel) => void;
  activeChannelId: string | null;
}

export default function ChannelSidebar({ serverId, onSelectChannel, activeChannelId }: Props) {
  const [channels, setChannels] = useState<Channel[]>([]);
  
  useEffect(() => {
    const q = query(collection(db, 'servers', serverId, 'channels'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const chs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Channel));
      setChannels(chs);
    });
    return unsubscribe;
  }, [serverId]);
  
  return (
    <aside className="w-60 bg-[#151824] h-screen flex flex-col">
      <div className="h-16 flex items-center px-4 shadow-sm border-b border-[#0B0D12]">
        <h2 className="font-bold text-white truncate">Server {serverId.substring(0, 5)}</h2>
        <ChevronDown className="ml-auto text-[#b5bac1]" size={20} />
      </div>
      
      <div className="flex-1 overflow-y-auto p-3 space-y-6">
        <div>
          <div className="flex items-center text-[#b5bac1] font-bold text-xs uppercase mb-2">
            <ChevronDown size={14} className="mr-1" />
            Text Channels
          </div>
          <div className="space-y-1">
            {channels.filter(c => c.type === 'text').map((channel) => (
              <div 
                key={channel.id} 
                onClick={() => onSelectChannel(channel)}
                className={`flex items-center gap-2 px-2 py-1.5 rounded-md cursor-pointer ${activeChannelId === channel.id ? 'bg-[#1e1f26] text-white' : 'text-[#b5bac1] hover:bg-[#1e1f26]/50 hover:text-white'}`}
              >
                <Hash size={18} />
                <span className="text-sm">{channel.nome}</span>
              </div>
            ))}
          </div>
        </div>
        
        <div>
          <div className="flex items-center text-[#b5bac1] font-bold text-xs uppercase mb-2">
            <ChevronDown size={14} className="mr-1" />
            Voice Channels
          </div>
          <div className="space-y-1">
            {channels.filter(c => c.type === 'voice').map((channel) => (
              <div 
                key={channel.id} 
                onClick={() => onSelectChannel(channel)}
                className={`flex items-center gap-2 px-2 py-1.5 rounded-md cursor-pointer ${activeChannelId === channel.id ? 'bg-[#1e1f26] text-white' : 'text-[#b5bac1] hover:bg-[#1e1f26]/50 hover:text-white'}`}
              >
                <Volume2 size={18} />
                <span className="text-sm">{channel.nome}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
}
