import {BrowserRouter,Route, Switch} from 'react-router-dom'

import ProtectedRoute from './components/ProtectedRoute';
import 'bootstrap/dist/css/bootstrap.min.css';

import './App.css';
import Home from './components/Home';
import Login from './components/Login';
import Admin from './components/Admin';
import InvoiceForm from './components/InvoiceForm';
import Customers from './components/Customers';
import SofaUpload from './components/SofaUpload';

const App=()=>(
  <BrowserRouter>
   <Switch>
    <Route exact path="/" component={Home}/>  
    <Route exact path="/login" component={Login}/> 
    <ProtectedRoute path="/admin" component={Admin}/>
    <ProtectedRoute path="/InvoiceForm" component={InvoiceForm}/>
    <ProtectedRoute path="/customers" component={Customers}/>
    <ProtectedRoute path="/sofaupload" component={SofaUpload}/>
   
   </Switch>
 
  </BrowserRouter>

)

export default App;