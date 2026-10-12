# Shoply E-Commerce

Shoply is a full-stack online store with customer shopping, checkout, and administration features.

**Live site:** [https://shoply-e-commerce.vercel.app/](https://shoply-e-commerce.vercel.app/)

## Technology

- **Frontend:** React 18, React Router, Redux with Redux Thunk, Ant Design, Tailwind CSS, and Axios
- **Backend:** Node.js, Express, and MongoDB with Mongoose
- **Authentication:** Firebase Authentication on the client and Firebase Admin token verification on the server
- **Payments:** Stripe card payments and cash on delivery
- **Images:** Cloudinary
- **Invoices:** PDF generation with `@react-pdf/renderer`

## Features

- Customer registration and sign-in, including Google sign-in
- Product browsing, search, filtering, categories, and subcategories
- Product ratings and reviews
- Shopping cart, wishlist, and coupon support
- Stripe card checkout and cash-on-delivery orders
- Customer order history, address management, and downloadable PDF invoices
- Admin dashboard for managing products, categories, coupons, and orders
- Responsive layouts for desktop and mobile

## Project structure

```text
client/   React application
server/   Express API, MongoDB models, and Firebase Admin integration
```

## Local setup

### Prerequisites

- Node.js and npm
- A MongoDB database, local or [MongoDB Atlas](https://www.mongodb.com/atlas/database)
- A [Firebase](https://console.firebase.google.com/) project with Authentication enabled
- A [Cloudinary](https://cloudinary.com/) account for product image uploads
- A [Stripe](https://stripe.com/) account for card payments

### 1. Install dependencies

Run these commands from the project root:

```bash
cd server
npm install
cd ../client
npm install
```

### 2. Configure the server

Create `server/.env` with the following settings. Replace the placeholders with your own credentials; do not commit `.env` files or service-account keys.

```dotenv
PORT=8000
DATABASE=mongodb+srv://<username>:<PASSWORD>@<cluster>/<database>?retryWrites=true&w=majority
DATABASE_PASSWORD=your-mongodb-password
STRIPE_SECRET=sk_test_your_stripe_secret_key
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

For local development, download a Firebase Admin service-account key for your Firebase project and save it as:

```text
server/config/fbServiceAccountKey.json
```

Keep this file private and out of version control. In production, the server instead reads Firebase Admin credentials from environment variables: `FIREBASE_PROJECT_ID`, `FIREBASE_PRIVATE_KEY`, and `FIREBASE_CLIENT_EMAIL` are required. The private key can be stored with escaped newlines (`\n`).

### 3. Configure the client

Create `client/.env` and add the Firebase web-app settings from your Firebase project, along with the API URL and Stripe publishable key:

```dotenv
REACT_APP_API=http://localhost:8000/api
REACT_APP_STRIPE_KEY=pk_test_your_stripe_publishable_key
REACT_APP_FIREBASE_API_KEY=your_firebase_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=your_firebase_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
REACT_APP_FIREBASE_MESSAGIN_SENDER_ID=your_messaging_sender_id
REACT_APP_FIREBASE_APP_ID=your_firebase_app_id
```

The sender-ID variable is named `REACT_APP_FIREBASE_MESSAGIN_SENDER_ID` in the current application. Enable the Google sign-in provider in Firebase Authentication if you want to use Google login.

### 4. Start the application

To start the API and React development server together:

```bash
cd server
npm run dev
```

The API runs on `http://localhost:8000`; the React app runs on `http://localhost:3000`.

Alternatively, start each part in a separate terminal:

```bash
# Terminal 1
cd server
npm run server

# Terminal 2
cd client
npm start
```

## Useful commands

Run these from the corresponding directory:

| Directory | Command          | Description                        |
| --------- | ---------------- | ---------------------------------- |
| `server/` | `npm start`      | Start the API                      |
| `server/` | `npm run server` | Start the API with Nodemon         |
| `server/` | `npm run dev`    | Start the API and client together  |
| `client/` | `npm start`      | Start the React development server |
| `client/` | `npm run build`  | Create a production client build   |
| `client/` | `npm test`       | Run client tests                   |
