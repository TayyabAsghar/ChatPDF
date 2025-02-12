import Link from "next/link";
import { FilePlus2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SignedIn, UserButton } from "@clerk/nextjs";

const Header = () => {
  return (
    <div className="flex justify-between bg-white shadow-sm p-5 border-b">
      <Link className="text-2xl" href="/dashboard">
        Chat <span className="text-indigo-600">PDF</span>
      </Link>

      <SignedIn>
        <div className="flex items-center gap-2">
          <Button
            className="hidden md:flex"
            variant="link"
            title="Upgrade"
            asChild
          >
            <Link href="/dashboard/pricing">Upgrade</Link>
          </Button>

          <Button variant="outline" title="My Documents" asChild>
            <Link href="/dashboard">My Documents</Link>
          </Button>

          <Button
            className="border-indigo-600"
            variant="outline"
            title="Upload"
            asChild
          >
            <Link href="/dashboard/upload">
              <FilePlus2 className="text-indigo-600" />
            </Link>
          </Button>

          <UserButton />
        </div>
      </SignedIn>
    </div>
  );
};

export default Header;
