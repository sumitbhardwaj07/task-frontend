import React from 'react';

export default function ActivityLog({ log = [] }) {
  return (
    <div className="activity-log p-4 bg-white rounded-md shadow-sm">
      <h4 className="text-lg font-semibold mb-3">Activity Log</h4>
      {log.length === 0 ? (
        <p className="text-gray-500 italic">No activity yet.</p>
      ) : (
        <ul className="space-y-2 max-h-64 overflow-y-auto">
          {log.map((entry, i) => (
            <li key={i} className="text-sm">
              <strong className="text-blue-600">{entry.user}</strong> {entry.action}{' '}
              <em className="text-gray-500 text-xs">{new Date(entry.timestamp).toLocaleString()}</em>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
