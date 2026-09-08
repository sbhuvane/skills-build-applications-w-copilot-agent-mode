import ResourceView from './ResourceView';

const columns = [
  { key: 'rank', label: 'Rank' },
  { key: 'teamName', label: 'Team' },
  { key: 'points', label: 'Points' },
  { key: 'streak', label: 'Streak' },
];

export default function Leaderboard() {
  return <ResourceView resource="leaderboard" title="Leaderboard" description="A live view of the teams leading the challenge." columns={columns} renderCell={(item, key) => item[key] ?? item.team?.name ?? '—'} />;
}