// Početni (demo) podaci. Koriste se samo kad u localStorage-u još nema ništa.

export const PRODUCT_TYPES = ['Pića', 'Grickalice', 'Slatkiši', 'Sendviči', 'Ostalo'];

export const seedMachines = [
  {
    id: 'VM-001',
    name: 'Aparat kod glavnog ulaza',
    location: 'Zagreb, Ilica 1 - predvorje',
    products: [
      { id: 'p1', name: 'Coca-Cola 0.33 l', type: 'Pića', manufacturer: 'Coca-Cola HBC', price: 1.5, quantity: 12 },
      { id: 'p2', name: 'Jana voda 0.5 l', type: 'Pića', manufacturer: 'Jamnica', price: 1.2, quantity: 20 },
      { id: 'p3', name: 'Smoki', type: 'Grickalice', manufacturer: 'Strauss Adriatic', price: 0.9, quantity: 15 },
    ],
  },
  {
    id: 'VM-002',
    name: 'Aparat u kantini',
    location: 'Split, Poljička cesta 10 - kantina',
    products: [
      { id: 'p4', name: 'Kinder Bueno', type: 'Slatkiši', manufacturer: 'Ferrero', price: 1.4, quantity: 8 },
      { id: 'p5', name: 'Sendvič sa sirom', type: 'Sendviči', manufacturer: 'Kraš', price: 2.5, quantity: 5 },
    ],
  },
];
