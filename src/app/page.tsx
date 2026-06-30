import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Brush,
  CheckCircle2,
  ImagePlus,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

import { products } from "@/lib/data";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#F8F5EF] text-[#181411]">
      <header className="mx-auto flex w-full max-w-7xl items-center justify-between px-5 py-5 sm:px-8 lg:px-10">
        <Link className="flex items-center gap-2 font-semibold" href="/">
          <span className="grid h-9 w-9 place-items-center rounded-lg bg-[#181411] text-white">
            <Brush className="h-5 w-5" />
          </span>
          Burner Brushes
        </Link>
        <nav className="hidden items-center gap-6 text-sm text-[#675D52] md:flex">
          <Link href="#shop">Shop</Link>
          <Link href="#craft">Craft</Link>
          <Link href="#fal">Imagery</Link>
          <Link href="/admin/dashboard">Dashboard</Link>
        </nav>
        <Link
          className="inline-flex items-center gap-2 rounded-lg bg-[#181411] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#3B3028]"
          href="/admin/dashboard"
        >
          Admin
          <ArrowRight className="h-4 w-4" />
        </Link>
      </header>

      <section className="mx-auto grid min-h-[calc(100vh-80px)] w-full max-w-7xl items-center gap-10 px-5 pb-14 pt-4 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:px-10">
        <div className="max-w-2xl">
          <p className="inline-flex items-center gap-2 rounded-lg border border-[#D8CCBA] bg-white px-3 py-2 text-sm font-medium text-[#5F6F52]">
            <Sparkles className="h-4 w-4" />
            High-end brushes for working artists
          </p>
          <h1 className="mt-6 text-5xl font-semibold leading-[1.04] text-[#181411] sm:text-6xl lg:text-7xl">
            Studio-grade paint brushes with a collector-level finish.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-[#675D52]">
            Sell curated sable, synthetic, wash, filbert, and detail brushes
            through a Vercel storefront backed by Supabase inventory, customer
            records, and email sequences.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#8B4E36] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#743C2A]"
              href="#shop"
            >
              View collection
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-[#D8CCBA] bg-white px-5 py-3 text-sm font-semibold text-[#181411] transition hover:border-[#8B6F45]"
              href="/admin/dashboard"
            >
              Open dashboard
            </Link>
          </div>
        </div>

        <div className="relative min-h-[420px] overflow-hidden rounded-lg border border-[#D8CCBA] bg-white shadow-sm">
          <Image
            alt="Premium artist paint brushes arranged on a studio surface"
            className="h-full w-full object-cover"
            fill
            priority
            src="/brush-hero.svg"
          />
          <div className="absolute bottom-5 left-5 right-5 grid gap-3 rounded-lg border border-white/70 bg-white/88 p-4 backdrop-blur md:grid-cols-3">
            {[
              ["AOV target", "$160"],
              ["Catalog SKUs", "48"],
              ["Reorder alerts", "9"],
            ].map(([label, value]) => (
              <div key={label}>
                <p className="text-xs font-medium text-[#675D52]">{label}</p>
                <p className="mt-1 text-2xl font-semibold text-[#181411]">
                  {value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        className="border-y border-[#D8CCBA] bg-white px-5 py-12 sm:px-8 lg:px-10"
        id="shop"
      >
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <h2 className="text-3xl font-semibold">Featured brushes</h2>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-[#675D52]">
                These products are currently local sample data. Once Supabase is
                configured, this section can read from the products table.
              </p>
            </div>
            <span className="rounded-lg bg-[#EDF4EA] px-3 py-2 text-sm font-medium text-[#31573A]">
              Supabase catalog ready
            </span>
          </div>

          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {products.map((product) => (
              <article
                className="rounded-lg border border-[#DDD1BF] bg-[#F8F5EF] p-5"
                key={product.name}
              >
                <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-white">
                  <Image
                    alt={`${product.name} paint brushes`}
                    className="object-cover"
                    fill
                    src={product.image}
                  />
                </div>
                <div className="mt-5 flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm text-[#675D52]">{product.collection}</p>
                    <h3 className="mt-1 text-xl font-semibold">{product.name}</h3>
                  </div>
                  <p className="font-semibold">{product.price}</p>
                </div>
                <p className="mt-3 text-sm leading-6 text-[#675D52]">
                  {product.description}
                </p>
                <div className="mt-5 flex items-center justify-between border-t border-[#DDD1BF] pt-4 text-sm">
                  <span>{product.finish}</span>
                  <span className="font-medium">{product.stock} in stock</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        className="mx-auto grid max-w-7xl gap-5 px-5 py-14 sm:px-8 md:grid-cols-3 lg:px-10"
        id="craft"
      >
        {[
          {
            title: "Supabase inventory",
            text: "Products, customer-owned brushes, stock movements, suppliers, and RLS policies are planned for Supabase.",
            icon: CheckCircle2,
          },
          {
            title: "Email journeys",
            text: "Welcome, care, replenishment, and abandoned-cart sequences are modeled for customer communications.",
            icon: ShieldCheck,
          },
          {
            title: "Vercel deployment",
            text: "The app is structured for Vercel with preview deployments, environment variables, and server routes.",
            icon: ArrowRight,
          },
        ].map((item) => {
          const Icon = item.icon;
          return (
            <article
              className="rounded-lg border border-[#DDD1BF] bg-white p-6 shadow-sm"
              key={item.title}
            >
              <Icon className="h-6 w-6 text-[#5F6F52]" />
              <h3 className="mt-5 text-xl font-semibold">{item.title}</h3>
              <p className="mt-3 text-sm leading-6 text-[#675D52]">{item.text}</p>
            </article>
          );
        })}
      </section>

      <section className="bg-[#1D1916] px-5 py-14 text-white sm:px-8 lg:px-10" id="fal">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="inline-flex items-center gap-2 rounded-lg bg-white/10 px-3 py-2 text-sm">
              <ImagePlus className="h-4 w-4" />
              Fal image workflow
            </p>
            <h2 className="mt-5 text-3xl font-semibold">
              Generated imagery can feed the product catalog.
            </h2>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {["Prompt", "Review", "Publish"].map((step, index) => (
              <div className="rounded-lg border border-white/15 bg-white/8 p-5" key={step}>
                <p className="text-sm text-white/60">Step {index + 1}</p>
                <h3 className="mt-2 text-xl font-semibold">{step}</h3>
                <p className="mt-3 text-sm leading-6 text-white/70">
                  {index === 0
                    ? "Create product or campaign prompts for premium brush imagery."
                    : index === 1
                      ? "Approve generated assets before they reach the storefront."
                      : "Store approved images in Supabase Storage and attach them to products."}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
