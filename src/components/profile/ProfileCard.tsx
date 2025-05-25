import React from 'react';
import { Heart, X, Star } from 'lucide-react';
import { User } from '../../data/mockData';
import Card from '../common/Card';



interface ProfileCardProps {
  user: User;
  onLike?: () => void;
  onDislike?: () => void;
  onSuperLike?: () => void;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ 
  user, 
  onLike, 
  onDislike, 
  onSuperLike 
}) => {
  return (
    <Card className="w-full max-w-sm mx-auto overflow-hidden">
      <div className="relative">
          <img
  src="/minhafoto.png"
  alt={user.name}
  className="w-full h-96 object-cover"
/>


        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent text-white">
          <h3 className="text-2xl font-bold">{user.name}, {user.age}</h3>
          <p className="text-sm">{user.location}</p>
        </div>
      </div>
      
      <div className="p-4">
        <h4 className="font-medium text-gray-800 mb-2">Sobre mim</h4>
        <p className="text-gray-600 mb-4">{user.bio}</p>
        
        <h4 className="font-medium text-gray-800 mb-2">Interesses</h4>
        <div className="flex flex-wrap gap-2 mb-4">
          {user.interests.map((interest, index) => (
            <span 
              key={index} 
              className="bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-sm"
            >
              {interest}
            </span>
          ))}
        </div>
      </div>
      
      {(onLike || onDislike || onSuperLike) && (
        <div className="flex justify-between items-center p-4 border-t">
          {onDislike && (
            <button 
              onClick={onDislike}
              className="h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center transition-colors hover:bg-red-100"
            >
              <X className="h-6 w-6 text-red-500" />
            </button>
          )}
          
          {onSuperLike && (
            <button 
              onClick={onSuperLike}
              className="h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center transition-colors hover:bg-blue-100"
            >
              <Star className="h-6 w-6 text-blue-500" fill="#3B82F6" />
            </button>
          )}
          
          {onLike && (
            <button 
              onClick={onLike}
              className="h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center transition-colors hover:bg-green-100"
            >
              <Heart className="h-6 w-6 text-green-500" fill="#22C55E" />
            </button>
          )}
        </div>
      )}
    </Card>
  );
};

export default ProfileCard;
