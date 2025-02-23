import { SignUp } from "@clerk/nextjs";

const Page = () => <SignUp fallbackRedirectUrl="/dashboard" />;

export default Page;
