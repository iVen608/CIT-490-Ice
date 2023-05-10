/*import logo from './logo.svg';*/
import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Header from './components/header';
import Footer from './components/footer';
import SearchBar from './components/searchBar';
import InvoiceCalculator from './components/invoiceCalculator';

function App() {
  return (
    <>
      <Header/>
      <div id="content">
        <SearchBar/>
        <InvoiceCalculator/>
      </div>
      <Footer/>
      <Routes>
        <Route path="/" element={<Footer/>}/>
        <Route path="/search" element={<SearchBar/>}/>
      </Routes>
    </>
  );
}

export default App;
