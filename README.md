# Chat with PDF - AI-Powered Document Assistant

## Overview

**Chat with PDF** is a Next.js-based application that allows users to **upload PDF documents** and **interact with them through AI-powered chat**. The system processes PDFs using **Langchain, Pinecone, and Google Gemini AI**, enabling users to **ask questions, retrieve key information, and summarize content** seamlessly.

## Features

- 📄 **Upload & Manage PDFs** - Store and organize your documents securely.
- 🤖 **AI Chat with Documents** - Get intelligent responses from your PDFs.
- 🔍 **Fast Semantic Search** - Retrieve relevant document sections using Pinecone.
- 📊 **Subscription Plans** - Free & Pro-tier with different limits.
- 🔒 **Authentication & Security** - Powered by Clerk and Firebase.
- 💳 **Stripe Payments** - Upgrade to Pro for more features.

## Tech Stack

### **Frontend**

- **Next.js & React** - UI framework
- **Tailwind CSS & Shadcn** - Styling
- **Lucide React Icons** - UI enhancements

### **Backend & Services**

- **Firebase Firestore** - User and document storage
- **Cloudinary** - Alternative file hosting
- **Clerk** - Authentication & User Management
- **Stripe** - Subscription & Payment Handling

### **AI & Vector Database**

- **Langchain** - AI-powered retrieval
- **Pinecone** - Vector search for fast document retrieval
- **Google Gemini AI** - AI-generated responses

## Installation & Setup

### **1. Clone the repository**

```bash
git clone https://github.com/yourusername/chat-with-pdf.git
cd chat-with-pdf
```

### **2. Install dependencies**

```bash
npm i --legacy-peer-deps
```

### **3. Set up environment variables**

Create a `.env.local` file and add the following:

```env
PINECONE_API_KEY=<your_pinecone_api_key>
GOOGLE_API_KEY=<your_google_api_key>
WEB_DEPLOYMENT_URL=<your_web_deployment_url>
NEXT_PUBLIC_WEB_DEPLOYMENT_URL=<your_next_public_web_deployment_url>

# Clerk Config
NEXT_PUBLIC_CLERK_SIGN_IN_URL='/sign-in'
NEXT_PUBLIC_CLERK_SIGN_UP_URL='/sign-up'
CLERK_SECRET_KEY=<your_clerk_secret_key>
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=<your_next_public_clerk_publishable_key>

# Cloudinary Config
CLOUDINARY_API_KEY=<your_cloudinary_api_key>
CLOUDINARY_CLOUD_NAME=<your_cloudinary_cloud_name>
CLOUDINARY_API_SECRET=<your_cloudinary_api_secret>
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=<your_next_public_cloudinary_cloud_name>

# Stripe Config
STRIPE_PRO_PLAN_ID=<your_stripe_pro_plan>
STRIPE_WEBHOOK_SECRET=<your_stripe_webhook_secret>
STRIPE_SECRET_KEY=<your_stripe_secret_key>
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=<your_next_public_stripe_publishable_key>

# Firebase Config Client Side
NEXT_PUBLIC_FIREBASE_API_KEY=<your_next_public_firebase_api_key>
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=<your_next_public_firebase_auth_domain>
NEXT_PUBLIC_FIREBASE_PROJECT_ID=<your_next_public_firebase_project_id>
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=<your_next_public_firebase_storage_bucket>
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=<your_next_public_firebase_messaging_sender_id>
NEXT_PUBLIC_FIREBASE_APP_ID=<your_next_public_firebase_app_id>
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=<your_next_public_firebase_measurement_id>

# Firebase Config Server Side
FIREBASE_TYPE=<your_firebase_type>
FIREBASE_PROJECT_ID=<your_firebase_project_id>
FIREBASE_PRIVATE_KEY_ID=<your_firebase_private_key_id>
FIREBASE_PRIVATE_KEY=<your_firebase_private_key>
FIREBASE_CLIENT_EMAIL=<your_firebase_client_email>
FIREBASE_CLIENT_ID=<your_firebase_client_id>
FIREBASE_AUTH_URI=<your_firebase_auth_uri>
FIREBASE_TOKEN_URI=<your_firebase_token_uri>
FIREBASE_AUTH_PROVIDER_CERT_URL=<your_firebase_auth_provider_cert_url>
FIREBASE_CLIENT_CERT_URL=<your_firebase_client_cert_url>
FIREBASE_UNIVERSE_DOMAIN=<your_firebase_universe_domain>

```

### **4. Run the development server**

```bash
npm run dev
```

Your app will be available at `http://localhost:3000`

## Screens

### **1. Landing Page**

Responsive landing page to showcase the features of the application along with navigation to `Login` and `Pricing` Page.

![Landing Page](/public/screenshots/LandingPage.png)

### **2. Pricing Page**

Responsive pricing page to showcase clear prices and features of the application.

![Pricing Page](/public/screenshots/PricingPage.png)

### **3. SignIn Page**

![SignIn Page](/public/screenshots/SigninPage.png)

### **4. SignUp Page**

![SignUp Page](/public/screenshots/SignupPage.png)

### **5. Dashboard**

A simple Dashboard to showcase all the uploaded documents and chats along with option to `Upload a new Document`, `Download a Uploaded Document`, `Delete a Chat (Pro Feature)`, and `User Profile`.

![Dashboard](/public/screenshots/Dashboard.png)

### **6. Upload a PDF**

Click the **Add a Document** button that will open a Modal. Click to select a PDF document or Drag and Drop one. The modal will show a interactive state of all the processing while uploading.

![Upload Document](/public/screenshots/UploadDocument.png)

### **7. Chat with Your PDF**

Ask questions, summarize, or retrieve key insights from the document. You can also tell AI to answer the question as markdown. Along that you can `Navigate PDF Pages`, `Rotate PDF`, `Zoom In/Out PDF`.

![Chat Page](/public/screenshots/ChatPage.png)

### **8. Upgrade To Pro**

Upgrade to Pro via **Stripe** monthly subscriptions for higher document limits.

![Stripe Payment Page](/public/screenshots/StripePaymentPage.png)

### **9. Manage Subscription**

- Upgraded members can cancel or renew subscriptions form **Strip Portal**.

![Stripe Payment Page](/public/screenshots/StripePortalPage.png)

## License

This project is licensed under the **MIT License**.

---
