import React, { useState, useEffect } from "react";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { Link, useLocation } from "react-router-dom";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Collapse from "@mui/material/Collapse";
import ListItemIcon from "@mui/material/ListItemIcon";
import MailOutlineOutlinedIcon from "@mui/icons-material/MailOutlineOutlined";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import { useDispatch, useSelector } from "react-redux";
import { Divider, Tooltip } from "@mui/material";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import { SidebartrueSlice, SidebarfalseSlice } from "./slice/SidebarDataReducer";
import { userstate } from "../authenticate/slice/LoginRedux";
import { data } from "./slice/AppReducer";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import useStyleMainDisplay from "./MainDisplayStyle";
import PanoramaFishEyeIcon from '@mui/icons-material/PanoramaFishEye';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import MoneyIcon from '@mui/icons-material/Money';


export default function Sidebardata() {
  const [sublistOpenmaster, setSublistOpenmaster] = useState(false);
  const [sublistOpenreport, setSublistOpenReport] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const location = useLocation();
  const dispatch = useDispatch();
  const loginstatus = useSelector(userstate);
  const opensidebarstatsu = useSelector(data);

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };

  const handlemasterList = () => {
    setSelectedIndex(0);
    setSublistOpenReport(false);
    setSublistOpenmaster(false);
  };

  const hendlesublistmaster = (event, index) => {
    setSublistOpenmaster(!sublistOpenmaster);
    setSelectedIndex(index);
    setSublistOpenReport(false);
  };
  const hendlesublistreport = (event, index) => {
    setSublistOpenmaster(false);
    setSublistOpenReport(!sublistOpenreport);
    setSelectedIndex(index);
  };

  useEffect(() => {
    if (
      "/app/productlist" === location.pathname ||
      "/app/website" === location.pathname ||
      "/app/courier" === location.pathname ||
      "/app/bank" === location.pathname
    ) {
      setSelectedIndex(1);
    }
    if (
      "/app/order" === location.pathname ||
      "/app/payment" === location.pathname ||
      "/app/post_transaction" === location.pathname
    ) {
      setSelectedIndex(2);
    }
  });

  const handleOrderClick = (event) => {
    setSelectedIndex(0);
    setSublistOpenReport(false);
    setSublistOpenmaster(false);
    dispatch(SidebartrueSlice());

    setTimeout(() => {
      dispatch(SidebarfalseSlice());
    }, 1000);
  };

  const classes = useStyleMainDisplay(selectedIndex);
  const username = JSON.parse(localStorage.getItem("username"));
  const capitaluser = username.toUpperCase();
  let letter = capitaluser.charAt(0);
  return (
    <>
      <List className={classes.selectedindex}>
        <div className={classes.setviewforweb}>
          <div className={classes.seticonwithname}>
            <Avatar className={classes.setheaderavtarweb}>{letter}</Avatar>
            <Typography className={classes.setheadertypoweb}>
              {capitaluser}
            </Typography>
          </div>
        </div>
        <div className={classes.setviewforwebdivider}>
          <Divider
            variant="middle"
            style={{ borderColor: "#fff0f045", margin: "5px 5px" }}
          />{" "}
        </div>
        <Tooltip
          title={opensidebarstatsu.status ? "" : "Master"}
          placement="right"
        >
          <ListItemButton
            onClick={(event) => hendlesublistmaster(event)}
            className={classes.effectlist}
            selected={selectedIndex === 1}
          >
            <ListItemIcon style={{ minWidth: "45px" }}>
              <LibraryBooksIcon className={classes.setsidebaricon} />
            </ListItemIcon>
            <ListItemText primary="Master" className={classes.setsidebaricon} />
            {sublistOpenmaster ? (
              <ExpandLessIcon className={classes.setsidebaricon} />
            ) : (
              <ExpandMoreIcon className={classes.setsidebaricon} />
            )}
          </ListItemButton>
        </Tooltip>
        <Collapse
          in={sublistOpenmaster}
          timeout="auto"
          unmountOnExit
          sx={{ backgroundColor: "#2c3b41" }}
        >
          <List
            component="div"
            disablePadding
            className={classes.selectedsubindex}
          >
            <Tooltip
              title={opensidebarstatsu.status ? "" : "Product"}
              placement="right"
            >
              <ListItemButton
                button
                component={Link}
                to="/app/productlist"
                selected={"/app/productlist" === location.pathname ||'/app/productadd' === location.pathname}
                onClick={(event) => handleListItemClick(event, 1)}
                className={classes.effectlist}
              >
                <ListItemIcon style={{ minWidth: "45px" }}>
                  <PanoramaFishEyeIcon className={classes.setsidebaricon} />
                </ListItemIcon>
                <ListItemText
                  primary="Product"
                  className={classes.setsidebaricon}
                />
              </ListItemButton>
            </Tooltip>
            <Divider sx={{ paddingTop: 0.1 }} />
            <Tooltip
              title={opensidebarstatsu.status ? "" : "Website"}
              placement="right"
            >
              <ListItemButton
                button
                component={Link}
                to="/app/website"
                selected={"/app/website" === location.pathname}
                onClick={(event) => handleListItemClick(event, 1)}
                className={classes.effectlist}
              >
                <ListItemIcon style={{ minWidth: "45px" }}>
                  <PanoramaFishEyeIcon className={classes.setsidebaricon} />
                </ListItemIcon>
                <ListItemText
                  primary="Website"
                  className={classes.setsidebaricon}
                />
              </ListItemButton>
            </Tooltip>
            <Divider sx={{ paddingTop: 0.1 }} />
            <Tooltip
              title={opensidebarstatsu.status ? "" : "Courier"}
              placement="right"
            >
              <ListItemButton
                button
                component={Link}
                to="/app/courier"
                selected={"/app/courier" === location.pathname}
                onClick={(event) => handleListItemClick(event, 1)}
                className={classes.effectlist}
              >
                <ListItemIcon style={{ minWidth: "45px" }}>
                  <PanoramaFishEyeIcon className={classes.setsidebaricon} />
                </ListItemIcon>
                <ListItemText
                  primary="Courier"
                  className={classes.setsidebaricon}
                />
              </ListItemButton>
            </Tooltip>

            <Divider sx={{ paddingTop: 0.1 }} />
            <Tooltip
              title={opensidebarstatsu.status ? "" : "Bank Master"}
              placement="right"
            >
              <ListItemButton
                button
                component={Link}
                to="/app/bank"
                selected={"/app/bank" === location.pathname}
                onClick={(event) => handleListItemClick(event, 1)}
                className={classes.effectlist}
              >
                <ListItemIcon style={{ minWidth: "45px" }}>
                  <PanoramaFishEyeIcon className={classes.setsidebaricon} />
                </ListItemIcon>
                <ListItemText
                  primary="Bank Master"
                  className={classes.setsidebaricon}
                />
              </ListItemButton>
            </Tooltip>
          </List>
        </Collapse>
        {/* master end ------- */}

        {/* order entry */}
        <Tooltip
          title={opensidebarstatsu.status ? "" : "Order Entry"}
          placement="right"
        >
          <ListItemButton
            button
            component={Link}
            to="/app/orderadd"
            selected={"/app/orderadd" === location.pathname}
            onClick={handleOrderClick}
            className={classes.effectlist}
          >
            <ListItemIcon style={{ minWidth: "45px" }}>
              <LibraryBooksIcon className={classes.setsidebaricon} />
            </ListItemIcon>
            <ListItemText
              primary="Order Entry"
              className={classes.setsidebaricon}
            />
          </ListItemButton>
        </Tooltip>

        {/* order Detail */}
        <Tooltip
          title={opensidebarstatsu.status ? "" : "Order Detail"}
          placement="right"
        >
          <ListItemButton
            button
            component={Link}
            to="/app/orderdata"
            selected={"/app/orderdata" === location.pathname}
            onClick={handlemasterList}
            className={classes.effectlist}
          >
            <ListItemIcon style={{ minWidth: "45px" }}>
              <InsertDriveFileIcon className={classes.setsidebaricon} />
            </ListItemIcon>
            <ListItemText
              primary="Order Detail"
              className={classes.setsidebaricon}
            />
          </ListItemButton>
        </Tooltip>

        {/* pickup entry */}
        <Tooltip
          title={opensidebarstatsu.status ? "" : "Pickup Entry"}
          placement="right"
        >
          <ListItemButton
            button
            component={Link}
            to="/app/pickup"
            selected={"/app/pickup" === location.pathname}
            onClick={handlemasterList}
            className={classes.effectlist}
          >
            <ListItemIcon style={{ minWidth: "45px" }}>
              <LocalShippingIcon className={classes.setsidebaricon} />
            </ListItemIcon>
            <ListItemText
              primary="Pickup Entry"
              className={classes.setsidebaricon}
            />
          </ListItemButton>
        </Tooltip>

        {/* payment receive */}
        <Tooltip
          title={opensidebarstatsu.status ? "" : "Payment Receive"}
          placement="right"
        >
          <ListItemButton
            button
            component={Link}
            to="/app/paymentreceive"
            selected={"/app/paymentreceive" === location.pathname}
            onClick={handlemasterList}
            className={classes.effectlist}
          >
            <ListItemIcon style={{ minWidth: "45px" }}>
              <MoneyIcon className={classes.setsidebaricon} />
            </ListItemIcon>
            <ListItemText
              primary="Payment Receive"
              className={classes.setsidebaricon}
            />
          </ListItemButton>
        </Tooltip>

        {/* order Return */}
        <Tooltip
          title={opensidebarstatsu.status ? "" : "Order Return"}
          placement="right"
        >
          <ListItemButton
            button
            component={Link}
            to="/app/order_return"
            selected={"/app/order_return" === location.pathname}
            onClick={handlemasterList}
            className={classes.effectlist}
          >
            <ListItemIcon style={{ minWidth: "45px" }}>
              <MoneyIcon className={classes.setsidebaricon} />
            </ListItemIcon>
            <ListItemText
              primary="Order Return"
              className={classes.setsidebaricon}
            />
          </ListItemButton>
        </Tooltip>

        {/* report start */}
        <Tooltip
          title={opensidebarstatsu.status ? "" : "Report"}
          placement="right"
        >
          <ListItemButton
            onClick={(event) => hendlesublistreport(event)}
            className={classes.effectlist}
            selected={selectedIndex === 2}
          >
            <ListItemIcon style={{ minWidth: "45px" }}>
              <LibraryBooksIcon className={classes.setsidebaricon} />
            </ListItemIcon>
            <ListItemText primary="Report" className={classes.setsidebaricon} />
            {sublistOpenreport ? (
              <ExpandLessIcon className={classes.setsidebaricon} />
            ) : (
              <ExpandMoreIcon className={classes.setsidebaricon} />
            )}
          </ListItemButton>
        </Tooltip>
        <Collapse
          in={sublistOpenreport}
          timeout="auto"
          unmountOnExit
          sx={{ backgroundColor: "#2c3b41" }}
        >
          <List
            component="div"
            disablePadding
            className={classes.selectedsubindex}
          >
            <Tooltip
              title={opensidebarstatsu.status ? "" : "Order Report"}
              placement="right"
            >
              <ListItemButton
                button
                component={Link}
                to="/app/order"
                selected={"/app/order" === location.pathname}
                className={classes.effectlist}
              >
                <ListItemIcon style={{ minWidth: "45px" }}>
                  <PanoramaFishEyeIcon className={classes.setsidebaricon} />
                </ListItemIcon>
                <ListItemText
                  primary="Order Report"
                  className={classes.setsidebaricon}
                />
              </ListItemButton>
            </Tooltip>
            <Divider sx={{ paddingTop: 0.1 }} />
            <Tooltip
              title={opensidebarstatsu.status ? "" : "Payment Recive Report"}
              placement="right"
            >
              <ListItemButton
                button
                component={Link}
                to="/app/payment"
                selected={"/app/payment" === location.pathname}
                className={classes.effectlist}
              >
                <ListItemIcon style={{ minWidth: "45px" }}>
                  <PanoramaFishEyeIcon className={classes.setsidebaricon} />
                </ListItemIcon>
                <ListItemText
                  primary="Payment Report"
                  className={classes.setsidebaricon}
                />
              </ListItemButton>
            </Tooltip>
            <Divider sx={{ paddingTop: 0.1 }} />

            <Tooltip
              title={opensidebarstatsu.status ? "" : "Transaction Report"}
              placement="right"
            >
              <ListItemButton
                button
                component={Link}
                to="/app/post_transaction"
                selected={"/app/post_transaction" === location.pathname}
                className={classes.effectlist}
              >
                <ListItemIcon style={{ minWidth: "45px" }}>
                  <PanoramaFishEyeIcon className={classes.setsidebaricon} />
                </ListItemIcon>
                <ListItemText
                  primary="Transaction Report"
                  className={classes.setsidebaricon}
                />
              </ListItemButton>
            </Tooltip>
          </List>
        </Collapse>
        {/* report end */}
        {/* <Tooltip
          title={opensidebarstatsu.status ? "" : "Pickup Entry"}
          placement="right"
        >
          <ListItemButton
            button
            component={Link}
            to="/"
            onClick={handlelogout}
            className={classes.effectlistlogout}
          >
            <ListItemIcon style={{ minWidth: "45px" }}>
              <MailOutlineOutlinedIcon className={classes.setsidebaricon} />
            </ListItemIcon>
            <ListItemText
              primary="Log Out"
              className={classes.setsidebaricon}
            />
          </ListItemButton>
        </Tooltip> */}
      </List>
    </>
  );
}

