"use server";

import stripe from "@/lib/stripe/stripe";
import getBaseUrl from "@/lib/getBaseUrl";
import { auth } from "@clerk/nextjs/server";
import { getUserData } from "@/lib/firebase/firebaseFunctions";

const CreateStripePortal = async () => {
  await auth.protect();

  const { userId } = await auth();

  if (!userId) throw new Error("User not found.");

  const userData = await getUserData(userId);
  const stripeCustomerId = userData?.stripeCustomerId;

  if (!stripeCustomerId) throw new Error("Stripe customer not found.");

  const session = await stripe.billingPortal.sessions.create({
    customer: stripeCustomerId,
    return_url: `${getBaseUrl()}/dashboard`,
  });

  return session.url;
};

export default CreateStripePortal;
