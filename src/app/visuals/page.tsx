import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Bot,
  Boxes,
  Brush,
  Cloud,
  Database,
  ImagePlus,
  Mail,
  Server,
  ShoppingCart,
  Users,
} from "lucide-react";

const systemNodes = [
  {
    title: "Storefront",
    description: "Artist-facing shop, product pages, cart, and checkout.",
    icon: ShoppingCart,
    tone: "bg-[#8B4E36] text-white",
  },
  {
    title: "Operations Dashboard",
    description: "Sales, inventory levels, suppliers, and customer communications.",
    icon: Boxes,
    tone: "bg-[#5F6F52] text-white",
  },
  {
    title: "Supabase",
    description: "Postgres, Auth, Storage, customer inventory, and email sequence records.",
    icon: Database,
    tone: "bg-[#243229] text-white",
  },
  {
    title: "Vercel",
    description: "Preview and production deployments for the Next.js app.",
    icon: Cloud,
    tone: "bg-[#181411] text-white",
  },
  {
    title: "Fal",
    description: "Generated product, campaign, and email imagery workflow.",
    icon: Bot,
    tone: "bg-[#C27A2C] text-white",
  },
];

const dashboardFlows = [
  ["Orders", "Sales reporting", "Revenue trends"],
  ["Products", "Stock movements", "Reorder alerts"],
  ["Suppliers", "Lead times", "Purchase planning"],
  ["Email opt-ins", "Sequences", "Customer messages"],
];

export default function VisualsPage() {
  return (
    <main className="min-h-screen bg-[#F8F5EF] text-[#181411]">
      <header className="mx-auto flex w-full max-w-7xl flex-col gap-4 px-5 py-6 sm:px-8 lg:flex-row lg:items-center lg:justify-between lg:px-10">
        <div>
          <Link className="text-sm font-medium text-[#5F6F52]" href="/admin/dashboard">
            Back to dashboard
          </Link>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
            Project Visuals
          </h1>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-[#675D52]">
            A visual representation of how the premium paint brush ecommerce
            site connects the storefront, dashboard, Supabase, Vercel, and Fal.
          </p>
        </div>
        <Link
          className="inline-flex w-fit items-center gap-2 rounded-lg bg-[#181411] px-4 py-3 text-sm font-semibold text-white"
          href="/"
        >
          Storefront
          <ArrowRight className="h-4 w-4" />
        </Link>
      </header>

      <section className="mx-auto grid max-w-7xl gap-6 px-5 pb-14 sm:px-8 lg:grid-cols-[1fr_0.78fr] lg:px-10">
        <div className="rounded-lg border border-[#D8CCBA] bg-white p-5 shadow-sm">
          <div className="relative min-h-[520px] overflow-hidden rounded-lg bg-[#FBFAF7] p-5">
            <div className="absolute inset-x-10 top-1/2 h-px bg-[#D8CCBA]" />
            <div className="absolute bottom-20 left-1/2 top-20 w-px bg-[#D8CCBA]" />
            <div className="relative grid min-h-[480px] gap-4 md:grid-cols-2">
              {systemNodes.map((node, index) => {
                const Icon = node.icon;
                const center = index === 2;
                return (
                  <article
                    className={`rounded-lg border border-[#DDD1BF] bg-white p-5 shadow-sm ${
                      center ? "md:col-span-2 md:mx-auto md:w-[54%]" : ""
                    }`}
                    key={node.title}
                  >
                    <div
                      className={`grid h-12 w-12 place-items-center rounded-lg ${node.tone}`}
                    >
                      <Icon className="h-6 w-6" />
                    </div>
                    <h2 className="mt-4 text-xl font-semibold">{node.title}</h2>
                    <p className="mt-2 text-sm leading-6 text-[#675D52]">
                      {node.description}
                    </p>
                  </article>
                );
              })}
            </div>
          </div>
        </div>

        <aside className="grid gap-6">
          <section className="rounded-lg border border-[#D8CCBA] bg-white p-5 shadow-sm">
            <h2 className="text-xl font-semibold">Imagery pipeline</h2>
            <div className="mt-5 grid gap-3">
              {[
                ["Prompt", "Describe premium product or campaign image."],
                ["Generate", "Fal creates the candidate visual."],
                ["Approve", "Store owner reviews the result."],
                ["Publish", "Approved asset goes to Supabase Storage."],
              ].map(([title, description]) => (
                <div
                  className="flex gap-3 rounded-lg border border-[#E6DDCF] p-4"
                  key={title}
                >
                  <ImagePlus className="mt-1 h-5 w-5 shrink-0 text-[#8B4E36]" />
                  <div>
                    <p className="font-medium">{title}</p>
                    <p className="mt-1 text-sm leading-6 text-[#675D52]">
                      {description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-lg border border-[#D8CCBA] bg-white p-5 shadow-sm">
            <h2 className="text-xl font-semibold">Current visual asset</h2>
            <div className="relative mt-5 aspect-[16/10] overflow-hidden rounded-lg border border-[#E6DDCF] bg-[#F8F5EF]">
              <Image
                alt="Premium paint brush visual used in the current storefront"
                className="object-cover"
                fill
                src="/brush-hero.svg"
              />
            </div>
            <p className="mt-3 text-sm leading-6 text-[#675D52]">
              This local visual keeps the site designed while Fal generation is
              blocked by exhausted account balance.
            </p>
          </section>
        </aside>
      </section>

      <section className="border-y border-[#D8CCBA] bg-white px-5 py-14 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-center gap-3">
            <Server className="h-6 w-6 text-[#5F6F52]" />
            <h2 className="text-3xl font-semibold">How the dashboard joins together</h2>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-4">
            {dashboardFlows.map((flow) => (
              <article
                className="rounded-lg border border-[#DDD1BF] bg-[#F8F5EF] p-5"
                key={flow.join("-")}
              >
                {flow.map((item, index) => (
                  <div key={item}>
                    <div className="flex items-center gap-3">
                      <span className="grid h-8 w-8 place-items-center rounded-lg bg-white text-sm font-semibold text-[#8B4E36]">
                        {index + 1}
                      </span>
                      <p className="font-medium">{item}</p>
                    </div>
                    {index < flow.length - 1 ? (
                      <div className="ml-4 h-8 w-px bg-[#D8CCBA]" />
                    ) : null}
                  </div>
                ))}
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-5 px-5 py-14 sm:px-8 md:grid-cols-3 lg:px-10">
        {[
          {
            title: "Customer data",
            text: "Profiles, orders, customer inventory, email opt-ins, and message history live in Supabase.",
            icon: Users,
          },
          {
            title: "Product operations",
            text: "Products, product images, stock levels, supplier records, and movement logs support fulfillment.",
            icon: Brush,
          },
          {
            title: "Email sequences",
            text: "Signup, purchase care, replenishment, and abandoned cart events create sequence enrollments.",
            icon: Mail,
          },
        ].map((item) => {
          const Icon = item.icon;
          return (
            <article
              className="rounded-lg border border-[#DDD1BF] bg-white p-6 shadow-sm"
              key={item.title}
            >
              <Icon className="h-6 w-6 text-[#8B4E36]" />
              <h2 className="mt-5 text-xl font-semibold">{item.title}</h2>
              <p className="mt-3 text-sm leading-6 text-[#675D52]">{item.text}</p>
            </article>
          );
        })}
      </section>
    </main>
  );
}
