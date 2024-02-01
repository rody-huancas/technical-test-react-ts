import { type User } from "../types.d";

interface Props {
  users: User[];
}

export const UsersLists = ({ users }: Props) => {
  return (
    <>
      <table>
        <thead>
          <tr>
            <th>Foto</th>
            <th>Nombre</th>
            <th>Apellidos</th>
            <th>País</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id.value}>
              <td>
                <img src={user.picture.thumbnail} />
              </td>
              <td>{user.name.first}</td>
              <td>{user.name.last}</td>
              <td>{user.location.country}</td>
              <td>
                <button>Borrar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};
