# MERN Ecommerce project

# [Live Demo](https://mern-ecomm-client.onrender.com/)

### Client stack:

- React
- Redux
- React Router
- Ant Design UI

### Server stack:

- Node/Express
- MongoDB/Mongoose

### Other technologies:

- Firebase Auth
- Axios
- Cloudinary API
- Stripe

### Project features:

- Login Registration System
- Login with email/password and social login (Google)
- Admin dashboard and order management system
- Products CRUD with advance features including categories, sub-categories, multiple image uploads etc
- Plenty of advance searching and filtering options
- Star rating system
- Cart functionality with both backend/frontend implementation
- Checkout with stripe for credit card payments
- Checkout with cash on delivery (no online payment required)
- User dashboard with password update, purchase history, Invoice/PDF download etc

Project based on [this course](https://www.udemy.com/course/react-redux-ecommerce/) with a lot of changes:

- used only Ant Design UI (because why to use two UI libraries with same features);
- more complex Redux setup (there is a lot of Redux here 😂);
- added mobile layout for all pages;
- new implementation for calculating average product rating (with mongoose middlewares + changes in the model);
- new implementation for filtering products feature (now we can combine filters for more specific results – original project miss this functionality);

### How to run the project locally?

1. Clone repo;
2. In `client` directory run terminal command `npm install`;
3. In `server` directory run terminal command `npm install`;
4. Setup MongoDB instance – local or [Atlas](https://www.mongodb.com/atlas/database);
5. Setup [Firebase](https://console.firebase.google.com/) project;
6. Setup [Cloudinary](https://cloudinary.com/) API;
7. Setup [Stripe](https://stripe.com/) project;
8. In `server` directory run terminal command `npm run dev`;

### Screenshots

**By User**
![home-page](https://user-images.githubusercontent.com/20335885/148426821-c12d797b-6610-490d-b18a-0b1e9cce338f.jpg)
![shop-page](https://user-images.githubusercontent.com/20335885/148426882-b3c67245-325e-46f6-95aa-616959909827.jpg)
![product-page](https://user-images.githubusercontent.com/20335885/148426915-1966a7b9-451f-4034-a2ac-9d1dcad0548e.jpg)
![cart-page](https://user-images.githubusercontent.com/20335885/148426967-170cf311-f53c-4cff-9f18-dd0ef93696a8.jpg)
![checkout-page](https://user-images.githubusercontent.com/20335885/148427018-f7195fc3-4702-41de-93fb-e56970a1bfef.jpg)
![card-payment-page](https://user-images.githubusercontent.com/20335885/148427079-e25dfd12-f2aa-4742-9a53-3a9e5e24bc23.jpg)
![card-payment-success](https://user-images.githubusercontent.com/20335885/148427138-41723ed1-e3f1-4ff7-935e-a5b14b08b3ea.jpg)
![user-order-history-page](https://user-images.githubusercontent.com/20335885/148427194-314c13d7-3b39-4cf5-bf75-b418ca9176ac.jpg)

**By Admin**
![admin-dashboard-page](https://user-images.githubusercontent.com/20335885/148427256-b9a55636-0dcb-4ed8-bbdb-0c19e956a6e4.jpg)
