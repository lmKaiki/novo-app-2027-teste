import React from 'react';

export default function MemberSidebar() {
  const members = [
    { name: 'User1', status: 'online' },
    { name: 'User2', status: 'idle' },
    { name: 'User3', status: 'offline' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'bg-green-500';
      case 'idle': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <aside className="w-60 bg-[#151824] h-screen p-4">
      <h2 className="font-bold mb-4 text-[#b5bac1] text-xs uppercase">Online — {members.length}</h2>
      <div className="space-y-3">
        {members.map((member) => (
          <div key={member.name} className="flex items-center gap-3 cursor-pointer group">
            <div className="relative">
              <div className="w-8 h-8 rounded-full bg-[#5865F2] flex items-center justify-center text-white font-bold">
                {member.name[0]}
              </div>
              <div className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-[#151824] ${getStatusColor(member.status)}`}></div>
            </div>
            <span className="text-[#f2f3f5] group-hover:text-white">{member.name}</span>
          </div>
        ))}
      </div>
    </aside>
  );
}
