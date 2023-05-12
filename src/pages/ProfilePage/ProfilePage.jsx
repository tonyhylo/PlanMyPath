import * as userService from '../../utilities/users-service'

export default function ProfilePage(props) {

  return (
    <>
      <h1>ProfilePage</h1>
      <h2>User: {props.user.name}</h2>
    </>
  );
}