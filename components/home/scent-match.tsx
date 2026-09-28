import Link from "next/link";
import { ArrowRight, Sparkle } from "lucide-react";

const SCENT_MATCH_HREF = "/scent-match";

const steps = [
  { id: "mood", label: "Mood & occasion" },
  { id: "weather", label: "Weather" },
  { id: "notes", label: "Notes you love" },
] as const;

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3">
      <span
        aria-hidden
        className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-red-50 text-red-600 ring-1 ring-red-100"
      >
        <Sparkle size={16} strokeWidth={0} fill="currentColor" />
      </span>
      <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-red-600">
        {children}
      </p>
    </div>
  );
}

function StepChip({ id, label }: { id: string; label: string }) {
  return (
    <Link
      href={`${SCENT_MATCH_HREF}?start=${id}`}
      className="focus-ring inline-flex items-center rounded-full border border-ink/10 bg-white/80 px-4 py-2 text-xs font-medium text-ink/80 backdrop-blur transition-colors duration-200 hover:border-red-200 hover:bg-red-50 hover:text-ink"
    >
      {label}
    </Link>
  );
}

export function ScentMatch() {
  return (
    <section aria-labelledby="scent-match-title" className="py-10 lg:py-14">
      <div className="container-page">
        <div className="relative overflow-hidden rounded-[28px] border border-ink/[0.06] bg-gradient-to-br from-white via-white to-neutral-50 px-6 py-8 shadow-[0_1px_0_rgba(255,255,255,0.8)_inset,0_24px_60px_-32px_rgba(20,20,20,0.18)] sm:px-10 sm:py-10 lg:px-12 lg:py-12">
          {/* Decorative red glow + faint rings, top right */}
          <div
            aria-hidden
            className="pointer-events-none absolute -right-24 -top-28 h-[420px] w-[420px] rounded-full bg-red-200/50 blur-3xl"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -right-16 -top-16 hidden h-[360px] w-[360px] rounded-full border border-red-200/60 sm:block"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -right-2 top-0 hidden h-[240px] w-[240px] rounded-full border border-red-200/50 sm:block"
          />

          <div className="relative max-w-xl">
            <Eyebrow>Signature scent match · 30 seconds</Eyebrow>

            <h2
              id="scent-match-title"
              className="mt-7 text-[30px] leading-[1.15] tracking-tight text-ink sm:text-[38px]"
            >
              <span className="block font-light">Not sure which perfume</span>
              <span className="block font-medium">actually suits you?</span>
            </h2>

            <p className="mt-5 max-w-[46ch] text-[15px] leading-relaxed text-ink/60">
              Answer a few taps about your mood, weather and favourite notes —
              we rank every decant we stock and show your closest matches.
            </p>

            <ul className="mt-6 flex flex-wrap gap-2.5">
              {steps.map((step) => (
                <li key={step.id}>
                  <StepChip id={step.id} label={step.label} />
                </li>
              ))}
            </ul>

            <Link
              href={SCENT_MATCH_HREF}
              className="focus-ring group mt-8 inline-flex items-center gap-3 rounded-full bg-ink px-7 py-4 text-xs font-semibold uppercase tracking-[0.12em] text-ivory shadow-[0_12px_28px_-12px_rgba(0,0,0,0.5)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-charcoal"
            >
              Guide me to my fragrance
              <ArrowRight
                size={16}
                strokeWidth={1.75}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
