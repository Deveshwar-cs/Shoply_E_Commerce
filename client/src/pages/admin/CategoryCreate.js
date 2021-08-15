import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Layout, Typography } from 'antd';
import { Row, Col, Form, Input, Button } from 'antd';
import { Spin } from 'antd';
import { LaptopOutlined } from '@ant-design/icons';

import AdminNav from '../../components/nav/AdminNav';

import {
  createCategoryAction,
  getAllCategoriesAction,
  deleteCategory,
} from '../../store/actions/categoryActions';

const { Header, Content } = Layout;
const { Title } = Typography;
const { Item } = Form;

const CategoryCreate = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const { createCategoryInProgress, allCategories, getCategoriesInProgress } =
    useSelector((state) => state.category);
  const { user } = useSelector((state) => state.auth);

  // here we call useEffect only when component mounts, array with no dependencies
  useEffect(() => {
    dispatch(getAllCategoriesAction());
  }, []);

  const formItemLayout = {
    labelCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 8,
      },
    },
    wrapperCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 16,
      },
    },
  };
  const tailFormItemLayout = {
    wrapperCol: {
      xs: {
        span: 24,
        offset: 0,
      },
      sm: {
        span: 16,
        offset: 8,
      },
    },
  };

  const onFinish = ({ name }) => {
    dispatch(createCategoryAction(name, user.token)).then(() =>
      // call getAllCategoriesAction after category was created
      dispatch(getAllCategoriesAction())
    );
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const createCategoryForm = () => (
    <Form
      {...formItemLayout}
      style={{ marginTop: 20 }}
      form={form}
      size="large"
      name="category"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      scrollToFirstError
    >
      <Item
        name="name"
        label="Category name"
        rules={[
          {
            required: true,
            message: 'Please input new category name!',
          },
        ]}
      >
        <Input size="large" placeholder="Enter new category name" autoFocus />
      </Item>

      <Item {...tailFormItemLayout}>
        {createCategoryInProgress ? (
          <Button
            type="primary"
            style={{ marginTop: 10 }}
            size="large"
            block
            icon={<LaptopOutlined />}
            loading
          >
            Add new category
          </Button>
        ) : (
          <Button
            type="primary"
            htmlType="submit"
            style={{ marginTop: 10 }}
            size="large"
            block
            icon={<LaptopOutlined />}
          >
            Add new category
          </Button>
        )}
      </Item>
    </Form>
  );

  return (
    <>
      <Layout>
        <Header>
          <Title level={2} style={{ color: 'white', marginTop: '10px' }}>
            Admin Create Category Page
          </Title>
        </Header>
        <Layout hasSider>
          <AdminNav />
          <Content style={{ backgroundColor: 'white' }}>
            <>
              <Row>
                <Col lg={{ span: 8, offset: 8 }} xs={{ span: 20, offset: 2 }}>
                  <Title level={2} style={{ marginTop: 40 }}>
                    Create New Category
                  </Title>
                </Col>
              </Row>
              <Row>
                <Col lg={{ span: 12, offset: 4 }} xs={{ span: 20, offset: 2 }}>
                  {createCategoryForm()}
                  <hr />
                  {getCategoriesInProgress ? (
                    <Spin />
                  ) : (
                    allCategories.map((category) => `${category.name} `)
                  )}
                </Col>
              </Row>
            </>
          </Content>
        </Layout>
      </Layout>
    </>
  );
};

export default CategoryCreate;
