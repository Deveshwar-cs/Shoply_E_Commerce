import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store/store';
import { auth } from './firebase';
import { authInfoSuccess } from './store/actions/authActions';
import { currentUser } from './functions/authFunctions';

auth.onAuthStateChanged(async (user) => {
  if (user) {
    const idTokenResult = await user.getIdTokenResult();

    currentUser(idTokenResult.token)
      .then((res) => {
        store.dispatch(
          authInfoSuccess({
            email: res.data.email,
            token: idTokenResult.token, // token from client
            name: res.data.name,
            role: res.data.role,
            _id: res.data._id,
          })
        );
      })
      .catch((error) => console.log('Error in currentUser', error));
  }
  ReactDOM.render(
    //<React.StrictMode>
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>,
    //</React.StrictMode>
    document.getElementById('root')
  );
});

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
