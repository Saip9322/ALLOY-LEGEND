import React from 'react';
import { NavLink as RouterNavLink, useLocation, Outlet, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  ShoppingBag, 
  Settings, 
  LogOut 
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useAppContext } from '../../context/AppContext';

export const AdminLayout: React.FC = () => {
  const { user, signOut } = useAuth();
  const { appName } = useAppContext();
  const location = useLocation();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!user) {
      navigate('/admin/login');
    }
  }, [user, navigate]);

  if (!user) return null;

  return (
    <div className="min-h-screen bg-[#f5f5f7] flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-[#e5e5e7] flex flex-col hidden md:flex sticky top-0 h-screen">
        <div className="p-6">
          <h1 className="text-xl font-bold tracking-tight text-black">{appName} Admin</h1>
          <p className="text-[10px] uppercase tracking-wider text-gray-400 font-bold mt-1">Management Console</p>
        </div>

        <nav className="flex-1 px-4 space-y-1">
          <NavLink to="/admin" exact active={location.pathname === '/admin'} icon={<LayoutDashboard className="w-4 h-4" />} label="Overview" />
          <NavLink to="/admin/orders" active={location.pathname === '/admin/orders'} icon={<ShoppingBag className="w-4 h-4" />} label="Orders" />
          <NavLink to="/admin/preorders" active={location.pathname === '/admin/preorders'} icon={<ShoppingBag className="w-4 h-4" />} label="Pre-Orders" />
          <NavLink to="/admin/settings" active={location.pathname === '/admin/settings'} icon={<Settings className="w-4 h-4" />} label="Settings" />
        </nav>

        <div className="p-4 border-t border-[#e5e5e7]">
          <button 
            onClick={() => signOut()}
            className="flex items-center gap-3 w-full px-4 py-2 text-sm font-medium text-gray-500 hover:text-red-600 rounded-lg transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Header */}
        <header className="h-16 bg-white/80 backdrop-blur-md border-bottom border-[#e5e5e7] px-8 flex items-center justify-between sticky top-0 z-10 shrink-0">
          <h2 className="text-sm font-semibold text-gray-900">
            {location.pathname === '/admin' ? 'Dashboard Overview' : 
             location.pathname.includes('/preorders') ? 'Pre-Order Management' :
             location.pathname.includes('/orders') ? 'Order Management' : 'System Settings'}
          </h2>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-xs font-bold text-gray-900">{user?.email?.split('@')[0]}</p>
              <p className="text-[10px] text-gray-500 uppercase tracking-tighter">Administrator</p>
            </div>
          </div>
        </header>

        {/* Scrollable Content */}
        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

interface NavLinkProps {
  to: string;
  active: boolean;
  icon: React.ReactNode;
  label: string;
  exact?: boolean;
}

const NavLink: React.FC<NavLinkProps> = ({ to, active, icon, label }) => (
  <RouterNavLink 
    to={to} 
    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
      active 
        ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' 
        : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
    }`}
  >
    {icon}
    <span className="text-sm font-semibold">{label}</span>
  </RouterNavLink>
);
