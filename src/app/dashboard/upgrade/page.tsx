"use client";

import { useUser } from "@clerk/nextjs";
import { CheckIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useTransition } from "react";
import { Button } from "@/components/ui/button";
import useSubscriptions from "@/hooks/useSubscriptions";

export type UserDetails = {
  email: string;
  name: string;
};

const UpgradePage = () => {
  const { user } = useUser();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const { hasActiveMembership, loading } = useSubscriptions();

  const handleUpgrade = () => {
    if (!user) return;

    const userDetails: UserDetails = {
      email: user.primaryEmailAddress?.toString() || "",
      name: user.fullName || "",
    };

    startTransition(async () => {});
  };

  const FeatureList = ({ features }: { features: string[] }) => {
    return (
      <ul
        role="list"
        className="mt-8 space-y-3 text-sm leading-6 text-gray-600"
      >
        {features.map((feature, index) => (
          <li key={index} className="flex gap-x-3">
            <CheckIcon className="h-6 w-5 flex-none text-indigo-600" />
            {feature}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div>
      <div className="py-24 sm:py-32">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-base font-semibold leading-7 text-indigo-600">
            Pricing
          </h2>
          <p className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Supercharge your Document Companion
          </p>
        </div>

        <p className="mx-auto mt-6 max-w-2xl px-10 text-center text-lg leading-8 text-gray-600">
          Choose an affordable plan that&apos;s packed with the best features
          for interacting with your PDFs, enhancing productivity, and
          streamlining your workflow.
        </p>

        <div className="max-w-md mx-auto m-10 grid grid-col-1 gap-8 md:grid-cols-2 md:max-w-2xl lg:max-w-4xl">
          <div className="ring-1 ring-gray-200 p-8 h-fit pb-12 rounded-3xl">
            <h3 className="text-lg font-semibold leading-8 text-gray-900">
              Starter Plan
            </h3>
            <p className="mt-4 text-sm leading-6 text-gray-600">
              Explore Core Features at No Cost
            </p>
            <p className="mt-6 flex items-baseline gap-x-1">
              <span className="text-4xl font-bold tracking-tight text-gray-900">
                Free
              </span>
            </p>

            <FeatureList
              features={[
                "2 Documents",
                "Up to 3 messages per document",
                "Try out the AI Chat Functionality",
              ]}
            />
          </div>

          <div className="ring-2 ring-indigo-600 rounded-3xl p-8">
            <h3 className="text-lg font-semibold leading-8 text-indigo-600">
              Pro Plan
            </h3>
            <p className="mt-4 text-sm leading-6 text-gray-600">
              Maximize Productivity with PRO Features
            </p>
            <p className="mt-6 flex items-baseline gap-x-1">
              <span className="text-4xl font-bold tracking-tight text-gray-900">
                $5.99
              </span>
              <span className="text-sm font-semibold leading-6 text-gray-600">
                / month
              </span>
            </p>

            <Button
              className="bg-indigo-600 w-full text-white shadow-sm hover:bg-indigo-500 mt-6 block rounded-md px-3 py-2 text-center 
            text-sm font-semibold leading-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 
            focus-visible:outline-indigo-600"
              disabled={loading || isPending}
              onClick={handleUpgrade}
            >
              {loading || isPending
                ? "Loading..."
                : hasActiveMembership
                ? "Manage Plan"
                : "Upgrade to Pro"}
            </Button>

            <FeatureList
              features={[
                "Store upto 20 Documents",
                "Ability to Delete Documents",
                "Upto 100 messages per document",
                "Full Power AI Chat Functionality with Memory Recall",
                "Advance Analytics",
                "24/7 Support Response Time",
              ]}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpgradePage;
