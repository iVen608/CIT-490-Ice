/*import logo from './logo.svg';*/
import './App.css';
import {Routes, Route} from 'react-router-dom';
import Header from './components/header';
import Footer from './components/footer';
import SearchBar from './components/searchBar';
import InvoiceCalculator from './pages/invoiceCalculator';
import CustomerRouter from './pages/customerRouter';
import InvoiceRouter from './pages/invoiceRouter';
import RoutesRouter from './pages/routesRouter';
import CallInRouter from './pages/callInRouter';
import HomeGrid from './pages/homeGrid';
function App() {
  return (
    <>
      <Header/>
      <div id="content">
        <SearchBar/>
        <Routes>
          <Route path="/" element={<HomeGrid/>}/>
          <Route path="/calculator" element={<InvoiceCalculator/>}/>
          <Route path="/customer/*" element={<CustomerRouter/>}/>
          <Route path="/invoices/*" element={<InvoiceRouter/>}/>
          <Route path="/callin/*" element={<CallInRouter/>}/>
          <Route path="/routes/*" element={<RoutesRouter/>}/>
        </Routes>
      </div>
      <Footer/>
      
    </>
  );
}

export default App;
