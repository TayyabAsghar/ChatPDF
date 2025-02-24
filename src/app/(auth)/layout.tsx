import { Suspense } from "react";
import { ClerkLoaded } from "@clerk/nextjs";
import LoadingScreen from "@/components/LoadingScreen";

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <ClerkLoaded>
      <main className="flex-1 flex justify-center items-center p-2 lg:p-5 bg-gradient-to-bl from-white to-indigo-600 overflow-auto">
        <Suspense fallback={<LoadingScreen />}>{children}</Suspense>
      </main>
    </ClerkLoaded>
  );
};

export default RootLayout;
