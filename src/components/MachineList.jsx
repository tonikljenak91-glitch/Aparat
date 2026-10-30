import { useState } from 'react';

export default function MachineList({ machines, selectedId, onSelect }) {
  // Kontrolirani input: vrijednost polja uvijek dolazi iz stanja
  const [query, setQuery] = useState('');

  const q = query.trim().toLowerCase();
  const filtered = machines.filter(
    (m) =>
      m.id.toLowerCase().includes(q) ||
      m.name.toLowerCase().includes(q) ||
      m.location.toLowerCase().includes(q)
  );

  return (
    <div>
      <input
        type="search"
        placeholder="Traži po ID-u, nazivu ili lokaciji…"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <ul className="machine-list">
        {filtered.map((m) => (
          <li key={m.id}>
            <button
              className={m.id === selectedId ? 'machine-item active' : 'machine-item'}
              onClick={() => onSelect(m.id)}
            >
              <span className="machine-id">{m.id}</span>
              <span className="machine-name">{m.name}</span>
              <span className="machine-location">{m.location}</span>
            </button>
          </li>
        ))}
      </ul>
      {filtered.length === 0 && <p className="empty">Nema rezultata.</p>}
    </div>
  );
}
