import React, { useState, useEffect } from "react";
import Container from "@mui/material/Container";
import { Grid, Paper } from "@material-ui/core";
import Typography from "@mui/material/Typography";
import Button from "@material-ui/core/Button";
import useStylesOrder from "./OrderStyle";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import { styled } from "@mui/material/styles";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableContainer from "@mui/material/TableContainer";
import { Divider } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import { Liststate, ListFetch } from "../commonLink/ListApi";
import { useDispatch, useSelector } from "react-redux";
import { orderType, orderStatus } from "../commonLink/OrderList";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Backdrop from "@mui/material/Backdrop";
import { DotLoader } from "react-spinners";
import moment from "moment";
import DatePicker from "react-date-picker/dist/entry.nostyle";
import "react-calendar/dist/Calendar.css";
import "react-date-picker/dist/DatePicker.css";
import {
  OrderReturnfetchSlice,
  Orderreturnfetchstate,
  Orderreturnfetchstatus,
} from "./slice/OrderReturnfetchSlice";
import {
  OrderReturnSendSlice,
  Orderreturnsendstate,
  Orderreturnsendstatus,
} from "./slice/OrderReturnSend";
import {
  Orderreturnuncheckstatus,
  Orderreturnuncheckstate,
} from "./slice/OrderReturnUncheck";
import { useHistory } from "react-router-dom";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

