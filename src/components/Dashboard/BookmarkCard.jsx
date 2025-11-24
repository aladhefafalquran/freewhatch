import React from 'react';
import { ExternalLink, Trash2, Edit2, Play } from 'lucide-react';

export default function BookmarkCard({ bookmark, onOpen, onEdit, onDelete }) {
    const getFavicon = (url) => {
        try {
            const domain = new URL(url).hostname;
            return `https://www.google.com/s2/favicons?domain=${domain}&sz=64`;
        } catch (e) {
            return '';
        }
    };

    return (
        <div className="group relative bg-slate-800 rounded-xl p-4 border border-slate-700 hover:border-blue-500 transition-all hover:shadow-lg hover:shadow-blue-500/10 flex flex-col">
            <div className="flex items-start justify-between mb-4">
                <div className="bg-slate-700 p-2 rounded-lg">
                    <img
                        src={getFavicon(bookmark.url)}
                        alt={bookmark.name}
                        className="w-8 h-8 object-contain"
                        onError={(e) => {
                            e.target.src = 'https://via.placeholder.com/32?text=?';
                        }}
                    />
                </div>
                <div className="flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            onEdit(bookmark);
                        }}
                        className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-700 rounded-md"
                    >
                        <Edit2 size={16} />
                    </button>
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            onDelete(bookmark.id);
                        }}
                        className="p-1.5 text-slate-400 hover:text-red-400 hover:bg-slate-700 rounded-md"
                    >
                        <Trash2 size={16} />
                    </button>
                </div>
            </div>

            <h3 className="font-semibold text-lg text-white mb-1 truncate">
                {bookmark.name}
            </h3>
            <p className="text-sm text-slate-400 truncate mb-4">{bookmark.url}</p>

            <div className="mt-auto flex items-center justify-between">
                <span className="text-xs font-medium px-2 py-1 bg-slate-700 rounded-full text-slate-300">
                    {bookmark.category}
                </span>
                <button
                    onClick={() => onOpen(bookmark.url)}
                    className="flex items-center space-x-1 text-sm font-medium text-blue-400 hover:text-blue-300"
                >
                    <span>Open</span>
                    <Play size={14} />
                </button>
            </div>
        </div>
    );
}
