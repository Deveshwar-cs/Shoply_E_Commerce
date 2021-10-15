import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Typography, Row, Col, Spin } from 'antd';

import {
  getOneProductAction,
  clearOneProduct,
} from '../store/actions/productActions';

import SingleProduct from '../components/cards/SingleProduct';

const { Title } = Typography;

const Product = ({ match }) => {
  const { slug } = match.params;
  const dispatch = useDispatch();
  const { oneProduct, getOneProductInProgress } = useSelector(
    (state) => state.product
  );

  useEffect(() => {
    dispatch(getOneProductAction(slug));
  }, []);

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
                Related products
              </Title>
              <hr />
            </Col>
          </Row>
        </>
      )}
    </>
  );
};

export default Product;
