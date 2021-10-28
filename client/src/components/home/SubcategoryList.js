import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { Row, Col, Button, Spin } from 'antd';

import { getAllSubCategoriesAction } from '../../store/actions/subCategoryActions';

const SubcategoryList = () => {
  const dispatch = useDispatch();
  const { getSubCategoriesInProgress, allSubCategories } = useSelector(
    (state) => state.sub
  );
  useEffect(() => {
    dispatch(getAllSubCategoriesAction());
  }, []);

  return (
    <>
      {getSubCategoriesInProgress ? (
        <Row>
          <Col span={24} style={{ textAlign: 'center', paddingBottom: 40 }}>
            <Spin size="large" />
          </Col>
        </Row>
      ) : (
        <Row
          gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
          style={{
            paddingBottom: 40,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'baseline',
          }}
        >
          {allSubCategories.map((subcategory) => (
            <Button
              type="primary"
              shape="round"
              size="large"
              key={subcategory._id}
              style={{ marginRight: 16, marginBottom: 16 }}
            >
              <Link to={`/subcategory/${subcategory.slug}`}>
                {subcategory.name}
              </Link>
            </Button>
          ))}
        </Row>
      )}
    </>
  );
};

export default SubcategoryList;
