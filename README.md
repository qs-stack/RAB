# RAB System Studio

Aplikasi web estimasi RAB (SBDY → AHS → BOQ) yang serba live.
Dibangun dengan React + Vite. Tanpa backend — data hidup di sesi browser,
dan bisa di-Simpan/Buka sebagai file project (.json).

---

## A. Yang harus disiapkan (sekali saja)

1. **Pasang Node.js** (versi 18 atau lebih baru).
   Unduh di https://nodejs.org → install seperti biasa.
   Cek berhasil: buka Terminal / Command Prompt, ketik:
   ```
   node -v
   ```
   Kalau muncul angka versi (mis. v20.x), berarti siap.

---

## B. Menjalankan di komputer (lokal) dulu

1. Ekstrak folder `rab-system-studio` ini ke mana saja.
2. Buka Terminal / Command Prompt, masuk ke foldernya:
   ```
   cd path/ke/rab-system-studio
   ```
3. Pasang dependensi (sekali saja, butuh internet):
   ```
   npm install
   ```
4. Jalankan:
   ```
   npm run dev
   ```
5. Buka alamat yang muncul (biasanya http://localhost:5173) di browser.
   App-nya jalan. Selesai untuk uji lokal.

> Untuk berhenti: tekan Ctrl + C di Terminal.

---

## C. Build versi siap-online

```
npm run build
```
Hasilnya ada di folder **`dist/`**. Folder inilah yang di-host.
Untuk mengetes hasil build secara lokal: `npm run preview`.

---

## D. Deploy ke web (pilih SALAH SATU)

### Cara 1 — Vercel (paling mudah, lewat GitHub) ⭐
1. Buat akun di https://github.com lalu buat repository baru (mis. `rab-system-studio`).
2. Upload seluruh isi folder ini ke repo tsb
   (boleh lewat tombol "Add file → Upload files" di GitHub, JANGAN ikutkan folder `node_modules`).
3. Buat akun di https://vercel.com → "Add New… → Project" → pilih repo tadi.
4. Vercel otomatis mendeteksi Vite. Biarkan default (Build: `npm run build`, Output: `dist`) → **Deploy**.
5. Tunggu ~1 menit → dapat URL live (mis. `https://rab-system-studio.vercel.app`).
   Setiap kali kamu update repo, Vercel re-deploy otomatis.

### Cara 2 — Netlify (lewat GitHub)
1. Sama: upload folder ini ke repo GitHub.
2. https://netlify.com → "Add new site → Import an existing project" → pilih repo.
3. Build command: `npm run build`, Publish directory: `dist` → Deploy.
   (File `netlify.toml` sudah mengatur ini otomatis.)

### Cara 3 — Netlify Drop (tanpa GitHub, paling cepat)
1. Jalankan `npm install` lalu `npm run build` di komputer.
2. Buka https://app.netlify.com/drop
3. Seret folder **`dist`** ke halaman itu → langsung dapat URL live.
   (Kekurangan: tiap ada perubahan, harus build & seret ulang.)

### Cara 4 — GitHub Pages
1. Upload folder ke repo GitHub, jalankan `npm run build`.
2. Push isi folder `dist` ke branch `gh-pages` (atau pakai action),
   lalu aktifkan Pages di Settings repo. `vite.config.js` sudah pakai `base: './'` agar cocok.

---

## E. Cara pakai aplikasinya

- **Muat master**: pilih file Excel master (BOQ/AHS/SBDY) → SBDY & AHS Master terisi.
- **Buka / Simpan**: muat atau simpan kondisi kerja sebagai file `.json`.
  (Pakai file `rab_project_KOSONG.json` untuk mulai dari nol.)
- Tab **BOQ Client**: upload/isi BOQ client → kodefikasi otomatis → harga mengalir.
- Tab **AHS** / **AHS Master**: lihat & kelola analisa (master = library, AHS = per proyek).
- Tab **SBDY**: database harga sumber daya + keterangan.
- Tab **Top High Item**: penggerak biaya proyek.
- **Export BOQ**: unduh BOQ terisi (AMOUNT berupa formula Excel).

## Catatan
- Data tersimpan di memori sesi browser → selalu **Simpan project** sebelum tutup
  kalau ingin menyimpan pekerjaan. Untuk penyimpanan permanen multi-user
  (database online), perlu pengembangan backend terpisah.
