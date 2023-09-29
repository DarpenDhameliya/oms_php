import React from "react";
import { Switch, Route, useHistory } from "react-router-dom";
import PickupEntry from "../pickup/PickupEntry";
import BankList from "../masterpage/bank/BankList";
import CourierList from "../masterpage/courier/CourierList";
import Sidebar from "../header&sidebar/Sidebar";
import OrderList from "../order/OrderList";
import SpacificOrderDetail from "../order/SpacificOrderDetail";
import PaymentRecieveReport from "../PaymentRecieveReport/PaymentRecieveReport";
import AddProduct from "../masterpage/Product/AddProduct";
import EditProduct from "../masterpage/Product/EditProduct";
import ProductList from "../masterpage/Product/ProductList";
import WebsiteList from "../masterpage/website/WebsiteList";
import useStyleMainDisplay from "../header&sidebar/MainDisplayStyle";
import OrderEntry from "../order/OrderEntry";
import PaymentRecive from "../payment_Receive/PaymentRecive";
import TransactionReport from "../Transectionreport/TransectionReport";
import OrderReturn from "../order/OrderReturn";
import Profile from "../authenticate/Profile";
import Empty404page from "../commonLink/Empty404page";

function App() {
  const classes = useStyleMainDisplay();
  const token = JSON.parse(localStorage.getItem("userdata"));
  const history = useHistory();
  if (!token) {
    history.push("/");
  }

  return (
    <>
      <div className={classes.setdisplay}>
        <Sidebar />
        <Switch>
          <Route path="/app/productlist">
            <ProductList />
          </Route>
          <Route path="/app/productadd">
            <AddProduct />
          </Route>
          <Route path="/app/productedit/:id">
            <EditProduct />
          </Route>
          <Route path="/app/courier">
            <CourierList />
          </Route>
          <Route path="/app/website">
            <WebsiteList />{" "}
          </Route>
          <Route path="/app/bank">
            <BankList />{" "}
          </Route>
          <Route path="/app/order">
            <OrderList />{" "}
          </Route>
          <Route path="/app/orderadd">
            <OrderEntry />
          </Route>
          <Route path="/app/orderdata">
            <SpacificOrderDetail />{" "}
          </Route>
          <Route path="/app/pickup">
            <PickupEntry />{" "}
          </Route>
          <Route path="/app/payment">
            <PaymentRecieveReport />{" "}
          </Route>
          <Route path="/app/paymentreceive">
            <PaymentRecive />
          </Route>
          <Route path="/app/post_transaction">
            <TransactionReport />
          </Route>
          <Route path="/app/order_return">
            <OrderReturn />
          </Route>
          <Route path="/app/profile">
            <Profile />
          </Route>
          <Route path="*">
            <Empty404page />
          </Route>
        </Switch>
      </div>
    </>
  );
}

export default App;
