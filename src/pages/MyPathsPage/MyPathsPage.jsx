import * as userService from "../../utilities/users-service";
import { Link, useNavigate } from "react-router-dom";
import * as mypathsAPI from "../../utilities/mypaths-api";
import ItineraryCard from "../ItineraryCard/ItineraryCard";

import { useState, useEffect } from "react";

export default function MyPathsPage(props) {
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
      <h1>MyPathsPage</h1>
      <div>
        <Link to="/createnewpath">CREATE NEW PATH</Link>
      </div>
      <div>
        {props.myPaths.map((path, i) =>
          props.user._id == path.user ? (
            <>
              <ItineraryCard
                country={path.country}
                tags={path.tags}
                description={path.description}
                title={path.title}
                user={path.user}
              />
              <button
                onClick={(evt) => {
                  evt.preventDefault();
                  deletePath(path._id);
                }}
              >
                X
              </button>
            </>
          ) : (
            ""
          )
        )}
      </div>
    </>
  );
}
