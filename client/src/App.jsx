// TODO: implement jotai atom state management
// import coordState from './state'
import CoordState from './state'
import Mapper from './components/Mapper'
import AddressSearch from './components/Search'
import React, {useState} from 'react'
// import Mapper from './Mapper'
import NavBar from './components/NavBar'
import SearchBar from './components/SearchBar'
import Dropdown from './components/Dropdown'
import Favorite from './components/Favorite'


function App() {    
    return (
        <div>
            <div>
              <Mapper />
            </div>
            <div>
              <AddressSearch/>
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
            <div>
                <Favorite />
            </div>

        </div>
        
    )
};

function CoordProvider({children}) {
  const [currentCoords, setCurrentCoords] = useState({lat: 43.661036, lng: -79.391277})
    return (
      <CoordState.Provider value={{currentCoords, setCurrentCoords}}>
        {children}
      </CoordState.Provider>
    )
};


function AppWithContext() {
    return(
    <CoordProvider>
        <App />
    </CoordProvider>
    )
};

export default AppWithContext;