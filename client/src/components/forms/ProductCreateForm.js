import { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { Form, Input, Button, Select } from 'antd';

import { FileAddOutlined } from '@ant-design/icons';

import { createProductAction } from '../../store/actions/productActions';
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

const ProductCreateForm = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { allCategories } = useSelector((state) => state.category);
  const { createProductInProgress } = useSelector((state) => state.product);

  useEffect(() => {
    // get all categories to fill Category select
    dispatch(getAllCategoriesAction());
  }, []);

  const onFinish = (values) => {
    dispatch(createProductAction(values, user.token));
    form.resetFields();
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Form
      form={form}
      name="product"
      layout="vertical"
      size="large"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      initialValues={{
        shipping: 'Please select',
        color: 'Please select',
        brand: 'Please select',
        category: 'Please select',
      }}
    >
      <Form.Item
        name="title"
        label="Title"
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
        label="Description"
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
        <Select>
          {allCategories.length > 0 &&
            allCategories.map((category) => (
              <Select.Option key={category._id} value={category._id}>
                {category.name}
              </Select.Option>
            ))}
        </Select>
      </Form.Item>
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
        <Input />
      </Form.Item>
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

export default ProductCreateForm;
