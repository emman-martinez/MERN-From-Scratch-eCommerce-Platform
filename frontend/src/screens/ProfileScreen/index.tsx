import { useState } from "react";
import { isAxiosError } from "axios";
import { toast } from "react-toastify";
import { Table, Form, Button, Row, Col } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { FaTimes } from "react-icons/fa";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import type { Order } from "../../types/orders";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import { useUpdateUserProfile } from "../../hooks/useUpdateUserProfile";
import { useGetMyOrders } from "../../hooks/useGetMyOrders";
import { setCredentials } from "../../store/slices/authSlice";

const ProfileScreen = () => {
  const dispatch = useAppDispatch();
  const { userInfo } = useAppSelector((state) => state.auth);
  const { Control, Group, Label } = Form;
  const [name, setName] = useState(userInfo?.name ?? "");
  const [email, setEmail] = useState(userInfo?.email ?? "");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { updateUserProfile, isLoading: loadingUpdateProfile } = useUpdateUserProfile();
  const { data: orders, isLoading: loadingOrders, error: errorOrders } = useGetMyOrders();

  const submitHandler = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!userInfo?._id) {
      toast.error("You must be signed in to update your profile");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
    } else {
      await updateUserProfile(
        { userId: userInfo._id, data: { name, email, password } },
        {
          onSuccess: (data) => {
            dispatch(setCredentials(data));
            toast.success("Profile updated successfully");
          },
          onError: (error) => {
            const message = isAxiosError<{ message?: string }>(error)
              ? error.response?.data.message
              : undefined;
            toast.error(message || "Error updating profile");
          },
        },
      );
    }
  };

  return (
    <Row>
      <Col md={3}>
        <h2>User Profile</h2>

        <Form onSubmit={submitHandler}>
          <Group controlId="name" className="my-2">
            <Label>Name</Label>
            <Control
              type="text"
              placeholder="Enter name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></Control>
          </Group>

          <Group controlId="email" className="my-2">
            <Label>Email Address</Label>
            <Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></Control>
          </Group>

          <Group controlId="password" className="my-2">
            <Label>Password</Label>
            <Control
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></Control>
          </Group>

          <Group controlId="confirmPassword" className="my-2">
            <Label>Confirm Password</Label>
            <Control
              type="password"
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            ></Control>
          </Group>

          <Button type="submit" variant="primary" className="my-2">
            Update
          </Button>
          {loadingUpdateProfile && <Loader />}
        </Form>
      </Col>
      <Col md={9}>
        <h2>My Orders</h2>

        {loadingOrders ? (
          <Loader />
        ) : errorOrders ? (
          <Message variant="danger">
            {isAxiosError<{ message?: string }>(errorOrders)
              ? errorOrders.response?.data.message || "Error fetching orders"
              : errorOrders.message}
          </Message>
        ) : (
          <Table striped hover responsive className="table-sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>DATE</th>
                <th>TOTAL</th>
                <th>PAID</th>
                <th>DELIVERED</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {orders?.map((order: Order) => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{(order.createdAt as string)?.substring(0, 10)}</td>
                  <td>{order.totalPrice.toFixed(2)}</td>
                  <td>
                    {order.isPaid ? (
                      (order.paidAt as string)?.substring(0, 10)
                    ) : (
                      <FaTimes color="red" />
                    )}
                  </td>
                  <td>
                    {order.isDelivered ? (
                      (order.deliveredAt as string)?.substring(0, 10)
                    ) : (
                      <FaTimes color="red" />
                    )}
                  </td>
                  <td>
                    <LinkContainer to={`/order/${order._id}`}>
                      <Button variant="light" className="btn-sm">
                        Details
                      </Button>
                    </LinkContainer>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Col>
    </Row>
  );
};

export default ProfileScreen;
