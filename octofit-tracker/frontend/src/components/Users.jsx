import ResourceView from './ResourceView';

// Codespaces endpoint: https://octofit-tracker-123456-8000.app.github.dev/api/users
const columns = [
  { key: 'displayName', label: 'Athlete' },
  { key: 'username', label: 'Username' },
  { key: 'email', label: 'Email' },
  { key: 'team', label: 'Team' },
];

export default function Users() {
  return <ResourceView resource="users" title="Athletes" description="Keep an eye on the people powering the OctoFit challenge." columns={columns} renderCell={(item, key) => key === 'team' ? item.team?.name || item.teamName || 'Unassigned' : item[key] || '—'} />;
}