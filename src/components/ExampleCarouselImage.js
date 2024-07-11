// src/components/ExampleCarouselImage.js
import React from 'react';
import PropTypes from 'prop-types';
import Image from 'react-bootstrap/Image';
import '../components/ExampleCarouselImage.css'

function ExampleCarouselImage({ text }) {
  let imageSrc;

  // Determine the image source based on the text prop
  switch (text) {
    case 'First slide':
      imageSrc = 'https://images.pexels.com/photos/276583/pexels-photo-276583.jpeg?auto=compress&cs=tinysrgb&w=600'; // Replace with actual image path
      break;
    case 'Second slide':
      imageSrc = 'https://images.pexels.com/photos/1571457/pexels-photo-1571457.jpeg?auto=compress&cs=tinysrgb&w=600'; // Replace with actual image path
      break;
    case 'Third slide':
      imageSrc = 'https://images.pexels.com/photos/276528/pexels-photo-276528.jpeg?auto=compress&cs=tinysrgb&w=600'; // Replace with actual image path
      break;
    default:
      imageSrc = 'https://images.pexels.com/photos/1743227/pexels-photo-1743227.jpeg?auto=compress&cs=tinysrgb&w=600'; // Replace with a default image path
  }

  return (
    <Image src={imageSrc} alt={text} fluid className='background-img'/>
  );
}

ExampleCarouselImage.propTypes = {
  text: PropTypes.string.isRequired,
};

export default ExampleCarouselImage;
