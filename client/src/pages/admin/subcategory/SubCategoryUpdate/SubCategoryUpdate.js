import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';

import {
  Layout,
  Typography,
  Form,
  Button,
  Space,
  Grid,
  Breadcrumb,
  Divider,
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
import CategorySelect from '../../../../components/forms/CategorySelect';
import MobileSideDrawer from '../../../../components/drawer/mobileSideDrawer/MobileSideDrawer';

import {
  updateSubCategoryAction,
  getOneSubCategoryAction,
  clearParentCategory,
} from '../../../../store/actions/subCategoryActions';

import { getAllCategoriesAction } from '../../../../store/actions/categoryActions';
import { setMobileDrawerVisability } from '../../../../store/actions/drawerActions';

import './SubCategoryUpdate.css';

const { Header, Content } = Layout;
const { Title, Text, Paragraph } = Typography;
const { useBreakpoint } = Grid;

const SubCategoryUpdate = () => {
  const [form] = Form.useForm();

  const navigate = useNavigate();
  const { slug } = useParams();
  const dispatch = useDispatch();
  const screens = useBreakpoint();

  const { updateSubCategoryInProgress, oneSubCategory, parentCategory } =
    useSelector((state) => state.sub);

  const { allCategories = [] } = useSelector((state) => state.category);

  const { user } = useSelector((state) => state.auth);

  const subcategory = oneSubCategory?.subcategory;

  useEffect(() => {
    dispatch(getOneSubCategoryAction(slug));
    dispatch(getAllCategoriesAction());
  }, [dispatch, slug]);

  useEffect(() => {
    if (subcategory?.name) {
      form.setFieldsValue({
        name: subcategory.name,
      });
    }
  }, [form, subcategory?.name]);

  useEffect(() => {
    return () => {
      dispatch(clearParentCategory());
    };
  }, [dispatch]);

  const showMobileMenuDrawer = () => {
    dispatch(setMobileDrawerVisability(true));
  };

  const onFinish = async ({ name }) => {
    const trimmedName = name?.trim();

    if (!trimmedName) {
      notification.warning({
        message: 'Subcategory name is required',
        description: 'Enter a name before saving your changes.',
      });
      return;
    }

    if (!parentCategory) {
      notification.warning({
        message: 'Choose a parent category',
        description: 'Select the parent category for this subcategory.',
      });
      return;
    }

    const currentName = subcategory?.name?.trim() || '';
    const currentParent = oneSubCategory?.category;

    const nameIsUnchanged =
      trimmedName.toLowerCase() === currentName.toLowerCase();

    const parentIsUnchanged =
      String(currentParent?._id || currentParent) ===
      String(parentCategory?._id || parentCategory);

    if (nameIsUnchanged && parentIsUnchanged) {
      notification.info({
        message: 'No changes detected',
        description: 'Change the name or select a different parent category.',
      });
      return;
    }

    try {
      await dispatch(
        updateSubCategoryAction(
          slug,
          {
            name: trimmedName,
            category: parentCategory,
          },
          user.token
        )
      );

      notification.success({
        message: 'Subcategory updated',
        description: `${trimmedName} has been updated successfully.`,
      });

      navigate('/admin/subcategory');
    } catch (error) {
      notification.error({
        message: 'Unable to update subcategory',
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

  const isMobile = !screens.md;

  return (
    <Layout className="shoply-subcategory-update-layout">
      <Header className="shoply-subcategory-update-header">
        <div className="shoply-subcategory-update-header-inner">
          <Space size={14} align="center">
            {isMobile && (
              <Button
                type="text"
                className="shoply-subcategory-update-menu-button"
                icon={<MenuUnfoldOutlined />}
                onClick={showMobileMenuDrawer}
                aria-label="Open admin navigation"
              />
            )}

            <div className="shoply-subcategory-update-brand">
              <span className="shoply-subcategory-update-brand-name">
                SHOPLY
              </span>
              <span className="shoply-subcategory-update-brand-divider">/</span>
              <span className="shoply-subcategory-update-brand-section">
                ADMIN
              </span>
            </div>
          </Space>

          <Text className="shoply-subcategory-update-header-label">
            CATALOGUE MANAGEMENT
          </Text>
        </div>
      </Header>

      <Layout className="shoply-subcategory-update-body">
        {isMobile ? (
          <MobileSideDrawer>
            <AdminNav />
          </MobileSideDrawer>
        ) : (
          <AdminNav />
        )}

        <Content className="shoply-subcategory-update-content">
          <main className="shoply-subcategory-update-page">
            <Breadcrumb
              className="shoply-subcategory-update-breadcrumb"
              items={[
                {
                  title: <Link to="/admin/dashboard">Dashboard</Link>,
                },
                {
                  title: <Link to="/admin/subcategory">Subcategories</Link>,
                },
                {
                  title: 'Edit subcategory',
                },
              ]}
            />

            <section className="shoply-subcategory-update-intro">
              <div>
                <Text className="shoply-subcategory-update-eyebrow">
                  CATALOGUE / EDIT RECORD
                </Text>

                <Title level={1} className="shoply-subcategory-update-title">
                  Edit subcategory.
                </Title>

                <Paragraph className="shoply-subcategory-update-description">
                  Update the subcategory name or move it to another parent
                  category. Your changes will be saved to the catalogue.
                </Paragraph>
              </div>

              <Link
                to="/admin/subcategory"
                className="shoply-subcategory-update-back-link"
              >
                <ArrowLeftOutlined />
                <span>All subcategories</span>
              </Link>
            </section>

            <section className="shoply-subcategory-update-panel">
              <div className="shoply-subcategory-update-panel-heading">
                <div className="shoply-subcategory-update-panel-icon">
                  <EditOutlined />
                </div>

                <div>
                  <Text className="shoply-subcategory-update-panel-kicker">
                    RECORD SETTINGS
                  </Text>
                  <Title
                    level={3}
                    className="shoply-subcategory-update-panel-title"
                  >
                    Subcategory details
                  </Title>
                </div>
              </div>

              <Divider className="shoply-subcategory-update-divider" />

              {!subcategory ? (
                <div className="shoply-subcategory-update-loading">
                  <Spin size="large" />
                  <Text>Loading subcategory details...</Text>
                </div>
              ) : (
                <>
                  <div className="shoply-subcategory-update-current">
                    <div className="shoply-subcategory-update-current-icon">
                      <FolderOutlined />
                    </div>

                    <div className="shoply-subcategory-update-current-info">
                      <Text className="shoply-subcategory-update-current-label">
                        CURRENT SUBCATEGORY
                      </Text>
                      <Text className="shoply-subcategory-update-current-name">
                        {subcategory.name}
                      </Text>
                    </div>
                  </div>

                  <Divider className="shoply-subcategory-update-divider" />

                  <div className="shoply-subcategory-update-field">
                    <Text className="shoply-subcategory-update-field-label">
                      01 / PARENT CATEGORY
                    </Text>

                    <CategorySelect
                      placeholderText="Select a parent category"
                      oneSubCategory={oneSubCategory}
                      allCategories={allCategories}
                    />
                  </div>

                  <div className="shoply-subcategory-update-field">
                    <Text className="shoply-subcategory-update-field-label">
                      02 / SUBCATEGORY NAME
                    </Text>

                    <CategoryForm
                      form={form}
                      onFinish={onFinish}
                      onFinishFailed={onFinishFailed}
                      inProgress={updateSubCategoryInProgress}
                      btnText="Save changes"
                      placeholderText="Enter updated subcategory name"
                    />
                  </div>

                  <div className="shoply-subcategory-update-note">
                    <FolderOutlined />
                    <Text>
                      Make sure the selected parent category is correct before
                      saving.
                    </Text>
                  </div>
                </>
              )}
            </section>

            <footer className="shoply-subcategory-update-footer">
              <span>SHOPLY / ADMINISTRATION</span>
              <span>SUBCATEGORY SETTINGS</span>
            </footer>
          </main>
        </Content>
      </Layout>
    </Layout>
  );
};

export default SubCategoryUpdate;
