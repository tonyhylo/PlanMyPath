import * as userService from '../../utilities/users-service'
import "./ItineraryListItem.css";

export default function ItineraryListItem(props) {

  return (
    <li>
      {props.itineraryItem}
    </li>
  );
}