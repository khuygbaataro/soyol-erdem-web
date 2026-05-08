# 🚀 Соёл Эрдэм вэб — Vercel + Neon Postgres deploy

Энэ заавар нь project-ийг **Vercel** дээр deploy хийж, **Neon Postgres**
database ашиглах алхамуудыг тайлбарлана.

---

## Алхам 1 — Neon database үүсгэх

1. <https://neon.tech> руу ороод GitHub-аар нэвтэр (үнэгүй)
2. **Create Project**
   - Project name: `soyol-erdem`
   - Postgres version: 17
   - Region: `eu-central-1 (Frankfurt)` (Монголд хамгийн ойр)
3. Project үүсэхэд `Connection Details` хэсэгт 2 төрлийн URL гарна:
   - **Pooled connection** ✅ (энийг Vercel-д ашиглана)
   - **Direct connection** (зөвхөн migration-д)
4. **Pooled connection URL**-ыг хуулбарла. Жишээ:
   ```
   postgresql://soyol_owner:npg_xxxxx@ep-aged-shape-12345-pooler.eu-central-1.aws.neon.tech/neondb?sslmode=require
   ```

---

## Алхам 2 — Schema-г Neon database-д үүсгэх (ЗААВАЛ)

```bash
cd soyolerdem-web

# Neon URL-ыг .env файлд бичих (.env.example-аас хуул)
cp .env.example .env

# .env-г засаад DATABASE_URL-руу Neon URL-аа оруул
# Дараа нь Prisma schema-г Neon-д push хий:
npx prisma db push

# Seed (admin/editor user + sample data) — нэг удаа
npx prisma db seed
```

Үүний дараа `http://localhost:3000` дээр Postgres-тэй ажиллаж байгааг шалгана.

> 💡 **Яагаад `db push` ашиглаж байна:** Project одоогоор migration history
> ашиглахгүй (зөвхөн schema sync). Цаашдаа team-тэй ажиллах бол
> `npx prisma migrate dev --name <name>` командаар migration файл үүсгээд
> `package.json`-ы build script-д `prisma migrate deploy` нэмж болно.

---

## Алхам 3 — GitHub repo үүсгэх

1. <https://github.com/new> руу очоод:
   - Repo name: `soyol-erdem-web`
   - Visibility: **Private** (санал болгоно)
   - **DO NOT** initialize with README, .gitignore, license — бид аль хэдийн өөрсдөө бэлдсэн
2. Үүсгэсний дараа гарах URL-ыг хуулбарла. Жишээ:
   ```
   https://github.com/yourusername/soyol-erdem-web.git
   ```

3. Local repo-г push:
   ```bash
   cd soyolerdem-web
   git remote add origin https://github.com/yourusername/soyol-erdem-web.git
   git branch -M main
   git push -u origin main
   ```

---

## Алхам 4 — Vercel дээр deploy хийх

### 4.1. Project import

1. <https://vercel.com> руу ороод GitHub-аар нэвтэр
2. **Add New → Project**
3. GitHub repo-г сонго (`soyol-erdem-web`)
4. **Framework preset**: Next.js (автоматаар илрэнэ)
5. **Root directory**: leave as `.` (default)
6. **Build command**: `npm run build` (автоматаар, өөрчилөх шаардлагагүй —
   `package.json`-д `prisma generate && prisma migrate deploy && next build` гэж заасан)

### 4.2. Environment variables

`Configure Project → Environment Variables` хэсэгт дараах 4 утгыг нэм:

| Key | Value |
|---|---|
| `DATABASE_URL` | Neon-ийн **Pooled connection URL** |
| `AUTH_SECRET` | `node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"`-ээр үүсгэсэн утга |
| `NEXTAUTH_SECRET` | `AUTH_SECRET`-тэй ИЖИЛ утга |
| `AUTH_TRUST_HOST` | `true` |
| `BLOB_READ_WRITE_TOKEN` | Vercel Blob үүсгэхэд автоматаар нэмэгдэнэ (доор үзнэ үү) |

> 💡 `NEXTAUTH_URL` шаардлагагүй — Vercel дээр автоматаар деплоймэнтийн URL-аар
> ажиллана (`AUTH_TRUST_HOST=true` тул).

### 4.3. Vercel Blob storage (admin зургийн upload)

Admin panel-аас зураг upload хийх бол:

