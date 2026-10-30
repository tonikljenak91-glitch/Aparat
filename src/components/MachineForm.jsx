import { useState } from 'react';

// Ista forma služi za dodavanje (bez `initial`) i uređivanje (s `initial`).
export default function MachineForm({ initial, existingIds = [], onSubmit, onCancel }) {
  const isEdit = Boolean(initial);
  const [form, setForm] = useState(initial ?? { id: '', name: '', location: '' });
  const [error, setError] = useState('');

  // Jedan handler za sva polja: ime inputa (name) je ključ u objektu stanja
  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault(); // spriječi puni reload stranice

    const machine = {
      id: form.id.trim().toUpperCase(),
      name: form.name.trim(),
      location: form.location.trim(),
    };

    if (!machine.id || !machine.name || !machine.location) {
      setError('Sva polja su obavezna.');
      return;
    }
    if (!isEdit && existingIds.includes(machine.id)) {
      setError(`Aparat s ID-em ${machine.id} već postoji.`);
      return;
    }
    onSubmit(machine);
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <h3>{isEdit ? 'Uredi aparat' : 'Novi aparat'}</h3>

      <label>
        ID aparata
        <input
          name="id"
          value={form.id}
          onChange={handleChange}
          placeholder="npr. VM-003"
          disabled={isEdit} // ID je ključ, ne mijenjamo ga
        />
      </label>
      <label>
        Naziv
        <input name="name" value={form.name} onChange={handleChange} />
      </label>
      <label>
        Lokacija
        <input name="location" value={form.location} onChange={handleChange} />
      </label>

      {error && <p className="error">{error}</p>}

      <div className="row">
        <button type="submit" className="btn primary">Spremi</button>
        <button type="button" className="btn" onClick={onCancel}>Odustani</button>
      </div>
    </form>
  );
}
