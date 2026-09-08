import ResourceView from './ResourceView';

const columns = [
  { key: 'name', label: 'Workout' },
  { key: 'category', label: 'Category' },
  { key: 'durationMinutes', label: 'Duration' },
  { key: 'difficulty', label: 'Difficulty' },
];

export default function Workouts() {
  return <ResourceView resource="workouts" title="Workouts" description="Browse the training library and find the next good session." columns={columns} renderCell={(item, key) => key === 'durationMinutes' ? `${item[key] ?? 0} min` : item[key] || '—'} />;
}