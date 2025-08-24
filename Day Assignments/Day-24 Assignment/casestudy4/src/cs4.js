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

export default function CS4() {
  const [posts, setPosts] = useState([]);
  const [postId, setPostId] = useState(null);
  const [comments, setComments] = useState([]);

  const [loadingPosts, setLoadingPosts] = useState(true);
  const [loadingComments, setLoadingComments] = useState(false);

  const [errPosts, setErrPosts] = useState(null);
  const [errComments, setErrComments] = useState(null);

  // Fetch posts on first render
  const fetchPosts = async () => {
    setLoadingPosts(true);
    setErrPosts(null);
    try {
      const res = await fetch('https://jsonplaceholder.typicode.com/posts');
      if (!res.ok) throw new Error('Failed to fetch posts');
      const data = await res.json();
      setPosts(data.slice(0, 20)); // limit for readability
    } catch (e) {
      setErrPosts(e.message || 'Unknown error');
    } finally {
      setLoadingPosts(false);
    }
  };

  // Fetch comments whenever postId changes
  const fetchComments = async (id) => {
    if (!id) return;
    setLoadingComments(true);
    setErrComments(null);
    try {
      const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}/comments`);
      if (!res.ok) throw new Error('Failed to fetch comments');
      const data = await res.json();
      setComments(data);
    } catch (e) {
      setErrComments(e.message || 'Unknown error');
      setComments([]);
    } finally {
      setLoadingComments(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  useEffect(() => {
    fetchComments(postId);
  }, [postId]);

  return (
    <div style={pageStyle}>
      <div style={{ ...card, margin: '0 auto', maxWidth: 1100 }}>
        <div style={header}>
          <h2 style={{ ...hTitle, fontSize: 22 }}>Posts with Comments</h2>
          <button style={pill} onClick={fetchPosts}>Refresh Posts</button>
        </div>

        <hr style={goldRule} />

        {loadingPosts && <Loader text="Loading posts..." />}
        {errPosts && <ErrorBox message={errPosts} onRetry={fetchPosts} />}

        {!loadingPosts && !errPosts && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            {/* Posts list */}
            <div style={{ ...card }}>
              <h3 style={{ marginTop: 0 }}>Posts</h3>
              <ul style={listReset}>
                {posts.map((p) => (
                  <li key={p.id} style={{ marginBottom: 10 }}>
                    <div style={linkish} onClick={() => setPostId(p.id)}>
                      {p.title}
                    </div>
                    <div style={{ ...small, marginTop: 4 }}>{p.body.slice(0, 90)}...</div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Comments panel */}
            <div style={{ ...card }}>
              <h3 style={{ marginTop: 0 }}>Comments</h3>
              {!postId && <div style={small}>Select a post to load comments</div>}
              {postId && loadingComments && <Loader text="Loading comments..." />}
              {postId && errComments && <ErrorBox message={errComments} onRetry={() => fetchComments(postId)} />}
              {postId && !loadingComments && !errComments && comments.length > 0 && (
                <ul style={listReset}>
                  {comments.map((c) => (
                    <li key={c.id} style={{ marginBottom: 12 }}>
                      <div style={{ fontWeight: 600 }}>{c.name}</div>
                      <div style={small}>{c.email}</div>
                      <div style={{ marginTop: 4 }}>{c.body}</div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
