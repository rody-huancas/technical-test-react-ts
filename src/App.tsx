import "./App.css";
import { useEffect, useMemo, useRef, useState } from "react";
import { SortBy, type User } from "./types.d";
import { UsersLists } from "./components/UsersLists";

function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [showColors, setShowColors] = useState(false);
  const [sorting, setSorting] = useState<SortBy>(SortBy.NONE);
  const [filterCountry, setFilterCountry] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const originalUsers = useRef<User[]>([]);

  const toggleColors = () => {
    setShowColors(!showColors);
  };

  const toggleSortByCountry = () => {
    const newSortingValue =
      sorting === SortBy.NONE ? SortBy.COUNTRY : SortBy.NONE;
    setSorting(newSortingValue);
  };

  const handleReset = () => {
    setUsers(originalUsers.current);
  };

  const handleDelete = (email: string) => {
    const filteredUsers = users.filter((user) => user.email !== email);
    setUsers(filteredUsers);
  };

  const handleChageSort = (sort: SortBy) => {
    setSorting(sort);
  };

  useEffect(() => {
    setLoading(true);
    setError(false);
    fetch(`https://randomuser.me/api?results=10&seed=rody&page=${currentPage}`)
      .then((res) => {
        if (!res.ok) throw new Error("Error en la petición");
        return res.json();
      })
      .then((res) => {
        setUsers((prevUsers) => {
          const newUsers = prevUsers.concat(res.results);
          originalUsers.current = newUsers;
          return newUsers;
        });
        originalUsers.current = res.results;
      })
      .catch((err) => {
        console.log(err);
        setError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [currentPage]);

  const filteredUsers = useMemo(() => {
    return filterCountry !== null && filterCountry.length > 0
      ? users.filter((user) => {
          return user.location.country
            .toLowerCase()
            .includes(filterCountry.toLowerCase());
        })
      : users;
  }, [users, filterCountry]);

  const sortedUsers = useMemo(() => {
    if (sorting === SortBy.NONE) return filteredUsers;

    const compareProperties: Record<string, (user: User) => any> = {
      [SortBy.COUNTRY]: (user) => user.location.country,
      [SortBy.NAME]: (user) => user.name.first,
      [SortBy.LAST]: (user) => user.name.last,
    };

    return filteredUsers.toSorted((a, b) => {
      const extractProperties = compareProperties[sorting];
      return extractProperties(a).localeCompare(extractProperties(b));
    });
  }, [filteredUsers, sorting]);

  return (
    <div className="App">
      <h1>Users List</h1>
      <header>
        <button onClick={toggleColors}>Colorear filas</button>
        <button onClick={toggleSortByCountry}>
          {sorting === SortBy.COUNTRY
            ? "No ordenar por país"
            : "Ordenar por país"}
        </button>
        <button onClick={handleReset}>Resetear</button>

        <input
          type="text"
          placeholder="Filtra por país"
          onChange={(e) => setFilterCountry(e.target.value)}
        />
      </header>
      <main>
        {users.length > 0 && (
          <UsersLists
            handleChageSort={handleChageSort}
            deleteUser={handleDelete}
            showColors={showColors}
            users={sortedUsers}
          />
        )}

        {loading && <strong>Cargando...</strong>}
        {!loading && error && <p>Ha habido un error</p>}
        {!loading && !error && users.length === 0 && <p>No hay usuarios</p>}

        {!loading && !error && (
          <button onClick={() => setCurrentPage(currentPage + 1)}>
            Cargar más resultados...
          </button>
        )}
      </main>
    </div>
  );
}

export default App;
