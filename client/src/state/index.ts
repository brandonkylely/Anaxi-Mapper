import {createContext} from 'react'

type CoordContextType = {
  currentCoords: {
    lat: number,
    lng: number
  },
  setCurrentCoords: (lat: number, lng: number) => void
}

const coordState = createContext<CoordContextType | null>(null);

export default coordState;