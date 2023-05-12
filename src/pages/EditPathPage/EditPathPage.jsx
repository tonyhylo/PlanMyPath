import { useEffect, useState, useRef } from "react";
import * as userService from "../../utilities/users-service";
import { useParams, useNavigate } from "react-router-dom";
import * as mypathsAPI from "../../utilities/mypaths-api";
import TagsListItem from "../TagsListItem/TagsListItem";
import ItineraryListItem from "../ItineraryListItem/ItineraryListItem";

export default function EditPathPage(props) {
  const { pathName } = useParams();
  const [path, setPath] = useState({});
  const [newTags, setNewTags] = useState([]);
  const [newItinerary, setNewItinerary] = useState([]);

  const [error, setError] = useState("");
  const inputRef = useRef(null);
  const inputRef2 = useRef(null);
  const navigate = useNavigate();

  // useEffect(() => {
  //   props.setMyPaths([...props.setMyPaths, editPath]);
  // }, [props.myPaths]);

  useEffect(() => {
    let thisPath = props.myPaths.find((path) => path.title === pathName);
    setPath(thisPath);
    setNewTags(thisPath.tags);
    setNewItinerary(thisPath.itinerary);
  }, []);

  async function handleSubmit(evt) {
    evt.preventDefault();
    try {
      const editPath = await mypathsAPI.edit(path);
      console.log(`editPath: ${JSON.stringify(editPath)}`);
      const paths = await mypathsAPI.getAll();
      props.setMyPaths(paths);
      console.log("before nav");
      navigate("/");
      console.log("after nav");
    } catch {
      setError("Path Update Failed - Try Again");
    }
  }

  function handleChange(evt) {
    setPath({ ...path, [evt.target.name]: evt.target.value });
    setError("");
  }

  function handleTag(evt) {
    evt.preventDefault();
    setNewTags([...newTags, inputRef.current.value]);
    inputRef.current.value = "";
  }

  function handleItinerary(evt) {
    evt.preventDefault();
    setNewItinerary([...newItinerary, inputRef2.current.value]);
    inputRef2.current.value = "";
  }

  function handleTagChange(evt, second) {
    setError("");
  }

  function handleItineraryChange(evt, second) {
    setError("");
  }

  return (
    <>
      <h1>Edit Page</h1>
      <h2>{path.title}</h2>
      <form onSubmit={handleSubmit}>
        <label>Title</label>
        <input
          name="title"
          value={path.title}
          onChange={handleChange}
          type="text"
        />
        <label>Country</label>
        <input
          name="country"
          value={path.country}
          onChange={handleChange}
          type="text"
        />
        <label>Description</label>
        <input
          name="description"
          value={path.description}
          onChange={handleChange}
          type="text"
        />
        <label>Tags </label>
        {newTags.length >= 5 ? (
          <>
            <ul>
              {newTags.map((tagsItem, i) => (
                <>
                  <TagsListItem tagsItem={tagsItem} />
                  <button
                    type="button"
                    onClick={(evt) => {
                      evt.preventDefault();
                      const tempTags = [...newTags];
                      tempTags.splice(i, 1);
                      setNewTags(tempTags);
                    }}
                  >
                    <strong>X</strong>
                  </button>
                </>
              ))}
            </ul>
            <p>MAX 5 TAGS</p>
          </>
        ) : (
          <>
            <ul>
              {newTags.map((tagsItem, i) => (
                <>
                  <TagsListItem tagsItem={tagsItem} />
                  <button
                    type="button"
                    onClick={(evt) => {
                      evt.preventDefault();
                      const tempTags = [...newTags];
                      tempTags.splice(i, 1);
                      setNewTags(tempTags);
                    }}
                  >
                    <strong>X</strong>
                  </button>
                </>
              ))}
            </ul>
            <input
              name="tags"
              ref={inputRef}
              onChange={handleTagChange}
              type="text"
            />
            <div>
              <button type="button" onClick={handleTag}>
                <strong>ADD TAG</strong>
              </button>
            </div>
          </>
        )}
        <label>Itinerary</label>
        <>
          <ol>
            {newItinerary.map((itineraryItem, i) => (
              <>
                <ItineraryListItem itineraryItem={itineraryItem} />
                <button
                  type="button"
                  onClick={(evt) => {
                    evt.preventDefault();
                    const tempItin = [...newItinerary];
                    tempItin.splice(i, 1);
                    setNewItinerary(tempItin);
                  }}
                >
                  <strong>X</strong>
                </button>
              </>
            ))}
          </ol>
          <input
            name="itinerary"
            ref={inputRef2}
            onChange={handleItineraryChange}
            type="text"
          />
        </>
        <div>
          <button type="submit">
            <strong>SAVE EDIT</strong>
          </button>
        </div>
      </form>
    </>
  );
}
