export interface User {
  id: string;
  name: string;
  email: string;
  photoUrl: string;
  age: number;
  bio: string;
  location: string;
  interests: string[];
  gender: string;
  lookingFor: string;
}

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  timestamp: Date;
  read: boolean;
}

export interface Match {
  id: string;
  userId1: string;
  userId2: string;
  timestamp: Date;
  status: 'pending' | 'matched' | 'rejected';
}

export const mockUsers: User[] = [
  {
    id: '1',
    name: 'Ana Silva',
    email: 'ana@example.com',
    photoUrl: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg',
    age: 28,
    bio: 'Adoro viajar, ler livros e experimentar novos restaurantes. Procurando alguém que compartilhe dessas paixões!',
    location: 'São Paulo, SP',
    interests: ['viagens', 'leitura', 'gastronomia', 'cinema'],
    gender: 'feminino',
    lookingFor: 'masculino'
  },
  {
    id: '2',
    name: 'Pedro Santos',
    email: 'pedro@example.com',
    photoUrl: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg',
    age: 32,
    bio: 'Engenheiro e músico nas horas vagas. Amo animais e gosto de passar o tempo livre na natureza.',
    location: 'Rio de Janeiro, RJ',
    interests: ['música', 'natureza', 'animais', 'tecnologia'],
    gender: 'masculino',
    lookingFor: 'feminino'
  },
  {
    id: '3',
    name: 'Camila Oliveira',
    email: 'camila@example.com',
    photoUrl: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg',
    age: 25,
    bio: 'Estudante de arquitetura, apaixonada por arte e design. Adoro um bom café e conversas profundas.',
    location: 'Curitiba, PR',
    interests: ['arte', 'design', 'café', 'fotografia'],
    gender: 'feminino',
    lookingFor: 'masculino'
  },
  {
    id: '4',
    name: 'Lucas Mendes',
    email: 'lucas@example.com',
    photoUrl: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg',
    age: 30,
    bio: 'Professor de educação física e entusiasta de esportes de aventura. Buscando alguém para compartilhar momentos emocionantes.',
    location: 'Florianópolis, SC',
    interests: ['esportes', 'aventura', 'natureza', 'fitness'],
    gender: 'masculino',
    lookingFor: 'feminino'
  },
  {
    id: '5',
    name: 'Juliana Costa',
    email: 'juliana@example.com',
    photoUrl: 'https://images.pexels.com/photos/1084188/pexels-photo-1084188.jpeg',
    age: 27,
    bio: 'Advogada e amante de vinhos. Gosto de teatro, música clássica e longas caminhadas no parque.',
    location: 'Belo Horizonte, MG',
    interests: ['vinhos', 'teatro', 'música clássica', 'direito'],
    gender: 'feminino',
    lookingFor: 'masculino'
  },
  {
    id: '6',
    name: 'Marcelo Alves',
    email: 'marcelo@example.com',
    photoUrl: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg',
    age: 34,
    bio: 'Chef de cozinha apaixonado por culinária internacional. Amo viajar para conhecer novos sabores e culturas.',
    location: 'Salvador, BA',
    interests: ['gastronomia', 'viagens', 'culinária', 'cultura'],
    gender: 'masculino',
    lookingFor: 'feminino'
  }
];

export const mockMatches: Match[] = [
  {
    id: 'm1',
    userId1: '1',
    userId2: '2',
    timestamp: new Date('2023-10-10'),
    status: 'matched'
  },
  {
    id: 'm2',
    userId1: '1',
    userId2: '4',
    timestamp: new Date('2023-10-15'),
    status: 'pending'
  },
  {
    id: 'm3',
    userId1: '3',
    userId2: '6',
    timestamp: new Date('2023-10-12'),
    status: 'matched'
  }
];

export const mockMessages: Message[] = [
  {
    id: 'msg1',
    senderId: '1',
    receiverId: '2',
    content: 'Olá, tudo bem? Vi que também gosta de música!',
    timestamp: new Date('2023-10-11T10:30:00'),
    read: true
  },
  {
    id: 'msg2',
    senderId: '2',
    receiverId: '1',
    content: 'Oi Ana! Tudo ótimo e com você? Sim, adoro música! Qual seu estilo favorito?',
    timestamp: new Date('2023-10-11T10:45:00'),
    read: true
  },
  {
    id: 'msg3',
    senderId: '1',
    receiverId: '2',
    content: 'Estou bem! Gosto muito de rock alternativo e MPB. E você?',
    timestamp: new Date('2023-10-11T11:00:00'),
    read: true
  },
  {
    id: 'msg4',
    senderId: '3',
    receiverId: '6',
    content: 'Oi Marcelo! Vi que você é chef. Qual sua especialidade?',
    timestamp: new Date('2023-10-13T14:20:00'),
    read: true
  },
  {
    id: 'msg5',
    senderId: '6',
    receiverId: '3',
    content: 'Olá Camila! Minha especialidade é culinária mediterrânea, mas adoro experimentar cozinhas de todo o mundo!',
    timestamp: new Date('2023-10-13T14:45:00'),
    read: false
  }
];

export function getMatchesForUser(userId: string): Array<Match & { matchedUser: User }> {
  return mockMatches
    .filter(match => match.userId1 === userId || match.userId2 === userId)
    .map(match => {
      const matchedUserId = match.userId1 === userId ? match.userId2 : match.userId1;
      const matchedUser = mockUsers.find(user => user.id === matchedUserId)!;
      return { ...match, matchedUser };
    });
}

export function getMessagesForUsers(userId1: string, userId2: string): Message[] {
  return mockMessages
    .filter(msg => 
      (msg.senderId === userId1 && msg.receiverId === userId2) || 
      (msg.senderId === userId2 && msg.receiverId === userId1)
    )
    .sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime());
}

export function getRecommendedUsers(userId: string, count: number = 5): User[] {
  // Get current user to match interests and preferences
  const currentUser = mockUsers.find(user => user.id === userId);
  if (!currentUser) return [];
  
  // Filter users by gender preference and exclude matched users
  const matches = getMatchesForUser(userId).map(match => match.matchedUser.id);
  
  return mockUsers
    .filter(user => 
      user.id !== userId && 
      !matches.includes(user.id) &&
      user.gender === currentUser.lookingFor
    )
    .slice(0, count);
}