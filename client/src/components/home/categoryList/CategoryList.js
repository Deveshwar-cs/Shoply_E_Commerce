import { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { Link } from 'react-router-dom';

import { Spin } from 'antd';

import { getAllCategoriesAction } from '../../../store/actions/categoryActions';

import './CategoryList.css';

const CategoryList = () => {
  const dispatch = useDispatch();

  const { allCategories, getCategoriesInProgress } = useSelector(
    (state) => state.category
  );

  useEffect(() => {
    dispatch(getAllCategoriesAction());
  }, [dispatch]);

  return (
    <section className="category-list">
      {getCategoriesInProgress ? (
        <div className="category-loading">
          <Spin size="large" />
        </div>
      ) : (
        <div className="category-grid">
          {allCategories.map((category, index) => (
            <Link
              to={`/category/${category.slug}`}
              className="category-item"
              key={category._id}
            >
              <div className="category-number">
                {String(index + 1).padStart(2, '0')}
              </div>

              <div className="category-name">{category.name}</div>

              <div className="category-arrow">↗</div>

              <div className="category-line"></div>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
};

export default CategoryList;
