import { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { Link } from 'react-router-dom';

import { Spin } from 'antd';

import { getAllSubCategoriesAction } from '../../../store/actions/subCategoryActions';

import './SubcategoryList.css';

const SubcategoryList = () => {
  const dispatch = useDispatch();

  const { getSubCategoriesInProgress, allSubCategories } = useSelector(
    (state) => state.sub
  );

  useEffect(() => {
    dispatch(getAllSubCategoriesAction());
  }, [dispatch]);

  return (
    <section className="subcategory-list">
      {getSubCategoriesInProgress ? (
        <div className="subcategory-loading">
          <Spin size="large" />
        </div>
      ) : (
        <div className="subcategory-grid">
          {allSubCategories.map((subcategory, index) => (
            <Link
              to={`/subcategory/${subcategory.slug}`}
              className="subcategory-item"
              key={subcategory._id}
            >
              <div className="subcategory-left">
                <span className="subcategory-number">
                  {String(index + 1).padStart(2, '0')}
                </span>

                <span className="subcategory-name">{subcategory.name}</span>
              </div>

              <span className="subcategory-arrow">↗</span>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
};

export default SubcategoryList;
