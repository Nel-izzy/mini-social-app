import React, { useEffect, useState } from "react";
import {Link, useNavigate } from "react-router-dom";
import { Row, Col, ListGroup, Card, ListGroupItem, Button,
  Form,
  FormGroup,
  FormLabel,
  FormControl,
   } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { addFriend, getUserDetails, listUsers,   updateUserProfile, userProfileUpdateReset} from "../actions/userActions";
import Loader from "../components/Loader";
import Message from "../components/Message";

const HomeScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const userList = useSelector((state) => state.userList);
  const { loading, error, users } = userList;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');

  const {user, loading: loadingUser} = useSelector((state) => state.userDetails);
  const {success} = useSelector((state) => state.addFriend);
 

  const [message, setMessage] = useState(null);


  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    }else{
      dispatch(listUsers());
      if(!user.name){
        dispatch(userProfileUpdateReset());
        dispatch(getUserDetails('profile'));
        
      }else {
        setName(user.name);
        setEmail(user.email);
      }
    }

   
 
  }, [userInfo, navigate, dispatch, user, success]);

  const addFriendHandler = (friend) => {

   if(user.friends.includes(friend.name)){
    setMessage(`${friend.name} is already a friend`)
   } 
   else{
    dispatch(addFriend(user._id, {id: friend._id, name: friend.name}))
   }
    
  }

  
  const updateUserHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage('Passwords do not match');
    } else {
      dispatch(updateUserProfile({ id: user._id, name, email, password }));
    }
  };



  return (
    <>
      <Row className="py-5">
        <Col xs={12} md={4}>
        <h4>Profile </h4>    
        
        <Card style={{ width: '300px', padding: '10px'}} >
        <Form onSubmit={updateUserHandler}>
          <FormGroup>
            <FormLabel>Name</FormLabel>
            <FormControl
              type='text'
              onChange={(e) => setName(e.target.value)}
              value={name}
              placeholder='Enter Name'
            ></FormControl>
          </FormGroup>

          <FormGroup className='py-3'>
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

          <FormGroup className='py-3'>
            <FormLabel>Confirm Password</FormLabel>
            <FormControl
              type='password'
              onChange={(e) => setConfirmPassword(e.target.value)}
              value={confirmPassword}
              placeholder='Confirm Password'
            ></FormControl>
          </FormGroup>

          <Button variant='info' type='submit' className="btn btn-sm">
            Update Account
          </Button>

        </Form>
        </Card>
        </Col>
        <Col xs={12} md={4}>
          <h4>Friends</h4>
          
          
            {loadingUser ? <Loader />  : user.friends && user.friends.map(friend=> (
              <ListGroup key={friend}>
                <ListGroupItem>{friend && friend}</ListGroupItem>
              </ListGroup>
            ))}
          
        </Col>
        <Col xs={12} md={4}>
          <h4>People you may Know</h4>
          { message && <Message>{message}</Message> }
          {loading ? <Loader /> :  error ? (
        <Message variant="danger">{error}</Message>
      ) :
          users.length > 0 &&
              users.filter(u=>u._id!==userInfo._id).map((usr) => (
               
               <ListGroup key={usr._id}>
              
               <ListGroup.Item>{usr.name} <span className="text-right">
                <Link onClick={()=> addFriendHandler(usr)}>Add Friend</Link></span></ListGroup.Item>
              
             </ListGroup>
           
              ))}  
         
        
        </Col>
      </Row>
    </>
  );
};

export default HomeScreen;