import "./App.css";
import { useEffect, useState } from "react";
import { type User } from "./types.d";
import { UsersLists } from "./components/UsersLists";

function App() {
  const [users, setUsers] = useState<User[]>([]);

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
      <UsersLists users={users} />
    </div>
  );
}

export default App;
