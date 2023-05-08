/*import logo from './logo.svg';*/
import './App.css';
/*import BrowserRouter from 'react-router-dom';*/
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
    </>
  );
}

export default App;
