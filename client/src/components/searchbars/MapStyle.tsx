//@ts-nocheck
import { nearbyPlacesAtom, coordinateAtom, loadingAtom, mapStyleAtom, mapReloadAtom } from "../../state";
import { useAtom, useAtomValue, useSetAtom } from "jotai";

export default function MapStyle() {
  const [mapStyleValue, setMapStyle] = useAtom(mapStyleAtom);
  const handleSetMapStyle = (event) => {
    const selection = event.target.value.toLowerCase();
    setMapStyle(selection);
   }

  return(
    <select name="mapStyle" 
      onChange={handleSetMapStyle}
      className="font-fuzzy-bubbles w-1/6 h-12 text-2xl py-1 pl-3 pr-2 text-gray-500 border rounded-md outline-none bg-gray-50 focus:bg-white focus:border-indigo-600 float-right">
      <option value='retail'>Retail</option>
      <option value="full">Full</option>
    </select>
    )
}