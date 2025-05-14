import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Heart, Menu, X, Search, PawPrint } from 'lucide-react';
import { useFavorites } from '../../contexts/FavoritesContext';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { favorites } = useFavorites();
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isMenuOpen]);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  return (
    <header 
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
      }`}
    >
      <div className="container-custom flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <PawPrint className="h-8 w-8 text-primary-600" />
          <span className="ml-2 text-xl font-bold text-gray-900">PawMates</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link 
            to="/" 
            className={`font-medium hover:text-primary-600 transition-colors ${
              location.pathname === '/' ? 'text-primary-600' : 'text-gray-700'
            }`}
          >
            Home
          </Link>
          <Link 
            to="/pets" 
            className={`font-medium hover:text-primary-600 transition-colors ${
              location.pathname.startsWith('/pets') ? 'text-primary-600' : 'text-gray-700'
            }`}
          >
            Find a Pet
          </Link>
          <Link 
            to="/about" 
            className={`font-medium hover:text-primary-600 transition-colors ${
              location.pathname === '/about' ? 'text-primary-600' : 'text-gray-700'
            }`}
          >
            About Us
          </Link>
          <Link 
            to="/contact" 
            className={`font-medium hover:text-primary-600 transition-colors ${
              location.pathname === '/contact' ? 'text-primary-600' : 'text-gray-700'
            }`}
          >
            Contact
          </Link>
        </nav>

        {/* Action Buttons */}
        <div className="hidden md:flex items-center space-x-4">
          <Link to="/search" className="p-2 rounded-full hover:bg-gray-100 transition-colors">
            <Search className="h-5 w-5 text-gray-700" />
          </Link>
          <Link to="/favorites" className="p-2 rounded-full hover:bg-gray-100 transition-colors relative">
            <Heart className="h-5 w-5 text-gray-700" />
            {favorites.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-primary-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {favorites.length}
              </span>
            )}
          </Link>
          <Link to="/login" className="btn-outline py-2 px-4">
            Sign In
          </Link>
          <Link to="/adopt" className="btn-primary py-2 px-4">
            Adopt Now
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden p-2" 
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? (
            <X className="h-6 w-6 text-gray-700" />
          ) : (
            <Menu className="h-6 w-6 text-gray-700" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden fixed inset-0 bg-white z-40 pt-16 animate-fade-in">
          <div className="container-custom py-6 flex flex-col h-full">
            <nav className="flex flex-col space-y-6 text-lg">
              <Link 
                to="/" 
                className={`font-medium ${
                  location.pathname === '/' ? 'text-primary-600' : 'text-gray-700'
                }`}
              >
                Home
              </Link>
              <Link 
                to="/pets" 
                className={`font-medium ${
                  location.pathname.startsWith('/pets') ? 'text-primary-600' : 'text-gray-700'
                }`}
              >
                Find a Pet
              </Link>
              <Link 
                to="/about" 
                className={`font-medium ${
                  location.pathname === '/about' ? 'text-primary-600' : 'text-gray-700'
                }`}
              >
                About Us
              </Link>
              <Link 
                to="/contact" 
                className={`font-medium ${
                  location.pathname === '/contact' ? 'text-primary-600' : 'text-gray-700'
                }`}
              >
                Contact
              </Link>
              <div className="pt-4 border-t border-gray-200">
                <Link to="/favorites" className="flex items-center space-x-2 text-gray-700">
                  <Heart className="h-5 w-5" />
                  <span>Favorites ({favorites.length})</span>
                </Link>
              </div>
            </nav>
            <div className="mt-auto space-y-4 pb-8">
              <Link to="/login" className="btn-outline w-full text-center">
                Sign In
              </Link>
              <Link to="/adopt" className="btn-primary w-full text-center">
                Adopt Now
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;