import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SignedIn, UserButton } from "@clerk/nextjs";
import UpgradeButton from "@/components/UpgradeButton";
import UploadDocument from "@/components/uploader/UploadDocument";

const Header = () => {
  return (
    <div className="flex justify-between bg-white shadow-sm p-5 border-b">
      <Link className="text-2xl" href="/dashboard">
        Chat <span className="text-indigo-600">PDF</span>
      </Link>

      <SignedIn>
        <div className="flex items-center gap-2">
          <Button asChild variant="link">
            <Link href="/upgrade">Pricing</Link>
          </Button>

          <Button variant="outline" title="My Documents" asChild>
            <Link href="/dashboard">My Documents</Link>
          </Button>

          <UploadDocument buttonType="icon" />

          <UpgradeButton />

          <UserButton />
        </div>
      </SignedIn>
    </div>
  );
};

export default Header;
