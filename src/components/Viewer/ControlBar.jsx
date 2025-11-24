import React, { useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight, RotateCw, Shield, ShieldAlert } from 'lucide-react';

export default function ControlBar({ currentUrl, onNavigate, blockedCount }) {
    const [inputUrl, setInputUrl] = useState('');

    useEffect(() => {
        setInputUrl(currentUrl || '');
    }, [currentUrl]);

    const handleSubmit = (e) => {
        e.preventDefault();
        let url = inputUrl;
        if (!url.startsWith('http://') && !url.startsWith('https://')) {
            url = `https://${url}`;
        }
        onNavigate(url);
    };

    return (
        <div className="bg-slate-800 border-b border-slate-700 p-2 flex items-center space-x-2">
            <div className="flex space-x-1">
                <button className="p-2 text-slate-400 hover:text-white hover:bg-slate-700 rounded-lg disabled:opacity-50">
                    <ArrowLeft size={18} />
                </button>
                <button className="p-2 text-slate-400 hover:text-white hover:bg-slate-700 rounded-lg disabled:opacity-50">
                    <ArrowRight size={18} />
                </button>
                <button className="p-2 text-slate-400 hover:text-white hover:bg-slate-700 rounded-lg">
                    <RotateCw size={18} />
                </button>
            </div>

            <form onSubmit={handleSubmit} className="flex-1">
                <input
                    type="text"
                    value={inputUrl}
                    onChange={(e) => setInputUrl(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    placeholder="Enter URL or search..."
                />
            </form>

            <div className="flex items-center space-x-2 px-2 text-slate-400">
                {blockedCount > 0 ? (
                    <div className="flex items-center space-x-1 text-green-400 bg-green-400/10 px-2 py-1 rounded-md">
                        <Shield size={16} />
                        <span className="text-xs font-bold">{blockedCount}</span>
                    </div>
                ) : (
                    <Shield size={18} />
                )}
            </div>
        </div>
    );
}
