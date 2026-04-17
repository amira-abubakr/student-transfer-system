import React from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import {
  GraduationCap,
  LayoutDashboard,
  PlusCircle,
  ArrowUpRight,
  ArrowDownLeft,
  Users,
  CheckSquare,
  ClipboardList,
  LogOut,
  Bell,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface NavItem {
  label: string;
  to: string;
  icon: React.ReactNode;
  badge?: number;
}

const navItems: NavItem[] = [
  { label: 'Dashboard',       to: '/dashboard',        icon: <LayoutDashboard className="w-4 h-4" /> },
  { label: 'Create Transfer', to: '/create-transfer',  icon: <PlusCircle className="w-4 h-4" /> },
  { label: 'Outgoing',        to: '/outgoing',         icon: <ArrowUpRight className="w-4 h-4" />, badge: 3 },
  { label: 'Incoming',        to: '/incoming',         icon: <ArrowDownLeft className="w-4 h-4" /> },
  { label: 'Review Requests', to: '/review',           icon: <ClipboardList className="w-4 h-4" /> },
  { label: 'All Students',    to: '/students',         icon: <Users className="w-4 h-4" /> },
  { label: 'Transferred',     to: '/transferred',      icon: <CheckSquare className="w-4 h-4" /> },
];

const Layout: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      {/* Sidebar */}
      <aside className="w-56 flex-shrink-0 bg-white border-r border-slate-100 flex flex-col">
        {/* Branch label */}
        <div className="px-5 pt-6 pb-4 border-b border-slate-100">
          <p className="text-sm font-bold text-primary-700">{user?.branch}</p>
          <p className="text-xs text-slate-400 mt-0.5">Administrative Portal</p>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-primary-50 text-primary-700 border-l-[3px] border-primary-600 pl-[9px]'
                    : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800'
                }`
              }
            >
              {item.icon}
              <span className="flex-1">{item.label}</span>
              {item.badge && (
                <span className="text-xs bg-primary-600 text-white rounded-full px-1.5 py-0.5 leading-none">
                  {item.badge}
                </span>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Sign Out */}
        <div className="px-3 pb-5 pt-2 border-t border-slate-100">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-3 py-2.5 w-full rounded-lg text-sm font-medium text-slate-400 hover:text-slate-700 hover:bg-slate-50 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="h-14 flex-shrink-0 bg-primary-600 flex items-center justify-between px-6">
          <div className="flex items-center gap-3">
            <GraduationCap className="w-6 h-6 text-white" strokeWidth={1.8} />
            <span className="text-white font-bold text-lg tracking-tight">EduTransfer</span>
            <span className="ml-2 text-xs bg-white/20 text-white px-3 py-1 rounded-full font-medium">
              {user?.branch}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <button className="relative text-white/80 hover:text-white transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-amber-400 rounded-full" />
            </button>
            <div className="w-8 h-8 rounded-full bg-amber-400 flex items-center justify-center text-xs font-bold text-amber-900">
              {user?.name?.charAt(0) ?? 'A'}
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
