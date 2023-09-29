import React, { useState, useEffect } from "react";
import Container from "@mui/material/Container";
import { Divider, Grid, Paper } from "@material-ui/core";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@material-ui/core/Button";
import TextField from "@mui/material/TextField";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableContainer from "@mui/material/TableContainer";
import { useDispatch, useSelector } from "react-redux";
import useStylesPaymentRecieve from "../PaymentRecieveReport/PaymentRecieveStyle";
import {
  TransactionSlice,
  Transactionstatus,
  Transactionstate,
} from "./slice/TransactionSlice";
import {
  Transactiondatastatue,
  Transactiondatastatus,
} from "./slice/TransactionData";
import DatePicker from "react-date-picker/dist/entry.nostyle";
import "react-calendar/dist/Calendar.css";
import "react-date-picker/dist/DatePicker.css";
import moment from "moment";
import Backdrop from "@mui/material/Backdrop";
import { DotLoader } from "react-spinners";
import { styled } from "@mui/material/styles";
import Pagination from "@mui/material/Pagination";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import Zoom from "@mui/material/Zoom";
import MenuItem from "@mui/material/MenuItem";
import {
  TransactionPaginationSlice,
  Transactionpaginationstate,
  Transactionpaginationstatus,
} from "./slice/TransactionPagination";
import { ExportSlice, Exportstate, Exportstatus } from "./slice/Export";
import jsPDF from "jspdf";
import * as XLSX from "xlsx";
import { useHistory } from "react-router-dom";
require("jspdf-autotable");

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

