function mulaiUndangan() {
  document.getElementById("intro").style.display = "none";
  document.getElementById("main").style.display = "block";
  document.getElementById("heroInvite").scrollIntoView({ behavior: "smooth" });

  // Mulai AOS animasi setelah intro disembunyikan
  AOS.refresh(); 

  // ✅ Panggil countdown di sini
  countdown();
}

function countdown() {
  const target = new Date('2025-05-30T09:00:00').getTime();

  const interval = setInterval(function () {
    const now = new Date().getTime();
    const distance = target - now;

    if (distance < 0) {
      clearInterval(interval);
      document.getElementById("days").innerText = "00";
      document.getElementById("hours").innerText = "00";
      document.getElementById("minutes").innerText = "00";
      document.getElementById("seconds").innerText = "00";
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById("days").innerText = String(days).padStart(2, '0');
    document.getElementById("hours").innerText = String(hours).padStart(2, '0');
    document.getElementById("minutes").innerText = String(minutes).padStart(2, '0');
    document.getElementById("seconds").innerText = String(seconds).padStart(2, '0');
  }, 1000);
}

document.addEventListener("DOMContentLoaded", function () {
  AOS.init();
});

// Personalisasi nama tamu dari URL
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

// Ambil dari ?tamu= atau ?to=
const namaTamu = urlParams.get('tamu') || urlParams.get('to');

if (namaTamu) {
  document.getElementById("tamu").innerText = decodeURIComponent(namaTamu);
}

// Cek autoplay dan atur audio supaya tidak muted jika sudah ada interaksi
const audio = document.getElementById('weddingAudio');

// Cek apakah audio sudah dimulai
window.addEventListener('click', () => {
  if (audio.paused) {
    audio.play();
  }
});

// Pastikan audio berulang terus menerus
audio.addEventListener('ended', function () {
  audio.currentTime = 0;  // Mulai dari awal
  audio.play();  // Putar lagi
});





// Ganti-ganti background hero section setiap 2 detik
const heroBg = document.getElementById('heroBg');
const bgImages = [
  'https://tudearjaya.github.io/assets/img/portfolio/dekari.jpeg',
  'https://tudearjaya.github.io/assets/img/portfolio/dekari2.jpeg',
  'https://tudearjaya.github.io/assets/img/portfolio/cewek.jpg',
  'https://tudearjaya.github.io/assets/img/portfolio/ayak.jpg'
];

let current = 0;
heroBg.style.backgroundImage = `url('${bgImages[current]}')`;

setInterval(() => {
  // Fade out
  heroBg.style.opacity = 0;

  setTimeout(() => {
    current = (current + 1) % bgImages.length;
    heroBg.style.backgroundImage = `url('${bgImages[current]}')`;
    // Fade in
    heroBg.style.opacity = 1;
  }, 500);
}, 3000);

// Fade in saat scroll
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('fade-in-up');
      observer.unobserve(entry.target); // animasi hanya sekali
    }
  });
});

document.querySelectorAll('.animasi-scroll').forEach(el => observer.observe(el));


// Fungsi untuk menampilkan semua entri dari localStorage
function tampilkanUcapanDariStorage() {
  const daftar = document.getElementById('daftarUcapan');
  daftar.innerHTML = ''; // Kosongkan sebelum isi ulang

  const dataRSVP = JSON.parse(localStorage.getItem('dataRSVP')) || [];

  if (dataRSVP.length > 0) {
    const table = document.createElement('table');

    // Header tabel
    const headerRow = document.createElement('tr');
    headerRow.innerHTML = `
      <th>Nama</th>
      <th>Ucapan & Doa</th>
      <th>Kehadiran</th>
    `;
    table.appendChild(headerRow);

    // Tambahkan setiap entri ke tabel
    dataRSVP.forEach(entry => {
      const newRow = document.createElement('tr');
      newRow.innerHTML = `
        <td><strong>${entry.nama}</strong></td>
        <td><em>"${entry.ucapan}"</em></td>
        <td>${entry.kehadiran}</td>
      `;
      table.appendChild(newRow);
    });

    daftar.appendChild(table);
  }
}

// Tangani RSVP tanpa reload dan simpan ke localStorage
document.getElementById('rsvpForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const nama = document.getElementById('nama').value;
  const ucapan = document.getElementById('ucapan').value;
  const kehadiran = document.querySelector('input[name="kehadiran"]:checked').value;

  const dataRSVP = JSON.parse(localStorage.getItem('dataRSVP')) || [];
  dataRSVP.push({ nama, ucapan, kehadiran });
  localStorage.setItem('dataRSVP', JSON.stringify(dataRSVP));

  tampilkanUcapanDariStorage();

  document.getElementById('form-feedback').classList.remove('hidden');
  setTimeout(() => {
    document.getElementById('form-feedback').classList.add('hidden');
  }, 4000);

//   // Kosongkan input setelah submit
  document.getElementById('nama').value = '';
  document.getElementById('ucapan').value = '';
  document.querySelector('input[name="kehadiran"]:checked').checked = false;
});

// // Tampilkan data dari localStorage saat halaman dimuat
window.addEventListener('DOMContentLoaded', tampilkanUcapanDariStorage);





//