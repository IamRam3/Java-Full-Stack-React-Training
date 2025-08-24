import React from 'react';
const products = [
  {
    productId: 101,
    productName: 'T-Shirt',
    description: 'Cotton material',
    price: 499,
    sizes: ['S', 'M', 'L', 'XL'],
  },
  {
    productId: 102,
    productName: 'Jeans',
    description: 'Slim fit denim',
    price: 1299,
    sizes: ['M', 'L', 'XL'],
  },
  {
    productId: 103,
    productName: 'Jacket',
    description: 'Winter collection',
    price: 2499,
    sizes: ['L', 'XL'],
  },
];

export default function ClothStore() {
  const hasProducts = products && products.length > 0;

  return (
    <section className="section left">
      <h2 className="mb-0">Cloth Store Listing</h2>
      <p className="mt-2" style={{ color: 'var(--muted)' }}>
        Browse available products, pricing, and sizes.
      </p>

      {!hasProducts ? (
        <div className="empty-state">
          <p>No Products Available</p>
        </div>
      ) : (
        <div className="table-wrap mt-5">
          <table className="table">
            <thead>
              <tr>
                <th style={{ width: 120 }}>Product ID</th>
                <th style={{ width: 220 }}>Product Name</th>
                <th>Description</th>
                <th style={{ width: 160 }} className="td-num">Price (₹)</th>
                <th style={{ width: 220 }}>Available Sizes</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p.productId}>
                  <td>{p.productId}</td>
                  <td>{p.productName}</td>
                  <td>{p.description}</td>
                  <td className="td-num">{p.price.toLocaleString('en-IN')}</td>
                  <td>{Array.isArray(p.sizes) ? p.sizes.join(', ') : ''}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
