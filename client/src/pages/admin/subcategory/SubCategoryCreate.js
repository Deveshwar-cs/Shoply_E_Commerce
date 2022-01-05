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
  Space,
  Grid,
  notification,
} from 'antd';

import {
  DeleteOutlined,
  EditOutlined,
  MenuUnfoldOutlined,
} from '@ant-design/icons';

import AdminNav from '../../../components/nav/AdminNav';
import CategoryForm from '../../../components/forms/CategoryForm';
import { LocalSearch, searched } from '../../../components/forms/LocalSearch';
import CategorySelect from '../../../components/forms/CategorySelect';
import MobileSideDrawer from '../../../components/drawer/MobileSideDrawer';

import { getAllCategoriesAction } from '../../../store/actions/categoryActions';

import {
  createSubCategoryAction,
  getAllSubCategoriesAction,
  deleteSubCategoryAction,
} from '../../../store/actions/subCategoryActions';

import { setMobileDrawerVisability } from '../../../store/actions/drawerActions';

const { Header, Content } = Layout;
const { Title, Text } = Typography;
const { useBreakpoint } = Grid;

const SubCategoryCreate = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const screens = useBreakpoint();
  const { allCategories } = useSelector((state) => state.category);
  const {
    createSubCategoryInProgress,
    allSubCategories,
    getSubCategoriesInProgress,
    deleteSubCategoryInProgress,
    parentCategory,
  } = useSelector((state) => state.sub);
  const { user } = useSelector((state) => state.auth);

  const [idOfClickedItem, setIdOfClickedItem] = useState('');
  const [keyword, setKeyword] = useState(''); // Step 1. Category search filter – Category search input local state

  // here we call useEffect only when component mounts, array with no dependencies
  useEffect(() => {
    dispatch(getAllSubCategoriesAction());
    dispatch(getAllCategoriesAction());
  }, []);

  const handleDelete = (subCategory) => {
    if (window.confirm(`Delete ${subCategory.name} subcategory?`)) {
      setIdOfClickedItem(subCategory._id);

      dispatch(deleteSubCategoryAction(subCategory.slug, user.token)).then(
        () => {
          // dispatch getAllCategoriesAction after subcategory was deleted
          dispatch(getAllSubCategoriesAction());
          notification.success({
            message: `Subcategory ${subCategory.name} deleted`,
          });
        }
      );
    }
  };

  const onFinish = ({ name }) => {
    dispatch(createSubCategoryAction(name, parentCategory, user.token))
      .then(() => {
        // dispatch getAllSubCategoriesAction after subcategory was created
        dispatch(getAllSubCategoriesAction());
      })
      .catch((error) => console.log(error));
    form.resetFields();
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const showMobileMenuDrawer = () => {
    dispatch(setMobileDrawerVisability(true));
  };

  return (
    <>
      <Layout>
        <Header>
          <Space direction="horizontal" size="middle">
            {!screens.md && (
              <Button
                type="primary"
                shape="circle"
                icon={<MenuUnfoldOutlined />}
                size="large"
                onClick={showMobileMenuDrawer}
              />
            )}
            <Title
              level={2}
              style={{ color: 'white', marginTop: '10px', fontSize: 18 }}
            >
              Admin Create Subcategory Page
            </Title>
          </Space>
        </Header>
        <Layout hasSider>
          {!screens.md && (
            <MobileSideDrawer>
              <AdminNav />
            </MobileSideDrawer>
          )}
          {(screens.md || screens.lg || screens.xl) && <AdminNav />}
          <Content style={{ backgroundColor: 'white' }}>
            <Row>
              <Col
                xl={{ span: 10, offset: 7 }}
                lg={{ span: 20, offset: 2 }}
                md={{ span: 20, offset: 2 }}
                xs={{ span: 20, offset: 2 }}
              >
                <Title level={2} style={{ marginTop: 40 }}>
                  Create New Subcategory
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
                  Parent category
                </Divider>
                <CategorySelect
                  allCategories={allCategories}
                  placeholderText="Select a parent category (Required)"
                />
                <Divider style={{ fontWeight: 'bold' }}>
                  Create new subcategory
                </Divider>
                <CategoryForm
                  form={form}
                  onFinish={onFinish}
                  onFinishFailed={onFinishFailed}
                  inProgress={createSubCategoryInProgress}
                  btnText="Add new subcategory"
                  placeholderText="Enter new subcategory name"
                />
              </Col>
              <Col
                xl={{ span: 10, offset: 7 }}
                lg={{ span: 20, offset: 2 }}
                md={{ span: 20, offset: 2 }}
                xs={{ span: 20, offset: 2 }}
              >
                <Divider style={{ fontWeight: 'bold' }}>
                  Subcategory Search
                </Divider>
                <LocalSearch
                  keyword={keyword}
                  setKeyword={setKeyword}
                  placeholderText="Type subcategory name"
                />
              </Col>
            </Row>
            <Row>
              <Col
                xl={{ span: 10, offset: 7 }}
                lg={{ span: 20, offset: 2 }}
                md={{ span: 20, offset: 2 }}
                xs={{ span: 20, offset: 2 }}
              >
                {getSubCategoriesInProgress ? (
                  <div className="spiner">
                    <Spin />
                  </div>
                ) : (
                  <>
                    <Divider style={{ fontWeight: 'bold' }}>
                      All Subcategories
                    </Divider>
                    <List style={{ marginBottom: 40 }}>
                      {allSubCategories
                        .filter(searched(keyword)) // Step 5. Category search filter – use serached HOC with array filter method
                        .map((subcategory) => (
                          <List.Item key={subcategory._id}>
                            <Text>{subcategory.name}</Text>
                            <Link
                              to={`/admin/subcategory/${subcategory.slug}`}
                              style={{ marginLeft: 'auto', marginRight: 30 }}
                            >
                              <EditOutlined />
                            </Link>
                            {deleteSubCategoryInProgress && // show loading state on clicked Delete button with conditional rendering
                            idOfClickedItem === subcategory._id ? (
                              <Button
                                danger
                                loading
                                icon={<DeleteOutlined />}
                              ></Button>
                            ) : (
                              <Button
                                danger
                                onClick={() => handleDelete(subcategory)}
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

export default SubCategoryCreate;
