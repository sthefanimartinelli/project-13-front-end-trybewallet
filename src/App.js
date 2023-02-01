import React from 'react';
import { Route } from 'react-router-dom';
import Login from './pages/Login';

function App() {
  return (
    <div>
      <div>Hello, TrybeWallet!</div>
      <Route exact path="/" component={ Login } />
    </div>
  );
}

export default App;
