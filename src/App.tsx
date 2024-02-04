import "./App.css";
import { useMemo, useState } from "react";
import { SortBy, type User } from "./types.d";
import { UsersLists } from "./components/UsersLists";
import { useUsers } from "./hooks/useUsers";

function App() {
  const { isLoading, isError, users, refetch, fetchNextPage, hasNextPage } =
    useUsers();

  const [showColors, setShowColors] = useState(false);
  const [sorting, setSorting] = useState<SortBy>(SortBy.NONE);
  const [filterCountry, setFilterCountry] = useState<string | null>(null);

  const [currentPage, setCurrentPage] = useState(1);

  const toggleColors = () => {
    setShowColors(!showColors);
  };

  const toggleSortByCountry = () => {
    const newSortingValue =
      sorting === SortBy.NONE ? SortBy.COUNTRY : SortBy.NONE;
    setSorting(newSortingValue);
  };

  const handleReset = () => {
    void refetch();
  };

  const handleDelete = (email: string) => {
    // const filteredUsers = users.filter((user) => user.email !== email);
    // setUsers(filteredUsers);
  };

  const handleChageSort = (sort: SortBy) => {
    setSorting(sort);
  };

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

        {isLoading && <strong>Cargando...</strong>}
        {!isLoading && isError && <p>Ha habido un error</p>}
        {!isLoading && !isError && users.length === 0 && <p>No hay usuarios</p>}

        {!isLoading && !isError && hasNextPage == true && (
          <button
            onClick={() => {
              void fetchNextPage();
            }}
          >
            Cargar más resultados...
          </button>
        )}

        {!isLoading && !isError && hasNextPage === false && (
          <p>Ya no hay más resultados</p>
        )}
      </main>
    </div>
  );
}

export default App;
