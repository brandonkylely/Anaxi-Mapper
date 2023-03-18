import { createContext } from "react";
import { atom } from "jotai";

export type CoordinateObject = {
  lat: number;
  lng: number;
};

type CoordContextType = {
  currentCoords: CoordinateObject;
  setCurrentCoords?: (coords: CoordinateObject) => void;
};

const CoordState = createContext<CoordContextType>({
  currentCoords: { lat: 40.7484, lng: 73.9857 },
});

export type MapperUser = {
  name: string;
  email: string;
} | null;

export const userAtom = atom<MapperUser>(null);
export const coordinateAtom = atom({ lat: 40.7484, lng: 73.9857 });

export default CoordState;
