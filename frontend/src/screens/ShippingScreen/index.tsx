import { useState, type ChangeEvent } from "react";
import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import FormContainer from "../../components/FormContainer";
import { copy } from "../../copy";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { saveShippingAddress } from "../../store/slices/cartSlice";

const ShippingScreen = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const cart = useAppSelector((state) => state.cart);
  const { shippingAddress } = cart;
  const [address, setAddress] = useState(shippingAddress.address || "");
  const [city, setCity] = useState(shippingAddress.city || "");
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode || "");
  const [country, setCountry] = useState(shippingAddress.country || "");

  const submitHandler = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    const payload = {
      address,
      city,
      postalCode,
      country,
    };
    dispatch(saveShippingAddress(payload));
    navigate("/payment"); // Redirect to the payment screen after saving the shipping address
  };

  return (
    <FormContainer>
      <h1>{copy.shipping.title}</h1>

      <Form onSubmit={submitHandler}>
        <Form.Group controlId="address" className="my-2">
          <Form.Label>{copy.shipping.address}</Form.Label>
          <Form.Control
            type="text"
            placeholder={copy.shipping.enterAddress}
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="city" className="my-2">
          <Form.Label>{copy.shipping.city}</Form.Label>
          <Form.Control
            type="text"
            placeholder={copy.shipping.enterCity}
            value={city}
            onChange={(e) => setCity(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="postalCode" className="my-2">
          <Form.Label>{copy.shipping.postalCode}</Form.Label>
          <Form.Control
            type="text"
            placeholder={copy.shipping.enterPostalCode}
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="country" className="my-2">
          <Form.Label>{copy.shipping.country}</Form.Label>
          <Form.Control
            type="text"
            placeholder={copy.shipping.enterCountry}
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button type="submit" variant="primary" className="my-2">
          {copy.shipping.continue}
        </Button>
      </Form>
    </FormContainer>
  );
};

export default ShippingScreen;
