import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Heart, Search, MessageCircle, Shield } from 'lucide-react';
import Button from '../components/common/Button';
import { mockUsers } from '../data/mockData';

const HomePage: React.FC = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary-500 to-secondary-600 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Encontre seu par perfeito com o Cupido
          </h1>
          <p className="text-xl text-white/90 mb-14 max-w-3xl mx-auto">
            O aplicativo de relacionamento que realmente entende o que você procura. Crie conexões autênticas e encontre alguém especial.
          </p>
          {!isAuthenticated && (
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/cadastro">
                <Button size="lg" className="bg-white text-primary-600 hover:bg-gray-100">
                  Começar Agora
                </Button>
              </Link>
              <Link to="/login">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                  Já tenho uma conta
                </Button>
              </Link>
            </div>
          )}
          {isAuthenticated && (
            <Link to="/matches">
              <Button size="lg" className="bg-white text-primary-600 hover:bg-gray-100">
                Explorar Matches
              </Button>
            </Link>
          )}
        </div>
        
        <div className="hidden lg:block absolute bottom-0 left-0 right-0">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
            <path fill="#ffffff" fillOpacity="1" d="M0,96L48,112C96,128,192,160,288,186.7C384,213,480,235,576,213.3C672,192,768,128,864,128C960,128,1056,192,1152,202.7C1248,213,1344,171,1392,149.3L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
          </svg>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Por que escolher o Cupido?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6">
              <div className="bg-primary-100 h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="h-8 w-8 text-primary-500" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Matches de Qualidade</h3>
              <p className="text-gray-600">
                Nosso algoritmo avançado garante conexões baseadas em afinidades reais e interesses compatíveis.
              </p>
            </div>
            
            <div className="text-center p-6">
              <div className="bg-primary-100 h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="h-8 w-8 text-primary-500" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Filtros Personalizados</h3>
              <p className="text-gray-600">
                Encontre exatamente o que procura com filtros avançados de localização, idade e interesses.
              </p>
            </div>
            
            <div className="text-center p-6">
              <div className="bg-primary-100 h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="h-8 w-8 text-primary-500" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Chat em Tempo Real</h3>
              <p className="text-gray-600">
                Converse instantaneamente com seus matches e construa conexões genuínas.
              </p>
            </div>
            
            <div className="text-center p-6">
              <div className="bg-primary-100 h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-primary-500" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Segurança Garantida</h3>
              <p className="text-gray-600">
                Sua privacidade é nossa prioridade. Oferecemos um ambiente seguro para encontrar seu par ideal.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Histórias de Sucesso</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {mockUsers.slice(0, 3).map((user) => (
              <div key={user.id} className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center mb-4">
                  <img 
                    src={user.photoUrl} 
                    alt={user.name} 
                    className="h-12 w-12 rounded-full mr-4 object-cover"
                  />
                  <div>
                    <h3 className="font-semibold">{user.name}</h3>
                    <p className="text-sm text-gray-500">{user.location}</p>
                  </div>
                </div>
                <p className="text-gray-600 italic">
                  "Graças ao Cupido, encontrei uma pessoa incrível que compartilha dos mesmos interesses e valores que eu. Estamos muito felizes juntos!"
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-primary-500 text-white text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-6">Pronto para encontrar seu par perfeito?</h2>
          <p className="text-lg mb-8">
            Junte-se a milhares de pessoas que já encontraram conexões significativas no Cupido.
          </p>
          {!isAuthenticated && (
            <Link to="/cadastro">
              <Button size="lg" className="bg-red-300 text-primary-500 hover:bg-gray-100">
                Cadastre-se Gratuitamente
              </Button>
            </Link>
          )}
          {isAuthenticated && (
            <Link to="/matches">
              <Button size="lg" className="bg-red-300 text-primary-600 hover:bg-gray-100">
                Explorar Matches
              </Button>
            </Link>
          )}
        </div>
      </section>
    </div>
  );
};

export default HomePage;