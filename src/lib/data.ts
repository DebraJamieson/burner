import {
  BarChart3,
  Boxes,
  Mail,
  Network,
  PackageCheck,
  ShoppingBag,
  Truck,
  Users,
} from "lucide-react";

export const products = [
  {
    name: "Kolinsky Detail Set",
    collection: "Precision",
    price: "$148",
    stock: 18,
    reorderPoint: 10,
    finish: "Sable blend",
    image: "/brush-detail-set.svg",
    description: "Fine-point brushes for miniature, botanical, and glazing work.",
  },
  {
    name: "Atelier Wash Brush",
    collection: "Watercolor",
    price: "$96",
    stock: 7,
    reorderPoint: 12,
    finish: "Goat and synthetic",
    image: "/brush-wash.svg",
    description: "A soft wash brush built for smooth pigment release.",
  },
  {
    name: "Long Handle Filbert Trio",
    collection: "Oil and Acrylic",
    price: "$124",
    stock: 31,
    reorderPoint: 14,
    finish: "Interlocked synthetic",
    image: "/brush-filbert-trio.svg",
    description: "Controlled edges and resilient spring for studio painting.",
  },
];

export const dashboardMetrics = [
  {
    label: "Sales this month",
    value: "$42,860",
    detail: "18 percent above target",
    icon: BarChart3,
  },
  {
    label: "Open orders",
    value: "126",
    detail: "22 awaiting fulfillment",
    icon: ShoppingBag,
  },
  {
    label: "Low-stock brushes",
    value: "9",
    detail: "4 below reorder point",
    icon: Boxes,
  },
  {
    label: "Active sequences",
    value: "6",
    detail: "Welcome, care, replenishment",
    icon: Mail,
  },
];

export const dashboardSections = [
  {
    title: "Visual map",
    description: "See how the storefront, dashboard, Supabase, Vercel, Fal, and email workflows connect.",
    icon: Network,
    href: "/visuals",
  },
  {
    title: "Sales",
    description: "Revenue, order volume, best sellers, average order value, and sales trends.",
    icon: BarChart3,
    href: "/admin/reports",
  },
  {
    title: "Inventory",
    description: "Stock levels, reorder alerts, product movement history, and customer-owned brushes.",
    icon: PackageCheck,
    href: "/admin/inventory",
  },
  {
    title: "Suppliers",
    description: "Supplier directory, contact details, lead times, payment terms, and notes.",
    icon: Truck,
    href: "/admin/suppliers",
  },
  {
    title: "Customer communications",
    description: "Email sequence enrollments, opt-in status, sent messages, and customer segments.",
    icon: Users,
    href: "/admin/customer-communications",
  },
];

export const suppliers = [
  {
    name: "Maison Ferrule Co.",
    contact: "Elena Morris",
    leadTime: "21 days",
    terms: "Net 30",
    status: "Preferred",
  },
  {
    name: "Northline Brushworks",
    contact: "Ari Singh",
    leadTime: "14 days",
    terms: "Deposit plus balance",
    status: "Active",
  },
  {
    name: "Cedar Handle Studio",
    contact: "Mara Cole",
    leadTime: "35 days",
    terms: "Net 15",
    status: "Watch lead time",
  },
];

export const communications = [
  {
    subject: "Welcome to the studio list",
    segment: "New subscribers",
    status: "Active",
    nextSend: "After signup",
  },
  {
    subject: "How to care for sable brushes",
    segment: "Recent buyers",
    status: "Active",
    nextSend: "48 hours after purchase",
  },
  {
    subject: "Time to replace your wash brush?",
    segment: "Inventory older than 9 months",
    status: "Draft",
    nextSend: "Manual approval",
  },
];
