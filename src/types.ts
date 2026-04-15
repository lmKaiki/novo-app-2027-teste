export interface User {
  uid: string;
  nome: string;
  email: string;
  fotoPerfil?: string;
  dataCriacao: string;
}

export interface Server {
  id: string;
  nome: string;
  ownerId: string;
  createdAt: string;
}

export interface Channel {
  id: string;
  serverId: string;
  nome: string;
  type: 'text' | 'voice';
}

export interface Message {
  id: string;
  channelId: string;
  userId: string;
  text: string;
  createdAt: any;
}

export interface Role {
  id: string;
  serverId: string;
  nome: string;
  permissions: {
    manageChannels: boolean;
    manageRoles: boolean;
    kickMembers: boolean;
    banMembers: boolean;
    createEvents: boolean;
    sendMessages: boolean;
  };
}

export interface Member {
  id: string;
  serverId: string;
  userId: string;
  roleId: string;
}

export interface Event {
  id: string;
  serverId: string;
  titulo: string;
  data: string;
}
