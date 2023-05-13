import { useEffect, useState, useRef } from "react";
import * as userService from "../../utilities/users-service";
import { useParams, useNavigate } from "react-router-dom";
import * as mypathsAPI from "../../utilities/mypaths-api";
import TagsListItem from "../TagsListItem/TagsListItem";
import ItineraryListItem from "../ItineraryListItem/ItineraryListItem";
import "./EditPathPage.css";

export default function EditPathPage(props) {
  const { pathName } = useParams();
  const [path, setPath] = useState({});
  const [newTags, setNewTags] = useState([]);
  const [newItinerary, setNewItinerary] = useState([]);

  const [error, setError] = useState("");
  const inputRef = useRef(null);
  const inputRef2 = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    setPath({ ...path, tags: newTags });
  }, [newTags]);

  useEffect(() => {
    setPath({ ...path, itinerary: newItinerary });
  }, [newItinerary]);

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
      <h1 class="title is-1 has-text-centered" id="title-h1">Edit Page</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <div class="field">
            <label class="label">Title</label>
            <div class="control">
              <input
                class="input"
                name="title"
                value={path.title}
                onChange={handleChange}
                type="text"
              />
            </div>
          </div>

          <div class="field">
            <label class="label">Country</label>
            <div class="control">
              <input
                class="input"
                name="country"
                value={path.country}
                onChange={handleChange}
                type="text"
              />
            </div>
          </div>

          <div class="field">
            <label class="label">Description</label>
            <div class="control">
              <input
                class="input"
                name="description"
                value={path.description}
                onChange={handleChange}
                type="text"
              />
            </div>
          </div>

          <div class="field">
            <label class="label">Tags</label>
            <div class="control is-grouped content">
              {newTags.length >= 5 ? (
                <>
                  <ul>
                    {newTags.map((tagsItem, i) => (
                      <>
                        <div class="inline-tags">
                          <TagsListItem tagsItem={tagsItem} />
                          <button
                            type="button"
                            onClick={(evt) => {
                              evt.preventDefault();
                              const tempTags = [...newTags];
                              tempTags.splice(i, 1);
                              setNewTags(tempTags);
                            }}
                            class="button is-danger is-small"
                            id="del-tag"
                          >
                            <strong>X</strong>
                          </button>
                        </div>
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
                        <div class="inline-tags">
                          <TagsListItem tagsItem={tagsItem} />
                          <button
                            type="button"
                            onClick={(evt) => {
                              evt.preventDefault();
                              const tempTags = [...newTags];
                              tempTags.splice(i, 1);
                              setNewTags(tempTags);
                            }}
                            class="button is-danger is-small"
                            id="del-tag"
                          >
                            <strong>X</strong>
                          </button>
                        </div>
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
                    <button
                      class="button is-info"
                      type="button"
                      onClick={handleTag}
                    >
                      <strong>ADD TAG</strong>
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>

          <div class="field">
            <label class="label">Itinerary</label>
            <div class="control content">
              <>
                <ol>
                  {newItinerary.map((itineraryItem, i) => (
                    <>
                      <div class="inline-tags">
                        <ItineraryListItem itineraryItem={itineraryItem} />
                        <button
                          type="button"
                          class="button is-danger is-small"
                          id="del-itin"
                          onClick={(evt) => {
                            evt.preventDefault();
                            const tempItin = [...newItinerary];
                            tempItin.splice(i, 1);
                            setNewItinerary(tempItin);
                          }}
                        >
                          <strong>X</strong>
                        </button>
                      </div>
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
                  <button
                    class="button is-info"
                    type="button"
                    onClick={handleItinerary}
                  >
                    <strong>ADD ITINERARY ITEM</strong>
                  </button>
                </div>
              </>
            </div>
          </div>

          <div class="field is-grouped">
            <div class="control">
              <button class="button is-link" type="submit">
                SAVE EDITS
              </button>
            </div>
          </div>
        </div>
      </form>







      {/* <form onSubmit={handleSubmit}>
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
      </form> */}
    </>
  );
}
