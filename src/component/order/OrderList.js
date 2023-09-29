import React, { useState, useEffect } from "react";
import useStylesOrder from "./OrderStyle";
import Container from "@mui/material/Container";
import { Divider, Grid, Paper } from "@material-ui/core";
import Typography from "@mui/material/Typography";
import Button from "@material-ui/core/Button";
import TextField from "@mui/material/TextField";
import Avatar from "@mui/material/Avatar";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import OrderListData from "./OrderListData";
import Tooltip from "@mui/material/Tooltip";
import Zoom from "@mui/material/Zoom";
import Select from "react-select";
import { useSelector, useDispatch } from "react-redux";
import { ListFetch, Liststate } from "../commonLink/ListApi";
import { orderType, orderStatus } from "../commonLink/OrderList";
import Backdrop from "@mui/material/Backdrop";
import {
  Orderliststate,
  OrderListSlice,
  odrListstatus,
} from "./slice/OrderListSlice";
import Pagination from "@mui/material/Pagination";
import {
  OrderListPaginationSlice,
  Orderlispaginationtstate,
  Orderlispaginationtstatus,
} from "./slice/OrderListPagination";
import {
  odrListSelectedData,
  odrListdelecteddatastate,
} from "./slice/OrderData"; // for internal use of selcted data
import MenuItem from "@mui/material/MenuItem";
import DatePicker from "react-date-picker/dist/entry.nostyle";  
import "react-calendar/dist/Calendar.css";
import "react-date-picker/dist/DatePicker.css";
import { DotLoader } from "react-spinners";
import {
  FileDownloadSlice,
  Filedownloadstatus,
  Filedownloadstate,
} from "./slice/FileDownload";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import moment from "moment";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import { useHistory } from "react-router-dom";
require("jspdf-autotable");

