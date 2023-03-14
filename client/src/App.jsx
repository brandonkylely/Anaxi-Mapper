// TODO: implement jotai atom state management
// import coordState from './state'
import Mapper from './components/Mapper'
import AddressSearch from './components/Search'
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

// function coordProvider({children}) {
  // const [currentCoords, setCurrentCoords] = useState({lat: 43.661036, lng: -79.391277})
//     return (
//       <coordState.Provider value={{currentCoords, setCurrentCoords}}>
//         {children}
//       </coordState.Provider>
//     )
// };


// function AppWithContext() {
//     return(
//     <coordProvider>
//         <App />
//     </coordProvider>
//     )
// };

export default App;