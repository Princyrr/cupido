import React from 'react';
import { clsx } from 'clsx';
import { Message } from '../../data/mockData';
import { useAuth } from '../../context/AuthContext';

interface MessageBubbleProps {
  message: Message;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  const { currentUser } = useAuth();
  const isCurrentUser = currentUser?.id === message.senderId;
  
  const formatTime = (date: Date) => {
    return new Intl.DateTimeFormat('pt-BR', {
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  return (
    <div className={clsx(
      'flex',
      isCurrentUser ? 'justify-end' : 'justify-start',
      'mb-4'
    )}>
      <div className={clsx(
        'max-w-[70%] rounded-2xl p-3',
        isCurrentUser ? 'bg-primary-500 text-white rounded-tr-none' : 'bg-gray-100 text-gray-800 rounded-tl-none',
      )}>
        <p className="break-words">{message.content}</p>
        <div className={clsx(
          'text-xs mt-1',
          isCurrentUser ? 'text-primary-100' : 'text-gray-500'
        )}>
          {formatTime(message.timestamp)}
          {isCurrentUser && (
            <span className="ml-1">
              {message.read ? '• Visto' : ''}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;