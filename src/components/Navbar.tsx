import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ShoppingCart, Search, Menu, X, Car, User, LogOut } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useAppContext } from '../context/AppContext';

export const Navbar: React.FC = () => {
  const { totalItems } = useCart();
  const { user, signOut } = useAuth();
  const { appName } = useAppContext();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  // Hide Navbar for Admin Dashboard
  if (location.pathname.startsWith('/admin') && location.pathname !== '/admin/login') {
    return null;
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
      setIsMenuOpen(false);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <nav className="bg-midnight text-gray-100 sticky top-0 z-50 border-b border-slate-border backdrop-blur-md bg-opacity-90">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 py-1 group">
            <div className="relative h-10 w-10 flex items-center justify-center bg-white rounded-lg p-1 shadow-inner">
              <img 
                src="/logo.png?v=1.1" 
                alt={appName} 
                className="h-full w-full object-contain group-hover:scale-110 transition-transform"
                style={{ display: 'block' }}
                loading="eager"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                  // Show the fallback icon if image fails
                  const fallback = e.currentTarget.parentElement?.querySelector('.logo-fallback');
                  if (fallback) (fallback as HTMLElement).style.display = 'flex';
                  // Remove bg-white if fallback is shown
                  e.currentTarget.parentElement?.classList.remove('bg-white');
                }}
              />
              <div className="logo-fallback hidden h-10 w-10 min-w-[40px] items-center justify-center bg-racing-red rounded-lg text-white font-black group-hover:scale-110 transition-transform shadow-lg shadow-racing-red/20">
                AL
              </div>
            </div>
            <span className="text-white font-black text-[18px] tracking-[1px] uppercase whitespace-nowrap">
              {appName.split(' ')[0]} <span className="text-racing-red">{appName.split(' ')[1] || ''}</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <Link to="/products" className="text-[11px] font-bold uppercase tracking-[2px] text-gray-400 hover:text-racing-red transition-colors">Store</Link>
            <Link to="/track-order" className="text-[11px] font-bold uppercase tracking-[2px] text-gray-400 hover:text-racing-red transition-colors">Track Order</Link>
            
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                placeholder="Search models..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-slate-dark border border-slate-border text-gray-300 rounded-full px-5 py-1.5 text-[12px] focus:outline-none focus:border-racing-red w-[250px] transition-all placeholder:text-gray-600"
              />
              <button type="submit" className="absolute right-4 top-2 text-gray-500 hover:text-racing-red">
                <Search className="h-4 w-4" />
              </button>
            </form>

            <div className="flex items-center space-x-6">
              {user ? (
                <div className="flex items-center space-x-4">
                  <Link to="/orders" className="text-[11px] font-bold uppercase tracking-[2px] text-gray-400 hover:text-racing-red transition-colors">
                    My Orders
                  </Link>
                  <Link to="/profile" className="flex items-center gap-2 text-gray-400 border-l border-slate-border pl-4 group">
                    <User className="h-4 w-4 group-hover:text-racing-red" />
                    <span className="text-[11px] font-bold truncate max-w-[100px] group-hover:text-racing-red">
                      {user.user_metadata?.full_name || user.email?.split('@')[0]}
                    </span>
                  </Link>
                  <button 
                    onClick={handleSignOut}
                    className="text-[11px] font-bold uppercase tracking-[2px] text-gray-400 hover:text-racing-red transition-colors flex items-center gap-1"
                  >
                    <LogOut className="h-4 w-4" /> Log out
                  </button>
                </div>
              ) : (
                <Link to="/login" className="text-[11px] font-bold uppercase tracking-[2px] text-gray-400 hover:text-racing-red transition-colors">
                  Login
                </Link>
              )}

              <Link to="/cart" className="text-gray-400 hover:text-white transition-colors relative group">
                <ShoppingCart className="h-5 w-5 group-hover:scale-110 transition-transform" />
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-racing-red text-white text-[9px] font-bold rounded-full h-4 w-4 flex items-center justify-center shadow-lg shadow-racing-red/20">
                    {totalItems}
                  </span>
                )}
              </Link>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-4">
            <Link to="/cart" className="text-gray-400 hover:text-white transition-colors relative">
              <ShoppingCart className="h-5 w-5" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-racing-red text-white text-[9px] font-bold rounded-full h-4 w-4 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-400 hover:text-white"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-midnight border-b border-slate-border">
          <div className="px-4 pt-2 pb-6 space-y-2">
            <form onSubmit={handleSearch} className="relative mb-6">
              <input
                type="text"
                placeholder="Search models..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-slate-dark border border-slate-border text-gray-100 rounded-full py-2.5 pl-5 pr-12 focus:outline-none focus:border-racing-red w-full text-[13px]"
              />
              <button type="submit" className="absolute right-5 top-3 text-gray-500">
                <Search className="h-4 w-4" />
              </button>
            </form>
            <Link to="/products" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 text-[12px] font-bold uppercase tracking-[1px] text-gray-400 hover:text-racing-red">Store</Link>
            <Link to="/track-order" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 text-[12px] font-bold uppercase tracking-[1px] text-gray-400 hover:text-racing-red">Track Order</Link>
            
            {user ? (
              <>
                <Link to="/profile" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 text-[12px] font-bold uppercase tracking-[1px] text-gray-400 hover:text-racing-red">My Profile</Link>
                <Link to="/orders" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 text-[12px] font-bold uppercase tracking-[1px] text-gray-400 hover:text-racing-red">My Orders</Link>
                <div className="block px-3 py-2 text-[12px] font-bold text-gray-400 flex items-center gap-2 border-t border-slate-border mt-4 pt-4">
                  <User className="h-4 w-4" /> {user.email}
                </div>
                <button 
                  onClick={() => {
                    handleSignOut();
                    setIsMenuOpen(false);
                  }}
                  className="w-full text-left block px-3 py-2 text-[12px] font-bold uppercase tracking-[1px] text-gray-400 hover:text-racing-red flex items-center gap-2"
                >
                  <LogOut className="h-4 w-4" /> Log out
                </button>
              </>
            ) : (
              <Link 
                to="/login" 
                onClick={() => setIsMenuOpen(false)} 
                className="block px-3 py-2 text-[12px] font-bold uppercase tracking-[1px] text-gray-400 hover:text-racing-red border-t border-slate-border mt-4 pt-4"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};
