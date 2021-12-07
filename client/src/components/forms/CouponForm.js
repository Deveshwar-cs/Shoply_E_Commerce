import { Form, Input, Button, Divider, DatePicker } from 'antd';

import { PercentageOutlined } from '@ant-design/icons';

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

const CouponForm = ({ form, onFinish, onFinishFailed, inProgress }) => {
  return (
    <Form
      {...formItemLayout}
      style={{ marginTop: 20 }}
      form={form}
      size="large"
      name="coupon"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      scrollToFirstError
    >
      <Divider style={{ fontWeight: 'bold' }}>Coupon name</Divider>
      <Item
        name="name"
        rules={[
          {
            required: true,
            message: 'Please input new coupon name!',
          },
        ]}
      >
        <Input size="large" placeholder="Enter a coupon name" autoFocus />
      </Item>
      <Divider style={{ fontWeight: 'bold' }}>Discount value</Divider>
      <Item
        name="discount"
        rules={[
          {
            required: true,
            message: 'Please input discount value!',
          },
        ]}
      >
        <Input size="large" placeholder="Enter discount value" />
      </Item>
      <Divider style={{ fontWeight: 'bold' }}>Expiry Date</Divider>
      <Item
        name="expiry"
        rules={[
          {
            required: true,
            message: 'Please select expiry date!',
          },
        ]}
      >
        <DatePicker
          size="large"
          format="YYYY-MM-DD"
          placeholder="Select expiry date"
        />
      </Item>
      <Item {...tailFormItemLayout}>
        <Button
          type="primary"
          style={{ marginTop: 10 }}
          size="large"
          block
          icon={<PercentageOutlined />}
          loading={inProgress}
          htmlType="submit"
        >
          Create coupon
        </Button>
      </Item>
    </Form>
  );
};

export default CouponForm;
