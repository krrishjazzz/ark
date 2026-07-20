import { NextResponse } from "next/server";
import { calculateCartTotals, type CheckoutCustomer } from "@/lib/checkout";
import {
  getRazorpayClient,
  getRazorpayPublicKey,
  isRazorpayConfigured,
} from "@/lib/payments/razorpay";
import { validateAndPriceCart } from "@/lib/payments/validate-cart";

export async function POST(req: Request) {
  try {
    if (!isRazorpayConfigured()) {
      return NextResponse.json(
        {
          error:
            "Payment is not configured. Add RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET to .env.local",
        },
        { status: 503 }
      );
    }

    const body = await req.json();
    const customer = body.customer as CheckoutCustomer | undefined;
    const items = body.items;

    if (!customer?.name || !customer.email || !customer.phone || !customer.address) {
      return NextResponse.json({ error: "Missing customer details" }, { status: 400 });
    }

    const cartItems = await validateAndPriceCart(items);
    const totals = calculateCartTotals(cartItems);

    const razorpay = getRazorpayClient();
    if (!razorpay) {
      return NextResponse.json({ error: "Payment provider unavailable" }, { status: 503 });
    }

    const order = await razorpay.orders.create({
      amount: totals.total * 100,
      currency: "INR",
      receipt: `ark_${Date.now()}`,
      notes: {
        customer_name: customer.name,
        customer_email: customer.email,
        customer_phone: customer.phone,
        items: JSON.stringify(
          cartItems.map((item) => ({
            slug: item.slug,
            name: item.name,
            size: item.size,
            frame: item.frame,
            quantity: item.quantity,
            price: item.price,
          }))
        ),
      },
    });

    return NextResponse.json({
      orderId: order.id,
      amount: totals.total,
      currency: "INR",
      keyId: getRazorpayPublicKey(),
      totals,
      items: cartItems,
      customer,
    });
  } catch (error) {
    console.error("[checkout/create-order]", error);
    const message = error instanceof Error ? error.message : "Failed to create order";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
