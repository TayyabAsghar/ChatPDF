"use client";

import Link from "next/link";
import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Loader2Icon, StarIcon } from "lucide-react";
import useSubscription from "@/hooks/useSubscription";
import CreateStripePortal from "@/actions/CreateStripePortal";

const UpgradeButton = () => {
  const router = useRouter();
  const [isPending, startTransitions] = useTransition();
  const { hasActiveMembership, loading } = useSubscription();

  const handleAccount = () => {
    startTransitions(async () => {
      const stripePortalUrl = await CreateStripePortal();
      router.push(stripePortalUrl);
    });
  };

  if (loading)
    return (
      <Button variant="default" className="border-indigo-600">
        <Loader2Icon className="animate-spin" />
      </Button>
    );

  if (!hasActiveMembership)
    return (
      <Button asChild variant="default" className="border-indigo-600">
        <Link href="/upgrade">
          Upgrade <StarIcon className="ml-3 fill-indigo-600 text-white" />
        </Link>
      </Button>
    );

  return (
    <Button
      variant="default"
      disabled={isPending}
      onClick={handleAccount}
      className="border-indigo-600 bg-indigo-600"
    >
      {isPending ? (
        <Loader2Icon className="animate-spin" />
      ) : (
        <p>
          <span className="font-extrabold">PRO</span> Account
        </p>
      )}
    </Button>
  );
};

export default UpgradeButton;
