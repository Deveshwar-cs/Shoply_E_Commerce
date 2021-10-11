import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Typography, Row, Col } from 'antd';

import {
  getOneProductAction,
  clearOneProduct,
} from '../store/actions/productActions';

const { Title } = Typography;

const Product = ({ match }) => {
  const { slug } = match.params;
  const dispatch = useDispatch();
  const { oneProduct } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(getOneProductAction(slug));
  }, []);

  useEffect(
    () => () => {
      dispatch(clearOneProduct());
    },
    []
  );
  console.log('PRODUCT PAGE ==>', oneProduct);

  return (
    <>
      <Row>
        <Col span={24}>
          <Title
            level={2}
            style={{
              color: 'black',
              padding: '20px 0',
              textAlign: 'center',
              backgroundColor: '#f6ffed',
              fontSize: 30,
              //margin: '40px 0',
            }}
          >
            {oneProduct && oneProduct.title}
          </Title>
        </Col>
      </Row>
      <Row>
        <Col
          xl={{ span: 24 }}
          lg={{ span: 24 }}
          md={{ span: 24 }}
          xs={{ span: 24 }}
        >
          SIngle product
        </Col>
      </Row>
      <Row>
        <Col span={24}>Related products</Col>
      </Row>
    </>
  );
};

export default Product;
