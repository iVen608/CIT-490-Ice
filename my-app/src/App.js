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
    
    /*<div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      
    </div>*/
  );
}

export default App;
