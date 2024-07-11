import React, { Component } from 'react';
import axios from 'axios';
import AdminNavbar from '../AdminNavbar';
import './index.css'; // Import your CSS file

class Customers extends Component {
  state = {
    customers: [],
    selectedCustomer: null, // To track which customer's details are expanded
    searchQuery: '', // To track the search query
    startDate: '', // To track the start date for filtering
    endDate: '' // To track the end date for filtering
  };

  componentDidMount() {
    this.fetchCustomers();
  }

  fetchCustomers = async () => {
    try {
      const response = await axios.get('https://sngrbackend.onrender.com/api/invoices');
      this.setState({ customers: response.data });
    } catch (error) {
      console.error('Error fetching customers:', error);
    }
  };

  toggleCustomerDetails = (customerId) => {
    // Toggle selected customer's details visibility
    this.setState(prevState => ({
      selectedCustomer: prevState.selectedCustomer === customerId ? null : customerId
    }));
  };

  // Function to format date to IST without time
  formatDate = (dateStr) => {
    const date = new Date(dateStr);
    const options = {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      timeZone: 'Asia/Kolkata',
    };
    return date.toLocaleDateString('en-IN', options);
  };

  handleSearchChange = (e) => {
    this.setState({ searchQuery: e.target.value });
  };

  handleStartDateChange = (e) => {
    this.setState({ startDate: e.target.value });
  };

  handleEndDateChange = (e) => {
    this.setState({ endDate: e.target.value });
  };

  filterCustomersByDate = (customers) => {
    const { startDate, endDate } = this.state;
    return customers.filter(customer => {
      const invoiceDate = new Date(customer.invoiceDate);
      const start = new Date(startDate);
      const end = new Date(endDate);
      return (!startDate || invoiceDate >= start) && (!endDate || invoiceDate <= end);
    });
  };

  render() {
    const { customers, selectedCustomer, searchQuery, startDate, endDate } = this.state;
    let filteredCustomers = customers.filter(customer =>
      customer.customerName.toLowerCase().includes(searchQuery.toLowerCase())
    );
    filteredCustomers = this.filterCustomersByDate(filteredCustomers);

    return (
      <>
        <AdminNavbar />
        <div className="customer-list">
          <h2>Customer List</h2>
          <input
            type="text"
            placeholder="Search by customer name"
            value={searchQuery}
            onChange={this.handleSearchChange}
            className="search-input"
          />
          <div className="date-filters">
            <input
              type="date"
              value={startDate}
              onChange={this.handleStartDateChange}
              className="date-input"
              placeholder="Start Date"
            />
            <input
              type="date"
              value={endDate}
              onChange={this.handleEndDateChange}
              className="date-input"
              placeholder="End Date"
            />
          </div>
          {filteredCustomers.length === 0 ? (
            <p className="no-customers-message">No customers found matching the criteria.</p>
          ) : (
            filteredCustomers.map(customer => (
              <div key={customer._id} className="customer">
                <div className="customer-details">
                  <div className="customer-info">
                    <p><strong>CustomerName:</strong> {customer.customerName}</p>
                    <p><strong>Mobile:</strong> {customer.mobileNumber}</p>
                    <p><strong>Address:</strong> {customer.village}</p>
                    <p><strong>Invoice Date:</strong> {this.formatDate(customer.invoiceDate)}</p>
                  </div>
                  <div className="customer-actions">
                    <button onClick={() => this.toggleCustomerDetails(customer._id)}>
                      {selectedCustomer === customer._id ? 'Hide Details' : 'View More'}
                    </button>
                  </div>
                </div>
                {/* Conditionally render additional details */}
                {selectedCustomer === customer._id && (
                  <div className="customer-additional-details">
                    <p><strong>Order Delivery Date:</strong> {this.formatDate(customer.orderDeliveryDate)}</p>
                    <p><strong>Sofa Model:</strong> {customer.sofaModel}</p>
                    <p><strong>Softy Seating Charge:</strong> {customer.softySeatingCharge}</p>
                    <p><strong>HR-Foam Seating Charge:</strong> {customer.hrFoamSeatingCharge}</p>
                    <p><strong>Coir Foam Seating Charge:</strong> {customer.coirFoamSeatingCharge}</p>
                    <p><strong>Sofa Seating Charge:</strong> {customer.sofaSeatingCharge}</p>
                    <p><strong>Fabric Charge:</strong> {customer.fabricCharge}</p>
                    <p><strong>Total Estimation Bill:</strong> {customer.totalEstimationBill}</p>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </>
    );
  }
}

export default Customers;
