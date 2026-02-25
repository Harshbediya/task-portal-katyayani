import React from 'react';
import { LogOut, CheckCircle2, User } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
    const { user, logout } = useAuth();

    return (
        <nav className="glass-card mb-8 px-6 py-4 rounded-t-none border-t-0 flex items-center justify-between">
            <div className="flex items-center gap-2">
                <CheckCircle2 className="w-8 h-8 text-indigo-400" />
                <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
                    TaskPortal
                </span>
            </div>

            <div className="flex items-center gap-6">
                <div className="hidden sm:flex items-center gap-2 text-slate-300">
                    <User className="w-4 h-4" />
                    <span className="text-sm font-medium">{user?.name || 'User'}</span>
                </div>
                <button
                    onClick={logout}
                    className="flex items-center gap-2 text-slate-400 hover:text-red-400 transition-colors duration-300"
                >
                    <LogOut className="w-5 h-5" />
                    <span className="text-sm font-semibold">Logout</span>
                </button>
            </div>
        </nav>
    );
};

export default Navbar;
