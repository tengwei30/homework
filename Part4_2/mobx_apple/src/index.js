import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'mobx-react'
import App from './App';
import store from './stores/appStore'

ReactDOM.render(
  <Provider appleStore={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

