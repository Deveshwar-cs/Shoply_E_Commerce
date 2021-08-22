import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Layout, Typography, Row, Col, Form, Input, Button } from 'antd';

import { toast } from 'react-toastify';

import { LaptopOutlined } from '@ant-design/icons';

import AdminNav from '../../components/nav/AdminNav';

import {
  updateCategoryAction,
  getOneCategoryAction,
} from '../../store/actions/categoryActions';

const { Header, Content } = Layout;
const { Title } = Typography;
const { Item } = Form;

const CategoryUpdate = ({ history, match }) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const { updateCategoryInProgress, oneCategory } = useSelector(
    (state) => state.category
  );
  const { user } = useSelector((state) => state.auth);

  // here we call useEffect only when component mounts, array with no dependencies
  useEffect(() => {
    dispatch(getOneCategoryAction(match.params.slug));
  }, []);

  useEffect(() => {
    if (oneCategory) {
      form.setFieldsValue({
        name: oneCategory.name,
      });
    }
  }, [form, oneCategory]);

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
    if (name === oneCategory.name)
      return toast.error(`Please enter a new catogory name!`);
    dispatch(updateCategoryAction(match.params.slug, { name }, user.token))
      .then((res) => {
        toast.success(`Category ${oneCategory.name} is updated!`);
        history.push('/admin/category');
      })
      .catch((error) => toast.error(`Category ${name} update is failed!`));
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const updateCategoryForm = () => (
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
        {updateCategoryInProgress ? (
          <Button
            type="primary"
            style={{ marginTop: 10 }}
            size="large"
            block
            icon={<LaptopOutlined />}
            loading
          >
            Update category
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
            Update category
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
            Admin Update Category Name Page
          </Title>
        </Header>
        <Layout hasSider>
          <AdminNav />
          <Content style={{ backgroundColor: 'white' }}>
            <Row>
              <Col lg={{ span: 8, offset: 8 }} xs={{ span: 20, offset: 2 }}>
                <Title level={2} style={{ marginTop: 40 }}>
                  Update Category Name
                </Title>
              </Col>
            </Row>
            <Row>
              <Col lg={{ span: 12, offset: 4 }} xs={{ span: 20, offset: 2 }}>
                {updateCategoryForm()}
              </Col>
            </Row>
          </Content>
        </Layout>
      </Layout>
    </>
  );
};

export default CategoryUpdate;
