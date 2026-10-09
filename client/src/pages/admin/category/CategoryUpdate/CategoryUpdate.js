import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import {
  Layout,
  Typography,
  Form,
  Button,
  Grid,
  Breadcrumb,
  Spin,
  notification,
} from 'antd';

import {
  MenuUnfoldOutlined,
  ArrowLeftOutlined,
  EditOutlined,
  FolderOutlined,
} from '@ant-design/icons';

import AdminNav from '../../../../components/nav/AdminNav/AdminNav';
import CategoryForm from '../../../../components/forms/CategoryForm';
import MobileSideDrawer from '../../../../components/drawer/mobileSideDrawer/MobileSideDrawer';

import {
  updateCategoryAction,
  getOneCategoryAction,
} from '../../../../store/actions/categoryActions';

import { setMobileDrawerVisability } from '../../../../store/actions/drawerActions';

import './CategoryUpdate.css';

const { Header, Content } = Layout;
const { Title, Text } = Typography;
const { useBreakpoint } = Grid;

const CategoryUpdate = () => {
  const [form] = Form.useForm();

  const navigate = useNavigate();
  const { slug } = useParams();
  const dispatch = useDispatch();
  const screens = useBreakpoint();

  const { updateCategoryInProgress, oneCategory } = useSelector(
    (state) => state.category
  );

  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getOneCategoryAction(slug));
  }, [dispatch, slug]);

  const category = oneCategory?.category;

  useEffect(() => {
    if (category) {
      form.setFieldsValue({
        name: category.name,
      });
    }
  }, [form, category]);

  const onFinish = async ({ name }) => {
    const trimmedName = name.trim();

    if (!trimmedName) {
      notification.error({
        message: 'Category name is required',
      });
      return;
    }

    if (trimmedName.toLowerCase() === category?.name?.trim().toLowerCase()) {
      notification.error({
        message: 'No changes detected',
        description: 'Please enter a different category name.',
      });
      return;
    }

    try {
      await dispatch(
        updateCategoryAction(slug, { name: trimmedName }, user.token)
      );

      notification.success({
        message: 'Category updated',
        description: `"${trimmedName}" has been saved successfully.`,
      });

      navigate('/admin/category');
    } catch (error) {
      notification.error({
        message: 'Unable to update category',
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

  const showMobileMenuDrawer = () => {
    dispatch(setMobileDrawerVisability(true));
  };

  return (
    <Layout className="shoply-category-update-page">
      <Header className="shoply-category-update-header">
        <div className="shoply-category-update-header__inner">
          <div className="shoply-category-update-brand">
            {!screens.md && (
              <Button
                type="text"
                className="shoply-category-update-menu-btn"
                icon={<MenuUnfoldOutlined />}
                onClick={showMobileMenuDrawer}
                aria-label="Open admin navigation"
              />
            )}

            <span className="shoply-category-update-brand__name">SHOPLY</span>
            <span className="shoply-category-update-brand__divider">/</span>
            <span className="shoply-category-update-brand__label">ADMIN</span>
          </div>

          <Text className="shoply-category-update-header__status">
            CATALOGUE MANAGEMENT
          </Text>
        </div>
      </Header>

      <Layout className="shoply-category-update-layout">
        {!screens.md && (
          <MobileSideDrawer>
            <AdminNav />
          </MobileSideDrawer>
        )}

        {screens.md && <AdminNav />}

        <Content className="shoply-category-update-content">
          <div className="shoply-category-update-container">
            <Breadcrumb
              className="shoply-category-update-breadcrumb"
              items={[
                {
                  title: (
                    <span
                      className="shoply-category-update-breadcrumb__link"
                      onClick={() => navigate('/admin/dashboard')}
                    >
                      Dashboard
                    </span>
                  ),
                },
                {
                  title: (
                    <span
                      className="shoply-category-update-breadcrumb__link"
                      onClick={() => navigate('/admin/category')}
                    >
                      Categories
                    </span>
                  ),
                },
                { title: 'Edit category' },
              ]}
            />

            <section className="shoply-category-update-intro">
              <div>
                <Text className="shoply-category-update-eyebrow">
                  CATALOGUE / CATEGORY DETAILS
                </Text>

                <Title level={1} className="shoply-category-update-title">
                  Edit category.
                </Title>

                <Text className="shoply-category-update-subtitle">
                  Update the name of an existing product category.
                </Text>
              </div>

              <Button
                className="shoply-category-update-back-btn"
                icon={<ArrowLeftOutlined />}
                onClick={() => navigate('/admin/category')}
              >
                All categories
              </Button>
            </section>

            <section className="shoply-category-update-panel">
              <div className="shoply-category-update-panel__heading">
                <div className="shoply-category-update-panel__icon">
                  <EditOutlined />
                </div>

                <div>
                  <Title level={3}>Category information</Title>
                  <Text>Make your changes below.</Text>
                </div>
              </div>

              {category ? (
                <>
                  <div className="shoply-category-update-current">
                    <span className="shoply-category-update-current__icon">
                      <FolderOutlined />
                    </span>

                    <div>
                      <span className="shoply-category-update-current__label">
                        CURRENT CATEGORY
                      </span>

                      <Text className="shoply-category-update-current__name">
                        {category.name}
                      </Text>
                    </div>
                  </div>

                  <div className="shoply-category-update-form">
                    <CategoryForm
                      form={form}
                      onFinish={onFinish}
                      onFinishFailed={onFinishFailed}
                      inProgress={updateCategoryInProgress}
                      btnText="Save changes"
                      placeholderText="Enter updated category name"
                    />
                  </div>
                </>
              ) : (
                <div className="shoply-category-update-loading">
                  <Spin size="large" />
                  <Text>Loading category details...</Text>
                </div>
              )}
            </section>

            <footer className="shoply-category-update-footer">
              <span>SHOPLY / ADMINISTRATION</span>
              <span>CATEGORY MANAGEMENT</span>
            </footer>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default CategoryUpdate;