1. Vercel project → **Storage** tab
2. **Create Database** → **Blob** → нэр өг (`soyol-erdem-blob` гэх мэт)
3. **Connect Project** товч → одоогийн project сонго
4. `BLOB_READ_WRITE_TOKEN` env var автоматаар бүх environment-д нэмэгдэнэ
5. Vercel автоматаар redeploy хийнэ

Үнэгүй tier: **1 GB storage + 100 GB bandwidth/сар**.

### 4.4. Local-д upload туршихын тулд

```bash
npm i -g vercel
vercel link             # repo-г Vercel project-тэй холбоно
vercel env pull .env    # BLOB_READ_WRITE_TOKEN local-д татаж авна
```

### 4.3. Deploy дарах

**Deploy** товчийг даран:
- ~30 секундын дараа build амжилттай дуусна
- `prisma migrate deploy` автоматаар ажиллаж database-д хүснэгт үүсгэнэ
- `<your-project>.vercel.app` URL дээр сайт нээгдэнэ

---

## Алхам 5 — Production database-ийг seed хийх

Vercel build-д schema үүсэх боловч **seed хийгдэхгүй** (data байхгүй).
Нэг удаа local-аас ажиллуулна:

```bash
# .env дотор Neon URL-аа байгаа эсэхийг шалга
cat .env

# Seed
npx prisma db seed
```

Үр дүнд:
- Admin user: `admin@soyolerdem.edu.mn` / `admin123`
- Editor user: `editor@soyolerdem.edu.mn` / `editor123`
- 6 program, 5 news, 6 ном, 2 research

> 🔒 **ANXAARAL:** Production-д орох тулд админ паролоо `npx prisma studio`
> эсвэл `/admin/users/new`-ээс шинэ ADMIN үүсгээд default `admin@…` бүртгэлийг
> устгаарай.

---

## Алхам 6 — Custom domain (заавал биш)

Vercel дээр:
1. Project → **Settings → Domains**
2. `soyolerdem.edu.mn` гэх мэт өөрийн домэйнээ нэм
3. Vercel өгсөн DNS record-уудыг өөрийн domain registrar-т (GoDaddy, Namecheap гэх мэт) тохируул
4. Хэдэн минутын дараа SSL автоматаар идэвхжинэ

---

## Алхам 7 — Дараагийн deploy

Цаашдаа GitHub-д push хийх бүрд Vercel автоматаар шинэ deployment хийнэ:

```bash
git add .
git commit -m "feat: шинэ функц нэмэв"
git push
```

`prisma/schema.prisma`-г өөрчилсөн бол:

```bash
# Local-оос (Neon-д шууд push хийнэ)
npx prisma db push

# Дараа нь commit + push
git add prisma/schema.prisma
git commit -m "db: <тайлбар>"
git push
```

Schema аль хэдийн Neon-д push хийгдсэн тул Vercel build-д DB-тэй холбоотой
үйлдэл хийгдэхгүй — зөвхөн `prisma generate && next build`.

---

## ⚠️ Production checklist

- [ ] `admin123`, `editor123` default паролуудыг солих
- [ ] `NEXTAUTH_SECRET` (32 байт) шинэчлэх
- [ ] `images.remotePatterns` дотор зөвхөн зөвшөөрөгдсөн host үлдээх
- [ ] Custom domain тохируулах
- [ ] Vercel Analytics идэвхжүүлэх
- [ ] Rate limiting (Vercel WAF эсвэл middleware) тохируулах
- [ ] `/api/contact` дээр reCAPTCHA нэмэх (хүсвэл)

---

## 🛟 Алдаа гарвал

**Build алдаа: "DATABASE_URL not found"**
→ Vercel project settings-д env var-аа зөв нэмсэн эсэхээ шалга

**`/admin` руу нэвтрэхэд redirect loop**
→ `AUTH_TRUST_HOST=true` болсон эсэхийг шалга

**`prisma db push` failed local-аас**
→ Neon URL-ыг **Direct connection** (`-pooler` дагаваргүй URL)-аар туршиж үз.
Pooled connection migration хийхэд алдаа өгч магадгүй.

**Vercel дээр build-д Prisma client олдохгүй**
→ `package.json`-д `postinstall: "prisma generate"` нэмэгдсэн эсэхийг шалга
(аль хэдийн нэмэгдсэн).
