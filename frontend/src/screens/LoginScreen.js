import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Button,
  Form,
  FormGroup,
  FormLabel,
  FormControl,
  Row,
  Col,
} from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { loginUser } from '../actions/userActions';
import FormContainer from '../components/FormContainer';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, userInfo, error } = userLogin;

  const loginHandler = (e) => {
    e.preventDefault();
    dispatch(loginUser(email, password));
  };

  useEffect(() => {
    if (userInfo) {
      navigate('/');
    }
  }, [userInfo, navigate]);

  return (
    <FormContainer>
      <h1>Sign In</h1>
      {error && <Message variant='danger'>{error}</Message>}
      {loading && <Loader />}
      <Form onSubmit={loginHandler}>
        <FormGroup>
          <FormLabel>Email Address</FormLabel>
          <FormControl
            type='email'
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            placeholder='Enter Email'
          ></FormControl>
        </FormGroup>

        <FormGroup className='py-3'>
          <FormLabel>Password</FormLabel>
          <FormControl
            type='password'
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            placeholder='Enter Password'
          ></FormControl>
        </FormGroup>

        <Button variant='info' type='submit'>
          Sign In
        </Button>
      </Form>

      <Row className='py-5'>
        <Col>
          New to this App ? <Link to='/signup'>Sign up</Link>
        </Col>
       
      </Row>
    </FormContainer>
  );
};

export default LoginScreen;