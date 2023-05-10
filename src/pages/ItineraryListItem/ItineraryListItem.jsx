import * as userService from '../../utilities/users-service'

export default function ItineraryListItem(props) {

  return (
    <li>
      {props.itineraryItem}
    </li>
  );
}