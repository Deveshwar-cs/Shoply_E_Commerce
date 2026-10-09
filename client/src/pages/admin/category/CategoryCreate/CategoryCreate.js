import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import {
  Layout,
  Typography,
  List,
  Form,
  Button,
  Spin,
  Grid,
  notification,
  Breadcrumb,
  Empty,
  Modal,
} from 'antd';

import {
  MenuUnfoldOutlined,
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
  SearchOutlined,
  FolderOutlined,
  ArrowLeftOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons';

import AdminNav from '../../../../components/nav/AdminNav/AdminNav';
import CategoryForm from '../../../../components/forms/CategoryForm';
import {
  LocalSearch,
  searched,
} from '../../../../components/forms/LocalSearch';
import MobileSideDrawer from '../../../../components/drawer/mobileSideDrawer/MobileSideDrawer';

import {
  createCategoryAction,
  getAllCategoriesAction,
  deleteCategoryAction,
} from '../../../../store/actions/categoryActions';

import { setMobileDrawerVisability } from '../../../../store/actions/drawerActions';

import './CategoryCreate.css';

const { Header, Content } = Layout;
const { Title, Text } = Typography;
const { useBreakpoint } = Grid;
const { confirm } = Modal;

const CategoryCreate = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const screens = useBreakpoint();

  const {
    createCategoryInProgress,
    allCategories = [],
    getCategoriesInProgress,
    deleteCategoryInProgress,
  } = useSelector((state) => state.category);

  const { user } = useSelector((state) => state.auth);

  const [idOfClickedItem, setIdOfClickedItem] = useState('');
  const [keyword, setKeyword] = useState('');

  useEffect(() => {
    dispatch(getAllCategoriesAction());
  }, [dispatch]);

  const showMobileMenuDrawer = () => {
    dispatch(setMobileDrawerVisability(true));
  };

  const onFinish = async ({ name }) => {
    try {
      await dispatch(createCategoryAction(name, user.token));
      form.resetFields();
      await dispatch(getAllCategoriesAction());

      notification.success({
        message: 'Category created',
        description: `"${name}" has been added to your categories.`,
      });
    } catch (error) {
      notification.error({
        message: 'Unable to create category',
        description:
          error?.response?.data?.message ||
          error?.message ||
          'Please try again.',
      });
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.error('Category form validation failed:', errorInfo);
  };

  const handleDelete = (category) => {
    confirm({
      title: `Delete "${category.name}"?`,
      icon: <ExclamationCircleOutlined />,
      content:
        'This action cannot be undone. Are you sure you want to delete this category?',
      okText: 'Delete category',
      okType: 'danger',
      cancelText: 'Keep category',
      centered: true,

      onOk: async () => {
        setIdOfClickedItem(category._id);

        try {
          await dispatch(deleteCategoryAction(category.slug, user.token));
          await dispatch(getAllCategoriesAction());

          notification.success({
            message: 'Category deleted',
            description: `"${category.name}" has been removed.`,
          });
        } catch (error) {
          notification.error({
            message: 'Unable to delete category',
            description:
              error?.response?.data?.message ||
              error?.message ||
              'Please try again.',
          });
        } finally {
          setIdOfClickedItem('');
        }
      },
    });
  };

  const filteredCategories = allCategories.filter(searched(keyword));

  return (
    <Layout className="shoply-category-page">
      <Header className="shoply-category-header">
        <div className="shoply-category-header__inner">
          <div className="shoply-category-brand">
            {!screens.md && (
              <Button
                type="text"
                className="shoply-category-menu-btn"
                icon={<MenuUnfoldOutlined />}
                onClick={showMobileMenuDrawer}
                aria-label="Open admin navigation"
              />
            )}

            <span className="shoply-category-brand__name">SHOPLY</span>
            <span className="shoply-category-brand__divider">/</span>
            <span className="shoply-category-brand__label">ADMIN</span>
          </div>

          <Text className="shoply-category-header__status">
            CATALOGUE MANAGEMENT
          </Text>
        </div>
      </Header>

      <Layout className="shoply-category-layout">
        {!screens.md && (
          <MobileSideDrawer>
            <AdminNav />
          </MobileSideDrawer>
        )}

        {screens.md && <AdminNav />}

        <Content className="shoply-category-content">
          <div className="shoply-category-container">
            <Breadcrumb
              className="shoply-category-breadcrumb"
              items={[
                {
                  title: (
                    <span
                      className="shoply-category-breadcrumb__link"
                      onClick={() => navigate('/admin/dashboard')}
                    >
                      Dashboard
                    </span>
                  ),
                },
                { title: 'Categories' },
              ]}
            />

            <section className="shoply-category-intro">
              <div>
                <Text className="shoply-category-eyebrow">
                  CATALOGUE / ORGANISATION
                </Text>

                <Title level={1} className="shoply-category-title">
                  Categories.
                </Title>

                <Text className="shoply-category-subtitle">
                  Organise your products into clear, manageable collections.
                </Text>
              </div>

              <Button
                className="shoply-category-back-btn"
                icon={<ArrowLeftOutlined />}
                onClick={() => navigate('/admin/dashboard')}
              >
                Dashboard
              </Button>
            </section>

            <div className="shoply-category-stats">
              <div className="shoply-category-stat">
                <span className="shoply-category-stat__label">
                  TOTAL CATEGORIES
                </span>

                <span className="shoply-category-stat__value">
                  {allCategories.length}
                </span>
              </div>

              <div className="shoply-category-stat">
                <span className="shoply-category-stat__label">
                  SEARCH RESULTS
                </span>

                <span className="shoply-category-stat__value">
                  {filteredCategories.length}
                </span>
              </div>
            </div>

            <div className="shoply-category-columns">
              {/* Create category */}
              <section className="shoply-category-panel shoply-category-create">
                <div className="shoply-category-panel__heading">
                  <div className="shoply-category-panel__icon">
                    <PlusOutlined />
                  </div>

                  <div>
                    <Title level={3}>Create category</Title>
                    <Text>Add a new product category.</Text>
                  </div>
                </div>

                <div className="shoply-category-panel__form">
                  <CategoryForm
                    form={form}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    inProgress={createCategoryInProgress}
                    btnText="Create category"
                    placeholderText="Enter category name"
                  />
                </div>
              </section>

              {/* Category list */}
              <section className="shoply-category-panel shoply-category-directory">
                <div className="shoply-category-panel__heading">
                  <div className="shoply-category-panel__icon">
                    <FolderOutlined />
                  </div>

                  <div>
                    <Title level={3}>All categories</Title>
                    <Text>Manage your existing categories.</Text>
                  </div>
                </div>

                <div className="shoply-category-search">
                  <SearchOutlined />
                  <div className="shoply-category-search__input">
                    <LocalSearch
                      keyword={keyword}
                      setKeyword={setKeyword}
                      placeholderText="Search categories..."
                    />
                  </div>
                </div>

                {getCategoriesInProgress ? (
                  <div className="shoply-category-loading">
                    <Spin size="large" />
                    <Text>Loading categories...</Text>
                  </div>
                ) : filteredCategories.length === 0 ? (
                  <div className="shoply-category-empty">
                    <Empty
                      image={Empty.PRESENTED_IMAGE_SIMPLE}
                      description={
                        keyword
                          ? 'No categories match your search.'
                          : 'No categories created yet.'
                      }
                    />
                  </div>
                ) : (
                  <List
                    className="shoply-category-list"
                    dataSource={filteredCategories}
                    renderItem={(category) => {
                      const isDeleting =
                        deleteCategoryInProgress &&
                        idOfClickedItem === category._id;

                      return (
                        <List.Item
                          key={category._id}
                          className="shoply-category-list__item"
                        >
                          <div className="shoply-category-list__info">
                            <span className="shoply-category-list__icon">
                              <FolderOutlined />
                            </span>

                            <div className="shoply-category-list__details">
                              <Text className="shoply-category-list__name">
                                {category.name}
                              </Text>

                              <Text className="shoply-category-list__slug">
                                /{category.slug}
                              </Text>
                            </div>
                          </div>

                          <div className="shoply-category-list__actions">
                            <Link
                              to={`/admin/category/${category.slug}`}
                              className="shoply-category-action shoply-category-action--edit"
                              title={`Edit ${category.name}`}
                              aria-label={`Edit ${category.name}`}
                            >
                              <EditOutlined />
                            </Link>

                            <Button
                              type="text"
                              danger
                              className="shoply-category-action shoply-category-action--delete"
                              icon={<DeleteOutlined />}
                              loading={Boolean(isDeleting)}
                              disabled={
                                Boolean(deleteCategoryInProgress) && !isDeleting
                              }
                              onClick={() => handleDelete(category)}
                              title={`Delete ${category.name}`}
                              aria-label={`Delete ${category.name}`}
                            />
                          </div>
                        </List.Item>
                      );
                    }}
                  />
                )}

                {!getCategoriesInProgress && filteredCategories.length > 0 && (
                  <div className="shoply-category-list-footer">
                    Showing {filteredCategories.length} of{' '}
                    {allCategories.length} categories
                  </div>
                )}
              </section>
            </div>

            <footer className="shoply-category-footer">
              <span>SHOPLY / ADMINISTRATION</span>
              <span>CATEGORY MANAGEMENT</span>
            </footer>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default CategoryCreate;
