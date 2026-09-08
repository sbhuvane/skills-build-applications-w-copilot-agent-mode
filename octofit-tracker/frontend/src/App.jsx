import { NavLink, Navigate, Route, Routes } from 'react-router-dom';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';
import { API_BASE_URL } from './api';
import './App.css';

const navigation = [
  ['/', 'Overview'], ['/activities', 'Activities'], ['/leaderboard', 'Leaderboard'],
  ['/teams', 'Teams'], ['/users', 'Athletes'], ['/workouts', 'Workouts'],
];

function Overview() {
  return (
    <section className="overview">
      <p className="eyebrow">OctoFit tracker</p>
      <h1>Small steps.<br /><em>Strong teams.</em></h1>
      <p className="intro">One clear view of the movement, momentum, and people behind your next personal best.</p>
      <div className="overview-grid">
        <NavLink to="/activities" className="overview-card accent-card"><span>01</span><strong>Activity log</strong><small>Track the work that counts.</small></NavLink>
        <NavLink to="/leaderboard" className="overview-card"><span>02</span><strong>Team standings</strong><small>See who is moving up.</small></NavLink>
        <NavLink to="/workouts" className="overview-card"><span>03</span><strong>Training library</strong><small>Choose your next challenge.</small></NavLink>
      </div>
    </section>
  );
}

export default function App() {
  return (
    <div className="app-shell">
      <aside className="sidebar">
        <NavLink to="/" className="brand"><img className="brand-mark" src="/octofitapp-small.png" alt="" /><span>OctoFit<small>tracker</small></span></NavLink>
        <nav aria-label="Primary navigation">
          {navigation.map(([path, label]) => <NavLink key={path} to={path} end={path === '/'}>{label}</NavLink>)}
        </nav>
        <div className="api-status"><span className="status-dot" />API connected<small>{API_BASE_URL.replace('https://', '').replace('http://', '')}</small></div>
      </aside>
      <main className="content"><Routes>
        <Route path="/" element={<Overview />} />
        <Route path="/activities" element={<Activities />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/teams" element={<Teams />} />
        <Route path="/users" element={<Users />} />
        <Route path="/workouts" element={<Workouts />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes></main>
    </div>
  );
}