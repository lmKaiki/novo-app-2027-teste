import React, { useState, useEffect } from 'react';
import { Home, Plus, Hash } from 'lucide-react';
import { collection, query, onSnapshot } from 'firebase/firestore';
import { db, auth } from '../firebase';
import { Server } from '../types';

interface Props {
  onSelectServer: (server: Server) => void;
  activeServerId: string | null;
}

export default function ServerSidebar({ onSelectServer, activeServerId }: Props) {
  const [servers, setServers] = useState<Server[]>([]);

  useEffect(() => {
    if (!auth.currentUser) return;
    const q = query(collection(db, 'servers')); 
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const srvs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Server));
      setServers(srvs);
    });
    return unsubscribe;
  }, []);

  return (
    <aside className="w-[72px] bg-[#0B0D12] h-screen flex flex-col items-center py-4 gap-3">
      <div className="w-12 h-12 bg-gradient-to-tr from-[#5865F2] to-[#bec2ff] rounded-[16px] flex items-center justify-center mb-2 cursor-pointer">
        <Home className="text-white" />
      </div>
      <div className="w-8 h-[2px] bg-[#1e1f26] rounded-full mb-2" />
      
      <div className="flex flex-col gap-3">
        {servers.map((server) => (
          <div 
            key={server.id} 
            onClick={() => onSelectServer(server)}
            className={`w-12 h-12 rounded-full hover:rounded-[16px] transition-all duration-300 flex items-center justify-center cursor-pointer ${activeServerId === server.id ? 'bg-[#5865F2] text-white rounded-[16px]' : 'bg-[#151824] text-[#5865F2] hover:bg-[#5865F2] hover:text-white'}`}
          >
            {server.nome.substring(0, 2).toUpperCase()}
          </div>
        ))}
      </div>
      
      <button className="mt-auto w-12 h-12 bg-[#151824] rounded-full flex items-center justify-center text-[#5865F2] hover:bg-[#5865F2] hover:text-white transition-all">
        <Plus size={24} />
      </button>
    </aside>
  );
}
