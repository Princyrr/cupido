import React from 'react';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-50 border-t">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <Link to="/" className="flex items-center">
              <Heart className="h-6 w-6 text-primary-500" fill="#F43F5E" />
              <span className="ml-2 text-xl font-bold bg-gradient-to-r from-primary-500 to-secondary-600 bg-clip-text text-transparent">
                Cupido
              </span>
            </Link>
            <p className="mt-2 text-sm text-gray-600">
              O melhor lugar para encontrar seu par perfeito.
            </p>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">
              Empresa
            </h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link to="/sobre" className="text-sm text-gray-600 hover:text-primary-500">
                  Sobre nós
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-sm text-gray-600 hover:text-primary-500">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/carreiras" className="text-sm text-gray-600 hover:text-primary-500">
                  Carreiras
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">
              Suporte
            </h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link to="/ajuda" className="text-sm text-gray-600 hover:text-primary-500">
                  Central de Ajuda
                </Link>
              </li>
              <li>
                <Link to="/contato" className="text-sm text-gray-600 hover:text-primary-500">
                  Contato
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-sm text-gray-600 hover:text-primary-500">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">
              Legal
            </h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link to="/privacidade" className="text-sm text-gray-600 hover:text-primary-500">
                  Política de Privacidade
                </Link>
              </li>
              <li>
                <Link to="/termos" className="text-sm text-gray-600 hover:text-primary-500">
                  Termos de Uso
                </Link>
              </li>
              <li>
                <Link to="/cookies" className="text-sm text-gray-600 hover:text-primary-500">
                  Política de Cookies
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-200">
          <p className="text-sm text-gray-400 text-center">
            &copy; {new Date().getFullYear()} Cupido. Todos os direitos reservados. feito por Priscila Ramonna
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;