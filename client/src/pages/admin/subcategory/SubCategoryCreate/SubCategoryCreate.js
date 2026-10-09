import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import {
  Layout,
  Typography,
  Divider,
  List,
  Form,
  Button,
  Spin,
  Grid,
  Breadcrumb,
  Modal,
  notification,
  Empty,
} from 'antd';

import {
  DeleteOutlined,
  EditOutlined,
  FolderOutlined,
  PlusOutlined,
  SearchOutlined,
  ExclamationCircleOutlined,
  ArrowLeftOutlined,
} from '@ant-design/icons';

import AdminNav from '../../../../components/nav/AdminNav/AdminNav';
import CategoryForm from '../../../../components/forms/CategoryForm';
import {
  LocalSearch,
  searched,
} from '../../../../components/forms/LocalSearch';
import CategorySelect from '../../../../components/forms/CategorySelect';
import MobileSideDrawer from '../../../../components/drawer/mobileSideDrawer/MobileSideDrawer';

import { getAllCategoriesAction } from '../../../../store/actions/categoryActions';

import {
  createSubCategoryAction,
  getAllSubCategoriesAction,
  deleteSubCategoryAction,
} from '../../../../store/actions/subCategoryActions';

import './SubCategoryCreate.css';

const { Content } = Layout;
const { Title, Text, Paragraph } = Typography;
const { useBreakpoint } = Grid;

