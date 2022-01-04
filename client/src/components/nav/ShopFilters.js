import { Typography, Menu, Slider, Checkbox } from 'antd';
import {
  DollarOutlined,
  DownSquareOutlined,
  StarOutlined,
  StarFilled,
  TagsOutlined,
  BgColorsOutlined,
  CarOutlined,
} from '@ant-design/icons';

const { SubMenu } = Menu;
const { Text } = Typography;

const displayStars = (quantity) => {
  let iconsArrey = [];
  for (let i = 1; i <= quantity; i++) {
    iconsArrey.push(<StarFilled style={{ color: '#fbdb14' }} key={i} />);
  }
  return iconsArrey;
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
    <Menu mode="inline" defaultOpenKeys={['1', '2', '3', '4', '5', '6', '7']}>
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
          key="price"
          className="ant-slider-wrapper"
        >
          <Slider
            range
            tipFormatter={(value) => `$${value}`}
            value={price}
            onChange={handlePriceSlider}
            onAfterChange={handleOnAfterChange}
            max="4999"
          />
          <Text>Chosen range: {`$${price[0]} – $${price[1]}`}</Text>
        </Menu.Item>
      </SubMenu>

      <SubMenu
        title={
          <span style={{ fontSize: 18 }}>
            <DownSquareOutlined style={{ fontSize: 18 }} /> Category
          </span>
        }
        key="2"
      >
        <Menu.Item
          style={{ paddingLeft: 15, width: '100%', height: '100%' }}
          key="category"
          className="ant-slider-wrapper"
        >
          <Checkbox.Group
            options={checkboxCategoryOptions}
            onChange={onChangeCategoryCheckbox}
            disabled={getCategoriesInProgress}
            value={categoryCheckbox}
            style={{
              display: 'flex',
              flexDirection: 'column',
              padding: '10px 0',
            }}
          ></Checkbox.Group>
        </Menu.Item>
      </SubMenu>

      <SubMenu
        title={
          <span style={{ fontSize: 18 }}>
            <StarOutlined style={{ fontSize: 18 }} /> Rating
          </span>
        }
        key="3"
      >
        <Menu.Item
          style={{ paddingLeft: 15, width: '100%', height: '100%' }}
          key="rating"
          className="ant-slider-wrapper"
        >
          <Checkbox.Group
            onChange={onChangeRatingCheckbox}
            value={ratingCheckbox}
            style={{
              display: 'flex',
              flexDirection: 'column',
              padding: '10px 0',
            }}
          >
            <Checkbox value={5}>{displayStars(5)}</Checkbox>
            <Checkbox value={4}>{displayStars(4)}</Checkbox>
            <Checkbox value={3}>{displayStars(3)}</Checkbox>
            <Checkbox value={2}>{displayStars(2)}</Checkbox>
            <Checkbox value={1}>{displayStars(1)}</Checkbox>
          </Checkbox.Group>
        </Menu.Item>
      </SubMenu>

      <SubMenu
        title={
          <span style={{ fontSize: 18 }}>
            <TagsOutlined style={{ fontSize: 18 }} /> Subcategories
          </span>
        }
        key="4"
      >
        <Menu.Item
          style={{ paddingLeft: 15, width: '100%', height: '100%' }}
          key="subcategory"
          className="ant-slider-wrapper"
        >
          <Checkbox.Group
            options={dynamicSubOptions}
            onChange={onChangeSubcategoryCheckbox}
            value={subcategoryCheckbox}
            disabled={getSubCategoriesInProgress}
            style={{
              display: 'flex',
              flexDirection: 'column',
              padding: '10px 0',
            }}
          ></Checkbox.Group>
        </Menu.Item>
      </SubMenu>

      <SubMenu
        title={
          <span style={{ fontSize: 18 }}>
            <TagsOutlined style={{ fontSize: 18 }} /> Brands
          </span>
        }
        key="5"
      >
        <Menu.Item
          style={{ paddingLeft: 15, width: '100%', height: '100%' }}
          key="brands"
          className="ant-slider-wrapper"
        >
          <Checkbox.Group
            options={brandOptions}
            onChange={onChangeBrandCheckbox}
            value={brandCheckbox}
            style={{
              display: 'flex',
              flexDirection: 'column',
              padding: '10px 0',
            }}
          ></Checkbox.Group>
        </Menu.Item>
      </SubMenu>

      <SubMenu
        title={
          <span style={{ fontSize: 18 }}>
            <BgColorsOutlined style={{ fontSize: 18 }} /> Colors
          </span>
        }
        key="6"
      >
        <Menu.Item
          style={{ paddingLeft: 15, width: '100%', height: '100%' }}
          key="colors"
          className="ant-slider-wrapper"
        >
          <Checkbox.Group
            options={colorOptions}
            onChange={onChangeColorCheckbox}
            value={colorCheckbox}
            style={{
              display: 'flex',
              flexDirection: 'column',
              padding: '10px 0',
            }}
          ></Checkbox.Group>
        </Menu.Item>
      </SubMenu>

      <SubMenu
        title={
          <span style={{ fontSize: 18 }}>
            <CarOutlined style={{ fontSize: 18 }} /> Shipping
          </span>
        }
        key="7"
      >
        <Menu.Item
          style={{ paddingLeft: 15, width: '100%', height: '100%' }}
          key="shipping"
          className="ant-slider-wrapper"
        >
          <Checkbox.Group
            options={shippingOptions}
            onChange={onChangeShippingCheckbox}
            value={shippingCheckbox}
            style={{
              display: 'flex',
              flexDirection: 'column',
              padding: '10px 0',
            }}
          ></Checkbox.Group>
        </Menu.Item>
      </SubMenu>
    </Menu>
  );
};

export default ShopFilters;
