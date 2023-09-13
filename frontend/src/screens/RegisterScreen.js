import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Form,
  Row,
  Col,
  FormGroup,
  FormLabel,
  FormControl,
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { register } from "../actions/userActions";
import FormContainer from "../components/FormContainer";

const RegisterScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
 
  const [message, setMessage] = useState(null);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const userRegister = useSelector((state) => state.userRegister);
  const { loading, userInfo, error } = userRegister;

  const registerHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
    } else {
      dispatch(
        register(
          name,
          email,
          password,
          
        )
      );
    }
  };

  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [navigate, userInfo]);

  return (
    <FormContainer>
      <h1>Sign Up</h1>
      {error && <Message variant="danger">{error}</Message>}
      {message && <Message variant="warning">{message}</Message>}
      {loading && <Loader />}
      <Form onSubmit={registerHandler}>
        <FormGroup>
          <FormLabel>Name</FormLabel>
          <FormControl
            type="text"
            onChange={(e) => setName(e.target.value)}
            value={name}
            placeholder="Enter Name"
            required
          ></FormControl>
        </FormGroup>

        <FormGroup className="py-3">
          <FormLabel>Email Address</FormLabel>
          <FormControl
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            placeholder="Enter Email"
            required
          ></FormControl>
        </FormGroup>

        <FormGroup className="py-3">
          <FormLabel>Password</FormLabel>
          <FormControl
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            placeholder="Enter Password"
            required
          ></FormControl>
        </FormGroup>

        <FormGroup className="py-3">
          <FormLabel>Confirm Password</FormLabel>
          <FormControl
            type="password"
            onChange={(e) => setConfirmPassword(e.target.value)}
            value={confirmPassword}
            placeholder="Confirm Password"
            required
          ></FormControl>
        </FormGroup>

       
       

       

        

        <Button variant="info" type="submit">
          Sign Up
        </Button>
      </Form>

      <Row className="py-3">
        <Col>
          Have an Account ? <Link to="/login">Sign In</Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default RegisterScreen;