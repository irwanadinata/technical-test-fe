## Technical Test Dashboard Project – Frontend (Next.js)

### Features
- Next.js 14 + TypeScript dengan Ant Design & Axios
- API Proxy melalui Next.js API Routes → External API
- Product List dengan tabel, pagination, dan search (debounce 300ms)
- Create/Edit Product dalam satu modal, validasi dengan Antd Form
- Firebase Authentication (login, protected routes, token di setiap request)

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
