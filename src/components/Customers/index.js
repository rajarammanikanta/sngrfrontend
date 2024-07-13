import React, { Component } from 'react';
import axios from 'axios';
import AdminNavbar from '../AdminNavbar';
import './index.css'; // Import your CSS file
import {TailSpin} from "react-loader-spinner";

class Customers extends Component {
  state = {
    customers: [],
    selectedCustomer: null, // To track which customer's details are expanded
    searchQuery: '', // To track the search query
    startDate: '', // To track the start date for filtering
    endDate: '',
    loading: false // To track the end date for filtering
  };



  componentDidMount() {
    this.fetchCustomers();
  }

  fetchCustomers = async () => {
    this.setState({loading: true})
    try {
      const response = await axios.get('https://sngrbackend.onrender.com/api/invoices');
      this.setState({ customers: response.data ,loading: false});
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

 
   
   renderLoadingView=()=>(
    <div className='loading'>
   <TailSpin
      visible={true}
      height="80"
      width="80"
      color="#E4003A"
      ariaLabel="tail-spin-loading"
      radius="1"
      wrapperStyle={{}}
      wrapperClass=""
      />
      <p className='loading'>Sngr sofa world......</p>
    </div>
  
      )


      renderFooter=()=>(
        <div className='footer'>
          <p>Designed & Developed by @Rajaram Manikanta</p>
        </div>
      )


  render() {
    const { customers, selectedCustomer, searchQuery, startDate, endDate ,loading} = this.state;
    let filteredCustomers = customers.filter(customer =>
      customer.customerName.toLowerCase().includes(searchQuery.toLowerCase())
    );
    filteredCustomers = this.filterCustomersByDate(filteredCustomers);

    return (
      <>
        <AdminNavbar />


        <div className="customer-list">
          <h2 className='customer-list-heading'>Customer's List</h2>
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

       {loading === true ? this.renderLoadingView(): (
           filteredCustomers.length === 0 ? (
            <p className="no-customers-message">No customers found matching the criteria.</p>
          ) : (
            filteredCustomers.map(customer => (
              <div key={customer._id} className="customer">
                <div className="customer-details">
                  <div className="customer-info">
                    <p className='name'><strong>CustomerName:</strong> {customer.customerName}</p>
                    <p className='name'><strong>Mobile:</strong> {customer.mobileNumber}</p>
                    <p className='name'><strong>Sofa Model:</strong> {customer.sofaModel}</p>
              
                    <p className='name'><strong>Invoice Date:</strong> {this.formatDate(customer.invoiceDate)}</p>
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
                    <p className="details"><strong>Order Delivery Date:</strong> {this.formatDate(customer.orderDeliveryDate)}</p>
                    <p className="details"><strong>Address:</strong> {customer.village}</p>
                    <p className="details"><strong>Type of Seater:</strong> {customer.seaterType} Seater</p>
                    <p className="details"><strong>Softy Seating Charge:</strong> {customer.softySeatingCharge}</p>
                    <p className="details"><strong>HR-Foam Seating Charge:</strong> {customer.hrFoamSeatingCharge}</p>
                    <p className="details"><strong>Coir Foam Seating Charge:</strong> {customer.coirFoamSeatingCharge}</p>
                    <p className="details"><strong>Sofa Seating Charge:</strong> {customer.sofaSeatingCharge}</p>
                    <p className="details"><strong>Fabric Charge:</strong> {customer.fabricCharge}</p>
                    <p className="details"><strong>Total Estimation Bill:</strong> {customer.totalEstimationBill}</p>
                  </div>
                )}
              </div>
            ))
          )
       )
    
       }

       
        </div>
        {/* {this.renderFooter()} */}
      </>
    );
  }
}

export default Customers;