function TransactionReport(props) {
  const [openrecord, setOpenrecord] = useState(false);
  const [active, setActive] = useState(false);
  const [pageCount, setPageCount] = useState("");
  const [date, setDate] = useState("");
  const [dateto, setDateto] = useState("");
  const classes = useStylesPaymentRecieve();
  const [transationRecord, setTransationRecord] = useState([]);
  const [error, setError] = useState([]);
  const [dbErr, setDbErr] = useState("");
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [rowperpage, setRowperpage] = useState("100");
  const [pdfDOwnload, setPdfDOwnload] = useState(false);
  const reportslice = useSelector(Transactionstate);
  const TransactionState = useSelector(Transactionpaginationstate);
  const Transactiondatas = useSelector(Transactiondatastatue);
  const exportstate = useSelector(Exportstate);
  const history = useHistory();
  const [modelcount, setModelcount] = useState(1);
  const [modelOpen, setModelOpen] = useState(0);

  const handlelogout = () => {
    localStorage.removeItem("userdata");
    localStorage.removeItem("username");
    localStorage.removeItem("useremail");
    history.push("/");
    window.location.reload();
  };
  // main api calling
  const handleopenRecord = (e) => {
    if (dateto) {
      var enddate =  moment(dateto).format('YYYY-MM-DD')
    }
    if(navigator.onLine == true){
      const d = new Date();
      const todaydate = moment(d.toISOString().slice(0, 10)).format("yyyy-MM-DD");
    if (!date) {
      if (!date) {
        error.date = "Start Date Required !!";
      } else {
        error.date = "";
      }
      setError({ ...error, [e.target.name]: e.target.value });
      setTimeout(() => {
        setError([]);
      }, 4000);
    } else {
      const stdate =  moment(date).format('YYYY-MM-DD')
      dispatch(
        TransactionSlice({
          from_date: stdate,
          to_date: dateto ? enddate : todaydate,
          per_page: rowperpage,
        })
      );
      dispatch(
        Transactiondatastatus({
          from_date: stdate,
          to_date: dateto ? enddate : todaydate,
        })
      );
    }
  } else {
    setModelOpen(1);
      setModelcount(2);
  }
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
  
    })
  
  //redux response
  useEffect(() => {
    if (reportslice.status === "loading") {
      setActive(true);
    } else if (reportslice.status === "succeeded") {
      setPageCount(reportslice.response.data.last_page);
      setActive(false);
      setDate("");
      setTransationRecord(reportslice.response.data.data);
      setOpenrecord(true);
      dispatch(Transactionstatus());
    } else if (reportslice.status === "failed") {
      setActive(false);
      if (reportslice.error.errors == "token expire") {
        handlelogout();
      } else {
        setDbErr(reportslice.error.errors);
        setTimeout(() => {
          setDbErr("");
        }, 4000);
      }
      dispatch(Transactionstatus());
    } else {
    }
  }, [reportslice])
  
  // pagination redux
  useEffect(() => {
    if (TransactionState.status === "loading") {
      setActive(true);
    } else if (TransactionState.status === "succeeded") {
      setActive(false);
      setTransationRecord(TransactionState.response.data.data);
      dispatch(Transactionpaginationstatus());
    } else if (TransactionState.status === "failed") {
      setActive(false);
      console.log(TransactionState.error.errors);
      // setDbErr(reportslice.error.errors);

      // setTimeout(() => {
      //   setDbErr("");
      // }, 4000);
      dispatch(Transactionpaginationstatus());
    } else {
    }
  },[TransactionState]);

  //export file response
  useEffect(() => {
    if (exportstate.status === "loading") {
    } else if (exportstate.status === "succeeded") {
      if (pdfDOwnload) {
        const exceldata = exportstate.response.data;
        const data = [];
        for (let i = 0; i < exceldata.length; i++) {
          var temp = [
            moment(exceldata[i].updated_at).format("DD-MM-YYYY"),
            exceldata[i].excel_filename,
            exceldata[i].type,
            exceldata[i].exceldata_count,
            exceldata[i].opening_balance,
            exceldata[i].total_charge,
            exceldata[i].closing_balance,
          ];
          data.push(temp);
        }
        const pdf = new jsPDF("p", "pt", "a4");
        const columns = [
          "date",
          "Excel Name",
          "type",
          "Data Count",
          "Charge",
          "Total Charge Amount",
          "Closing Amount",
        ];
        pdf.autoTable(columns, data);
        pdf.save("transaction.pdf");
      } else {
        const exceldata = exportstate.response.data;
        const array = {};
        const data = [];
        for (let i = 0; i < exceldata.length; i++) {
          // way to add value in array with key
          array["Date"] = moment(exceldata[i].updated_at).format("DD-MM-YYYY HH:mm:ss");
          array["Excel Name"] = exceldata[i].excel_filename;
          array["type"] = exceldata[i].type;
          array["Data Count"] = exceldata[i].exceldata_count;
          array["Charge"] = exceldata[i].main_charge;
          array["Total Charge Amount"] = exceldata[i].total_charge;
          array["Closing Amount"] = exceldata[i].closing_balance;
          data.push({ ...array });
        }
        const worksheet = XLSX.utils.json_to_sheet(data);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Transaction");
        XLSX.writeFile(workbook, "transaction.xlsx");
      }
      dispatch(Exportstatus());
    } else if (exportstate.status === "failed") {
      console.log(exportstate);
      if (exportstate.error.errors == "token expire") {
        handlelogout();
      }
      dispatch(Exportstatus());
    } else {
    }
  }, [exportstate]);

  // export excel api calling
  const handleexceldata = (e) => {
    if(navigator.onLine == true){
      setPdfDOwnload(false);
      const d = new Date();
      const todaydate = moment(d.toISOString().slice(0, 10)).format("yyyy-MM-DD");
      if (!date) {
        if (!date) {
          error.date = "Start Date Required !!";
        } else {
          error.date = "";
        }
        setError({ ...error, [e.target.name]: e.target.value });
        setTimeout(() => {
          setError([]);
        }, 4000);
      } else {
        dispatch(
          ExportSlice({
            from_date: date,
            to_date: dateto ? dateto : todaydate,
          })
        );
      }
  
      handleopenRecord(e);
    } else {
      setModelOpen(1);
        setModelcount(2);
    }
  };

  // export pdf api calling
  const handlefiledata = (e) => {
    if(navigator.onLine == true){
      setPdfDOwnload(true);
      const d = new Date();
      const todaydate = moment(d.toISOString().slice(0, 10)).format("yyyy-MM-DD");
      if (!date) {
        if (!date) {
          error.date = "Start Date Required !!";
        } else {
          error.date = "";
        }
        setError({ ...error, [e.target.name]: e.target.value });
        setTimeout(() => {
          setError([]);
        }, 4000);
      } else {
        dispatch(
          ExportSlice({
            from_date: date,
            to_date: dateto ? dateto : todaydate,
          })
        );
      }
      handleopenRecord(e);
    } else {
      setModelOpen(1);
        setModelcount(2);
    }
  };

  // row per page api calling
  const handlesetRowperpageChange = (e) => {
    if(navigator.onLine == true){

      const onpage = e.target.value;
      setRowperpage(e.target.value);
      setPage(1);
      dispatch(
        TransactionSlice({
          from_date: Transactiondatas.response.payload.from_date,
          to_date: Transactiondatas.response.payload.to_date,
          per_page: onpage,
          page: 1,
        })
      );
    } else {
      setModelOpen(1);
        setModelcount(2);
    }
  };

  // pagination api
  const handleChange = (event, value) => {
    if(navigator.onLine == true){
      setPage(value);
      dispatch(
        TransactionPaginationSlice({
          from_date: Transactiondatas.response.payload.from_date,
          to_date: Transactiondatas.response.payload.to_date,
          page: value,
          per_page: rowperpage,
        })
      );
    } else{
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
            Transaction Report
          </Typography>
        </div>

        <Paper className={classes.setProductpaper} elevation={5}>
          <Grid container spacing={2} style={{ marginTop: "10px" }}>
            <Grid item xs={12} sm={6} md={4}>
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
              {dbErr && (
                <Typography className={classes.seterrorlabel}>
                  {dbErr}{" "}
                </Typography>
              )}
              {error.date && (
                <Typography className={classes.seterrorlabel}>
                  {error.date}{" "}
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
                onClick={handleopenRecord}
              >
                Submit
              </Button>
            </Grid>
          </Grid>
        </Paper>

        {/* data display                             */}

        {openrecord && (
          <Paper className={classes.setProductpaperview} elevation={5}>
            <TableContainer style={{ margin: 0 }}>
              <Table stickyHeader className={classes.settable}>
                <TableHead>
                  <TableRow>
                    <TableCell align="center" className={classes.tableth}>
                      no
                    </TableCell>
                    <TableCell align="center" className={classes.tableth}>
                      Date
                    </TableCell>
                    <TableCell align="center" className={classes.tableth}>
                      Excel Name
                    </TableCell>
                    <TableCell align="center" className={classes.tableth}>
                      Type
                    </TableCell>
                    <TableCell align="center" className={classes.tableth}>
                      Data Count
                    </TableCell>
                    <TableCell align="center" className={classes.tableth}>
                      Charge
                    </TableCell>
                    
                    <TableCell align="center" className={classes.tableth}>
                      Total Charge Amount
                    </TableCell>
                    <TableCell align="center" className={classes.tableth}>
                      Closing Amount
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {transationRecord.map((e, index) => {
                    return (
                      <StyledTableRow key={e.id}>
                      
                        <StyledTableCell
                          align="center"
                          className={classes.tableth}
                        >
                          {page === 1
                            ? index + 1
                            : rowperpage * page + index - rowperpage + 1}
                        </StyledTableCell>
                        <StyledTableCell
                          align="center"
                          className={classes.tableth}
                        >
                          {/* {e.updated_at} */}
                          {moment(e.updated_at).format("DD-MM-YYYY HH:mm:ss")}
                        </StyledTableCell>
                        <StyledTableCell
                          align="center"
                          className={classes.tableth}
                        >
                          {e.excel_filename}
                        </StyledTableCell>
                        <StyledTableCell
                          align="center"
                          className={classes.tableth}
                        >
                          {e.type}
                        </StyledTableCell>
                        <StyledTableCell
                          align="center"
                          className={classes.tableth}
                        >
                          {e.exceldata_count}
                        </StyledTableCell>
                        <StyledTableCell
                          align="center"
                          className={classes.tableth}
                        >
                          {e.main_charge}
                        </StyledTableCell>
                        
                        <StyledTableCell
                          align="center"
                          className={classes.tableth}
                        >
                          {e.total_charge}
                        </StyledTableCell>
                        <StyledTableCell
                          align="center"
                          className={classes.tableth}
                        >
                          {e.closing_balance}
                        </StyledTableCell>
                      </StyledTableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
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
                    <MenuItem value="200">200.</MenuItem>
                    <MenuItem value="500">500.</MenuItem>
                  {/* <MenuItem value="1">1</MenuItem>
                  <MenuItem value="2">2</MenuItem>
                  <MenuItem value="5">5</MenuItem> */}
                </TextField>
              </div>
              <Pagination
                count={pageCount}
                page={page}
                onChange={handleChange}
                variant="outlined"
                shape="rounded"
              />
            </div>
          </Paper>
        )}
      <Modal
        open={modelOpen}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className='setmodeldisplay'>
        <div >
        {/* <WifiOffIcon /> */}
          <Typography
            className='setmodeltypo'
            id="modal-modal-title"
            variant="h5"
            component="h2"
          >
            No Internet Connection
          </Typography>
          </div>
          <Divider />
          <div className='setbtndeldiv'>
            <Button
              variant="contained"
              onClick={hanldemodelclose}
              className='canclebtn'
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

export default TransactionReport;
