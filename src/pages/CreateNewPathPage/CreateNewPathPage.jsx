import * as userService from "../../utilities/users-service";
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as mypathsAPI from "../../utilities/mypaths-api";
import TagsListItem from "../TagsListItem/TagsListItem";
import ItineraryListItem from "../ItineraryListItem/ItineraryListItem"
import "./CreateNewPathPage.css"

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
  const [newItinerary, setNewItinerary] = useState([]);

  const [error, setError] = useState("");
  const inputRef = useRef(null);
  const inputRef2 = useRef(null);

  const navigate = useNavigate();

  useEffect(() => {
    setNewPath({ ...newPath, tags: newTags });
  }, [newTags]);

  useEffect(() => {
    setNewPath({ ...newPath, itinerary: newItinerary });
  }, [newItinerary]);

  function handleChange(evt) {
    setNewPath({ ...newPath, [evt.target.name]: evt.target.value });
    setError("");
  }

  async function handleSubmit(evt) {
    evt.preventDefault();
    try {
      const path = await mypathsAPI.create(newPath);
      props.setMyPaths([...props.myPaths, path]);
      navigate(`/${path.title}`);
    } catch {
      setError("Path Save Failed - Try Again");
    }
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
          <div>
            <button type="button" onClick={handleItinerary}>
              <strong>ADD ITINERARY ITEM</strong>
            </button>
          </div>
        </>
        <div>
          <button type="submit">
            <strong>SAVE NEW PATH</strong>
          </button>
        </div>
      </form>
    </>
  );
}
