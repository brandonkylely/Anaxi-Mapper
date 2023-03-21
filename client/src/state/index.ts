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


export type Category = {
  id: number;
  name: string;
}

export type SearchParam = {
  coords: CoordinateObject;
  address: string;
  type: string;
  radius: string;
}| null;

export const userAtom = atom<MapperUser>(null);
export const coordinateAtom = atom<CoordinateObject>({ lat: 34.0729297, lng: -118.4401635 });
export const currentSearchAtom = atom<unknown>([]);
export const addressAtom = atom<string>("");
export const loadingAtom = atom<boolean>(false);
// export const nearbyPlacesAtom = atom<unknown>([
//   {name: "default name", coords: {lat: 34.0829297, lng: -118.4401635}, icon: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/restaurant-71.png"},
//   {name: "default name", coords: {lat: 34.0629297, lng: -118.4401635}, icon: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/restaurant-71.png"}
// ])

export const mapReloadAtom = atom<boolean>(false);
export const favoriteAtom = atom<array>([]);
export const categoryAtom = atom<Category[]>([]);
export const nextPageAtom = atom<boolean>(false);
export const currentParamsAtom = atom<SearchParam>(null);


// type CoordContextType = {
  //   currentCoords: CoordinateObject;
  //   setCurrentCoords?: (coords: CoordinateObject) => void;
  // };

  // const CoordState = createContext<CoordContextType>({
    //   currentCoords: { lat: 40.7484, lng: 73.9857 },
    // });

    
    // export default CoordState;