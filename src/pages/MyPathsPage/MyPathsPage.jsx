import * as userService from "../../utilities/users-service";
import { Link } from "react-router-dom";
// import * as mypathsAPI from "../../utilities/mypaths-api";
import ItineraryCard from "../ItineraryCard/ItineraryCard";

import { useState, useEffect } from "react";

export default function MyPathsPage(props) {
  // const [itinerary, setItinerary] = useState([]);

  // useEffect(function () {
  //   async function getItems() {
  //     const mypaths = await mypathsAPI.getAll();
  //     setItinerary(mypaths);
  //   }
  //   getItems();
  // }, []);

  return (
    <>
      <h1>MyPathsPage</h1>
      <div>
        <Link to="/createnewpath">CREATE NEW PATH</Link>
      </div>
      <div>
        {props.myPaths.map((path, i) =>
          props.user._id == path.user ? (
            <ItineraryCard
              country={path.country}
              tags={path.tags}
              description={path.description}
              title={path.title}
              user={path.user}
            />
          ) : (
            ""
          )
        )}
      </div>
    </>
  );
}
