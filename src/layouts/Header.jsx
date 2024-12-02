import { Link } from "react-router-dom";
import { useState } from "react";
import facade from "../util/apiFacade";

function Header() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState("");

  const login = (user, pass) => {
    facade.login(user, pass).then(() => {
      setLoggedIn(true);
      setUsername(user);
    });
  };

  const logout = () => {
    facade.logout();
    setLoggedIn(false);
    setUsername("");
  };

  return (
    <header>
      <nav>
        <Link to="/">Trips</Link>
        <Link to="/guides">Guides</Link>
        <Link to="/trip/1">Trip Details</Link>
      </nav>
      {loggedIn ? (
        <div>
          <span>Welcome, {username}!</span>
          <button onClick={logout}>Logout</button>
        </div>
      ) : (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const user = e.target.username.value;
            const pass = e.target.password.value;
            login(user, pass);
          }}
        >
          <input name="username" placeholder="Username" />
          <input name="password" type="password" placeholder="Password" />
          <button type="submit">Login</button>
        </form>
      )}
    </header>
  );
}

export default Header;
