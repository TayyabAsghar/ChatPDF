import { Suspense } from "react";
import Header from "@/components/Header";
import { ClerkLoaded } from "@clerk/nextjs";
import { Toaster } from "@/components/ui/toaster";
import LoadingScreen from "@/components/LoadingScreen";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <ClerkLoaded>
      <div className="flex-1 flex flex-col h-screen">
        <Suspense fallback={<LoadingScreen />}>
          <Header />
          <main className="flex-1 overflow-y-auto">
            <Toaster />
            {children}
          </main>
        </Suspense>
      </div>
    </ClerkLoaded>
  );
};

export default DashboardLayout;
