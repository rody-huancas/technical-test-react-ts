import "./App.css";
import { useEffect, useState } from "react";
import { type User } from "./types.d";
import { UsersLists } from "./components/UsersLists";

function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [showColors, setShowColors] = useState(false);

  const toggleColors = () => {
    setShowColors(!showColors);
  };

  useEffect(() => {
    fetch("https://randomuser.me/api?results=100")
      .then((res) => res.json())
      .then((res) => setUsers(res.results))
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="App">
      <h1>Users List</h1>
      <header>
        <button onClick={toggleColors}>Coloring row</button>
      </header>
      <main>
        <UsersLists showColors={showColors} users={users} />
      </main>
    </div>
  );
}

export default App;
