import { useDispatch } from 'react-redux';
import { setParentCategory } from '../../store/actions/subCategoryActions';
import { Select } from 'antd';

const { Option } = Select;

const CategorySelect = ({ allCategories, placeholderText }) => {
  const dispatch = useDispatch();

  function onChange(value) {
    console.log(`selected ${value}`);
    dispatch(setParentCategory(value));
  }

  function onBlur() {
    console.log('blur');
  }

  function onFocus() {
    console.log('focus');
  }

  function onSearch(val) {
    console.log('search:', val);
  }

  return (
    <Select
      showSearch
      size="large"
      style={{ width: '100%' }}
      placeholder={placeholderText}
      optionFilterProp="children"
      onChange={onChange}
      onFocus={onFocus}
      onBlur={onBlur}
      onSearch={onSearch}
      filterOption={(input, option) =>
        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
      }
    >
      {allCategories.map((category) => (
        <Option key={category._id} value={category._id}>
          {category.name}
        </Option>
      ))}
    </Select>
  );
};

export default CategorySelect;
