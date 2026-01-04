# 🚀 Istruzioni di Setup Rapido

## Opzione 1: Con Docker (Consigliato)

### 1. Avvia Docker Desktop
Assicurati che Docker Desktop sia in esecuzione sul tuo computer.

### 2. Avvia PostgreSQL
```bash
docker-compose up -d
```

### 3. Esegui le migrazioni
```bash
npx prisma migrate dev --name init
```

### 4. Popola il database
```bash
npx prisma db seed
```

### 5. Avvia l'applicazione
```bash
npm run dev
```

### 6. Apri il browser
- **Menu pubblico**: http://localhost:3000
- **Admin dashboard**: http://localhost:3000/admin/login
  - Password: `pizza_gaja_admin_2024`

---

## Opzione 2: Senza Docker (PostgreSQL locale)

Se hai PostgreSQL già installato localmente:

### 1. Crea il database
```sql
CREATE DATABASE gaja_menu;
CREATE USER gaja WITH PASSWORD 'gaja_password_2024';
GRANT ALL PRIVILEGES ON DATABASE gaja_menu TO gaja;
```

### 2. Verifica la connessione in `.env.local`
Il file dovrebbe contenere:
```
DATABASE_URL="postgresql://gaja:gaja_password_2024@localhost:5432/gaja_menu?schema=public"
ADMIN_PASSWORD="pizza_gaja_admin_2024"
```

### 3. Esegui le migrazioni
```bash
npx prisma migrate dev --name init
```

### 4. Popola il database
```bash
npx prisma db seed
```

### 5. Avvia l'applicazione
```bash
npm run dev
```

---

## Opzione 3: Test Rapido con Neon (Cloud)

### 1. Crea un database su Neon
1. Vai su https://neon.tech
2. Crea un account gratuito
3. Crea un nuovo progetto
4. Copia la connection string

### 2. Aggiorna `.env.local`
Sostituisci il `DATABASE_URL` con la connection string di Neon:
```
DATABASE_URL="postgresql://user:password@your-project.neon.tech/neondb?sslmode=require"
ADMIN_PASSWORD="pizza_gaja_admin_2024"
```

### 3. Esegui le migrazioni
```bash
npx prisma migrate dev --name init
```

### 4. Popola il database
```bash
npx prisma db seed
```

### 5. Avvia l'applicazione
```bash
npm run dev
```

---

## 🎯 Cosa Testare

### Menu Pubblico (http://localhost:3000)
- ✅ Navigazione tra categorie
- ✅ Visualizzazione prodotti con prezzi
- ✅ Responsive design (testa su mobile/tablet/desktop)
- ✅ Animazioni smooth scroll

### Admin Dashboard (http://localhost:3000/admin)
1. **Login**: Usa password `pizza_gaja_admin_2024`
2. **Dashboard**: Verifica statistiche (prodotti, ingredienti, categorie)
3. **Gestione Ingredienti**:
   - Vai su "Ingredienti"
   - Disattiva un ingrediente (es. "mozzarella")
   - Torna al menu pubblico
   - Verifica che le pizze con mozzarella mostrino il badge "Temporaneamente non disponibile"
   - Riattiva l'ingrediente
   - Verifica che le pizze tornino disponibili

---

## 🐛 Troubleshooting

### Errore: "Docker not found"
- Installa Docker Desktop da https://www.docker.com/products/docker-desktop

### Errore: "Cannot connect to database"
- Verifica che PostgreSQL sia in esecuzione
- Controlla che il `DATABASE_URL` in `.env.local` sia corretto
- Prova a pingare il database: `npx prisma db pull`

### Errore: "Port 5432 already in use"
- Un'altra istanza di PostgreSQL è già in esecuzione
- Cambia la porta in `docker-compose.yml` (es. `5433:5432`)
- Aggiorna il `DATABASE_URL` di conseguenza

### Errore: "Prisma Client not generated"
```bash
npx prisma generate
```

---

## 📦 Comandi Utili

```bash
# Visualizza il database con GUI
npx prisma studio

# Reset completo del database
npx prisma migrate reset

# Verifica lo stato delle migrazioni
npx prisma migrate status

# Build per produzione
npm run build

# Avvia in produzione
npm start
```

---

## 🎨 Personalizzazione

### Cambiare la password admin
Modifica `.env.local`:
```
ADMIN_PASSWORD="la_tua_password_sicura"
```

### Cambiare i colori
Modifica `tailwind.config.ts` nella sezione `colors`.

### Aggiungere nuove categorie/prodotti
Usa l'admin dashboard oppure modifica `prisma/seed.ts` e riesegui:
```bash
npx prisma db seed
```

---

**Buon lavoro! 🍕**
