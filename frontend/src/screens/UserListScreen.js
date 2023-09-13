import React, { useEffect, useState } from "react";
import { Button, Table, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { deleteUser, listUsers } from "../actions/userActions";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Modalify from "../components/Modalify";

const UserListScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [modalShow, setModalShow] = useState(false);
  const [successCreate, setSuccessCreate] = useState(false);

  const { userInfo } = useSelector((state) => state.userLogin);

  const userList = useSelector((state) => state.userList);
  const { loading, error, users } = userList;
  const userDelete = useSelector((state) => state.userDelete);
  const { success: successDelete } = userDelete;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listUsers());
      setSuccessCreate(false);
    } else {
      navigate("/login");
    }
  }, [dispatch, navigate, userInfo, successDelete, successCreate]);

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure")) {
      dispatch(deleteUser(id));
    }
  };

  return (
    <>
      <Link to="/" className="btn btn-info my-3">
        Go Back
      </Link>

      <Modalify
        show={modalShow}
        onHide={() => setModalShow(false)}
        onCreate={() => setSuccessCreate(true)}
      />
      <Row>
        <Col>
          <h1>Users</h1>
        </Col>
        {userInfo.isAdmin && (
          <Col className="text-right">
            <Button type="button" onClick={() => setModalShow(true)}>
              <i className="fas fa-plus" /> Add new User
            </Button>
          </Col>
        )}
      </Row>

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Table bordered striped hover responsive className="table-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>EMAIL</th>
              <th>COMPANY</th>
              <th>ADMIN</th>
              <th>TYPE</th>
              <th>VERIFIED</th>
              <th>ACC MGR</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 &&
              users.map((user) => (
                <tr key={user._id}>
                  <td>{user._id.slice(-6)}</td>
                  <td>{user.name}</td>
                  <td>
                    <a href={`mailto:${user.email}`}>{user.email}</a>
                  </td>
                  <td>{user.company}</td>
                  <td>
                    {user.isAdmin ? (
                      <i className="fas fa-check" style={{ color: "green" }} />
                    ) : (
                      <i className="fas fa-times" style={{ color: "red" }} />
                    )}
                  </td>
                  <td>{user.type}</td>
                  <td>
                    {user.verified ? (
                      <i className="fas fa-check" style={{ color: "green" }} />
                    ) : (
                      <i className="fas fa-times" style={{ color: "red" }} />
                    )}
                  </td>
                  <td>
                    {user.isAccountManager ? (
                      <i className="fas fa-check" style={{ color: "green" }} />
                    ) : (
                      <i className="fas fa-times" style={{ color: "red" }} />
                    )}
                  </td>
                  <td>
                    <LinkContainer to={`/user/${user._id}/edit`}>
                      <Button className="btn-sm">
                        <i className="fas fa-edit" />
                      </Button>
                    </LinkContainer>
                    <Button
                      className="btn-sm"
                      variant="danger"
                      onClick={() => deleteHandler(user._id)}
                    >
                      <i className="fas fa-trash" />
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