import * as userService from "../../utilities/users-service";
import { useParams, useNavigate, Link } from "react-router-dom";
import ItineraryListItem from "../ItineraryListItem/ItineraryListItem";
import * as mypathsAPI from "../../utilities/mypaths-api";
import { useState } from "react";

export default function MyPathDetailPage(props) {
  const { pathName } = useParams();
  const [error, setError] = useState("");

  let thisPath = props.myPaths.find((path) => path.title === pathName);

  const navigate = useNavigate();

  async function getPaths() {
    const paths = await mypathsAPI.getAll();
    props.setMyPaths(paths);
  }

  async function deletePath(deletedPath) {
    try {
      console.log("trying to delete");
      const path = await mypathsAPI.deletePath(deletedPath);
      if (path.message == "ok") {
        props.setMyPaths(
          props.myPaths.filter((id) => {
            return id._id != deletedPath._id;
          })
        );
      }
      getPaths();
      navigate(`/`);
    } catch {
      setError("Path Save Failed - Try Again");
    }
  }

  function edit() {
    navigate(`/${thisPath.title}/edit`);
  }

  return (
    <>
      <h1>{thisPath.title}</h1>
      {/* <div>thisItinerary: {JSON.stringify(thisItinerary)}</div> */}
      <div>Country: {thisPath.country}</div>
      {/* {!thisPath.state.editing ? (
              <span>Country: {thisPath.country}</span>
            ) : (
              <input
                type="text"
                defaultValue={thisPath.country}
              />
            )} */}
      <div>Description: {thisPath.description}</div>
      <div>Tags: {thisPath.tags.join(", ")}</div>
      <div>Itinerary:</div>
      <ol>
        {thisPath.itinerary.map((itineraryItem, i) => (
          <ItineraryListItem itineraryItem={itineraryItem} />
        ))}
      </ol>
      <div>Created: {thisPath.createdAt.slice(0, 10)}</div>
      {/* <div>props.user._id: {props.user._id}</div> */}
      {props.user._id == thisPath.user ? (
        <>
          <Link to={`/${thisPath.title}/edit`}>EDIT</Link>
          <button
            onClick={(evt) => {
              evt.preventDefault();
              deletePath(thisPath._id);
            }} 
          >
            X
          </button>
        </>
      ) : (
        ""
      )}
    </>
  );
}
