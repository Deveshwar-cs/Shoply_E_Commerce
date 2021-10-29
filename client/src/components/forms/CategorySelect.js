import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  setParentCategory,
  clearParentCategory,
} from '../../store/actions/subCategoryActions';
import { Select, Form } from 'antd';

const { Option } = Select;

const CategorySelect = ({ placeholderText, oneSubCategory, allCategories }) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const { parentCategory } = useSelector((state) => state.sub);

  // Seting up CategorySelect component behaviour depend where it used (SubCategoryCreate or SubCategoryUpdate)
  // SubCategoryUpdate page always have oneSubCategory prop, SubCategoryCreate page doesn't
  useEffect(() => {
    if (oneSubCategory) {
      dispatch(setParentCategory(oneSubCategory.subcategory.category));
    }
  }, [oneSubCategory]);

  useEffect(() => {
    if (parentCategory.length > 0) {
      form.setFieldsValue({
        select: parentCategory,
      });
    }
    if (parentCategory.length === 0) {
      form.setFieldsValue({
        select: null,
      });
    }
  }, [form, parentCategory]);

  // clear parentCategory only when unmount SubCategoryUpdate component(page)
  useEffect(
    () => () => {
      if (oneSubCategory) {
        dispatch(clearParentCategory());
      }
    },
    []
  );

  function onChange(value) {
    //console.log(`selected ${value}`);
    dispatch(setParentCategory(value));
  }

  // function onBlur() {
  //   console.log('blur');
  // }

  // function onFocus() {
  //   console.log('focus');
  // }

  // function onSearch(val) {
  //   console.log('search:', val);
  // }

  return (
    <Form form={form}>
      <Form.Item name="select">
        <Select
          showSearch
          size="large"
          style={{ width: '100%' }}
          placeholder={placeholderText}
          optionFilterProp="children"
          onChange={onChange}
          // onFocus={onFocus}
          // onBlur={onBlur}
          // onSearch={onSearch}
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
      </Form.Item>
    </Form>
  );
};

export default CategorySelect;
