import React, { useState, useEffect } from 'react';
import ControlBar from './ControlBar';
import { ExternalLink } from 'lucide-react';

export default function Viewer({ url: initialUrl, checkUrl, blockedCount }) {
    const [currentUrl, setCurrentUrl] = useState(initialUrl);
    const [iframeSrc, setIframeSrc] = useState('');

    useEffect(() => {
        if (initialUrl) {
            handleNavigate(initialUrl);
        }
    }, [initialUrl]);

    const handleNavigate = (url) => {
        setCurrentUrl(url);
        const result = checkUrl(url);

        if (result.allowed) {
            setIframeSrc(result.url);
        } else {
            // If blocked, we don't set the iframe src, effectively showing nothing or previous page
            // The log will show it was blocked.
            // Optionally we could show a "Blocked" screen.
            setIframeSrc('');
        }
    };

    return (
        <div className="flex flex-col h-full bg-slate-900">
            <ControlBar
                currentUrl={currentUrl}
                onNavigate={handleNavigate}
                blockedCount={blockedCount}
            />

            <div className="flex-1 relative bg-white">
                {iframeSrc ? (
                    <iframe
                        src={iframeSrc}
                        className="w-full h-full border-0"
                        title="Web Viewer"
                        sandbox="allow-same-origin allow-scripts allow-forms allow-presentation allow-fullscreen"
                        allow="fullscreen"
                        allowFullScreen
                        referrerPolicy="no-referrer"
                    />
                ) : (
                    <div className="flex flex-col items-center justify-center h-full bg-slate-900 text-slate-400">
                        <p>No content loaded or content blocked.</p>
                        {currentUrl && (
                            <a
                                href={currentUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="mt-4 flex items-center space-x-2 text-blue-400 hover:text-blue-300"
                            >
                                <span>Open in new tab</span>
                                <ExternalLink size={16} />
                            </a>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
