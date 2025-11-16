import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav style={{ marginBottom: '1rem' }}>
      <ul style={{ display: 'flex', gap: '1rem', listStyle: 'none', padding: 0 }}>
        <li>
          <Link to="/">OpenAI</Link>
        </li>
        <li>
          <Link to="/mistral">Mistral</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;