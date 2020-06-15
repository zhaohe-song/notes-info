import React from 'react';
import './App.css';
import { Provider } from 'react-redux'
import store from './store'
import Notes from './components/Notes';
import AddNote from './components/AddNote';

function App() {
  return (
    <Provider store={store}>
      <Notes />
      <AddNote />
    </Provider>
  );
}

export default App;
