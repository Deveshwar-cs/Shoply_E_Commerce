import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { Row, Col, Typography, Spin } from 'antd';
import ProductCard from '../components/cards/ProductCard';

import { getOneCategoryAction } from '../store/actions/categoryActions';

const { Title } = Typography;

const CategoryHome = ({ match }) => {
  const dispatch = useDispatch();
  const { slug } = match.params;

  const { oneCategory, getOneCategoryInProgress } = useSelector(
    (state) => state.category
  );

  useEffect(() => {
    dispatch(getOneCategoryAction(slug));
  }, []);

  console.log('oneCategory', oneCategory);
  return (
    <>
      {getOneCategoryInProgress ? (
        <Row>
          <Col span={24}>
            <div className="spiner">
              <Spin size="large" />
            </div>
          </Col>
        </Row>
      ) : (
        <>
          <Row>
            <Col span={24}>
              <Title
                level={2}
                style={{
                  color: 'black',
                  padding: '20px 0',
                  textAlign: 'center',
                  backgroundColor: '#efdbff',
                  fontSize: 30,
                }}
              >
                Products in category "{oneCategory && oneCategory.category.name}
                ": {oneCategory && oneCategory.products.length}
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
              fghfgh
            </Col>
          </Row>
        </>
      )}
    </>
  );
};

export default CategoryHome;
