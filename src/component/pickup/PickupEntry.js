/* eslint-disable no-lone-blocks */
import React, { useState, useEffect } from "react";
import Container from "@mui/material/Container";
import { Grid, Paper } from "@material-ui/core";
import Typography from "@mui/material/Typography";
import Button from "@material-ui/core/Button";
import useStylesPickupEntry from "./PickupEntryStyle";
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
import { Liststate, ListFetch } from "../commonLink/ListApi";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import DatePicker from "react-date-picker/dist/entry.nostyle";
import "react-calendar/dist/Calendar.css";
import "react-date-picker/dist/DatePicker.css";
import {
  PickUpSlice,
  Pickupstate,
  pickupchangestatus,
} from "./slice/PickupAwbSlice";
import { orderType } from "../commonLink/OrderList";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import {
  PickupCheckSlice,
  Pickupsheckstate,
  pickuupcheckedchangestate,
} from "./slice/PickupChecked";
import {
  pickupunchangestatus,
  Pickupuncheckstate,
} from "./slice/PickupUncheckdata";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Backdrop from "@mui/material/Backdrop";
import { DotLoader } from "react-spinners";
import { useHistory } from "react-router-dom";
import Select from "react-select";

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
function PickupEntry() {
  const [openrecord, setOpenrecord] = useState(false);
  const [active, setActive] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [courierList, setCourierList] = useState([]);
  const [courierid, setCourierid] = useState("");
  const [isClearable, setIsClearable] = useState(true);
  const [awbid, setAwbid] = useState("");
  const [date, setDate] = useState("");
  const [pickupList, setPickupList] = useState([]);
  const [odrEntryErr, setOdrEntryErr] = useState("");
  const [awbErr, setAwbErr] = useState("");
  const [dberr, setDberr] = useState([]);
  const [errors, setErrors] = useState([]);
  const [copyData, setCopyData] = useState([]);
  const [sendDberr, setSendDberr] = useState([])
  const [modelcount, setModelcount] = useState(1);
  const [modelOpen, setModelOpen] = useState(0);
  const classes = useStylesPickupEntry();
  const dispatch = useDispatch();
  const liststate = useSelector(Liststate);
  const pickupawbstate = useSelector(Pickupstate);
  const pickupcheckstate = useSelector(Pickupsheckstate);
  const pickupUnChangestate = useSelector(Pickupuncheckstate);
  const history = useHistory();
  const notify = () =>
    toast.success("Data Update Successfully ..  ", {
      autoClose: 3000,
    });

  const handleawbid = (e) => {
    setAwbid(e.target.value);
    setAwbErr("");
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
  const hanldemodelclose = () => {
    setModelOpen(0);
  };
  useEffect(() => {
    if(navigator.onLine == true){
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

  const handlelogout = () => {
    localStorage.removeItem("userdata");
    localStorage.removeItem("username");
    localStorage.removeItem("useremail");
    history.push("/");
    window.location.reload();
  };

  // get data and kist redux
  useEffect(() => {
    if (liststate.status === "succeeded") {
      setCourierList(liststate.List.list.courier_list);
    }

    // data fetch
    if (pickupawbstate.status === "loading") {
      setActive(true);
    } else if (pickupawbstate.status === "succeeded") {
      setOpenrecord(true);
      setActive(false);
      // console.log(pickupawbstate.response.data);
      if (pickupList.length === 0) {
        setAwbid("");
        setPickupList(pickupawbstate.response.data);
      } else {
        let index = pickupList.findIndex(
          (object) =>
            object.order_id == pickupawbstate.response.data[0].order_id
        );
        if (index === -1) {
          setAwbid("");
          setPickupList((prevArray) => [
            ...prevArray,
            pickupawbstate.response.data[0],
          ]);
        } else {
          setOdrEntryErr("Record already exist");
          setAwbid("");
          setTimeout(() => {
            setOdrEntryErr("");
          }, 4000);
        }
      }
      dispatch(pickupchangestatus());
    } else if (pickupawbstate.status === "failed") {
      setActive(false);
      if (pickupawbstate.error.errors == "token expire") {
        handlelogout();
      } else {
        setDberr(pickupawbstate.error.errors);
        setTimeout(() => {
          setDberr([]);
        }, 4000);
      }
      dispatch(pickupchangestatus());
    } else {
    }
  }, [liststate,pickupawbstate])
  
  // send updated data to db redux
  useEffect(() => {
    if (pickupcheckstate.status === "loading") {
      setActive(true);
    } else if (pickupcheckstate.status === "succeeded") {
      setActive(false);
      setPickupList([]);
      setErrors([]);
      errStatus = false
      setDate("");
      setCourierid("");
      notify();
      let data = pickupUnChangestate.response.payload;
      if (data.length === 0) {
        setOpenrecord(false);
      } else {
        setPickupList(data);
      }
      dispatch(pickuupcheckedchangestate());
    } else if (pickupcheckstate.status === "failed") {
      setActive(false);
      console.log(pickupcheckstate.error.errors);
      setSendDberr(pickupcheckstate.error.errors)
      setTimeout(() => {
        setSendDberr([])
      }, 3000);
      dispatch(pickuupcheckedchangestate());
    } else {
    }
  }, [pickupcheckstate]);

  const handleawbdisplay = (index) => (e) => {
    let Array = [...pickupList];
    Array[index]["awb_no"] = e.target.value;
    setPickupList(Array);
  };

  // fetch data api
  const handlesendawb = () => {
    if(navigator.onLine == true){

      if (!awbid) {
        setAwbErr("Id Required !!");
        setTimeout(() => {
          setAwbErr("");
        }, 4000);
      } else {
        dispatch(PickUpSlice({ order_id: awbid }));
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
      const tempUser = pickupList.map((user) => {
        return { ...user, isChecked: checked };
      });
      setPickupList(tempUser);
    } else {
      let tempUser = pickupList.map((user) =>
        user.o_id == name ? { ...user, isChecked: checked } : user
      );
      setPickupList(tempUser);
    }
  };

  // send data to db api
  var errStatus = false
  const handleadddata = (e) => {
    if(navigator.onLine == true){

      const Extra_data = [];
  
      let tempData = pickupList.map((e) => {
        if (e.isChecked) {
          if (e.awb_no === null) {
            return { ...e, awb_error: "AWB is Required" };
          } else {
            return { ...e };
          }
        } else {
          Extra_data.push(e);
        }
      });
  
      let chehckerr = 0;
      const sending_data = [];
      // eslint-disable-next-line no-lone-blocks
      {
        pickupList.map((e) => {
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
      setCopyData(sending_data);
      if (!date || !courierid || sending_data.length === 0 || chehckerr !== 0) {
        if (!date) {
          errors.date = "Date Required";
        } else {
          errors.date = "";
        }
        if (!courierid) {
          errors.courierid = "Courier Name Required";
        } else {
          errors.courierid = "";
        }
  
        if (sending_data.length === 0) {
          errors.isCheck = "Please select data";
        } else {
          errors.isCheck = "";
        }
  
        setErrors({ ...errors, [e.target.name]: e.target.value });
        setTimeout(() => {
          setErrors([]);
        }, 3000);
      } else {
        const stdate = moment(date).format('YYYY-MM-DD')
        dispatch(
          PickupCheckSlice({
            data: sending_data,
            dispatch_date: stdate,
            courier_id: courierid,
          })
        );
        dispatch(pickupunchangestatus(Extra_data));
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
            PIckup Entry
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
              {odrEntryErr && (
                <Typography className={classes.seterrorlabel}>
                  {odrEntryErr}{" "}
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
                className={classes.setproductbtnsend}
                onClick={handlesendawb}
              >
                Save
              </Button>
            </Grid>
          </Grid>
        </Paper>

        {openrecord && (
          <Paper className={classes.setProductpaper} elevation={5}>
          {sendDberr && (
                  <Typography className={classes.seterrorlabel}>
                    {sendDberr}{" "}
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
                  {/* <TextField
                  fullWidth
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
                  className={classes.setdatepicker}
                />
                </div>
                {errors.date && (
                  <Typography className={classes.seterrorlabel}>
                    {errors.date}{" "}
                  </Typography>
                )}
              </Grid>
              <Grid
                item
                xs={12}
                sm={6}
                md={4}
                className={classes.setinputlayout}
              >
                <div className={classes.setinputlayout}>
                  <Typography className={classes.setlabel}>Courier</Typography>
                  <Select
                value={courierid}
                onChange={setCourierid}
                className={classes.settextarea}
                isClearable={isClearable}
                placeholder="Select courier"
                classNamePrefix="select"
                getOptionValue={(option) => option.value}
                getOptionLabel={(option) => option.label}
                options={courierList}
               />
                </div>
                {errors.courierid && (
                  <Typography className={classes.seterrorlabel}>
                    {errors.courierid}
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
                          !pickupList.some((user) => user?.isChecked !== true)
                        }
                        onChange={handleOnChange}
                        name="allselect"
                      />{" "}
                    </TableCell>
                    <TableCell align="center" className={classes.tableth} style={{minWidth:"150px"}}>
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
                  {pickupList.map((e, index) => {
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
                        </StyledTableCell>
                        <StyledTableCell className={classes.tabletd} align="center">
                          {e.product_name}
                        </StyledTableCell>
                        <StyledTableCell className={classes.tabletd} align="center">
                          {e.order_id}
                        </StyledTableCell>
                        {copyData.map((data) => {
                            if (data.o_id === e.o_id) {
                              if (data.awb_error) {
                                errStatus = true
                                {/* return (
                                  <Typography
                                    className={classes.setcheckerrorlabel}
                                  >
                                    {data.awb_error}
                                  </Typography>
                                ); */}
                              }
                            }
                          })}
                        <StyledTableCell className={classes.tabletd} align="center">
                          <TextField
                            error = {errStatus}
                            disabled={!e.isChecked && disabled}
                            size="small"
                            variant="outlined"
                            id="awb_no"
                            name="awb_no"
                            style={{ minWidth: "160px" }}
                            value={e.awb_no}
                            onChange={handleawbdisplay(index)}
                            className={classes.settextfield}
                          />                          
                        </StyledTableCell>
                        <StyledTableCell className={classes.tabletd} align="center">
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
                        <StyledTableCell className={classes.tabletd} align="center">
                          {e.website_name}
                        </StyledTableCell>
                        <StyledTableCell className={classes.tabletd} align="center">
                          {e.courier_name}
                        </StyledTableCell>
                        <StyledTableCell className={classes.tabletd} align="center">
                          {e.qty}
                        </StyledTableCell>
                        <StyledTableCell className={classes.tabletd} align="center">
                          {e.order_amount}
                        </StyledTableCell>
                      </StyledTableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
            <div className={classes.setfinsubmit}>
            {sendDberr && (
                  <Typography className={classes.seterrorlabel}>
                    {sendDberr}{" "}
                  </Typography>
                )}
              <Button
                variant="contained"
                className={classes.setproductbtnfinalsend}
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
      <Backdrop
        sx={{
          color: "#fff",
          backgroundColor: "#000000a1",
          zIndex: (theme) => theme.zIndex.drawer + 2,
        }}
        open={active}
      >
        <DotLoader color="white" />
      </Backdrop>{" "}
    </>
  );
}

export default PickupEntry;
