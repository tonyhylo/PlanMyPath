import * as userService from "../../utilities/users-service";
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import * as mypathsAPI from "../../utilities/mypaths-api";
import TagsListItem from "../TagsListItem/TagsListItem";

export default function CreateNewPathPage(props) {
  const [newPath, setNewPath] = useState({
    title: "title",
    country: "country",
    description: "description",
    tags: ["tag1"],
    itinerary: ["itinerary"],
    user: props.user,
  });

  const [newTags, setNewTags] = useState([]);

  const [error, setError] = useState("");
  const inputRef = useRef(null);

  const navigate = useNavigate();

  function handleChange(evt) {
    setNewPath({ ...newPath, [evt.target.name]: evt.target.value });
    setError("");
  }

  async function handleSubmit(evt) {
    // Prevent form from being submitted to the server
    evt.preventDefault();
    try {
      // The promise returned by the signUp service method
      // will resolve to the user object included in the
      // payload of the JSON Web Token (JWT)
      const path = await mypathsAPI.create(newPath);
      // setNewPath({ ...newPath, [evt.target.name]: evt.target.value });
      props.setMyPaths([...props.myPaths, path]);
      navigate(`/${path.title}`);
    } catch {
      setError("Path Save Failed - Try Again");
    }
  }

  function handleTag(evt) {
    console.log("entered handleTag");
    evt.preventDefault();
    console.log(1, evt)
    setNewTags([ ...newTags, inputRef.current.value]);
    console.log("tag? ", inputRef.current.value);
    console.log(newPath);
  }

  function handleTagChange(evt, second) {
    // setNewTags([ ...newTags, "test"]);
    setError("");
  }

  return (
    <>
      <h1>CreateNewPathPage</h1>
      <form onSubmit={handleSubmit}>
        <label>Title</label>
        <input
          name="title"
          value={newPath.title}
          onChange={handleChange}
          type="text"
        />
        <label>Country</label>
        <input
          name="country"
          value={newPath.country}
          onChange={handleChange}
          type="text"
        />
        <label>Description</label>
        <input
          name="description"
          value={newPath.description}
          onChange={handleChange}
          type="text"
        />
        {/* <form onSubmit={handleTag}> */}
          <label>Tags </label>
          {newTags.length >= 5 ? (
            <ul>
              {newTags.map((tagsItem, i) => (
                <TagsListItem tagsItem={tagsItem} />
              ))}
            </ul>
          ) : (
            <>
              {/* <ul>
                <li>{newPath.tags}</li>
              </ul> */}
              <ul>
                {newTags.map((tagsItem, i) => (
                  <TagsListItem tagsItem={tagsItem} />
                ))}
              </ul>
              <input
                name="tags"
                ref={inputRef}
                onChange={handleTagChange}
                // value={newTags}
                type="text"
              />
            </>
          )}
          <div>
            <button type="button" onClick={handleTag}>
              <strong>ADD TAG</strong>
            </button>
          </div>
        {/* </form> */}
        <div>
          <button type="submit">
            <strong>ADD PATH</strong>
          </button>
        </div>
      </form>
    </>
  );
}
