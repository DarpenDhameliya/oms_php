import React, { useState, useEffect } from "react";
import useStylesPaymentRecieve from "./PaymentRecieveStyle";
import Container from "@mui/material/Container";
import { Grid, Paper } from "@material-ui/core";
import Typography from "@mui/material/Typography";
import Button from "@material-ui/core/Button";
import TextField from "@mui/material/TextField";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableContainer from "@mui/material/TableContainer";
import Modal from "@mui/material/Modal";
import { useDispatch, useSelector } from "react-redux";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import Tooltip from "@mui/material/Tooltip";
import Zoom from "@mui/material/Zoom";
import Backdrop from "@mui/material/Backdrop";
import {
  PaymentReceiveReportSlice,
  Paymentreceivechangestatus,
  Paymentreceivereportstate,
} from "./Slice/PaymentReoportSlice"; // main api calling
import moment from "moment";
import Pagination from "@mui/material/Pagination";
import Collapse from "@mui/material/Collapse";
import Box from "@mui/material/Box";
import { DotLoader } from "react-spinners";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import IconButton from "@mui/material/IconButton";
import { orderType, orderStatus } from "../commonLink/OrderList";

import {
  PaymentReportFulldataSlice,
  Paymentreportfulldatastate,
  Paymentreportfulldatastatus,
} from "./Slice/PaymentReportFulldata"; // subdata api calling
import MenuItem from "@mui/material/MenuItem";
import {
  Paymentpaginationstatus,
  Paymentpaginationstate,
  PaymentPaginationSlice,
} from "./Slice/PaymentPagination"; // subdata pagination
import { Paginationdatastatus, Paginationdatastate } from "./Slice/Paymentdata"; // save input data
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import { useHistory } from "react-router-dom";
import DatePicker from "react-date-picker/dist/entry.nostyle";
import "react-calendar/dist/Calendar.css";
import "react-date-picker/dist/DatePicker.css";
require("jspdf-autotable");

