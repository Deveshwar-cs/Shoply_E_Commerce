import React from 'react';
import ReactDOM from 'react-dom/client';

import 'antd/dist/antd.css';
import './index.css';

import App from './App';
import reportWebVitals from './reportWebVitals';

import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import ScrollToTop from './components/ScrollToTop/ScrollToTop';
import store from './store/store';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Provider store={store}>
    <Router>
      <ScrollToTop />
      <App />
    </Router>
  </Provider>
);

reportWebVitals();
