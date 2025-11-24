import React, { useState } from 'react';
import { LayoutDashboard, Globe, Settings, Shield, FileText, Menu, X } from 'lucide-react';

const SidebarItem = ({ icon: Icon, label, active, onClick }) => (
    <button
        onClick={onClick}
        className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${active
            ? 'bg-blue-600 text-white'
            : 'text-slate-400 hover:bg-slate-800 hover:text-white'
            }`}
    >
        <Icon size={20} />
        <span className="font-medium">{label}</span>
    </button>
);

export default function Layout({ children, currentView, onViewChange }) {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const handleNavClick = (view) => {
        onViewChange(view);
        setMobileMenuOpen(false);
    };

    return (
        <div className="flex h-screen bg-slate-900 text-white overflow-hidden">
            {/* Mobile Menu Button */}
            <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden fixed top-4 left-4 z-50 p-2 bg-slate-800 rounded-lg text-white"
            >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Sidebar */}
            <aside className={`w-64 bg-slate-950 border-r border-slate-800 flex flex-col fixed md:relative h-full z-40 transition-transform ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
                }`}>
                <div className="p-6 flex items-center space-x-3">
                    <Shield className="text-blue-500" size={28} />
                    <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                        Ad-Shield
                    </h1>
                </div>

                <nav className="flex-1 px-4 space-y-2">
                    <SidebarItem
                        icon={LayoutDashboard}
                        label="Dashboard"
                        active={currentView === 'dashboard'}
                        onClick={() => handleNavClick('dashboard')}
                    />
                    <SidebarItem
                        icon={Globe}
                        label="Web Viewer"
                        active={currentView === 'viewer'}
                        onClick={() => handleNavClick('viewer')}
                    />
                    <SidebarItem
                        icon={FileText}
                        label="Activity Log"
                        active={currentView === 'logs'}
                        onClick={() => handleNavClick('logs')}
                    />
                </nav>

                <div className="p-4 border-t border-slate-800">
                    <SidebarItem
                        icon={Settings}
                        label="Settings"
                        active={currentView === 'settings'}
                        onClick={() => handleNavClick('settings')}
                    />
                </div>
            </aside>

            {/* Overlay for mobile */}
            {mobileMenuOpen && (
                <div
                    className="md:hidden fixed inset-0 bg-black/50 z-30"
                    onClick={() => setMobileMenuOpen(false)}
                />
            )}

            {/* Main Content */}
            <main className="flex-1 overflow-hidden relative">
                {children}
            </main>
        </div>
    );
}
