const getBaseURL = () => {
  const { NODE_ENV, VERCEL_URL, NEXT_PUBLIC_VERCEL_URL } = process.env;

  if (NODE_ENV === "production") {
    const URL = VERCEL_URL || NEXT_PUBLIC_VERCEL_URL;

    if (!URL) throw new Error("Vercel Deployment URL is not set.");

    return URL.startsWith("https://") ? URL : `https://${URL}`;
  }

  return "http://localhost:3000";
};

export default getBaseURL;
