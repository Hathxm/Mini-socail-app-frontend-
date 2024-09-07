import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Wrapper from './Wrappers/Wrapper';
import { Provider } from 'react-redux';
import Store from './Redux/Store'



function App() {
  return (
    <Provider store={Store}>
    <Router>
      <Routes>
        <Route path="/*" element={<Wrapper/>} />
      </Routes>
    </Router>
    </Provider>
  );
}

export default App;
