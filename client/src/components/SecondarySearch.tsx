import { MouseEventHandler, useState } from "react";
import { nearbySearch, post } from "../api";
import { coordinateAtom, userAtom, currentSearchAtom } from "../state";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
// import CurrentSearch from "./CurrentSearch";


export default function SecondarySearchBar() {
  const coordValue = useAtomValue(coordinateAtom)
  const currentSearch = useAtomValue(currentSearchAtom);
  const setSearch = useSetAtom(currentSearchAtom);
  const [radius, setRadius] = useState<string>("");
  const [type, setType] = useState<string>("");
  const [keyword, setKeyword] = useState<string>("");

  const handleSetUserParams = (event: any) => {
    const {name, value} = event.target;
    return name === 'radius' ? setRadius(value) : name === 'type' ? setType(value) : setKeyword(value);
  };

  const handleFormSubmit = (event: any) => {
    event.preventDefault();
    const userParams = {
      type: type,
      radius: radius,
      keyword: keyword,
      coordinate: coordValue
    }
    getNearby(userParams).then((result) => {
      // console.log('getNearby Result', result)
      // setSearch(result);
      // console.log(result);
      // return result.json();
      // alert(`${apiFetch(result)}`);
    });
  };

  async function getNearby(userParams: object) {
    const nearbyData = await post("/api/address/nearby", { userParams });
    setSearch(nearbyData);
    console.log('currentSearch Log', currentSearch)
  }

  return (
    <>
    <h2>{currentSearch[0].place_id}</h2>
      <form className="px-4 form">
        <input
          className="w-small py-1 pl-3 pr-2 text-gray-500 border rounded-md outline-none bg-gray-50 focus:bg-white focus:border-indigo-600"
          value={radius}
          name="radius"
          onChange={handleSetUserParams}
          type="text"
          placeholder="radius (km)"
        />
        <input
          className="w-small py-1 pl-3 pr-2 text-gray-500 border rounded-md outline-none bg-gray-50 focus:bg-white focus:border-indigo-600"
          value={type}
          name="type"
          onChange={handleSetUserParams}
          type="text"
          placeholder="type"
        />
        <input
          className="w-small py-1 pl-3 pr-2 text-gray-500 border rounded-md outline-none bg-gray-50 focus:bg-white focus:border-indigo-600"
          value={keyword}
          name="keyword"
          onChange={handleSetUserParams}
          type="text"
          placeholder="keyword"
        />
        <button
          className="bg-white text-gray-600 px-2 py-1 rounded-lg mt-2 hover:bg-stone-200 ml-2"
          onClick={handleFormSubmit}
        >
          submit
        </button>
        <div className="float-right"></div>
      </form>
      {/* {loaded?
      <CurrentSearch></CurrentSearch>
      :
      <div></div>
      } */}
    </>
  );
}
