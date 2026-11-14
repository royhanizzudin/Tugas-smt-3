<template>
  <div class="container">
    <h2>Catatan Buku Saya</h2>

    <!-- Bagian 1: Form Input Data -->
    <div class="form-input">
      <!-- Input Judul -->
      <input type="text" v-model="bukuBaru.judul" placeholder="Masukkan Judul Buku" />

      <!-- Select Dropdown Kategori -->
      <select v-model="bukuBaru.kategori">
        <option disabled value="">Pilih Kategori</option>
        <option value="Fiksi">Fiksi</option>
        <option value="Non-Fiksi">Non-Fiksi</option>
        <option value="Edukasi">Edukasi</option>
      </select>

      <!-- Checkbox Status Baca -->
      <label>
        <input type="checkbox" v-model="bukuBaru.selesai" /> Sudah dibaca?
      </label>

      <button @click="tambahBuku">Simpan Buku</button>
    </div>

    <hr />

    <!-- Bagian 2: Menampilkan Daftar Buku (v-for) -->
    <h3>Daftar Bacaan:</h3>
    <ul>
      <li v-for="(buku, index) in daftarBuku" :key="index">
        <strong>{{ buku.judul }}</strong> ({{ buku.kategori }}) 
        - Status: {{ buku.selesai ? '✅ Sudah Selesai' : '❌ Belum Selesai' }}
      </li>
    </ul>

    <!-- Bagian 3: Menampilkan Jumlah Buku (Computed Property) -->
    <p><strong>Total buku yang sudah dibaca: {{ jumlahBukuSelesai }}</strong></p>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

// State untuk menyimpan inputan sementara (sebelum di-klik simpan)
const bukuBaru = ref({
  judul: '',
  kategori: '',
  selesai: false
});

// State berupa Array kosong untuk menyimpan daftar buku yang sudah disubmit
const daftarBuku = ref([]);

// Fungsi ketika tombol "Simpan Buku" diklik
const tambahBuku = () => {
  if (bukuBaru.value.judul !== '' && bukuBaru.value.kategori !== '') {
    // Memasukkan data ke daftarBuku
    daftarBuku.value.push({ ...bukuBaru.value });
    
    // Mengosongkan form input kembali
    bukuBaru.value.judul = '';
    bukuBaru.value.kategori = '';
    bukuBaru.value.selesai = false;
  } else {
    alert('Judul dan Kategori tidak boleh kosong!');
  }
};

// Computed property untuk menghitung secara otomatis berapa buku yang "selesai: true"
const jumlahBukuSelesai = computed(() => {
  return daftarBuku.value.filter(buku => buku.selesai === true).length;
});
</script>

<style scoped>
.container {
  font-family: Arial, sans-serif;
  max-width: 500px;
  margin: 0 auto;
  text-align: left;
}
.form-input {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
</style> 