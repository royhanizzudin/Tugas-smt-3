// 1. Mengambil elemen-elemen dari HTML yang akan dimanipulasi
const form = document.getElementById('search-form');
const input = document.getElementById('search-input');
const loading = document.getElementById('loading');
const errorMessage = document.getElementById('error-message');
const profileCard = document.getElementById('profile-card');
const historyList = document.getElementById('history-list');
const clearHistoryBtn = document.getElementById('clear-history');

// Elemen spesifik untuk data profil
const avatar = document.getElementById('avatar');
const nameEl = document.getElementById('name');
const bio = document.getElementById('bio');
const repoCount = document.getElementById('repo-count');
const profileLink = document.getElementById('profile-link');

// Array sederhana untuk menyimpan riwayat (history) pencarian
let historyData = [];

// 2. Event Listener saat tombol "Cari" ditekan
form.addEventListener('submit', async function(event) {
    event.preventDefault(); // Mencegah halaman reload saat form disubmit

    const username = input.value.trim(); // Mengambil teks input & menghapus spasi
    if (!username) return; // Jika kosong, hentikan fungsi

    // Atur tampilan awal: Tampilkan Loading, sembunyikan Error & Profil
    loading.classList.remove('hidden');
    errorMessage.classList.add('hidden');
    profileCard.classList.add('hidden');

    try {
        // 3. Proses memanggil API GitHub publik
        const response = await fetch(`https://api.github.com/users/${username}`);
    } catch (error) {
        // Jika terjadi error saat fetch, tampilkan pesan error
        loading.classList.add('hidden');
        errorMessage.textContent = 'Terjadi kesalahan saat mengambil data.';
        errorMessage.classList.remove('hidden');
    }
}); 