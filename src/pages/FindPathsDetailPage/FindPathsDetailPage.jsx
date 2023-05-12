import { useEffect } from 'react';
import * as userService from '../../utilities/users-service'
import { useParams, useNavigate } from "react-router-dom";

export default function FindPathsDetailPage(props) {
  const { findPathName } = useParams();
  // let thesePaths = props.myPaths.find((path) => path.title === findPathName);
  let thesePaths = props.myPaths.map((path) => {
    path.tags.find((tag) => {
      return tag === findPathName;
    })
  })

  useEffect(() => {
    // props.myPaths.map((path, t) => {
    //   path.tags.map((tag, n) => {
    //     console.log(tag);
    //   })
    // })
    console.log(1, thesePaths);
  }, [])


  return (
    <>
      <h1>FindPathsDetailPage</h1>
    </>
  );
}