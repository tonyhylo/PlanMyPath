import * as userService from "../../utilities/users-service";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import * as mypathsAPI from "../../utilities/mypaths-api";
import "./ItineraryCard.css";

export default function ItineraryCard(props) {
  const thisDateTime = props.createdAt.slice(0, 10);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  async function getPaths() {
    const paths = await mypathsAPI.getAll();
    props.setMyPaths(paths);
  }

  async function deletePath(deletedPath) {
    try {
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

  return (
    <>
      <div class="tile is-11 is-vertical is-parent" >
        {/* <div class="tile is-3 is-vertical is-parent">
        <div> class="tile is-child"> */}
        <Link to={`/${props.title}`}>
          <div class="card">
            <div class="card-content">
              <div class="media">
                <div class="media-content">
                  <p class="title is-4">{props.title}</p>
                  <p class="subtitle is-8">{props.country}</p>
                  <p class="subtitle is-6">{props.tags.join(", ")}</p>
                </div>
              </div>
              <div class="content">
                {props.description}
                <br />
                <time>{props.createdAt.slice(0, 10)}</time>
              </div>
            </div>
            {props.user == props.currentUser._id && props.notFindDetailPage ? (
              <>
                <Link to={`/${props.title}/edit`}>
                  <button class="button is-warning is-light">EDIT</button>
                </Link>
                &nbsp;
                <button
                  onClick={(evt) => {
                    evt.preventDefault();
                    deletePath(props.id);
                  }}
                  class="button is-danger is-light"
                >
                  X
                </button>
              </>
            ) : (
              ""
            )}
          </div>

          {/* <h1>{props.title}</h1> */}
          {/* <div>Country: {props.country}</div> */}
          {/* <div>Description: {props.description}</div> */}
          {/* <div>Tags: {props.tags.join(", ")}</div> */}
        </Link>
        {/* {props.user == props.currentUser._id && props.notFindDetailPage ? (
        <Link to={`/${props.title}/edit`}>EDIT</Link>
      ) : (
        ""
      )} */}
      </div>
    </>
  );
}
