import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  Layout,
  Typography,
  Row,
  Col,
  Form,
  Divider,
  Space,
  Button,
  Grid,
  notification,
} from 'antd';

import { MenuUnfoldOutlined } from '@ant-design/icons';

import AdminNav from '../../../components/nav/AdminNav';
import CategoryForm from '../../../components/forms/CategoryForm';
import MobileSideDrawer from '../../../components/drawer/MobileSideDrawer';

import {
  updateCategoryAction,
  getOneCategoryAction,
} from '../../../store/actions/categoryActions';

import { setMobileDrawerVisability } from '../../../store/actions/drawerActions';

const { Header, Content } = Layout;
const { Title } = Typography;
const { useBreakpoint } = Grid;

const CategoryUpdate = ({ history, match }) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const screens = useBreakpoint();
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
        name: oneCategory.category.name,
      });
    }
  }, [form, oneCategory]);

  const onFinish = ({ name }) => {
    if (name.toLowerCase().trim() === oneCategory.category.name.toLowerCase())
      return notification.error({
        message: `Please enter a new catogory name!`,
      });
    dispatch(updateCategoryAction(match.params.slug, { name }, user.token))
      .then((res) => {
        notification.success({
          message: `Category ${oneCategory.category.name} is updated!`,
        });
        history.push('/admin/category');
      })
      .catch((error) => {
        notification.error({
          message: `Category ${name} update is failed!`,
        });
      });
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
              Admin Update Category Name Page
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
                  Update Category Name
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
                  New category name
                </Divider>
                <CategoryForm
                  form={form}
                  onFinish={onFinish}
                  onFinishFailed={onFinishFailed}
                  inProgress={updateCategoryInProgress}
                  btnText="Update category"
                  placeholderText="Enter updated category name"
                />
              </Col>
            </Row>
          </Content>
        </Layout>
      </Layout>
    </>
  );
};

export default CategoryUpdate;
