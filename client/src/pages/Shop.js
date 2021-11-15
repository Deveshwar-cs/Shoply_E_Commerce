import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Typography, Row, Col, Spin, Menu, Slider, Checkbox, Rate } from 'antd';
import {
  DollarOutlined,
  DownSquareOutlined,
  StarOutlined,
  StarFilled,
  TagsOutlined,
} from '@ant-design/icons';

import ProductCard from '../components/cards/ProductCard';

import {
  getProductByFilter,
  getAllProductsByCount,
} from '../functions/productFunctions';
import { clearSearchQuery } from '../store/actions/searchActions';
import { getAllCategoriesAction } from '../store/actions/categoryActions';
import { getAllSubCategoriesAction } from '../store/actions/subCategoryActions';

const { SubMenu } = Menu;
const { Title, Text } = Typography;

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

  const [filterQuery, setFilterQuery] = useState({}); // send this object to backend

  useEffect(() => {
    dispatch(getAllCategoriesAction());
    dispatch(getAllSubCategoriesAction());
  }, []);

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
    console.log('filterQuery', filterQuery);
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
  const displayStars = (quantity) => {
    let iconsArrey = [];
    for (let i = 1; i <= quantity; i++) {
      iconsArrey.push(<StarFilled style={{ color: '#fbdb14' }} key={i} />);
    }
    return iconsArrey;
  };

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

  return (
    <>
      <Row>
        <Col span={4}>
          <Title level={3} style={{ margin: '16px 20px' }}>
            Filters
          </Title>
          <Menu
            mode="inline"
            defaultOpenKeys={['1', '2', '3', '4', '5', '6', '7']}
          >
            <SubMenu
              title={
                <span style={{ fontSize: 18 }}>
                  <DollarOutlined style={{ fontSize: 18 }} /> Price
                </span>
              }
              key="1"
            >
              <Menu.Item
                style={{ paddingLeft: 15, width: '100%', height: 80 }}
                key="price"
                className="ant-slider-wrapper"
              >
                <Slider
                  range
                  tipFormatter={(value) => `$${value}`}
                  value={price}
                  onChange={handlePriceSlider}
                  onAfterChange={handleOnAfterChange}
                  max="4999"
                />
                <Text>Chosen range: {`$${price[0]} – $${price[1]}`}</Text>
              </Menu.Item>
            </SubMenu>

            <SubMenu
              title={
                <span style={{ fontSize: 18 }}>
                  <DownSquareOutlined style={{ fontSize: 18 }} /> Category
                </span>
              }
              key="2"
            >
              <Menu.Item
                style={{ paddingLeft: 15, width: '100%', height: '100%' }}
                key="category"
                className="ant-slider-wrapper"
              >
                <Checkbox.Group
                  options={checkboxCategoryOptions}
                  onChange={onChangeCategoryCheckbox}
                  disabled={getCategoriesInProgress}
                  value={categoryCheckbox}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    padding: '10px 0',
                  }}
                ></Checkbox.Group>
              </Menu.Item>
            </SubMenu>

            <SubMenu
              title={
                <span style={{ fontSize: 18 }}>
                  <StarOutlined style={{ fontSize: 18 }} /> Rating
                </span>
              }
              key="3"
            >
              <Menu.Item
                style={{ paddingLeft: 15, width: '100%', height: '100%' }}
                key="rating"
                className="ant-slider-wrapper"
              >
                <Checkbox.Group
                  onChange={onChangeRatingCheckbox}
                  value={ratingCheckbox}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    padding: '10px 0',
                  }}
                >
                  <Checkbox value={5}>{displayStars(5)}</Checkbox>
                  <Checkbox value={4}>{displayStars(4)}</Checkbox>
                  <Checkbox value={3}>{displayStars(3)}</Checkbox>
                  <Checkbox value={2}>{displayStars(2)}</Checkbox>
                  <Checkbox value={1}>{displayStars(1)}</Checkbox>
                </Checkbox.Group>
              </Menu.Item>
            </SubMenu>

            <SubMenu
              title={
                <span style={{ fontSize: 18 }}>
                  <TagsOutlined style={{ fontSize: 18 }} /> Subcategories
                </span>
              }
              key="4"
            >
              <Menu.Item
                style={{ paddingLeft: 15, width: '100%', height: '100%' }}
                key="subcategory"
                className="ant-slider-wrapper"
              >
                <Checkbox.Group
                  options={dynamicSubOptions}
                  onChange={onChangeSubcategoryCheckbox}
                  value={subcategoryCheckbox}
                  disabled={getSubCategoriesInProgress}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    padding: '10px 0',
                  }}
                ></Checkbox.Group>
              </Menu.Item>
            </SubMenu>

            <SubMenu
              title={
                <span style={{ fontSize: 18 }}>
                  <TagsOutlined style={{ fontSize: 18 }} /> Brands
                </span>
              }
              key="5"
            >
              <Menu.Item
                style={{ paddingLeft: 15, width: '100%', height: '100%' }}
                key="brands"
                className="ant-slider-wrapper"
              >
                <Checkbox.Group
                  options={brandOptions}
                  onChange={onChangeBrandCheckbox}
                  value={brandCheckbox}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    padding: '10px 0',
                  }}
                ></Checkbox.Group>
              </Menu.Item>
            </SubMenu>

            <SubMenu
              title={
                <span style={{ fontSize: 18 }}>
                  <TagsOutlined style={{ fontSize: 18 }} /> Colors
                </span>
              }
              key="6"
            >
              <Menu.Item
                style={{ paddingLeft: 15, width: '100%', height: '100%' }}
                key="colors"
                className="ant-slider-wrapper"
              >
                <Checkbox.Group
                  options={colorOptions}
                  onChange={onChangeColorCheckbox}
                  value={colorCheckbox}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    padding: '10px 0',
                  }}
                ></Checkbox.Group>
              </Menu.Item>
            </SubMenu>
          </Menu>
        </Col>
        <Col span={20}>
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
                      <ProductCard {...product} />
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
