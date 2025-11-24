import React from 'react';
import BookmarkCard from './BookmarkCard';
import { Plus } from 'lucide-react';

export default function BookmarkGrid({ bookmarks, onOpen, onEdit, onDelete, onAdd }) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-6 overflow-y-auto h-full pb-24">
            {/* Add New Card */}
            <button
                onClick={onAdd}
                className="flex flex-col items-center justify-center h-48 rounded-xl border-2 border-dashed border-slate-700 text-slate-500 hover:border-blue-500 hover:text-blue-500 hover:bg-slate-800/50 transition-all group"
            >
                <div className="p-3 rounded-full bg-slate-800 group-hover:bg-blue-500/20 mb-3 transition-colors">
                    <Plus size={32} />
                </div>
                <span className="font-medium">Add Bookmark</span>
            </button>

            {bookmarks.map((bookmark) => (
                <BookmarkCard
                    key={bookmark.id}
                    bookmark={bookmark}
                    onOpen={onOpen}
                    onEdit={onEdit}
                    onDelete={onDelete}
                />
            ))}
        </div>
    );
}
