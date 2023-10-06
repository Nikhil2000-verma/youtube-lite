import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Home from './Pages/Home';
import Watch from './Pages/Watch';
import Search from './Pages/Search';
import Navbar from './Components/Navbar';

function App() {
  return (
    
    <div className="">
      
      <BrowserRouter>
      
        <Routes>
          <Route path='/' element={<Home></Home>} />
          <Route path='/search' element={<Search/>} />
          <Route path='/watch/:id' element={<Watch/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
