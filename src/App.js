import React, { useEffect } from 'react';
import store from './store';
import { Provider, useSelector } from 'react-redux';
import Content from './Components/Content';

function App() {
  return (
    <div className='App'>
      <Provider store={store}>
        <Content />
      </Provider>
    </div>
  );
}

export default App;
