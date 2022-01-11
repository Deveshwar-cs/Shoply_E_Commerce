import { lazy, Suspense } from 'react';
//import { useSelector } from 'react-redux';
import { Switch, Route } from 'react-router-dom';

import { Spin } from 'antd';

// import Login from './pages/auth/Login';
// import Register from './pages/auth/Register';
// import RegisterComplete from './pages/auth/RegisterComplete';
// import Home from './pages/Home';
// import Header from './components/nav/Header';
// import ForgotPassword from './pages/auth/ForgotPassword';
// import History from './pages/user/History';
// import Password from './pages/user/Password';
// import AdminPassword from './pages/admin/Password';
// import Wishlist from './pages/user/Wishlist';
// import AdminDashboard from './pages/admin/AdminDashboard';
// import CategoryCreate from './pages/admin/category/CategoryCreate';
// import CategoryUpdate from './pages/admin/category/CategoryUpdate';
// import SubCategoryCreate from './pages/admin/subcategory/SubCategoryCreate';
// import SubCategoryUpdate from './pages/admin/subcategory/SubCategoryUpdate';
// import ProductCreate from './pages/admin/product/ProductCreate';
// import ProductUpdate from './pages/admin/product/ProductUpdate';
// import AllProducts from './pages/admin/product/AllProducts';
// import Coupon from './pages/admin/Coupon';
// import Product from './pages/Product';
// import CategoryHome from './pages/CategoryHome';
// import SubcategoryHome from './pages/SubcategoryHome';
// import Shop from './pages/Shop';
// import Cart from './pages/Cart';
// import Checkout from './pages/Checkout';
// import Payment from './pages/Payment';
// import UserRoute from './components/routes/UserRoute';
// import AdminRoute from './components/routes/AdminRoute';
// import SideCartDrawer from './components/drawer/SideCartDrawer';

const Login = lazy(() => import('./pages/auth/Login'));
const Register = lazy(() => import('./pages/auth/Register'));
const RegisterComplete = lazy(() => import('./pages/auth/RegisterComplete'));
const Home = lazy(() => import('./pages/Home'));
const Header = lazy(() => import('./components/nav/Header'));
const ForgotPassword = lazy(() => import('./pages/auth/ForgotPassword'));
const History = lazy(() => import('./pages/user/History'));
const Password = lazy(() => import('./pages/user/Password'));
const AdminPassword = lazy(() => import('./pages/admin/Password'));
const Wishlist = lazy(() => import('./pages/user/Wishlist'));
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard'));
const CategoryCreate = lazy(() =>
  import('./pages/admin/category/CategoryCreate')
);
const CategoryUpdate = lazy(() =>
  import('./pages/admin/category/CategoryUpdate')
);
const SubCategoryCreate = lazy(() =>
  import('./pages/admin/subcategory/SubCategoryCreate')
);
const SubCategoryUpdate = lazy(() =>
  import('./pages/admin/subcategory/SubCategoryUpdate')
);
const ProductCreate = lazy(() => import('./pages/admin/product/ProductCreate'));
const ProductUpdate = lazy(() => import('./pages/admin/product/ProductUpdate'));
const AllProducts = lazy(() => import('./pages/admin/product/AllProducts'));
const Coupon = lazy(() => import('./pages/admin/Coupon'));
const Product = lazy(() => import('./pages/Product'));
const CategoryHome = lazy(() => import('./pages/CategoryHome'));
const SubcategoryHome = lazy(() => import('./pages/SubcategoryHome'));
const Shop = lazy(() => import('./pages/Shop'));
const Cart = lazy(() => import('./pages/Cart'));
const Checkout = lazy(() => import('./pages/Checkout'));
const Payment = lazy(() => import('./pages/Payment'));
const UserRoute = lazy(() => import('./components/routes/UserRoute'));
const AdminRoute = lazy(() => import('./components/routes/AdminRoute'));
const SideCartDrawer = lazy(() => import('./components/drawer/SideCartDrawer'));

const App = () => {
  // const { authInfoInProgress } = useSelector((state) => state.auth);

  // return authInfoInProgress ? (
  //   <div className="spiner">
  //     <Spin size="large" />
  //   </div>
  // ) :
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
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/register-complete" component={RegisterComplete} />
          <Route exact path="/forgot-password" component={ForgotPassword} />
          <Route exact path="/product/:slug" component={Product} />
          <Route exact path="/category/:slug" component={CategoryHome} />
          <Route exact path="/subcategory/:slug" component={SubcategoryHome} />
          <Route exact path="/shop" component={Shop} />
          <Route exact path="/cart" component={Cart} />
          <UserRoute exact path="/user/history" component={History} />
          <UserRoute exact path="/user/password" component={Password} />
          <UserRoute exact path="/user/wishlist" component={Wishlist} />
          <UserRoute exact path="/checkout" component={Checkout} />
          <UserRoute exact path="/payment" component={Payment} />
          <AdminRoute
            exact
            path="/admin/dashboard"
            component={AdminDashboard}
          />
          <AdminRoute exact path="/admin/category" component={CategoryCreate} />
          <AdminRoute exact path="/admin/coupon" component={Coupon} />
          <AdminRoute exact path="/admin/password" component={AdminPassword} />
          <AdminRoute
            exact
            path="/admin/category/:slug"
            component={CategoryUpdate}
          />
          <AdminRoute
            exact
            path="/admin/subcategory"
            component={SubCategoryCreate}
          />
          <AdminRoute
            exact
            path="/admin/subcategory/:slug"
            component={SubCategoryUpdate}
          />
          <AdminRoute exact path="/admin/product" component={ProductCreate} />
          <AdminRoute exact path="/admin/allproducts" component={AllProducts} />
          <AdminRoute
            exact
            path="/admin/allproducts/:slug"
            component={ProductUpdate}
          />
        </Switch>
      </Suspense>
    </>
  );
};

export default App;
