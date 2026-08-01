import { BRAND } from "@/lib/constants";
import { formatPrice } from "@/lib/utils";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import type { SavedOrder } from "@/lib/orders";

function orderSummaryText(order: SavedOrder): string {
  const lines = order.items.map(
    (item) =>
      `• ${item.name} (${item.size}${item.frame ? `, ${item.frame}` : ""}) ×${item.quantity} — ${formatPrice(item.price * item.quantity)}`
  );

  return [
    `🛒 New ARK order ${order.trackingCode}`,
    ``,
    `Customer: ${order.customerName}`,
    `Phone: ${order.customerPhone}`,
    `Email: ${order.customerEmail}`,
    `Address: ${order.shippingAddress}, ${order.city}, ${order.state} ${order.pincode}`,
    ``,
    `Items:`,
    ...lines,
    ``,
    `Total: ${formatPrice(order.total)}`,
    `Payment: ${order.razorpayPaymentId}`,
    ``,
    `Open in Studio → Shop Orders`,
  ].join("\n");
}

/** WhatsApp deep link so you can open a chat with yourself/team about the order */
export function ownerWhatsAppNotifyUrl(order: SavedOrder): string {
  return buildWhatsAppUrl(orderSummaryText(order));
}

async function notifyViaWebhook(order: SavedOrder, text: string) {
  const url = process.env.ORDER_NOTIFY_WEBHOOK;
  if (!url) return;

  await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      type: "order.paid",
      trackingCode: order.trackingCode,
      total: order.total,
      customer: {
        name: order.customerName,
        email: order.customerEmail,
        phone: order.customerPhone,
      },
      text,
      whatsappUrl: ownerWhatsAppNotifyUrl(order),
      order,
    }),
  });
}

async function notifyViaResend(order: SavedOrder, text: string) {
  const key = process.env.RESEND_API_KEY;
  if (!key) return;

  const to = process.env.ORDER_NOTIFY_EMAIL || BRAND.email;

  await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: process.env.ORDER_NOTIFY_FROM || "ARK Orders <onboarding@resend.dev>",
      to: [to],
      subject: `New order ${order.trackingCode} — ${formatPrice(order.total)}`,
      text,
    }),
  });
}

/**
 * Notify shop owner of a paid order.
 * Always logs. Optionally emails (RESEND_API_KEY) and/or hits ORDER_NOTIFY_WEBHOOK.
 */
export async function notifyOwnerNewOrder(order: SavedOrder): Promise<void> {
  const text = orderSummaryText(order);
  console.info("[order/notify]", text);
  console.info("[order/notify] WhatsApp draft:", ownerWhatsAppNotifyUrl(order));

  await Promise.allSettled([
    notifyViaWebhook(order, text),
    notifyViaResend(order, text),
  ]);
}
