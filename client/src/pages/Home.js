import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  getAllProductsAction,
  clearAllProducts,
} from '../store/actions/productActions';

const Home = () => {
  const dispatch = useDispatch();
  const { getProductsInProgress, allProducts } = useSelector(
    (state) => state.product
  );

  useEffect(() => {
    dispatch(getAllProductsAction(3));
  }, []);

  return (
    <div>
      <h1>React Home page</h1>
      {getProductsInProgress ? (
        <h2>LOADING ...</h2>
      ) : (
        JSON.stringify(allProducts)
      )}
    </div>
  );
};

export default Home;
