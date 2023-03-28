import { createContext } from "react";
import { atom } from "jotai";

export type CoordinateObject = {
  lat: number;
  lng: number;
};

export type MapperUser = {
  userName: string;
  email: string;
} | null;

export type Category = {
  id: number;
  name: string;
};

export type SearchParam = {
  coords: CoordinateObject;
  address: string;
  keyword: string;
  type: string;
  radius: string;
} | null;

export type Place = {
  place_id: string;
  name: string;
  photos: {
    photo_reference: string;
  }[];
  rating: number;
  price_level: number;
};


export const userAtom = atom<MapperUser>(null);
export const coordinateAtom = atom<CoordinateObject>({
  lat: 34.0729297,
  lng: -118.4401635,
});
export const nearbyPlacesAtom = atom<Place[]>([]);
export const addressAtom = atom<string>("");
export const loadingAtom = atom<boolean>(false);
export const mapReloadAtom = atom<boolean>(false);
export const favoriteAtom = atom<unknown[]>([]);
export const categoryAtom = atom<Category[]>([]);
export const nextPageAtom = atom<boolean>(false);
export const currentParamsAtom = atom<SearchParam>(null);
export const originIDAtom = atom<string>("");




// type CoordContextType = {
//   currentCoords: CoordinateObject;
//   setCurrentCoords?: (coords: CoordinateObject) => void;
// };

// const CoordState = createContext<CoordContextType>({
//   currentCoords: { lat: 40.7484, lng: 73.9857 },
// });

// export default CoordState;