{
  /* <ListItemButton
          onClick={(event) => hendlesublistmaster(event, 1)}
          className={classes.effectlist}
          selected={selectedIndex === 1}
        >
          <ListItemIcon style={{ minWidth: "45px" }}>
            <LibraryBooksIcon className={classes.setsidebaricon} />
          </ListItemIcon>
          <ListItemText primary="Master" className={classes.setsidebaricon} />
          {sublistOpenmaster ? (
            <ExpandLessIcon className={classes.setsidebaricon} />
          ) : (
            <ExpandMoreIcon className={classes.setsidebaricon} />
          )}
        </ListItemButton>
        <Collapse
          in={sublistOpenmaster}
          timeout="auto"
          unmountOnExit
          sx={{ backgroundColor: "#2c3b41" }}
        >
          <List component="div" disablePadding>
            <ListItemButton
              button
              component={Link}
              to="/app/productlist"
              selected={selectedSubIndex === 1 && selectedIndex === 1}
              onClick={(event) => handleListItemClick(event, 1, 1)}
              className={classes.effectlist}
            >
              <ListItemIcon
                style={{ minWidth: "45px" }}
                className={classes.seticonbtn}
              >
                <NotificationsNoneIcon className={classes.setsidebaricon} />
              </ListItemIcon>
              <ListItemText
                primary="Product"
                className={classes.setsidebaricon}
              />
            </ListItemButton>
            <Divider sx={{ paddingTop: 0.1 }} />
            <ListItemButton
              button
              component={Link}
              to="/app/website"
              selected={selectedSubIndex === 2 && selectedIndex === 1}
              onClick={(event) => handleListItemClick(event, 1, 2)}
              className={classes.effectlist}
            >
              <ListItemIcon style={{ minWidth: "45px" }}>
                <NotificationsNoneIcon className={classes.setsidebaricon} />
              </ListItemIcon>
              <ListItemText
                primary="Website"
                className={classes.setsidebaricon}
              />
            </ListItemButton>
            <Divider sx={{ paddingTop: 0.1 }} />
            <ListItemButton
              button
              component={Link}
              to="/app/courier"
              selected={selectedSubIndex === 3 && selectedIndex === 1}
              onClick={(event) => handleListItemClick(event, 1, 3)}
              className={classes.effectlist}
            >
              <ListItemIcon style={{ minWidth: "45px" }}>
                <NotificationsNoneIcon className={classes.setsidebaricon} />
              </ListItemIcon>
              <ListItemText
                primary="Courier"
                className={classes.setsidebaricon}
              />
            </ListItemButton>
            <Divider sx={{ paddingTop: 0.1 }} />
            <ListItemButton
              button
              component={Link}
              to="/app/bank"
              selected={selectedSubIndex === 4 && selectedIndex === 1}
              onClick={(event) => handleListItemClick(event, 1, 4)}
              className={classes.effectlist}
            >
              <ListItemIcon style={{ minWidth: "45px" }}>
                <NotificationsNoneIcon className={classes.setsidebaricon} />
              </ListItemIcon>
              <ListItemText
                primary="Bank Master"
                className={classes.setsidebaricon}
              />
            </ListItemButton>
          </List>
        </Collapse> */
}
