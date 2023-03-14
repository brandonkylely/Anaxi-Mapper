// TODO: implement jotai atom state management
// import coordState from './state'
import Mapper from './components/Mapper'
import AddressSearch from './components/Search'

function App() {    
    return (
        <div>
            {/* <Mapper /> */}
            <AddressSearch />
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