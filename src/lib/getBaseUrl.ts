const getBaseURL = () => {
  const { NODE_ENV, WEB_DEPLOYMENT_URL, NEXT_PUBLIC_WEB_DEPLOYMENT_URL } =
    process.env;

  if (NODE_ENV === "production") {
    const URL = WEB_DEPLOYMENT_URL || NEXT_PUBLIC_WEB_DEPLOYMENT_URL;

    if (!URL) throw new Error("Vercel Deployment URL is not set.");

    return URL.startsWith("https://") ? URL : `https://${URL}`;
  }

  return "http://localhost:3000";
};

export default getBaseURL;
