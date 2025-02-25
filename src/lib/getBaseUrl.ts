const getBaseURL = () => {
  const VERCEL_URL = process.env.VERCEL_URL;

  if (!VERCEL_URL) throw new Error("Vercel Deployment Url is not set.");

  const baseURL =
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000"
      : VERCEL_URL;

  if (!baseURL?.startsWith("http://") && !baseURL?.startsWith("https://"))
    return `https://${baseURL}`;
  return baseURL;
};

export default getBaseURL;
