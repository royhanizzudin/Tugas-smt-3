// Mengambil elemen-elemen dari HTML yang akan dimanipulasi
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
const repoList = document.getElementById('repo-list');

// Array sederhana untuk menyimpan riwayat (history) pencarian
let historyData = [];

// fungsi darkmodes
function toggleDarkMode() {
    document.body.classList.toggle("dark-mode");
}

// "Cari"
form.addEventListener('submit', async function(event) {
    event.preventDefault(); // Mencegah halaman reload saat form disubmit

    const username = input.value.trim(); // Mengambil teks input & menghapus spasi
    if (!username) return; // Jika kosong, hentikan fungsi

    // Atur tampilan awal: Tampilkan Loading, sembunyikan Error & Profil
    loading.classList.remove('hidden');
    errorMessage.classList.add('hidden');
    profileCard.classList.add('hidden');

    try {
        const response = await fetch(`https://api.github.com/users/${encodeURIComponent(username)}`);

        if (response.status === 404) {
            errorMessage.textContent = 'Username GitHub tidak ditemukan.';
            errorMessage.classList.remove('hidden');
            return;
        }

        if (!response.ok) {
            errorMessage.textContent = `Gagal mengambil data dari GitHub (HTTP ${response.status}).`;
            errorMessage.classList.remove('hidden');
            return;
        }

        const user = await response.json();
        avatar.src = user.avatar_url;
        nameEl.textContent = user.name || user.login;
        bio.textContent = user.bio || 'Tidak ada bio.';
        repoCount.textContent = user.public_repos;
        profileLink.href = user.html_url;
        profileCard.classList.remove('hidden');
        repoList.innerHTML = '';
        const repoResponse = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=5`);
        const reposData = await repoResponse.json();
        for (let i = 0; i < reposData.length; i++) {
            repoList.innerHTML += `
                <div class="repo-item">
                    <a href="${reposData[i].html_url}" target="_blank">${reposData[i].name}</a>
                    <p>${reposData[i].description || "Tidak ada deskripsi"}</p>
                </div>
            `;
        }
    } catch (error) {
        console.error('Gagal mencari profil GitHub:', error);
        errorMessage.textContent = 'Terjadi kesalahan saat menghubungi GitHub. Periksa koneksi internet Anda.';
        errorMessage.classList.remove('hidden');
    } finally {
        loading.classList.add('hidden');
    }
}); 