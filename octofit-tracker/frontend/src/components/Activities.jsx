import ResourceView from './ResourceView';

// Codespaces endpoint: https://octofit-tracker-123456-8000.app.github.dev/api/activities
const columns = [
  { key: 'type', label: 'Activity' },
  { key: 'durationMinutes', label: 'Duration' },
  { key: 'points', label: 'Points' },
  { key: 'completedAt', label: 'Completed' },
];

export default function Activities() {
  return <ResourceView resource="activities" title="Activities" description="See every workout logged by your teams." columns={columns} renderCell={(item, key) => key === 'durationMinutes' ? `${item[key] ?? 0} min` : key === 'completedAt' ? new Date(item[key]).toLocaleDateString() : item[key] || '—'} />;
}