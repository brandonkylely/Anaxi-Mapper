import { useAtom } from "jotai";
import { midwayFirstAtom, midwaySecondAtom } from "../../state";
import { post } from "../../api";
import { useState, ChangeEventHandler } from "react";
import polyline from "@mapbox/polyline";

export default function MidwaySearchBars() {
  const [midwayFirst, setMidwayFirst] = useAtom(midwayFirstAtom);
  const [midwaySecond, setMidwaySecond] = useAtom(midwaySecondAtom);
  const [firstAddress, setFirstAddress] = useState<string>("");
  const [secondAddress, setSecondAddress] = useState<string>("");

  const [firstAddressSet, setFirstAddressSet] = useState<boolean>(false);
  const [secondAddressSet, setSecondAddressSet] = useState<boolean>(false);
  const [keyword, setKeyword] = useState<string>("");
  const [radius, setRadius] = useState<string>("");
  const [encodedPolylineValue, setEncodedPolylineValue] = useState<string>("");
  const [midwayCoords, setMidwayCoords] = useState<any>([]);

  const handleSetFirstAddress = (event: any) => {
    setFirstAddress(event.target.value);
  };

  const handleSetSecondAddress = (event: any) => {
    setSecondAddress(event.target.value);
  };

  const handleFirstFormSubmit = (event: any) => {
    event.preventDefault();
    getMidwayCoords(firstAddress, true).then((result) => {
      if (result.validAddress === false) {
        console.log("getMidwayCoords returned false");
        return;
      }
      setFirstAddressSet(true);
      console.log(result, "FIRSTFORMSUBMIT");
      console.log(midwayFirst, "MIDWAYFIRST");
    });
  };

  const handleSecondFormSubmit = (event: any) => {
    event.preventDefault();
    getMidwayCoords(secondAddress, false).then((result) => {
      if (result.validAddress === false) {
        console.log("getMidwayCoords returned false");
        return;
      }
      setSecondAddressSet(true);
      console.log(result, "SECONDFORMSUBMIT");
      console.log(midwaySecond, "MIDWAYSECOND");
    });
  };

  const handleDirections = (event: any) => {
    event.preventDefault();
    console.log("handleDirections");
    getDirections(midwayFirst.place_id, midwaySecond.place_id)
      .then((result) => {
        console.log(result, "HANDLE DIRECTIONS");
        console.log(encodedPolylineValue, "ENCODED POLYLINE VALUE");
        const decodedPolyline = polyline.toGeoJSON(encodedPolylineValue);
        console.log(decodedPolyline, "DECODED POLYLINE");
        let middleIndex = Math.floor(decodedPolyline.coordinates.length / 2);
        console.log(middleIndex, "MIDDLE INDEX");
        setMidwayCoords(decodedPolyline.coordinates[middleIndex]);
      })
      .then(() => {
        console.log(midwayCoords, "MIDWAY COORDS");
      });
  };

  async function getDirections(
    originIDValue: string,
    destinationIDValue: string
  ) {
    try {
      const directionsData = await post("/api/address/directions", {
        originIDValue,
        destinationIDValue,
      });
      setEncodedPolylineValue(
        directionsData.data.routes[0].overview_polyline.points
      );
      return directionsData;
    } catch (err) {
      console.log(err);
    }
  }

  //will set the first or second atom depending on the boolean
  async function getMidwayCoords(userAddress: string, firstSecond: boolean) {
    const addressData = await post("/api/address/search", { userAddress });
    if (!addressData.validAddress) {
      console.log("that is not a valid address");
      return addressData;
    }

    firstSecond
      ? setMidwayFirst(addressData.newAddress)
      : setMidwaySecond(addressData.newAddress);
    return addressData;
  }

  function midwayParams() {
    const handleSetUserParams = (event: any) => {
      const { name, value } = event.target;
      return name === "radius"
        ? setRadius(value)
        : // : name === "type"
          // ? setType(value)
          setKeyword(value);
    };

    const handleFormSubmit = (event: any) => {
      event.preventDefault();
      console.log("handleFormSubmit");
      console.log(midwayCoords, "MIDWAY COORDS");
      console.log(keyword, "KEYWORD");
      console.log(radius, "RADIUS");
      let userParams = {
        type: "",
        keyword: keyword,
        radius: radius,
        coordinate: { lat: midwayCoords[0], lng: midwayCoords[1] },
        useNextPage: false,
      };

      getNearby(userParams).then((result) => {
        console.log(result, "NEARBY");
      });
      //call midway search here
    };

    async function getNearby(userParams: object) {
      const nearbyData = await post("/api/address/nearby", { userParams });
      return nearbyData;
    }

    return (
      <div>
        <form className="px-4 form">
          <input
            className="font-fuzzy-bubbles w-1/6 h-12 text-2xl py-1 pl-3 pr-2 text-gray-500 border rounded-md outline-none bg-gray-50 focus:bg-white focus:border-indigo-600"
            value={radius}
            name="radius"
            onChange={handleSetUserParams}
            type="text"
            placeholder="radius (km)"
          />
          <input
            className="font-fuzzy-bubbles w-1/6 h-12 text-2xl py-1 pl-3 pr-2 text-gray-500 border rounded-md outline-none bg-gray-50 focus:bg-white focus:border-indigo-600"
            value={keyword}
            name="keyword"
            onChange={handleSetUserParams}
            type="text"
            placeholder="keyword"
          />
          <button
            className="font-fuzzy-bubbles w-1/12 h-12 text-2xl bg-white text-gray-600 py-auto rounded-lg mt-2 transition-all ease-out duration-300 hover:scale-110 hover:bg-black hover:bg-opacity-10 ml-2"
            onClick={handleFormSubmit}
          >
            submit
          </button>
        </form>
      </div>
    );
  }

  return (
    <div>
      <form className="px-4 form">
        <div className="inline">
          <div>
            <input
              className="font-fuzzy-bubbles w-1/3 h-12 text-2xl py-1 pl-3 pr-2 text-gray-500 border rounded-md outline-none bg-gray-50 focus:bg-white focus:border-indigo-600"
              value={firstAddress}
              name="firstAddress"
              onChange={handleSetFirstAddress}
              type="text"
              placeholder="Enter address #1"
            />
            <button
              className="font-fuzzy-bubbles w-1/12 h-12 text-2xl bg-white text-gray-600 py-auto rounded-lg mt-2 transition-all ease-out duration-300 hover:scale-110 hover:bg-black hover:bg-opacity-10 ml-2"
              onClick={handleFirstFormSubmit}
            >
              submit
            </button>
          </div>
          <div>
            <input
              className="font-fuzzy-bubbles w-1/3 h-12 text-2xl py-1 pl-3 pr-2 text-gray-500 border rounded-md outline-none bg-gray-50 focus:bg-white focus:border-indigo-600"
              value={secondAddress}
              name="secondAddress"
              onChange={handleSetSecondAddress}
              type="text"
              placeholder="Enter address #2"
            />
            <button
              className="font-fuzzy-bubbles w-1/12 h-12 text-2xl bg-white text-gray-600 py-auto rounded-lg mt-2 transition-all ease-out duration-300 hover:scale-110 hover:bg-black hover:bg-opacity-10 ml-2"
              onClick={handleSecondFormSubmit}
            >
              submit
            </button>
          </div>
          <div>
            <button
              className="font-fuzzy-bubbles w-1/12 h-12 text-2xl bg-white text-gray-600 py-auto rounded-lg mt-2 transition-all ease-out duration-300 hover:scale-110 hover:bg-black hover:bg-opacity-10 ml-2"
              onClick={handleDirections}
            >
              Confirm Addresses
            </button>
          </div>
        </div>
      </form>
      <div>{firstAddressSet && secondAddressSet ? midwayParams() : null}</div>
    </div>
  );
}
