import Header from "@/components/Header";
import { ClerkLoaded } from "@clerk/nextjs";
import { Toaster } from "@/components/ui/toaster";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <ClerkLoaded>
      <div className="flex-1 flex flex-col h-screen">
        <Header />
        <main className="flex-1 overflow-y-auto">
          <Toaster />
          {children}
        </main>
      </div>
    </ClerkLoaded>
  );
};

export default DashboardLayout;
