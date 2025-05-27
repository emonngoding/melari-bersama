// Modal & Musik
function getParameterByName(name) {
  const url = window.location.href;
  name = name.replace(/[\[\]]/g, '\\$&');
  const regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)');
  const results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
}
window.onload = function() {
  // Modal buka undangan
  const modal = document.getElementById('welcome-modal');
  const guest = getParameterByName('to');
  if (guest) document.getElementById('guest-name').innerText = guest;
  document.getElementById('open-invite-btn').onclick = function() {
    modal.style.display = 'none';
    document.getElementById('bg-music').play();
  }
  // Musik control
  const music = document.getElementById('bg-music');
  let isPlay = false;
  document.getElementById('music-btn').onclick = function() {
    if (music.paused) {
      music.play(); isPlay = true; document.getElementById('music-icon').innerText = '🔊';
    } else {
      music.pause(); isPlay = false; document.getElementById('music-icon').innerText = '🔈';
    }
  }
  // Countdown
  countdownTo("2025-06-28T08:00:00");
};
// Countdown Timer
function countdownTo(dateStr) {
  function updateCountdown() {
    const now = new Date();
    const eventDate = new Date(dateStr);
    const diff = (eventDate - now)/1000;
    if (diff <= 0)
      return document.getElementById('countdown').innerText = 'Hari Bahagia Telah Tiba!';
    const days = Math.floor(diff/86400);
    const hours = Math.floor((diff%86400)/3600);
    const mins = Math.floor((diff%3600)/60);
    const secs = Math.floor(diff%60);
    document.getElementById('countdown').innerText =
      `${days} hari ${hours} jam ${mins} menit ${secs} detik`;
    setTimeout(updateCountdown, 1000);
  }
  updateCountdown();
}
// Salin Alamat
document.addEventListener('click', function(e) {
  if (e.target.classList.contains('copy-btn')) {
    const alamat = e.target.getAttribute('data-alamat');
    navigator.clipboard.writeText(alamat);
    e.target.innerText = 'Disalin!';
    setTimeout(()=>e.target.innerText='Salin Alamat',1500);
  }
});
// RSVP & Buku Tamu (localStorage)
const form = document.getElementById('rsvp-form');
const rsvpList = document.getElementById('rsvp-list');
const ucapanList = document.getElementById('ucapan-list');
let ucapanArr = JSON.parse(localStorage.getItem('ucapanArr') || '[]');
function renderUcapan() {
  ucapanList.innerHTML = '';
  ucapanArr.slice().reverse().forEach(item => {
    ucapanList.innerHTML += `<li><b>${item.nama}</b> (${item.kehadiran}):<br>${item.ucapan}</li>`;
  });
}
renderUcapan();
form.onsubmit = function(e) {
  e.preventDefault();
  const data = {
    nama: form.nama.value.trim(),
    kehadiran: form.kehadiran.value,
    ucapan: form.ucapan.value.trim(),
  };
  rsvpList.innerHTML = `<p>Terima kasih, <b>${data.nama}</b> sudah mengisi konfirmasi kehadiran: <b>${data.kehadiran}</b>.</p>`;
  ucapanArr.push(data);
  localStorage.setItem('ucapanArr', JSON.stringify(ucapanArr));
  renderUcapan();
  form.reset();
};
// Share Buttons
function shareWA() {
  const url = location.href;
  const text = "Yuk hadir di undangan pernikahan kami!\n" + url;
  window.open('https://wa.me/?text='+encodeURIComponent(text));
}
function shareIG() {
  alert('Bagikan link ini di Instagram Story atau Bio:\n'+location.href);
}
function shareFB() {
  window.open('https://www.facebook.com/sharer/sharer.php?u='+encodeURIComponent(location.href));
}