import React, { useEffect, useState } from 'react';

const theme = {
  bg: 'linear-gradient(180deg, #0b1240 0%, #0a0f2a 100%)',
  card: '#0f163f',
  cardBorder: '#1e2a6b',
  text: '#e8ebff',
  subtext: '#b9c0ff',
  gold: '#d4af37',
  goldDark: '#b5922f'
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

const header = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginBottom: 12
};

const hTitle = { margin: 0, fontSize: 20, letterSpacing: 0.2 };

const selectStyle = {
  background: '#0b1140',
  color: theme.text,
  border: `1px solid ${theme.cardBorder}`,
  borderRadius: 10,
  padding: '8px 10px',
  outline: 'none'
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

function Loader({ text = 'Loading...' }) {
  return (
    <div style={{ ...card, display: 'flex', alignItems: 'center', justifyContent: 'center', height: 120 }}>
      <span style={pill}>{text}</span>
    </div>
  );
}

function ErrorBox({ message, onRetry }) {
  return (
    <div style={{ ...card, borderColor: '#ff6b6b' }}>
      <div style={header}>
        <h3 style={{ ...hTitle, color: '#ff6b6b' }}>Error</h3>
        {onRetry && <button style={pill} onClick={onRetry}>Retry</button>}
      </div>
      <hr style={goldRule} />
      <div>{message}</div>
    </div>
  );
}

export default function CaseStudy1() {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState('all');
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);

  const categories = [
    { value: 'all', label: 'All' },
    { value: "men's clothing", label: "Men's clothing" },
    { value: "women's clothing", label: "Women’s clothing" },
    { value: 'jewelery', label: 'Jewelery' },
    { value: 'electronics', label: 'Electronics' }
  ];

  const fetchProducts = async (cat) => {
    setLoading(true);
    setErr(null);
    try {
      const url =
        cat === 'all'
          ? 'https://fakestoreapi.com/products'
          : `https://fakestoreapi.com/products/category/${encodeURIComponent(cat)}`;
      const res = await fetch(url);
      if (!res.ok) throw new Error('Failed to fetch products');
      const data = await res.json();
      setProducts(data);
    } catch (e) {
      setErr(e.message || 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts(category);

  }, [category]);

  return (
    <div style={pageStyle}>
      <div style={{ ...card, margin: '0 auto', maxWidth: 1200 }}>
        <div style={header}>
          <h2 style={{ ...hTitle, fontSize: 22 }}>Products</h2>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <span style={{ color: theme.subtext, fontSize: 13 }}>Category</span>
            <select value={category} onChange={e => setCategory(e.target.value)} style={selectStyle}>
              {categories.map(c => (
                <option key={c.value} value={c.value}>{c.label}</option>
              ))}
            </select>
          </div>
        </div>

        <hr style={goldRule} />

        {loading && <Loader text="Loading products..." />}
        {err && !loading && <ErrorBox message={err} onRetry={() => fetchProducts(category)} />}

        {!loading && !err && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }}>
            {products.map(p => (
              <div key={p.id} style={{ ...card, padding: 12 }}>
                <div style={{ display: 'grid', placeItems: 'center', height: 160, background: '#0b1140', borderRadius: 12 }}>
                  <img src={p.image} alt={p.title} style={{ maxHeight: 140, objectFit: 'contain' }} />
                </div>
                <div
                  style={{ marginTop: 8, color: theme.subtext, fontSize: 13 }}
                  title={p.title}
                >
                  {p.title.length > 70 ? p.title.slice(0, 70) + '…' : p.title}
                </div>
                <div style={{ marginTop: 8, ...pill }}>{`₹${p.price}`}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
