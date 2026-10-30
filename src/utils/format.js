const priceFormatter = new Intl.NumberFormat('hr-HR', {
  style: 'currency',
  currency: 'EUR',
});

export const formatPrice = (value) => priceFormatter.format(value);

// Vrijednost zalihe aparata = zbroj (cijena × količina)
export const stockValue = (products) =>
  products.reduce((sum, p) => sum + p.price * p.quantity, 0);
