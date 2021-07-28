import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import { Spin, Typography } from 'antd';

const { Text } = Typography;

const LoadingToRedirect = () => {
  const [count, setCount] = useState(5);
  const history = useHistory();

  useEffect(() => {
    const interval = setInterval(() => {
      setCount(count - 1);
    }, 1000);

    // redirect once count is equal 0
    count === 0 && history.push('/');
    // claenup
    return () => clearInterval(interval);
  }, [count, history]);

  return (
    <div className="spiner">
      <Spin size="large" style={{ display: 'block' }} />
      <Text>Redirecting you in {count} seconds</Text>
    </div>
  );
};

export default LoadingToRedirect;
