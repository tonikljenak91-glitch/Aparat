import { useState } from 'react';
import { usePersistentReducer } from './hooks/usePersistentReducer.js';
import { machinesReducer, ACTIONS } from './state/machinesReducer.js';
import { seedMachines } from './data/seed.js';
import { stockValue, formatPrice } from './utils/format.js';
import MachineList from './components/MachineList.jsx';
import MachineForm from './components/MachineForm.jsx';
import MachineDetail from './components/MachineDetail.jsx';

export default function App() {
  // Cijelo stanje aplikacije živi ovdje (jedan "izvor istine"),
  // a djeci ga prosljeđujemo preko propsa.
  const [machines, dispatch] = usePersistentReducer(
    machinesReducer,
    'aparati-v1',
    () => seedMachines
  );

  const [selectedId, setSelectedId] = useState(machines[0]?.id ?? null);
  const [showAddForm, setShowAddForm] = useState(false);

  // Izvedeni podaci: računamo ih pri renderu, ne trebaju zasebno stanje.
  const selectedMachine = machines.find((m) => m.id === selectedId) ?? null;
  const totalProducts = machines.reduce((sum, m) => sum + m.products.length, 0);
  const totalValue = machines.reduce((sum, m) => sum + stockValue(m.products), 0);

  const handleAddMachine = (machine) => {
    dispatch({ type: ACTIONS.ADD_MACHINE, machine });
    setSelectedId(machine.id);
    setShowAddForm(false);
  };

  const handleDeleteMachine = (machineId) => {
    if (!window.confirm(`Obrisati aparat ${machineId} i sve njegove proizvode?`)) return;
    dispatch({ type: ACTIONS.DELETE_MACHINE, machineId });
    if (selectedId === machineId) setSelectedId(null);
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>Evidencija samoposlužnih aparata</h1>
        <ul className="stats">
          <li><strong>{machines.length}</strong> aparata</li>
          <li><strong>{totalProducts}</strong> vrsta proizvoda</li>
          <li><strong>{formatPrice(totalValue)}</strong> vrijednost zalihe</li>
        </ul>
      </header>

      <main className="layout">
        <aside className="sidebar">
          <MachineList
            machines={machines}
            selectedId={selectedId}
            onSelect={setSelectedId}
          />
          {showAddForm ? (
            <MachineForm
              existingIds={machines.map((m) => m.id)}
              onSubmit={handleAddMachine}
              onCancel={() => setShowAddForm(false)}
            />
          ) : (
            <button className="btn primary full" onClick={() => setShowAddForm(true)}>
              + Novi aparat
            </button>
          )}
        </aside>

        <section className="content">
          {selectedMachine ? (
            // key={...} resetira unutarnje stanje komponente kad promijenimo aparat
            <MachineDetail
              key={selectedMachine.id}
              machine={selectedMachine}
              dispatch={dispatch}
              onDelete={() => handleDeleteMachine(selectedMachine.id)}
            />
          ) : (
            <p className="empty">Odaberi aparat s lijeve strane ili dodaj novi.</p>
          )}
        </section>
      </main>
    </div>
  );
}
