import axios from "axios";

axios.defaults.headers["Authorization"] = `Bearer ${localStorage.getItem(
  "id_token"
)}`;

//@ts-ignore
export const test = async () => {
  const res = await axios.get("/api/test");
  console.log("res.data", res.data);
  return res.data;
};

// add additional api calls here
//export const addFav = () => does some fav stuff
//@ts-ignore
export const addFav = async () => {
  try {
  const res = await axios.post(`/api/favorite`);
  console.log("res.data", res.data);
  return res.data;
  } catch (error) {
    console.log(error);
  }
};

//@ts-ignore
export const addComment = async () => {
  try {
  const res = await axios.post(`/api/comment`);
  console.log("res.data", res.data);
  return res.data;
  } catch (error) {
    console.log(error);
  }
};


//@ts-ignore
export const nearbySearchData = async (url) => {
  const res = await axios.get(url);
  console.log("res.data", res.data);
  return res.data;
};
// export const nearbySearchData = async (address) => {
//   const res = await axios.get(`/api/nearbysearch/`);
//   return res.data;
// };
export const post = async (
  endpoint: string,
  params: { [key: string]: any } = {}
) => {
  const res = await axios.post(endpoint, params);
  return res.data;
};
