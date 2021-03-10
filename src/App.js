import './App.css';
// import Header from './Header';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from "./Login";
import Register from "./Register";
import AddProduct from "./AddProduct";
import UpdateProduct from "./UpdateProduct";
import Protected from './Protected';
import Productlist from './Productlist';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        {/* <h1>E-comm Project</h1> */}
        <Switch>
        <Route path="/register" ><Register /></Route>
        <Route path="/add" >
          <Protected Cmp={AddProduct} />
        </Route>
        <Route path="/update/:productId" >
          <Protected Cmp={UpdateProduct} />
        </Route>
        <Route path="/product-list" >
          <Protected Cmp={Productlist} />
        </Route>
        <Route path="/" ><Login /></Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
