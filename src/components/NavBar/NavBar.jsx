import { Link } from "react-router-dom";
import * as userService from "../../utilities/users-service";

export default function NavBar({ user, setUser }) {
  function handleLogOut() {
    userService.logOut();
    setUser(null);
  }

  return (
    <nav class="navbar" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
        <a class="navbar-item">
          <Link to="/">🌎PLANMYPATH</Link>
        </a>

        <a
          role="button"
          class="navbar-burger"
          aria-label="menu"
          aria-expanded="false"
          data-target="navbarBasicExample"
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div id="navbarBasicExample" class="navbar-menu">
        <div class="navbar-start">
        </div>

        <div class="navbar-end">
          <a class="navbar-item"><Link to="/">My Paths</Link></a>
          <a class="navbar-item"><Link to="/findpaths">Find Paths</Link></a>
          <div class="navbar-item">
            <div class="buttons">
              <a class="button is-light"><Link to="" onClick={handleLogOut}>Log Out</Link></a>
            </div>
          </div>
        </div>
      </div>
    </nav>
    // <nav>
    //   <Link to="/">My Paths</Link>
    //   &nbsp; | &nbsp;
    //   <Link to="/findpaths">Find Paths</Link>
    //   &nbsp; | &nbsp;
    //   <Link to="/profile">Profile</Link>
    //   &nbsp; &nbsp; <span className="name">Hey there {user.name}!</span>
    //   &nbsp; &nbsp; <Link to="" onClick={handleLogOut}>Log Out</Link>

    // </nav>
  );
}
