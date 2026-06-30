create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  full_name text,
  created_at timestamptz not null default now()
);

create table if not exists public.collections (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  description text
);

create table if not exists public.suppliers (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  website text,
  payment_terms text,
  lead_time text,
  notes text,
  created_at timestamptz not null default now()
);

create table if not exists public.supplier_contacts (
  id uuid primary key default gen_random_uuid(),
  supplier_id uuid not null references public.suppliers(id) on delete cascade,
  name text not null,
  email text,
  phone text,
  role text
);

create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  collection_id uuid references public.collections(id) on delete set null,
  supplier_id uuid references public.suppliers(id) on delete set null,
  name text not null,
  slug text not null unique,
  description text,
  price numeric(10, 2) not null,
  stock_quantity integer not null default 0,
  reorder_point integer not null default 0,
  active boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists public.product_images (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references public.products(id) on delete cascade,
  storage_path text not null,
  sort_order integer not null default 0,
  alt_text text
);

create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid references public.profiles(id) on delete set null,
  status text not null default 'pending',
  total numeric(10, 2) not null default 0,
  payment_reference text,
  created_at timestamptz not null default now()
);

create table if not exists public.order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders(id) on delete cascade,
  product_id uuid references public.products(id) on delete set null,
  quantity integer not null,
  unit_price numeric(10, 2) not null
);

create table if not exists public.customer_inventory (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null references public.profiles(id) on delete cascade,
  product_id uuid references public.products(id) on delete set null,
  order_item_id uuid references public.order_items(id) on delete set null,
  condition text,
  use_case text,
  purchased_at date,
  created_at timestamptz not null default now()
);

create table if not exists public.inventory_movements (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references public.products(id) on delete cascade,
  movement_type text not null,
  quantity integer not null,
  reason text,
  created_at timestamptz not null default now()
);

create table if not exists public.email_subscriptions (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid references public.profiles(id) on delete cascade,
  email text not null,
  marketing_opt_in boolean not null default false,
  subscribed_at timestamptz not null default now(),
  unsubscribed_at timestamptz
);

create table if not exists public.email_sequences (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  trigger_type text not null,
  active boolean not null default true
);

create table if not exists public.email_sequence_steps (
  id uuid primary key default gen_random_uuid(),
  sequence_id uuid not null references public.email_sequences(id) on delete cascade,
  step_number integer not null,
  delay_hours integer not null default 0,
  subject text not null,
  template_key text not null
);

create table if not exists public.email_sequence_enrollments (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null references public.profiles(id) on delete cascade,
  sequence_id uuid not null references public.email_sequences(id) on delete cascade,
  status text not null default 'active',
  current_step integer not null default 0,
  next_send_at timestamptz
);

create table if not exists public.customer_messages (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid references public.profiles(id) on delete set null,
  channel text not null,
  subject text,
  status text not null default 'queued',
  sent_at timestamptz
);

alter table public.profiles enable row level security;
alter table public.collections enable row level security;
alter table public.suppliers enable row level security;
alter table public.supplier_contacts enable row level security;
alter table public.products enable row level security;
alter table public.product_images enable row level security;
alter table public.orders enable row level security;
alter table public.order_items enable row level security;
alter table public.customer_inventory enable row level security;
alter table public.inventory_movements enable row level security;
alter table public.email_subscriptions enable row level security;
alter table public.email_sequences enable row level security;
alter table public.email_sequence_steps enable row level security;
alter table public.email_sequence_enrollments enable row level security;
alter table public.customer_messages enable row level security;

create policy "Public can read active products"
  on public.products for select
  to anon, authenticated
  using (active = true);

create policy "Public can read collections"
  on public.collections for select
  to anon, authenticated
  using (true);

create policy "Customers can read own profile"
  on public.profiles for select
  to authenticated
  using ((select auth.uid()) = id);

create policy "Customers can read own orders"
  on public.orders for select
  to authenticated
  using ((select auth.uid()) = profile_id);

create policy "Customers can read own inventory"
  on public.customer_inventory for select
  to authenticated
  using ((select auth.uid()) = profile_id);

create policy "Customers can update own email subscriptions"
  on public.email_subscriptions for update
  to authenticated
  using ((select auth.uid()) = profile_id)
  with check ((select auth.uid()) = profile_id);
