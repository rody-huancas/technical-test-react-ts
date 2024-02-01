import "./App.css";
import { useEffect, useState } from "react";
import { type User } from "./types.d";
import { UsersLists } from "./components/UsersLists";

function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [showColors, setShowColors] = useState(false);
  const [sortByCountry, setSortByCountry] = useState(false);

  const toggleColors = () => {
    setShowColors(!showColors);
  };

  const toggleSortByCountry = () => setSortByCountry((prevState) => !prevState);

  useEffect(() => {
    fetch("https://randomuser.me/api?results=100")
      .then((res) => res.json())
      .then((res) => setUsers(res.results))
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const sortedUsers = sortByCountry
    ? users.toSorted((a, b) => {
        return a.location.country.localeCompare(b.location.country);
      })
    : users;

  return (
    <div className="App">
      <h1>Users List</h1>
      <header>
        <button onClick={toggleColors}>Colorear filas</button>
        <button onClick={toggleSortByCountry}>
          {sortByCountry ? "No ordenar por país" : "Ordenar por país"}
        </button>
      </header>
      <main>
        <UsersLists showColors={showColors} users={sortedUsers} />
      </main>
    </div>
  );
}

export default App;
