import { Link } from 'react-router-dom';
import * as userService from '../../utilities/users-service'

export default function NavBar({ user, setUser }) {
  function handleLogOut(){
    userService.logOut()
    setUser(null)
  }

  return (
    <nav>
      <Link to="/">My Paths</Link>
      &nbsp; | &nbsp;
      <Link to="/findpaths">Find Paths</Link>
      &nbsp; | &nbsp;
      <Link to="/profile">Profile</Link>
      &nbsp; &nbsp; <span className="name">Hey there {user.name}!</span>
      &nbsp; &nbsp; <Link to="" onClick={handleLogOut}>Log Out</Link>

    </nav>
  );
}