"use server";

import stripe from "@/lib/stripe/stripe";
import getBaseURL from "@/lib/getBaseUrl";
import { auth } from "@clerk/nextjs/server";
import { UserDetails } from "@/app/upgrade/page";
import { getUserData, setUserData } from "@/lib/firebase/firebaseFunctions";

const CreateCheckoutSession = async (userDetails: UserDetails) => {
  const { userId } = await auth();

  if (!userId) throw new Error("User not found");

  let stripeCustomerId;

  stripeCustomerId = (await getUserData(userId))?.stripeCustomerId;

  if (!stripeCustomerId) {
    const newCustomer = await stripe.customers.create({
      email: userDetails.email,
      name: userDetails.name,
      metadata: { userId },
    });

    await setUserData(userId, { stripeCustomerId: newCustomer.id });
    stripeCustomerId = newCustomer.id;
  }

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [
      {
        quantity: 1,
        price: process.env.STRIPE_PRO_PLAN_ID,
      },
    ],
    mode: "subscription",
    customer: stripeCustomerId,
    success_url: `${getBaseURL()}/dashboard?upgrade=true`,
    cancel_url: `${getBaseURL()}/upgrade`,
  });

  return session.id;
};

export default CreateCheckoutSession;
