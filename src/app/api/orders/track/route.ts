import { NextResponse } from "next/server";
import { lookupOrderForCustomer, orderStatusLabel } from "@/lib/orders";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const trackingCode = String(body.trackingCode || "").trim();
    const email = String(body.email || "").trim();
    const phone = String(body.phone || "").trim();

    if (!trackingCode) {
      return NextResponse.json(
        { error: "Enter your tracking code (e.g. ARK-A7K2M9)" },
        { status: 400 }
      );
    }

    if (!email && !phone) {
      return NextResponse.json(
        { error: "Enter the email or phone used at checkout" },
        { status: 400 }
      );
    }

    const order = await lookupOrderForCustomer({
      trackingCode,
      email: email || undefined,
      phone: phone || undefined,
    });

    if (!order) {
      return NextResponse.json(
        {
          error:
            "Order not found. Check the tracking code and use the same email or phone from checkout.",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      trackingCode: order.trackingCode,
      status: order.status,
      statusLabel: orderStatusLabel(order.status),
      paidAt: order.paidAt,
      customerName: order.customerName,
      items: order.items.map((item) => ({
        name: item.name,
        size: item.size,
        frame: item.frame,
        quantity: item.quantity,
        price: item.price,
      })),
      subtotal: order.subtotal,
      shipping: order.shipping,
      total: order.total,
      courierTracking: order.courierTracking || null,
      city: order.city,
      state: order.state,
      pincode: order.pincode,
    });
  } catch (error) {
    console.error("[orders/track]", error);
    return NextResponse.json({ error: "Could not look up order" }, { status: 500 });
  }
}