function PaymentRecieveReport() {
  const [openrecord, setOpenrecord] = useState(false);
  const [date, setDate] = useState("");
  const [dateto, setDateto] = useState("");
  const classes = useStylesPaymentRecieve();
  const [paymentRecord, setPaymentRecord] = useState([]);
  const [opnesubRecoredErr, setOpnesubRecoredErr] = useState([]);
  const [databaseErr, setDatabaseErr] = useState("");
  const [active, setActive] = useState(false);
  const [error, setError] = useState([]);
  const [open, setOpen] = useState(false);
  const [hidePaymentRecord, setHidePaymentRecord] = useState([]);
  const [excelOpen, setExcelOpen] = useState(false);
  const [fileDownload, setFileDownload] = useState(false);
  const [modelcount, setModelcount] = useState(1);
  const [modelOpen, setModelOpen] = useState(0);
  const [paginationpage, setPaginationpage] = useState("");
  const [rowperpage, setRowperpage] = useState("100");
  const [page, setPage] = useState(1);
  const history = useHistory();
  const dispatch = useDispatch();
  const hidedata = useSelector(Paymentreportfulldatastate);
  const reportslice = useSelector(Paymentreceivereportstate);
  const savedata = useSelector(Paginationdatastate);
  const paginationstate = useSelector(Paymentpaginationstate);
  // const [value, setValue] = React.useState(dayjs('2014-08-18T21:11:54'));

  const handellogout = () => {
    localStorage.removeItem("userdata");
    localStorage.removeItem("username");
    localStorage.removeItem("useremail");
    history.push("/");
    window.location.reload();
  };
  // main api call
  const handleopenRecord = (e) => {
    if (dateto) {
      var enddate =  moment(dateto).format('YYYY-MM-DD')
    }
    if (navigator.onLine == true) {
      const d = new Date();
      const todaydate = moment(d.toISOString().slice(0, 10)).format(
        "yyyy-MM-DD"
      );
      if (!date) {
        if (!date) {
          error.date = "Start Date Required !!";
        } else {
          error.date = "";
        }
        setError({ ...error, [e.target.name]: e.target.value });
        setTimeout(() => {
          setError([]);
        }, 3000);
      } else {
        const stdate =  moment(date).format('YYYY-MM-DD')
        dispatch(
          PaymentReceiveReportSlice({
            from_date: stdate,
            to_date: dateto ? enddate : todaydate,
          })
        );

        dispatch(
          Paginationdatastatus({
            from_date: date,
            to_date: dateto ? enddate : todaydate,
          })
        );
      }
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

  //subdata redux
  useEffect(() => {
    if (hidedata.status === "loading") {
      setActive(true);
    } else if (hidedata.status === "succeeded") {
      setActive(false);
      setPaginationpage(hidedata.response.data.last_page);
      setHidePaymentRecord(hidedata.response.data.data);
      dispatch(Paymentreportfulldatastatus());
    } else if (hidedata.status === "failed") {
      setActive(false);
      if(hidedata.error.errors == 'token expire'){
        handellogout();
      } else {
        setOpnesubRecoredErr(hidedata.error.errors);
        setTimeout(() => {
          setOpnesubRecoredErr([]);
        }, 3000);
      }
      dispatch(Paymentreportfulldatastatus());
    } else {
    }

    if (paginationstate.status === "loading") {
      setActive(true);
    } else if (paginationstate.status === "succeeded") {
      setActive(false);
      setHidePaymentRecord(paginationstate.response.data.data);
      dispatch(Paymentpaginationstatus());
    } else if (paginationstate.status === "failed") {
      setActive(false);
      dispatch(Paymentpaginationstatus());
    } else {
    }
  }, [paginationstate , hidedata]);

  //main api and export redux
  useEffect(() => {
    if (reportslice.status === "loading") {
      setActive(true);
    } else if (reportslice.status === "succeeded") {
      setActive(false);
      setDate("");
      setDateto("");
      setPaymentRecord(reportslice.response.data);
      setOpenrecord(true);
      if (fileDownload) {
        const exceldata = reportslice.response.data;
        const data = [];
        for (let i = 0; i < exceldata.length; i++) {
          var temp = [
            exceldata[i].website_name,
            exceldata[i].data[0].receive_amount,
          ];
          data.push(temp);
          for (let m = 0; m < exceldata[i].get_paymentdata.length; m++) {
            for (let s = 0; s < orderStatus.length; s++) {
              if (
                orderStatus[s].value ==
                exceldata[i].get_paymentdata[m].order_status
              ) {
                var orderStatuss = orderStatus[s].label;
              }
            }

            if (!exceldata[i].get_paymentdata[m].order_type) {
              var orderTypes = "";
            } else {
              for (let k = 0; k < orderType.length; k++) {
                if (
                  exceldata[i].get_paymentdata[m].order_type ==
                  orderType[k].value
                ) {
                  orderTypes = orderType[k].label;
                }
              }
            }

            if (!exceldata[i].get_paymentdata[m].amountreceive_date) {
              var paymentStatuss = "";
            } else {
              paymentStatuss = "Receive";
            }
            let temp = [
              "",
              "",
              m + 1,
              exceldata[i].get_paymentdata[m].product_name,
              exceldata[i].get_paymentdata[m].order_id,
              exceldata[i].get_paymentdata[m].awb_no,
              orderStatuss,
              orderTypes,
              exceldata[i].get_paymentdata[m].name,
              exceldata[i].get_paymentdata[m].courier_name,
              exceldata[i].get_paymentdata[m].qty,
              exceldata[i].get_paymentdata[m].order_amount,
              paymentStatuss,
              exceldata[i].get_paymentdata[m].receive_amount,
              exceldata[i].get_paymentdata[m].amountreceive_date,
            ];
            data.push(temp);
          }
        }

        const pdf = new jsPDF("l", "in", [11, 9]);
        const columns = [
          "Website",
          "Receive amount",
          "no",
          "product",
          "Order Id",
          "awb",
          "Order Status",
          "Order Type",
          "Website",
          "Courier",
          "qty",
          "Order Amount",
          "payment status",
          "Receive Amount",
          "Receive Date",
        ];
        pdf.autoTable(columns, data);
        pdf.save("payment_receive.pdf");
        setFileDownload(false);
      }
      if (excelOpen) {
        const pdfdata = reportslice.response.data;
        const subdata = {};
        const array = {};
        const data = [];
        for (let i = 0; i < pdfdata.length; i++) {
          array["Website"] = pdfdata[i].website_name;
          array["Receive Amount"] = pdfdata[i].data[0].receive_amount;
          data.push({ ...array });
          for (let m = 0; m < pdfdata[i].get_paymentdata.length; m++) {
            subdata["No"] = m + 1;
            subdata["product"] = pdfdata[i].get_paymentdata[m].product_name;
            subdata["Order Id"] = pdfdata[i].get_paymentdata[m].order_id;
            subdata["awb NO"] = pdfdata[i].get_paymentdata[m].awb_no;
            for (let s = 0; s < orderStatus.length; s++) {
              if (
                orderStatus[s].value ==
                pdfdata[i].get_paymentdata[m].order_status
              ) {
                subdata["order status"] = orderStatus[s].label;
              }
            }
            if (!pdfdata[i].get_paymentdata[m].order_type) {
              subdata["order Type"] = "";
            } else {
              for (let k = 0; k < orderType.length; k++) {
                if (
                  orderType[k].value == pdfdata[i].get_paymentdata[m].order_type
                ) {
                  subdata["order Type"] = orderType[k].label;
                }
              }
            }
            subdata["website"] = pdfdata[i].get_paymentdata[m].name;
            subdata["Courier"] = pdfdata[i].get_paymentdata[m].courier_name;
            subdata["Qty"] = pdfdata[i].get_paymentdata[m].qty;
            subdata["Order AMount"] =
              pdfdata[i].get_paymentdata[m].order_amount;
            if (pdfdata[i].get_paymentdata[m].amountreceive_date) {
              subdata["Payment status"] = "Receive";
            } else {
              subdata["Payment status"] = "";
            }
            subdata["Receive amount"] =
              pdfdata[i].get_paymentdata[m].receive_amount;
            subdata["Receive Date"] =
              pdfdata[i].get_paymentdata[m].amountreceive_date;
            data.push({ ...subdata });
          }
        }
        const worksheet = XLSX.utils.json_to_sheet(data);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Payment");
        XLSX.writeFile(workbook, "Payment.xlsx");
        setExcelOpen(false);
      }
      dispatch(Paymentreceivechangestatus());
    } else if (reportslice.status === "failed") {
      setActive(false);
      console.log(reportslice.error);
      if (reportslice.error.errors[0] == "token expire") {
        handellogout();
      } else {
        setDatabaseErr(reportslice.error.errors);
        setTimeout(() => {
          setDatabaseErr("");
        }, 3000);
      }
      dispatch(Paymentreceivechangestatus());
    } else {
    }
  },[reportslice]);

  // excel download
  const handleexceldata = (e) => {
    if (navigator.onLine == true) {
      setExcelOpen(true);
      setFileDownload(false);
      handleopenRecord(e);
    } else {
      setModelOpen(1);
      setModelcount(2);
    }
  };

  // pdf download
  const handlefiledata = (e) => {
    if (navigator.onLine == true) {
      setFileDownload(true);
      setExcelOpen(false);
      handleopenRecord(e);
    } else {
      setModelOpen(1);
      setModelcount(2);
    }
  };

  // subrecord open api
  const handleopenreport = (index, webid) => {
    if (navigator.onLine == true) {
      setOpen(open === index ? false : index);
      setRowperpage('100')
      dispatch(
        PaymentReportFulldataSlice({
          from_date: savedata.response.payload.from_date,
          to_date: savedata.response.payload.to_date,
          website_id: webid,
          per_page: rowperpage,
        })
      );
      dispatch(
        Paginationdatastatus({
          from_date: savedata.response.payload.from_date,
          to_date: savedata.response.payload.to_date,
          website_id: webid,
        })
      );
    } else {
      setModelOpen(1);
      setModelcount(2);
    }
  };

  // subrecord pagination set
  const handleChangepage = (event, value) => {
    if (navigator.onLine == true) {
      setPage(value);
      dispatch(
        PaymentPaginationSlice({
          from_date: savedata.response.payload.from_date,
          to_date: savedata.response.payload.to_date,
          website_id: savedata.response.payload.website_id,
          page: value,
          per_page: rowperpage,
        })
      );
    } else {
      setModelOpen(1);
      setModelcount(2);
    }
  };

  // subrecord row per page set
  const handlesetRowperpageChange = (e) => {
    if (navigator.onLine == true) {
      const onPage = e.target.value;
      setRowperpage(e.target.value);
      setPage(1);
      dispatch(
        PaymentReportFulldataSlice({
          from_date: savedata.response.payload.from_date,
          to_date: savedata.response.payload.to_date,
          website_id: savedata.response.payload.website_id,
          per_page: onPage,
          page: 1,
        })
      );
    } else {
      setModelOpen(1);
      setModelcount(2);
    }
  };

  const handledate = (e) => {
    setDate(e);
  };

  return (
    <>
      <Container
        component="main"
        maxWidth="xl"
        className={classes.setcontainer}
      >
        <ToastContainer position="top-right" closeOnClick />
        <div className={classes.setpageheading}>
          <Typography variant="h4" gutterBottom className={classes.setheading}>
            Payment Report
          </Typography>
        </div>

        <Paper className={classes.setProductpaper} elevation={5}>
          <Grid container spacing={2} style={{ marginTop: "10px" }}>
            <Grid item xs={12} sm={6} md={4}>
              <div className={classes.setinsidegrid}>
                <Typography className={classes.setlabel}>from :</Typography>
                <DatePicker
                  onChange={handledate}
                  value={date}
                  format={"dd/MM/yyyy"}
                  dayPlaceholder={"dd"}
                  monthPlaceholder={"mm"}
                  yearPlaceholder={"yyyy"}
                  className={classes.setdatepicker}
                />
              </div>
              {error.date && (
                <Typography className={classes.seterrorlabel}>
                  {error.date}{" "}
                </Typography>
              )}
              {databaseErr && (
                <Typography className={classes.seterrorlabel}>
                  {databaseErr}{" "}
                </Typography>
              )}
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <div className={classes.setinsidegrid}>
                <Typography className={classes.setlabel}>to :</Typography>
                <DatePicker
                  onChange={(e) => setDateto(e)}
                  value={dateto}
                  format={"dd/MM/yyyy"}
                  dayPlaceholder={"dd"}
                  monthPlaceholder={"mm"}
                  yearPlaceholder={"yyyy"}
                  className={classes.setdatepicker}
                />
              </div>
            </Grid>
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              className={classes.setinputlayoutforbtn}
            >
              {" "}
              <Tooltip
                title="Download pdf"
                TransitionComponent={Zoom}
                placement="bottom-end"
                sx={{ fontsize: "15px" }}
              >
                <Avatar
                  className={classes.setavtarbackexportfile}
                  onClick={handlefiledata}
                  variant="rounded"
                >
                  <i
                    className="fa fa-file-pdf-o"
                    aria-hidden="true"
                    style={{
                      fontSize: "40px",
                      color: "#3c8dbc",
                      borderRadius: "20px",
                      backgroundColor: "#f9fafc",
                      fontWeight: 600,
                    }}
                  ></i>
                </Avatar>
              </Tooltip>
              <Tooltip
                title="Download Excel"
                TransitionComponent={Zoom}
                placement="bottom-end"
                sx={{ fontsize: "15px" }}
              >
                <Avatar
                  className={classes.setavtarbackexport}
                  onClick={handleexceldata}
                  variant="rounded"
                >
                  <i
                    className="fa fa-file-excel-o"
                    aria-hidden="true"
                    style={{
                      fontSize: "40px",
                      color: "#3c8dbc",
                      borderRadius: "20px",
                      backgroundColor: "#f9fafc",
                      fontWeight: 600,
                    }}
                  ></i>
                </Avatar>
              </Tooltip>
              <Button
                variant="contained"
                className={classes.setproductbtnsend}
                onClick={handleopenRecord}
              >
                Submit
              </Button>
            </Grid>
          </Grid>
        </Paper>

        {openrecord && (
          <Paper className={classes.setProductpaperview} elevation={5}>
            <TableContainer style={{ margin: 0 }}>
              <Table stickyHeader className={classes.settable}>
                <TableHead>
                  <TableRow>
                    <TableCell align="center" className={classes.tableth}>
                      Website
                    </TableCell>
                    <TableCell align="center" className={classes.tableth}>
                      Receive Amount
                    </TableCell>
                    <TableCell align="center" className={classes.tableth}>
                      view
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {/* main table row loop start */}
                  {/* {paymentRecord.map((e, index) => (
                    <React.Fragment key={index}>
                      <PaymentReciveRecord
                        openrecord={openrecord}
                        website={e.website_name}
                        amount={e.data[0]}
                        fromdate={date}
                        todate={dateto ? dateto : todayDate}
                        webid={e.website_id}
                        index={index}
                      />
                    </React.Fragment>
                  ))} */}
                  {/* main table row loop end */}

                  {paymentRecord.map((e, index) => (
                    <React.Fragment key={index}>
                      <TableRow>
                        <TableCell align="center" className={classes.tabletd}>
                          {e.website_name}{" "}
                        </TableCell>
                        <TableCell align="center" className={classes.tabletd}>
                          {e.data[0].receive_amount}
                        </TableCell>
                        <TableCell align="center">
                          <IconButton
                            aria-label="expand row"
                            size="small"
                            onClick={() =>
                              handleopenreport(index, e.website_id)
                            }
                          >
                            <RemoveRedEyeIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell
                          style={{ paddingBottom: 0, paddingTop: 0 }}
                          colSpan={6}
                        >
                          <Collapse
                            in={open === index}
                            timeout="auto"
                            unmountOnExit
                          >
                            <Box sx={{ margin: 1 }}>
                              {opnesubRecoredErr && (
                                <Typography className={classes.seterrorlabel}>
                                  {opnesubRecoredErr}{" "}
                                </Typography>
                              )}
                              <Table stickyHeader className={classes.settable}>
                                <TableHead>
                                  <TableRow>
                                    <TableCell
                                      align="center"
                                      className={classes.tableth}
                                    >
                                      Product
                                    </TableCell>
                                    <TableCell
                                      align="center"
                                      className={classes.tableth}
                                    >
                                      Order Id
                                    </TableCell>
                                    <TableCell
                                      align="center"
                                      className={classes.tableth}
                                    >
                                      AWB No
                                    </TableCell>
                                    <TableCell
                                      align="center"
                                      className={classes.tableth}
                                    >
                                      Order Status
                                    </TableCell>
                                    <TableCell
                                      align="center"
                                      className={classes.tableth}
                                    >
                                      Order TYpe
                                    </TableCell>
                                    <TableCell
                                      align="center"
                                      className={classes.tableth}
                                    >
                                      Website
                                    </TableCell>
                                    <TableCell
                                      align="center"
                                      className={classes.tableth}
                                    >
                                      Courier
                                    </TableCell>
                                    <TableCell
                                      align="center"
                                      className={classes.tableth}
                                    >
                                      Qty
                                    </TableCell>
                                    <TableCell
                                      align="center"
                                      className={classes.tableth}
                                    >
                                      Order Amount
                                    </TableCell>
                                    <TableCell
                                      align="center"
                                      className={classes.tableth}
                                    >
                                      Payment Status
                                    </TableCell>
                                    <TableCell
                                      align="center"
                                      className={classes.tableth}
                                    >
                                      Receive Amount
                                    </TableCell>
                                    <TableCell
                                      align="center"
                                      className={classes.tableth}
                                    >
                                      Receive Date
                                    </TableCell>
                                  </TableRow>
                                </TableHead>
                                <TableBody>
                                  {hidePaymentRecord.map((e, index) => {
                                    return (
                                      <TableRow key={e.order_id}>
                                        <TableCell
                                          scope="row"
                                          align="center"
                                          className={classes.tabletd}
                                        >
                                          {e.product_name}
                                        </TableCell>
                                        <TableCell
                                          className={classes.tabletd}
                                          align="center"
                                        >
                                          {e.order_id}
                                        </TableCell>
                                        <TableCell
                                          className={classes.tabletd}
                                          align="center"
                                        >
                                          {e.awb_no}
                                        </TableCell>
                                        <TableCell
                                          className={classes.tabletd}
                                          align="center"
                                        >
                                          {orderStatus.map((or) => {
                                            if (e.order_status == or.value) {
                                              return (
                                                <Typography
                                                  key={index}
                                                  className={classes.settypo}
                                                >
                                                  {or.label}
                                                </Typography>
                                              );
                                            }
                                          })}
                                        </TableCell>
                                        <TableCell
                                          className={classes.tabletd}
                                          align="center"
                                        >
                                          {orderType.map((ea, index) => {
                                            if (ea.value == e.order_type) {
                                              return (
                                                <Typography
                                                  key={index}
                                                  className={classes.settypo}
                                                >
                                                  {ea.label}
                                                </Typography>
                                              );
                                            }
                                          })}
                                        </TableCell>
                                        <TableCell
                                          className={classes.tabletd}
                                          align="center"
                                        >
                                          {e.name}
                                        </TableCell>
                                        <TableCell
                                          className={classes.tabletd}
                                          align="center"
                                        >
                                          {e.courier_name}
                                        </TableCell>
                                        <TableCell
                                          className={classes.tabletd}
                                          align="center"
                                        >
                                          {e.qty}
                                        </TableCell>
                                        <TableCell
                                          className={classes.tabletd}
                                          align="center"
                                        >
                                          {e.order_amount}
                                        </TableCell>
                                        <TableCell
                                          className={classes.tabletd}
                                          align="center"
                                        >
                                          {e.receive_amount ? "Receive" : ""}
                                        </TableCell>
                                        <TableCell
                                          className={classes.tabletd}
                                          align="center"
                                        >
                                          {e.receive_amount}
                                        </TableCell>
                                        <TableCell
                                          className={classes.tabletd}
                                          align="center"
                                        >
                                          {e.amountreceive_date}
                                        </TableCell>
                                      </TableRow>
                                    );
                                  })}
                                </TableBody>
                              </Table>
                              <div className={classes.setpaginationdiv}>
                                <div className={classes.setrowperpage}>
                                  <Typography className={classes.setlabelrow}>
                                    Rows per page :
                                  </Typography>
                                  <TextField
                                    size="small"
                                    select
                                    className={classes.textField}
                                    value={rowperpage}
                                    onChange={handlesetRowperpageChange}
                                    InputLabelProps={{ shrink: false }}
                                    margin="normal"
                                    variant="outlined"
                                  >
                                    <MenuItem value="100">100</MenuItem>
                                    <MenuItem value="200">200</MenuItem>
                                    <MenuItem value="500">500</MenuItem>
                                  </TextField>
                                </div>
                                <Pagination
                                  count={paginationpage}
                                  page={page}
                                  onChange={handleChangepage}
                                  variant="outlined"
                                  shape="rounded"
                                />
                              </div>
                            </Box>
                          </Collapse>
                        </TableCell>
                      </TableRow>
                    </React.Fragment>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        )}

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

export default PaymentRecieveReport;
