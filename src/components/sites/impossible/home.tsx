"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";import { GhostCta, PrimaryCta } from "./ui";

/* ------------------------------------------------------------------ */
/* Masked food blobs — irregular organic SVG masks floating around type */
/* ------------------------------------------------------------------ */

let blobCounter = 0;

function BlobImage({
  className,
  d,
  fill,
}: {
  className?: string;
  d: string;
  fill: string;
}) {
  const clipId = `blob-${++blobCounter}`;
  return (
    <svg viewBox="0 0 200 200" className={className} aria-hidden>
      <clipPath id={clipId}>
        <path d={d} />
      </clipPath>
      <g clipPath={`url(#${clipId})`}>
        <rect width="200" height="200" fill={fill} />
        <circle cx="70" cy="80" r="40" fill="#ff5a50" opacity="0.55" />
        <circle cx="130" cy="120" r="30" fill="#ffc7c6" opacity="0.4" />
      </g>
    </svg>
  );
}

const BLOB_PATHS = {
  roughHex:
    "M40 60 L120 25 L180 80 L160 170 L60 175 L15 120 Z",
  organic:
    "M100 15 C150 5 190 45 180 95 C172 140 140 185 95 180 C50 175 15 140 20 95 C25 50 55 24 100 15 Z",
  tornDisc:
    "M100 20 C135 18 170 55 168 90 C166 130 145 165 105 170 C60 176 25 145 25 100 C25 55 62 22 100 20 Z",
};

/* ------------------------------------------------------------------ */
/* Filter pill toggle group                                            */
/* ------------------------------------------------------------------ */

