import React, { useState } from 'react';
import Layout from './components/Layout';
import BookmarkGrid from './components/Dashboard/BookmarkGrid';
import AddBookmarkModal from './components/UI/AddBookmarkModal';
import Viewer from './components/Viewer/Viewer';
import ActivityLog from './components/Viewer/ActivityLog';
import { useBookmarks } from './hooks/useBookmarks';
import { useAdBlocker } from './hooks/useAdBlocker';

function App() {
  const [currentView, setCurrentView] = useState('dashboard');
  const [activeUrl, setActiveUrl] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBookmark, setEditingBookmark] = useState(null);

  const { bookmarks, addBookmark, removeBookmark, updateBookmark } = useBookmarks();
  const { checkUrl, logs, blockedCount } = useAdBlocker();

  const handleOpenUrl = (url) => {
    setActiveUrl(url);
    setCurrentView('viewer');
  };

  const handleSaveBookmark = (data) => {
    if (editingBookmark) {
      updateBookmark(editingBookmark.id, data);
    } else {
      addBookmark(data);
    }
    setEditingBookmark(null);
  };

  const handleEditBookmark = (bookmark) => {
    setEditingBookmark(bookmark);
    setIsModalOpen(true);
  };

  const handleAddClick = () => {
    setEditingBookmark(null);
    setIsModalOpen(true);
  };

  return (
    <Layout currentView={currentView} onViewChange={setCurrentView}>
      {currentView === 'dashboard' && (
        <BookmarkGrid
          bookmarks={bookmarks}
          onOpen={handleOpenUrl}
          onEdit={handleEditBookmark}
          onDelete={removeBookmark}
          onAdd={handleAddClick}
        />
      )}

      {currentView === 'viewer' && (
        <Viewer
          url={activeUrl}
          checkUrl={checkUrl}
          blockedCount={blockedCount}
        />
      )}

      {currentView === 'logs' && (
        <div className="h-full flex flex-col bg-slate-900">
          <div className="p-6 border-b border-slate-800">
            <h2 className="text-2xl font-bold text-white">Activity Log</h2>
            <p className="text-slate-400">Real-time ad blocking events</p>
          </div>
          <div className="flex-1 overflow-hidden">
            <ActivityLog logs={logs} />
          </div>
        </div>
      )}

      {currentView === 'settings' && (
        <div className="p-8 text-slate-400">
          <h2 className="text-2xl font-bold text-white mb-4">Settings</h2>
          <p>Settings panel coming soon...</p>
        </div>
      )}

      <AddBookmarkModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveBookmark}
        initialData={editingBookmark}
      />
    </Layout>
  );
}

export default App;
