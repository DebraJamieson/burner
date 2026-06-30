# Paint Brush Ecommerce Project Map

The current GitHub repository is empty, so this map represents the proposed first version of the project: a high-end paint brush ecommerce website for artists, deployed on Vercel, using Supabase for product data, customer accounts, customer inventory, email sequences, storage, supplier records, dashboard reporting, and order records.

## System Overview

```mermaid
flowchart LR
  visitor["Artist / Customer"] --> website["Storefront Website"]
  adminUser["Store Owner"] --> dashboard["Operations Dashboard"]
  repo["GitHub Repo"] --> vercel["Vercel Deployment"]
  vercel --> website

  website --> catalog["Product Catalog"]
  website --> cart["Cart"]
  website --> checkout["Checkout"]
  website --> account["Customer Account"]
  website --> admin["Admin Dashboard"]
  website --> emailSignup["Email Signup"]
  dashboard --> salesMonitor["Sales Monitoring"]
  dashboard --> stockMonitor["Inventory Levels"]
  dashboard --> supplierManager["Supplier Information"]
  dashboard --> commsManager["Customer Communications"]

  catalog --> supabaseDb["Supabase Postgres"]
  cart --> browserState["Browser Cart State"]
  checkout --> payment["Payment Provider"]
  checkout --> supabaseDb
  account --> supabaseAuth["Supabase Auth"]
  account --> customerInventory["Customer Brush Inventory"]
  admin --> supabaseAuth
  admin --> supabaseDb
  admin --> supabaseStorage["Supabase Storage"]
  emailSignup --> emailSequences["Email Sequences"]
  salesMonitor --> supabaseDb
  stockMonitor --> supabaseDb
  supplierManager --> supabaseDb
  commsManager --> supabaseDb

  supabaseStorage --> images["Product Images"]
  supabaseDb --> productData["Products, Collections, Inventory"]
  supabaseDb --> orderData["Orders, Order Items, Customers"]
  supabaseDb --> customerInventory
  supabaseDb --> emailSequences
  fal["Fal Image Generation"] --> generatedAssets["Generated Brush Imagery"]
  generatedAssets --> supabaseStorage
```

## Customer Journey

```mermaid
flowchart TD
  home["Homepage"] --> collection["Brush Collections"]
  collection --> product["Product Detail"]
  product --> cart["Cart"]
  cart --> checkout["Checkout"]
  checkout --> paymentResult{"Payment successful?"}
  paymentResult -->|Yes| order["Create Order in Supabase"]
  paymentResult -->|No| cart
  order --> confirmation["Order Confirmation"]
  confirmation --> ownedBrushes["Add Purchased Brushes to Customer Inventory"]
  ownedBrushes --> careSequence["Start Care / Usage Email Sequence"]

  home --> account["Sign In / Account"]
  account --> orderHistory["Order History"]
  account --> inventory["My Brush Inventory"]
  inventory --> recommendations["Personalized Brush Recommendations"]
```

## Data Model

