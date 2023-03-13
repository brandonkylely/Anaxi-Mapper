import React from 'react'
import Mapper from './Mapper'
import NavBar from './components/NavBar'
import SearchBar from './components/SearchBar'
import Dropdown from './components/Dropdown'



function App() {    
    return (
        <div>
            <div>
                <Mapper />
            </div>
            <div>
                <Dropdown />
            </div>
            <div> 
                <NavBar />
            </div>
            <div>
                <SearchBar />
            </div>


        </div>
        
    )


};

export default App;