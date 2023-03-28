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
      <form
        id="signup-form"
        className="card-body flex justify-center p-10 m-5"
        onSubmit={handleFormSubmit}
      >
        <div className="form-outline space-y-4 rounded-lg tracking-wide">
            <h2 className="font-bold text-xl justify-center font-semibold tracking-widest">REGISTER: </h2>
          <label htmlFor="username-input-signup" className="form-label">
            Username:
          </label>
          <input
            onChange={handleFormChange}
            name="userName"
            type="text"
            id="username-input-signup"
            className="form-control rounded-lg"
          />
          <div className="">
            <label htmlFor="username-input-signup" className="form-label">
              Email:
            </label>
            <input
              onChange={handleFormChange}
              name="email"
              type="text"
              id="username-input-signup"
              className="form-control rounded-lg"
            />
          </div>
          <div>
            <label htmlFor="password-input-signup" className="form-label ">
              Password:
            </label>
            <input
              onChange={handleFormChange}
              name="password"
              type="text"
              id="password-input-signup"
              className="form-control rounded-lg w-3/5"
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary pl-4 pr-4 px-2 py-2 text-gray-600 hover:text-gray-700 hover:bg-gray-50 shadow-sm appearance-none rounded-md bg-white"
          >
            signup!
          </button>
        </div>
      </form>
    </>
  );
}
