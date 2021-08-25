import { Input } from 'antd';

export const LocalSearch = ({ keyword, setKeyword }) => {
  const handleSearchChange = (e) => {
    e.preventDefault();
    setKeyword(e.target.value.toLowerCase());
  };

  return (
    <Input
      size="large"
      placeholder="Category search"
      value={keyword}
      onChange={handleSearchChange}
    />
  );
};

export const searched = (keyword) => (category) =>
  category.name.toLowerCase().includes(keyword);
