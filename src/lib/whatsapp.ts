import { BRAND } from "@/lib/constants";

export function buildWhatsAppUrl(message: string): string {
  const text = encodeURIComponent(message);
  return `${BRAND.whatsapp}?text=${text}`;
}

export function buildProductEnquiryMessage(productName: string, comingSoon = false): string {
  const intent = comingSoon
    ? "I'm interested in this upcoming piece"
    : "I'd like to enquire about purchasing";

  return `Hi ARK! ${intent}:\n\n*${productName}*\n\nPlease share availability and details.`;
}
