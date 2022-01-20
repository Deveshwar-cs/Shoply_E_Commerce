import { Form, Input, Button } from 'antd';

import { LaptopOutlined } from '@ant-design/icons';

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 24,
      offset: 0,
    },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 24,
      offset: 0,
    },
  },
};

const { Item } = Form;

const CategoryForm = ({
  form,
  onFinish,
  onFinishFailed,
  inProgress,
  btnText,
  placeholderText,
}) => {
  return (
    <Form
      {...formItemLayout}
      style={{ marginTop: 20 }}
      form={form}
      size="large"
      name="category"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      scrollToFirstError
    >
      <Item
        name="name"
        //label="Category name"
        rules={[
          {
            required: true,
            message: 'Please input new category name!',
          },
        ]}
      >
        <Input size="large" placeholder={placeholderText} autoFocus />
      </Item>

      <Item {...tailFormItemLayout}>
        <Button
          type="primary"
          style={{ marginTop: 10 }}
          size="large"
          block
          icon={<LaptopOutlined />}
          loading={inProgress}
        >
          {btnText}
        </Button>
      </Item>
    </Form>
  );
};

export default CategoryForm;
