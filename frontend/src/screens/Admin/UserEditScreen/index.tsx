import UserEditForm from "./UserEditForm";
import { Link, useParams } from "react-router-dom";
import FormContainer from "../../../components/FormContainer";
import Message from "../../../components/Message";
import Loader from "../../../components/Loader";
import { useGetUserById } from "../../../hooks/users/useGetUserById";

const UserEditScreen = () => {
  const { id: userId } = useParams();
  const { data: user, isPending, error } = useGetUserById(userId!);

  return (
    <>
      <Link to="/admin/userlist" className="btn btn-light my-3">
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit User</h1>
        {isPending ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error.message}</Message>
        ) : (
          user && <UserEditForm key={user._id} user={user} userId={userId} />
        )}
      </FormContainer>
    </>
  );
};

export default UserEditScreen;
