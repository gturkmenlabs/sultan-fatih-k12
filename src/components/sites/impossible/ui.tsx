import { cn } from "@/lib/utils";

/* Sticky top navigation — solid butcher-black anchor bar */
export function TopNav() {
  return (
    <header className="sticky top-0 z-50 w-full bg-butcher-black">
      <nav className="mx-auto flex h-14 max-w-(--page-max-width) items-center justify-between px-6">
        <a
          href="#"
          className="font-meat-display text-lg tracking-[0.02em] text-impossible-red uppercase"
        >
          Impossible
        </a>

        <ul className="hidden items-center gap-6 text-body-sm font-medium text-bone-white uppercase md:flex">
          {["Foods", "Recipes", "Impact", "Story"].map((item) => (
            <li key={item} className="flex items-center gap-1 opacity-80 transition-opacity hover:opacity-100">
              {item}
              <svg width="10" height="6" viewBox="0 0 10 6" fill="none" aria-hidden>
                <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <a
            href="#products"
            className="hidden text-body-sm font-medium tracking-[0.02em] text-bone-white uppercase opacity-80 transition-opacity hover:opacity-100 sm:block"
          >
            Foodservice
          </a>
          <a
            href="#find-us"
            className="bg-impossible-red text-bone-white text-body-sm font-medium tracking-[0.02em] uppercase rounded-pills px-4 py-2.5"
          >
            Find Us
          </a>
        </div>
      </nav>
    </header>
  );
}

/* Primary filled CTA — impossible-red, bone text, caret arrow */
export function PrimaryCta({
  label,
  className,
}: {
  label: string;
  className?: string;
}) {
  return (
    <a
      href="#"
      className={cn(
        "inline-flex items-center gap-1.5 rounded-pills bg-impossible-red px-4 py-2.5 text-body-sm font-medium tracking-[0.02em] text-bone-white uppercase",
        className,
      )}
    >
      {label}
      <CaretArrow />
    </a>
  );
}

/* Ghost CTA — transparent, white hairline border */
export function GhostCta({
  label,
  withPin = false,
  className,
}: {
  label: string;
  withPin?: boolean;
  className?: string;
}) {
  return (
    <a
      href="#"
      className={cn(
        "inline-flex items-center gap-1.5 rounded-pills border border-bone-white px-4 py-2.5 text-body-sm font-medium tracking-[0.02em] text-bone-white uppercase",
        className,
      )}
    >
      {withPin ? <PinIcon /> : null}
      {label}
      <CaretArrow />
    </a>
  );
}

function CaretArrow() {
  return (
    <svg width="8" height="10" viewBox="0 0 8 10" fill="none" aria-hidden>
      <path d="M2 1l4 4-4 4" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

function PinIcon() {
  return (
    <svg width="12" height="14" viewBox="0 0 12 14" fill="none" aria-hidden>
      <path
        d="M6 1a4.5 4.5 0 0 0-4.5 4.5C1.5 8.75 6 13 6 13s4.5-4.25 4.5-7.5A4.5 4.5 0 0 0 6 1Z"
        stroke="currentColor"
        strokeWidth="1.3"
      />
      <circle cx="6" cy="5.5" r="1.5" stroke="currentColor" strokeWidth="1.3" />
    </svg>
  );
}
