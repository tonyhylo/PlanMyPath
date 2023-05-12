import { useEffect, useState } from "react";
import * as userService from "../../utilities/users-service";
import { useParams, useNavigate } from "react-router-dom";
import ItineraryCard from "../ItineraryCard/ItineraryCard";

export default function FindPathsDetailPage(props) {
  const { findPathName } = useParams();
  const [foundPaths, setFoundPaths] = useState([]);
  // let thesePaths = props.myPaths.find((path) => path.title === findPathName);
  // let thesePaths = props.myPaths.map((path) => {
  //   path.tags.find((tag) => {
  //     return tag === findPathName;
  //   })
  // })

  useEffect(() => {
    let tempFoundPaths = [];
    for (let t = 0; t < props.myPaths.length; t++) {
      // console.log(props.myPaths[t].tags);
      props.myPaths[t].tags.forEach((tag) => {
        if (findPathName == tag) {
          tempFoundPaths.push(props.myPaths[t]);
        }
        return null;
      });
    }
    if (tempFoundPaths.length < 1) {
      console.log("doing country");
      props.myPaths.forEach((path) => {
        if (findPathName == path.country) {
          tempFoundPaths.push(path);
        }
        return null;
      });
    }
    setFoundPaths(tempFoundPaths);
  }, []);

  return (
    <>
      <h1>FindPathsDetailPage</h1>
      {foundPaths.map((path, i) => (
        <>
          <ItineraryCard
            country={path.country}
            tags={path.tags}
            description={path.description}
            title={path.title}
            user={path.user}
            currentUser={props.user}
          />
        </>
      ))}
    </>
  );
}