function OrderReturn() {
  const [openrecord, setOpenrecord] = useState(false);
  const [active, setActive] = useState(false);
  const [dberr, setDberr] = useState("");
  const [returnResion, setReturnResion] = useState("");
  const [returnRessionList, setReturnRessionList] = useState([]);
  const [returnstatus, setReturnstatus] = useState("");
  const [awbid, setAwbid] = useState("");
  const [date, setDate] = useState("");
  const [awbErr, setAwbErr] = useState("");
  const [returndata, setReturndata] = useState([]);
  const [modelcount, setModelcount] = useState(1);
  const [modelOpen, setModelOpen] = useState(0);
  const [disabled, setDisabled] = useState(true);
  const [errors, setErrors] = useState([]);
  const [sendingData, setSendingData] = useState([]);
  // const [odrReturnErr, setOdrReturnErr] = useState("");

const [dbSendErr, setDbSendErr] = useState([])  
const [payEntryErr, setPayEntryErr] = useState("");
  const classes = useStylesOrder();
  const dispatch = useDispatch();
  const liststate = useSelector(Liststate);
  const fetchdata = useSelector(Orderreturnfetchstate);
  const senddatastate = useSelector(Orderreturnsendstate);
  const returnUncheckstate = useSelector(Orderreturnuncheckstate);
  const history = useHistory();
  const notify = () =>
    toast.success("Data Update Successfully ..  ", {
      autoClose: 3000,
    });
  // const handledate = (e) => {
  //   setDate(e.target.value);
  // };
  const handleawbid = (e) => {
    setAwbid(e.target.value);
    setAwbErr("");
  };
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

  const handlelogout = () => {
    localStorage.removeItem("userdata");
    localStorage.removeItem("username");
    localStorage.removeItem("useremail");
    history.push("/");
    window.location.reload();
  };
  useEffect(() => {
    if (navigator.onLine == true) {
      dispatch(ListFetch());
    } else {
      setModelOpen(1);
      setModelcount(2);
    }
  }, []);

  const handleopenbykey = (e) => {
    if (e.key === "Enter") {
      handlesendawb();
    }
  };

  useEffect(() => {
    if (liststate.status === "succeeded") {
      setReturnRessionList(liststate.List.list.return_reason_list);
    }

    // data fetch
    if (fetchdata.status === "loading") {
      setActive(true);
    } else if (fetchdata.status === "succeeded") {
      setOpenrecord(true);
      setActive(false);
      if (returndata.length === 0) {
        setAwbid("");
        setReturndata(fetchdata.response.data);
      } else {
        let index = returndata.findIndex(
          (object) => object.o_id == fetchdata.response.data[0].o_id
        );
        if (index === -1) {
          setAwbid("");
          setReturndata((prevArray) => [
            ...prevArray,
            fetchdata.response.data[0],
          ]);
        } else {
          setPayEntryErr("Record already exist");
          setAwbid("");
          setTimeout(() => {
            setPayEntryErr("");
          }, 4000);
        }
      }

      dispatch(Orderreturnfetchstatus());
    } else if (fetchdata.status === "failed") {
      setActive(false);
      if (fetchdata.error.errors == "token expire") {
        handlelogout();
      } else {
        setDberr(fetchdata.error.errors);
        setTimeout(() => {
          setDberr([]);
        }, 4000);
      }
      dispatch(Orderreturnfetchstatus());
    } else {
    }

  },[fetchdata, liststate]);

// send final data send
  useEffect(() => {
    if (senddatastate.status === "loading") {
    } else if (senddatastate.status === "succeeded") {
      setDate("");
      setReturnstatus("");
      setReturnResion("");
      errStatus = false;
      errStatusReasion = false
      notify();
      let data = returnUncheckstate.response.payload.Extra_data;
      if (data.length === 0) {
        setReturndata([]);
        setOpenrecord(false);
      } else {
        setReturndata(data);
      }
      dispatch(Orderreturnsendstatus());
    } else if (senddatastate.status === "failed") {
      setDbSendErr(senddatastate.error.errors);
      setTimeout(() => {
        setDbSendErr([])
      }, 3000);
      dispatch(Orderreturnsendstatus());
    } else {
    }
  }, [senddatastate.status === "loading" , senddatastate.status === "succeeded" ,senddatastate.status === "failed"])
  

  // status change
  const handleReturnstatusChange = (index, data) => (e) => {
    if (data.isChecked) {
      let Array = [...returndata];
      Array[index]["order_status"] = e.target.value;
      setReturndata(Array);
    }
    setReturnstatus({ ...returnstatus, [index]: e.target.value });
  };

  // reasion change
  const handlereturnResionChange = (index) => (e) => {
    let Array = [...returndata];
    Array[index]["return_reason"] = e.target.value;
    setReturndata(Array);
    setReturnResion({ ...returnResion, [index]: e.target.value });
  };

  // fetch data api
  const handlesendawb = () => {
    if (navigator.onLine == true) {
      if (!awbid) {
        setAwbErr("Id Required !!");
        setTimeout(() => {
          setAwbErr("");
        }, 4000);
      } else {
        dispatch(OrderReturnfetchSlice({ order_id: awbid }));
      }
    } else {
      setModelOpen(1);
      setModelcount(2);
    }
  };

  // checkbox handle
  const handleOnChange = (e) => {
    const { name, checked } = e.target;

    if (e.target.name === "allselect") {
      const tempUser = returndata.map((user) => {
        return { ...user, isChecked: checked };
      });
      setReturndata(tempUser);
    } else {
      let tempUser = returndata.map((user) =>
        user.o_id == name ? { ...user, isChecked: checked } : user
      );
      setReturndata(tempUser);
    }
  };
  var errStatus = false;
  var errStatusReasion = false
  // send selected data ..  api
  const handleadddata = (e) => {
    if (navigator.onLine == true) {
      const Extra_data = [];
      let tempData = returndata.map((e) => {
        if (e.isChecked) {
          if (e.return_reason == null) {
            if (
              e.order_status == 2 ||
              e.order_status == 1 ||
              e.order_status == 3
            ) {
              return {
                ...e,
                status_error: "Required !!",
                return_reason_error: "Required !!",
              };
            } else {
              return { ...e, return_reason_error: "Required !!" };
            }
          } else {
            if (
              e.order_status == 2 ||
              e.order_status == 1 ||
              e.order_status == 3
            ) {
              return { ...e, status_error: "Required !!" };
            } else {
              return { ...e };
            }
          }
        } else {
          Extra_data.push(e);
        }
      });
      let chehckerr = 0;
      const sending_data = [];
      {
        returndata.map((e) => {
          {
            tempData.map((data) => {
              if (!data) {
              } else {
                if (data.o_id === e.o_id) {
                  sending_data.push(data);
                  if (data.status_error !== undefined) {
                    chehckerr = chehckerr + 1;
                  }
                }
              }
            });
          }
        });
      }
      setSendingData(sending_data);
      if (!date || sending_data.length === 0 || chehckerr !== 0) {
        if (!date) {
          errors.date = "Date Required";
        } else {
          errors.date = "";
        }

        if (sending_data.length === 0) {
          errors.isCheck = "Please select data";
        } else {
          errors.isCheck = "";
        }

        setErrors({ ...errors, [e.target.name]: e.target.value });
        setTimeout(() => {
          setErrors([]);
        }, 4000);
      } else {
        const stdate = moment(date).format('YYYY-MM-DD')
        dispatch(
          OrderReturnSendSlice({ data: sending_data, return_date: stdate})
        );
        dispatch(Orderreturnuncheckstatus({ Extra_data }));
      }
    } else {
      setModelOpen(1);
      setModelcount(2);
    }
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
        <div className={classes.setpageheading}>
          <Typography variant="h4" gutterBottom className={classes.setheading}>
            Order Return
          </Typography>
        </div>
        <Paper className={classes.setProductpaper} elevation={5}>
          <Grid container spacing={2} style={{ marginTop: "10px" }}>
            <Grid item xs={12} sm={6} md={5}>
              <div className={classes.setinsidegrid}>
                <Typography className={classes.setlabel}>
                  Order Id / AWB :
                </Typography>
                <TextField
                  id="outlined-basic"
                  size="small"
                  variant="outlined"
                  label={awbid === "" ? "Enter id" : ""}
                  value={awbid}
                  onChange={handleawbid}
                  onKeyPress={handleopenbykey}
                  InputLabelProps={{ shrink: false }}
                  className={classes.settextfield}
                />
              </div>
              {awbErr && (
                <Typography className={classes.seterrorlabel}>
                  {awbErr}{" "}
                </Typography>
              )}
              {payEntryErr && (
                <Typography className={classes.seterrorlabel}>
                  {payEntryErr}{" "}
                </Typography>
              )}
              {dberr && (
                <Typography className={classes.seterrorlabel}>
                  {dberr}{" "}
                </Typography>
              )}
            </Grid>
            <Grid
              item
              xs={12}
              sm={6}
              md={7}
              className={classes.setinputlayoutforodrbtn}
            >
              <Button
                variant="contained"
                className={classes.setproductbtnsendspecific}
                onClick={handlesendawb}
              >
                Search
              </Button>
            </Grid>
          </Grid>
        </Paper>

        {openrecord && (
          <Paper className={classes.setProductpaper} elevation={5}>
            <Grid container spacing={2}>
              <Grid
                item
                xs={12}
                sm={6}
                md={4}
                className={classes.setinputlayout}
              >
                <div>
                  <Typography className={classes.setlabel}>
                    Return date
                  </Typography>
                  {/* <TextField
                    id="outlined-basic"
                    size="small"
                    type="date"
                    variant="outlined"
                    value={date}
                    onChange={handledate}
                    className={classes.settextfield}
                  /> */}
                  <DatePicker
                  onChange={(e) => setDate(e)}
                  value={date}
                  format={"dd/MM/yyyy"}
                  dayPlaceholder={"dd"}
                  monthPlaceholder={"mm"}
                  yearPlaceholder={"yyyy"}
                  className={classes.setdatepicker1}
                />
                </div>
                {errors.date && (
                  <Typography className={classes.seterrorlabel}>
                    {errors.date}{" "}
                  </Typography>
                )}
              </Grid>
            </Grid>
            <Divider className={classes.setdividerstyle} />
            {errors.isCheck && (
              <Typography className={classes.seterrorlabel}>
                {errors.isCheck}
              </Typography>
            )}
            <TableContainer>
              <Table stickyHeader className={classes.settable}>
                <TableHead>
                  <TableRow>
                    <TableCell align="center" className={classes.tableth}>
                      <Checkbox
                        checked={
                          !returndata.some((user) => user?.isChecked !== true)
                        }
                        onChange={handleOnChange}
                        name="allselect"
                      />{" "}
                    </TableCell>
                    <TableCell align="center" className={classes.tableth}>
                      Product
                    </TableCell>
                    <TableCell align="center" className={classes.tableth}>
                      Order Id
                    </TableCell>
                    <TableCell align="center" className={classes.tableth}>
                      AWB
                    </TableCell>
                    <TableCell align="center" className={classes.tableth}>
                      Order Type
                    </TableCell>
                    <TableCell
                      align="center"
                      className={classes.tableth}
                      style={{ minWidth: "100px" }}
                    >
                      Order Status
                    </TableCell>
                    <TableCell
                      align="center"
                      className={classes.tableth}
                      style={{ minWidth: "100px" }}
                    >
                      Return Reason
                    </TableCell>
                    <TableCell align="center" className={classes.tableth}>
                      Website
                    </TableCell>
                    <TableCell align="center" className={classes.tableth}>
                      Courier
                    </TableCell>
                    <TableCell align="center" className={classes.tableth}>
                      qty
                    </TableCell>
                    <TableCell align="center" className={classes.tableth}>
                      Order Amount
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {returndata.map((e, index) => {
                    return (
                      <>
                        <StyledTableRow key={e.o_id}>
                          <StyledTableCell
                            align="center"
                            component="th"
                            scope="row"
                            className={classes.tabletd}
                          >
                            <Checkbox
                              name={e.o_id}
                              checked={e?.isChecked || false}
                              onChange={handleOnChange}
                            />
                          </StyledTableCell>
                          <StyledTableCell
                            className={classes.tabletd}
                            align="center"
                          >
                            {e.product_name}
                          </StyledTableCell>
                          <StyledTableCell
                            className={classes.tabletd}
                            align="center"
                          >
                            {e.order_id}
                          </StyledTableCell>
                          <StyledTableCell
                            className={classes.tabletd}
                            align="center"
                          >
                            {e.awb_no}
                          </StyledTableCell>
                          <StyledTableCell
                            className={classes.tabletd}
                            align="center"
                          >
                            {orderType.map((ea) => {
                              if (e.order_type == ea.value) {
                                return (
                                  <Typography
                                    className={classes.tabletd}
                                    key={ea.value}
                                  >
                                    {ea.label}
                                  </Typography>
                                );
                              }
                            })}
                          </StyledTableCell>
                          {sendingData.map((data) => {
                              if (data.o_id === e.o_id) {
                                if (data.status_error) {
                                    errStatus = true
                                }
                              }
                            })}
                          <StyledTableCell
                            className={classes.tabletd}
                            align="center"
                          >
                            <TextField
                              disabled={!e.isChecked && disabled}
                              error = {errStatus}
                              fullWidth
                              size="small"
                              select
                              name={index}
                              border={"2px solid red"}
                              placeholder="select status"
                              className={classes.textField}
                              value={returnstatus[index]}
                              onChange={handleReturnstatusChange(index, e)}
                              InputLabelProps={{ shrink: false }}
                              margin="normal"
                              variant="outlined"
                            >
                              {orderStatus.map((e) => {
                                if (
                                  e.value == 4 ||
                                  e.value == 5 ||
                                  e.value == 6 ||
                                  e.value == 7
                                ) {
                                  return (
                                    <MenuItem key={e.value} value={e.value}>
                                      {e.label}
                                    </MenuItem>
                                  );
                                }
                              })}
                            </TextField>
                          </StyledTableCell>
                          {sendingData.map((data) => {
                            if (data.o_id === e.o_id) {
                              if (data.return_reason_error) {
                                errStatusReasion = true
                              }
                            }
                          })}
                          <StyledTableCell
                            className={classes.tabletd}
                            align="center"
                          >
                            <TextField
                              disabled={!e.isChecked && disabled}
                              fullWidth
                              error = {errStatusReasion}
                              size="small"
                              select
                              className={classes.textField}
                              value={returnResion[index]}
                              onChange={handlereturnResionChange(index)}
                              InputLabelProps={{ shrink: false }}
                              margin="normal"
                              variant="outlined"
                            >
                              <MenuItem value="">Select Reason.</MenuItem>
                              {returnRessionList.map((e) => {
                                return (
                                  <MenuItem key={e.value} value={e.value}>
                                    {e.label}
                                  </MenuItem>
                                );
                              })}
                            </TextField>
                            {/* {sendingData.map((data) => {
                            if (data.o_id === e.o_id) {
                              if (data.return_reason_error) {
                                return (
                                  <Typography className={classes.seterrorlabel}>
                                    {data.return_reason_error}
                                  </Typography>
                                );
                              }
                            }
                          })} */}
                          </StyledTableCell>
                          <StyledTableCell
                            className={classes.tabletd}
                            align="center"
                          >
                            {e.website_name}
                          </StyledTableCell>
                          <StyledTableCell
                            className={classes.tabletd}
                            align="center"
                          >
                            {e.courier_name}
                          </StyledTableCell>
                          <StyledTableCell
                            className={classes.tabletd}
                            align="center"
                          >
                            {e.qty}
                          </StyledTableCell>
                          <StyledTableCell
                            className={classes.tabletd}
                            align="center"
                          >
                            {e.order_amount}
                          </StyledTableCell>
                        </StyledTableRow>
                        {/* <TableRow>
                          <TableCell  colSpan={3}>
                            {sendingData.map((data) => {
                              if (data.o_id === e.o_id) {
                                if (data.status_error) {
                                  return (
                                    <Typography
                                      className={classes.seterrorlabel}
                                    >
                                      {" "}
                                      Order Status :{data.status_error}
                                    </Typography>
                                  );
                                }
                              }
                            })}
                          </TableCell>
                          <TableCell  colSpan={8}>
                            {sendingData.map((data) => {
                              if (data.o_id === e.o_id) {
                                if (data.return_reason_error) {
                                  return (
                                    <Typography
                                      className={classes.seterrorlabel}
                                    >
                                      Return Reason :{data.return_reason_error}
                                    </Typography>
                                  );
                                }
                              }
                            })}
                          </TableCell>
                        </TableRow> */}
                      </>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
            <div className={classes.setfiltericon}>
            {dbSendErr && (
              <Typography className={classes.seterrorlabel}>
                {dbSendErr}
              </Typography>
            )}
              <Button
                variant="contained"
                className={classes.setproductbtnsend}
                onClick={handleadddata}
              >
                Save
              </Button>
            </div>
          </Paper>
        )}
      </Container>
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

export default OrderReturn;
