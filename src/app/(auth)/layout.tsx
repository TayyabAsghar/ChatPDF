import { ClerkLoaded } from "@clerk/nextjs";

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <ClerkLoaded>
      <main className="flex-1 flex justify-center items-center p-2 lg:p-5 bg-gradient-to-bl from-white to-indigo-600 overflow-auto">
        {children}
      </main>
    </ClerkLoaded>
  );
};

export default RootLayout;
