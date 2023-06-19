import React from 'react';
import './App.css';
import {Routes, Route} from 'react-router-dom';
import Header from './components/header';
import Footer from './components/footer';
import InvoiceCalculator from './pages/invoiceCalculator';
import CustomerRouter from './pages/customerRouter';
import InvoiceRouter from './pages/invoiceRouter';
import RoutesRouter from './pages/routesRouter';
import CallInRouter from './pages/callInRouter';
import HomeGrid from './pages/homeGrid';
import MyTableView from './components/tableView';
import Login from './pages/login';
import jwt from './utility';
function App() {
  return (
    <>
      <Header/>
      <div id="content">
        <Routes>
          
          <Route path="/login" element={<Login/>}/>
          {jwt() && <><Route path="/grid" element={<MyTableView key="1234"/>}/>
            <Route path="/" element={<HomeGrid/>}/>
            <Route path="/calculator" element={<InvoiceCalculator/>}/>
            <Route path="/customer/*" element={<CustomerRouter/>}/>
            <Route path="/invoices/*" element={<InvoiceRouter/>}/>
            <Route path="/callin/*" element={<CallInRouter/>}/>
            <Route path="/routes/*" element={<RoutesRouter/>}/></>}
          {!jwt() && <>
            <Route path="/*" element={<Login/>}/>
          </>}
        </Routes>
      </div>
      <Footer/>
      
    </>
  );
}

export default App;
