import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  Layout,
  Typography,
  Divider,
  Row,
  Col,
  Form,
  Input,
  Button,
  Select,
} from 'antd';

import { toast } from 'react-toastify';

import AdminNav from '../../../components/nav/AdminNav';

import { createProductAction } from '../../../store/actions/productActions';

const { Header, Content } = Layout;
const { Title } = Typography;

const ProductCreate = () => {
  const [form] = Form.useForm();
  // hardcoded with data from product model
  const colors = ['Black', 'Brown', 'Silver', 'White', 'Blue', 'Red'];
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

  //   const handleDelete = (category) => {
  //     if (window.confirm(`Delete ${category.name} category?`)) {
  //       setIdOfClickedItem(category._id);

  //       dispatch(deleteCategoryAction(category.slug, user.token)).then(() => {
  //         // dispatch getAllCategoriesAction after category was deleted
  //         dispatch(getAllCategoriesAction());
  //         toast.success(`Category ${category.name} deleted`);
  //       });
  //     }
  //   };

  const onFinish = (values) => {
    console.log(values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <>
      <Layout>
        <Header>
          <Title level={2} style={{ color: 'white', marginTop: '10px' }}>
            Admin Create Product Page
          </Title>
        </Header>
        <Layout hasSider>
          <AdminNav />
          <Content style={{ backgroundColor: 'white' }}>
            <Row>
              <Col
                xl={{ span: 10, offset: 7 }}
                lg={{ span: 20, offset: 2 }}
                md={{ span: 20, offset: 2 }}
                xs={{ span: 20, offset: 2 }}
              >
                <Title level={2} style={{ marginTop: 40 }}>
                  Create New Product
                </Title>
              </Col>
            </Row>
            <Row>
              <Col
                xl={{ span: 10, offset: 7 }}
                lg={{ span: 20, offset: 2 }}
                md={{ span: 20, offset: 2 }}
                xs={{ span: 20, offset: 2 }}
              >
                <Divider style={{ fontWeight: 'bold' }}>
                  Create new product
                </Divider>
              </Col>
            </Row>
            <Row>
              <Col
                xl={{ span: 10, offset: 7 }}
                lg={{ span: 20, offset: 2 }}
                md={{ span: 20, offset: 2 }}
                xs={{ span: 20, offset: 2 }}
              >
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
                        message: 'Please input new product category!',
                      },
                    ]}
                  >
                    <Input />
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
                    <Button
                      type="primary"
                      htmlType="submit"
                      style={{ marginTop: 10, marginBottom: 40 }}
                      size="large"
                      block
                    >
                      Create product
                    </Button>
                  </Form.Item>
                </Form>
              </Col>
            </Row>
          </Content>
        </Layout>
      </Layout>
    </>
  );
};

export default ProductCreate;