```mermaid
erDiagram
  profiles ||--o{ orders : places
  profiles ||--o{ customer_inventory : owns
  profiles ||--o{ email_subscriptions : subscribes
  profiles ||--o{ email_sequence_enrollments : receives
  orders ||--o{ order_items : contains
  products ||--o{ order_items : purchased_as
  products ||--o{ customer_inventory : owned_as
  products ||--o{ inventory_movements : tracks
  products }o--|| suppliers : sourced_from
  collections ||--o{ products : groups
  products ||--o{ product_images : has
  email_sequences ||--o{ email_sequence_steps : contains
  email_sequences ||--o{ email_sequence_enrollments : enrolls
  profiles ||--o{ customer_messages : receives
  suppliers ||--o{ supplier_contacts : has

  profiles {
    uuid id PK
    text email
    text full_name
    timestamptz created_at
  }

  collections {
    uuid id PK
    text name
    text slug
    text description
  }

  products {
    uuid id PK
    uuid collection_id FK
    text name
    text slug
    text description
    numeric price
    integer stock_quantity
    integer reorder_point
    uuid supplier_id FK
    boolean active
  }

  product_images {
    uuid id PK
    uuid product_id FK
    text storage_path
    integer sort_order
    text alt_text
  }

  orders {
    uuid id PK
    uuid profile_id FK
    text status
    numeric total
    text payment_reference
    timestamptz created_at
  }

  order_items {
    uuid id PK
    uuid order_id FK
    uuid product_id FK
    integer quantity
    numeric unit_price
  }

  customer_inventory {
    uuid id PK
    uuid profile_id FK
    uuid product_id FK
    uuid order_item_id FK
    text condition
    text use_case
    date purchased_at
    timestamptz created_at
  }

  email_subscriptions {
    uuid id PK
    uuid profile_id FK
    text email
    boolean marketing_opt_in
    timestamptz subscribed_at
    timestamptz unsubscribed_at
  }

  email_sequences {
    uuid id PK
    text name
    text trigger_type
    boolean active
  }

  email_sequence_steps {
    uuid id PK
    uuid sequence_id FK
    integer step_number
    integer delay_hours
    text subject
    text template_key
  }

  email_sequence_enrollments {
    uuid id PK
    uuid profile_id FK
    uuid sequence_id FK
    text status
    integer current_step
    timestamptz next_send_at
  }

  inventory_movements {
    uuid id PK
    uuid product_id FK
    text movement_type
    integer quantity
    text reason
    timestamptz created_at
  }

  suppliers {
    uuid id PK
    text name
    text website
    text payment_terms
    text lead_time
    text notes
  }

  supplier_contacts {
    uuid id PK
    uuid supplier_id FK
    text name
    text email
    text phone
    text role
  }

  customer_messages {
    uuid id PK
    uuid profile_id FK
    text channel
    text subject
    text status
    timestamptz sent_at
  }
```

## Supabase Responsibilities

```mermaid
flowchart TB
  supabase["Supabase Project"] --> auth["Auth"]
  supabase --> db["Postgres Database"]
  supabase --> storage["Storage"]
  supabase --> rls["Row Level Security"]

  auth --> customers["Customer sign in"]
  auth --> admins["Admin access"]

  db --> catalogTables["Product and collection tables"]
  db --> commerceTables["Orders and order items"]
  db --> profileTables["Customer profiles"]
  db --> inventoryTables["Customer inventory"]
  db --> emailTables["Email subscriptions and sequences"]
  db --> supplierTables["Suppliers and supplier contacts"]
  db --> reportingTables["Sales, inventory, and communication reporting"]

  storage --> productMedia["Product photos and brush detail images"]
  storage --> generatedMedia["Generated campaign and catalog imagery"]

  rls --> publicRead["Public read access for active products"]
  rls --> customerAccess["Customers can read their own orders"]
  rls --> inventoryAccess["Customers can manage their own inventory"]
  rls --> emailAccess["Customers can manage their own email preferences"]
  rls --> adminAccess["Admins can manage products, orders, inventory, suppliers, and email sequences"]
```

## Deployment Flow

```mermaid
flowchart LR
  local["Local Development"] --> github["GitHub Repository"]
  github --> preview["Vercel Preview Deployments"]
  preview --> review["Review and QA"]
  review --> production["Vercel Production Deployment"]

  vercelEnv["Vercel Environment Variables"] --> preview
  vercelEnv --> production
  supabase["Supabase Project"] --> vercelEnv
  emailProvider["Email Provider Keys"] --> vercelEnv
  paymentProvider["Payment Provider Keys"] --> vercelEnv
  falKeys["Fal API Key"] --> vercelEnv
```

## Image Generation Flow

```mermaid
flowchart TD
  brief["Product or campaign image brief"] --> fal["Generate imagery with Fal"]
  fal --> review["Review generated image"]
  review --> approved{"Approved?"}
  approved -->|No| brief
  approved -->|Yes| upload["Upload to Supabase Storage"]
  upload --> asset["Create product_images or campaign asset record"]
  asset --> storefront["Use image on storefront"]
  asset --> email["Use image in email sequence"]
```

