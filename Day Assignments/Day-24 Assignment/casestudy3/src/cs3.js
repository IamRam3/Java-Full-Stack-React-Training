import React, { useEffect, useState } from 'react';

/* Royal aesthetic theme */
const theme = {
  bg: 'linear-gradient(180deg, #0b1240 0%, #0a0f2a 100%)',
  card: '#0f163f',
  cardBorder: '#1e2a6b',
  text: '#e8ebff',
  subtext: '#b9c0ff',
  gold: '#d4af37',
  goldDark: '#b5922f',
  danger: '#ff6b6b'
};

const pageStyle = {
  minHeight: '100vh',
  padding: 24,
  fontFamily: 'system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif',
  background: theme.bg,
  color: theme.text
};
const card = {
  background: theme.card,
  border: `1px solid ${theme.cardBorder}`,
  borderRadius: 14,
  padding: 16,
  boxShadow: '0 12px 30px rgba(0,0,0,0.25)'
};
const header = { display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 };
const hTitle = { margin: 0, fontSize: 20, letterSpacing: 0.2 };
const goldRule = {
  height: 2,
  background: `linear-gradient(90deg, transparent, ${theme.gold}, transparent)`,
  border: 0,
  margin: '8px 0 12px'
};
const listReset = { listStyle: 'none', padding: 0, margin: 0 };
const linkish = { color: '#5b7cfa', cursor: 'pointer', textDecoration: 'underline' };
const small = { color: theme.subtext, fontSize: 13 };
const pill = {
  display: 'inline-block',
  padding: '6px 10px',
  borderRadius: 999,
  border: `1px solid ${theme.gold}`,
  color: theme.gold,
  fontWeight: 700
};

function Loader({ text = 'Loading...' }) {
  return (
    <div style={{ ...card, display: 'flex', alignItems: 'center', justifyContent: 'center', height: 120 }}>
      <span style={pill}>{text}</span>
    </div>
  );
}

function ErrorBox({ message, onRetry }) {
  return (
    <div style={{ ...card, borderColor: theme.danger }}>
      <div style={header}>
        <h3 style={{ ...hTitle, color: theme.danger }}>Error</h3>
        {onRetry && <button style={pill} onClick={onRetry}>Retry</button>}
      </div>
      <hr style={goldRule} />
      <div>{message}</div>
    </div>
  );
}

export default function CS3() {
  const [users, setUsers] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [details, setDetails] = useState(null);

  const [loadingList, setLoadingList] = useState(true);
  const [loadingDetails, setLoadingDetails] = useState(false);

  const [errList, setErrList] = useState(null);
  const [errDetails, setErrDetails] = useState(null);

  // Fetch users on mount
  const fetchUsers = async () => {
    setLoadingList(true);
    setErrList(null);
    try {
      const res = await fetch('https://jsonplaceholder.typicode.com/users');
      if (!res.ok) throw new Error('Failed to fetch users');
      const data = await res.json();
      setUsers(data);
    } catch (e) {
      setErrList(e.message || 'Unknown error');
    } finally {
      setLoadingList(false);
    }
  };

  // Fetch a single user's details when selectedId changes
  const fetchUser = async (id) => {
    if (!id) return;
    setLoadingDetails(true);
    setErrDetails(null);
    try {
      const res = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
      if (!res.ok) throw new Error('Could not load user details');
      const data = await res.json();
      setDetails(data);
    } catch (e) {
      setErrDetails(e.message || 'Unknown error');
      setDetails(null);
    } finally {
      setLoadingDetails(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    fetchUser(selectedId);
  }, [selectedId]);

  return (
    <div style={pageStyle}>
      <div style={{ ...card, margin: '0 auto', maxWidth: 1100 }}>
        <div style={header}>
          <h2 style={{ ...hTitle, fontSize: 22 }}>User Management</h2>
          <button style={pill} onClick={fetchUsers}>Refresh</button>
        </div>

        <hr style={goldRule} />

        {loadingList && <Loader text="Loading users..." />}
        {errList && <ErrorBox message={errList} onRetry={fetchUsers} />}

        {!loadingList && !errList && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            {/* Users list */}
            <div style={{ ...card }}>
              <h3 style={{ marginTop: 0 }}>Users</h3>
              <ul style={listReset}>
                {users.map((u) => (
                  <li key={u.id} style={{ marginBottom: 10 }}>
                    <span style={linkish} onClick={() => setSelectedId(u.id)}>{u.name}</span>
                    <div style={small}>{u.email} • {u.phone}</div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Details panel */}
            <div style={{ ...card }}>
              <h3 style={{ marginTop: 0 }}>Profile Details</h3>
              {!selectedId && <div style={small}>Select a user to view details</div>}

              {selectedId && loadingDetails && <Loader text="Loading details..." />}
              {selectedId && errDetails && <ErrorBox message={errDetails} onRetry={() => fetchUser(selectedId)} />}

              {selectedId && !loadingDetails && !errDetails && details && (
                <div>
                  <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 6 }}>{details.name}</div>
                  <div style={small}>@{details.username}</div>
                  <div style={{ marginTop: 8 }}>{details.email}</div>
                  <div>{details.phone}</div>
                  <div style={{ marginTop: 8 }}>
                    <div style={{ fontWeight: 600 }}>Address</div>
                    <div style={small}>
                      {details.address?.suite}, {details.address?.street}, {details.address?.city} {details.address?.zipcode}
                    </div>
                  </div>
                  <div style={{ marginTop: 8 }}>
                    <div style={{ fontWeight: 600 }}>Company</div>
                    <div style={small}>{details.company?.name}</div>
                    <div style={small}>{details.company?.catchPhrase}</div>
                  </div>
                  <div style={{ marginTop: 8 }}>
                    <a href={`https://${details.website}`} target="_blank" rel="noreferrer" style={{ color: '#5b7cfa' }}>
                      {details.website}
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
