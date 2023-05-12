import * as userService from "../../utilities/users-service";
import { useState, useRef, useEffect } from "react";
import TagsListItem from "../TagsListItem/TagsListItem";
import "./FindPathsPage.css";

export default function FindPathsPage(props) {
  const [allPaths, setAllPaths] = useState([]);
  const [allTags, setAllTags] = useState([]);
  const [allCountries, setAllCountries] = useState([]);

  useEffect(() => {
    const paths = props.myPaths;
    setAllPaths(paths);
  }, []);

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
      });
    });
    setAllTags(tempTags);
  }, [allPaths]);

  useEffect(() => {
    const tempCountries = [];
    allPaths.map((keys, i) => {
      let countryExists = 0;
      for (let t = 0; t < tempCountries.length; t++) {
        if (tempCountries[t] == keys.country) {
          countryExists = countryExists + 1;
        }
      }
      if (!countryExists) {
        tempCountries.push(keys.country);
      }
    });
    setAllCountries(tempCountries);
  }, [allPaths]);

  return (
    <>
      <h1 class="title is-1 has-text-centered" id="h1-title">Find Paths</h1>

      <article class="message is-success">
        <div class="message-header">
          <p>By Tag:</p>
        </div>
        <div class="message-body content">
          <ul>
            {allTags.map((tag1, i) => {
              return (
                <TagsListItem tagsItem={tag1} title="title6" isTag={true} />
              );
            })}
          </ul>
        </div>
      </article>
      <br />
      <article class="message is-success">
        <div class="message-header">
          <p>By Country:</p>
        </div>
        <div class="message-body content">
      <ul>
        {allCountries.map((tag1, i) => {
          return <TagsListItem tagsItem={tag1} title="title6" isTag={false} />;
        })}
      </ul>
        </div>
      </article>
{/* 
      <div>By Tag:</div>
      <ul>
        {allTags.map((tag1, i) => {
          return <TagsListItem tagsItem={tag1} title="title6" isTag={true} />;
        })}
      </ul>
      <div>By Country:</div>
      <ul>
        {allCountries.map((tag1, i) => {
          return <TagsListItem tagsItem={tag1} title="title6" isTag={false} />;
        })}
      </ul> */}
    </>
  );
}
