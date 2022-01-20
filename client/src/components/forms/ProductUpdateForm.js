import { useEffect, useState, memo } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Form,
  Input,
  Button,
  Select,
  Divider,
  Row,
  Col,
  Card,
  Modal,
  Image,
  Spin,
} from 'antd';

import axios from 'axios';

import {
  FileAddOutlined,
  ExclamationCircleOutlined,
  DeleteOutlined,
} from '@ant-design/icons';

import FileUpload from './FileUpload';

import {
  getAllSubCategoriesByParentAction,
  clearAllSubCategoriesByParent,
  clearImgInUpload,
  getOneProductAction,
  clearOneProduct,
  updateProductAction,
} from '../../store/actions/productActions';
import { getAllCategoriesAction } from '../../store/actions/categoryActions';

const brands = [
  'Apple',
  'Samsung',
  'Microsoft',
  'Lenovo',
  'Dell',
  'Xiaomi',
  'Google',
  'ASUS',
];

const colors = ['Black', 'Brown', 'Silver', 'White', 'Blue', 'Red'];

const { confirm } = Modal;
const { TextArea } = Input;

const ProductUpdateForm = () => {
  const [form] = Form.useForm();
  const { slug } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();

  const { user } = useSelector((state) => state.auth);
  const { allCategories } = useSelector((state) => state.category);
  const {
    createProductInProgress,
    getOneProductInProgress,
    allSubsByParent,
    uploadedImages,
    oneProduct,
  } = useSelector((state) => state.product);

  const [parentCategoryId, setParentCategoryId] = useState('');
  const [productImages, setProductImages] = useState([]);

  useEffect(() => {
    // get One category to fill all fields
    dispatch(getOneProductAction(slug));
  }, []);

  // Populate fields with product data
  useEffect(() => {
    if (oneProduct) {
      setParentCategoryId(oneProduct.category._id);
      setProductImages([...oneProduct.images]);
      form.setFieldsValue({
        title: oneProduct.title,
        description: oneProduct.description,
        price: oneProduct.price,
        category: oneProduct.category._id,
        //subcategory: oneProduct.subcategory.map((sub) => sub._id),
        shipping: oneProduct.shipping,
        quantity: oneProduct.quantity,
        color: oneProduct.color,
        brand: oneProduct.brand,
      });
    }
  }, [oneProduct]);

  useEffect(() => {
    // get all categories to fill Category select
    dispatch(getAllCategoriesAction());
  }, []);

  //get subcategories by parent category and fill subcategories select option
  useEffect(() => {
    if (parentCategoryId.length > 0) {
      dispatch(getAllSubCategoriesByParentAction(parentCategoryId));
      form.setFieldsValue({
        subcategory: oneProduct.subcategory.map((sub) => sub._id),
      });
    }
  }, [parentCategoryId]);

  // Clear subcategory select when parentCategoryId changed
  useEffect(() => {
    form.resetFields(['subcategory']);
  }, [parentCategoryId]);

  // // If Admin rutern to original product category fill Select with
  useEffect(() => {
    if (oneProduct && parentCategoryId === oneProduct.category._id) {
      form.setFieldsValue({
        subcategory: oneProduct.subcategory.map((sub) => sub._id),
      });
    }
  }, [parentCategoryId]);

  //clear local state with parent category and redux state allSubsByParent when component unmount
  useEffect(
    () => () => {
      setParentCategoryId('');
      dispatch(clearAllSubCategoriesByParent());
      dispatch(clearOneProduct());
      dispatch(clearImgInUpload());
      form.resetFields([
        'title',
        'description',
        'price',
        'category',
        'subcategory',
        'shipping',
        'quantity',
        'color',
        'brand',
      ]);
    },
    []
  );

  const onFinish = (values) => {
    dispatch(
      updateProductAction(
        oneProduct.slug,
        { ...values, images: [...productImages, ...uploadedImages] },
        user.token
      )
    ).then(() => history.push('/admin/allproducts'));
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const onParentCategoryChange = (parentCategoryId) => {
    setParentCategoryId(parentCategoryId);
  };

  // Delete already uploaded Image
  const handleImageDelete = (public_id) => {
    confirm({
      title: `Do you Want to delete this image from ${oneProduct.title} product?`,
      icon: <ExclamationCircleOutlined />,
      content: 'This action delete image from Cloudinary!',
      onOk() {
        const config = {
          headers: {
            authToken: user.token,
          },
          //Take note of the `data` keyword. This is the request body in DELETE method.
          data: {
            public_id,
          },
        };

        axios.delete(`${process.env.REACT_APP_API}/images`, config);

        setProductImages([
          ...productImages.filter((img) => img.public_id !== public_id),
        ]);
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  };

  return (
    <Form
      form={form}
      name="product"
      layout="vertical"
      size="large"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      {getOneProductInProgress || allSubsByParent.length === 0 ? (
        <div className="spiner">
          <Spin size="large" />
        </div>
      ) : (
        <>
          <Form.Item
            name="title"
            label="Title (52 charachters maximum)"
            rules={[
              {
                required: true,
                message: 'Please input new product title!',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="description"
            label="Description (1000 charachters maximum)"
            rules={[
              {
                required: true,
                message: 'Please input new product description!',
              },
            ]}
          >
            <TextArea rows={5} />
          </Form.Item>
          <Form.Item
            name="price"
            label="Price"
            rules={[
              {
                required: true,
                message: 'Please input new product price!',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="category"
            label="Category"
            rules={[
              {
                required: true,
                message: 'Please select category for new product!',
              },
            ]}
          >
            <Select onChange={onParentCategoryChange}>
              {allCategories.length > 0 &&
                allCategories.map((category) => (
                  <Select.Option key={category._id} value={category._id}>
                    {category.name}
                  </Select.Option>
                ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="subcategory"
            label="Subcategory"
            rules={[
              {
                required: true,
                message: 'Please input new product subcategory!',
              },
            ]}
          >
            <Select mode="multiple">
              {allSubsByParent.map((category) => (
                <Select.Option key={category._id} value={category._id}>
                  {category.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="shipping"
            label="Shipping"
            rules={[
              {
                required: true,
                message: 'Please select shipping!',
              },
            ]}
          >
            <Select>
              <Select.Option value="No">No</Select.Option>
              <Select.Option value="Yes">Yes</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="quantity"
            label="Quantity"
            rules={[
              {
                required: true,
                message: 'Please input product quantity!',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="color"
            label="Color"
            rules={[
              {
                required: true,
                message: 'Please select product color!',
              },
            ]}
          >
            <Select>
              {colors.map((color) => (
                <Select.Option key={color} value={color}>
                  {color}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="brand"
            label="Brand"
            rules={[
              {
                required: true,
                message: 'Please select product brand!',
              },
            ]}
          >
            <Select>
              {brands.map((brand) => (
                <Select.Option key={brand} value={brand}>
                  {brand}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Divider style={{ fontWeight: 'bold' }}>
            Uploaded Product Images
          </Divider>
          <div className="site-card-wrapper">
            <Row gutter={[8, 8]}>
              {productImages &&
                productImages.map((img) => (
                  <Col
                    xs={24}
                    sm={24}
                    md={12}
                    lg={12}
                    xl={8}
                    xxl={6}
                    key={img.public_id}
                  >
                    <Card
                      style={{
                        textAlign: 'center',
                        display: 'flex',
                        flexDirection: 'column',
                      }}
                    >
                      <Image
                        src={img.url}
                        style={{
                          objectFit: 'cover',
                          height: 120,
                          display: 'block',
                        }}
                      />
                      <Button
                        size="middle"
                        icon={<DeleteOutlined />}
                        //block
                        danger
                        type="primary"
                        style={{
                          marginTop: 10,
                          margin: '15px auto 0',
                          display: 'block',
                        }}
                        onClick={() => handleImageDelete(img.public_id)}
                      >
                        Delete
                      </Button>
                    </Card>
                  </Col>
                ))}
            </Row>
          </div>
          <FileUpload />
          <Form.Item>
            <Button
              type="primary"
              style={{ marginTop: 10, marginBottom: 40 }}
              size="large"
              block
              icon={<FileAddOutlined />}
              loading={createProductInProgress}
            >
              Update product
            </Button>
          </Form.Item>
        </>
      )}
    </Form>
  );
};

export default memo(ProductUpdateForm);
