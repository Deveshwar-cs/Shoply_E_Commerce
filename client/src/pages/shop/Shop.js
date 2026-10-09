import { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { Spin } from 'antd';

import { MenuUnfoldOutlined } from '@ant-design/icons';

import ProductCard from '../../components/cards/ProductCard/ProductCard';

import ShopFilters from '../../components/nav/shopFilters/ShopFilters';

import MobileSideDrawer from '../../components/drawer/mobileSideDrawer/MobileSideDrawer';

import {
  getProductByFilter,
  getAllProductsByCount,
} from '../../functions/productFunctions';

import { clearSearchQuery } from '../../store/actions/searchActions';

import { getAllCategoriesAction } from '../../store/actions/categoryActions';

import { getAllSubCategoriesAction } from '../../store/actions/subCategoryActions';

import { setMobileDrawerVisability } from '../../store/actions/drawerActions';

import './Shop.css';

const Shop = () => {
  const dispatch = useDispatch();

  const { text } = useSelector((state) => state.search);

  const { allCategories, getCategoriesInProgress } = useSelector(
    (state) => state.category
  );

  const { allSubCategories, getSubCategoriesInProgress } = useSelector(
    (state) => state.sub
  );

  const [products, setProducts] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  const [price, setPrice] = useState([0, 4999]);

  const [categoryCheckbox, setCategoryCheckbox] = useState([]);

  const [ratingCheckbox, setRatingCheckbox] = useState([]);

  const [subcategoryCheckbox, setSubcategoryCheckbox] = useState([]);

  const [dynamicSubOptions, setDynamicSubOptions] = useState([]);

  const [brandCheckbox, setBrandCheckbox] = useState([]);

  const [colorCheckbox, setColorCheckbox] = useState([]);

  const [shippingCheckbox, setShippingCheckbox] = useState([]);

  const [filterQuery, setFilterQuery] = useState({});

  // =========================
  // GET CATEGORIES
  // =========================

  useEffect(() => {
    dispatch(getAllCategoriesAction());
    dispatch(getAllSubCategoriesAction());
  }, [dispatch]);

  // =========================
  // SEARCH PRODUCTS
  // =========================

  useEffect(() => {
    if (text.length > 0) {
      setPrice([0, 4999]);

      setCategoryCheckbox([]);

      setFilterQuery({});

      setRatingCheckbox([]);

      setSubcategoryCheckbox([]);

      setBrandCheckbox([]);

      setColorCheckbox([]);

      setShippingCheckbox([]);

      setIsLoading(true);

      const delayed = setTimeout(() => {
        getProductByFilter({ query: text })
          .then((res) => {
            setProducts(res.data);
            setIsLoading(false);
          })
          .catch((error) => {
            setIsLoading(false);
            console.log(error);
          });
      }, 300);

      return () => clearTimeout(delayed);
    }
  }, [text]);

  // =========================
  // DEFAULT PRODUCTS
  // =========================

  useEffect(() => {
    if (
      text.length === 0 &&
      Object.keys(filterQuery).length === 0 &&
      filterQuery.constructor === Object
    ) {
      setIsLoading(true);

      getAllProductsByCount(12)
        .then((res) => {
          setProducts(res.data);
          setIsLoading(false);
        })
        .catch((error) => {
          setIsLoading(false);
          console.log(error);
        });
    }
  }, [text, filterQuery]);

  // =========================
  // FILTER PRODUCTS
  // =========================

  useEffect(() => {
    if (
      Object.keys(filterQuery).length > 0 &&
      filterQuery.constructor === Object
    ) {
      dispatch(clearSearchQuery());

      setIsLoading(true);

      getProductByFilter(filterQuery)
        .then((res) => {
          setProducts(res.data);
          setIsLoading(false);
        })
        .catch((error) => {
          setIsLoading(false);
          console.log(error);
        });
    }
  }, [filterQuery, dispatch]);

  // =========================
  // CLEANUP
  // =========================

  useEffect(() => {
    return () => {
      setProducts([]);

      setPrice([0, 0]);

      setFilterQuery({});

      setCategoryCheckbox([]);

      setRatingCheckbox([]);

      setSubcategoryCheckbox([]);

      setDynamicSubOptions([]);

      setBrandCheckbox([]);

      setColorCheckbox([]);

      setShippingCheckbox([]);
    };
  }, []);

  // =========================
  // PRICE
  // =========================

  const handlePriceSlider = (price) => {
    setPrice(price);
  };

  const handleOnAfterChange = (price) => {
    setFilterQuery((prevState) => ({
      ...prevState,
      price,
    }));
  };

  // =========================
  // CATEGORY
  // =========================

  const checkboxCategoryOptions = allCategories.map((category) => ({
    label: category.name,
    value: category._id,
  }));

  const onChangeCategoryCheckbox = (checkedValues) => {
    setCategoryCheckbox(checkedValues);

    setFilterQuery((prevState) => ({
      ...prevState,
      category: checkedValues,
    }));
  };

  // =========================
  // RATING
  // =========================

  const onChangeRatingCheckbox = (checkedValues) => {
    setRatingCheckbox(checkedValues);

    setFilterQuery((prevState) => ({
      ...prevState,
      stars: checkedValues,
    }));
  };

  // =========================
  // SUBCATEGORY
  // =========================

  useEffect(() => {
    if (categoryCheckbox.length === 0) {
      const allSubs = allSubCategories.map((sub) => ({
        label: sub.name,
        value: sub._id,
      }));

      setDynamicSubOptions(allSubs);
    }

    if (categoryCheckbox.length > 0) {
      setFilterQuery((prevState) => ({
        ...prevState,
        subcategories: [],
      }));

      setSubcategoryCheckbox([]);

      const showSubs = allSubCategories
        .filter((sub) => categoryCheckbox.includes(sub.category))
        .map((sub) => ({
          label: sub.name,
          value: sub._id,
        }));

      setDynamicSubOptions(showSubs);
    }
  }, [categoryCheckbox, allSubCategories]);

  const onChangeSubcategoryCheckbox = (checkedValues) => {
    setSubcategoryCheckbox(checkedValues);

    setFilterQuery((prevState) => ({
      ...prevState,
      subcategories: checkedValues,
    }));
  };

  // =========================
  // BRAND
  // =========================

  const brandOptions = [
    'Apple',
    'Samsung',
    'Microsoft',
    'Lenovo',
    'Dell',
    'Xiaomi',
    'Google',
    'ASUS',
  ].map((brand) => ({
    label: brand,
    value: brand,
  }));

  const onChangeBrandCheckbox = (checkedValues) => {
    setBrandCheckbox(checkedValues);

    setFilterQuery((prevState) => ({
      ...prevState,
      brand: checkedValues,
    }));
  };

  // =========================
  // COLOR
  // =========================

  const colorOptions = ['Black', 'Brown', 'Silver', 'White', 'Blue', 'Red'].map(
    (color) => ({
      label: color,
      value: color,
    })
  );

  const onChangeColorCheckbox = (checkedValues) => {
    setColorCheckbox(checkedValues);

    setFilterQuery((prevState) => ({
      ...prevState,
      color: checkedValues,
    }));
  };

  // =========================
  // SHIPPING
  // =========================

  const shippingOptions = ['Yes', 'No'].map((status) => ({
    label: status,
    value: status,
  }));

  const onChangeShippingCheckbox = (checkedValues) => {
    setShippingCheckbox(checkedValues);

    setFilterQuery((prevState) => ({
      ...prevState,
      shipping: checkedValues,
    }));
  };

  // =========================
  // FILTER PROPS
  // =========================

  const shopFilterProps = {
    price,
    handlePriceSlider,
    handleOnAfterChange,

    checkboxCategoryOptions,
    onChangeCategoryCheckbox,
    getCategoriesInProgress,
    categoryCheckbox,

    onChangeRatingCheckbox,
    ratingCheckbox,

    dynamicSubOptions,
    onChangeSubcategoryCheckbox,
    subcategoryCheckbox,
    getSubCategoriesInProgress,

    brandOptions,
    onChangeBrandCheckbox,
    brandCheckbox,

    colorOptions,
    onChangeColorCheckbox,
    colorCheckbox,

    shippingOptions,
    onChangeShippingCheckbox,
    shippingCheckbox,
  };

  // =========================
  // MOBILE FILTER
  // =========================

  const showMobileMenuDrawer = () => {
    dispatch(setMobileDrawerVisability(true));
  };

  return (
    <main className="shop-page">
      {/* Hero / Heading */}
      <section className="shop-hero">
        <div>
          <span className="shop-eyebrow">EXPLORE OUR STORE</span>

          <h1 className="shop-title">Shop</h1>

          <p className="shop-description">
            Discover products carefully selected for quality, style, and
            everyday life.
          </p>
        </div>

        <div className="shop-result-count">{products.length} products</div>
      </section>

      {/* Mobile Filter Button */}
      <div className="mobile-filter-bar">
        <button
          type="button"
          className="mobile-filter-button"
          onClick={showMobileMenuDrawer}
        >
          <MenuUnfoldOutlined />
          <span>Filters</span>
        </button>

        <span>{products.length} results</span>
      </div>

      {/* Mobile Drawer */}
      <MobileSideDrawer width={300}>
        <div className="mobile-filter-content">
          <div className="mobile-filter-heading">
            <span>Filter Products</span>
          </div>

          <ShopFilters {...shopFilterProps} />
        </div>
      </MobileSideDrawer>

      {/* Main Shop Layout */}
      <section className="shop-layout">
        {/* Desktop Filters */}
        <aside className="shop-sidebar">
          <div className="filter-header">
            <span className="filter-eyebrow">REFINE</span>

            <h2>Filters</h2>
          </div>

          <ShopFilters {...shopFilterProps} />
        </aside>

        {/* Products */}
        <section className="products-section">
          <div className="products-header">
            <div>
              <span className="products-eyebrow">COLLECTION</span>

              <h2>Products</h2>
            </div>

            <span className="desktop-product-count">
              {products.length} results
            </span>
          </div>

          <div className="products-grid">
            {isLoading && products.length === 0 && (
              <div className="shop-state">
                <Spin size="large" />

                <p>Finding products...</p>
              </div>
            )}

            {!isLoading && products.length === 0 && (
              <div className="shop-state">
                <div className="empty-icon">×</div>

                <h3>No matches</h3>

                <p>
                  Try adjusting your filters or searching for something else.
                </p>
              </div>
            )}

            {products &&
              products.map((product) => (
                <ProductCard product={product} key={product._id} />
              ))}
          </div>
        </section>
      </section>
    </main>
  );
};

export default Shop;
