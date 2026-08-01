import { writeClient, client } from "@/sanity/lib/client";
import type { CheckoutCustomer, CheckoutTotals } from "@/lib/checkout";
import type { CartItem } from "@/types";

export type OrderStatus =
  | "paid"
  | "making"
  | "shipped"
  | "delivered"
  | "cancelled";

export interface SavedOrder {
  id: string;
  trackingCode: string;
  status: OrderStatus;
  razorpayOrderId: string;
  razorpayPaymentId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  shippingAddress: string;
  city: string;
  state: string;
  pincode: string;
  items: Array<{
    slug: string;
    name: string;
    size: string;
    frame?: string;
    quantity: number;
    price: number;
    image?: string;
  }>;
  subtotal: number;
  shipping: number;
  total: number;
  courierTracking?: string;
  notes?: string;
  paidAt: string;
}

const STATUS_LABELS: Record<OrderStatus, string> = {
  paid: "Payment received",
  making: "Being crafted",
  shipped: "Shipped",
  delivered: "Delivered",
  cancelled: "Cancelled",
};

export function orderStatusLabel(status: string): string {
  return STATUS_LABELS[status as OrderStatus] ?? status;
}

export function generateTrackingCode(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let code = "";
  for (let i = 0; i < 6; i++) {
    code += chars[Math.floor(Math.random() * chars.length)];
  }
  return `ARK-${code}`;
}

function normalizePhone(phone: string): string {
  return phone.replace(/\D/g, "").slice(-10);
}

function phonesMatch(a: string, b: string): boolean {
  const na = normalizePhone(a);
  const nb = normalizePhone(b);
  return na.length >= 10 && na === nb;
}

export async function findOrderByRazorpayOrderId(
  razorpayOrderId: string
): Promise<SavedOrder | null> {
  const doc = await writeClient.fetch(
    `*[_type == "order" && razorpayOrderId == $id][0]{
      "id": _id,
      trackingCode,
      status,
      razorpayOrderId,
      razorpayPaymentId,
      customerName,
      customerEmail,
      customerPhone,
      shippingAddress,
      city,
      state,
      pincode,
      items[]{ slug, name, size, frame, quantity, price, image },
      subtotal,
      shipping,
      total,
      courierTracking,
      notes,
      paidAt
    }`,
    { id: razorpayOrderId }
  );
  return doc ?? null;
}

export async function createPaidOrder(input: {
  razorpayOrderId: string;
  razorpayPaymentId: string;
  customer: CheckoutCustomer;
  items: CartItem[];
  totals: CheckoutTotals;
}): Promise<SavedOrder> {
  const existing = await findOrderByRazorpayOrderId(input.razorpayOrderId);
  if (existing) return existing;

  if (!process.env.SANITY_API_TOKEN) {
    throw new Error("SANITY_API_TOKEN is required to save orders");
  }

  let trackingCode = generateTrackingCode();
  // Extremely unlikely collision — retry once
  const clash = await writeClient.fetch(
    `count(*[_type == "order" && trackingCode == $code])`,
    { code: trackingCode }
  );
  if (clash > 0) trackingCode = generateTrackingCode();

  const paidAt = new Date().toISOString();
  const doc = {
    _type: "order" as const,
    trackingCode,
    status: "paid" as const,
    razorpayOrderId: input.razorpayOrderId,
    razorpayPaymentId: input.razorpayPaymentId,
    customerName: input.customer.name.trim(),
    customerEmail: input.customer.email.trim().toLowerCase(),
    customerPhone: input.customer.phone.trim(),
    shippingAddress: input.customer.address.trim(),
    city: input.customer.city.trim(),
    state: input.customer.state.trim(),
    pincode: input.customer.pincode.trim(),
    items: input.items.map((item) => ({
      _type: "orderItem",
      _key: `${item.slug}-${item.size}-${item.frame || "frame"}`,
      slug: item.slug,
      name: item.name,
      size: item.size,
      frame: item.frame,
      quantity: item.quantity,
      price: item.price,
      image: item.image,
    })),
    subtotal: input.totals.subtotal,
    shipping: input.totals.shipping,
    total: input.totals.total,
    paidAt,
  };

  const created = await writeClient.create(doc);

  return {
    id: created._id,
    trackingCode,
    status: "paid",
    razorpayOrderId: input.razorpayOrderId,
    razorpayPaymentId: input.razorpayPaymentId,
    customerName: doc.customerName,
    customerEmail: doc.customerEmail,
    customerPhone: doc.customerPhone,
    shippingAddress: doc.shippingAddress,
    city: doc.city,
    state: doc.state,
    pincode: doc.pincode,
    items: input.items.map((item) => ({
      slug: item.slug,
      name: item.name,
      size: item.size,
      frame: item.frame,
      quantity: item.quantity,
      price: item.price,
      image: item.image,
    })),
    subtotal: input.totals.subtotal,
    shipping: input.totals.shipping,
    total: input.totals.total,
    paidAt,
  };
}

/** Public track lookup — requires tracking code + email or phone */
export async function lookupOrderForCustomer(input: {
  trackingCode: string;
  email?: string;
  phone?: string;
}): Promise<SavedOrder | null> {
  const code = input.trackingCode.trim().toUpperCase();
  if (!code) return null;

  const doc = await client.fetch(
    `*[_type == "order" && trackingCode == $code][0]{
      "id": _id,
      trackingCode,
      status,
      razorpayOrderId,
      razorpayPaymentId,
      customerName,
      customerEmail,
      customerPhone,
      shippingAddress,
      city,
      state,
      pincode,
      items[]{ slug, name, size, frame, quantity, price, image },
      subtotal,
      shipping,
      total,
      courierTracking,
      paidAt
    }`,
    { code }
  );

  if (!doc) return null;

  const email = input.email?.trim().toLowerCase();
  const phone = input.phone?.trim();
  const emailOk = email && email === doc.customerEmail;
  const phoneOk = phone && phonesMatch(phone, doc.customerPhone);

  if (!emailOk && !phoneOk) return null;

  return doc as SavedOrder;
}
