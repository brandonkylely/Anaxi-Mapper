import { useState } from "react";
import axios from "axios";
import { useAtom } from "jotai/react";
import { useNavigate } from "react-router-dom";
import token from "../utils/token";
import { userAtom, MapperUser } from "../state";
// import { LockClosedIcon } from '@heroicons/react/20/solid'

export default function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    password: "",
  });
  const [user, setUser] = useAtom(userAtom);
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
      const { data } = await axios.post("/api/user", formData);
      console.log("DATA FROM BACKEND", data);
      localStorage.setItem("userId", data.userId);
      console.log(data.userId);

      // got token, what do?s

      //store token in local storage;
      token.login(data.token);
      const user = token.decode(data.token);
      //update user state
      setUser(user.data);
      //maybe redirect to home page?
      navigate("/search");
    } catch (err) {
      console.log(err);
      //failed, what do?
      //maybe some error handling? display to user?
    }
  };
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
              Register:
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
                htmlFor="username-input-signup"
                className="font-semibold mb-1"
              >
                Email:
              </label>
              <input
                onChange={handleFormChange}
                name="email"
                type="text"
                id="username-input-signup"
                className="form-input rounded-lg py-2 px-3 border-2 border-gray-200"
              />
            </div>
            <div className="flex flex-col">
              <label
                htmlFor="username-input-signup"
                className="font-semibold mb-1"
              >
                Password:
              </label>
              <input
                onChange={handleFormChange}
                name="password"
                type="text"
                id="username-input-signup"
                className="form-input rounded-lg py-2 px-3 border-2 border-gray-200"
              />
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700"
            >
              Signup
            </button>
            <a
              href="/login"
              className="text-gray-500 font-bold py-2 px-4 rounded hover:text-gray-700"
            >
              Login
            </a>
          </div>
        </form>
      </div>
    </>
  );
}
