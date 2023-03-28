// @ts-nocheck
import axios from "axios";

axios.defaults.headers["Authorization"] = `Bearer ${localStorage.getItem(
  "id_token"
)}`;

export const test = async () => {
  console.log("test")
  const res = await axios.get("/api/test");
  console.log("res.data", res.data);
  return res.data;
};

// add additional api calls here
//export const addFav = () => does some fav stuff
export const addFav = async () => {
  try {
  console.log("addFav")
  const res = await axios.post(`/api/favorite`);
  console.log("res.data", res.data);
  return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const addComment = async () => {
  try {
  console.log("addComment")
  const res = await axios.post(`/api/comment`);
  console.log("res.data", res.data);
  return res.data;
  } catch (error) {
    console.log(error);
  }
};


export const nearbySearchData = async (url) => {
  console.log("nearbySearchData")
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
  // console.log("post")
  return res.data;
};


