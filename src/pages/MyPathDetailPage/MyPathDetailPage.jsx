import * as userService from "../../utilities/users-service";
import { useParams, useNavigate, Link } from "react-router-dom";
import ItineraryListItem from "../ItineraryListItem/ItineraryListItem";
import * as mypathsAPI from "../../utilities/mypaths-api";
import { useState } from "react";
import "./MyPathDetailPage.css";

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
      <section class="hero is-success">
        <div class="hero-body">
          <p class="title">{thisPath.title}</p>
          <p class="subtitle">{thisPath.country}</p>
        </div>
      </section>
      <article class="message is-success">
        <div class="message-body">Description: {thisPath.description}</div>
        <div class="message-body">Tags: {thisPath.tags.join(", ")}</div>
        <div class="message-body">Itinerary:</div>
        <div class="message-body">
          <ol class="itin-list">
            {thisPath.itinerary.map((itineraryItem, i) => (
              <ItineraryListItem itineraryItem={itineraryItem} />
            ))}
          </ol>
        </div>
        <div class="message-body">
          Created: {thisPath.createdAt.slice(0, 10)}
        </div>
      </article>
      {/* <h1>{thisPath.title}</h1> */}
      {/* <div>Country: {thisPath.country}</div> */}
      {/* <div>Description: {thisPath.description}</div>
      <div>Tags: {thisPath.tags.join(", ")}</div>
      <div>Itinerary:</div>
      <ol>
        {thisPath.itinerary.map((itineraryItem, i) => (
          <ItineraryListItem itineraryItem={itineraryItem} />
        ))}
      </ol>
      <div>Created: {thisPath.createdAt.slice(0, 10)}</div> */}
      {props.user._id == thisPath.user ? (
        <>
          <Link to={`/${thisPath.title}/edit`}>
            <button class="button is-warning is-light">EDIT</button>
          </Link>
          &nbsp;
          <button
            onClick={(evt) => {
              evt.preventDefault();
              deletePath(thisPath._id);
            }}
            class="button is-danger is-light"
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
