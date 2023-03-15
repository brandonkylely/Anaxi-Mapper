import { useState } from "react";
import axios from "axios";
import { useAtom } from "jotai/react";
import { useNavigate } from "react-router-dom";
import token from "../utils/token";
import { userAtom, MapperUser } from "../state";
export default function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
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

      // got token, what do?

      //store token in local storage;
      token.login(data.token);
      const user = token.decode(data.token)
      //update user state
      setUser(user.data);
      //maybe redirect to home page?
      navigate("/");
    } catch (err) {
      console.log(err);
      //failed, what do?
      //maybe some error handling? display to user?
    }
  };
  return (
    <>
      <h2>REGISTER: </h2>

      <form id="signup-form" className="card-body" onSubmit={handleFormSubmit}>
        <div className="form-outline mb-4">
          <label htmlFor="username-input-signup" className="form-label">
            Your name
          </label>
          <input
            onChange={handleFormChange}
            name="name"
            type="text"
            id="username-input-signup"
            className="form-control"
          />
        </div>
        <div className="form-outline mb-4">
          <label htmlFor="username-input-signup" className="form-label">
            Email
          </label>
          <input
            onChange={handleFormChange}
            name="email"
            type="text"
            id="username-input-signup"
            className="form-control"
          />
        </div>

        <div className="form-outline mb-4">
          <label htmlFor="password-input-signup" className="form-label">
            Password
          </label>
          <input
            onChange={handleFormChange}
            name="password"
            type="password"
            id="password-input-signup"
            className="form-control"
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Signup!
        </button>
      </form>
    </>
  );
}
