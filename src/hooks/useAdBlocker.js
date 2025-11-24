import { useState, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';

// Simple blocklist for demonstration. In a real app, this would be larger.
const BLOCKED_DOMAINS = [
    'doubleclick.net',
    'google-analytics.com',
    'facebook.com/tr',
    'ads.google.com',
];

const TRACKING_PARAMS = [
    'utm_source',
    'utm_medium',
    'utm_campaign',
    'fbclid',
    'gclid',
];

export function useAdBlocker() {
    const [logs, setLogs] = useState([]);
    const [blockedCount, setBlockedCount] = useState(0);

    const addLog = useCallback((type, message) => {
        setLogs((prev) => [
            {
                id: uuidv4(),
                timestamp: new Date().toLocaleTimeString(),
                type,
                message,
            },
            ...prev.slice(0, 99), // Keep last 100 logs
        ]);
    }, []);

    const checkUrl = useCallback((url) => {
        try {
            const urlObj = new URL(url);

            // Check if domain is blocked
            if (BLOCKED_DOMAINS.some(domain => urlObj.hostname.includes(domain))) {
                addLog('BLOCKED', `Blocked navigation to ${urlObj.hostname}`);
                setBlockedCount(prev => prev + 1);
                return { allowed: false, reason: 'Blocked Domain' };
            }

            // Sanitize URL params
            let sanitized = false;
            TRACKING_PARAMS.forEach(param => {
                if (urlObj.searchParams.has(param)) {
                    urlObj.searchParams.delete(param);
                    sanitized = true;
                }
            });

            if (sanitized) {
                addLog('INFO', `Stripped tracking params from ${urlObj.hostname}`);
                return { allowed: true, url: urlObj.toString(), sanitized: true };
            }

            addLog('INFO', `Allowed navigation to ${urlObj.hostname}`);
            return { allowed: true, url: url, sanitized: false };

        } catch (e) {
            addLog('ERROR', `Invalid URL: ${url}`);
            return { allowed: false, reason: 'Invalid URL' };
        }
    }, [addLog]);

    return {
        checkUrl,
        logs,
        blockedCount,
    };
}
