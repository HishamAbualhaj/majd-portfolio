// Set to a local image path, e.g. "/images/majd.jpg", when the portrait is ready.
export const author: {
  portraitSrc: string | null;
  socials: Record<"instagram" | "whatsapp" | "facebook", string | null>;
} = {
  portraitSrc: null,
  // Use full profile URLs; WhatsApp uses https://wa.me/<international number>.
  socials: { instagram: null, whatsapp: null, facebook: null },
};
