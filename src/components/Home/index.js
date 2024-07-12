// src/components/Home.js
import React, { useEffect, useState } from 'react';
import useAuthRedirect from '../hooks/useAuthRedirect';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import './index.css';
import Header from '../Header';
import {TailSpin} from "react-loader-spinner";
import Footer from '../Footer';

const Home = () => {
  useAuthRedirect();
   const[loading,setLoading]=useState(false);
  const [sofas, setSofas] = useState([]);

  useEffect(() => {
    setLoading(true)
    axios.get('https://sngrbackend.onrender.com/api/sofas')
      .then(response => {
        setLoading(false)
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
                <Card.Title>Sofa Name: {eachSofa.name}</Card.Title>
                <Card.Text>Seater Type: {eachSofa.model}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  ); 

  const renderLoadingView=()=>(
<TailSpin
  visible={true}
  height="80"
  width="80"
  color="#4fa94d"
  ariaLabel="tail-spin-loading"
  radius="1"
  wrapperStyle={{}}
  wrapperClass=""
  />
  )

  const renderAllviews=()=>(
     loading === true ? renderLoadingView(): renderSofaPhotos()
  )

  return (
    <>
      <Header/>
      <div className='home-container'>
        <div className='sofa-home-container'>
          <h2>Sofa Sets</h2>
        {renderAllviews()}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Home;
