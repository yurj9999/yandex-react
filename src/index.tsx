import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router} from 'react-router-dom';
import {Provider} from 'react-redux';
import {configureStore} from '@reduxjs/toolkit';
import {rootReducer as reducer} from './services/reducers';

import {socketMiddleware} from './services/middlewares/socket-middleware';

import App from './components/app/app';

import './index.css';

import reportWebVitals from './reportWebVitals';






export const store = configureStore({
  reducer,
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(socketMiddleware as any)
});


export type TStore = typeof store.getState;
export type TDispatch = typeof store.dispatch;




ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <App/>
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
