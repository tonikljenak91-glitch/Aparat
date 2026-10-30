import { useState } from 'react';
import { ACTIONS } from '../state/machinesReducer.js';
import { PRODUCT_TYPES } from '../data/seed.js';
import { formatPrice, stockValue } from '../utils/format.js';
import MachineForm from './MachineForm.jsx';
import ProductForm from './ProductForm.jsx';

export default function MachineDetail({ machine, dispatch, onDelete }) {
  const [editingMachine, setEditingMachine] = useState(false);
  // null = forma zatvorena, 'new' = novi proizvod, objekt = uređivanje tog proizvoda
  const [productFormState, setProductFormState] = useState(null);
  const [typeFilter, setTypeFilter] = useState('Sve');

  const visibleProducts =
    typeFilter === 'Sve'
      ? machine.products
      : machine.products.filter((p) => p.type === typeFilter);

  const handleSaveMachine = (data) => {
    dispatch({ type: ACTIONS.UPDATE_MACHINE, machineId: machine.id, changes: data });
    setEditingMachine(false);
  };

  const handleSaveProduct = (product) => {
    const type = product.id ? ACTIONS.UPDATE_PRODUCT : ACTIONS.ADD_PRODUCT;
    // Novi proizvod dobiva id tek ovdje
    const withId = product.id ? product : { ...product, id: crypto.randomUUID() };
    dispatch({ type, machineId: machine.id, product: withId });
    setProductFormState(null);
  };

  const handleDeleteProduct = (productId) =>
    dispatch({ type: ACTIONS.DELETE_PRODUCT, machineId: machine.id, productId });

  return (
    <div>
      {editingMachine ? (
        <MachineForm
          initial={machine}
          onSubmit={handleSaveMachine}
          onCancel={() => setEditingMachine(false)}
        />
      ) : (
        <div className="detail-head">
          <div>
            <h2>
              <span className="machine-id">{machine.id}</span> {machine.name}
            </h2>
            <p className="muted">📍 {machine.location}</p>
          </div>
          <div className="row">
            <button className="btn" onClick={() => setEditingMachine(true)}>Uredi</button>
            <button className="btn danger" onClick={onDelete}>Obriši</button>
          </div>
        </div>
      )}

      <div className="toolbar">
        <label className="inline">
          Vrsta:
          <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)}>
            <option>Sve</option>
            {PRODUCT_TYPES.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
        </label>
        <span className="muted">
          Vrijednost zalihe: <strong>{formatPrice(stockValue(machine.products))}</strong>
        </span>
        <button className="btn primary" onClick={() => setProductFormState('new')}>
          + Proizvod
        </button>
      </div>

      {productFormState && (
        <ProductForm
          initial={productFormState === 'new' ? null : productFormState}
          onSubmit={handleSaveProduct}
          onCancel={() => setProductFormState(null)}
        />
      )}

      {visibleProducts.length === 0 ? (
        <p className="empty">Nema proizvoda za prikaz.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Proizvod</th>
              <th>Vrsta</th>
              <th>Proizvođač</th>
              <th className="num">Cijena</th>
              <th className="num">Količina</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {visibleProducts.map((p) => (
              <tr key={p.id}>
                <td>{p.name}</td>
                <td><span className="tag">{p.type}</span></td>
                <td>{p.manufacturer}</td>
                <td className="num">{formatPrice(p.price)}</td>
                <td className={p.quantity <= 3 ? 'num low' : 'num'}>{p.quantity}</td>
                <td className="actions">
                  <button className="btn small" onClick={() => setProductFormState(p)}>Uredi</button>
                  <button className="btn small danger" onClick={() => handleDeleteProduct(p.id)}>×</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
