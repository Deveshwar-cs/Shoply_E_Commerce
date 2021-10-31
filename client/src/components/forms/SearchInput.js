import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

import {
  setSearchQuery,
  clearSearchQuery,
} from '../../store/actions/searchActions';

const { Search } = Input;

const SearchInput = () => {
  const dispatch = useDispatch();
  const { text } = useSelector((state) => state.search);
  const history = useHistory();

  const handleChange = (e) => {
    dispatch(setSearchQuery(e.target.value));
    // console.log(e.target.value);
  };

  const onSearch = (value) => {
    history.push(`/shop?${value}`);
    dispatch(clearSearchQuery());
  };
  return (
    <div style={{ margin: '5px 10px' }}>
      <Search
        placeholder="type here"
        //allowClear
        enterButton="Search"
        size="middle"
        value={text}
        onChange={(e) => handleChange(e)}
        onSearch={onSearch}
        //loading
      />
    </div>
  );
};
export default SearchInput;
