import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import { getUser } from "../../utilities/users-service";
import AuthPage from "../AuthPage/AuthPage";
import NavBar from "../../components/NavBar/NavBar";
import MyPathsPage from "../MyPathsPage/MyPathsPage";
import FindPathsPage from "../FindPathsPage/FindPathsPage";
import ProfilePage from "../ProfilePage/ProfilePage";
import MyPathDetailPage from "../MyPathDetailPage/MyPathDetailPage"
import * as mypathsAPI from "../../utilities/mypaths-api";
import CreateNewPathPage from "../CreateNewPathPage/CreateNewPathPage"
import EditPathPage from "../EditPathPage/EditPathPage";
import FindPathsDetailPage from "../FindPathsDetailPage/FindPathsDetailPage";

export default function App() {

  const [user, setUser] = useState(getUser());
  const [myPaths, setMyPaths] = useState([]);

  useEffect(function () {
    async function getPaths() {
      const paths = await mypathsAPI.getAll();
      setMyPaths(paths);
    }
    getPaths();
  }, []);

  // useEffect(function () {
  //   async function getPaths() {
  //     const paths = await mypathsAPI.getAll();
  //     setMyPaths(paths);
  //   }
  //   getPaths();
  // }, [myPaths]);

  return (
    <main className="App">
      {user ? (
        <>
          <NavBar user={user} setUser={setUser} />
          <Routes>
            <Route path="/" element={<MyPathsPage myPaths={myPaths} setMyPaths={setMyPaths} user={user} />} />
            <Route path="/findpaths" element={<FindPathsPage myPaths={myPaths} />} />
            <Route path="/profile" element={<ProfilePage user={user} />} />
            <Route path="/:pathName/edit" element={<EditPathPage user={user} myPaths={myPaths} setMyPaths={setMyPaths} />} />
            <Route
              path="/:pathName"
              element={<MyPathDetailPage myPaths={myPaths} />}
            />
            <Route
              path="/find/:findPathName"
              element={<FindPathsDetailPage myPaths={myPaths} />}
            />
            <Route path="/createnewpath" element={<CreateNewPathPage myPaths={myPaths} setMyPaths={setMyPaths} user={user} />} />
          </Routes>
        </>
      ) : (
        <AuthPage setUser={setUser} />
      )}
    </main>
  );
}
