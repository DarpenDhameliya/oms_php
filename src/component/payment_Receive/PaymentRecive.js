import React, { useState, useEffect } from "react";
import Container from "@mui/material/Container";
import { Grid, Paper } from "@material-ui/core";
import Typography from "@mui/material/Typography";
import useStylesPickupEntry from "../pickup/PickupEntryStyle";
import Button from "@material-ui/core/Button";
import TextField from "@mui/material/TextField";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import { styled } from "@mui/material/styles";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableContainer from "@mui/material/TableContainer";
import { Divider } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import { ToastContainer, toast } from "react-toastify";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import "react-toastify/dist/ReactToastify.css";
import Backdrop from "@mui/material/Backdrop";
import { DotLoader } from "react-spinners";
import { useDispatch, useSelector } from "react-redux";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import moment from "moment";
import DatePicker from "react-date-picker/dist/entry.nostyle";
import "react-calendar/dist/Calendar.css";
import "react-date-picker/dist/DatePicker.css";
import {
  Paymentreceivestate,
  Paymentreceivechangestatus,
  PaymentReceiveSlice,
} from "./pages/Slice/PaymentReceiveSlice";
import { orderType } from "../commonLink/OrderList";
import {
  PaymentSubmitSlice,
  Paymentsubmitchangestatus,
  Paymentsubmitstate,
} from "./pages/Slice/PaymentcheckedSlice";
import {
  paymentuncheckstatus,
  Paymentuncheckstate,
} from "./pages/Slice/PaymentUncheckSlice";
import { useHistory } from "react-router-dom";
import Manual from "./pages/Manual";
import IconButton from "@mui/material/IconButton";
import MeeshoPayment from "./pages/MeeshoPayment";

