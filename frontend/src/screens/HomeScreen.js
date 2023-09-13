import React, { useEffect, useState } from "react";
import {Link, useNavigate } from "react-router-dom";
import { Row, Col, ListGroup, Card, ListGroupItem } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { addFriend, getUserDetails, listUsers} from "../actions/userActions";
import Loader from "../components/Loader";
import Message from "../components/Message";

const HomeScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const userList = useSelector((state) => state.userList);
  const { loading, error, users } = userList;

  const {user, loading: loadingUser} = useSelector((state) => state.userDetails);
  const {success} = useSelector((state) => state.addFriend);
 


  const [message, setMessage] = useState(null);

  

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    }else{
      if(!user.name){
        dispatch(listUsers());
    
        dispatch(getUserDetails('profile'));
      }
    }

    if(success) setMessage("Friend Added")
   
 
  }, [userInfo, navigate, dispatch, user, success]);

  const addFriendHandler = (friend) => {

   
    dispatch(addFriend(user._id, {id: friend._id, name: friend.name}))
  }

  
  


  return (
    <>
      <Row className="py-5">
        <Col xs={12} md={4}>
        <h4>Profile </h4>    
        
        <Card style={{ width: '300px' }}>
        <ListGroup variant="flush">
        <ListGroup.Item>{user && user.name}</ListGroup.Item>
        <ListGroup.Item>{user && user.email}</ListGroup.Item>
      
      </ListGroup>
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