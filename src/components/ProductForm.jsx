import { useState } from 'react';
import { PRODUCT_TYPES } from '../data/seed.js';

const emptyProduct = {
  name: '',
  type: PRODUCT_TYPES[0],
  manufacturer: '',
  price: '',
  quantity: '',
};

export default function ProductForm({ initial, onSubmit, onCancel }) {
  const [form, setForm] = useState(initial ?? emptyProduct);
  const [error, setError] = useState('');

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();

    // Vrijednosti iz inputa su uvijek stringovi, pretvaramo ih u brojeve
    const price = Number(String(form.price).replace(',', '.'));
    const quantity = Number(form.quantity);

    if (!form.name.trim() || !form.manufacturer.trim()) {
      setError('Naziv i proizvođač su obavezni.');
      return;
    }
    if (!(price > 0)) {
      setError('Cijena mora biti veća od 0.');
      return;
    }
    if (!Number.isInteger(quantity) || quantity < 0) {
      setError('Količina mora biti cijeli broj (0 ili više).');
      return;
    }

    onSubmit({
      ...form,
      name: form.name.trim(),
      manufacturer: form.manufacturer.trim(),
      price,
      quantity,
    });
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <h3>{initial ? 'Uredi proizvod' : 'Novi proizvod'}</h3>

      <div className="grid">
        <label>
          Naziv proizvoda
          <input name="name" value={form.name} onChange={handleChange} />
        </label>
        <label>
          Vrsta
          <select name="type" value={form.type} onChange={handleChange}>
            {PRODUCT_TYPES.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
        </label>
        <label>
          Proizvođač
          <input name="manufacturer" value={form.manufacturer} onChange={handleChange} />
        </label>
        <label>
          Cijena (€)
          <input name="price" inputMode="decimal" value={form.price} onChange={handleChange} />
        </label>
        <label>
          Količina
          <input name="quantity" inputMode="numeric" value={form.quantity} onChange={handleChange} />
        </label>
      </div>

      {error && <p className="error">{error}</p>}

      <div className="row">
        <button type="submit" className="btn primary">Spremi</button>
        <button type="button" className="btn" onClick={onCancel}>Odustani</button>
      </div>
    </form>
  );
}
