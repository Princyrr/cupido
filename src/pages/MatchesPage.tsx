import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import ProfileCard from '../components/profile/ProfileCard';
import MatchCard from '../components/matching/MatchCard';
import { getMatchesForUser, getRecommendedUsers, User } from '../data/mockData';

const MatchesPage: React.FC = () => {
  const { currentUser } = useAuth();
  const [activeTab, setActiveTab] = useState<'discover' | 'matches'>('discover');
  const [recommendedUsers, setRecommendedUsers] = useState<User[]>([]);
  const [matches, setMatches] = useState<Array<any>>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentUser) {
      const recommended = getRecommendedUsers(currentUser.id);
      setRecommendedUsers(recommended);
      
      const userMatches = getMatchesForUser(currentUser.id);
      setMatches(userMatches);
    }
  }, [currentUser]);

  const handleLike = () => {
    if (currentIndex < recommendedUsers.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      // Reset or show a message when no more profiles
      alert("Você viu todos os perfis disponíveis por hoje. Tente novamente mais tarde!");
      setCurrentIndex(0);
    }
  };

  const handleDislike = () => {
    if (currentIndex < recommendedUsers.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      // Reset or show a message when no more profiles
      alert("Você viu todos os perfis disponíveis por hoje. Tente novamente mais tarde!");
      setCurrentIndex(0);
    }
  };

  const handleSuperLike = () => {
    if (currentIndex < recommendedUsers.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      // Reset or show a message when no more profiles
      alert("Você viu todos os perfis disponíveis por hoje. Tente novamente mais tarde!");
      setCurrentIndex(0);
    }
  };

  const currentRecommendedUser = recommendedUsers[currentIndex];

  return (
    <div className="min-h-[calc(100vh-64px)] bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="mb-6">
          <div className="bg-white rounded-lg shadow-sm flex">
            <button
              className={`flex-1 py-3 text-center font-medium ${
                activeTab === 'discover'
                  ? 'text-primary-500 border-b-2 border-primary-500'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('discover')}
            >
              Descobrir
            </button>
            <button
              className={`flex-1 py-3 text-center font-medium ${
                activeTab === 'matches'
                  ? 'text-primary-500 border-b-2 border-primary-500'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('matches')}
            >
              Meus Matches
            </button>
          </div>
        </div>

        {activeTab === 'discover' && (
          <div className="flex justify-center">
            {recommendedUsers.length > 0 ? (
              <div className="w-full max-w-md mx-auto">
                <ProfileCard 
                  user={currentRecommendedUser}
                  onLike={handleLike}
                  onDislike={handleDislike}
                  onSuperLike={handleSuperLike}
                />
              </div>
            ) : (
              <div className="text-center py-20">
                <p className="text-gray-500">
                  Não há mais perfis disponíveis no momento. Tente novamente mais tarde.
                </p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'matches' && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Seus Matches</h2>
            
            {matches.length > 0 ? (
              <div className="space-y-4">
                {matches.map((match) => (
                  <MatchCard key={match.id} match={match} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-white rounded-lg shadow-sm">
                <p className="text-gray-500">
                  Você ainda não tem matches. Continue explorando para encontrar pessoas compatíveis.
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MatchesPage;