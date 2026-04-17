import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, GraduationCap, CheckCircle2 } from 'lucide-react';
import { useAuth, type UserRole } from '../context/AuthContext';

const roles: UserRole[] = ['Branch Admin', 'Reviewer', 'Super Admin'];

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [selectedRole, setSelectedRole] = useState<UserRole>('Branch Admin');
  const [email, setEmail] = useState('admin@cairo.edu');
  const [password, setPassword] = useState('••••••••');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const ok = login(email, password, selectedRole);
    if (ok) navigate('/dashboard');
    else setError('Please enter your email address.');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden bg-primary-50">
      {/* Soft gradient blobs */}
      <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-pink-200/40 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-96 h-96 rounded-full bg-primary-200/40 blur-3xl pointer-events-none" />

      {/* Logo */}
      <div className="mb-8 flex flex-col items-center gap-3">
        <div className="w-14 h-14 bg-primary-600 rounded-2xl flex items-center justify-center shadow-lg">
          <GraduationCap className="w-8 h-8 text-white" strokeWidth={1.8} />
        </div>
        <span className="text-2xl font-bold text-primary-700 tracking-tight">EduTransfer</span>
      </div>

      {/* Card */}
      <div className="w-full max-w-sm bg-white rounded-2xl shadow-xl p-8">
        <div className="text-center mb-7">
          <h1 className="text-2xl font-bold text-slate-900">Welcome back</h1>
          <p className="text-slate-400 text-sm mt-1">Sign in to your account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Role selector */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-widest text-slate-500 mb-2">
              Select Role
            </label>
            <div className="space-y-2">
              {roles.map((role) => (
                <button
                  key={role}
                  type="button"
                  onClick={() => setSelectedRole(role)}
                  className={`w-full flex items-center justify-between px-4 py-2.5 rounded-lg text-sm font-medium border transition-all ${
                    selectedRole === role
                      ? 'bg-primary-50 border-primary-300 text-primary-700'
                      : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <span>{role}</span>
                  {selectedRole === role && (
                    <CheckCircle2 className="w-4 h-4 text-primary-600" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-widest text-slate-500 mb-2">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@cairo.edu"
              className="w-full px-4 py-2.5 rounded-lg border border-slate-200 bg-slate-50 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent transition"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-widest text-slate-500 mb-2">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2.5 pr-10 rounded-lg border border-slate-200 bg-slate-50 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent transition"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {error && <p className="text-red-500 text-xs">{error}</p>}

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-primary-600 hover:bg-primary-700 text-white font-semibold text-sm transition-all shadow-md hover:shadow-lg"
          >
            Sign in
          </button>
        </form>

        <div className="mt-5 text-center">
          <button className="text-sm text-primary-600 hover:text-primary-800 font-medium transition-colors">
            Forgot password?
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
