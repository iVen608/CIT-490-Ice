import {React} from 'react';
import '../styles/searchBar.css';

function SearchBar(){
    return(
        <div id="search-bar-container">
            <input id="search-bar-input" type="text" placeholder='Search for customers..'/>
            <button id="search-bar-submit" type="button">Search</button>
        </div>
    )
}

export default SearchBar;

