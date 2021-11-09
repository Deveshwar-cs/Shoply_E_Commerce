import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Typography, Row, Col, Spin, Menu, Slider, Checkbox } from 'antd';
import { DollarOutlined, DownSquareOutlined } from '@ant-design/icons';

import ProductCard from '../components/cards/ProductCard';

import {
  getProductByFilter,
  getAllProductsByCount,
} from '../functions/productFunctions';
import { clearSearchQuery } from '../store/actions/searchActions';
import { getAllCategoriesAction } from '../store/actions/categoryActions';

const { SubMenu } = Menu;
const { Title, Text } = Typography;

const Shop = () => {
  const dispatch = useDispatch();
  const { text } = useSelector((state) => state.search);
  const { allCategories, getCategoriesInProgress } = useSelector(
    (state) => state.category
  );

  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [price, setPrice] = useState([0, 4999]);
  const [categoryCheckbox, setCategoryCheckbox] = useState([]);

  const [filterQuery, setFilterQuery] = useState({}); // send this object to backend

  useEffect(() => {
    dispatch(getAllCategoriesAction());
  }, []);

  // Get products by search input
  useEffect(() => {
    if (text.length > 0) {
      setPrice([0, 4999]); // reset price range to default values (shows on clinet)
      setCategoryCheckbox([]); // reset checkboxes (shows on clinet)
      setFilterQuery({}); // reset filter object to default

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

  // FILTER
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
  const checkboxOptions = allCategories.map((category) => ({
    label: category.name,
    value: category._id,
  }));

  const onChangeCheckbox = (checkedValuese) => {
    setCategoryCheckbox(checkedValuese); // add checked values in state

    // add checked categories to filter object
    setFilterQuery((prevState) => ({
      ...prevState,
      category: checkedValuese,
    }));
  };

  return (
    <>
      <Row>
        <Col span={4}>
          <Title level={3} style={{ margin: '16px 20px' }}>
            Filters
          </Title>
          <Menu mode="inline" defaultOpenKeys={['1', '2']}>
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
                  options={checkboxOptions}
                  onChange={onChangeCheckbox}
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
