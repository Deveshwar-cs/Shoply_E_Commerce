import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Typography, Row, Col, Spin, Menu, Slider } from 'antd';
import { DollarOutlined } from '@ant-design/icons';

import ProductCard from '../components/cards/ProductCard';

import {
  getProductByFilter,
  getAllProductsByCount,
} from '../functions/productFunctions';
import { clearSearchQuery } from '../store/actions/searchActions';

const { SubMenu } = Menu;
const { Title, Text } = Typography;

const Shop = () => {
  const dispatch = useDispatch();
  const { text } = useSelector((state) => state.search);

  // use component local state because we don't need share this data with other component
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [price, setPrice] = useState([0, 4999]);

  // Get products by search
  useEffect(() => {
    // make delay for requests optimization
    const delayed = setTimeout(() => {
      if (text.length > 0) {
        setIsLoading(true);
        getProductByFilter({ query: text })
          .then((res) => {
            setProducts(res.data);
            setIsLoading(false);
          })
          .catch((error) => {
            setIsLoading(false);
            console.log(error);
          });
      }
    }, 300);

    return () => clearTimeout(delayed);
  }, [text]);

  // Get products by default
  useEffect(() => {
    if (text.length === 0) {
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

  // Clean local state when unmount Shop component – Fix warning in console
  useEffect(() => {
    return () => {
      setProducts([]);
      setPrice([0, 0]);
    };
  }, []);

  // FILTER – PRICE RANGE
  // show marks on Ant Slider component dynamically
  const handlePriceSlider = (price) => {
    // clean search text if needed
    dispatch(clearSearchQuery());
    setPrice(price);
  };
  // onAfterChange handler. Fire when onmouseup is fired => make request to server with price range Ant Design Docs => https://ant.design/components/slider/#API
  const handleOnAfterChange = (price) => {
    setIsLoading(true);
    getProductByFilter({ price })
      .then((res) => {
        setProducts(res.data);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        console.log(error);
      });
  };

  return (
    <>
      <Row>
        <Col span={4}>
          <Title level={3} style={{ margin: '16px 20px' }}>
            Filters
          </Title>
          <Menu mode="inline" defaultOpenKeys={['1']}>
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
                key="2"
                className="ant-slider-wrapper"
              >
                <Slider
                  range
                  tipFormatter={(value) => `$${value}`}
                  value={price}
                  onChange={handlePriceSlider}
                  onAfterChange={handleOnAfterChange}
                  max="4999"
                  style={{ paddingRight: 15 }}
                />
                <Text>Chosen range: {`$${price[0]} – $${price[1]}`}</Text>
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
