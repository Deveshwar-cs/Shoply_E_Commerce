import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { SearchOutlined } from '@ant-design/icons';

import { setSearchQuery } from '../../../store/actions/searchActions';

import './SearchInput.css';

const SearchInput = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { text } = useSelector((state) => state.search);

  const handleChange = (e) => {
    dispatch(setSearchQuery(e.target.value));
  };

  const onSearch = () => {
    navigate(`/shop?${encodeURIComponent(text)}`);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      onSearch();
    }
  };

  return (
    <div className="premium-search">
      <SearchOutlined className="search-icon" />

      <input
        type="text"
        value={text}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder="Search products..."
        aria-label="Search products"
      />

      <button type="button" onClick={onSearch} aria-label="Search">
        Search
      </button>
    </div>
  );
};

export default SearchInput;
