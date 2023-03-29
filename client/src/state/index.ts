//@ts-nocheck
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
  lat: 34.076666,
  lng: -118.454386,
});
export const nearbyPlacesAtom = atom<Place[]>([]);
export const addressAtom = atom<string>("");
export const loadingAtom = atom<boolean>(false);
export const mapReloadAtom = atom<boolean>(false);
export const favoriteAtom = atom<unknown[]>([]);
export const categoryAtom = atom<Category[]>([]);
export const nextPageAtom = atom<boolean>(false);
export const currentParamsAtom = atom<SearchParam>(null);
export const mapStyleAtom = atom<string>("retail");
export const originIDAtom = atom<string>("");
export const destinationIDAtom = atom<string>("");
export const encodedPolylineAtom = atom<string>(
  "{p~nEbt~qUORn@x@r@`AjDnEbC~CPZLb@JdA?^Gn@Qx@E`@@z@Hj@Pd@dAxAlBlC^n@Vz@AJ@NJpAC~@UrAWn@g@x@k@h@c@l@O`@Md@Eb@DbA`@pAdAdCxBbF`@~@~@xBgAnA]ZSFKBKCMEM]C]@a@J[JOVY?SNMbBmA~@s@rB}AfEiDxLgKfS}PpNoLtGiFfGwEhMeJxDsCtGiFjEmD~AmAjAu@dAk@lAi@dDmAvCu@nDy@jCy@|BkA`CyAtBaBxD_D`F_EpLqJlOeMfDqCnDsC|@u@`Aq@d@Yn@[~@c@vAk@`Bk@T@R@r@Q~Bq@rB_ArBmA\\WN@j@a@dDaCdA]`AI^?f@Fv@Tf@Tn@f@j@t@Vj@Vr@Jf@XvBNx@`@dE@DR^BXNjBP`CXxCp@rFvA~InEpWfAnG^`CPxBFnB?z@GvDKtDC~BFzBRpCbAlIrBpP~@rGzApIdE|UxF`\\j@bDn@dDh@tB`@pA|@|BrAhCfBdClCnDvEhGhPfTV\\ETPZh@|@Zt@`@tATjBDl@Pn@NVFLBRx@`Av@hA\\n@\\j@o@x@_AjAm@t@aAnAkAxAmErFgI|J"
);
export const favClickedAtom = atom<boolean>("false");

// type CoordContextType = {
//   currentCoords: CoordinateObject;
//   setCurrentCoords?: (coords: CoordinateObject) => void;
// };

// const CoordState = createContext<CoordContextType>({
//   currentCoords: { lat: 40.7484, lng: 73.9857 },
// });

// export default CoordState;
