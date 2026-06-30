import Link from "next/link";
import { AlertTriangle, ArrowUpRight } from "lucide-react";

import {
  communications,
  dashboardSections,
  products,
  suppliers,
} from "@/lib/data";
import { isSupabaseConfigured } from "@/lib/supabase";
import { DashboardMetrics } from "./dashboard-metrics";

export default function DashboardPage() {
  const supabaseReady = isSupabaseConfigured();

  return (
    <main className="min-h-screen bg-[#F7F3EC] text-[#181411]">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-5 py-6 sm:px-8 lg:px-10">
        <header className="flex flex-col gap-4 border-b border-[#D8CCBA] pb-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <Link className="text-sm font-medium text-[#5F6F52]" href="/">
              Back to storefront
            </Link>
            <h1 className="mt-3 text-3xl font-semibold text-[#181411] sm:text-4xl">
              Operations Dashboard
            </h1>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-[#675D52]">
              Monitor sales, stock levels, suppliers, and customer communications
              from one admin surface.
            </p>
          </div>
          <div className="flex items-center gap-2 rounded-lg border border-[#D8CCBA] bg-white px-4 py-3 text-sm text-[#675D52]">
            <span
              className={`h-2.5 w-2.5 rounded-full ${
                supabaseReady ? "bg-[#2F6F4E]" : "bg-[#C27A2C]"
              }`}
            />
            {supabaseReady ? "Supabase configured" : "Supabase env pending"}
          </div>
        </header>

        {!supabaseReady ? (
          <section className="flex items-start gap-3 rounded-lg border border-[#E0B36F] bg-[#FFF8EA] p-4 text-sm text-[#6A4B19]">
            <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0" />
            <p>
              Add the Supabase URL and anon key to `.env.local` and Vercel
              environment variables to connect live data.
            </p>
          </section>
        ) : null}

        <DashboardMetrics />

        <section className="grid gap-4 lg:grid-cols-4">
          {dashboardSections.map((section) => {
            const Icon = section.icon;
            return (
              <Link
                className="group rounded-lg border border-[#DDD1BF] bg-white p-5 shadow-sm transition hover:border-[#8B6F45]"
                href={section.href}
                key={section.title}
              >
                <div className="flex items-center justify-between">
                  <Icon className="h-6 w-6 text-[#8B4E36]" />
                  <ArrowUpRight className="h-4 w-4 text-[#8B6F45] transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
                <h2 className="mt-4 text-lg font-semibold">{section.title}</h2>
                <p className="mt-2 text-sm leading-6 text-[#675D52]">
                  {section.description}
                </p>
              </Link>
            );
          })}
        </section>

        <section className="grid gap-5 xl:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-lg border border-[#DDD1BF] bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between gap-4">
              <h2 className="text-xl font-semibold">Inventory levels</h2>
              <span className="rounded-md bg-[#EDF4EA] px-3 py-1 text-xs font-medium text-[#31573A]">
                Live table target
              </span>
            </div>
            <div className="mt-5 overflow-x-auto">
              <table className="w-full min-w-[680px] text-left text-sm">
                <thead className="border-b border-[#E6DDCF] text-[#675D52]">
                  <tr>
                    <th className="py-3 font-medium">Brush</th>
                    <th className="py-3 font-medium">Collection</th>
                    <th className="py-3 font-medium">Stock</th>
                    <th className="py-3 font-medium">Reorder point</th>
                    <th className="py-3 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => {
                    const low = product.stock <= product.reorderPoint;
                    return (
                      <tr className="border-b border-[#F0E8DC]" key={product.name}>
                        <td className="py-4 font-medium">{product.name}</td>
                        <td className="py-4 text-[#675D52]">{product.collection}</td>
                        <td className="py-4">{product.stock}</td>
                        <td className="py-4">{product.reorderPoint}</td>
                        <td className="py-4">
                          <span
                            className={`rounded-md px-2.5 py-1 text-xs font-medium ${
                              low
                                ? "bg-[#FBEBD8] text-[#8B4A18]"
                                : "bg-[#EDF4EA] text-[#31573A]"
                            }`}
                          >
                            {low ? "Reorder" : "Healthy"}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          <div className="grid gap-5">
            <section className="rounded-lg border border-[#DDD1BF] bg-white p-5 shadow-sm">
              <h2 className="text-xl font-semibold">Suppliers</h2>
              <div className="mt-4 grid gap-3">
                {suppliers.map((supplier) => (
                  <div
                    className="rounded-lg border border-[#E6DDCF] p-4"
                    key={supplier.name}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <p className="font-medium">{supplier.name}</p>
                      <span className="rounded-md bg-[#F1EEE8] px-2 py-1 text-xs text-[#675D52]">
                        {supplier.status}
                      </span>
                    </div>
                    <p className="mt-2 text-sm text-[#675D52]">
                      {supplier.contact} | {supplier.leadTime} | {supplier.terms}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            <section className="rounded-lg border border-[#DDD1BF] bg-white p-5 shadow-sm">
              <h2 className="text-xl font-semibold">Customer communications</h2>
              <div className="mt-4 grid gap-3">
                {communications.map((item) => (
                  <div className="rounded-lg bg-[#F8F5EF] p-4" key={item.subject}>
                    <div className="flex items-center justify-between gap-3">
                      <p className="font-medium">{item.subject}</p>
                      <span className="text-xs font-medium text-[#5F6F52]">
                        {item.status}
                      </span>
                    </div>
                    <p className="mt-2 text-sm text-[#675D52]">
                      {item.segment} | {item.nextSend}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </section>
      </div>
    </main>
  );
}
