import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ViewSuppliers from "./components/suppliers/viewSuppliers";
import AddSuppliers from "./components/suppliers/addSupplier";
import ViewItems from "./components/items/viewItems";
import AddItems from "./components/items/addItem";
import ViewUsers from "./components/users/viewUsers";
import AddUsers from "./components/users/addUser";
import NavBar from "./components/navBar/navBar";
import SignIn from "./components/login/login";
import OrderView from "./components/orders/viewOrders";
import cate from "./components/items/category";


function App() {
  return (
    <div>
    <Router>
    <NavBar />
        <section>
          {/* {localStorage.getItem("token") ? ( */}
            <Switch>
              <Route path="/" component={SignIn} exact />

              <Route path="/suppliers" component={ViewSuppliers} />
              <Route path="/addSupplier" component={AddSuppliers} />

              <Route path="/items" component={ViewItems} />
              <Route path="/addItem" component={AddItems} />

              <Route path="/users" component={ViewUsers} />
              <Route path="/addUser" component={AddUsers} />

              <Route path="/orders" component={OrderView} />

              <Route path="/cate" component={cate} />



            </Switch>
          {/* ) : (
            <Switch>
              <Route path="/" component={SignIn} />
            </Switch>
          )} */}
        </section>
        {/* <Footer /> */}
    </Router>
    </div>
  );
}

export default App;
