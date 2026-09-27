import {
  Truck,
  ShieldCheck,
  RotateCcw,
  Sparkles,
  ChevronDown,
  type LucideIcon,
} from "lucide-react";

interface AnnouncementMessage {
  icon: LucideIcon;
  text: string;
}

const messages: AnnouncementMessage[] = [
  { icon: Truck, text: "Free Shipping on Orders Over $100" },
  {
    icon: ShieldCheck,
    text: "100% Authentic, Sourced Directly From Every House",
  },
  { icon: RotateCcw, text: "Easy Returns Within 30 Days" },
  { icon: Sparkles, text: "New Arrivals Added Every Week" },
];

function TickerTrack({ ariaHidden = false }: { ariaHidden?: boolean }) {
  return (
    <div
      className="flex shrink-0 items-center gap-10 pr-10"
      aria-hidden={ariaHidden}
    >
      {messages.map((message, index) => (
        <span
          key={index}
          className="flex items-center gap-2.5 whitespace-nowrap"
        >
          <message.icon
            size={13}
            strokeWidth={1.5}
            className="text-gold shrink-0"
          />
          <span className="text-[11px] tracking-wide2 text-ivory/75">
            {message.text}
          </span>
        </span>
      ))}
    </div>
  );
}

export function AnnouncementBar() {
  return (
    <div className="relative bg-charcoal text-ivory border-b border-ivory/10">
      <div className="flex h-10 items-center">
        <div className="group flex-1 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_40px,black_calc(100%-40px),transparent)]">
          <div className="flex w-max animate-marquee group-hover:[animation-play-state:paused] motion-reduce:animate-none">
            <TickerTrack />
            <TickerTrack ariaHidden />
          </div>
        </div>

        <div className="hidden md:flex items-center gap-4 pl-6 pr-5 text-[11px] text-ivory/60 border-l border-ivory/10 shrink-0">
          <button
            type="button"
            className="focus-ring flex items-center gap-1 tracking-wide hover:text-ivory transition-colors"
          >
            USD
            <ChevronDown size={11} strokeWidth={1.5} />
          </button>
          <span className="h-3 w-px bg-ivory/15" />
          <button
            type="button"
            className="focus-ring flex items-center gap-1 tracking-wide hover:text-ivory transition-colors"
          >
            English
            <ChevronDown size={11} strokeWidth={1.5} />
          </button>
        </div>
      </div>
    </div>
  );
}
