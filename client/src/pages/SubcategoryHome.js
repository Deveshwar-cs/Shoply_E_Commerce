import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Row, Col, Typography, Spin } from 'antd';
import ProductCard from '../components/cards/ProductCard';

import { getOneSubCategoryAction } from '../store/actions/subCategoryActions';

const { Title } = Typography;

const SubcategoryHome = ({ match }) => {
  const dispatch = useDispatch();
  const { slug } = match.params;

  const { oneSubCategory, getOneSubCategoryInProgress } = useSelector(
    (state) => state.sub
  );

  useEffect(() => {
    dispatch(getOneSubCategoryAction(slug));
  }, []);

  return (
    <>
      {getOneSubCategoryInProgress ? (
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
                  marginBottom: 40,
                }}
              >
                Products in subcategory "
                {oneSubCategory && oneSubCategory.subcategory.name}
                ": {oneSubCategory && oneSubCategory.products.length}
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
                {oneSubCategory &&
                  oneSubCategory.products.map((product) => (
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
        </>
      )}
    </>
  );
};

export default SubcategoryHome;
