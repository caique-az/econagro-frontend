import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLeaf, faPhone, faEnvelope, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faInstagram, faWhatsapp } from '@fortawesome/free-brands-svg-icons';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-br from-green-900 to-green-800 text-white mt-auto w-full">
      {/* Newsletter Section */}
      <div className="border-b border-green-700">
        <div className="container mx-auto px-4 py-8 md:flex md:items-center md:justify-between">
          <div className="mb-4 md:mb-0">
            <h3 className="text-xl font-bold mb-1">Inscreva-se na nossa Newsletter</h3>
            <p className="text-green-200 text-sm">Receba ofertas exclusivas e dicas de cultivo diretamente no seu e-mail.</p>
          </div>
          <form className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
            <input 
              type="email" 
              placeholder="Seu melhor e-mail" 
              className="px-4 py-2 rounded-lg text-dark focus:outline-none focus:ring-2 focus:ring-accent w-full md:w-64"
            />
            <button 
              type="button" 
              className="bg-accent hover:bg-yellow-500 text-green-900 font-bold py-2 px-6 rounded-lg transition-colors duration-300"
            >
              Inscrever
            </button>
          </form>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Column */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center text-2xl font-bold text-white no-underline group">
              <FontAwesomeIcon icon={faLeaf} className="mr-2 text-accent group-hover:text-green-300 transition-colors" />
              EconAgro
            </Link>
            <p className="text-green-100 text-sm leading-relaxed">
              Conectando o campo à tecnologia. Oferecemos as melhores soluções para o produtor rural com qualidade e sustentabilidade.
            </p>
            <div className="flex space-x-4 pt-2">
              <a href="#" className="w-10 h-10 rounded-full bg-green-700 flex items-center justify-center hover:bg-accent hover:text-green-900 transition-all duration-300">
                <FontAwesomeIcon icon={faInstagram} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-green-700 flex items-center justify-center hover:bg-accent hover:text-green-900 transition-all duration-300">
                <FontAwesomeIcon icon={faFacebook} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-green-700 flex items-center justify-center hover:bg-accent hover:text-green-900 transition-all duration-300">
                <FontAwesomeIcon icon={faWhatsapp} />
              </a>
            </div>
          </div>

          {/* Links Rápidos */}
          <div>
            <h4 className="text-lg font-bold mb-6 border-b border-green-700 pb-2 inline-block">Links Rápidos</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/" className="text-green-100 hover:text-accent transition-colors flex items-center">
                  <span className="mr-2">›</span> Início
                </Link>
              </li>
              <li>
                <Link href="/aboutus" className="text-green-100 hover:text-accent transition-colors flex items-center">
                  <span className="mr-2">›</span> Sobre Nós
                </Link>
              </li>
              <li>
                <Link href="/produtos" className="text-green-100 hover:text-accent transition-colors flex items-center">
                  <span className="mr-2">›</span> Produtos
                </Link>
              </li>
              <li>
                <Link href="/talktous" className="text-green-100 hover:text-accent transition-colors flex items-center">
                  <span className="mr-2">›</span> Fale Conosco
                </Link>
              </li>
            </ul>
          </div>

          {/* Categorias */}
          <div>
            <h4 className="text-lg font-bold mb-6 border-b border-green-700 pb-2 inline-block">Categorias</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/categoria/Grãos" className="text-green-100 hover:text-accent transition-colors flex items-center">
                  <span className="mr-2">›</span> Grãos
                </Link>
              </li>
              <li>
                <Link href="/categoria/Frutas" className="text-green-100 hover:text-accent transition-colors flex items-center">
                  <span className="mr-2">›</span> Frutas
                </Link>
              </li>
              <li>
                <Link href="/categoria/Legumes" className="text-green-100 hover:text-accent transition-colors flex items-center">
                  <span className="mr-2">›</span> Legumes
                </Link>
              </li>
              <li>
                <Link href="/categoria/Verduras" className="text-green-100 hover:text-accent transition-colors flex items-center">
                  <span className="mr-2">›</span> Verduras
                </Link>
              </li>
            </ul>
          </div>

          {/* Contato */}
          <div>
            <h4 className="text-lg font-bold mb-6 border-b border-green-700 pb-2 inline-block">Contato</h4>
            <ul className="space-y-4 text-sm text-green-100">
              <li className="flex items-start">
                <FontAwesomeIcon icon={faMapMarkerAlt} className="mt-1 mr-3 text-accent" />
                <span>Av. Agrícola, 1000<br />Zona Rural, SP</span>
              </li>
              <li className="flex items-center">
                <FontAwesomeIcon icon={faPhone} className="mr-3 text-accent" />
                <span>(19) 996188008</span>
              </li>
              <li className="flex items-center">
                <FontAwesomeIcon icon={faEnvelope} className="mr-3 text-accent" />
                <span>contato@econagro.com</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Copyright Bar */}
      <div className="bg-green-950 py-4">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center text-xs text-green-300">
          <p>&copy; {currentYear} EconAgro. Todos os direitos reservados.</p>
          <div className="flex space-x-4 mt-2 md:mt-0">
            <a href="#" className="hover:text-white transition-colors">Termos de Uso</a>
            <a href="#" className="hover:text-white transition-colors">Política de Privacidade</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
