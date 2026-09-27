import { ServiceFeature } from "@/types";

export const serviceFeatures: ServiceFeature[] = [
  {
    id: "shipping",
    label: "Free & Fast Shipping",
    description: "On all orders over $100",
    icon: "truck",
  },
  {
    id: "authentic",
    label: "100% Authentic Products",
    description: "Sourced directly from authorised brands",
    icon: "shield-check",
  },
  {
    id: "payment",
    label: "Secure Payment",
    description: "Encrypted checkout, every time",
    icon: "lock",
  },
  {
    id: "returns",
    label: "Easy Returns",
    description: "Hassle-free within 30 days",
    icon: "rotate-ccw",
  },
];
