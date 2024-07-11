import React, { Component } from 'react';
import AdminNavbar from '../AdminNavbar';
import axios from 'axios';
import './index.css';

class InvoiceForm extends Component {
  state = {
    page: 1,
    invoiceDate: '',
    orderDeliveryDate: '',
    customerName: '',
    village: '',
    mobileNumber: '',
    sofaModel: '',
    softySeatingCharge: '',
    hrFoamSeatingCharge: '',
    coirFoamSeatingCharge: '',
    sofaSeatingCharge: '',
    fabricCharge: '',
    totalEstimationBill: '',
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const currentDate = new Date().toISOString().slice(0, 10); // Get current date

      // Get current time in IST
      const currentTime = new Date().toLocaleString('en-US', {
        timeZone: 'Asia/Kolkata',
        hour12: true,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      });

      const formData = {
        ...this.state,
        invoiceDate: currentDate, // Update invoice date to current date
        invoiceTime: currentTime, // Add current time to form data
      };

      const response = await axios.post('http://localhost:5000/api/invoices', formData);
      console.log('Invoice submitted:', response.data);

      // Reset form fields after successful submission
      this.setState({
        page: this.state.page + 1,
        invoiceDate: '',
        orderDeliveryDate: '',
        customerName: '',
        village: '',
        mobileNumber: '',
        sofaModel: '',
        softySeatingCharge: '',
        hrFoamSeatingCharge: '',
        coirFoamSeatingCharge: '',
        sofaSeatingCharge: '',
        fabricCharge: '',
        totalEstimationBill: '',
      });
    } catch (error) {
      console.error('Error submitting invoice:', error);
    }
  };

  render() {
    return (
      <>
        <AdminNavbar />
        <div className="invoice-form-container">
          <h2>SNGR SOFA WORLD</h2>
          <form className="invoice-form" onSubmit={this.handleSubmit}>
            {/* Form inputs */}
            <div>
              <label>Page No.</label>
              <input
                type="text"
                name="page"
                value={this.state.page}
                onChange={this.handleChange}
                readOnly
              />
            </div>
            <div>
              <label>Invoice Date</label>
              <input
                type="date"
                name="invoiceDate"
                value={this.state.invoiceDate}
                onChange={this.handleChange}
                required
              />
            </div>
            <div>
              <label>Order Delivery Date</label>
              <input
                type="date"
                name="orderDeliveryDate"
                value={this.state.orderDeliveryDate}
                onChange={this.handleChange}
                required
              />
            </div>
            <div>
              <label>Customer Name</label>
              <input
                type="text"
                name="customerName"
                value={this.state.customerName}
                onChange={this.handleChange}
                required
              />
            </div>
            <div>
              <label>Village</label>
              <input
                type="text"
                name="village"
                value={this.state.village}
                onChange={this.handleChange}
                required
              />
            </div>
            <div>
              <label>Mobile Number</label>
              <input
                type="tel"
                name="mobileNumber"
                value={this.state.mobileNumber}
                onChange={this.handleChange}
                required
              />
            </div>
            <div>
              <label>Sofa Model</label>
              <input
                type="text"
                name="sofaModel"
                value={this.state.sofaModel}
                onChange={this.handleChange}
                required
              />
            </div>
            <div>
              <label>Softy Seating Charge</label>
              <input
                type="number"
                name="softySeatingCharge"
                value={this.state.softySeatingCharge}
                onChange={this.handleChange}
                required
              />
            </div>
            <div>
              <label>HR-Foam Seating Charge</label>
              <input
                type="number"
                name="hrFoamSeatingCharge"
                value={this.state.hrFoamSeatingCharge}
                onChange={this.handleChange}
                required
              />
            </div>
            <div>
              <label>Coir Foam Seating Charge</label>
              <input
                type="number"
                name="coirFoamSeatingCharge"
                value={this.state.coirFoamSeatingCharge}
                onChange={this.handleChange}
                required
              />
            </div>
            <div>
              <label>Sofa Seating Charge</label>
              <input
                type="number"
                name="sofaSeatingCharge"
                value={this.state.sofaSeatingCharge}
                onChange={this.handleChange}
                required
              />
            </div>
            <div>
              <label>Fabric Charge</label>
              <input
                type="number"
                name="fabricCharge"
                value={this.state.fabricCharge}
                onChange={this.handleChange}
                required
              />
            </div>
            <div>
              <label>Total Estimation Bill</label>
              <input
                type="number"
                name="totalEstimationBill"
                value={this.state.totalEstimationBill}
                onChange={this.handleChange}
                required
              />
            </div>
            <button type="submit" className="submit-button">Submit Invoice</button>
          </form>
        </div>
      </>
    );
  }
}

export default InvoiceForm;
