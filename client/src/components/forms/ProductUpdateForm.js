import { useEffect, useState, memo } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Input, Button, Select } from 'antd';

import { FileAddOutlined } from '@ant-design/icons';

import FileUpload from './FileUpload';

import {
  getAllSubCategoriesByParentAction,
  clearAllSubCategoriesByParent,
  clearImgInProductForm,
  getOneProductAction,
} from '../../store/actions/productActions';
import { getAllCategoriesAction } from '../../store/actions/categoryActions';

const brands = [
  'Apple',
  'Samsung',
  'Microsoft',
  'Lenovo',
  'Dell',
  'Xiaomi',
  'Google',
  'ASUS',
];

const colors = ['Black', 'Brown', 'Silver', 'White', 'Blue', 'Red'];

const ProductUpdateForm = () => {
  const [form] = Form.useForm();
  const { slug } = useParams();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { allCategories } = useSelector((state) => state.category);
  const {
    createProductInProgress,
    getAllSubByParentInProgress,
    allSubsByParent,
    imgURLs,
    oneProduct,
  } = useSelector((state) => state.product);

  let [parentCategoryId, setParentCategoryId] = useState('');

  useEffect(() => {
    // get One category to fill all fields
    dispatch(getOneProductAction(slug));
  }, []);

  useEffect(() => {
    if (oneProduct) {
      form.setFieldsValue({
        title: oneProduct.title,
        description: oneProduct.description,
        price: oneProduct.price,
        category: oneProduct.category._id,
        //subcategory: oneProduct.subcategory,
        shipping: oneProduct.shipping,
        quantity: oneProduct.quantity,
        color: oneProduct.color,
        brand: oneProduct.brand,
      });
    }
  }, [oneProduct]);

  useEffect(() => {
    // get all categories to fill Category select
    dispatch(getAllCategoriesAction());
  }, []);

  //get subcategories by parent category and fill subcategories select option
  //   useEffect(() => {
  //     if (parentCategoryId.length > 0) {
  //       dispatch(getAllSubCategoriesByParentAction(parentCategoryId));
  //     }
  //   }, [parentCategoryId]);

  // Clear subcategory select when parentCategoryId changed
  //   useEffect(() => {
  //     form.resetFields(['subcategory']);
  //   }, [parentCategoryId]);

  //clear local state with parent category and redux state allSubsByParent when component unmount
  //   useEffect(
  //     () => () => {
  //       setParentCategoryId('');
  //       dispatch(clearAllSubCategoriesByParent());
  //     },
  //     []
  //   );

  const onFinish = (values) => {
    // dispatch(
    //   createProductAction({ ...values, images: [...imgURLs] }, user.token)
    // );
    console.log('onFinish values', values);
    //dispatch(clearAllSubCategoriesByParent());
    //dispatch(clearImgInProductForm());

    // form.resetFields([
    //   'title',
    //   'description',
    //   'price',
    //   'category',
    //   'subcategory',
    //   'shipping',
    //   'quantity',
    //   'color',
    //   'brand',
    // ]);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  // dispatch parent category to redux store
  const onParentCategoryChange = (parentCategoryId) => {
    setParentCategoryId(parentCategoryId);
  };

  return (
    <Form
      form={form}
      name="product"
      layout="vertical"
      size="large"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <Form.Item
        name="title"
        label="Title (52 charachters maximum)"
        rules={[
          {
            required: true,
            message: 'Please input new product title!',
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="description"
        label="Description (2000 charachters maximum)"
        rules={[
          {
            required: true,
            message: 'Please input new product description!',
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="price"
        label="Price"
        rules={[
          {
            required: true,
            message: 'Please input new product price!',
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="category"
        label="Category"
        rules={[
          {
            required: true,
            message: 'Please select category for new product!',
          },
        ]}
      >
        <Select onChange={onParentCategoryChange}>
          {allCategories.length > 0 &&
            allCategories.map((category) => (
              <Select.Option key={category._id} value={category._id}>
                {category.name}
              </Select.Option>
            ))}
        </Select>
      </Form.Item>

      {allSubsByParent.length === 0 && (
        <Form.Item
          name="subcategory"
          label="Subcategory (Select parent category first)"
        >
          <Select disabled>
            <Select.Option>Option</Select.Option>
          </Select>
        </Form.Item>
      )}

      {allSubsByParent.length > 0 && getAllSubByParentInProgress && (
        <Form.Item name="subcategory" label="Subcategory" loading>
          <Select mode="multiple" loading>
            <Select.Option>Option</Select.Option>
          </Select>
        </Form.Item>
      )}

      {allSubsByParent.length > 0 && !getAllSubByParentInProgress && (
        <Form.Item
          name="subcategory"
          label="Subcategory"
          rules={[
            {
              required: true,
              message: 'Please input new product subcategory!',
            },
          ]}
        >
          <Select mode="multiple">
            {allSubsByParent.map((category) => (
              <Select.Option key={category._id} value={category._id}>
                {category.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
      )}

      <Form.Item
        name="shipping"
        label="Shipping"
        rules={[
          {
            required: true,
            message: 'Please select shipping!',
          },
        ]}
      >
        <Select>
          <Select.Option value="No">No</Select.Option>
          <Select.Option value="Yes">Yes</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item
        name="quantity"
        label="Quantity"
        rules={[
          {
            required: true,
            message: 'Please input product quantity!',
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="color"
        label="Color"
        rules={[
          {
            required: true,
            message: 'Please select product color!',
          },
        ]}
      >
        <Select>
          {colors.map((color) => (
            <Select.Option key={color} value={color}>
              {color}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item
        name="brand"
        label="Brand"
        rules={[
          {
            required: true,
            message: 'Please select product brand!',
          },
        ]}
      >
        <Select>
          {brands.map((brand) => (
            <Select.Option key={brand} value={brand}>
              {brand}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
      <FileUpload />
      <Form.Item>
        {createProductInProgress ? (
          <Button
            type="primary"
            style={{ marginTop: 10, marginBottom: 40 }}
            size="large"
            block
            icon={<FileAddOutlined />}
            loading
          >
            Create product
          </Button>
        ) : (
          <Button
            type="primary"
            htmlType="submit"
            style={{ marginTop: 10, marginBottom: 40 }}
            size="large"
            block
            icon={<FileAddOutlined />}
          >
            Create product
          </Button>
        )}
      </Form.Item>
    </Form>
  );
};

export default memo(ProductUpdateForm);
