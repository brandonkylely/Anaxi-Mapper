import { createContext } from "react";
import { atom } from "jotai";

export type CoordinateObject = {
  lat: number;
  lng: number;
};


export type MapperUser = {
  name: string;
  email: string;
} | null;

export const userAtom = atom<MapperUser>(null);
export const coordinateAtom = atom<CoordinateObject>({ lat: 34.0729297, lng: -118.4401635 });
export const currentSearchAtom = atom<unknown>([]);
export const addressAtom = atom<string>("");
export const loadingAtom = atom<boolean>(false);

export const mapReloadAtom = atom<boolean>(false);


// type CoordContextType = {
  //   currentCoords: CoordinateObject;
  //   setCurrentCoords?: (coords: CoordinateObject) => void;
  // };

  // const CoordState = createContext<CoordContextType>({
    //   currentCoords: { lat: 40.7484, lng: 73.9857 },
    // });

    
    // export default CoordState;