function FilterPills({
  options,
  active,
  onChange,
}: {
  options: string[];
  active: string;
  onChange: (next: string) => void;
}) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-1.5">
      {options.map((option) => (
        <button
          key={option}
          type="button"
          onClick={() => onChange(option)}
          aria-pressed={active === option}
          className={cn(
            "rounded-pills px-4 py-2.5 text-body-sm font-medium tracking-[0.02em] uppercase transition-colors",
            active === option
              ? "bg-impossible-red text-bone-white"
              : "text-blush-highlight hover:border hover:border-blush-highlight",
          )}
        >
          {option}
        </button>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Category tabs with round number badges + active underline           */
/* ------------------------------------------------------------------ */

function CategoryTabs({
  tabs,
  active,
  onChange,
}: {
  tabs: { label: string; count: number }[];
  active: string;
  onChange: (next: string) => void;
}) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-8">
      {tabs.map((tab) => (
        <button
          key={tab.label}
          type="button"
          onClick={() => onChange(tab.label)}
          className={cn(
            "flex items-center gap-2 pb-1 text-lg font-medium tracking-[0.02em] text-blush-highlight uppercase transition-colors",
            active === tab.label &&
              "border-b-2 border-impossible-red text-bone-white",
          )}
        >
          {tab.label}
          <span className="grid size-4 place-items-center rounded-full bg-burgundy-stage text-[10px] leading-none text-bone-white">
            {tab.count}
          </span>
        </button>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Product carousel card                                               */
/* ------------------------------------------------------------------ */

type Product = {
  name: string;
  tagline: string;
};

const PRODUCTS: Product[] = [
  { name: "Steak (From Plants)", tagline: "Fillets. Grilled. Impossible. Sizzles like beef, bleeds like beef" },
  { name: "Burger Patties", tagline: "The classic. Juicy, flame-grilled flavor — from plants" },
  { name: "Sausage Links", tagline: "Savory, juicy, spot-on sausage flavor" },
  { name: "Nuggets", tagline: "Crispy outside, tender inside. Chicken? We think not" },
];

function ProductCard({ product, featured = false }: { product: Product; featured?: boolean }) {
  return (
    <article
      className={cn(
        "rounded-cards border border-butcher-black bg-burgundy-stage",
        featured && "rounded-feature",
      )}
    >
      {/* Packaging visual placeholder */}
      <div
        className={cn(
          "grid aspect-4/3 place-items-center bg-impossible-red/12",
          featured ? "rounded-feature" : "rounded-t-cards",
        )}
      >
        <svg viewBox="0 0 120 90" className="h-24" aria-hidden>
          <rect x="18" y="8" width="84" height="74" rx="6" fill="#e10600" />
          <rect x="26" y="18" width="68" height="34" rx="3" fill="#260212" />
          <text
            x="60"
            y="38"
            textAnchor="middle"
            fill="#ffc7c6"
            fontSize="8"
            fontWeight="700"
            letterSpacing="1"
          >
            IMPOSSIBLE
          </text>
          <text x="60" y="64" textAnchor="middle" fill="#260212" fontSize="9" fontWeight="700">
            {product.name.split(" ")[0].toUpperCase()}
          </text>
        </svg>
      </div>

      <div className="space-y-4 p-6">
        <div>
          <h3 className="text-2xl font-bold tracking-[0.02em] text-blush-highlight uppercase">
            {product.name}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-bone-white/70">{product.tagline}</p>
        </div>

        <div className="flex flex-wrap gap-2">
          <PrimaryCta label="Learn More" />
          <GhostCta label="Find It" withPin />
        </div>
      </div>
    </article>
  );
}

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

const CATEGORIES = [
  { label: "Beef", count: 6 },
  { label: "Sausage", count: 4 },
  { label: "Chicken", count: 5 },
];

const FILTERS = ["All", "Grill", "Air Fryer", "Skillet", "Oven"];

export default function ImpossibleHome() {
  const [category, setCategory] = useState("Beef");
  const [filter, setFilter] = useState("All");

  return (
    <main className="relative overflow-x-clip">
      {/* ============================ HERO ============================ */}
      <section className="relative px-6 py-24">
        <BlobImage
          d={BLOB_PATHS.organic}
          fill="#e10600"
          className="pointer-events-none absolute top-16 left-[4%] hidden w-40 rotate-[-8deg] opacity-90 lg:block"
        />
        <BlobImage
          d={BLOB_PATHS.roughHex}
          fill="#ffc7c6"
          className="pointer-events-none absolute right-[6%] bottom-24 hidden w-52 rotate-[11deg] lg:block"
        />
        <BlobImage
          d={BLOB_PATHS.tornDisc}
          fill="#4f0423"
          className="pointer-events-none absolute bottom-6 left-[12%] hidden w-28 rotate-[6deg] md:block"
        />

        <div className="mx-auto max-w-(--page-max-width) text-center">
          <p className="text-body-sm font-medium tracking-[0.02em] text-impossible-red uppercase">
            ◂ Steak. (From Plants) ▸
          </p>

          <h1 className="mt-6 text-display-xl font-bold text-impossible-red uppercase">
            Sizzle
            <br />
            <span className="text-bone-white">Everyone</span>
          </h1>

          <p className="mx-auto mt-10 max-w-md text-body leading-relaxed text-blush-highlight">
            Filet mignon. Engineered from plants for people who love meat. Out now.
          </p>

          <div className="mt-8 flex items-center justify-center gap-3">
            <PrimaryCta label="Learn More" />
            <GhostCta label="Find It" withPin />
          </div>
        </div>
      </section>

      {/* ==================== PRODUCT LINE NAVIGATION ==================== */}
      <section id="products" className="bg-burgundy-stage/40 px-6 py-16">
        <div className="mx-auto max-w-(--page-max-width) space-y-10">
          <CategoryTabs
            tabs={CATEGORIES}
            active={category}
            onChange={setCategory}
          />
          <div className="grid gap-6 md:grid-cols-2">
            <ProductCard product={PRODUCTS[0]} featured />
            <div className="grid gap-6">
              <ProductCard product={PRODUCTS[1]} />
              <div className="grid gap-6 sm:grid-cols-2">
                <ProductCard product={PRODUCTS[2]} />
                <ProductCard product={PRODUCTS[3]} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====================== RECIPE FILTER SECTION ====================== */}
      <section className="px-6 py-16">
        <div className="mx-auto max-w-(--page-max-width) space-y-10 text-center">
          <p className="text-body-sm font-medium tracking-[0.02em] text-impossible-red uppercase">
            ◂ Flex On Everyone At ▸
          </p>
          <h2 className="text-heading-lg font-bold text-impossible-red uppercase">
            The Potluck
          </h2>
          <FilterPills options={FILTERS} active={filter} onChange={setFilter} />

          <div className="grid gap-6 sm:grid-cols-3">
            {["St.Charlie Burger", "Loaded Smash Tacos", "Backyard Dogs"].map(
              (title) => (
                <article
                  key={title}
                  className="rounded-cards border border-butcher-black bg-burgundy-stage p-6 text-left"
                >
                  <div className="aspect-video rounded-cards bg-impossible-red/15" />
                  <h3 className="mt-4 text-xl font-bold tracking-[0.02em] text-blush-highlight uppercase">
                    {title}
                  </h3>
                  <PrimaryCta label="Get Recipe" className="mt-4" />
                </article>
              ),
            )}
          </div>
        </div>
      </section>

      {/* ====================== FOOTER / CTA BAND ====================== */}
      <footer className="bg-butcher-black px-6 py-16">
        <div className="mx-auto max-w-(--page-max-width) space-y-8 text-center">
          <h2 className="text-heading-lg font-bold text-impossible-red uppercase">
            Eat Meat.
            <br />
            <span className="text-bone-white">Save The Planet.</span>
          </h2>
          <div className="flex items-center justify-center gap-3">
            <PrimaryCta label="Find Us" />
            <GhostCta label="Foodservice" />
          </div>
          <p className="text-caption tracking-[0.02em] text-bone-white/50 uppercase">
            © 2026 Impossible Foods — Style reference prototype. All rights reserved.
          </p>
        </div>
      </footer>
    </main>
  );
}
