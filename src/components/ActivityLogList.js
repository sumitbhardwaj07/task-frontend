// components/ActivityLogList.js

export default function ActivityLogList({ logs = [] }) {
  return (
    <div style={{ marginTop: 10 }}>
      <strong>Activity Logs:</strong>
      <ul>
        {logs.map(log => (
          <li key={log.id}>
            [{new Date(log.timestamp).toLocaleString()}] {log.action}
            {log.from && log.to && `: ${log.from} → ${log.to}`}
          </li>
        ))}
      </ul>
    </div>
  );
}