const SubCategoryCreate = () => {
  const [form] = Form.useForm();

  const dispatch = useDispatch();
  const screens = useBreakpoint();

  const { allCategories = [] } = useSelector((state) => state.category);

  const {
    createSubCategoryInProgress,
    allSubCategories = [],
    getSubCategoriesInProgress,
    deleteSubCategoryInProgress,
    parentCategory,
  } = useSelector((state) => state.sub);

  const { user } = useSelector((state) => state.auth);

  const [idOfClickedItem, setIdOfClickedItem] = useState('');
  const [keyword, setKeyword] = useState('');

  useEffect(() => {
    dispatch(getAllSubCategoriesAction());
    dispatch(getAllCategoriesAction());
  }, [dispatch]);

  const onFinish = async ({ name }) => {
    const trimmedName = name?.trim();

    if (!trimmedName) {
      notification.warning({
        message: 'Subcategory name is required',
        description: 'Enter a name before creating a subcategory.',
      });
      return;
    }

    if (!parentCategory) {
      notification.warning({
        message: 'Choose a parent category',
        description: 'Select the category this subcategory belongs to.',
      });
      return;
    }

    try {
      await dispatch(
        createSubCategoryAction(trimmedName, parentCategory, user.token)
      );

      form.resetFields();

      await dispatch(getAllSubCategoriesAction());

      notification.success({
        message: 'Subcategory created',
        description: `${trimmedName} has been added successfully.`,
      });
    } catch (error) {
      notification.error({
        message: 'Unable to create subcategory',
        description:
          error?.response?.data?.message ||
          error?.message ||
          'Please try again.',
      });
    }
  };

  const onFinishFailed = () => {
    notification.warning({
      message: 'Check the form',
      description: 'Please correct the highlighted fields.',
    });
  };

  const handleDelete = (subcategory) => {
    Modal.confirm({
      title: 'Delete subcategory?',
      icon: <ExclamationCircleOutlined />,
      content: (
        <span>
          Are you sure you want to delete <strong>{subcategory.name}</strong>?
          This action may not be reversible.
        </span>
      ),
      okText: 'Delete subcategory',
      cancelText: 'Keep subcategory',
      okButtonProps: {
        danger: true,
      },
      centered: true,
      onOk: async () => {
        setIdOfClickedItem(subcategory._id);

        try {
          await dispatch(deleteSubCategoryAction(subcategory.slug, user.token));

          await dispatch(getAllSubCategoriesAction());

          notification.success({
            message: 'Subcategory deleted',
            description: `${subcategory.name} has been removed.`,
          });
        } catch (error) {
          notification.error({
            message: 'Unable to delete subcategory',
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

  const filteredSubcategories = allSubCategories.filter(searched(keyword));

  const isMobile = !screens.md;

  return (
    <Layout className="shoply-subcategory-layout">
      <Layout className="shoply-subcategory-body">
        {isMobile ? (
          <MobileSideDrawer>
            <AdminNav />
          </MobileSideDrawer>
        ) : (
          <AdminNav />
        )}

        <Content className="shoply-subcategory-content">
          <div className="shoply-subcategory-page">
            <Breadcrumb
              className="shoply-subcategory-breadcrumb"
              items={[
                {
                  title: <Link to="/admin/dashboard">Dashboard</Link>,
                },
                {
                  title: <Link to="/admin/category">Categories</Link>,
                },
                {
                  title: 'Subcategories',
                },
              ]}
            />

            <section className="shoply-subcategory-intro">
              <div>
                <Text className="shoply-subcategory-eyebrow">
                  PRODUCT TAXONOMY
                </Text>

                <Title level={1} className="shoply-subcategory-title">
                  Subcategories.
                </Title>

                <Paragraph className="shoply-subcategory-description">
                  Organise your catalogue into clear, meaningful groups. Create
                  subcategories under a parent category and manage them from one
                  place.
                </Paragraph>
              </div>

              <Link
                to="/admin/category"
                className="shoply-subcategory-back-link"
              >
                <ArrowLeftOutlined />
                <span>All categories</span>
              </Link>
            </section>

            <div className="shoply-subcategory-stats">
              <div className="shoply-subcategory-stat">
                <span className="shoply-subcategory-stat-label">
                  TOTAL SUBCATEGORIES
                </span>
                <span className="shoply-subcategory-stat-value">
                  {allSubCategories.length}
                </span>
              </div>

              <div className="shoply-subcategory-stat">
                <span className="shoply-subcategory-stat-label">
                  PARENT CATEGORIES
                </span>
                <span className="shoply-subcategory-stat-value">
                  {allCategories.length}
                </span>
              </div>

              <div className="shoply-subcategory-stat">
                <span className="shoply-subcategory-stat-label">
                  CURRENTLY SHOWING
                </span>
                <span className="shoply-subcategory-stat-value">
                  {filteredSubcategories.length}
                </span>
              </div>
            </div>

            <div className="shoply-subcategory-workspace">
              <section className="shoply-subcategory-panel shoply-subcategory-create-panel">
                <div className="shoply-subcategory-panel-heading">
                  <div className="shoply-subcategory-panel-icon">
                    <PlusOutlined />
                  </div>

                  <div>
                    <Text className="shoply-subcategory-panel-kicker">
                      ADD TO CATALOGUE
                    </Text>
                    <Title level={3} className="shoply-subcategory-panel-title">
                      Create subcategory
                    </Title>
                  </div>
                </div>

                <Paragraph className="shoply-subcategory-panel-description">
                  Select a parent category first, then enter a name for your new
                  subcategory.
                </Paragraph>

                <Divider className="shoply-subcategory-divider" />

                <div className="shoply-subcategory-field">
                  <Text className="shoply-subcategory-field-label">
                    01 / PARENT CATEGORY
                  </Text>

                  <CategorySelect
                    allCategories={allCategories}
                    placeholderText="Select a parent category"
                  />
                </div>

                <div className="shoply-subcategory-field">
                  <Text className="shoply-subcategory-field-label">
                    02 / SUBCATEGORY NAME
                  </Text>

                  <CategoryForm
                    form={form}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    inProgress={createSubCategoryInProgress}
                    btnText="Create subcategory"
                    placeholderText="Enter subcategory name"
                  />
                </div>

                <div className="shoply-subcategory-panel-note">
                  <FolderOutlined />
                  <Text>
                    Each subcategory should belong to a parent category.
                  </Text>
                </div>
              </section>

              <section className="shoply-subcategory-panel shoply-subcategory-list-panel">
                <div className="shoply-subcategory-list-heading">
                  <div>
                    <Text className="shoply-subcategory-panel-kicker">
                      CATALOGUE DIRECTORY
                    </Text>
                    <Title level={3} className="shoply-subcategory-panel-title">
                      All subcategories
                    </Title>
                  </div>

                  <span className="shoply-subcategory-count">
                    {filteredSubcategories.length} ITEMS
                  </span>
                </div>

                <div className="shoply-subcategory-search">
                  <SearchOutlined className="shoply-subcategory-search-icon" />

                  <LocalSearch
                    keyword={keyword}
                    setKeyword={setKeyword}
                    placeholderText="Search subcategories..."
                  />
                </div>

                <Divider className="shoply-subcategory-divider" />

                {getSubCategoriesInProgress ? (
                  <div className="shoply-subcategory-loading">
                    <Spin size="large" />
                    <Text>Loading subcategories...</Text>
                  </div>
                ) : filteredSubcategories.length === 0 ? (
                  <div className="shoply-subcategory-empty">
                    <Empty
                      image={Empty.PRESENTED_IMAGE_SIMPLE}
                      description={
                        keyword
                          ? 'No subcategories match your search.'
                          : 'No subcategories have been created yet.'
                      }
                    />
                  </div>
                ) : (
                  <List
                    className="shoply-subcategory-list"
                    dataSource={filteredSubcategories}
                    renderItem={(subcategory, index) => {
                      const isDeleting =
                        deleteSubCategoryInProgress &&
                        idOfClickedItem === subcategory._id;

                      return (
                        <List.Item
                          key={subcategory._id}
                          className="shoply-subcategory-list-item"
                        >
                          <div className="shoply-subcategory-item-index">
                            {String(index + 1).padStart(2, '0')}
                          </div>

                          <div className="shoply-subcategory-item-icon">
                            <FolderOutlined />
                          </div>

                          <div className="shoply-subcategory-item-info">
                            <Text className="shoply-subcategory-item-name">
                              {subcategory.name}
                            </Text>

                            <Text className="shoply-subcategory-item-meta">
                              SUBCATEGORY
                            </Text>
                          </div>

                          <div className="shoply-subcategory-item-actions">
                            <Link
                              to={`/admin/subcategory/${subcategory.slug}`}
                              className="shoply-subcategory-action shoply-subcategory-edit"
                              aria-label={`Edit ${subcategory.name}`}
                              title="Edit subcategory"
                            >
                              <EditOutlined />
                            </Link>

                            <Button
                              danger
                              type="text"
                              className="shoply-subcategory-action shoply-subcategory-delete"
                              icon={<DeleteOutlined />}
                              loading={Boolean(isDeleting)}
                              disabled={
                                Boolean(deleteSubCategoryInProgress) &&
                                !isDeleting
                              }
                              onClick={() => handleDelete(subcategory)}
                              aria-label={`Delete ${subcategory.name}`}
                              title="Delete subcategory"
                            />
                          </div>
                        </List.Item>
                      );
                    }}
                  />
                )}

                <div className="shoply-subcategory-list-footer">
                  <Text>
                    Showing {filteredSubcategories.length} of{' '}
                    {allSubCategories.length} subcategories
                  </Text>
                </div>
              </section>
            </div>

            <footer className="shoply-subcategory-footer">
              <span>SHOPLY / ADMINISTRATION</span>
              <span>CATALOGUE MANAGEMENT</span>
            </footer>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default SubCategoryCreate;
