import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Typography, Row, Col, Spin } from 'antd';

import {
  getOneProductAction,
  clearOneProduct,
} from '../store/actions/productActions';
import { getRelatedProducts } from '../functions/productFunctions';

import SingleProduct from '../components/cards/SingleProduct';
import ProductCard from '../components/cards/ProductCard';
import LoadinCardList from '../components/cards/LoadingCardList';

const { Title, Text } = Typography;

const Product = ({ match }) => {
  const { slug } = match.params;
  const dispatch = useDispatch();
  const { oneProduct, getOneProductInProgress } = useSelector(
    (state) => state.product
  );

  // use local state because related products display only on Product page
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [relatedIsLoading, setRelatedIsLoading] = useState(false);

  useEffect(() => {
    dispatch(getOneProductAction(slug));
  }, [slug]);

  useEffect(() => {
    if (oneProduct) {
      setRelatedIsLoading(true);
      getRelatedProducts(oneProduct._id).then((res) => {
        setRelatedProducts(res.data);
        setRelatedIsLoading(false);
      });
    }
  }, [oneProduct]);

  useEffect(
    () => () => {
      dispatch(clearOneProduct());
    },
    []
  );

  return (
    <>
      {getOneProductInProgress ? (
        <Row>
          <Col span={24}>
            <div className="spiner">
              <Spin />
            </div>
          </Col>
        </Row>
      ) : (
        <>
          <Row>
            <Col
              xl={{ span: 20, offset: 2 }}
              lg={{ span: 20, offset: 2 }}
              md={{ span: 20, offset: 2 }}
              xs={{ span: 24 }}
            >
              {oneProduct && <SingleProduct product={oneProduct} />}
            </Col>
          </Row>

          <Row>
            <Col
              xl={{ span: 20, offset: 2 }}
              lg={{ span: 20, offset: 2 }}
              md={{ span: 20, offset: 2 }}
              xs={{ span: 24 }}
              style={{ textAlign: 'center', padding: '20px 0' }}
            >
              <hr />
              <Title level={3} style={{ margin: '20px 0' }}>
                Related Products
              </Title>
              <Row>
                <Col
                  xl={{ span: 20, offset: 2 }}
                  lg={{ span: 20, offset: 2 }}
                  md={{ span: 20, offset: 2 }}
                  xs={{ span: 20, offset: 2 }}
                >
                  {relatedIsLoading ? (
                    <LoadinCardList count={3} />
                  ) : (
                    <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                      {relatedProducts.map((product) => (
                        <Col
                          xs={24}
                          sm={24}
                          md={12}
                          lg={8}
                          xl={8}
                          key={product._id}
                        >
                          <ProductCard {...product} />
                        </Col>
                      ))}
                    </Row>
                  )}
                  {relatedProducts.length === 0 && (
                    <Row>
                      <Col
                        xl={{ span: 20, offset: 2 }}
                        lg={{ span: 20, offset: 2 }}
                        md={{ span: 20, offset: 2 }}
                        xs={{ span: 24 }}
                        style={{ textAlign: 'center', padding: '20px 0' }}
                      >
                        <Text strong type="secondary">
                          There are no related products yet!
                        </Text>
                      </Col>
                    </Row>
                  )}
                </Col>
              </Row>

              <hr style={{ marginTop: 40 }} />
            </Col>
          </Row>
        </>
      )}
    </>
  );
};

export default Product;
