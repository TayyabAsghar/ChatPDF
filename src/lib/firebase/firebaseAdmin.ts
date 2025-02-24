import { getFirestore } from "firebase-admin/firestore";
import {
  App,
  cert,
  getApps,
  getApp,
  initializeApp,
  ServiceAccount,
} from "firebase-admin/app";

const firebaseConfig = {
  type: process.env.FIREBASE_TYPE,
  auth_uri: process.env.FIREBASE_AUTH_URI,
  client_id: process.env.FIREBASE_CLIENT_ID,
  token_uri: process.env.FIREBASE_TOKEN_URI,
  project_id: process.env.FIREBASE_PROJECT_ID,
  client_email: process.env.FIREBASE_CLIENT_EMAIL,
  private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
  universe_domain: process.env.FIREBASE_UNIVERSE_DOMAIN,
  client_x509_cert_url: process.env.FIREBASE_CLIENT_CERT_URL,
  private_key: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
  auth_provider_x509_cert_url: process.env.FIREBASE_AUTH_PROVIDER_CERT_URL,
};

let adminApp: App;

if (getApps().length) adminApp = getApp();
else
  adminApp = initializeApp({
    credential: cert(firebaseConfig as ServiceAccount),
  });

const adminDb = getFirestore(adminApp);

export { adminDb };
