import type { ContactInfoItem, SocialLink } from "@/types/blog";

const PHONE_LABEL = "+880 1795-594222";
const PHONE_TEL = "+8801795594222";
const FACEBOOK_URL = "https://www.facebook.com/perfumesyndicatebd";
const INSTAGRAM_URL = "https://www.instagram.com/syndicateperfume";
const WHATSAPP_URL = "https://wa.me/8801795594222";

export const contactItems: readonly ContactInfoItem[] = [
  { id: "phone", icon: "phone", label: PHONE_LABEL, href: `tel:${PHONE_TEL}` },
  { id: "whatsapp", icon: "whatsapp", label: PHONE_LABEL, href: WHATSAPP_URL },
  { id: "facebook", icon: "facebook", label: "PERFUME SYNDICATE", href: FACEBOOK_URL },
  { id: "instagram", icon: "instagram", label: "SYNDICATEPERFUME", href: INSTAGRAM_URL },
  {
    id: "email",
    icon: "mail",
    label: "PERFUMESYNDICATEBD@GMAIL.COM",
    href: "mailto:perfumesyndicatebd@gmail.com",
  },
  { id: "location", icon: "map-pin", label: "BANGLADESH" },
];

export const socialLinks: readonly SocialLink[] = [
  { id: "facebook", label: "Facebook", href: FACEBOOK_URL },
  { id: "instagram", label: "Instagram", href: INSTAGRAM_URL },
  { id: "whatsapp", label: "WhatsApp", href: WHATSAPP_URL },
];
