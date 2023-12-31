import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';

const Footer = () => {
  const date = new Date();
  const d = date.getFullYear();
  return (
    <footer>
      <Container>
        <Row>
          <Col className='text-center py-3'>
            {' '}
            Copyright &copy; SocialApp {d} | Developed by{' '} fictional Co.
            
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
