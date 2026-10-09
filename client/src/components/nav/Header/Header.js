import { useState, useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { Link, useNavigate, useLocation } from 'react-router-dom';

import {
  MenuOutlined,
  CloseOutlined,
  ShoppingOutlined,
  UserOutlined,
  LogoutOutlined,
  DashboardOutlined,
} from '@ant-design/icons';

import { logout } from '../../../store/actions/authActions';

import SearchInput from '../../forms/SearchInput/SearchInput';

import './Header.css';

const Header = () => {
  const [current, setCurrent] = useState('home');
  const [mobileOpen, setMobileOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { user } = useSelector((state) => state.auth);

  const {
    cart: { totalQuantity },
  } = useSelector((state) => state.cart);

  // Keep navigation state synchronized with the current URL
  useEffect(() => {
    const path = location.pathname;

    if (path === '/') {
      setCurrent('home');
    } else if (path.includes('product')) {
      setCurrent('product');
    } else if (path.includes('cart')) {
      setCurrent('cart');
    } else if (path.includes('shop')) {
      setCurrent('shop');
    } else {
      setCurrent('');
    }

    setMobileOpen(false);
    setAccountOpen(false);
  }, [location.pathname]);

  const onLogout = () => {
    dispatch(logout());
    setAccountOpen(false);
    navigate('/login');
  };

  const closeMobileMenu = () => {
    setMobileOpen(false);
  };

  return (
    <header className="site-header">
      <div className="header-container">
        {/* Logo */}
        <Link to="/" className="brand-logo">
          <span className="brand-mark">S</span>

          <span className="brand-name">SHOPLY</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="desktop-navigation">
          <Link
            to="/"
            className={current === 'home' ? 'nav-link active' : 'nav-link'}
          >
            Home
          </Link>

          <Link
            to="/shop"
            className={current === 'shop' ? 'nav-link active' : 'nav-link'}
          >
            Shop
          </Link>
        </nav>

        {/* Desktop Search */}
        <div className="desktop-search">
          <SearchInput />
        </div>

        {/* Actions */}
        <div className="header-actions">
          {/* Cart */}
          <Link
            to="/cart"
            className={
              current === 'cart'
                ? 'header-action cart-action active'
                : 'header-action cart-action'
            }
            aria-label="Shopping cart"
          >
            <ShoppingOutlined />

            {totalQuantity > 0 && (
              <span className="cart-count">
                {totalQuantity > 9 ? '9+' : totalQuantity}
              </span>
            )}
          </Link>

          {/* Account */}
          {user ? (
            <div className="account-wrapper">
              <button
                className="account-button"
                onClick={() => setAccountOpen(!accountOpen)}
              >
                <span className="account-avatar">
                  <UserOutlined />
                </span>

                <span className="account-label">Account</span>
              </button>

              {accountOpen && (
                <div className="account-dropdown">
                  <div className="account-info">
                    <div className="account-avatar large">
                      <UserOutlined />
                    </div>

                    <div className="account-details">
                      <span className="account-title">My Account</span>

                      <span className="account-email">{user.email}</span>
                    </div>
                  </div>

                  <div className="dropdown-divider" />

                  {user.role === 'subscriber' && (
                    <Link to="/user/history" className="dropdown-item">
                      <DashboardOutlined />
                      <span>Dashboard</span>
                    </Link>
                  )}

                  {user.role === 'admin' && (
                    <Link to="/admin/dashboard" className="dropdown-item">
                      <DashboardOutlined />
                      <span>Admin Dashboard</span>
                    </Link>
                  )}

                  <button
                    className="dropdown-item logout-item"
                    onClick={onLogout}
                  >
                    <LogoutOutlined />
                    <span>Logout</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login" className="login-button">
              <UserOutlined />
              <span>Sign in</span>
            </Link>
          )}

          {/* Mobile Menu Button */}
          <button
            className="mobile-menu-button"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle navigation"
          >
            {mobileOpen ? <CloseOutlined /> : <MenuOutlined />}
          </button>
        </div>
      </div>

      {/* Mobile Search */}
      <div className="mobile-search">
        <SearchInput />
      </div>

      {/* Mobile Navigation */}
      {mobileOpen && (
        <div className="mobile-navigation">
          <Link
            to="/"
            className={
              current === 'home' ? 'mobile-nav-link active' : 'mobile-nav-link'
            }
            onClick={closeMobileMenu}
          >
            Home
          </Link>

          <Link
            to="/shop"
            className={
              current === 'shop' ? 'mobile-nav-link active' : 'mobile-nav-link'
            }
            onClick={closeMobileMenu}
          >
            Shop
          </Link>

          <Link
            to="/shop"
            className="mobile-nav-link"
            onClick={closeMobileMenu}
          >
            Collections
          </Link>

          {!user && (
            <Link
              to="/register"
              className="mobile-register-link"
              onClick={closeMobileMenu}
            >
              Create account
            </Link>
          )}
        </div>
      )}
    </header>
  );
};

export default Header;
