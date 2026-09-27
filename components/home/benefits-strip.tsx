import { Truck, ShieldCheck, Lock, RotateCcw } from "lucide-react";
import { serviceFeatures } from "@/data/services";
import type { ServiceFeature } from "@/types";

const icons: Record<ServiceFeature["icon"], typeof Truck> = {
  truck: Truck,
  "shield-check": ShieldCheck,
  lock: Lock,
  "rotate-ccw": RotateCcw,
};

export function BenefitsStrip() {
  return (
    <section className="border-y border-border bg-surface-2/40">
      <div className="container-page grid grid-cols-2 gap-y-8 py-10 lg:grid-cols-4 lg:gap-4">
        {serviceFeatures.map((feature) => {
          const Icon = icons[feature.icon];
          return (
            <div key={feature.id} className="flex items-center gap-4">
              <Icon size={22} strokeWidth={1.25} className="shrink-0 text-accent" />
              <div>
                <p className="text-sm text-ink">{feature.label}</p>
                <p className="text-xs text-ink-soft mt-0.5">{feature.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
