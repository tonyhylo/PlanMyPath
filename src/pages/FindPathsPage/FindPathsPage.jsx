import * as userService from "../../utilities/users-service";
import { useState, useRef, useEffect } from "react";
import TagsListItem from "../TagsListItem/TagsListItem";

export default function FindPathsPage(props) {
  const [allPaths, setAllPaths] = useState([]);
  const [allTags, setAllTags] = useState([]);

  useEffect(() => {
    const paths = props.myPaths;
    // console.log(paths);
    setAllPaths(paths);
  }, []);

  // useEffect(() => {
  //   const tempTags = [];
  //   allPaths.map((keys, i) => {
  //     keys.tags.map((tag, t) => {
  //       tempTags.push(tag);
  //     })
  //   });
  //   setAllTags(tempTags);
  // }, [allPaths]);

  useEffect(() => {
    const tempTags = [];
    allPaths.map((keys, i) => {
      keys.tags.map((tag, t) => {
        let tagExists = 0;
        for (let t = 0; t < tempTags.length; t++) {
          if (tempTags[t] == tag) {
            tagExists = tagExists + 1;
          }
        }
        if (!tagExists) {
          tempTags.push(tag);
        }
      })
    });
    setAllTags(tempTags);
  }, [allPaths]);

  return (
    <>
      <h1>FindPathsPage</h1>
      <ul>
        {allTags.map((tag1, i) => {
          return <TagsListItem tagsItem={tag1} title="title6" />
        })}

      </ul>
    </>
  );
}
