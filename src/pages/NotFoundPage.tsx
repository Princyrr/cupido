import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/common/Button';
import { Heart } from 'lucide-react';

const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-[calc(100vh-64px)] bg-gray-50 flex flex-col items-center justify-center text-center px-4 py-12">
      <div className="max-w-md">
        <Heart className="h-20 w-20 text-primary-500 mx-auto mb-6" />
        
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Página não encontrada</h1>
        
        <p className="text-lg text-gray-600 mb-8">
          Ops! Parece que você está procurando por algo que não existe. Talvez seu match perfeito esteja em outro lugar.
        </p>
        
        <Link to="/">
          <Button size="lg">
            Voltar para a Página Inicial
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;