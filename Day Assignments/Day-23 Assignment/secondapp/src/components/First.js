import React from 'react';
import '../First.css';

const locations = ['Chennai','Bangalore','Mumbai','Delhi'];
const flowers = ['Rose','Lily','Tulip','Sunflower','Jasmine'];

export default function First(){
  return (
    <main className="first-container">
      <h2 className="first-heading">Creating the Nursery Page</h2>
      <p className="first-paragraph">
        Welcome to our nursery. Find the best plants for your home!
      </p>

      <div className="content-grid">
        <div>
          <label htmlFor="loc" style={{display:'block',fontWeight:600,marginBottom:8,color:'var(--text)'}}>
            Select Location
          </label>
          <select id="loc" className="location-dropdown" defaultValue="Bangalore">
            {locations.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>

        <div className="flower-card">
          <h3 className="flower-title">Popular Flowers</h3>
          <ul className="flower-list">
            {flowers.map(f => <li key={f}>{f}</li>)}
          </ul>
        </div>
      </div>
    </main>
  );
}
