import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter} from 'react-router-dom'
import { Provider } from 'react-redux';
import App from './App';
import store from './Redux/Store'
import './index.css';

const ENV = require('./frontenv');

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App/>
    </BrowserRouter>
  </Provider>
, document.getElementById('root'));

