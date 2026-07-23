import { useEffect } from "react";
import { isAxiosError } from "axios";
import { Link, useParams } from "react-router-dom";
import { Row, Col, ListGroup, Image, Card, Button } from "react-bootstrap";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import type { CreateOrderActions, OnApproveActions, OnApproveData } from "@paypal/paypal-js";
import { toast } from "react-toastify";
import { useAppSelector } from "../../store/hooks";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import { useGetOrderById } from "../../hooks/useGetOrderById";
import { useGetPayPalClientId } from "../../hooks/useGetPayPalClientId";
import { usePayOrder } from "../../hooks/usePayOrder";
import { useDeliverOrderMutation } from "../../hooks/useDeliverOrder";

const OrderScreen = () => {
  const { Item } = ListGroup;
  const { id: orderId } = useParams<{ id: string }>();
  const { data: order, error, isLoading, refetch } = useGetOrderById(orderId as string);
  const { payOrder, isLoading: loadingPay } = usePayOrder();
  const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();
  const { paypal, isLoading: loadingPayPal, error: errorPayPal } = useGetPayPalClientId();
  const { userInfo } = useAppSelector((state) => state.auth);
  const { deliverOrder, isLoading: loadingDeliver } = useDeliverOrderMutation();

  const onApproveTest = async () => {
    await payOrder(
      { orderId: orderId as string, details: { payer: {} } },
      {
        onSuccess: () => {
          refetch();
          toast.success("Order paid successfully");
        },
        onError: (error) => {
          const message = isAxiosError<{ message?: string }>(error)
            ? error.response?.data.message
            : undefined;
          toast.error(message || "Error paying order");
        },
      },
    );
  };

  const createOrder = (_data: object, actions: CreateOrderActions) => {
    return actions.order.create({
      intent: "CAPTURE",
      purchase_units: [
        {
          amount: {
            currency_code: "USD",
            value: order?.totalPrice.toFixed(2) ?? "0.00",
          },
        },
      ],
    });
  };

  const onApprove = async (_data: OnApproveData, actions: OnApproveActions) => {
    if (!actions.order) {
      toast.error("Unable to capture the PayPal order");
      return;
    }

    const details = await actions.order.capture();
    await payOrder(
      { orderId: orderId as string, details },
      {
        onSuccess: () => {
          refetch();
          toast.success("Order paid successfully");
        },
        onError: (error) => {
          const message = isAxiosError<{ message?: string }>(error)
            ? error.response?.data.message
            : undefined;
          toast.error(message || "Error paying order");
        },
      },
    );
  };

  const onError = (err: { message: string }) => {
    toast.error(err.message);
  };

  const handleDeliverOrder = async () => {
    await deliverOrder(orderId as string, {
      onSuccess: () => {
        refetch();
        toast.success("Order delivered successfully");
      },
      onError: (error) => {
        const message = isAxiosError<{ message?: string }>(error)
          ? error.response?.data.message
          : undefined;
        toast.error(message || "Error delivering order");
      },
    });
  };

  useEffect(() => {
    if (!errorPayPal && !loadingPayPal && paypal?.clientId) {
      const loadPayPalScript = async () => {
        paypalDispatch({
          type: "resetOptions",
          value: {
            "client-id": paypal.clientId,
            currency: "USD",
          },
        });
        paypalDispatch({ type: "setLoadingStatus", value: "pending" });
      };

      if (order && !order.isPaid) {
        if (!window.paypal) {
          loadPayPalScript();
        }
      }
    }
  }, [order, paypal, paypalDispatch, loadingPayPal, errorPayPal]);

  if (isLoading) return <Loader />;
  if (error) return <Message variant="danger">{error.message}</Message>;

  return (
    <>
      <h1>Order {order?._id}</h1>
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <Item>
              <h2>Shipping</h2>
              <p>
                <strong>Name: </strong> {order?.user?.name}
              </p>
              <p>
                <strong>Email: </strong> {order?.user?.email}
              </p>
              <p>
                <strong>Address: </strong>
                {order?.shippingAddress.address}, {order?.shippingAddress.city}{" "}
                {order?.shippingAddress.postalCode}, {order?.shippingAddress.country}
              </p>
              {order?.isDelivered ? (
                <Message variant="success">Delivered on {String(order?.deliveredAt)}</Message>
              ) : (
                <Message variant="danger">Not Delivered</Message>
              )}
            </Item>

            <Item>
              <h2>Payment Method</h2>
              <p>
                <strong>Method: </strong> {order?.paymentMethod}
              </p>
              {order?.isPaid ? (
                <Message variant="success">Paid on {String(order?.paidAt)}</Message>
              ) : (
                <Message variant="danger">Not Paid</Message>
              )}
            </Item>

            <Item>
              <h2>Order Items</h2>
              {order?.orderItems.length === 0 ? (
                <Message>Order is empty</Message>
              ) : (
                <>
                  {order?.orderItems.map((item, index) => (
                    <Item key={index}>
                      <Row>
                        <Col md={1}>
                          <Image src={item.image} alt={item.name} fluid rounded />
                        </Col>
                        <Col>
                          <Link to={`/product/${item.product}`}>{item.name}</Link>
                        </Col>
                        <Col md={4}>
                          {item.qty} x ${item.price} = ${item.qty * item.price}
                        </Col>
                      </Row>
                    </Item>
                  ))}
                </>
              )}
            </Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <Item>
                <h2>Order Summary</h2>
              </Item>
              <Item>
                <Row>
                  <Col>Items</Col>
                  <Col>${order?.itemsPrice}</Col>
                </Row>
                <Row>
                  <Col>Shipping</Col>
                  <Col>${order?.shippingPrice}</Col>
                </Row>
                <Row>
                  <Col>Tax</Col>
                  <Col>${order?.taxPrice}</Col>
                </Row>
                <Row>
                  <Col>Total</Col>
                  <Col>${order?.totalPrice}</Col>
                </Row>
              </Item>
              {!order?.isPaid && (
                <Item>
                  {loadingPay && <Loader />}

                  {isPending ? (
                    <Loader />
                  ) : (
                    <div>
                      <Button
                        onClick={onApproveTest}
                        style={{
                          marginBottom: "10px",
                        }}
                      >
                        Test Pay Order
                      </Button>
                      <div>
                        <PayPalButtons
                          createOrder={createOrder}
                          onApprove={onApprove}
                          onError={onError}
                        />
                      </div>
                    </div>
                  )}
                </Item>
              )}

              {loadingDeliver && <Loader />}
              {userInfo && userInfo?.isAdmin && order?.isPaid && !order?.isDelivered && (
                <Item>
                  <Button type="button" className="btn btn-block" onClick={handleDeliverOrder}>
                    Mark As Delivered
                  </Button>
                </Item>
              )}
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default OrderScreen;
