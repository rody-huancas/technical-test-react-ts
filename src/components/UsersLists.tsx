import { type User } from "../types.d";

interface Props {
  deleteUser: (email: string) => void;
  showColors: boolean;
  users: User[];
}

export const UsersLists = ({ deleteUser, showColors, users }: Props) => {
  return (
    <>
      <table width={"100%"}>
        <thead>
          <tr>
            <th>Foto</th>
            <th>Nombre</th>
            <th>Apellidos</th>
            <th>País</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody className={showColors ? "table--showColors" : ""}>
          {users.map((user) => {
            //   {users.map((user, index) => {
            // const backgroundColor = index % 2 === 0 ? "#333" : "#555";
            // const color = showColors ? backgroundColor : "transparent";
            return (
              <tr key={user.email}>
                <td>
                  <img src={user.picture.thumbnail} />
                </td>
                <td>{user.name.first}</td>
                <td>{user.name.last}</td>
                <td>{user.location.country}</td>
                <td>
                  <button onClick={() => deleteUser(user.email)}>Borrar</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};
