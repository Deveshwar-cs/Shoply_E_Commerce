import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Link } from 'react-router-dom';

import {
  Layout,
  Typography,
  Divider,
  List,
  Row,
  Col,
  Form,
  Input,
  Button,
  Spin,
} from 'antd';

import { toast } from 'react-toastify';

import {
  LaptopOutlined,
  DeleteOutlined,
  EditOutlined,
} from '@ant-design/icons';

import AdminNav from '../../components/nav/AdminNav';

import {
  createCategoryAction,
  getAllCategoriesAction,
  deleteCategoryAction,
} from '../../store/actions/categoryActions';

const { Header, Content } = Layout;
const { Title, Text } = Typography;
const { Item } = Form;

const CategoryCreate = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const {
    createCategoryInProgress,
    allCategories,
    getCategoriesInProgress,
    deleteCategoryInProgress,
  } = useSelector((state) => state.category);
  const { user } = useSelector((state) => state.auth);

  const [idOfClickedItem, setIdOfClickedItem] = useState('');

  // here we call useEffect only when component mounts, array with no dependencies
  useEffect(() => {
    dispatch(getAllCategoriesAction());
  }, []);

  const handleDelete = (category) => {
    if (window.confirm(`Delete ${category.name} category?`)) {
      setIdOfClickedItem(category._id);

      dispatch(deleteCategoryAction(category.slug, user.token)).then(() => {
        // dispatch getAllCategoriesAction after category was deleted
        dispatch(getAllCategoriesAction());
        toast.success(`Category ${category.name} deleted`);
      });
    }
  };

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
    dispatch(createCategoryAction(name, user.token))
      .then(() => {
        // dispatch getAllCategoriesAction after category was created
        dispatch(getAllCategoriesAction());
      })
      .catch((error) => console.log(error));
    form.resetFields();
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
              </Col>
            </Row>
            <Row>
              <Col lg={{ span: 10, offset: 7 }} xs={{ span: 20, offset: 2 }}>
                {getCategoriesInProgress ? (
                  <div className="spiner">
                    <Spin />
                  </div>
                ) : (
                  <>
                    <Divider style={{ fontWeight: 'bold' }}>
                      All Categories
                    </Divider>
                    <List>
                      {allCategories.map((category) => (
                        <List.Item key={category._id}>
                          <Text>{category.name}</Text>
                          <Link
                            to={`/admin/category/${category.slug}`}
                            style={{ marginLeft: 'auto', marginRight: 30 }}
                          >
                            <EditOutlined />
                          </Link>
                          {deleteCategoryInProgress && // show loading state on clicked Delete button with conditional rendering
                          idOfClickedItem === category._id ? (
                            <Button
                              danger
                              loading
                              icon={<DeleteOutlined />}
                            ></Button>
                          ) : (
                            <Button
                              danger
                              onClick={() => handleDelete(category)}
                              icon={<DeleteOutlined />}
                            ></Button>
                          )}
                        </List.Item>
                      ))}
                    </List>
                  </>
                )}
              </Col>
            </Row>
          </Content>
        </Layout>
      </Layout>
    </>
  );
};

export default CategoryCreate;
