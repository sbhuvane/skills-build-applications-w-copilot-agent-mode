import ResourceView from './ResourceView';

const columns = [
  { key: 'name', label: 'Team' },
  { key: 'coach', label: 'Coach' },
  { key: 'memberCount', label: 'Members' },
  { key: 'points', label: 'Points' },
];

export default function Teams() {
  return <ResourceView resource="teams" title="Teams" description="Coordinate friendly competition across your active squads." columns={columns} renderCell={(item, key) => item[key] ?? item.members?.length ?? '—'} />;
}