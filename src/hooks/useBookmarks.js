import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import defaultBookmarks from '../data/bookmarks.json';

const STORAGE_KEY = 'ad-shield-bookmarks';

export function useBookmarks() {
    const [bookmarks, setBookmarks] = useState([]);

    // Load bookmarks on mount
    useEffect(() => {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
            try {
                setBookmarks(JSON.parse(saved));
            } catch (e) {
                console.error('Failed to parse bookmarks', e);
                setBookmarks(defaultBookmarks.bookmarks);
            }
        } else {
            setBookmarks(defaultBookmarks.bookmarks);
        }
    }, []);

    // Save bookmarks whenever they change
    useEffect(() => {
        if (bookmarks.length > 0) {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(bookmarks));
        }
    }, [bookmarks]);

    const addBookmark = (bookmark) => {
        const newBookmark = {
            id: uuidv4(),
            dateAdded: new Date().toISOString(),
            visits: 0,
            ...bookmark,
        };
        setBookmarks((prev) => [newBookmark, ...prev]);
    };

    const removeBookmark = (id) => {
        setBookmarks((prev) => prev.filter((b) => b.id !== id));
    };

    const updateBookmark = (id, updates) => {
        setBookmarks((prev) =>
            prev.map((b) => (b.id === id ? { ...b, ...updates } : b))
        );
    };

    return {
        bookmarks,
        addBookmark,
        removeBookmark,
        updateBookmark,
    };
}
