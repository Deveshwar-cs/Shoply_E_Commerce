import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Layout, Typography, Row, Col, Form } from 'antd';

import { toast } from 'react-toastify';

import AdminNav from '../../../components/nav/AdminNav';
import CategoryForm from '../../../components/forms/CategoryForm';

import {
  updateCategoryAction,
  getOneCategoryAction,
} from '../../../store/actions/categoryActions';

const { Header, Content } = Layout;
const { Title } = Typography;

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
