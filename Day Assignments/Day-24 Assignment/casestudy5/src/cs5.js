import React, { useEffect, useMemo, useState } from 'react';

const ENDPOINT = 'https://jsonplaceholder.typicode.com/todos';

const FILTERS = {
  ALL: 'ALL',
  COMPLETED: 'COMPLETED',
  PENDING: 'PENDING',
};

export default function TodoTracker() {
  const [todos, setTodos] = useState([]);
  const [visible, setVisible] = useState([]);     
  const [filter, setFilter] = useState(FILTERS.ALL);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState('');

 
  const { completedCount, pendingCount } = useMemo(() => {
    let c = 0;
    for (const t of todos) if (t.completed) c++;
    return { completedCount: c, pendingCount: Math.max(0, todos.length - c) };
  }, [todos]);
 
  useEffect(() => {
    let alive = true;
    const fetchTodos = async () => {
      try {
        setLoading(true);
        setErr('');
        const res = await fetch(ENDPOINT);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        const first20 = data.slice(0, 20);
        if (!alive) return;
        setTodos(first20);
      } catch (e) {
        if (!alive) return;
        setErr('Failed to load todos. Please try again.');
      } finally {
        if (alive) setLoading(false);
      }
    };
    fetchTodos();
    return () => { alive = false; };
  }, []);

 
  useEffect(() => {
    let next = todos;
    if (filter === FILTERS.COMPLETED) {
      next = todos.filter(t => t.completed);
    } else if (filter === FILTERS.PENDING) {
      next = todos.filter(t => !t.completed);
    }
    setVisible(next);
  }, [todos, filter]);

  const retry = () => {
     
    setLoading(true);
    setErr('');
    fetch(ENDPOINT)
      .then(r => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.json();
      })
      .then(data => setTodos(data.slice(0, 20)))
      .catch(() => setErr('Failed to load todos. Please try again.'))
      .finally(() => setLoading(false));
  };

  return (
    <div style={styles.wrap}>
      <h2 style={styles.title}>Todo Tracker</h2>

      <div style={styles.toolbar}>
        <div style={styles.filters}>
          <button
            style={{ ...styles.btn, ...(filter === FILTERS.ALL ? styles.btnActive : {}) }}
            onClick={() => setFilter(FILTERS.ALL)}
          >
            All
          </button>
          <button
            style={{ ...styles.btn, ...(filter === FILTERS.COMPLETED ? styles.btnActive : {}) }}
            onClick={() => setFilter(FILTERS.COMPLETED)}
          >
            Show Completed Only
          </button>
          <button
            style={{ ...styles.btn, ...(filter === FILTERS.PENDING ? styles.btnActive : {}) }}
            onClick={() => setFilter(FILTERS.PENDING)}
          >
            Show Pending Only
          </button>
        </div>

        <div style={styles.counts}>
          <span style={styles.badgeGreen}>Completed: {completedCount}</span>
          <span style={styles.badgeBlue}>Pending: {pendingCount}</span>
          <span style={styles.badgeGray}>Total: {todos.length}</span>
        </div>
      </div>

      {loading && <p style={styles.muted}>Loading todos…</p>}
      {!loading && err && (
        <div style={styles.errorBox}>
          <p>{err}</p>
          <button style={{ ...styles.btn, ...styles.btnActive }} onClick={retry}>Retry</button>
        </div>
      )}

      {!loading && !err && (
        <ul style={styles.list}>
          {visible.map(t => (
            <li key={t.id} style={styles.item}>
              <input type="checkbox" checked={t.completed} readOnly />
              <span style={{ ...styles.itemText, ...(t.completed ? styles.completed : {}) }}>
                {t.title}
              </span>
              {t.completed ? (
                <span style={styles.tagDone}>Done</span>
              ) : (
                <span style={styles.tagOpen}>Open</span>
              )}
            </li>
          ))}
          {visible.length === 0 && (
            <li style={{ ...styles.item, justifyContent: 'center' }}>
              <span style={styles.muted}>No todos match this filter.</span>
            </li>
          )}
        </ul>
      )}
    </div>
  );
}

const styles = {
  wrap: {
    maxWidth: 760,
    margin: '24px auto',
    padding: 16,
    fontFamily: 'system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif',
  },
  title: { margin: '0 0 12px' },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    justifyContent: 'space-between',
    marginBottom: 12,
    flexWrap: 'wrap',
  },
  filters: { display: 'flex', gap: 8, flexWrap: 'wrap' },
  btn: {
    padding: '8px 12px',
    borderRadius: 8,
    border: '1px solid #e5e7eb',
    background: '#fff',
    cursor: 'pointer',
  },
  btnActive: {
    background: '#2563eb',
    color: '#fff',
    borderColor: '#2563eb',
  },
  counts: { display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' },
  badgeGreen: {
    padding: '4px 8px',
    background: 'rgba(16,185,129,.12)',
    color: '#059669',
    border: '1px solid rgba(16,185,129,.3)',
    borderRadius: 999,
    fontSize: 13,
  },
  badgeBlue: {
    padding: '4px 8px',
    background: 'rgba(59,130,246,.12)',
    color: '#2563eb',
    border: '1px solid rgba(59,130,246,.3)',
    borderRadius: 999,
    fontSize: 13,
  },
  badgeGray: {
    padding: '4px 8px',
    background: 'rgba(107,114,128,.12)',
    color: '#374151',
    border: '1px solid rgba(107,114,128,.25)',
    borderRadius: 999,
    fontSize: 13,
  },
  list: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
    border: '1px solid #e5e7eb',
    borderRadius: 12,
    overflow: 'hidden',
  },
  item: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    padding: '10px 12px',
    borderBottom: '1px solid #e5e7eb',
  },
  itemText: { flex: 1 },
  completed: { color: '#6b7280', textDecoration: 'line-through' },
  tagDone: {
    padding: '2px 8px',
    borderRadius: 999,
    background: 'rgba(16,185,129,.12)',
    color: '#059669',
    border: '1px solid rgba(16,185,129,.3)',
    fontSize: 12,
  },
  tagOpen: {
    padding: '2px 8px',
    borderRadius: 999,
    background: 'rgba(234,179,8,.12)',
    color: '#a16207',
    border: '1px solid rgba(234,179,8,.3)',
    fontSize: 12,
  },
  muted: { color: '#6b7280' },
  errorBox: {
    border: '1px solid #fecaca',
    background: '#fef2f2',
    color: '#991b1b',
    padding: 12,
    borderRadius: 12,
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    justifyContent: 'space-between',
  },
};
