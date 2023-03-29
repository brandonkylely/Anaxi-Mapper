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
      const data = await axios.post("/api/user/login", formData);
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
      <div className="w-full min-h-screen bg-opacity-40 bg-black z-10 absolute"></div>
      <div className="flex justify-center items-center min-h-screen hero font-sans">
        <form
          id="signup-form"
          className="card-body bg-white shadow-lg rounded-lg p-8 z-20"
          onSubmit={handleFormSubmit}
        >
          <div className="space-y-4">
            <h2 className="font-bold text-3xl font-semibold tracking-widest">
              Login:
            </h2>
            <div className="flex flex-col">
              <label
                htmlFor="username-input-signup"
                className="font-semibold mb-1"
              >
                Username:
              </label>
              <input
                onChange={handleFormChange}
                name="userName"
                type="text"
                id="username-input-signup"
                className="form-input rounded-lg py-2 px-3 border-2 border-gray-200"
              />
            </div>
            <div className="flex flex-col">
              <label
                htmlFor="password-input-signup"
                className="font-semibold mb-1"
              >
                Password:
              </label>
              <input
                onChange={handleFormChange}
                name="password"
                type="password"
                id="password-input-signup"
                className="form-input rounded-lg py-2 px-3 border-2 border-gray-200"
              />
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700"
            >
              Login
            </button>
            <a
              href="/signup"
              className="text-gray-500 font-bold py-2 px-4 rounded hover:text-gray-700"
            >
              Signup
            </a>
          </div>
        </form>
      </div>
    </>
  );
}
