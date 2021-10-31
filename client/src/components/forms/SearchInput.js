import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

const { Search } = Input;

const SearchInput = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const onSearch = (value) => {
    console.log(value);
    history.push(`/shop?${value}`);
  };
  return (
    <Search
      placeholder="type here"
      //allowClear
      enterButton="Search"
      size="middle"
      onSearch={onSearch}
      //loading
    />
  );
};
export default SearchInput;
