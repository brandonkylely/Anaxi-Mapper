import axios from "axios";

axios.defaults.headers[
  "Authorization"
] = `Bearer ${localStorage.getItem("id_token")}`;

//@ts-ignore
export const test = async (ex) => {
  console.log('test', ex)
  const res = await axios.get("/api/test");
  console.log('res.data', res.data)
  return res.data;
};

// add additional api calls here
//export const addFav = () => does some fav stuff
//@ts-ignore
export const nearbySearch = async (url) =>{
  const res = await axios.get(url);
  console.log('res.data', res.data)
  return res.data;
}
// export const nearbySearh = async (address) => {
//   const res = await axios.get(`/api/nearbysearch/`);
//   return res.data;
// };