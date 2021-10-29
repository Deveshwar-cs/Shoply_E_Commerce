import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Layout, Typography, Row, Col, Form, Divider } from 'antd';

import { toast } from 'react-toastify';

import AdminNav from '../../../components/nav/AdminNav';
import CategoryForm from '../../../components/forms/CategoryForm';
import CategorySelect from '../../../components/forms/CategorySelect';

import {
  updateSubCategoryAction,
  getOneSubCategoryAction,
  clearParentCategory,
} from '../../../store/actions/subCategoryActions';
import { getAllCategoriesAction } from '../../../store/actions/categoryActions';

const { Header, Content } = Layout;
const { Title } = Typography;

const CategoryUpdate = ({ history, match }) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const { updateSubCategoryInProgress, oneSubCategory, parentCategory } =
    useSelector((state) => state.sub);
  const { allCategories } = useSelector((state) => state.category);
  const { user } = useSelector((state) => state.auth);

  // here we call useEffect only when component mounts, array with no dependencies
  useEffect(() => {
    dispatch(getOneSubCategoryAction(match.params.slug));
    dispatch(getAllCategoriesAction());
  }, []);

  useEffect(() => {
    if (oneSubCategory) {
      form.setFieldsValue({
        name: oneSubCategory.subcategory.name,
      });
    }
  }, [form, oneSubCategory]);

  useEffect(() => {
    if (oneSubCategory) {
      form.setFieldsValue({
        name: oneSubCategory.subcategory.name,
      });
    }
  }, [form, oneSubCategory]);

  useEffect(() => () => dispatch(clearParentCategory()), []);

  const onFinish = ({ name }) => {
    if (
      name.toLowerCase().trim() ===
        oneSubCategory.subcategory.name.toLowerCase() &&
      oneSubCategory.category === parentCategory
    )
      return toast.error(
        `Please enter a new subcategory name or change parent category!`
      );
    dispatch(
      updateSubCategoryAction(
        match.params.slug,
        { name, category: parentCategory },
        user.token
      )
    )
      .then((res) => {
        toast.success(
          `Subcategory ${oneSubCategory.subcategory.name} is updated!`
        );
        history.push('/admin/subcategory');
      })
      .catch((error) => toast.error(`Subcategory ${name} update is failed!`));
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
                <Divider style={{ fontWeight: 'bold' }}>
                  Choose parent category
                </Divider>
                <CategorySelect
                  placeholderText="Enter new subcategory name"
                  oneSubCategory={oneSubCategory}
                  allCategories={allCategories}
                />
                <Divider style={{ fontWeight: 'bold' }}>
                  New subcategory name
                </Divider>
                <CategoryForm
                  form={form}
                  onFinish={onFinish}
                  onFinishFailed={onFinishFailed}
                  inProgress={updateSubCategoryInProgress}
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
