import type { User } from "../../../../types/users";
import { useState, type SubmitEvent } from "react";
import { isAxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import Loader from "../../../../components/Loader";
import { useUpdateUserMutation } from "../../../../hooks/users/useUpdateUser";

type UserEditFormProps = {
  user: User;
  userId?: string;
};

const UserEditForm = ({ user, userId }: UserEditFormProps) => {
  const { Check, Group, Label, Control } = Form;
  const navigate = useNavigate();
  const { updateUser, isLoading: loadingUpdate } = useUpdateUserMutation();
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [isAdmin, setIsAdmin] = useState(user.isAdmin);

  const handleSubmit = async (e: SubmitEvent) => {
    e.preventDefault();

    const payload = {
      _id: userId,
      name,
      email,
      isAdmin,
    } as User;

    await updateUser(
      { userId: userId!, data: payload },
      {
        onSuccess: () => {
          toast.success("User updated successfully");
          navigate("/admin/userList");
        },
        onError: (error) => {
          const message = isAxiosError<{ message?: string }>(error)
            ? error.response?.data.message
            : undefined;
          toast.error(message || "Error updating product");
        },
      },
    );
  };

  return (
    <>
      {loadingUpdate && <Loader />}

      <Form onSubmit={handleSubmit}>
        <Group controlId="name" className="my-2">
          <Label>Name</Label>
          <Control
            type="text"
            placeholder="Enter name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Group>

        <Group controlId="email" className="my-2">
          <Label>Email</Label>
          <Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Group>

        <Group controlId="isAdmin" className="my-2">
          <Check
            type="checkbox"
            label="Is Admin"
            checked={isAdmin}
            onChange={(e) => setIsAdmin(e.target.checked)}
          />
        </Group>

        <Button type="submit" variant="primary" className="my-2">
          Update
        </Button>
      </Form>
    </>
  );
};

export default UserEditForm;
