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
  Button,
  Spin,
} from 'antd';

import { toast } from 'react-toastify';

import { DeleteOutlined, EditOutlined } from '@ant-design/icons';

import AdminNav from '../../components/nav/AdminNav';
import CategoryForm from '../../components/forms/CategoryForm';
import { LocalSearch, searched } from '../../components/forms/LocalSearch';

import {
  createCategoryAction,
  getAllCategoriesAction,
  deleteCategoryAction,
} from '../../store/actions/categoryActions';

const { Header, Content } = Layout;
const { Title, Text } = Typography;

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
  const [keyword, setKeyword] = useState(''); // Step 1. Category search filter – Category search input local state

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

  // Step 3. Category search filter – onChange handler function
  // const handleSearchChange = (e) => {
  //   e.preventDefault();
  //   setKeyword(e.target.value.toLowerCase());
  // };

  // Step 4. Category search filter – filter method HOC
  // const serached = (keyword) => (category) =>
  //   category.name.toLowerCase().includes(keyword);

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

  // Step 2. Category search filter – input field

  // const searchInput = () => (
  //   <Input
  //     size="large"
  //     placeholder="Category search"
  //     value={keyword}
  //     onChange={handleSearchChange}
  //   />
  // );

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
              <Col
                xl={{ span: 10, offset: 7 }}
                lg={{ span: 20, offset: 2 }}
                md={{ span: 20, offset: 2 }}
                xs={{ span: 20, offset: 2 }}
              >
                <Title level={2} style={{ marginTop: 40 }}>
                  Create New Category
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
                <CategoryForm
                  form={form}
                  onFinish={onFinish}
                  onFinishFailed={onFinishFailed}
                  inProgress={createCategoryInProgress}
                  btnText="Add new category"
                  placeholderText="Enter new category name"
                />
              </Col>
              <Col
                xl={{ span: 10, offset: 7 }}
                lg={{ span: 20, offset: 2 }}
                md={{ span: 20, offset: 2 }}
                xs={{ span: 20, offset: 2 }}
              >
                <Divider style={{ fontWeight: 'bold' }}>
                  Category Search
                </Divider>
                <LocalSearch keyword={keyword} setKeyword={setKeyword} />
              </Col>
            </Row>
            <Row>
              <Col
                xl={{ span: 10, offset: 7 }}
                lg={{ span: 20, offset: 2 }}
                md={{ span: 20, offset: 2 }}
                xs={{ span: 20, offset: 2 }}
              >
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
                      {allCategories
                        .filter(searched(keyword)) // Step 5. Category search filter – use serached HOC with array filter method
                        .map((category) => (
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
