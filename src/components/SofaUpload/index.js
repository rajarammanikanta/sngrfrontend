import React, { Component } from "react";
import AdminNavbar from "../AdminNavbar";
import axios from 'axios';
import './index.css';

class SofaUpload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sofaName: '',
      sofaModel: '',
      sofaImage: '',
      sofaDetails: null
    };
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { sofaName, sofaModel, sofaImage } = this.state;
    axios.post('https://sngrbackend.onrender.com/api/sofas', {
      name: sofaName,
      model: sofaModel,
      image: sofaImage
    })
    .then(response => {
      this.setState({ sofaDetails: response.data,sofaName:'',sofaModel:'',sofaImage:'' });
    })
    .catch(error => {
      console.error("There was an error saving the sofa details!", error);
    });
  }

  render() {
    const { sofaName, sofaModel, sofaImage, sofaDetails } = this.state;

    return (
      <div>
        <AdminNavbar/>
        <div className="admin-container">
          <h1>Sofa Details</h1>
          <form onSubmit={this.handleSubmit} className="form">
            <div className="form-group">
              <label htmlFor="sofaName">Sofa Name:</label>
              <input
                type="text"
                id="sofaName"
                name="sofaName"
                value={sofaName}
                onChange={this.handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="sofaModel">Sofa Model:</label>
              <input
                type="text"
                id="sofaModel"
                name="sofaModel"
                value={sofaModel}
                onChange={this.handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="sofaImage">Sofa Image URL:</label>
              <input
                type="text"
                id="sofaImage"
                name="sofaImage"
                value={sofaImage}
                onChange={this.handleChange}
                required
              />
            </div>
            <button type="submit" className="submit-button">Save</button>
          </form>

          {sofaDetails && (
            <div className="sofa-details">
              <h2>Sofa Preview</h2>
              <p><strong>Name:</strong> {sofaDetails.name}</p>
              <p><strong>Model:</strong> {sofaDetails.model}</p>
              <img src={sofaDetails.image} alt="Sofa" className="sofa-image"/>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default SofaUpload;
