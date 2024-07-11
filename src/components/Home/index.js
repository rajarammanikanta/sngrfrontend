// src/components/Home.js
import React, { useEffect, useState } from 'react';
import useAuthRedirect from '../hooks/useAuthRedirect';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import './index.css';
import Header from '../Header';
import Footer from '../Footer';

const Home = () => {
  useAuthRedirect();

  const [sofas, setSofas] = useState([]);

  useEffect(() => {
    axios.get('https://sngrbackend.onrender.com/api/sofas')
      .then(response => {
        setSofas(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the sofas!", error);
      });
  }, []);

  const renderSofaPhotos = () => (
    <div className="sofa-photos-container">
      <Row xs={1} md={2} lg={3} className="g-4">
        {sofas.map((eachSofa) => (
          <Col key={eachSofa._id}>
            <Card className="sofa-card">
              <Card.Img variant="top" src={eachSofa.image} className="sofa-image"/>
              <Card.Body>
                <Card.Title>{eachSofa.name}</Card.Title>
                <Card.Text>{eachSofa.model}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );

  return (
    <>
      <Header/>
      <div className='home-container'>
        <div className='sofa-home-container'>
          <h2>Sofa Sets</h2>
          {renderSofaPhotos()}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Home;
