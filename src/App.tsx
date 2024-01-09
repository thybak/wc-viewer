
import { useEffect, useState } from 'react';
import mondongo from "./assets/mondongo.jpg";
import './App.css'
import UserSummary from './component/UserSummary';

function App() {
  const [username, setUsername] = useState("");

  useEffect(() => {
    function getUsernameFromUrl(): string {
      return document.location.search?.split("=")[1] || "";
    }

    setUsername(getUsernameFromUrl());
  }, [username]);

  return (
    <>
      <img src={mondongo} alt="Mondongo" style={{ width: '10em', height: 'auto' }} />
      <UserSummary username={username}></UserSummary>
    </>
  )
}

export default App
