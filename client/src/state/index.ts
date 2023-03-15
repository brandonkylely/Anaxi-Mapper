import {createContext} from 'react'

export type CoordinateObject =
  {
    lat: number,
    lng: number
  }

type CoordContextType = {
  currentCoords: CoordinateObject,
  setCurrentCoords?: (coords: CoordinateObject) => void
}

const CoordState = createContext<CoordContextType>({currentCoords:{lat: 40.7484, lng:73.9857}});

export default CoordState;