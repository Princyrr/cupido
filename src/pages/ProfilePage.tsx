import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import Button from '../components/common/Button';
import Input from '../components/common/Input';
import Card, { CardHeader, CardContent, CardFooter } from '../components/common/Card';
import { Edit2, Camera, Plus, X } from 'lucide-react';

const ProfilePage: React.FC = () => {
  const { currentUser } = useAuth();
  const [editing, setEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: currentUser?.name || '',
    age: currentUser?.age || '',
    location: currentUser?.location || '',
    bio: currentUser?.bio || '',
    interests: currentUser?.interests || []
  });
  const [newInterest, setNewInterest] = useState('');

  if (!currentUser) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };

  const handleAddInterest = () => {
    if (newInterest.trim() && !profile.interests.includes(newInterest.trim())) {
      setProfile(prev => ({
        ...prev,
        interests: [...prev.interests, newInterest.trim()]
      }));
      setNewInterest('');
    }
  };

  const handleRemoveInterest = (interest: string) => {
    setProfile(prev => ({
      ...prev,
      interests: prev.interests.filter(i => i !== interest)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setEditing(false);
  };

  return (
    <div className="min-h-[calc(100vh-64px)] bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Meu Perfil</h1>
          <p className="text-gray-600">Gerencie suas informações e preferências</p>
        </div>

        <div className="bg-white rounded-xl shadow-md overflow-hidden mb-6">
          <div className="relative h-48 bg-gradient-to-r from-primary-500 to-secondary-600">
            <div className="absolute -bottom-16 left-8">
              <div className="relative">
                <img 
                  src="/minhafoto.png" 
                  alt={currentUser.name} 
                  className="h-32 w-32 rounded-full border-4 border-white object-cover"
                />
                <button className="absolute bottom-0 right-0 h-10 w-10 rounded-full bg-primary-500 text-white flex items-center justify-center">
                  <Camera className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
          
          <div className="pt-20 px-8 pb-8">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">{currentUser.name}, {currentUser.age}</h2>
                <p className="text-gray-600">{currentUser.location}</p>
              </div>
              
              <Button 
                variant="outline"
                onClick={() => setEditing(!editing)}
              >
                <Edit2 className="h-4 w-4 mr-2" />
                {editing ? 'Cancelar' : 'Editar Perfil'}
              </Button>
            </div>
            
            {editing ? (
              <form onSubmit={handleSubmit}>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <Input
                      label="Nome"
                      name="name"
                      value={profile.name}
                      onChange={handleChange}
                      fullWidth
                    />
                    
                    <Input
                      label="Idade"
                      name="age"
                      type="number"
                      value={profile.age}
                      onChange={handleChange}
                      fullWidth
                    />
                  </div>
                  
                  <Input
                    label="Localização"
                    name="location"
                    value={profile.location}
                    onChange={handleChange}
                    fullWidth
                  />
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Sobre mim
                    </label>
                    <textarea
                      name="bio"
                      value={profile.bio}
                      onChange={handleChange}
                      rows={4}
                      className="px-4 py-2 border border-gray-300 rounded-lg w-full focus:border-primary-500 focus:ring-primary-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Interesses
                    </label>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {profile.interests.map((interest, index) => (
                        <div 
                          key={index} 
                          className="bg-gray-100 rounded-full px-3 py-1 flex items-center"
                        >
                          <span className="text-gray-800">{interest}</span>
                          <button
                            type="button"
                            onClick={() => handleRemoveInterest(interest)}
                            className="ml-2 text-gray-500 hover:text-red-500"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                    <div className="flex">
                      <input
                        type="text"
                        value={newInterest}
                        onChange={(e) => setNewInterest(e.target.value)}
                        placeholder="Adicionar interesse"
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-l-lg focus:border-primary-500 focus:ring-primary-500"
                      />
                      <button
                        type="button"
                        onClick={handleAddInterest}
                        className="bg-primary-500 text-white px-4 py-2 rounded-r-lg hover:bg-primary-600"
                      >
                        <Plus className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                  
                  <div className="flex justify-end">
                    <Button type="submit">
                      Salvar Alterações
                    </Button>
                  </div>
                </div>
              </form>
            ) : (
              <div>
                <div className="mb-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Sobre mim</h3>
                  <p className="text-gray-600">
                    {currentUser.bio || "Nenhuma informação adicionada ainda."}
                  </p>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Interesses</h3>
                  <div className="flex flex-wrap gap-2">
                    {currentUser.interests.map((interest, index) => (
                      <span 
                        key={index} 
                        className="bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-sm"
                      >
                        {interest}
                      </span>
                    ))}
                    {currentUser.interests.length === 0 && (
                      <p className="text-gray-600">Nenhum interesse adicionado ainda.</p>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <Card>
          <CardHeader>
            <h3 className="text-lg font-medium text-gray-900">Estatísticas do Perfil</h3>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-primary-500">23</p>
                <p className="text-sm text-gray-600">Visualizações</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-primary-500">12</p>
                <p className="text-sm text-gray-600">Likes</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-primary-500">5</p>
                <p className="text-sm text-gray-600">Matches</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-primary-500">3</p>
                <p className="text-sm text-gray-600">Super Likes</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProfilePage;
