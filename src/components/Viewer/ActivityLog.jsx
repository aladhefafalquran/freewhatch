import React, { useEffect, useRef } from 'react';
import { AlertTriangle, CheckCircle, Ban } from 'lucide-react';

export default function ActivityLog({ logs }) {
    const endRef = useRef(null);

    useEffect(() => {
        endRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [logs]);

    const getIcon = (type) => {
        switch (type) {
            case 'BLOCKED': return <Ban size={14} className="text-red-400" />;
            case 'INFO': return <CheckCircle size={14} className="text-green-400" />;
            case 'ERROR': return <AlertTriangle size={14} className="text-yellow-400" />;
            default: return <CheckCircle size={14} className="text-slate-400" />;
        }
    };

    return (
        <div className="h-48 bg-slate-950 border-t border-slate-800 flex flex-col">
            <div className="px-4 py-2 border-b border-slate-800 bg-slate-900 flex justify-between items-center">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Activity Log</h3>
                <span className="text-xs text-slate-500">{logs.length} events</span>
            </div>
            <div className="flex-1 overflow-y-auto p-2 space-y-1 font-mono text-xs">
                {logs.length === 0 && (
                    <div className="text-slate-600 text-center py-4 italic">No activity yet</div>
                )}
                {logs.map((log) => (
                    <div key={log.id} className="flex items-start space-x-2 p-1 hover:bg-slate-900 rounded">
                        <span className="text-slate-500 shrink-0">[{log.timestamp}]</span>
                        <span className="mt-0.5 shrink-0">{getIcon(log.type)}</span>
                        <span className={`break-all ${log.type === 'BLOCKED' ? 'text-red-300' :
                                log.type === 'ERROR' ? 'text-yellow-300' : 'text-slate-300'
                            }`}>
                            {log.message}
                        </span>
                    </div>
                ))}
                <div ref={endRef} />
            </div>
        </div>
    );
}
