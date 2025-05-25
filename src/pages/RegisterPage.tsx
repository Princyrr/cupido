import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Button from '../components/common/Button';
import Input from '../components/common/Input';

const RegisterPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    age: '',
    location: '',
    gender: '',
    lookingFor: '',
  });
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (step === 1) {
      if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
        setError('Por favor, preencha todos os campos.');
        return;
      }
      
      if (formData.password !== formData.confirmPassword) {
        setError('As senhas não coincidem.');
        return;
      }
      
      setError('');
      setStep(2);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!formData.age || !formData.location || !formData.gender || !formData.lookingFor) {
      setError('Por favor, preencha todos os campos.');
      return;
    }
    
    try {
      setLoading(true);
      const success = await register(
        {
          name: formData.name,
          email: formData.email,
          age: parseInt(formData.age),
          location: formData.location,
          gender: formData.gender,
          lookingFor: formData.lookingFor,
          bio: '',
          interests: [],
        }, 
        formData.password
      );
      
      if (success) {
        navigate('/perfil');
      } else {
        setError('Ocorreu um erro ao criar sua conta. Tente novamente.');
      }
    } catch (err) {
      setError('Ocorreu um erro. Por favor, tente novamente.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-md w-full bg-white rounded-xl shadow-md p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Criar uma Conta</h1>
          <p className="mt-2 text-gray-600">
            Junte-se ao Cupido e encontre seu par perfeito.
          </p>
        </div>
        
        {error && (
          <div className="bg-red-50 text-red-500 p-4 rounded-lg mb-6">
            {error}
          </div>
        )}
        
        <div className="mb-8">
          <div className="flex items-center">
            <div className={`flex-1 h-1 ${step >= 1 ? 'bg-primary-500' : 'bg-gray-200'}`}></div>
            <div className={`h-8 w-8 rounded-full flex items-center justify-center ${
              step >= 1 ? 'bg-primary-500 text-white' : 'bg-gray-200 text-gray-500'
            }`}>
              1
            </div>
            <div className={`flex-1 h-1 ${step >= 2 ? 'bg-primary-500' : 'bg-gray-200'}`}></div>
            <div className={`h-8 w-8 rounded-full flex items-center justify-center ${
              step >= 2 ? 'bg-primary-500 text-white' : 'bg-gray-200 text-gray-500'
            }`}>
              2
            </div>
            <div className="flex-1 h-1 bg-gray-200"></div>
          </div>
          <div className="flex justify-between mt-2">
            <span className="text-xs text-gray-500">Dados da conta</span>
            <span className="text-xs text-gray-500">Informações pessoais</span>
          </div>
        </div>
        
        {step === 1 && (
          <form onSubmit={handleNextStep} className="space-y-6">
            <Input
              label="Nome completo"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Seu nome completo"
              required
              fullWidth
            />
            
            <Input
              label="Email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Seu melhor email"
              required
              fullWidth
            />
            
            <Input
              label="Senha"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Escolha uma senha segura"
              required
              fullWidth
            />
            
            <Input
              label="Confirme sua senha"
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Repita sua senha"
              required
              fullWidth
            />
            
            <Button
              type="submit"
              fullWidth
            >
              Continuar
            </Button>
          </form>
        )}
        
        {step === 2 && (
          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              label="Idade"
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              placeholder="Sua idade"
              min="18"
              max="120"
              required
              fullWidth
            />
            
            <Input
              label="Localização"
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="Cidade, Estado"
              required
              fullWidth
            />
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Gênero
              </label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="px-4 py-2 border border-gray-300 rounded-lg w-full focus:border-primary-500 focus:ring-primary-500"
                required
              >
                <option value="">Selecione...</option>
                <option value="masculino">Masculino</option>
                <option value="feminino">Feminino</option>
                <option value="outro">Outro</option>
              </select>
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Procurando por
              </label>
              <select
                name="lookingFor"
                value={formData.lookingFor}
                onChange={handleChange}
                className="px-4 py-2 border border-gray-300 rounded-lg w-full focus:border-primary-500 focus:ring-primary-500"
                required
              >
                <option value="">Selecione...</option>
                <option value="masculino">Homens</option>
                <option value="feminino">Mulheres</option>
                <option value="todos">Todos</option>
              </select>
            </div>
            
            <div className="flex space-x-4">
              <Button
                type="button"
                variant="outline"
                fullWidth
                onClick={() => setStep(1)}
              >
                Voltar
              </Button>
              
              <Button
                type="submit"
                fullWidth
                isLoading={loading}
                disabled={loading}
              >
                Concluir Cadastro
              </Button>
            </div>
          </form>
        )}
        
        <div className="text-center mt-6">
          <p className="text-sm text-gray-600">
            Já tem uma conta?{' '}
            <Link to="/login" className="text-primary-500 hover:text-primary-600 font-medium">
              Entrar
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;