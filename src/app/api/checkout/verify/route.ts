import { NextResponse } from "next/server";
import { verifyRazorpaySignature } from "@/lib/payments/razorpay";
import type { CheckoutCustomer, CheckoutTotals } from "@/lib/checkout";
import type { CartItem } from "@/types";
import { createPaidOrder } from "@/lib/orders";
import { notifyOwnerNewOrder, ownerWhatsAppNotifyUrl } from "@/lib/orders/notify";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      customer,
      items,
      totals,
    } = body as {
      razorpay_order_id: string;
      razorpay_payment_id: string;
      razorpay_signature: string;
      customer: CheckoutCustomer;
      items: CartItem[];
      totals: CheckoutTotals;
    };

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return NextResponse.json({ error: "Missing payment details" }, { status: 400 });
    }

    if (!customer?.name || !customer.email || !items?.length || !totals) {
      return NextResponse.json({ error: "Missing order details" }, { status: 400 });
    }

    const valid = verifyRazorpaySignature(
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature
    );

    if (!valid) {
      return NextResponse.json({ error: "Payment verification failed" }, { status: 400 });
    }

    const order = await createPaidOrder({
      razorpayOrderId: razorpay_order_id,
      razorpayPaymentId: razorpay_payment_id,
      customer,
      items,
      totals,
    });

    // Fire-and-forget owner alerts (Sanity is source of truth)
    void notifyOwnerNewOrder(order).catch((err) => {
      console.error("[checkout/verify] notify failed:", err);
    });

    return NextResponse.json({
      success: true,
      order: {
        trackingCode: order.trackingCode,
        orderId: order.razorpayOrderId,
        paymentId: order.razorpayPaymentId,
        total: order.total,
        status: order.status,
        ownerWhatsAppUrl: ownerWhatsAppNotifyUrl(order),
      },
    });
  } catch (error) {
    console.error("[checkout/verify]", error);
    const message =
      error instanceof Error ? error.message : "Verification failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
