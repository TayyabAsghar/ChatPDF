import Stripe from "stripe";
import { headers } from "next/headers";
import stripe from "@/lib/stripe/stripe";
import { NextRequest, NextResponse } from "next/server";
import {
  updateUserData,
  getUserByProperty,
} from "@/lib/firebase/firebaseFunctions";

export const POST: (req: NextRequest) => Promise<NextResponse> = async (
  req
) => {
  const body = await req.text();
  const headersList = await headers();
  const signature = headersList.get("stripe-signature");

  if (!signature)
    return new NextResponse("No stripe signature.", { status: 400 });

  if (!process.env.STRIPE_WEBHOOK_SECRET)
    return new NextResponse("Stripe webhook secret is not set.", {
      status: 400,
    });

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    return new NextResponse(`Webhook Error: ${err}`, { status: 400 });
  }

  switch (event.type) {
    case "checkout.session.completed":
    case "payment_intent.succeeded": {
      const invoice = event.data.object;
      const customerId = invoice.customer as string;
      const userDetails = await getUserByProperty(
        customerId,
        "stripeCustomerId",
        "=="
      );

      if (!userDetails?.id)
        return new NextResponse("User not found.", { status: 404 });

      await updateUserData(
        userDetails.id,
        { hasActiveMembership: true },
        { merge: true }
      );
      break;
    }
  }

  return NextResponse.json({ message: "Webhook received" });
};
