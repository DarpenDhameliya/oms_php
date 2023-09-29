import React, { useState, useEffect } from "react";
import Container from "@mui/material/Container";
import { Grid, Paper } from "@material-ui/core";
import Typography from "@mui/material/Typography";
import useStylesPickupEntry from "../../pickup/PickupEntryStyle";
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
import "react-toastify/dist/ReactToastify.css";
import Backdrop from "@mui/material/Backdrop";
import { DotLoader } from "react-spinners";
import { useDispatch, useSelector } from "react-redux";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import moment from "moment";
import DatePicker from "react-date-picker/dist/entry.nostyle";
import "react-calendar/dist/Calendar.css";
import "react-date-picker/dist/DatePicker.css";
import {
  Paymentreceivestate,
  Paymentreceivechangestatus,
  PaymentReceiveSlice,
} from "./Slice/PaymentReceiveSlice";
import { orderType } from "../../commonLink/OrderList";
// import {
//   Paymentcheckstatus,
//   Paymentcheckstate,
//   PaymentCheckSlice,
// } from "./Slice/PaymentcheckedSlice";
import { PaymentSubmitSlice, Paymentsubmitchangestatus, Paymentsubmitstate } from "./Slice/PaymentcheckedSlice";

import {
  paymentuncheckstatus,
  Paymentuncheckstate,
} from "./Slice/PaymentUncheckSlice";
import { useHistory } from "react-router-dom";

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