function PaymentRecive() {
  const classes = useStylesPickupEntry();
  const [manualopen, setManualopen] = useState(true);
  const [openmesshopage, setOpenmesshopage] = useState(false);
  const [openflipcartpage, setOpenflipcartpage] = useState(false);
  const [openamazompage, setOpenamazompage] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(null);
  const [active, setActive] = useState(false);
  const mobileMenunBoolean = Boolean(mobileMenu);
  const [modelcount, setModelcount] = useState(1);
  const [modelOpen, setModelOpen] = useState(0);


  const history = useHistory();

  const handleMobiblenenuClose = () => {
    setMobileMenu(null);
  };
  const handleopenmesshopage = () => {
    if (navigator.onLine == true) {
      setOpenmesshopage(true);
      setManualopen(false);
      setOpenamazompage(false);
      setOpenflipcartpage(false);
    } else {
      setModelOpen(1);
      setModelcount(2);
    }
  };

  const handleopenflipcartpage = () => {
    if (navigator.onLine == true) {
      setOpenflipcartpage(true);
      setManualopen(false);
      setOpenmesshopage(false);
      setOpenamazompage(false);
    } else {
      setModelOpen(1);
      setModelcount(2);
    }
  };

  const handleopenamazompage = () => {
    if (navigator.onLine == true) {
      setOpenamazompage(true);
      setManualopen(false);
      setOpenflipcartpage(false);
      setOpenmesshopage(false);
    } else {
      setModelOpen(1);
      setModelcount(2);
    }
  };
  const handleMenualopage = () => {
    if (navigator.onLine == true) {
      setManualopen(true);
      setOpenflipcartpage(false);
      setOpenmesshopage(false);
      setOpenamazompage(false);
    } else {
      setModelOpen(1);
      setModelcount(2);
    }
  };

  //network status
  useEffect(() => {
    window.onbeforeunload = function (event) {
      if (navigator.onLine == true) {
        setModelcount(1);
      } else {
        setModelcount(2);
      }
    };

    if (navigator.onLine == true || modelcount != 1) {
    } else {
      setModelOpen(1);
      setModelcount(2);
    }
  });

  const hanldemodelclose = () => {
    setModelOpen(0);
  };

  return (
    <>
      <Container
        component="main"
        maxWidth="xl"
        className={classes.setcontainer}
      >
        <ToastContainer
          position="top-right"
          closeOnClick
          style={{ marginTop: "55px" }}
        />
        <div className={classes.setheader}>
          <div>
            <Typography
              variant="h4"
              gutterBottom
              className={classes.setheading}
            >
              Payment Receive
            </Typography>
          </div>
          {/* <div className={classes.setmobileview}>
            {openmesshopage ? (
              <Button
                variant="contained"
                className={classes.setproductbtndis}
                onClick={handleMenualopage}
              >
                Manual Add
              </Button>
            ) : (
              <Button
                variant="contained"
                className={classes.setproductbtndis}
                onClick={handleopenmesshopage}
              >
                From Meesho
              </Button>
            )}

            {openflipcartpage ? (
              <Button
                variant="contained"
                className={classes.setproductbtndis}
                onClick={handleMenualopage}
              >
                Manual Add
              </Button>
            ) : (
              <Button
                variant="contained"
                className={classes.setproductbtndis}
                onClick={handleopenflipcartpage}
              >
                From Flipcart
              </Button>
            )}
            {openamazompage ? (
              <Button
                variant="contained"
                className={classes.setproductbtndis}
                onClick={handleMenualopage}
              >
                Manual Add
              </Button>
            ) : (
              <Button
                variant="contained"
                className={classes.setproductbtndis}
                onClick={handleopenamazompage}
              >
                From Amazon
              </Button>
            )}
          </div> */}
          <div className={classes.setmovildisplay}>
            <IconButton
              size="large"
              onClick={(e) => setMobileMenu(e.currentTarget)}
              aria-controls={mobileMenunBoolean ? "Open_Menu" : undefined}
              aria-haspopup="true"
              aria-expanded={mobileMenunBoolean ? "true" : undefined}
              color="inherit"
            >
              <MoreVertIcon />
            </IconButton>
          </div>
        </div>

        {manualopen && <Manual />}

        {openmesshopage && <MeeshoPayment />}

        {/* {openflipcartpage && <AddFlipcartfile />}

        {openamazompage && <AddAmazonfile />} */}

        <Menu
          anchorEl={mobileMenu}
          id="Open_Menu"
          open={mobileMenunBoolean}
          onClose={handleMobiblenenuClose}
          PaperProps={{
            elevation: 0,
            sx: {
              overflow: "hidden",
              filter: "drop-shadow(0px 5px 8px rgba(0,0,0,0.32))",
              mt: 1.5,
              "& .MuiMenu-list": {
                padding: 0,
              },
            },
          }}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        >
          <MenuItem>
            {openmesshopage ? (
              <Typography onClick={handleMenualopage}>Manual Add</Typography>
            ) : (
              <Typography onClick={handleopenmesshopage}>
                From Meesho
              </Typography>
            )}
          </MenuItem>
          <Divider style={{ marginTop: "2px", marginBottom: "2px" }} />
          <MenuItem>
            {openflipcartpage ? (
              <Typography onClick={handleMenualopage}>Manual Add</Typography>
            ) : (
              <Typography onClick={handleopenflipcartpage}>
                From Flipcart
              </Typography>
            )}
          </MenuItem>
          <Divider style={{ marginTop: "2px", marginBottom: "2px" }} />
          <MenuItem>
            {openamazompage ? (
              <Typography onClick={handleMenualopage}>Manual Add</Typography>
            ) : (
              <Typography onClick={handleopenamazompage}>
                From Amazon
              </Typography>
            )}
          </MenuItem>
        </Menu>
      </Container>
      <Modal
        open={modelOpen}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="setmodeldisplay">
          <div>
            <Typography
              className="setmodeltypo"
              id="modal-modal-title"
              variant="h5"
              component="h2"
            >
              No Internet Connection
            </Typography>
          </div>
          <Divider />
          <div className="setbtndeldiv">
            <Button
              variant="contained"
              onClick={hanldemodelclose}
              className="canclebtn"
            >
              ok
            </Button>
          </div>
        </Box>
      </Modal>
      <Backdrop
        sx={{
          color: "#fff",
          backgroundColor: "#000000a1",
          zIndex: (theme) => theme.zIndex.drawer + 2,
        }}
        open={active}
      >
        <DotLoader color="white" />
      </Backdrop>
    </>
  );
}

export default PaymentRecive;
