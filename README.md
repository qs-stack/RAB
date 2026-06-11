# RAB System Studio (versi flat — semua file di root)

PENTING: semua file di paket ini harus berada di **root** repository (tidak di dalam subfolder).
Penyebab gagal sebelumnya: folder `src/` tidak ikut ter-upload ke GitHub.

## Jalankan lokal
1. npm install
2. npm run dev  → buka http://localhost:5173

## Deploy (Vercel)
1. Buat repo GitHub baru.
2. "Add file → Upload files" → seret SEMUA file ini (index.html, main.jsx, App.jsx,
   index.css, package.json, vite.config.js, dll) langsung ke area upload. Commit.
3. Vercel → Add New Project → pilih repo → Deploy (setelan default).

Cek di GitHub: pastikan main.jsx, App.jsx, index.css TERLIHAT di halaman utama repo.
Kalau salah satu tidak ada, build akan gagal lagi.
