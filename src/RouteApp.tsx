import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import DemoComponent from './Demo/DemoComponent';
import DemoGetting from './Demo/DemoGetting';
import ParentComponent from './Demo/ParentComponent';
import ComponentContext from './Demo/ComponentContext';
import ComponentPattern from './Demo/ComponentPattern';
import MyComponent from './Demo/MyComponent';

import CartStore from './ShopCart/Cart';

import ProductList from './filebase/demodatabase/Product';
import TestAnt from './ant/TestAtn';
import CardFirebase from './FirebaseRedux/CardFirebase';
import YourComponent from './FirebaseRedux/LoadDataRedux';







function RouteApp() {
  return (
    <BrowserRouter >
    <Routes>
     
      <Route path="/" element={<DemoComponent />} />
      <Route path= "/Getting" element={<DemoGetting/>} />
      <Route path= "/ParentCompoent" element={<ParentComponent/>} />
      <Route path= "/PropsContext" element={<ComponentContext/>} />
      <Route path='/ProsPattern' element={<ComponentPattern/>} />
      <Route path='/object' element={<MyComponent/>} />
      <Route path='/cart' element = {<CartStore/>} />
      <Route path='/firebase' element={<ProductList/>} />
     <Route path='/ant' element={<TestAnt/>} />
     <Route path='/carFirebase' element={<CardFirebase/>} />
     <Route path='/a' element={<YourComponent/>} />
    </Routes>
  </BrowserRouter>
  );
}

export default RouteApp;
