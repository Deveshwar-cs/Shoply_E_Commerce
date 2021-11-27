import { useSelector } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Spin } from 'antd';

import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import RegisterComplete from './pages/auth/RegisterComplete';
import Home from './pages/Home';
import Header from './components/nav/Header';
import ForgotPassword from './pages/auth/ForgotPassword';
import History from './pages/user/History';
import Password from './pages/user/Password';
import Wishlist from './pages/user/Wishlist';
import AdminDashboard from './pages/admin/AdminDashboard';
import CategoryCreate from './pages/admin/category/CategoryCreate';
import CategoryUpdate from './pages/admin/category/CategoryUpdate';
import SubCategoryCreate from './pages/admin/subcategory/SubCategoryCreate';
import SubCategoryUpdate from './pages/admin/subcategory/SubCategoryUpdate';
import ProductCreate from './pages/admin/product/ProductCreate';
import ProductUpdate from './pages/admin/product/ProductUpdate';
import AllProducts from './pages/admin/product/AllProducts';
import Product from './pages/Product';
import CategoryHome from './pages/CategoryHome';
import SubcategoryHome from './pages/SubcategoryHome';
import Shop from './pages/Shop';
import Cart from './pages/Cart';
import UserRoute from './components/routes/UserRoute';
import AdminRoute from './components/routes/AdminRoute';
import SideCartDrawer from './components/drawer/SideCartDrawer';

const App = () => {
  const { authInfoInProgress } = useSelector((state) => state.auth);

  return authInfoInProgress ? (
    <div className="spiner">
      <Spin size="large" />
    </div>
  ) : (
    <>
      <Header />
      <SideCartDrawer />
      <ToastContainer />
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
        <AdminRoute exact path="/admin/dashboard" component={AdminDashboard} />
        <AdminRoute exact path="/admin/category" component={CategoryCreate} />
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
    </>
  );
};

export default App;
