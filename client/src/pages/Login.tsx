import { useState } from "react";
import axios from "axios";
import { useAtom } from "jotai/react";
import { useNavigate } from "react-router-dom";
import token from "../utils/token";
import { userAtom, MapperUser } from "../state";

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    userName: "",
    password: "", 
  });
  const handleFormChange = ({
    target: { name, value },
  }: {
    target: { name: string; value: string };
  }) => {
    setFormData({ ...formData, [name]: value });
  };
  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      console.log(formData);
      const data = (await axios.post("/api/user/login", formData))
      console.log("DATA FROM BACKEND", data.data);
      token.login(data.data.token);
      // got token, what do?
      const user = token.decode(data.data.token);
      localStorage.setItem("userId", data.data.userId);
      setUser(user.data);
      navigate("/search");
    } catch (err: unknown) {
      //this will either be Username not found!
      //or Incorrect password!
      //not sure how best to display
      console.log(err);
      //maybe some error handling? display to user?
    }
  };
  const [user, setUser] = useAtom(userAtom);

  return (
    <>
      <form
        id="signup-form"
        className="card-body flex justify-center mt-56"
        onSubmit={handleFormSubmit}
      >
        <div className="text-xl space-y-4 rounded-lg tracking-wide ">
            <h2 className="font-bold text-3xl font-semibold tracking-widest">LOGIN: </h2>
          <div className="flex justify-between">
            <label htmlFor="username-input-signup" className="form-label">
              Username:
            </label>
            <input
              onChange={handleFormChange}
              name="userName"
              type="text"
              id="username-input-signup"
              className="form-control rounded-lg px-2 w-56"
              />
          </div>
          <div className="flex justify-between">
            <label htmlFor="password-input-signup" className="form-label ">
              Password:
            </label>
            <input
              onChange={handleFormChange}
              name="password"
              type="password"
              id="password-input-signup"
              className="form-control rounded-lg w-56"
            />
          </div>
          <button
            type="submit"
            className="pl-4 pr-4 px-2 py-2 text-gray-600 hover:text-gray-700 hover:bg-gray-50 shadow-sm appearance-none rounded-md bg-white"
          >
            login!
          </button>
          <a href="/signup"
            className="pl-4 pr-4 px-2 py-2 text-gray-600 hover:text-gray-700 hover:bg-gray-50 shadow-sm appearance-none rounded-md bg-white"
          >
            signup
          </a>
        </div>
      </form>
    </>
  );
}