## Dashboard Modules

```mermaid
flowchart TB
  dashboard["Operations Dashboard"] --> sales["Sales"]
  dashboard --> inventory["Inventory"]
  dashboard --> suppliers["Suppliers"]
  dashboard --> communications["Customer Communications"]

  sales --> revenue["Revenue, average order value, order volume"]
  sales --> products["Best-selling brushes and collections"]
  sales --> trends["Daily, weekly, and monthly sales trends"]

  inventory --> stock["Current stock by brush"]
  inventory --> reorder["Low-stock and reorder alerts"]
  inventory --> movements["Inventory adjustments and purchase receipts"]

  suppliers --> directory["Supplier directory"]
  suppliers --> contacts["Supplier contacts"]
  suppliers --> leadTimes["Lead times and payment terms"]

  communications --> sequences["Email sequence performance"]
  communications --> messages["Customer message history"]
  communications --> segments["Customer segments and opt-in status"]
```

## Email Sequence Flow

```mermaid
flowchart TD
  trigger["Customer Event"] --> eventType{"Event type"}
  eventType -->|Signup| welcome["Welcome sequence"]
  eventType -->|Purchase| care["Brush care sequence"]
  eventType -->|Inventory update| replenish["Replacement / upgrade sequence"]
  eventType -->|Abandoned cart| recovery["Cart recovery sequence"]

  welcome --> enroll["Create sequence enrollment in Supabase"]
  care --> enroll
  replenish --> enroll
  recovery --> enroll

  enroll --> schedule["Set next_send_at"]
  schedule --> worker["Scheduled email worker"]
  worker --> provider["Email provider"]
  provider --> customer["Customer inbox"]
  worker --> update["Update enrollment status and next step"]
  update --> schedule
```

## Suggested Page Structure

```mermaid
flowchart LR
  app["Website"] --> publicPages["Public Store"]
  app --> customerPages["Customer Area"]
  app --> adminPages["Admin Area"]

  publicPages --> home["/"]
  publicPages --> shop["/shop"]
  publicPages --> collection["/collections/[slug]"]
  publicPages --> product["/products/[slug]"]
  publicPages --> cart["/cart"]
  publicPages --> checkout["/checkout"]

  customerPages --> login["/login"]
  customerPages --> account["/account"]
  customerPages --> orders["/account/orders"]
  customerPages --> inventory["/account/inventory"]
  customerPages --> preferences["/account/email-preferences"]

  adminPages --> adminProducts["/admin/products"]
  adminPages --> adminOrders["/admin/orders"]
  adminPages --> adminMedia["/admin/media"]
  adminPages --> adminInventory["/admin/customer-inventory"]
  adminPages --> adminEmail["/admin/email-sequences"]
  adminPages --> dashboardHome["/admin/dashboard"]
  adminPages --> adminSuppliers["/admin/suppliers"]
  adminPages --> adminComms["/admin/customer-communications"]
  adminPages --> adminReports["/admin/reports"]
```

## Build Order

1. Create the frontend app shell and visual design for a premium artist-focused brush store.
2. Add Supabase client setup and environment variables.
3. Create the Supabase schema for products, collections, images, profiles, orders, order items, customer inventory, and email sequences.
4. Add RLS policies: public catalog reads, customer-owned order reads, customer-owned inventory reads/writes, customer email preference management, and admin-only management.
5. Build product browsing, product detail pages, cart, and checkout flow.
6. Add customer account pages for order history, owned brushes, and email preferences.
7. Add the admin dashboard for sales monitoring, stock levels, supplier records, customer communications, brush listings, customer inventory, product images, and email sequences.
8. Add payment provider integration and order confirmation.
9. Add scheduled email sending through a server-side worker or edge function connected to an email provider.
10. Add the Fal image-generation workflow for product, campaign, and email imagery, storing approved assets in Supabase Storage.
11. Connect the GitHub repository to Vercel, configure environment variables, and use preview deployments for review before production.
