import { lazy, Suspense, useEffect } from 'react';

import { Routes, Route } from 'react-router-dom';

import { Spin } from 'antd';
import { useDispatch } from 'react-redux';
import { getUser } from './store/actions/authActions';
// import { Footer } from 'antd/lib/layout/layout';

const Login = lazy(() => import('./pages/auth/Login/Login'));

const Register = lazy(() => import('./pages/auth/Register/Register'));

const RegisterComplete = lazy(() =>
  import('./pages/auth/RegisterComplete/RegisterComplete')
);

const Home = lazy(() => import('./pages/Home/Home'));

const Header = lazy(() => import('./components/nav/Header/Header'));

const ForgotPassword = lazy(() =>
  import('./pages/auth/ForgotPassword/ForgotPassword')
);

const History = lazy(() => import('./pages/History/History'));

const Password = lazy(() => import('./pages/password/Password'));

const AdminPassword = lazy(() => import('./pages/admin/Password/Password'));

const Wishlist = lazy(() => import('./pages/user/Wishlist/Wishlist'));

const AdminDashboard = lazy(() =>
  import('./pages/admin/AdminDashBoard/AdminDashboard')
);

const Footer = lazy(() => import('./components/nav/footer/Footer'));

const CategoryCreate = lazy(() =>
  import('./pages/admin/category/CategoryCreate/CategoryCreate')
);

const CategoryUpdate = lazy(() =>
  import('./pages/admin/category/CategoryUpdate/CategoryUpdate')
);

const SubCategoryCreate = lazy(() =>
  import('./pages/admin/subcategory/SubCategoryCreate/SubCategoryCreate')
);

const SubCategoryUpdate = lazy(() =>
  import('./pages/admin/subcategory/SubCategoryUpdate/SubCategoryUpdate')
);

const ProductCreate = lazy(() =>
  import('./pages/admin/product/ProductCreate/ProductCreate')
);

const ProductUpdate = lazy(() =>
  import('./pages/admin/product/ProductUpdate/ProductUpdate')
);

const AllProducts = lazy(() =>
  import('./pages/admin/product/AllProducts/AllProducts')
);

const Coupon = lazy(() => import('./pages/admin/Coupon/Coupon'));

const Product = lazy(() => import('./pages/Product/Product'));

const CategoryHome = lazy(() => import('./pages/CategoryHome/CategoryHome'));

const SubcategoryHome = lazy(() =>
  import('./pages/SubcategoryHome/SubcategoryHome')
);

const Shop = lazy(() => import('./pages/shop/Shop'));

const Cart = lazy(() => import('./pages/Cart/Cart'));

const Checkout = lazy(() => import('./pages/checkout/Checkout'));

const Payment = lazy(() => import('./pages/payment/Payment'));

const UserRoute = lazy(() => import('./components/routes/UserRoute'));

const AdminRoute = lazy(() => import('./components/routes/AdminRoute'));

const SideCartDrawer = lazy(() =>
  import('./components/drawer/sideCartDrawer/SideCartDrawer')
);

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);
  return (
    <>
      <Suspense
        fallback={
          <div className="spiner">
            <Spin size="large" />
          </div>
        }
      >
        <Header />

        <SideCartDrawer />

        <Routes>
          {/* Public Routes */}

          <Route path="/" element={<Home />} />

          <Route path="/login" element={<Login />} />

          <Route path="/register" element={<Register />} />

          <Route path="/register-complete" element={<RegisterComplete />} />

          <Route path="/forgot-password" element={<ForgotPassword />} />

          <Route path="/product/:slug" element={<Product />} />

          <Route path="/category/:slug" element={<CategoryHome />} />

          <Route path="/subcategory/:slug" element={<SubcategoryHome />} />

          <Route path="/shop" element={<Shop />} />

          <Route path="/cart" element={<Cart />} />

          {/* User Protected Routes */}

          <Route
            path="/user/history"
            element={
              <UserRoute>
                <History />
              </UserRoute>
            }
          />

          <Route
            path="/user/password"
            element={
              <UserRoute>
                <Password />
              </UserRoute>
            }
          />

          <Route
            path="/user/wishlist"
            element={
              <UserRoute>
                <Wishlist />
              </UserRoute>
            }
          />

          <Route
            path="/checkout"
            element={
              <UserRoute>
                <Checkout />
              </UserRoute>
            }
          />

          <Route
            path="/payment"
            element={
              <UserRoute>
                <Payment />
              </UserRoute>
            }
          />

          {/* Admin Protected Routes */}

          <Route
            path="/admin/dashboard"
            element={
              <AdminRoute>
                <AdminDashboard />
              </AdminRoute>
            }
          />

          <Route
            path="/admin/category"
            element={
              <AdminRoute>
                <CategoryCreate />
              </AdminRoute>
            }
          />

          <Route
            path="/admin/coupon"
            element={
              <AdminRoute>
                <Coupon />
              </AdminRoute>
            }
          />

          <Route
            path="/admin/password"
            element={
              <AdminRoute>
                <AdminPassword />
              </AdminRoute>
            }
          />

          <Route
            path="/admin/category/:slug"
            element={
              <AdminRoute>
                <CategoryUpdate />
              </AdminRoute>
            }
          />

          <Route
            path="/admin/subcategory"
            element={
              <AdminRoute>
                <SubCategoryCreate />
              </AdminRoute>
            }
          />

          <Route
            path="/admin/subcategory/:slug"
            element={
              <AdminRoute>
                <SubCategoryUpdate />
              </AdminRoute>
            }
          />

          <Route
            path="/admin/product"
            element={
              <AdminRoute>
                <ProductCreate />
              </AdminRoute>
            }
          />

          <Route
            path="/admin/allproducts"
            element={
              <AdminRoute>
                <AllProducts />
              </AdminRoute>
            }
          />

          <Route
            path="/admin/allproducts/:slug"
            element={
              <AdminRoute>
                <ProductUpdate />
              </AdminRoute>
            }
          />
        </Routes>
        <Footer />
      </Suspense>
    </>
  );
};

export default App;
