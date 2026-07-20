import { NextResponse } from "next/server";
import { verifyRazorpaySignature } from "@/lib/payments/razorpay";
import type { CheckoutCustomer } from "@/lib/checkout";
import type { CartItem } from "@/types";

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
      totals: { subtotal: number; shipping: number; total: number };
    };

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return NextResponse.json({ error: "Missing payment details" }, { status: 400 });
    }

    const valid = verifyRazorpaySignature(
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature
    );

    if (!valid) {
      return NextResponse.json({ error: "Payment verification failed" }, { status: 400 });
    }

    const order = {
      orderId: razorpay_order_id,
      paymentId: razorpay_payment_id,
      customer,
      items,
      totals,
      status: "paid",
      createdAt: new Date().toISOString(),
    };

    console.info("[checkout/verify] Order confirmed:", order);

    return NextResponse.json({ success: true, order });
  } catch (error) {
    console.error("[checkout/verify]", error);
    return NextResponse.json({ error: "Verification failed" }, { status: 500 });
  }
}
