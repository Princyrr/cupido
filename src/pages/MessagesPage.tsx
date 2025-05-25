import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import { getMatchesForUser, getMessagesForUsers, Message, mockMessages } from '../data/mockData';
import MessageBubble from '../components/messaging/MessageBubble';
import { Send } from 'lucide-react';

const MessagesPage: React.FC = () => {
  const { currentUser } = useAuth();
  const [matches, setMatches] = useState<Array<any>>([]);
  const [selectedMatch, setSelectedMatch] = useState<any>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (currentUser) {
      const userMatches = getMatchesForUser(currentUser.id);
      setMatches(userMatches);
      
      if (userMatches.length > 0) {
        setSelectedMatch(userMatches[0]);
      }
    }
  }, [currentUser]);

  useEffect(() => {
    if (currentUser && selectedMatch) {
      const userMessages = getMessagesForUsers(currentUser.id, selectedMatch.matchedUser.id);
      setMessages(userMessages);
    }
  }, [currentUser, selectedMatch]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newMessage.trim() || !currentUser || !selectedMatch) return;
    
    const newMsg: Message = {
      id: `msg-${Date.now()}`,
      senderId: currentUser.id,
      receiverId: selectedMatch.matchedUser.id,
      content: newMessage,
      timestamp: new Date(),
      read: false
    };
    
    setMessages([...messages, newMsg]);
    setNewMessage('');
  };

  if (!currentUser) return null;

  return (
    <div className="min-h-[calc(100vh-64px)] bg-gray-50">
      <div className="max-w-6xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-sm overflow-hidden flex h-[calc(100vh-200px)]">
          {/* Matches sidebar */}
          <div className="w-80 border-r flex flex-col">
            <div className="p-4 border-b">
              <h2 className="text-lg font-semibold">Mensagens</h2>
            </div>
            
            <div className="flex-1 overflow-y-auto">
              {matches.length > 0 ? (
                matches.map((match) => (
                  <div 
                    key={match.id}
                    className={`p-4 border-b cursor-pointer hover:bg-gray-50 transition-colors ${
                      selectedMatch?.id === match.id ? 'bg-primary-50' : ''
                    }`}
                    onClick={() => setSelectedMatch(match)}
                  >
                    <div className="flex items-center">
                      <img 
                        src={match.matchedUser.photoUrl} 
                        alt={match.matchedUser.name} 
                        className="h-12 w-12 rounded-full object-cover mr-3"
                      />
                      <div>
                        <h3 className="font-medium text-gray-900">{match.matchedUser.name}</h3>
                        <p className="text-sm text-gray-500 truncate">
                          {/* Show the last message if available */}
                          {getMessagesForUsers(currentUser.id, match.matchedUser.id).length > 0 
                            ? getMessagesForUsers(currentUser.id, match.matchedUser.id)[
                                getMessagesForUsers(currentUser.id, match.matchedUser.id).length - 1
                              ].content.slice(0, 30) + '...'
                            : 'Iniciar conversa...'}
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-4 text-center text-gray-500">
                  Você ainda não tem matches para conversar.
                </div>
              )}
            </div>
          </div>
          
          {/* Chat area */}
          <div className="flex-1 flex flex-col">
            {selectedMatch ? (
              <>
                {/* Chat header */}
                <div className="p-4 border-b flex items-center">
                  <img 
                    src={selectedMatch.matchedUser.photoUrl} 
                    alt={selectedMatch.matchedUser.name} 
                    className="h-10 w-10 rounded-full object-cover mr-3"
                  />
                  <div>
                    <h3 className="font-medium text-gray-900">{selectedMatch.matchedUser.name}</h3>
                    <p className="text-xs text-gray-500">{selectedMatch.matchedUser.location}</p>
                  </div>
                </div>
                
                {/* Messages */}
                <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
                  {messages.length > 0 ? (
                    messages.map((message) => (
                      <MessageBubble key={message.id} message={message} />
                    ))
                  ) : (
                    <div className="text-center py-8 text-gray-500">
                      <p>Sem mensagens ainda. Inicie uma conversa!</p>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>
                
                {/* Message input */}
                <form onSubmit={handleSendMessage} className="p-4 border-t flex">
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Digite sua mensagem..."
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                  <button
                    type="submit"
                    className="bg-primary-500 text-white px-4 py-2 rounded-r-lg hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                  >
                    <Send className="h-5 w-5" />
                  </button>
                </form>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center text-center p-8 text-gray-500">
                <div>
                  <p className="mb-2">Selecione um match para iniciar uma conversa.</p>
                  {matches.length === 0 && (
                    <p>
                      Você ainda não tem matches. Explore perfis na aba "Descobrir" para encontrar pessoas compatíveis.
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessagesPage;