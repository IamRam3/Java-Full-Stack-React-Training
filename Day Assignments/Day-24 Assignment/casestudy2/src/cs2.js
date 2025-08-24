import React, { useEffect, useState } from 'react';

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
const inputStyle = {
  background: '#0b1140',
  color: theme.text,
  border: `1px solid ${theme.cardBorder}`,
  borderRadius: 10,
  padding: '8px 10px',
  outline: 'none',
  width: 120
};
const pill = {
  display: 'inline-block',
  padding: '6px 10px',
  borderRadius: 999,
  border: `1px solid ${theme.gold}`,
  color: theme.gold,
  fontWeight: 700
};
const goldRule = {
  height: 2,
  background: `linear-gradient(90deg, transparent, ${theme.gold}, transparent)`,
  border: 0,
  margin: '8px 0 12px'
};

const toINR = (usd, rate = 83) =>
  new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(usd * rate);

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


export default function CS2({ initialId = '1' }) {
  const [id, setId] = useState(String(initialId));
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);

  const fetchProduct = async (pid) => {
    if (!pid) return;
    setLoading(true);
    setErr(null);
    try {
      const res = await fetch(`https://fakestoreapi.com/products/${pid}`);
      if (!res.ok) throw new Error('Failed to fetch product details');
      const data = await res.json();
      setProduct(data);
    } catch (e) {
      setErr(e.message || 'Unknown error');
      setProduct(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct(id);
  }, [id]);

  return (
    <div style={pageStyle}>
      <div style={{ ...card, margin: '0 auto', maxWidth: 900 }}>
        <div style={header}>
          <h2 style={{ ...hTitle, fontSize: 22 }}>Products</h2>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <span style={{ color: theme.subtext, fontSize: 13 }}>Product ID</span>
            <input
              type="number"
              min="1"
              value={id}
              onChange={(e) => setId(e.target.value)}
              style={inputStyle}
            />
          </div>
        </div>

        <hr style={goldRule} />

        {loading && <Loader text="Loading product..." />}
        {err && !loading && <ErrorBox message={err} onRetry={() => fetchProduct(id)} />}

        {!loading && !err && product && (
          <div style={{ display: 'grid', gridTemplateColumns: '260px 1fr', gap: 16 }}>
            <div style={{ background: '#0b1140', borderRadius: 12, display: 'grid', placeItems: 'center', padding: 10 }}>
              <img
                src={product.image}
                alt={product.title}
                style={{ maxHeight: 220, objectFit: 'contain' }}
              />
            </div>
            <div>
              <h3 style={{ margin: '4px 0 8px' }}>{product.title}</h3>
              <div style={{ marginBottom: 10, ...pill }}>{toINR(product.price)}</div>
              <div style={{ color: theme.subtext, marginBottom: 12 }}>{product.description}</div>
              {product.rating && (
                <div>
                  Rating: <span style={{ color: theme.gold }}>{product.rating.rate}</span> ({product.rating.count})
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
