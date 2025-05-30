import React, { Component } from 'react';
import AdminNavbar from '../AdminNavbar';
import axios from 'axios';
import './index.css';

class InvoiceForm extends Component {
  state = {
    page: 0,
    invoiceDate: '',
    orderDeliveryDate: '',
    customerName: '',
    village: '',
    mobileNumber: '',
    sofaModel: '',
    seaterType: '',
    softySeatingCharge: 10000, // Fixed value
    hrFoamSeatingCharge: '',
    coirFoamSeatingCharge: '',
    sofaSeatingCharge: '',
    fabricCharge: '',
    totalEstimationBill: '',
    showPopup: false,
  };

  async componentDidMount() {
    try {
      const response = await axios.get('https://sngrbackend.onrender.com/api/invoices');
      const latestPageNumber = response.data.page || 0; // If no page number is found, start from 0
      this.setState({ page: latestPageNumber + 1 });
    } catch (error) {
      console.error('Error fetching latest page number:', error);
    }
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value }, this.calculateCharges);
  };

  calculateCharges = () => {
    const { seaterType, fabricCharge } = this.state;

    const seaterNum = parseInt(seaterType, 10) || 0;
    const fabricCost = parseFloat(fabricCharge) || 0;

    const sofaSeatingCharge = 10000 * seaterNum;
    const hrFoamSeatingCharge = 8500 * seaterNum;
    const coirFoamSeatingCharge = 4500 * seaterNum;
    const updatedFabric = fabricCost * seaterNum;
    const totalEstimationBill = sofaSeatingCharge + hrFoamSeatingCharge + coirFoamSeatingCharge + updatedFabric;

    this.setState({
      sofaSeatingCharge,
      hrFoamSeatingCharge,
      coirFoamSeatingCharge,
      totalEstimationBill,
    });
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

      const response = await axios.post('https://sngrbackend.onrender.com/api/invoices', formData);
      console.log('Invoice submitted:', response.data);

      // Show popup with total estimation bill
      this.setState({ showPopup: true });

      const updatedPage = this.state.page + 1;
      this.setState({
        page: updatedPage,
        invoiceDate: '',
        orderDeliveryDate: '',
        customerName: '',
        village: '',
        mobileNumber: '',
        sofaModel: '',
        seaterType: '', // Reset seater type
        fabricCharge: '',

        sofaSeatingCharge:'',
        hrFoamSeatingCharge:'',
        coirFoamSeatingCharge:'',
      });

    } catch (error) {
      console.error('Error submitting invoice:', error);
    }
  };

  closePopup = () => {
    this.setState({ showPopup: false ,  totalEstimationBill: '',});
  };

  render() {
    const { showPopup, totalEstimationBill } = this.state;

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
                placeholder='Enter customer name'
                required
              />
            </div>
            <div>
              <label>Address</label>
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
                placeholder='Ex: L Sectional'
                required
              />
            </div>
            <div>
              <label>Type of Seater</label>
              <input
                type="number"
                name="seaterType"
                value={this.state.seaterType}
                placeholder="e.g., 2"
                onChange={this.handleChange}
                required
              />
            </div>
            <div>
              <label>Softy Seating Charge (Fixed)</label>
              <input
                type="text"
                name="softySeatingCharge"
                value="10000 per one seat"
                readOnly
              />
            </div>
            <div>
              <label>HR-Foam Seating Charge</label>
              <input
                type="number"
                name="hrFoamSeatingCharge"
                value={this.state.hrFoamSeatingCharge}
                placeholder='8500 per one seat'
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
                placeholder='4500 per one seat'
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
                placeholder='10000 * no of seats'
                readOnly
              />
            </div>
            <div>
              <label>Fabric Charge</label>
              <input
                type="number"
                name="fabricCharge"
                value={this.state.fabricCharge}
                onChange={this.handleChange}
                placeholder='Choose from 400 to upto 1 lakh'
                required
              />
            </div>
            <div>
              <label>Total Estimation Bill</label>
              <input
                type="number"
                name="totalEstimationBill"
                value={this.state.totalEstimationBill}
                readOnly
              />
            </div>
            <div className="button-container">
              <button type="submit" className="submit-button">Submit Invoice</button>
            </div>
          </form>
        </div>

        {/* Popup for showing total estimated bill */}
        {showPopup && (
          <div className="popup-background">
            <div className="popup">
              <div className="popup-content">
                <span className="close-popup" onClick={this.closePopup}>&times;</span>
                <h3>Invoice Generated Successfully!</h3>
                <p>Total Estimated Bill: ₹{totalEstimationBill}</p>
                <div className="popup-buttons">
                  <a href="/customers">    <button className="popup-button" href="/customers">Go to Customers Page</button></a>
              
                  <button className="popup-button" onClick={this.closePopup}>Close</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </>
    );
  }
}

export default InvoiceForm;
