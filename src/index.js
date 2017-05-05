import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './Store';

import CalendarApp from './Containers/CalendarApp';

ReactDOM.render(
  <Provider store={store}>
    <CalendarApp />
  </Provider>,
  document.getElementById('root')
);
