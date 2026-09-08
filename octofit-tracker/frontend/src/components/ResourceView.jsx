import { useEffect, useState } from 'react';
import { fetchResource } from '../api';

export default function ResourceView({ resource, title, description, columns, renderCell }) {
  const [items, setItems] = useState([]);
  const [status, setStatus] = useState('loading');
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;
    fetchResource(resource)
      .then((nextItems) => {
        if (active) {
          setItems(nextItems);
          setStatus('ready');
        }
      })
      .catch((requestError) => {
        if (active) {
          setError(requestError.message);
          setStatus('error');
        }
      });

    return () => { active = false; };
  }, [resource]);

  return (
    <section className="resource-view">
      <div className="page-heading">
        <div>
          <p className="eyebrow">Activity feed</p>
          <h1>{title}</h1>
          <p className="page-description">{description}</p>
        </div>
        <span className="record-count">{status === 'ready' ? `${items.length} records` : 'Loading'}</span>
      </div>

      {status === 'loading' && <div className="state-panel">Loading {title.toLowerCase()}...</div>}
      {status === 'error' && <div className="state-panel error-panel">{error}</div>}
      {status === 'ready' && items.length === 0 && <div className="state-panel">No {title.toLowerCase()} yet.</div>}
      {status === 'ready' && items.length > 0 && (
        <div className="table-shell">
          <table>
            <thead><tr>{columns.map((column) => <th key={column.key}>{column.label}</th>)}</tr></thead>
            <tbody>
              {items.map((item, index) => (
                <tr key={item._id || item.id || index}>
                  {columns.map((column) => <td key={column.key}>{renderCell(item, column.key)}</td>)}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}