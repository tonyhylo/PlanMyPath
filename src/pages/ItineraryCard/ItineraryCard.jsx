import * as userService from "../../utilities/users-service";
import { Link } from "react-router-dom";
import "./ItineraryCard.css";

export default function ItineraryCard(props) {
  return (
    <>
      <Link to={`/${props.title}`}>
        <h1>{props.title}</h1>
        <div>Country: {props.country}</div>
        <div>Description: {props.description}</div>
        <div>Tags: {props.tags.join(", ")}</div>
      </Link>
      {props.user == props.currentUser._id && props.notFindDetailPage ? (
        <Link to={`/${props.title}/edit`}>EDIT</Link>
      ) : (
        ""
      )}
    </>
  );
}
