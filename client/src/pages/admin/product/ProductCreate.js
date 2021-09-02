import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Link } from 'react-router-dom';

import {
  Layout,
  Typography,
  Divider,
  Row,
  Col,
  Form,
  Button,
  Spin,
} from 'antd';

import { toast } from 'react-toastify';

import AdminNav from '../../../components/nav/AdminNav';
import CategoryForm from '../../../components/forms/CategoryForm';
import { LocalSearch, searched } from '../../../components/forms/LocalSearch';

const { Header, Content } = Layout;
const { Title, Text } = Typography;

const ProductCreate = () => {
  const [form] = Form.useForm();

  //   const handleDelete = (category) => {
  //     if (window.confirm(`Delete ${category.name} category?`)) {
  //       setIdOfClickedItem(category._id);

  //       dispatch(deleteCategoryAction(category.slug, user.token)).then(() => {
  //         // dispatch getAllCategoriesAction after category was deleted
  //         dispatch(getAllCategoriesAction());
  //         toast.success(`Category ${category.name} deleted`);
  //       });
  //     }
  //   };

  const onFinish = (values) => {
    console.log(values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <>
      <Layout>
        <Header>
          <Title level={2} style={{ color: 'white', marginTop: '10px' }}>
            Admin Create Product Page
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
                  Create New Product
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
                  Create new product
                </Divider>
                <CategoryForm
                  form={form}
                  onFinish={onFinish}
                  onFinishFailed={onFinishFailed}
                  //   inProgress={createProductInProgress}
                  btnText="Add new product"
                  placeholderText="Enter new category name"
                />
              </Col>
              <Col
                xl={{ span: 10, offset: 7 }}
                lg={{ span: 20, offset: 2 }}
                md={{ span: 20, offset: 2 }}
                xs={{ span: 20, offset: 2 }}
              >
                <Divider style={{ fontWeight: 'bold' }}>Product Search</Divider>
                {/* <LocalSearch
                  keyword={keyword}
                  setKeyword={setKeyword}
                  placeholderText="Enter new category name"
                /> */}
              </Col>
            </Row>
            <Row>
              <Col
                xl={{ span: 10, offset: 7 }}
                lg={{ span: 20, offset: 2 }}
                md={{ span: 20, offset: 2 }}
                xs={{ span: 20, offset: 2 }}
              >
                {/* {getProductsInProgress ? (
                  <div className="spiner">
                    <Spin />
                  </div>
                ) : (
                  <>
                    <Divider style={{ fontWeight: 'bold' }}>
                      All products
                    </Divider>
                  </>
                )} */}
              </Col>
            </Row>
          </Content>
        </Layout>
      </Layout>
    </>
  );
};

export default ProductCreate;
