import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import { getUser } from '../../utilities/users-service';
import AuthPage from '../AuthPage/AuthPage';
import NavBar from '../../components/NavBar/NavBar';
import MyPathsPage from '../MyPathsPage/MyPathsPage';
import FindPathsPage from '../FindPathsPage/FindPathsPage';
import ProfilePage from '../ProfilePage/ProfilePage';

export default function App() {
  const [user, setUser] = useState(getUser());
  return (
    <main className="App">
      { user ?
        <>
        <NavBar user={user} setUser={setUser} />
          <Routes>
              <Route path="/" element={<MyPathsPage />} />
              <Route path="/findpaths" element={<FindPathsPage />} />
              <Route path="/profile" element={<ProfilePage />} />
          </Routes>
        </>
        :
        <AuthPage setUser={setUser} />
      }
    </main>
  );
}
