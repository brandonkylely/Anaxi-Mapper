import React from "react";

export default function Login() {
  const handleFormSubmit = (event: any) => {
    event.preventDefault();
    console.log("form submitted");
  };

  const handleFormChange = ({
    target: { name, value },
  }: {
    target: { name: string; value: string };
  }) => {
    setFormData({ ...formData, [name]: value });
  };
  
  return (
    <>
      <form
        id="login-form"
        className="card-body flex justify-center p-10 m-5 "
        onSubmit={handleFormSubmit}
      >
        <div className="form-outline space-y-4 rounded-lg tracking-wide">
          <div className="font-bold text-xl justify-center font-semibold tracking-widest">
            <h2>EXISTING USERS: </h2>
          </div>
          <label htmlFor="username-input-login" className="form-label">
            name:
          </label>
          <input
              onChange={handleFormChange}
            name="name"
            type="text"
            id="username-input-login"
            className="form-control rounded-lg"
          />
          <div className="">
            <label htmlFor="username-input-login" className="form-label">
              email:
            </label>
            <input
                onChange={handleFormChange}
              name="email"
              type="text"
              id="username-input-login"
              className="form-control rounded-lg"
            />
          </div>
          <div>
            <label htmlFor="password-input-login" className="form-label ">
              password:
            </label>
            <input
                onChange={handleFormChange}
              name="password"
              type="password"
              id="password-input-login"
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
