# 🍕 Pizza Gajà - Menu Digitale Premium

Menu digitale premium per la pizzeria Pizza Gajà con gestione intelligente degli ingredienti e admin dashboard.

## ✨ Caratteristiche

- **Menu Pubblico Responsive**: Design mobile-first con animazioni fluide
- **Gestione Intelligente Ingredienti**: Sistema automatico di "sold out" basato sulla disponibilità degli ingredienti
- **Admin Dashboard**: Interfaccia per gestire la disponibilità degli ingredienti in tempo reale
- **Design Premium**: Dark mode raffinato con accenti oro e rosso pomodoro
- **Database PostgreSQL**: Schema ottimizzato con Prisma ORM
- **Deploy Ready**: Configurato per Vercel + Neon PostgreSQL

## 🚀 Setup Locale

### Prerequisiti

- Node.js 18+ installato
- Docker Desktop (per PostgreSQL locale) OPPURE PostgreSQL installato localmente

### Installazione

1. **Installa le dipendenze**:
```bash
npm install
```

2. **Avvia PostgreSQL con Docker**:
```bash
docker-compose up -d
```

*Alternativa senza Docker*: Se hai PostgreSQL installato localmente, modifica il `DATABASE_URL` in `.env.local` con le tue credenziali.

3. **Genera il Prisma Client**:
```bash
npx prisma generate
```

4. **Esegui le migrazioni del database**:
```bash
npx prisma migrate dev --name init
```

5. **Popola il database con i dati del menu**:
```bash
npx prisma db seed
```

6. **Avvia il server di sviluppo**:
```bash
npm run dev
```

7. **Apri il browser**:
   - Menu pubblico: http://localhost:3000
   - Admin dashboard: http://localhost:3000/admin/login
   - Password admin: `pizza_gaja_admin_2024` (configurabile in `.env.local`)

## 📁 Struttura del Progetto

```
gaja-menu/
├── app/
│   ├── admin/              # Admin dashboard
│   │   ├── ingredients/    # Gestione ingredienti
│   │   ├── login/          # Login admin
│   │   └── page.tsx        # Dashboard overview
│   ├── api/                # API routes
│   │   └── admin/          # Admin API endpoints
│   ├── globals.css         # Stili globali
│   ├── layout.tsx          # Root layout
│   └── page.tsx            # Menu pubblico
├── components/
│   ├── ui/                 # Componenti UI riutilizzabili
│   ├── category-nav.tsx    # Navigazione categorie
│   └── product-card.tsx    # Card prodotto
├── lib/
│   ├── db.ts               # Prisma client
│   └── utils.ts            # Utility functions
├── prisma/
│   ├── schema.prisma       # Database schema
│   └── seed.ts             # Dati iniziali
├── docker-compose.yml      # PostgreSQL locale
└── tailwind.config.ts      # Configurazione Tailwind
```

## 🎨 Design System

### Colori
- **Background**: `#0f172a` (Navy scuro)
- **Accento Oro**: `#e2b808`
- **Rosso Pomodoro**: `#dc2626`

### Tipografia
- **Titoli**: Playfair Display (serif elegante)
- **Corpo**: Inter (sans-serif moderna)

### Effetti
- Glassmorphism con backdrop blur
- Animazioni Framer Motion
- Gradienti oro e rosso
- Scrollbar personalizzata

## 🗄️ Database Schema

### Models

**Category**: Categorie del menu (Pizze Classiche, Pizze Speciali, etc.)
- `id`, `name`, `slug`, `displayOrder`

**Ingredient**: Ingredienti con tracking disponibilità
- `id`, `name`, `isAvailable`

**Product**: Prodotti del menu
- `id`, `name`, `description`, `price`, `categoryId`

**ProductIngredient**: Relazione many-to-many tra prodotti e ingredienti
- `productId`, `ingredientId`

## 🔧 Comandi Utili

```bash
# Sviluppo
npm run dev

# Build produzione
npm run build

# Avvia produzione
npm start

# Prisma Studio (GUI database)
npx prisma studio

# Reset database
npx prisma migrate reset

# Genera Prisma Client
npx prisma generate
```

## 🌐 Deploy su Vercel + Neon

### 1. Crea database Neon

1. Vai su [neon.tech](https://neon.tech)
2. Crea un nuovo progetto
3. Copia la connection string

### 2. Deploy su Vercel

1. Pusha il codice su GitHub
2. Importa il progetto su Vercel
3. Aggiungi le variabili d'ambiente:
   - `DATABASE_URL`: Connection string di Neon
   - `ADMIN_PASSWORD`: Password per l'admin

4. Deploy automatico!

### 3. Esegui le migrazioni

```bash
# Dalla tua macchina locale con DATABASE_URL di Neon
npx prisma migrate deploy
npx prisma db seed
```

## 🔐 Sicurezza

- Le password admin sono gestite tramite variabili d'ambiente
- Cookie HTTP-only per l'autenticazione
- Middleware per proteggere le route admin
- `.env.local` è gitignored

## 📱 Funzionalità Admin

### Dashboard
- Statistiche overview (prodotti, ingredienti, categorie)
- Accesso rapido alle funzioni principali

### Gestione Ingredienti
- Lista completa ingredienti
- Toggle disponibilità con un click
- Ricerca ingredienti
- Contatore prodotti che usano ogni ingrediente

### Logica "Sold Out"
Quando un ingrediente viene marcato come non disponibile:
1. Tutti i prodotti che lo contengono vengono automaticamente disabilitati nel menu pubblico
2. Appare un badge rosso "Temporaneamente non disponibile (manca [ingrediente])"
3. Il prodotto rimane visibile ma chiaramente non ordinabile

## 🎯 Prossimi Sviluppi (Opzionali)

- [ ] Gestione prodotti (CRUD completo)
- [ ] Gestione categorie
- [ ] Upload immagini prodotti
- [ ] Sistema di ordinazioni online
- [ ] Notifiche push per nuovi ordini
- [ ] Analytics e statistiche vendite
- [ ] Multi-lingua (EN/IT)

## 📞 Contatti

**Pizza Gajà**
- Indirizzo: Via Roma - Galliate, Spazio Gajà
- Telefono: 320.0739024
- Orari: Vedi menu digitale

## 📄 Licenza

© 2024 Pizza Gajà - Tutti i diritti riservati

---

**Sviluppato con** ❤️ **e** 🍕 **da un Senior Full Stack Developer**
