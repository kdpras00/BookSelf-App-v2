📚 Bookshelf Apps
License
Version
Open Source

Bookshelf Apps adalah aplikasi web sederhana untuk mengelola daftar buku. Anda dapat menambahkan, mengedit, menghapus, dan memindahkan buku antara rak "Belum Selesai Dibaca" dan "Selesai Dibaca". Aplikasi ini dibangun dengan HTML, CSS (Tailwind CSS), dan JavaScript, serta menggunakan SweetAlert2 untuk notifikasi yang interaktif.

🌟 Fitur
Fitur	Deskripsi
Tambah Buku	Tambahkan buku baru dengan judul, penulis, tahun, dan status selesai.
Edit Buku	Edit informasi buku yang sudah ada.
Hapus Buku	Hapus buku dari daftar.
Pindahkan Buku	Pindahkan buku antara rak "Belum Selesai Dibaca" dan "Selesai Dibaca".
Cari Buku	Cari buku berdasarkan judul.
Penyimpanan Lokal	Data buku disimpan di localStorage sehingga tidak hilang saat refresh.
Notifikasi Interaktif	Menggunakan SweetAlert2 untuk menampilkan pesan sukses atau error.
🚀 Cara Menggunakan
1. Menambahkan Buku Baru
Isi form "Tambah Buku Baru" dengan judul, penulis, tahun, dan status selesai.

Klik tombol Tambahkan Buku.

Buku akan muncul di rak "Belum Selesai Dibaca" atau "Selesai Dibaca" sesuai status.

2. Mengedit Buku
Klik tombol Edit pada buku yang ingin diedit.

Form edit akan muncul di SweetAlert2.

Ubah informasi buku dan klik Simpan.

3. Menghapus Buku
Klik tombol Hapus pada buku yang ingin dihapus.

Konfirmasi penghapusan di SweetAlert2.

4. Memindahkan Buku
Klik tombol Selesai atau Belum Selesai untuk memindahkan buku antara rak.

5. Mencari Buku
Masukkan judul buku di form pencarian dan klik Cari.

Hasil pencarian akan ditampilkan di rak yang sesuai.

🛠️ Teknologi yang Digunakan
HTML: Struktur dasar aplikasi.

Tailwind CSS: Framework CSS untuk styling yang cepat dan responsif.

JavaScript: Logika aplikasi dan manipulasi DOM.

SweetAlert2: Library untuk menampilkan notifikasi dan dialog interaktif.

LocalStorage: Penyimpanan data buku di browser.

📂 Struktur Proyek
Copy
bookshelf-app/
├── index.html          # File utama HTML
├── main.js             # File JavaScript untuk logika aplikasi
├── README.md           # Dokumentasi proyek
└── assets/             # Folder untuk aset (jika ada)
🖥️ Demo
Anda dapat mencoba aplikasi ini langsung di Demo Bookshelf Apps (tautan demo bisa ditambahkan jika aplikasi di-host).

📝 Panduan Instalasi
Clone Repositori:

bash
Copy
git clone https://github.com/kdpras00/BookSelf-App-v2.git
cd bookshelf-app
Buka di Browser:

Buka file index.html di browser favorit Anda.

Mulai Menggunakan:

Tambahkan, edit, atau hapus buku sesuai kebutuhan.

🤝 Berkontribusi
Kontribusi sangat diterima! Jika Anda ingin berkontribusi ke proyek ini, ikuti langkah-langkah berikut:

Fork repositori ini.

Buat branch baru (git checkout -b fitur-baru).

Commit perubahan Anda (git commit -m 'Menambahkan fitur baru').

Push ke branch (git push origin fitur-baru).

Buat Pull Request.

📜 Lisensi
Proyek ini dilisensikan di bawah MIT License. Lihat file LICENSE untuk detail lebih lanjut.

🙏 Terima Kasih
Terima kasih telah menggunakan Bookshelf Apps! Jika Anda memiliki saran atau masukan, silakan buka issue atau hubungi saya di kdpras00@gmail.com
