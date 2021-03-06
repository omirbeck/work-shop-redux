import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reducer from './redux/reducer';
import Store from './redux/Store';

export const Context = React.createContext();

const initialState = {
  main: {},
  name: null,
  weather: [],
  wind: {},
  isLoading: false,
}

const store = new Store(reducer, initialState);

ReactDOM.render(
  <Context.Provider value={store} >
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Context.Provider>,
  document.getElementById('root')
);