function Manual() {
  const classes = useStylesPickupEntry();
  const [openRecord, setOpenRecord] = useState(false);
  const [awbid, setAwbid] = useState("");
  const [date, setDate] = useState("");
  const [awbErr, setAwbErr] = useState("");
  const [payEntryErr, setPayEntryErr] = useState("");
  const [paymentList, setPaymentList] = useState([]);
  const [disabled, setDisabled] = useState(true)
  const [checkErr, setCheckErr] = useState('')
  const [errors, setErrors] = useState([]);
  const [sendingData, setSendingData] = useState([]);
  const [dberr, setDberr] = useState("");
  const [dbsenderr, setDbsenderr] = useState([])
  const [active, setActive] = useState(false);
  const [modelcount, setModelcount] = useState(1);
  const [modelOpen, setModelOpen] = useState(0);

  const dispatch = useDispatch();
  const paymentreceivestates = useSelector(Paymentreceivestate);
  const Paymenttodb = useSelector(Paymentsubmitstate)
  const paymentuncheckstate = useSelector(Paymentuncheckstate);
const history = useHistory();
  const notify = () =>
    toast.success("Payment Update Successfully ..  ", {
      autoClose: 3000,
    });

  const handleawbid = (e) => {
    setAwbid(e.target.value);
    setAwbErr("");
  };

  const handlelogout = () => {
    localStorage.removeItem("userdata");
    localStorage.removeItem("username");
    localStorage.removeItem("useremail");
    history.push("/");
    window.location.reload();
  };
  useEffect(() => {
    if (paymentreceivestates.status === "loading") {
      setActive(true);
    } else if (paymentreceivestates.status === "succeeded") {
      console.log(paymentreceivestates);
      setOpenRecord(true);
      setActive(false);
      if (paymentList.length === 0) {
        setAwbid("");
        setPaymentList(paymentreceivestates.response.data);
      } else {
        let index = paymentList.findIndex(
          (object) => object.o_id == paymentreceivestates.response.data[0].o_id
        );
        if (index === -1) {
          setAwbid("");
          setPaymentList((prevArray) => [
            ...prevArray,
            paymentreceivestates.response.data[0],
          ]);
        } else {
          setPayEntryErr("Record already exist");
          setAwbid("");
          setTimeout(() => {
            setPayEntryErr("");
          }, 4000);
        }
      }
      dispatch(Paymentreceivechangestatus());
    } else if (paymentreceivestates.status === "failed") {
      setActive(false);
      if (paymentreceivestates.error.errors == 'token expire') {
        handlelogout();
      } else {
        setDberr(paymentreceivestates.error.errors);
        setTimeout(() => {
          setDberr("");
        }, 4000);
      }
      dispatch(Paymentreceivechangestatus());
    } else {
    }

    if (Paymenttodb.status === "loading") {
      setActive(true);
    } else if (Paymenttodb.status === "succeeded") {
      setActive(false);
      notify();
      errStatus = false
      setDate("");
      setPaymentList([]);
      const data = paymentuncheckstate.response.payload.Extra_data;
      if (data.length === 0) {
        setOpenRecord(false);
      } else {
        setPaymentList(data);
      }
      dispatch(Paymentsubmitchangestatus())
    } else if (Paymenttodb.status === "failed") {
      setActive(false);
    } else {

    }
  });

  const handleopenbykey = (e) => {
    if (e.key === "Enter") {
      handlesendawb();
    }
  };

  // fetch data 
  const handlesendawb = () => {
    if (navigator.onLine == true) {

      if (!awbid) {
        setAwbErr("Id Required !!");
        setTimeout(() => {
          setAwbErr("");
        }, 4000);
      } else {
        dispatch(PaymentReceiveSlice({ order_id: awbid }));
      }
    } else {
      setModelOpen(1);
      setModelcount(2);
    }
  };

  var errStatus = false
  const handleawbdisplay = (index, data) => (e) => {
    if (data.isChecked) {
      let Array = [...paymentList];
      Array[index]["receive_amount"] = e.target.value;
      setPaymentList(Array);
    }
  };

  const handleOnChange = (e) => {
    const { name, checked } = e.target;

    if (e.target.name === "allselect") {
      const tempUser = paymentList.map((user) => {
        return { ...user, isChecked: checked };
      });
      setPaymentList(tempUser);
    } else {
      let tempUser = paymentList.map((user) =>
        user.o_id == name ? { ...user, isChecked: checked } : user
      );
      setPaymentList(tempUser);
    }
  };

  const handlefinaldata = (e) => {
    if (navigator.onLine == true) {
      const Extra_data = [];
      let tempData = paymentList.map((e) => {
        if (e.isChecked) {
          if (e.receive_amount === null || e.receive_amount === '') {
            return { ...e, Amount_error: "Amount is Required" };
          } else {
            return { ...e };
          }
        } else {
          Extra_data.push(e);
        }
      });
      let chehckerr = 0;
      const sending_data = [];
      {
        paymentList.map((e) => {
          {
            tempData.map((data) => {
              if (!data) {
              } else {
                if (data.o_id === e.o_id) {
                  sending_data.push(data);
                  if (data.amount_error !== undefined) {
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
        dispatch(PaymentSubmitSlice({ data: sending_data, amountreceive_date: stdate }))
        dispatch(paymentuncheckstatus({ Extra_data }));
      }
    } else {
      setModelOpen(1);
      setModelcount(2);
    }
  };
  return <>
    <Paper className={classes.setProductpaper} elevation={5}>
      <Grid container spacing={2} style={{ marginTop: "10px" }}>
        <Grid item xs={12} sm={6} md={5}>
          <div className={classes.setinsidegrid}>
            <Typography className={classes.setlabel}>
              Order Id / AWB :
            </Typography>
            <TextField
              fullWidth
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
          {payEntryErr && (
            <Typography className={classes.seterrorlabel}>
              {payEntryErr}{" "}
            </Typography>
          )}
          {awbErr && (
            <Typography className={classes.seterrorlabel}>
              {awbErr}{" "}
            </Typography>
          )}
          {dberr && (
            <Typography className={classes.seterrorlabel}>
              {dberr}{" "}
            </Typography>
          )}
        </Grid>
        <Grid item xs={12} sm={6} md={7}>
          <Button
            variant="contained"
            className={classes.setproductbtnsend}
            onClick={handlesendawb}
          >
            Save
          </Button>
        </Grid>
      </Grid>
    </Paper>

    {openRecord && (
      <Paper className={classes.setProductpaper} elevation={5}>
        {dbsenderr && (
          <Typography className={classes.setcheckerrorlabel}>
            {dbsenderr}
          </Typography>
        )}
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
                dispatch date
              </Typography>
              <DatePicker
                onChange={(e) => setDate(e)}
                value={date}
                format={"dd/MM/yyyy"}
                dayPlaceholder={"dd"}
                monthPlaceholder={"mm"}
                yearPlaceholder={"yyyy"}
                className={classes.setdatepicker}
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
          <Typography className={classes.setcheckerrorlabel}>
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
                      !paymentList.some(
                        (user) => user?.isChecked !== true
                      )
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
                  Amount
                </TableCell>

                <TableCell align="center" className={classes.tableth}>
                  Order Type
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
              </TableRow>
            </TableHead>
            <TableBody>
              {paymentList.map((e, index) => {
                return (
                  <StyledTableRow>
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
                      {checkErr && (
                        <Typography className={classes.seterrorlabel}>
                          {checkErr}{" "}
                        </Typography>
                      )}
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
                    {sendingData.map((data) => {
                      if (data.o_id === e.o_id) {
                        if (data.Amount_error) {

                          errStatus = true
                        }
                      }
                    })}
                    <StyledTableCell
                      className={classes.tabletd}
                      align="center"
                    >
                      <TextField
                        error={errStatus}
                        disabled={!e.isChecked && disabled}
                        size="small"
                        variant="outlined"
                        id="receive_amount"
                        name="receive_amount"
                        style={{ minWidth: "130px" }}
                        value={e.receive_amount}
                        onChange={handleawbdisplay(index, e)}
                        className={classes.settextfield}
                      />
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
                  </StyledTableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <div className={classes.setfinsubmit}>
          {dbsenderr && (
            <Typography className={classes.setcheckerrorlabel}>
              {dbsenderr}
            </Typography>
          )}
          <Button
            variant="contained"
            className={classes.setproductbtnsend}
            onClick={handlefinaldata}
          >
            Save
          </Button>
        </div>
      </Paper>
    )}
  </>;
}

export default Manual;
