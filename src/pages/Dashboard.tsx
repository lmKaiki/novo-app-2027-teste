import React, { useState, useEffect } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import ServerSidebar from '../components/ServerSidebar';
import ChannelSidebar from '../components/ChannelSidebar';
import ChatArea from '../components/ChatArea';
import MemberSidebar from '../components/MemberSidebar';
import { Server, Channel } from '../types';

export default function Dashboard() {
  const [maintenance, setMaintenance] = useState(false);
  const [minVersion, setMinVersion] = useState('1.0.0');
  const [loading, setLoading] = useState(true);
  const [activeServer, setActiveServer] = useState<Server | null>(null);
  const [activeChannel, setActiveChannel] = useState<Channel | null>(null);

  useEffect(() => {
    const checkConfig = async () => {
      const configDoc = await getDoc(doc(db, 'config', 'app'));
      if (configDoc.exists()) {
        const data = configDoc.data();
        setMaintenance(data.maintenanceMode);
        setMinVersion(data.minVersion);
      }
      setLoading(false);
    };
    checkConfig();
  }, []);

  useEffect(() => {
    setActiveChannel(null); // Reset channel when server changes
  }, [activeServer]);

  if (loading) return <div className="text-white">Carregando...</div>;
  if (maintenance) return <div className="text-white text-center mt-20">Modo de Manutenção Ativo.</div>;
  
  // Simple version check (mocking current version as 1.0.0)
  if ('1.0.0' < minVersion) return <div className="text-white text-center mt-20">Atualização obrigatória necessária.</div>;

  return (
    <div className="flex h-screen bg-[#0F1117] text-white">
      <ServerSidebar onSelectServer={setActiveServer} activeServerId={activeServer?.id || null} />
      {activeServer && (
        <>
          <ChannelSidebar serverId={activeServer.id} onSelectChannel={setActiveChannel} activeChannelId={activeChannel?.id || null} />
          {activeChannel ? (
            <ChatArea serverId={activeServer.id} channelId={activeChannel.id} />
          ) : (
            <div className="flex-1 flex items-center justify-center text-[#b5bac1]">
              Selecione um canal para começar.
            </div>
          )}
          <MemberSidebar serverId={activeServer.id} />
        </>
      )}
      {!activeServer && (
        <div className="flex-1 flex items-center justify-center text-[#b5bac1]">
          Selecione um servidor para começar.
        </div>
      )}
    </div>
  );
}
