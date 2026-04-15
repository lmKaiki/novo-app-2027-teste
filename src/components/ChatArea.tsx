import React, { useState, useEffect } from 'react';
import { Hash, Search, Bell, Users, HelpCircle, Inbox, Smile, Paperclip, Send } from 'lucide-react';
import { collection, addDoc, query, orderBy, onSnapshot, serverTimestamp } from 'firebase/firestore';
import { db, auth } from '../firebase';
import { Message } from '../types';

interface Props {
  serverId: string;
  channelId: string;
}

export default function ChatArea({ serverId, channelId }: Props) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    const q = query(collection(db, 'servers', serverId, 'channels', channelId, 'messages'), orderBy('createdAt', 'asc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const msgs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Message));
      setMessages(msgs);
    });
    return unsubscribe;
  }, [serverId, channelId]);

  const sendMessage = async () => {
    if (newMessage.trim() === '' || !auth.currentUser) return;
    await addDoc(collection(db, 'servers', serverId, 'channels', channelId, 'messages'), {
      text: newMessage,
      userId: auth.currentUser.uid,
      createdAt: serverTimestamp(),
    });
    setNewMessage('');
  };

  return (
    <main className="flex-1 flex flex-col bg-[#151824]">
      {/* Header */}
      <header className="h-16 border-b border-[#0B0D12] flex items-center px-6 justify-between">
        <div className="flex items-center gap-2 text-white font-bold">
          <Hash className="text-[#b5bac1]" />
          <span>channel-{channelId.substring(0, 5)}</span>
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
        {messages.map((msg) => (
          <div key={msg.id} className="flex gap-4 group">
            <div className="w-10 h-10 rounded-full bg-[#5865F2] flex items-center justify-center text-white font-bold">
              {msg.userId.substring(0, 1).toUpperCase()}
            </div>
            <div className="flex-1">
              <div className="flex items-baseline gap-2">
                <span className="font-bold text-white">{msg.userId.substring(0, 5)}</span>
                <span className="text-xs text-[#b5bac1]">
                  {msg.createdAt?.toDate().toLocaleTimeString()}
                </span>
              </div>
              <p className="text-[#f2f3f5]">{msg.text}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="p-6">
        <div className="bg-[#1e1f26] rounded-xl p-3 flex items-center gap-3">
          <Paperclip className="text-[#b5bac1] cursor-pointer" />
          <input 
            className="flex-1 bg-transparent border-none focus:ring-0 text-white" 
            placeholder={`Message channel-${channelId.substring(0, 5)}`}
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
          />
          <Smile className="text-[#b5bac1] cursor-pointer" />
          <Send className="text-[#5865F2] cursor-pointer" onClick={sendMessage} />
        </div>
      </div>
    </main>
  );
}
