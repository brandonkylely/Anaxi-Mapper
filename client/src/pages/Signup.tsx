export default function Signup() {
  return (
    <>
      <h2>REGISTER: </h2>

      <form
        id="signup-form"
        className="card-body"
        method="POST"
        action="/api/user"
      >
        <div className="form-outline mb-4">
          <label htmlFor="username-input-signup" className="form-label">
            Username
          </label>
          <input
        //   eg onChange={e => setUsername(e.target.value)}
            name="username"
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
