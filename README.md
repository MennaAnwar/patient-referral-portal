# Patient Referral Portal 🏥

[![Next.js](https://img.shields.io/badge/Next.js-16-000000.svg?logo=next.js&logoColor=white)](https://nextjs.org)
[![tRPC](https://img.shields.io/badge/tRPC-11-000000.svg?logo=trpc&logoColor=white)](https://trpc.io)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6.svg?logo=typescript&logoColor=white)](https://typescriptlang.org)
[![Drizzle ORM](https://img.shields.io/badge/Drizzle-0.45-007ACC.svg?logo=postgresql&logoColor=white)](https://orm.drizzle.team)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-3B82F6.svg?logo=tailwind-css&logoColor=white)](https://tailwindcss.com)

A full-stack web application for law firms and attorneys to submit patient referrals for medical evaluations. Patients' details, complaints, and preferences are securely stored in a Postgres database via typesafe APIs.

## 🚀 Quick Start

### Prerequisites
- Node.js 20+
- PostgreSQL database (local or hosted)

### Setup
1. Clone the repo:
   ```
   git clone <repo-url>
   cd patient-referral-portal
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Set up environment variables (create `.env.local`):
   ```
   DATABASE_URL=\"postgresql://username:password@localhost:5432/referralsdb\"
   ```

4. Run database migrations:
   ```
   npx drizzle-kit generate
   npx drizzle-kit push
   ```

5. Start development server:
   ```
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000)

### Available Scripts
- `npm run dev` - Start dev server
- `npm run build` - Build for production
- `npm run start` - Run production server
- `npm run lint` - Lint code
- `npm run test` - Run tests

## ✨ Key Features
- **Typesafe Forms**: React Hook Form + Zod validation, reused in tRPC.
- **End-to-End Typesafety**: tRPC infers types across frontend/backend.
- **DB Persistence**: Drizzle inserts referrals with auto-timestamps.
- **Responsive UI**: Tailwind + Heroicons, success/error states.
- **Tested**: Jest for referral logic.

Demo flow: Fill form → Validate → Submit → DB insert → Success page (team follows up in 24h).

## ⚖️ Tradeoffs & Decisions
| Choice | Why | Tradeoff |
|--------|-----|----------|
| **tRPC** | Full-stack typesafety, no REST boilerplate | Learning curve vs traditional APIs |
| **Drizzle ORM + pg** | Lightweight, schema-as-code, raw SQL power | Less 'magic' than Prisma (manual joins) |
| **Pages Router** | Easy tRPC API setup | App Router SSR changes later? |
| **Zod Schemas** | Reuse frontend/backend validation | Schema drift risk (mitigated by tRPC) |
| **Tailwind** | Fast prototyping, consistent design | Bundle size (PurgeCSS handles) |
| **No Auth** | MVP focus | Add Clerk/NextAuth later for prod |
| **Local Postgres** | Simple dev setup | Cloud DB (Neon/Supabase) for deploy |
| **Console.log in mutation** | Debug during dev | Remove for prod logging |

Future: Multi-tenant, dashboard, status updates, auth.

## 🔧 Development


### Testing
```
npm run test
```
Covers `src/tests/referral.test.tsx`.


## ☁️ Deployment

### Self-Host
```
npm run build
npm run start
```



