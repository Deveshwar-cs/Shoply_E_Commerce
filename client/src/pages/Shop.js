import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Typography, Row, Col, Spin, Grid, Space, Button } from 'antd';

import { MenuUnfoldOutlined } from '@ant-design/icons';

import ProductCard from '../components/cards/ProductCard';
import ShopFilters from '../components/nav/ShopFilters';
import MobileSideDrawer from '../components/drawer/MobileSideDrawer';

import {
  getProductByFilter,
  getAllProductsByCount,
} from '../functions/productFunctions';
import { clearSearchQuery } from '../store/actions/searchActions';
import { getAllCategoriesAction } from '../store/actions/categoryActions';
import { getAllSubCategoriesAction } from '../store/actions/subCategoryActions';
import { setMobileDrawerVisability } from '../store/actions/drawerActions';

const { Title } = Typography;
const { useBreakpoint } = Grid;

const Shop = () => {
  const dispatch = useDispatch();
  const screens = useBreakpoint();
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

  const [filterQuery, setFilterQuery] = useState({}); // send this object to backend

  useEffect(() => {
    dispatch(getAllCategoriesAction());
    dispatch(getAllSubCategoriesAction());
  }, [dispatch]);

  // Get products by search input
  useEffect(() => {
    if (text.length > 0) {
      setPrice([0, 4999]); // reset price range to default values (shows on clinet)
      setCategoryCheckbox([]); // reset checkboxes (shows on clinet)
      setFilterQuery({}); // reset filter object to default
      setRatingCheckbox([]);
      setSubcategoryCheckbox([]);
      setBrandCheckbox([]);
      setColorCheckbox([]);
      setShippingCheckbox([]);

      setIsLoading(true);
      // make delay for requests optimization
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

  // Get products by default
  useEffect(() => {
    if (
      // if no text in search and filterQuery object is empty (first load of component)
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
  }, [text]);

  // FILTER BY ALL CRITERIAS
  useEffect(() => {
    // by default prevent request when there are no filters (when Shop component mount) => make request after check if filterQuery object is not empty
    if (
      Object.keys(filterQuery).length > 0 &&
      filterQuery.constructor === Object
    ) {
      dispatch(clearSearchQuery()); // clear text in search input
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
  }, [filterQuery]);

  // Clean local state when unmount Shop component – Fix warning in console
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

  // FILTER – PRICE RANGE
  // show marks on Ant Slider component dynamically
  const handlePriceSlider = (price) => {
    setPrice(price);
  };
  // Slider onAfterChange handler. Fire when onmouseup is fired => make request to server with price range. Ant Design Docs => https://ant.design/components/slider/#API
  const handleOnAfterChange = (price) => {
    setFilterQuery((prevState) => ({ ...prevState, price }));
  };

  // FILTER – CATEGORY CHECKBOXES
  // Handling checkboxes with categories
  const checkboxCategoryOptions = allCategories.map((category) => ({
    label: category.name,
    value: category._id,
  }));

  const onChangeCategoryCheckbox = (checkedValuese) => {
    setCategoryCheckbox(checkedValuese); // add checked values in state

    // add checked categories to filter object
    setFilterQuery((prevState) => ({
      ...prevState,
      category: checkedValuese,
    }));
  };

  // FILTER – RATING

  const onChangeRatingCheckbox = (checkedValuese) => {
    setRatingCheckbox(checkedValuese); // add checked values in state

    // add checked rates to filter object
    setFilterQuery((prevState) => ({
      ...prevState,
      stars: checkedValuese,
    }));
  };

  // FILTER – SUBCATEGORY CHECKBOXES
  // dispalay subcategories checkboxes dynamicaly depends parent category
  useEffect(() => {
    // if categoryCheckbox array is empty (default case) show all subcategories
    if (categoryCheckbox.length === 0) {
      const allSubs = allSubCategories.map((sub) => ({
        label: sub.name,
        value: sub._id,
      }));
      setDynamicSubOptions(allSubs);
    }
    if (categoryCheckbox.length > 0) {
      // when we choose category we clear subs from query object and subcategoryCheckbox
      setFilterQuery((prevState) => ({
        ...prevState,
        subcategories: [],
      }));
      setSubcategoryCheckbox([]);

      // display subs by checked parent category
      const showSubs = allSubCategories
        .filter((sub) => categoryCheckbox.includes(sub.category))
        .map((sub) => ({ label: sub.name, value: sub._id }));
      setDynamicSubOptions(showSubs);
    }
  }, [categoryCheckbox]);

  const onChangeSubcategoryCheckbox = (checkedValuese) => {
    setSubcategoryCheckbox(checkedValuese); // add checked values in state

    // add checked subcategories to filter object
    setFilterQuery((prevState) => ({
      ...prevState,
      subcategories: checkedValuese,
    }));
  };

  // FILTER – BRAND CHECKBOXES

  // hardcoded mock up data
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

  const onChangeBrandCheckbox = (checkedValuese) => {
    setBrandCheckbox(checkedValuese); // add checked values in state

    // add checked brands to filter object
    setFilterQuery((prevState) => ({
      ...prevState,
      brand: checkedValuese,
    }));
  };

  // FILTER – COLOR CHECKBOXES
  // hardcoded mock up data
  const colorOptions = ['Black', 'Brown', 'Silver', 'White', 'Blue', 'Red'].map(
    (color) => ({
      label: color,
      value: color,
    })
  );

  const onChangeColorCheckbox = (checkedValuese) => {
    setColorCheckbox(checkedValuese); // add checked values in state

    // add checked colors to filter object
    setFilterQuery((prevState) => ({
      ...prevState,
      color: checkedValuese,
    }));
  };

  // FILTER – SHIPPING CHECKBOXES
  // hardcoded mock up data
  const shippingOptions = ['Yes', 'No'].map((status) => ({
    label: status,
    value: status,
  }));

  const onChangeShippingCheckbox = (checkedValuese) => {
    setShippingCheckbox(checkedValuese); // add checked values in state

    // add checked colors to filter object
    setFilterQuery((prevState) => ({
      ...prevState,
      shipping: checkedValuese,
    }));
  };

  // all ShopFilters props
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

  const showMobileMenuDrawer = () => {
    dispatch(setMobileDrawerVisability(true));
  };

  return (
    <>
      <Row style={{ paddingLeft: 20 }}>
        <Space direction="horizontal" size="middle">
          {!screens.md && (
            <Button
              type="primary"
              shape="circle"
              icon={<MenuUnfoldOutlined />}
              size="large"
              onClick={showMobileMenuDrawer}
            />
          )}
          <Title
            level={2}
            style={{ color: 'black', marginTop: '10px', fontSize: 18 }}
          >
            Filters
          </Title>
        </Space>
      </Row>
      <Row>
        {!screens.md && (
          <MobileSideDrawer width={300}>
            <Col span={24}>
              <Title level={3} style={{ margin: '16px 20px' }}>
                Filters
              </Title>
              <ShopFilters {...shopFilterProps} />
            </Col>
          </MobileSideDrawer>
        )}

        {screens.md && (
          <Col xl={{ span: 4 }} lg={{ span: 6 }} md={{ span: 6 }}>
            <ShopFilters {...shopFilterProps} />
          </Col>
        )}

        <Col xl={{ span: 20 }} lg={{ span: 18 }} md={{ span: 18 }}>
          <Row>
            <Col
              xl={{ span: 16, offset: 4 }}
              lg={{ span: 20, offset: 2 }}
              md={{ span: 20, offset: 2 }}
              xs={{ span: 20, offset: 2 }}
            >
              <Title level={3} style={{ marginTop: 16 }}>
                Products
              </Title>
            </Col>
          </Row>
          <Row>
            <Col
              xl={{ span: 16, offset: 4 }}
              lg={{ span: 20, offset: 2 }}
              md={{ span: 20, offset: 2 }}
              xs={{ span: 20, offset: 2 }}
            >
              <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                {isLoading && products.length === 0 && (
                  <Col span={24}>
                    <div className="spiner">
                      <Spin size="large" />
                    </div>
                  </Col>
                )}

                {!isLoading && products.length === 0 && (
                  <Col span={24}>
                    <div className="spiner">
                      <Title level={4} style={{ marginTop: 16 }}>
                        No matches
                      </Title>
                    </div>
                  </Col>
                )}

                {products &&
                  products.map((product) => (
                    <Col
                      xs={24}
                      sm={24}
                      md={12}
                      lg={8}
                      xl={8}
                      key={product._id}
                      style={{ marginBottom: 40 }}
                    >
                      <ProductCard product={product} />
                    </Col>
                  ))}
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
};

export default Shop;
