import { useDispatch, useSelector } from 'react-redux';

import { Table, Modal, Typography } from 'antd';

import { ExclamationCircleOutlined, DeleteTwoTone } from '@ant-design/icons';

import {
  getAllCouponsAction,
  deleteCouponAction,
} from '../../store/actions/couponActions';

const { confirm } = Modal;
const { Text } = Typography;

const CouponTable = ({ allCoupons }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const handleDeleteConfirm = (couponId, couponName) => {
    confirm({
      title: `Do you want to delete ${couponName} coupon?`,
      icon: <ExclamationCircleOutlined />,
      //content: 'Some descriptions',
      onOk() {
        // return promise (dispatch is the promise here) to display loading state on the confirm button
        return dispatch(deleteCouponAction(couponId, user.token)).then(() =>
          dispatch(getAllCouponsAction(user.token))
        );
      },
      onCancel() {
        console.log('Cancel delete coupon!');
      },
    });
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      fixed: 'left',
      render: (name) => <Text>{name}</Text>,
    },
    {
      title: 'Expiry (Year/Month/Day)',
      dataIndex: 'expiry',
      key: 'expiry',
      align: 'center',
      render: (expiry) => <Text>{expiry.substring(0, 10)}</Text>,
    },
    {
      title: 'Discount, %',
      dataIndex: 'discount',
      key: 'discount',
      align: 'center',
    },
    {
      title: 'Remove',
      key: 'remove',
      dataIndex: 'remove',
      align: 'center',
      render: (id, record) => (
        <DeleteTwoTone
          twoToneColor="#ff4d4f"
          style={{ fontSize: 26 }}
          onClick={() => handleDeleteConfirm(id, record.name)}
        />
      ),
    },
  ];

  const tableData = allCoupons.map((item) => ({
    key: item._id,
    id: item._id,
    name: item.name,
    expiry: item.expiry,
    discount: item.discount,
    remove: item._id,
  }));

  return (
    <Table
      columns={columns}
      dataSource={tableData}
      pagination={false}
      bordered={true}
      scroll={{ x: true }}
    />
  );
};

export default CouponTable;
