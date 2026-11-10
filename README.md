# Panggonan Resto - Digital Menu & Order System

Aplikasi menu digital responsif dan sistem manajemen resto lengkap untuk [panggonanresto.com/menu/](https://panggonanresto.com/menu/), dibangun dengan React 19, TypeScript, Vite, dan Tailwind CSS.

---

## 🍽️ Fitur Utama

1. **Menu Digital & Pemesanan Meja Langsung**:
   - Pemilihan nomor meja (Meja 01–10, VIP 1–2, Takeaway).
   - Filter kategori hidangan & pencarian menu instan.
   - Kustomisasi level kepedasan (0–3), catatan khusus koki, dan stepper porsi.
   - Keranjang pesanan & dukungan kode promo (contoh: `PANGGONANHEMAT`).

2. **Pembayaran Digital Terintegrasi**:
   - **QRIS Dinamis** dengan simulasi hitung mundur 15 menit.
   - Dukungan e-wallet: GoPay, OVO, DANA, ShopeePay.
   - Virtual Account Bank (BCA, Mandiri).
   - Bayar di Kasir (Tunai / EDC).

3. **Layar Dapur (Kitchen Display System - KDS)**:
   - Antrean tiket masak real-time dengan notifikasi suara bel dapur (*dual-chime*).
   - Indikator durasi masak & alur status: *Baru Masuk* $\to$ *Sedang Dimasak* $\to$ *Siap Saji* $\to$ *Selesai*.
   - Filter stasiun: Dapur Makanan & Bar Minuman.

4. **Dashboard Admin & Kasir POS**:
   - Manajemen stok real-time (tambah/kurang stok porsi).
   - Saklar ketersediaan menu (*Tersedia / Habis*).
   - Tambah & edit menu baru.
   - Riwayat transaksi kasir, filter pembayaran, dan cetak ulang struk termal.

5. **Pelacak Pesanan & Struk Termal Digital**:
   - Pelacak status pesanan live untuk pelanggan di meja.
   - Struk termal 80mm siap cetak (`window.print()`).

6. **Ulasan Pelanggan & Media Sosial**:
   - Rating bintang 1–5 dengan lencana tamu terverifikasi.
   - Pembuat kartu Instagram Story bermotif Panggonan Resto.
   - Tombol berbagi struk dan rekomendasi via WhatsApp.

7. **Dashboard Analitik Pemilik (Owner Analytics)**:
   - Total Omzet & Volume Transaksi harian.
   - Leaderboard Tren Menu Terlaris (*Best Sellers*).
   - Grafik distribusi jam sibuk restoran (*Peak Hours*).
   - Skor kepuasan pelanggan (CSAT).

---

## 🚀 Cara Menjalankan di Lokal

```bash
# 1. Clone repositori
git clone https://github.com/<username-anda>/<nama-repo>.git
cd <nama-repo>

# 2. Install dependencies
npm install

# 3. Jalankan development server
npm run dev
```

Buka peramban di `http://localhost:3000`.

---

## 📦 Build untuk Produksi

```bash
npm run build
```

Hasil build siap saji akan berada di folder `dist/`. Anda dapat langsung mengunggah folder ini ke hosting web, GitHub Pages, Vercel, Netlify, atau Cloudflare Pages.

---

## 🌐 Deploy ke GitHub Pages

Proyek ini telah dilengkapi dengan GitHub Actions workflow di `.github/workflows/deploy.yml`. 
Cukup aktifkan **Settings $\to$ Pages $\to$ Source: GitHub Actions** di repositori GitHub Anda.
