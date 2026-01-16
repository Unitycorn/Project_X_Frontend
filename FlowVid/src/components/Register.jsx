export default function Register() {
  return (
    <div className="container">
      <h1 className="text-2xl">Register a new account</h1>
      <form action="registerUser">
        <label htmlFor="userName">Desired channel name:</label>
        <input type="text" name="userName"></input>
        <label htmlFor="userEmail">Your email address:</label>
        <input type="text" name="userEmail"></input>
        <label htmlFor="userPassword">Password:</label>
        <input type="text" name="userPassowrd"></input>
        <button className="button active" type="submit">
          Create Account
        </button>
      </form>
    </div>
  );
}
