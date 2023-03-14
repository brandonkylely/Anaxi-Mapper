import {createContext} from 'react'

export type CoordinateObject =
  {
    lat: number,
    lng: number
  }

type CoordContextType = {
  currentCoords: CoordinateObject,
  setCurrentCoords: (coords: CoordinateObject) => void
}

const CoordState = createContext<CoordContextType | null>(null);

export default CoordState;