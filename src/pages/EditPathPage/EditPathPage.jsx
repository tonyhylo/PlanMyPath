import { useEffect, useState } from "react";
import * as userService from "../../utilities/users-service";
import { useParams, useNavigate } from "react-router-dom";
import * as mypathsAPI from "../../utilities/mypaths-api";

export default function EditPathPage(props) {
  const { pathName } = useParams();
  const [path, setPath] = useState({});
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // useEffect(() => {
  //   props.setMyPaths([...props.setMyPaths, editPath]);
  // }, [props.myPaths]);

  useEffect(() => {
    let thisPath = props.myPaths.find((path) => path.title === pathName);
    setPath(thisPath);
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
        <div>
          <button type="submit">
            <strong>SAVE EDIT</strong>
          </button>
        </div>
      </form>
    </>
  );
}
