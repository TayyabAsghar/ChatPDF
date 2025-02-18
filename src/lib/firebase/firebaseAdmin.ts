import serviceKey from "../../../firebase_key.json";
import { getFirestore } from "firebase-admin/firestore";
import {
  App,
  cert,
  getApps,
  getApp,
  initializeApp,
  ServiceAccount,
} from "firebase-admin/app";

let adminApp: App;

if (getApps().length) adminApp = getApp();
else
  adminApp = initializeApp({ credential: cert(serviceKey as ServiceAccount) });

const adminDb = getFirestore(adminApp);

export { adminDb };
