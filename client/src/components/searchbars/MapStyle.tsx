import { nearbyPlacesAtom, coordinateAtom, loadingAtom, mapStyleAtom, mapReloadAtom } from "../../state";
import { useAtom, useAtomValue, useSetAtom } from "jotai";

export default function MapStyle() {
  const [mapStyleValue, setMapStyle] = useAtom(mapStyleAtom);
  const setMapReload = useSetAtom(mapReloadAtom)

  const handleSetMapStyle = (event) => {
    const selection = event.target.value.toLowerCase();
    console.log(selection)
    setMapStyle(selection);
    setMapReload(true);
    setTimeout(() => setMapReload(false), 100);
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