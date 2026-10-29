// Data Transaksi Belanja
const transaksi = [
  { id: 1, barang: 'xlim artio', harga: 200_000, qty: 1, kategori: 'oxva' },
  { id: 2, barang: 'xlim pro3', harga: 280_000, qty: 1, kategori: 'oxva' },
  { id: 3, barang: 'xlim pro', harga: 230_000, qty: 2, kategori: 'oxva' },
  { id: 4, barang: 'druga foxy', harga: 500_000, qty: 1, kategori: 'druga' },
  { id: 5, barang: 'vaporesso xros 6', harga: 230_000, qty: 1, kategori: 'vaporesso' },
  { id: 6, barang: 'vaporesso xros 5', harga: 180_000, qty: 1, kategori: 'vaporesso' }
];

console.log('Data Transaksi Belanja:');
console.table(transaksi);

// Filter: mencari data kategori tertentu
const kategoriDicari = 'druga';
const hasilFilter = transaksi.filter(({ kategori }) => kategori === kategoriDicari);

console.log(`\nHasil Filter Kategori: ${kategoriDicari}`);
console.table(hasilFilter);

// Map: menghitung subtotal menggunakan destructuring
const subtotalSemua = transaksi.map(({ barang, harga, qty }) => ({
  barang,
  harga,
  qty,
  subtotal: harga * qty
}));

console.log('\nSubtotal Setiap Barang:');
console.table(subtotalSemua);

// Reduce: menghitung total keseluruhan 
const totalBelanja = subtotalSemua.reduce((acc, { subtotal }) => acc + subtotal, 0);

const totalKategori = hasilFilter
  .map(({ harga, qty }) => ({ subtotal: harga * qty }))
  .reduce((acc, { subtotal }) => acc + subtotal, 0);

console.log(`\nTotal Belanja: Rp${totalBelanja.toLocaleString('id-ID')}`);
console.log(`Total ${kategoriDicari}: Rp${totalKategori.toLocaleString('id-ID')}`);
