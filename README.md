## Technical Test Dashboard Project – Frontend (Next.js)

### Features
- Next.js 14 + TypeScript dengan Ant Design & Axios
- API Proxy melalui Next.js API Routes → External API
- Product List dengan tabel, pagination, dan search (debounce 300ms)
- Create/Edit Product dalam satu modal, validasi dengan Antd Form
- Firebase Authentication (login, protected routes, token di setiap request)

### System Requirements
- Node.js **v18** atau lebih tinggi
- npm **v9** atau lebih tinggi
- Koneksi internet (untuk Firebase)

### Setup Local

1. Clone repository ini

   ```bash
   git clone https://github.com/irwanadinata/technical-test-fe.git
   cd technical-test-fe
   ```

2. Install dependencies

   ```bash
   npm install
   ```

3. Setup .env (Front End dan Back End)

   File `.env` untuk FE dan BE sudah saya lampirkan melalui chat HRD.<br>
   Silakan letakkan file:<br>

   - `.env` di folder frontend<br>
   - `.env.dev` di folder backend

4. Jalankan Back End yang sudah ada

   ```bash
   npm run dev:firebase
   ```

5. Jalankan Front End

   ```bash
   npm run dev
   ```

6. Login web<br>
   Gunakan akun berikut untuk mencoba login web:

   ```bash
   email: irwan@gmail.com
   password: admin123
   ```
### Screenshoot
<img width="1914" height="909" alt="image" src="https://github.com/user-attachments/assets/758a4430-5064-4073-9629-71f36686b88b" />
<img width="1901" height="907" alt="image" src="https://github.com/user-attachments/assets/f2fd5d89-b764-42f6-a058-1e339bdc4fed" />
<img width="1899" height="905" alt="image" src="https://github.com/user-attachments/assets/941a023a-c029-4901-9c8a-cba096b48bde" />
<img width="1904" height="904" alt="image" src="https://github.com/user-attachments/assets/de3e5303-7d31-4b7f-9783-576b9342a461" />


