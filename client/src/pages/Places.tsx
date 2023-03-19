
import { MouseEventHandler, useState, useContext, useMemo } from "react";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { coordinateAtom, userAtom } from "../state";
import Categories from "../components/Categories";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import usePlacesAutoComplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import { Combobox, ComboboxInput, ComboboxList, ComboboxOption, ComboboxPopover } from "@reach/combobox";
import "@reach/combobox/styles.css";
import { nearbySearch, post } from "../api";
import SecondarySearchBar from "../components/SecondarySearch";

export default function Places() {
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: "",
        libraries: ["places"],
    })

    if (!isLoaded) return <div>Loading...</div>;
    return <Map />
        
}

function Map() {
    const center = useMemo(() => ({ lat: 40.7128, lng: -74.006 }), []);
    const [selected, setSelected] = useState(null);

    return(
        <>
        <div className="places-container">

            <PlacesAutocomplete setSelected={setSelected} />
        </div>
        {/* @ts-ignore */}
        <GoogleMap
            zoom={10}
            center={center}
            mapContainerClassName="map-container"
        > {/* @ts-ignore */}
            {selected && <Marker position={selected} />}
        </GoogleMap>
        </>
    );
}

//@ts-ignore
const PlacesAutocomplete = ({ setSelected }) => {
    const {
        ready,
        value,
        setValue,
        suggestions: {status, data},
        clearSuggestions,
    } = usePlacesAutoComplete();
//@ts-ignore
    return <Combobox>
        {/* @ts-ignore */}
        <ComboboxInput value={value} onChange={e => setValue(e.target.value)} disabled={!ready}
        className="combobox-input" placeholder="Search an Address"/>
        {/* @ts-ignore */}
        <ComboboxPopover> 
            {/* @ts-ignore */}
            <ComboboxList>
                {/* @ts-ignore */}
                {status === "OK" && data.map(({place_id, description}) => <ComboboxOption 
                key={place_id} value={description}/>)}
            </ComboboxList>
        </ComboboxPopover>
    </Combobox>;
}