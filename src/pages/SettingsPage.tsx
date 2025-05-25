import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Button from '../components/common/Button';
import { Bell, Shield, Eye, Globe } from 'lucide-react';

const SettingsPage: React.FC = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  
  const [notifications, setNotifications] = useState({
    newMatches: true,
    messages: true,
    likes: true,
    appUpdates: false
  });
  
  const [privacy, setPrivacy] = useState({
    showOnlineStatus: true,
    showDistance: true,
    showLastActive: true,
    shareData: false
  });

  const handleNotificationChange = (setting: string) => {
    setNotifications(prev => ({
      ...prev,
      [setting]: !prev[setting as keyof typeof prev]
    }));
  };

  const handlePrivacyChange = (setting: string) => {
    setPrivacy(prev => ({
      ...prev,
      [setting]: !prev[setting as keyof typeof prev]
    }));
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleDeleteAccount = () => {
    // In a real app, this would delete the user's account
    if (window.confirm('Tem certeza que deseja excluir sua conta? Essa ação não pode ser desfeita.')) {
      logout();
      navigate('/');
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Configurações</h1>
          <p className="text-gray-600">Gerencie suas preferências e configurações de conta</p>
        </div>

        <div className="bg-white rounded-xl shadow-md overflow-hidden mb-6">
          <div className="border-b border-gray-200">
            <div className="px-6 py-5 flex items-center">
              <Bell className="h-6 w-6 text-primary-500 mr-3" />
              <h2 className="text-lg font-medium text-gray-900">Notificações</h2>
            </div>
          </div>
          
          <div className="px-6 py-5 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">Novos matches</p>
                <p className="text-sm text-gray-500">Receba notificações quando der match com alguém</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={notifications.newMatches} 
                  onChange={() => handleNotificationChange('newMatches')}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-500"></div>
              </label>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">Mensagens</p>
                <p className="text-sm text-gray-500">Receba notificações de novas mensagens</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={notifications.messages} 
                  onChange={() => handleNotificationChange('messages')}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-500"></div>
              </label>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">Likes</p>
                <p className="text-sm text-gray-500">Receba notificações quando alguém curtir seu perfil</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={notifications.likes} 
                  onChange={() => handleNotificationChange('likes')}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-500"></div>
              </label>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">Atualizações do app</p>
                <p className="text-sm text-gray-500">Receba informações sobre novos recursos</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={notifications.appUpdates} 
                  onChange={() => handleNotificationChange('appUpdates')}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-500"></div>
              </label>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md overflow-hidden mb-6">
          <div className="border-b border-gray-200">
            <div className="px-6 py-5 flex items-center">
              <Shield className="h-6 w-6 text-primary-500 mr-3" />
              <h2 className="text-lg font-medium text-gray-900">Privacidade</h2>
            </div>
          </div>
          
          <div className="px-6 py-5 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">Status online</p>
                <p className="text-sm text-gray-500">Mostrar quando você está online</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={privacy.showOnlineStatus} 
                  onChange={() => handlePrivacyChange('showOnlineStatus')}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-500"></div>
              </label>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">Distância</p>
                <p className="text-sm text-gray-500">Mostrar sua distância em relação aos outros usuários</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={privacy.showDistance} 
                  onChange={() => handlePrivacyChange('showDistance')}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-500"></div>
              </label>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">Última atividade</p>
                <p className="text-sm text-gray-500">Mostrar quando você esteve ativo pela última vez</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={privacy.showLastActive} 
                  onChange={() => handlePrivacyChange('showLastActive')}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-500"></div>
              </label>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">Compartilhar dados</p>
                <p className="text-sm text-gray-500">Permitir que seus dados sejam usados para melhorar o app</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={privacy.shareData} 
                  onChange={() => handlePrivacyChange('shareData')}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-500"></div>
              </label>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md overflow-hidden mb-6">
          <div className="border-b border-gray-200">
            <div className="px-6 py-5 flex items-center">
              <Globe className="h-6 w-6 text-primary-500 mr-3" />
              <h2 className="text-lg font-medium text-gray-900">Configurações de Conta</h2>
            </div>
          </div>
          
          <div className="px-6 py-5 space-y-4">
            <div>
              <p className="font-medium text-gray-900 mb-1">Idioma</p>
              <select className="px-4 py-2 border border-gray-300 rounded-lg w-full focus:border-primary-500 focus:ring-primary-500">
                <option value="pt-BR">Português (Brasil)</option>
                <option value="en-US">English (US)</option>
                <option value="es">Español</option>
                <option value="fr">Français</option>
              </select>
            </div>
            
            <div>
              <p className="font-medium text-gray-900 mb-1">Unidade de distância</p>
              <div className="flex space-x-4">
                <label className="flex items-center">
                  <input 
                    type="radio" 
                    name="distance" 
                    value="km" 
                    defaultChecked 
                    className="h-4 w-4 text-primary-500 focus:ring-primary-500 border-gray-300"
                  />
                  <span className="ml-2 text-gray-700">Quilômetros</span>
                </label>
                <label className="flex items-center">
                  <input 
                    type="radio" 
                    name="distance" 
                    value="mi" 
                    className="h-4 w-4 text-primary-500 focus:ring-primary-500 border-gray-300"
                  />
                  <span className="ml-2 text-gray-700">Milhas</span>
                </label>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <Button 
            onClick={handleLogout}
            fullWidth
            variant="outline"
          >
            Sair da Conta
          </Button>
          
          <Button 
            onClick={handleDeleteAccount}
            fullWidth
            className="bg-red-500 hover:bg-red-600 focus:ring-red-500"
          >
            Excluir Conta
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;