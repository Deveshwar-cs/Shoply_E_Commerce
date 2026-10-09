import { Slider, Checkbox } from 'antd';

import { StarFilled } from '@ant-design/icons';

import './ShopFilters.css';

const displayStars = (quantity) => {
  const iconsArray = [];

  for (let i = 1; i <= quantity; i++) {
    iconsArray.push(<StarFilled key={i} className="filter-star" />);
  }

  return iconsArray;
};

const FilterSection = ({ symbol, title, children }) => {
  return (
    <section className="filter-section">
      <div className="filter-section-header">
        <div className="filter-section-title">
          <span className="filter-section-icon">{symbol}</span>

          <span>{title}</span>
        </div>

        <span className="filter-arrow">⌄</span>
      </div>

      <div className="filter-section-content">{children}</div>
    </section>
  );
};

const ShopFilters = ({
  price,
  handlePriceSlider,
  handleOnAfterChange,

  checkboxCategoryOptions,
  onChangeCategoryCheckbox,
  getCategoriesInProgress,
  categoryCheckbox,

  onChangeRatingCheckbox,
  ratingCheckbox,

  dynamicSubOptions,
  onChangeSubcategoryCheckbox,
  subcategoryCheckbox,
  getSubCategoriesInProgress,

  brandOptions,
  onChangeBrandCheckbox,
  brandCheckbox,

  colorOptions,
  onChangeColorCheckbox,
  colorCheckbox,

  shippingOptions,
  onChangeShippingCheckbox,
  shippingCheckbox,
}) => {
  return (
    <div className="shop-filters">
      {/* PRICE */}

      <FilterSection symbol="$" title="Price">
        <div className="price-slider">
          <Slider
            range
            tipFormatter={(value) => `$${value}`}
            value={price}
            onChange={handlePriceSlider}
            onAfterChange={handleOnAfterChange}
            max={4999}
          />

          <div className="price-values">
            <span>${price[0]}</span>

            <span>${price[1]}</span>
          </div>

          <p className="chosen-price">Chosen range</p>
        </div>
      </FilterSection>

      {/* CATEGORY */}

      <FilterSection symbol="⌄" title="Category">
        <Checkbox.Group
          options={checkboxCategoryOptions}
          onChange={onChangeCategoryCheckbox}
          disabled={getCategoriesInProgress}
          value={categoryCheckbox}
          className="filter-checkbox-group"
        />
      </FilterSection>

      {/* RATING */}

      <FilterSection symbol="★" title="Rating">
        <Checkbox.Group
          onChange={onChangeRatingCheckbox}
          value={ratingCheckbox}
          className="filter-checkbox-group"
        >
          <Checkbox value={5}>
            <span className="rating-option">{displayStars(5)}</span>
          </Checkbox>

          <Checkbox value={4}>
            <span className="rating-option">{displayStars(4)}</span>
          </Checkbox>

          <Checkbox value={3}>
            <span className="rating-option">{displayStars(3)}</span>
          </Checkbox>

          <Checkbox value={2}>
            <span className="rating-option">{displayStars(2)}</span>
          </Checkbox>

          <Checkbox value={1}>
            <span className="rating-option">{displayStars(1)}</span>
          </Checkbox>
        </Checkbox.Group>
      </FilterSection>

      {/* SUBCATEGORIES */}

      <FilterSection symbol="◆" title="Subcategories">
        <Checkbox.Group
          options={dynamicSubOptions}
          onChange={onChangeSubcategoryCheckbox}
          value={subcategoryCheckbox}
          disabled={getSubCategoriesInProgress}
          className="filter-checkbox-group"
        />
      </FilterSection>

      {/* BRANDS */}

      <FilterSection symbol="◆" title="Brands">
        <Checkbox.Group
          options={brandOptions}
          onChange={onChangeBrandCheckbox}
          value={brandCheckbox}
          className="filter-checkbox-group"
        />
      </FilterSection>

      {/* COLORS */}

      <FilterSection symbol="●" title="Colors">
        <Checkbox.Group
          options={colorOptions}
          onChange={onChangeColorCheckbox}
          value={colorCheckbox}
          className="filter-checkbox-group"
        />
      </FilterSection>

      {/* SHIPPING */}

      <FilterSection symbol="→" title="Shipping">
        <Checkbox.Group
          options={shippingOptions}
          onChange={onChangeShippingCheckbox}
          value={shippingCheckbox}
          className="filter-checkbox-group"
        />
      </FilterSection>
    </div>
  );
};

export default ShopFilters;
