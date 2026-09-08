import ResourceView from './ResourceView';

// Codespaces endpoint: https://octofit-tracker-123456-8000.app.github.dev/api/teams
const columns = [
  { key: 'name', label: 'Team' },
  { key: 'coach', label: 'Coach' },
  { key: 'memberCount', label: 'Members' },
  { key: 'points', label: 'Points' },
];

export default function Teams() {
  return <ResourceView resource="teams" title="Teams" description="Coordinate friendly competition across your active squads." columns={columns} renderCell={(item, key) => item[key] ?? item.members?.length ?? '—'} />;
}