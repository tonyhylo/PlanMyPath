import { useEffect, useState } from "react";
import * as userService from "../../utilities/users-service";
import { useParams, useNavigate } from "react-router-dom";
import * as mypathsAPI from "../../utilities/mypaths-api";

export default function EditPathPage(props) {
  const { pathName } = useParams();
  const [path, setPath] = useState({});
  const [error, setError] = useState("");
  const navigate = useNavigate();
  let editPath;

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
      editPath = await mypathsAPI.edit(path);
      console.log(`editPath: ${JSON.stringify(editPath)}`);
      // props.setMyPaths(
      //   props.myPaths.filter((deletedPath) => {
      //     return path._id != deletedPath._id;
      //   })
      // );
      const paths = await mypathsAPI.getAll();
      props.setMyPaths(paths);
      // props.setMyPaths([...props.myPaths, editPath]);
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
            <strong>EDIT PATH</strong>
          </button>
        </div>
      </form>
    </>
  );
}
