import * as userService from "../../utilities/users-service";
import { Link } from "react-router-dom";
import "./TagsListItem.css";


export default function TagsListItem(props) {
  return (
    <>
      <Link to={`/find/${props.tagsItem}`}>
        <li>{props.tagsItem}</li>
      </Link>
    </>
  );
}
