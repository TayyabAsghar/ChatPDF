import { SignIn } from "@clerk/nextjs";

const Page = () => <SignIn fallbackRedirectUrl="/dashboard" />;

export default Page;
