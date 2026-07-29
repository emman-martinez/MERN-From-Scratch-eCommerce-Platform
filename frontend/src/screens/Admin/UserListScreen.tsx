import { isAxiosError } from "axios";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button } from "react-bootstrap";
import { FaTimes, FaTrash, FaEdit, FaCheck } from "react-icons/fa";
import { toast } from "react-toastify";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import { useGetUsers } from "../../hooks/users/useGetUsers";
import { useDeleteUser } from "../../hooks/users/useDeleteUser";

const UserListScreen = () => {
  const { data: users, isLoading, error, refetch } = useGetUsers();
  const { deleteUser, isLoading: loadingDelete } = useDeleteUser();

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      await deleteUser(id, {
        onSuccess: () => {
          toast.success("User deleted successfully");
          refetch();
        },
        onError: (error) => {
          const message = isAxiosError<{ message?: string }>(error)
            ? error.response?.data.message
            : undefined;
          toast.error(message || "Error deleting user");
        },
      });
    }
  };

  return (
    <>
      <h1>Users</h1>
      {loadingDelete && <Loader />}

      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error.message}</Message>
      ) : (
        <Table striped hover responsive className="table-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>EMAIL</th>
              <th>ADMIN</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users?.map((user) => (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.name}</td>
                <td>
                  <a href={`mailto:${user.email}`}>{user.email}</a>
                </td>
                <td>
                  {user.isAdmin ? (
                    <FaCheck style={{ color: "green" }} />
                  ) : (
                    <FaTimes style={{ color: "red" }} />
                  )}
                </td>
                <td>
                  <LinkContainer to={`/admin/user/${user._id}/edit`}>
                    <Button variant="light" className="btn-sm">
                      <FaEdit />
                    </Button>
                  </LinkContainer>
                  <Button
                    variant="danger"
                    className="btn-sm"
                    onClick={() => handleDelete(user._id as string)}
                  >
                    <FaTrash
                      style={{
                        color: "white",
                      }}
                    />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default UserListScreen;
