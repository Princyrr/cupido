import React from 'react';
import { MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import Card from '../common/Card';
import { Match, User } from '../../data/mockData';

interface MatchCardProps {
  match: Match & { matchedUser: User };
}

const MatchCard: React.FC<MatchCardProps> = ({ match }) => {
  const { matchedUser } = match;
  
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    }).format(date);
  };
  
  return (
    <Card
      className="flex flex-col sm:flex-row overflow-hidden"
      hoverable
    >
      <div className="sm:w-40 h-40">
        <img 
          src={matchedUser.photoUrl} 
          alt={matchedUser.name} 
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="p-4 flex-1">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-xl font-semibold text-gray-800">
              {matchedUser.name}, {matchedUser.age}
            </h3>
            <p className="text-sm text-gray-500">{matchedUser.location}</p>
          </div>
          <span className="text-xs text-gray-400">
            Match em {formatDate(match.timestamp)}
          </span>
        </div>
        
        <p className="my-2 text-gray-600 line-clamp-2">{matchedUser.bio}</p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {matchedUser.interests.slice(0, 3).map((interest, index) => (
            <span 
              key={index} 
              className="bg-primary-100 text-primary-700 px-2 py-1 rounded-full text-xs"
            >
              {interest}
            </span>
          ))}
          {matchedUser.interests.length > 3 && (
            <span className="text-xs text-gray-500">
              +{matchedUser.interests.length - 3} mais
            </span>
          )}
        </div>
        
        <Link 
          to={`/mensagens/${matchedUser.id}`}
          className="flex items-center text-primary-500 hover:text-primary-600 text-sm font-medium"
        >
          <MessageCircle className="h-4 w-4 mr-1" />
          <span>Enviar mensagem</span>
        </Link>
      </div>
    </Card>
  );
};

export default MatchCard;