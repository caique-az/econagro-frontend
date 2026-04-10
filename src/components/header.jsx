'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCart } from '../context/CartContext';
import { useSearch } from '../context/SearchContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faLeaf, faMagnifyingGlass, faBars, faTimes, faPhone, faEnvelope } from '@fortawesome/free-solid-svg-icons';

function Header() {
  const { cart } = useCart();
  const { updateSearch } = useSearch();
  const router = useRouter();
  const [localSearchTerm, setLocalSearchTerm] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  
  const itemCount = cart.reduce((total, item) => total + item.quantity, 0);

  // Detectar scroll para mudar estilo do header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (localSearchTerm.trim()) {
      updateSearch(localSearchTerm.trim());
      router.push('/');
    }
  };

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <div className="flex flex-col w-full z-50">
      {/* Top Bar - Informações e Contato */}
      <div className="bg-green-900 text-green-100 text-xs py-2 hidden md:block">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex space-x-6">
            <span className="flex items-center hover:text-white transition-colors cursor-default">
              <FontAwesomeIcon icon={faPhone} className="mr-2" /> (19) 99618-8008
            </span>
            <span className="flex items-center hover:text-white transition-colors cursor-default">
              <FontAwesomeIcon icon={faEnvelope} className="mr-2" /> contato@econagro.com
            </span>
          </div>
          <div className="font-medium tracking-wide">
            🌱 Frete Grátis para todo o Brasil em compras acima de R$ 200
          </div>
        </div>
      </div>

      {/* Main Header - Sticky */}
      <header className={`w-full transition-all duration-300 ${isScrolled ? 'sticky top-0 shadow-lg bg-primary/95 backdrop-blur-sm py-2' : 'bg-primary py-4 relative'}`}>
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <Link href="/" className="flex items-center text-2xl md:text-3xl font-bold text-white no-underline hover:text-green-100 transition-colors group">
              <div className="bg-white text-primary rounded-full w-10 h-10 flex items-center justify-center mr-3 shadow-md group-hover:rotate-12 transition-transform duration-300">
                <FontAwesomeIcon icon={faLeaf} />
              </div>
              <span>EconAgro</span>
            </Link>

            {/* Mobile Actions (Cart + Menu) */}
            <div className="flex items-center lg:hidden space-x-4">
              <Link href="/carrinho" className="text-white relative p-2">
                <FontAwesomeIcon icon={faCartShopping} size="lg" />
                {itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-accent text-green-900 text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center animate-pulse">
                    {itemCount}
                  </span>
                )}
              </Link>
              <button 
                className="text-white focus:outline-none p-2"
                onClick={toggleMenu}
                aria-label="Toggle menu"
              >
                <FontAwesomeIcon icon={isMenuOpen ? faTimes : faBars} size="lg" />
              </button>
            </div>

            {/* Desktop Search */}
            <div className="hidden lg:block flex-1 max-w-xl mx-8">
              <form onSubmit={handleSearchSubmit} className="relative group">
                <input
                  type="search"
                  placeholder="O que você procura hoje?"
                  className="w-full py-3 px-6 pr-12 rounded-full text-dark bg-white/90 focus:bg-white focus:outline-none focus:ring-2 focus:ring-accent border-none shadow-inner transition-all placeholder-gray-500"
                  value={localSearchTerm}
                  onChange={(e) => setLocalSearchTerm(e.target.value)}
                />
                <button 
                  type="submit"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center hover:bg-green-700 transition-colors shadow-sm"
                >
                  <FontAwesomeIcon icon={faMagnifyingGlass} />
                </button>
              </form>
            </div>

            {/* Desktop Actions */}
            <div className="hidden lg:flex items-center space-x-6">
              <div className="flex items-center space-x-2 text-white/90">
                <Link href="/login" className="hover:text-white font-medium transition-colors py-2 px-4 rounded-full hover:bg-white/10">
                  Entrar
                </Link>
                <span className="text-white/40">|</span>
                <Link href="/cadastro" className="bg-white text-primary hover:bg-accent hover:text-green-900 font-bold py-2 px-6 rounded-full transition-all shadow-md transform hover:-translate-y-0.5">
                  Criar Conta
                </Link>
              </div>

              <Link href="/carrinho" className="group flex items-center text-white hover:text-accent transition-colors relative no-underline bg-white/10 p-3 rounded-full hover:bg-white/20">
                <FontAwesomeIcon icon={faCartShopping} className="text-xl" />
                {itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-accent text-green-900 text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                    {itemCount}
                  </span>
                )}
              </Link>
            </div>
          </div>
        </div>

        {/* Mobile Search & Menu Overlay */}
        <div className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${isMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'}`}>
          <div className="px-4 pb-6 pt-2 bg-primary space-y-4 shadow-xl border-t border-white/10">
            <form onSubmit={handleSearchSubmit} className="relative">
              <input
                type="search"
                placeholder="Pesquisar produtos..."
                className="w-full py-3 px-5 pr-12 rounded-full text-dark bg-white focus:outline-none focus:ring-2 focus:ring-accent shadow-inner"
                value={localSearchTerm}
                onChange={(e) => setLocalSearchTerm(e.target.value)}
              />
              <button 
                type="submit"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-primary p-2"
              >
                <FontAwesomeIcon icon={faMagnifyingGlass} />
              </button>
            </form>
            
            <div className="grid grid-cols-2 gap-3 pt-2">
              <Link href="/login" className="text-center py-3 rounded-lg bg-green-800 text-white font-medium hover:bg-green-900" onClick={() => setIsMenuOpen(false)}>
                Entrar
              </Link>
              <Link href="/cadastro" className="text-center py-3 rounded-lg bg-white text-primary font-bold hover:bg-gray-100" onClick={() => setIsMenuOpen(false)}>
                Criar Conta
              </Link>
            </div>

            <nav className="flex flex-col space-y-1 pt-2">
              <h3 className="text-white/50 text-xs font-bold uppercase tracking-wider mb-2 px-2">Navegação</h3>
              <MobileNavLink href="/" onClick={() => setIsMenuOpen(false)}>Início</MobileNavLink>
              <MobileNavLink href="/categoria/Grãos" onClick={() => setIsMenuOpen(false)}>Grãos</MobileNavLink>
              <MobileNavLink href="/categoria/Frutas" onClick={() => setIsMenuOpen(false)}>Frutas</MobileNavLink>
              <MobileNavLink href="/categoria/Legumes" onClick={() => setIsMenuOpen(false)}>Legumes</MobileNavLink>
              <MobileNavLink href="/categoria/Verduras" onClick={() => setIsMenuOpen(false)}>Verduras</MobileNavLink>
              <MobileNavLink href="/talktous" onClick={() => setIsMenuOpen(false)}>Fale Conosco</MobileNavLink>
              <MobileNavLink href="/aboutus" onClick={() => setIsMenuOpen(false)}>Sobre Nós</MobileNavLink>
            </nav>
          </div>
        </div>
      </header>

      {/* Navbar Inferior (Desktop Only) */}
      <div className="hidden lg:block bg-secondary shadow-md z-40 relative">
        <div className="container mx-auto">
          <nav className="flex justify-center">
            <NavLink href="/">Início</NavLink>
            <NavLink href="/categoria/Grãos">Grãos</NavLink>
            <NavLink href="/categoria/Frutas">Frutas</NavLink>
            <NavLink href="/categoria/Legumes">Legumes</NavLink>
            <NavLink href="/categoria/Verduras">Verduras</NavLink>
            <NavLink href="/talktous">Fale Conosco</NavLink>
            <NavLink href="/aboutus">Sobre Nós</NavLink>
          </nav>
        </div>
      </div>
    </div>
  );
}

// Componentes auxiliares para links
const NavLink = ({ href, children }) => (
  <Link 
    href={href} 
    className="px-6 py-4 font-medium text-white/90 hover:text-white hover:bg-primary/20 transition-all border-b-2 border-transparent hover:border-accent flex items-center h-full"
  >
    {children}
  </Link>
);

const MobileNavLink = ({ href, onClick, children }) => (
  <Link 
    href={href} 
    className="px-4 py-3 text-white hover:bg-white/10 rounded-lg transition-colors font-medium flex items-center justify-between group"
    onClick={onClick}
  >
    {children}
    <span className="text-white/30 group-hover:text-white transition-colors">›</span>
  </Link>
);

export default Header;
