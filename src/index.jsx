import React from 'react';
import ReactDOM from 'react-dom';

import {Provider} from 'react-redux';
import {configureStore} from '@reduxjs/toolkit';
import {rootReducer as reducer} from './services/reducers';

import App from './components/app/app';
import './index.css';

import reportWebVitals from './reportWebVitals';

const store = configureStore({
  reducer
});

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App/>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
