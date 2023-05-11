/*import logo from './logo.svg';*/
import './App.css';
import {Routes, Route} from 'react-router-dom';
import Header from './components/header';
import Footer from './components/footer';
import SearchBar from './components/searchBar';
import InvoiceCalculator from './components/invoiceCalculator';
import CustomerRouter from './components/customerRouter';
import InvoiceRouter from './components/invoiceRouter';

function App() {
  return (
    <>
      <Header/>
      <div id="content">
        <SearchBar/>
        <Routes>
          <Route path="/" element={<Footer/>}/>
          <Route path="/calculator" element={<InvoiceCalculator/>}/>
          <Route path="/customer/*" element={<CustomerRouter/>}/>
          <Route path="/invoices/*" element={<InvoiceRouter/>}/>
        </Routes>
      </div>
      <Footer/>
      
    </>
  );
}

export default App;
