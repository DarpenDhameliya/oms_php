import React, { useState, useEffect } from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Button from "@material-ui/core/Button";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import useStylesOrder from "./OrderStyle";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import AddOrderManualy from "./orderEntryPage/AddOrderManualy";
import AddMeeshofile from "./orderEntryPage/AddMeeshofile";
import AddFlipcartfile from "./orderEntryPage/AddFlipcartfile";
import AddAmazonfile from "./orderEntryPage/AddAmazonfile";
import { useSelector } from "react-redux";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Divider } from "@mui/material";

function OrderEntry() {
  const [manualopen, setManualopen] = useState(true);
  const [openmesshopage, setOpenmesshopage] = useState(false);
  const [openflipcartpage, setOpenflipcartpage] = useState(false);
  const [openamazompage, setOpenamazompage] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(null);
  const [modelcount, setModelcount] = useState(1);
  const [modelOpen, setModelOpen] = useState(0);
  const classes = useStylesOrder();
  const mobileMenunBoolean = Boolean(mobileMenu);

  const handleMobiblenenuClose = () => {
    setMobileMenu(null);
  };

  const sidebarstate = useSelector((state) => state.sidebardata);
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

  useEffect(() => {
    if (sidebarstate.status === true) {
      handleMenualopage();
    }
  },[sidebarstate]);

  const hanldemodelclose = () => {
    setModelOpen(0);
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

  return (
    <>
      <Container
        component="main"
        maxWidth="xl"
        className={classes.setcontainer}
      >
        <div className={classes.setheader}>
          <div>
            <Typography
              variant="h4"
              gutterBottom
              className={classes.setheading}
            >
              Order Entry
            </Typography>
          </div>
          <div className={classes.setmobileview}>
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
          </div>
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

        {manualopen && <AddOrderManualy />}

        {openmesshopage && <AddMeeshofile />}

        {openflipcartpage && <AddFlipcartfile />}

        {openamazompage && <AddAmazonfile />}
        <Modal
          open={modelOpen}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box className="setmodeldisplay">
            <div>
              {/* <WifiOffIcon /> */}
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
      </Container>
    </>
  );
}

export default OrderEntry;
