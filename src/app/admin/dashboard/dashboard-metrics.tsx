"use client";

import { useMemo, useState } from "react";
import { RefreshCw } from "lucide-react";

import { dashboardMetrics } from "@/lib/data";

const baseMonthlySales = 42860;
const dailySalesBatches = [1240, 980, 1565, 1125, 1890];

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

export function DashboardMetrics() {
  const [refreshCount, setRefreshCount] = useState(0);

  const dailySales = useMemo(
    () =>
      dailySalesBatches
        .slice(0, refreshCount)
        .reduce((total, amount) => total + amount, 0),
    [refreshCount],
  );
  const currentSales = baseMonthlySales + dailySales;
  const remainingUpdates = dailySalesBatches.length - refreshCount;

  function addDailySales() {
    setRefreshCount((current) =>
      current >= dailySalesBatches.length ? 0 : current + 1,
    );
  }

  return (
    <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {dashboardMetrics.map((metric) => {
        const Icon = metric.icon;
        const isSalesMetric = metric.label === "Sales this month";
        const value = isSalesMetric ? formatCurrency(currentSales) : metric.value;
        const detail = isSalesMetric
          ? dailySales > 0
            ? `${formatCurrency(dailySales)} daily sales added`
            : metric.detail
          : metric.detail;

        return (
          <article
            className="rounded-lg border border-[#DDD1BF] bg-white p-5 shadow-sm"
            key={metric.label}
          >
            <div className="flex items-center justify-between gap-3">
              <p className="text-sm text-[#675D52]">{metric.label}</p>
              {isSalesMetric ? (
                <button
                  aria-label="Refresh daily sales"
                  className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-[#D8CCBA] text-[#5F6F52] transition hover:border-[#8B6F45] hover:bg-[#F8F5EF]"
                  onClick={addDailySales}
                  title={
                    remainingUpdates > 0
                      ? "Add daily sales"
                      : "Reset daily sales demo"
                  }
                  type="button"
                >
                  <RefreshCw className="h-4 w-4" />
                </button>
              ) : (
                <Icon className="h-5 w-5 text-[#5F6F52]" />
              )}
            </div>
            <p className="mt-4 text-3xl font-semibold">{value}</p>
            <p className="mt-2 text-sm text-[#675D52]">{detail}</p>
            {isSalesMetric ? (
              <p className="mt-3 text-xs text-[#8B6F45]">
                {remainingUpdates > 0
                  ? `${remainingUpdates} daily update${
                      remainingUpdates === 1 ? "" : "s"
                    } available`
                  : "Daily sales demo is fully refreshed"}
              </p>
            ) : null}
          </article>
        );
      })}
    </section>
  );
}
