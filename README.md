# Burner Brushes

Premium paint brush ecommerce storefront for artists, built with Next.js for Vercel and planned around Supabase for catalog, customer inventory, email sequences, suppliers, and dashboard data.

## What Is Built

- Storefront homepage with premium brush visuals
- Product section with real brush artwork
- Operations dashboard for sales, inventory, suppliers, and customer communications
- Visual project map at `/visuals`
- Supabase schema draft in `supabase/schema.sql`
- API placeholder for Fal image generation
- API endpoint for email sequence data
- Vercel config

## Local Development

```bash
pnpm install
pnpm dev
```

Open:

- Storefront: `http://localhost:3000`
- Dashboard: `http://localhost:3000/admin/dashboard`
- Visual map: `http://localhost:3000/visuals`

## Environment Variables

Copy `.env.example` to `.env.local` and add real values:

```bash
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
FAL_KEY=
EMAIL_PROVIDER_API_KEY=
PAYMENT_PROVIDER_SECRET_KEY=
```

## Verification

```bash
pnpm lint
pnpm build
```

Both passed during setup.

## Deployment

This project is structured for Vercel. Connect the GitHub repository to Vercel, add the environment variables above, and deploy from the main branch.