function OrderList() {
  const [morefilteropen, setMorefilteropen] = useState(true);
  const [openRecord, setOpenRecord] = useState(false);
  const [active, setActive] = useState(false);
  const [odrListdata, setOdrListdata] = useState([]);
  const [countPage, setCountPage] = useState("");
  const [page, setPage] = useState(1);
  const [product, setProduct] = useState("");
  const [courier, setCourier] = useState("");
  const [website, setWebsite] = useState("");
  const [awb, setAwb] = useState("");
  const [date, setDate] = useState("");
  const [dateto, setDateto] = useState("");
  const [productList, setProductList] = useState([]);
  const [courierList, setCourierList] = useState([]);
  const [websiteList, setWebsiteList] = useState([]);
  const [odrtype, setOdrtype] = useState([]);
  const [odrstatus, setodrstatus] = useState([]);
  const [dberr, setDberr] = useState([]);
  const [errors, setErrors] = useState("");
  const [rowperpage, setRowperpage] = useState("100");
  const [fileOpen, setFileOpen] = useState(false);
  const history = useHistory();
  const [modelcount, setModelcount] = useState(1);
  const [modelOpen, setModelOpen] = useState(0);
  const classes = useStylesOrder();
  const dispatch = useDispatch();
  const liststate = useSelector(Liststate); //list
  const odrliststate = useSelector(Orderliststate); //order Record
  const odrlistpaginationstate = useSelector(Orderlispaginationtstate); //pagination
  const dataslice = useSelector(odrListdelecteddatastate); //
  const filedata = useSelector(Filedownloadstate);
  // console.log(filedata);
  const handlemoredata = () => {
    setMorefilteropen(!morefilteropen);
  };

  // pagination api
  const handleChangepage = (event, value) => {
    if (navigator.onLine == true) {
      setPage(value);
      dispatch(
        OrderListPaginationSlice({
          from_date: dataslice.response.payload.from_date,
          to_date: dataslice.response.payload.to_date,
          order_status: dataslice.response.payload.order_status,
          courier_id: dataslice.response.payload.courier_id,
          product_id: dataslice.response.payload.product_id,
          website_id: dataslice.response.payload.website_id,
          order_type: dataslice.response.payload.order_type,
          order_id: dataslice.response.payload.order_id,
          page: value,
          per_page: rowperpage,
        })
      );
    } else {
      setModelOpen(1);
      setModelcount(2);
    }
  };

  // fetch list status
  useEffect(() => {
    if (liststate.status === "succeeded") {
      setCourierList(liststate.List.list.courier_list);
      setWebsiteList(liststate.List.list.website_list);
      setProductList(liststate.List.list.product_list);
    }
  }, [liststate])
  

  // fetch data responce
  useEffect(() => {
    if (odrliststate.status === "loading") {
      setActive(true);
    } else if (odrliststate.status === "succeeded") {
      setActive(false);
      setOdrListdata(odrliststate.response.data.data);
      setCountPage(odrliststate.response.data.last_page);
      setOpenRecord(true);
      setDate("");
      setDateto("");
      setAwb("");
      setodrstatus([]);
      setOdrtype([]);
      setProduct("");
      setCourier("");
      setWebsite("");
      dispatch(odrListstatus());
    } else if (odrliststate.status === "failed") {
      setActive(false);
      if (odrliststate.error.errors == "token expire") {
        localStorage.removeItem("userdata");
        localStorage.removeItem("username");
        history.push("/");
        window.location.reload();
      } else {
        setOpenRecord(false)
        setDberr(odrliststate.error.errors);
        setTimeout(() => {
          setDberr([]);
        }, 4000);
      }
      dispatch(odrListstatus());
    } else {
    }
  }, [odrliststate])
  
  // pagination vise responce of data 
  useEffect(() => {
    if (odrlistpaginationstate.status === "loading") {
    } else if (odrlistpaginationstate.status === "succeeded") {
      setOdrListdata(odrlistpaginationstate.response.data.data);
      dispatch(Orderlispaginationtstatus());
    } else if (odrlistpaginationstate.status === "failed") {
      console.log(odrlistpaginationstate);
      dispatch(Orderlispaginationtstatus());
    } else {
    }
  },[odrlistpaginationstate]);

  // pdf & excel response
  useEffect(() => {
    if (filedata.status === "loading") {
    } else if (filedata.status === "succeeded") {
      if (fileOpen) {
        const pdfRecord = filedata.response.data;
        const data = [];
        const odrListstatus = [];
        const odrListtype = [];
        for (let i = 0; i < pdfRecord.length; i++) {
          for (let j = 0; j < orderStatus.length; j++) {
            if (orderStatus[j].value == pdfRecord[i].order_status) {
              var temp = [
                pdfRecord[i].product_name,
                pdfRecord[i].order_id,
                pdfRecord[i].awb_no,
                orderStatus[j].label,
                pdfRecord[i].website_name,
                pdfRecord[i].courier_name,
                pdfRecord[i].qty,
                pdfRecord[i].order_amount,
                pdfRecord[i].amountreceive_date ? "Receive" : "",
                pdfRecord[i].receive_amount,
                pdfRecord[i].amountreceive_date,
              ];
              data.push(temp);
            }
          }

          if (!pdfRecord[i].order_type) {
            odrListtype.push("");
          } else {
            for (let k = 0; k < orderType.length; k++) {
              if (pdfRecord[i].order_type == orderType[k].value) {
                odrListtype.push(orderType[k].label);
              }
            }
          }
        }
        for (let i = 0; i < data.length; i++) {
          var temp = [
            data[i][0],
            data[i][1],
            data[i][2],
            data[i][3],
            odrListtype[i],
            data[i][4],
            data[i][5],
            data[i][6],
            data[i][7],
            data[i][8],
            data[i][9],
            data[i][10],
          ];
          odrListstatus.push(temp);
        }
        // console.log(odrListstatus);
        const pdf = new jsPDF("l", "in", [12, 9]);
        const columns = [
          "Product Name",
          "Order Id",
          "AWB",
          "Order Status",
          "Order Type",
          "Website",
          "Courier",
          "Qty",
          "Order Amount",
          "Payment Status",
          "Receive Amount",
          "Receive Date",
        ];
        pdf.autoTable(columns, odrListstatus);
        pdf.save("OrderList.pdf");
      } else {
        const pdfRecord = filedata.response.data;
        const data = [];
        const odrListstatus = [];
        const odrListtype = [];
        for (let i = 0; i < pdfRecord.length; i++) {
          for (let j = 0; j < orderStatus.length; j++) {
            if (orderStatus[j].value == pdfRecord[i].order_status) {
              var temp = [
                pdfRecord[i].product_name,
                pdfRecord[i].order_id,
                pdfRecord[i].awb_no,
                orderStatus[j].label,
                pdfRecord[i].website_name,
                pdfRecord[i].courier_name,
                pdfRecord[i].qty,
                pdfRecord[i].order_amount,
                pdfRecord[i].amountreceive_date ? "Receive" : "",
                pdfRecord[i].receive_amount,
                pdfRecord[i].amountreceive_date,
              ];
              data.push(temp);
            }
          }

          if (!pdfRecord[i].order_type) {
            odrListtype.push("");
          } else {
            for (let k = 0; k < orderType.length; k++) {
              if (pdfRecord[i].order_type == orderType[k].value) {
                odrListtype.push(orderType[k].label);
              }
            }
          }
        }
        for (let i = 0; i < data.length; i++) {
          var temp = [
            data[i][0],
            data[i][1],
            data[i][2],
            data[i][3],
            odrListtype[i],
            data[i][4],
            data[i][5],
            data[i][6],
            data[i][7],
            data[i][8],
            data[i][9],
            data[i][10],
          ];
          odrListstatus.push(temp);
        }
        const finalsendArray = [];
        const array = {};
        for (let i = 0; i < odrListstatus.length; i++) {
          array["Product Name"] = odrListstatus[i][0];
          array["Order Id"] = odrListstatus[i][1];
          array["AWB"] = odrListstatus[i][2];
          array["Order Status"] = odrListstatus[i][3];
          array["Order Type"] = odrListstatus[i][4];
          array["Website"] = odrListstatus[i][5];
          array["Courier"] = odrListstatus[i][6];
          array["qty"] = odrListstatus[i][7];
          array["Order Amount"] = odrListstatus[i][8];
          array["Payment Status"] = odrListstatus[i][9];
          array["Receive Amount"] = odrListstatus[i][10];
          array["Receive Date"] = odrListstatus[i][11];
          finalsendArray.push({ ...array });
        }
        // console.log(finalsendArray);
        const worksheet = XLSX.utils.json_to_sheet(finalsendArray);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "OrderList");
        XLSX.writeFile(workbook, "OrderList.xlsx");
      }
      dispatch(Filedownloadstatus());
    } else if (filedata.status === "failed") {
      // console.log(odrlistpaginationstate);
      dispatch(Filedownloadstatus());
    } else {
    }
  },[filedata]);

  // main api calling
  const handleopenrecord = () => {
    if (dateto) {
      var enddate = moment(dateto).format("YYYY-MM-DD");
    }
    if (navigator.onLine == true) {
      if (
        date ||
        dateto ||
        awb ||
        odrstatus.length != 0 ||
        courier.length != 0 ||
        product.length != 0 ||
        website.length != 0 ||
        odrtype.length != 0
      ) {
        const stdate = moment(date).format("YYYY-MM-DD");
        // console.log(sdate)
        dispatch(
          OrderListSlice({
            from_date: date ? stdate : "",
            to_date: dateto ? enddate : "",
            order_status: odrstatus,
            courier_id: courier,
            product_id: product,
            website_id: website,
            order_type: odrtype,
            order_id: awb,
            per_page: rowperpage,
          })
        );
        dispatch(
          odrListSelectedData({
            from_date: date ? stdate : "",
            to_date: dateto ? enddate : "",
            order_status: odrstatus,
            courier_id: courier,
            product_id: product,
            website_id: website,
            order_type: odrtype,
            order_id: awb,
          })
        );
      } else {
        setErrors("Select Minimum one value");
        setTimeout(() => {
          setErrors("");
        }, 4000);
      }
    } else {
      setModelOpen(1);
      setModelcount(2);
    }
  };

  const hanldemodelclose = () => {
    setModelOpen(0);
  };
  useEffect(() => {
    if (navigator.onLine == true) {
      
      dispatch(ListFetch());
    } else {
      setModelOpen(1);
      setModelcount(2);
    }
  }, []);

  const handleChangetype = (e) => {
    setOdrtype(Array.isArray(e) ? e.map((x) => x.value) : []);
  };
  const handleChange = (e) => {
    setodrstatus(Array.isArray(e) ? e.map((x) => x.value) : []);
  };
  const counamehandle = (e) => {
    setCourier(Array.isArray(e) ? e.map((x) => x.value) : []);
  };
  const pronamehandle = (e) => {
    setProduct(Array.isArray(e) ? e.map((x) => x.value) : []);
  };
  const namehandle = (e) => {
    setWebsite(Array.isArray(e) ? e.map((x) => x.value) : []);
  };

  // download excel api
  const handleexceldata = () => {
    if (navigator.onLine == true) {
      setFileOpen(false)
      if (
        date ||
        dateto ||
        awb ||
        odrstatus.length != 0 ||
        courier.length != 0 ||
        product.length != 0 ||
        website.length != 0 ||
        odrtype.length != 0
      ) {
        dispatch(
          FileDownloadSlice({
            from_date: date,
            to_date: dateto,
            order_status: odrstatus,
            courier_id: courier,
            product_id: product,
            website_id: website,
            order_type: odrtype,
            order_id: awb,
          })
        );
      } else {
        setErrors("Select Minimum one value");
        setTimeout(() => {
          setErrors("");
        }, 4000);
      }

      handleopenrecord();
    } else {
      setModelOpen(1);
      setModelcount(2);
    }
  };

  // download pdf api
  const handlefiledata = () => {
    if (navigator.onLine == true) {
      setFileOpen(true);
      if (
        date ||
        dateto ||
        awb ||
        odrstatus.length != 0 ||
        courier.length != 0 ||
        product.length != 0 ||
        website.length != 0 ||
        odrtype.length != 0
      ) {
        dispatch(
          FileDownloadSlice({
            from_date: date,
            to_date: dateto,
            order_status: odrstatus,
            courier_id: courier,
            product_id: product,
            website_id: website,
            order_type: odrtype,
            order_id: awb,
          })
        );
      } else {
        setErrors("Select Minimum one value");
        setTimeout(() => {
          setErrors("");
        }, 4000);
      }

      handleopenrecord();
    } else {
      setModelOpen(1);
      setModelcount(2);
    }
  };

  // on chane row per page
  const handlesetRowperpageChange = (e) => {
    if (navigator.onLine == true) {
      const onPage = e.target.value;
      setRowperpage(e.target.value);
      setPage(1);
      dispatch(
        OrderListSlice({
          from_date: dataslice.response.payload.from_date,
          to_date: dataslice.response.payload.to_date,
          order_status: dataslice.response.payload.order_status,
          courier_id: dataslice.response.payload.courier_id,
          product_id: dataslice.response.payload.product_id,
          website_id: dataslice.response.payload.website_id,
          order_type: dataslice.response.payload.order_type,
          order_id: dataslice.response.payload.order_id,
          per_page: onPage,
          page: 1,
        })
      );
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
        <div className={classes.setpageheading}>
          <Typography variant="h4" gutterBottom className={classes.setheading}>
            Order Report
          </Typography>
        </div>
        <Paper className={classes.setProductpaper} elevation={5}>
          <div className={classes.setlistfiltericon}>
            <Avatar
              className={classes.setavtarback}
              onClick={handlemoredata}
              variant="rounded"
            >
              {morefilteropen ? (
                <AddIcon className={classes.setmoreicon} />
              ) : (
                <RemoveIcon
                  className={classes.setmoreicon}
                  onClick={handlemoredata}
                />
              )}
            </Avatar>
          </div>
          <Divider style={{ marginTop: "10px" }} />
          {dberr && (
            <Typography className={classes.seterrorlabel}>{dberr} </Typography>
          )}
          {errors && (
            <Typography className={classes.seterrorlabel}>{errors} </Typography>
          )}
          <Grid container spacing={2} style={{ marginTop: "10px" }}>
            <Grid item xs={12} sm={6} md={3}>
              <div className={classes.setinsidegrid}>
                <Typography className={classes.setlabel}>from :</Typography>
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
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
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
            <Grid item xs={12} sm={6} md={3}>
              <div className={classes.setinsidegrid}>
                <Typography className={classes.setlabel}>
                  OrderId / Awb :
                </Typography>
                <TextField
                  id="outlined-basic"
                  size="small"
                  label={awb === "" ? "Id." : ""}
                  InputLabelProps={{ shrink: false }}
                  variant="outlined"
                  value={awb}
                  onChange={(e) => setAwb(e.target.value)}
                  className={classes.settextfield}
                />
              </div>
            </Grid>

            {morefilteropen === true ? (
              <Grid
                item
                xs={12}
                sm={6}
                md={3}
                className={classes.setinputlayoutforbtn}
              >
                <Tooltip
                  title="Download pdf"
                  TransitionComponent={Zoom}
                  placement="bottom-end"
                  sx={{ fontsize: "15px" }}
                >
                  <Avatar
                    className={classes.setavtarbackexport}
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
                  onClick={handleopenrecord}
                >
                  Search
                </Button>
              </Grid>
            ) : (
              <>
                <Grid item xs={12} sm={6} md={3}>
                  <div className={classes.setinsidegrid}>
                    <Typography className={classes.setlabel}>
                      Order Status :
                    </Typography>
                    <Select
                      className={classes.textFieldselect}
                      isMulti
                      value={orderStatus.filter((obj) =>
                        odrstatus.includes(obj.value)
                      )}
                      onChange={handleChange}
                      options={orderStatus}
                    />
                  </div>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <div className={classes.setinsidegrid}>
                    <Typography className={classes.setlabel}>
                      Order Type :
                    </Typography>
                    <Select
                      className={classes.textFieldselect}
                      isMulti
                      value={orderType.filter((obj) =>
                        odrtype.includes(obj.value)
                      )}
                      onChange={handleChangetype}
                      options={orderType}
                    />
                  </div>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <div className={classes.setinsidegrid}>
                    <Typography className={classes.setlabel}>
                      Courier :
                    </Typography>
                    <Select
                      className={classes.textFieldselect}
                      isMulti
                      value={courierList.filter((obj) =>
                        courier.includes(obj.value)
                      )}
                      onChange={counamehandle}
                      options={courierList}
                    />
                  </div>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <div className={classes.setinsidegrid}>
                    <Typography className={classes.setlabel}>
                      Product :
                    </Typography>
                    <Select
                      className={classes.textFieldselect}
                      isMulti
                      value={productList.filter((obj) =>
                        product.includes(obj.value)
                      )}
                      onChange={pronamehandle}
                      options={productList}
                    />
                  </div>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <div className={classes.setinsidegrid}>
                    <Typography className={classes.setlabel}>
                      Website :
                    </Typography>
                    <Select
                      className={classes.textFieldselect}
                      isMulti
                      value={websiteList.filter((obj) =>
                        website.includes(obj.value)
                      )}
                      onChange={namehandle}
                      options={websiteList}
                    />
                  </div>
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm={12}
                  md={12}
                  className={classes.setinputlayoutforbtn}
                >
                  <Tooltip
                    title="Download pdf"
                    TransitionComponent={Zoom}
                    placement="bottom-end"
                    sx={{ fontsize: "15px" }}
                  >
                    <Avatar
                      className={classes.setavtarbackexport}
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
                    className={classes.setproductbtnsend}
                    onClick={handleopenrecord}
                  >
                    Search
                  </Button>
                </Grid>
              </>
            )}
          </Grid>
        </Paper>

        {openRecord && (
          <Paper className={classes.setProductpaper} elevation={5}>
            <OrderListData
              data={odrListdata}
              rowperpage={rowperpage}
              pageonpagination={page}
            />
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
                  {/* <MenuItem value="1">1</MenuItem>
                  <MenuItem value="2">2.</MenuItem>
                  <MenuItem value="5">5.</MenuItem> */}
                </TextField>
              </div>
              <Pagination
                count={countPage}
                page={page}
                onChange={handleChangepage}
                variant="outlined"
                // size="small"
                shape="rounded"
                // className={classes.setpaginations}
              />
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

export default OrderList;
