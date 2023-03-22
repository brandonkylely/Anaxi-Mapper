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
      navigate("/");
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
        className="card-body flex justify-center p-10 m-5"
        onSubmit={handleFormSubmit}
      >
        <div className="form-outline space-y-4 rounded-lg tracking-wide">
          <div className="font-bold text-xl justify-center font-semibold tracking-widest">
            <h2>LOGIN: </h2>
          </div>
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
          <div>
            <label htmlFor="password-input-signup" className="form-label ">
              Password:
            </label>
            <input
              onChange={handleFormChange}
              name="password"
              type="password"
              id="password-input-signup"
              className="form-control rounded-lg w-3/5"
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary pl-4 pr-4 px-2 py-2 text-gray-600 hover:text-gray-700 hover:bg-gray-50 shadow-sm appearance-none rounded-md bg-white"
          >
            login!
          </button>
        </div>
      </form>
    </>
  );
}
