import axios from "axios";

axios.defaults.headers[
  "Authorization"
] = `Bearer ${localStorage.getItem("id_token")}`;

export const test = async () => {
  const res = await axios.get("/api/test");
  console.log('res.data', res.data)
  return res.data;
};

// add additional api calls here
//export const addFav = () => does some fav stuff

