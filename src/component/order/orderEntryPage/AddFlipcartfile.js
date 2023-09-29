import React, { useState, useEffect } from "react";
import { Grid, Paper } from "@material-ui/core";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@material-ui/core/Button";
import useStylesOrder from "../OrderStyle";
import { Divider } from "@mui/material";
import { ListFetch, Liststate } from "../../commonLink/ListApi";
import { useDispatch, useSelector } from "react-redux";
import Table from "@mui/material/Table";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import { styled } from "@mui/material/styles";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableContainer from "@mui/material/TableContainer";
import TableBody from "@mui/material/TableBody";
import Checkbox from "@mui/material/Checkbox";
import Backdrop from "@mui/material/Backdrop";
import { DotLoader } from "react-spinners";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  FlipcartSlice,
  Flipcartstate,
  flipcartstatus,
} from "./slice/FlipcartSlice";
import {
  FlipcartsenddataSlice,
  Flipcartsenddatastate,
  Flipcartsenddatastatus,
} from "./slice/FlipcartsenddataSlice";
import { useHistory } from "react-router-dom";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
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
function AddFlipcartfile() {
  const classes = useStylesOrder();
  const [flipcartid, setFlipcartid] = useState("");
  const dispatch = useDispatch();
  const [openRecord, setOpenRecord] = useState(false);
  const [openDuplicateRecord, setOpenDuplicateRecord] = useState(false);
  const [active, setActive] = useState(false);
  const [finalSendErr, setFinalSendErr] = useState("");
  const [fileErr, setFileErr] = useState("");
  const [filetype, setFiletype] = useState("");
  const [flipcarterrdata, setFlipcarterrdata] = useState([]);
  const [flipcartDuplicatedata, setFlipcartDuplicatedata] = useState([]);
  const [flipcartdata, setFlipcartdata] = useState([]);
  const [isClearable, setIsClearable] = useState(true);
  const [errors, setErrors] = useState([]);
  const [modelcount, setModelcount] = useState(1);
  const [modelOpen, setModelOpen] = useState(0);
  const [flipcartfetch, setFlipcartfetch] = useState("");
  const [dbFetchErr, setDbFetchErr] = useState("");
  const [commmonWeb, setCommmonWeb] = useState([]);
  const [disabled, setDisabled] = useState(true);
  const liststate = useSelector(Liststate);
  const flipcartstate = useSelector(Flipcartstate);
  const Flipcartsenddatastates = useSelector(Flipcartsenddatastate);
  const history = useHistory();

  useEffect(() => {
    dispatch(ListFetch());
  }, []);

  const handlelogout = () => {
    localStorage.removeItem("userdata");
    localStorage.removeItem("username");
    localStorage.removeItem("useremail");
    history.push("/");
    window.location.reload();
  };
  // const notify = (data) =>
  //   toast.error(data, {
  //     autoClose: 3000,
  //   });
  const hanldemodelclose = () => {
    setModelOpen(0);
  };

  //network status
  useEffect(() => {
    window.onbeforeunload = function (event) {
      if (navigator.onLine === true) {
        setModelcount(1);
      } else {
        setModelcount(2);
      }
    };

    if (navigator.onLine === true || modelcount != 1) {
    } else {
      setModelOpen(1);
      setModelcount(2);
    }
  });

  // fetch data useeffect
  useEffect(() => {
    if (flipcartstate.status === "loading") {
      setActive(true);
    } else if (flipcartstate.status === "succeeded") {
      setActive(false);
      document.getElementById("handlefiletype").value = null;
      if (flipcartstate.response.flipcart_data.length === 0) {
        setOpenRecord(false);
      } else {
        setFlipcartdata(flipcartstate.response.flipcart_data);
        setOpenRecord(true);
      }
      if (flipcartstate.response.duplicate_data.length === 0) {
        setActive(false);
      } else {
        setFlipcartDuplicatedata(flipcartstate.response.duplicate_data);
        setActive(false);
        setOpenDuplicateRecord(true);
      }
      dispatch(flipcartstatus());
    } else if (flipcartstate.status === "failed") {
      setActive(false);
      // console.log(flipcartstate.error.errors)
      if (flipcartstate.error.errors == "token expire") {
        handlelogout();
      } else {
        setDbFetchErr(flipcartstate.error.errors);
        setTimeout(() => {
          setDbFetchErr("");
        }, 3000);
      }
      dispatch(flipcartstatus());
    } else {
    }
  }, [
    flipcartstate.status === "succeeded",
    flipcartstate.status === "loading",
    flipcartstate.status === "failed",
  ]);

  //set dropdown val beside of input 
  useEffect(() => {
    if (liststate.status === "succeeded") {
      // setCommmonWeb(liststate.List.list.website_list);
      const sitedata = [];
      const data = [];
      data.push(liststate.List.list.website_list);

      data[0].forEach((element) => {
        if (element.site_id == 1) {
          sitedata.push(element);
        }
      });
      setCommmonWeb(sitedata);
    }

    // data fetch time
    // if (flipcartstate.status === "loading") {
    //   setActive(true);
    // } else if (flipcartstate.status === "succeeded") {
    //   setActive(false);
    //   if (flipcartstate.response.flipcart_data.length === 0) {
    //     setOpenRecord(false);
    //   } else {
    //     setFlipcartdata(flipcartstate.response.flipcart_data);
    //     setOpenRecord(true);
    //   }
    //   if (flipcartstate.response.duplicate_data.length === 0) {
    //     setActive(false);
    //   } else {
    //     setFlipcartDuplicatedata(flipcartstate.response.duplicate_data);
    //     setActive(false);
    //     setOpenDuplicateRecord(true);
    //   }
    //   dispatch(flipcartstatus());
    // } else if (flipcartstate.status === "failed") {
    //   setActive(false);
    //   // console.log(flipcartstate.error.errors)
    //   if (flipcartstate.error.errors == "token expire") {
    //     handlelogout();
    //   } else {
    //     setDbFetchErr(flipcartstate.error.errors);
    //     setTimeout(() => {
    //       setDbFetchErr("");
    //     }, 3000);
    //   }
    //   dispatch(flipcartstatus());
    // } else {
    // }

    // data send time
    // if (Flipcartsenddatastates.status === "loading") {
    //   setActive(true);
    // } else if (Flipcartsenddatastates.status === "succeeded") {
    //   setActive(false);
    //   setOpenDuplicateRecord(false);
    //   setOpenRecord(false);
    //   setFlipcartdata([]);
    //   setFlipcartDuplicatedata([]);
    //   errStatus = false
    //   setFlipcartid('')
    //   setFlipcartfetch('')
    //   dispatch(Flipcartsenddatastatus());
    // } else if (Flipcartsenddatastates.status === "failed") {
    //   setActive(false);
    //   if (Flipcartsenddatastates.error.errors == "token expire") {
    //     handlelogout();
    //   } else {
    //     setFinalSendErr(Flipcartsenddatastates.error.errors);
    //     setTimeout(() => {
    //       setFinalSendErr('')
    //     }, 3000);
    //   }
    //   dispatch(Flipcartsenddatastatus());
    // } else {
    // }
  },[liststate]);


  // final submit time
  useEffect(() => {
    if (Flipcartsenddatastates.status === "loading") {
      setActive(true);
    } else if (Flipcartsenddatastates.status === "succeeded") {
      setActive(false);
      setOpenDuplicateRecord(false);
      setOpenRecord(false);
      setFlipcartdata([]);
      setFlipcartDuplicatedata([]);
      errStatus = false;
      setFlipcartid("");
      setFlipcartfetch("");
      dispatch(Flipcartsenddatastatus());
    } else if (Flipcartsenddatastates.status === "failed") {
      setActive(false);
      if (Flipcartsenddatastates.error.errors == "token expire") {
        handlelogout();
      } else {
        setFinalSendErr(Flipcartsenddatastates.error.errors);
        setTimeout(() => {
          setFinalSendErr("");
        }, 3000);
      }
      dispatch(Flipcartsenddatastatus());
    } else {
    }
  }, [Flipcartsenddatastates]);

  // data fetch time api
  const handleopenrecord = () => {
    if (navigator.onLine == true) {
      //       const extension = flipcartfetch.name.split(".")[1]
      // if(extension !== 'xlsx' || !flipcartfetch){
      //   if (!flipcartfetch) {
      //     setFileErr("file Required !!");
      //   }
      //   if (!extension !== 'xlsx') {
      //     setFiletype("upload only excel file !!");
      //   }
      //   setTimeout(() => {
      //     setFileErr("");
      //     setFiletype('')
      //   }, 3000);
      // } else {
      //   dispatch(FlipcartSlice({ file: flipcartfetch }));
      // }

      if (!flipcartfetch) {
        setFileErr("file Required !!");

        setTimeout(() => {
          setFileErr("");
        }, 3000);
      } else {
        dispatch(FlipcartSlice({ file: flipcartfetch }));
      }
    } else {
      setModelOpen(1);
      setModelcount(2);
    }
  };

  // input file handle
  const handlesheet = async (e) => {
    const file = e.target.files[0];
    setFlipcartfetch(file);
  };

  const handleOnChange = (e) => {
    const { name, checked } = e.target;
    if (e.target.name === "allselect") {
      const tempUser = flipcartdata.map((user) => {
        return { ...user, isChecked: checked };
      });
      setFlipcartdata(tempUser);
    } else {
      let tempUser = flipcartdata.map((user) =>
        user.order_id === name ? { ...user, isChecked: checked } : user
      );
      setFlipcartdata(tempUser);
    }
  };

  const handleawbdisplay = (index) => (e) => {
    let Array = [...flipcartdata];
    Array[index]["awb_no"] = e.target.value;
    setFlipcartdata(Array);
  };

  // data send time
  var errStatus = false;
  const handlesendrecord = (e) => {
    if (navigator.onLine == true) {
      const Extra_data = [];
      let tempData = flipcartdata.map((e) => {
        if (e.isChecked) {
          if (e.awb_no == null || e.awb_no == "") {
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
      {
        flipcartdata.map((e) => {
          {
            tempData.map((data) => {
              if (!data) {
              } else {
                if (data.order_id === e.order_id) {
                  sending_data.push(data);
                  if (data.awb_error !== undefined) {
                    chehckerr = chehckerr + 1;
                  }
                }
              }
            });
          }
        });
      }
      setFlipcarterrdata(sending_data);
      if (sending_data.length === 0 || chehckerr !== 0 || !flipcartid) {
        if (!flipcartid) {
          errors.flipcartid = "Site Name Required";
        } else {
          errors.flipcartid = "";
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
        console.log(sending_data);
        dispatch(
          FlipcartsenddataSlice({
            data: sending_data,
            website_id: flipcartid.value,
          })
        );
      }
    } else {
      setModelOpen(1);
      setModelcount(2);
    }
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        closeOnClick
        style={{ marginTop: "55px" }}
      />
      <Paper className={classes.setProductpaper} elevation={5}>
        <Typography className={classes.setHeadinglabel}>
          Flipcart Entry{" "}
        </Typography>
        <Divider />
        <Grid container spacing={2} style={{ marginTop: "10px" }}>
          <Grid item xs={12} sm={6} md={4}>
            <div className={classes.setinsidegrid}>
              <Typography className={classes.setlabel}>
                Import File :
              </Typography>
              <TextField
                id="handlefiletype"
                size="small"
                type="file"
                variant="outlined"
                onChange={handlesheet}
                className={classes.settextfield}
              />
            </div>
            {fileErr && (
              <Typography className={classes.seterrorlabel}>
                {fileErr}{" "}
              </Typography>
            )}
            {filetype && (
              <Typography className={classes.seterrorlabel}>
                {filetype}{" "}
              </Typography>
            )}
            {dbFetchErr && (
              <Typography className={classes.seterrorlabel}>
                {dbFetchErr}{" "}
              </Typography>
            )}
            {/* {nodataErr && (
              <Typography className={classes.seterrorlabel}>
                {nodataErr}{" "}
              </Typography>
            )} */}
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <div className={classes.setinsidegrid}>
              <Typography className={classes.setlabel}>Account :</Typography>
              <Select
                value={flipcartid}
                onChange={setFlipcartid}
                className={classes.settextarea}
                isClearable={isClearable}
                placeholder="Select Status"
                classNamePrefix="select"
                // getOptionValue={(option) => option.id}
                // getOptionLabel={(option) => option.unit}
                options={commmonWeb}
              />
              {errors.flipcartid && (
                <Typography className={classes.seterrorlabel}>
                  {errors.flipcartid}{" "}
                </Typography>
              )}
            </div>
          </Grid>
          <Grid item xs={12} md={4} className={classes.setbtngrid}>
            <Button
              variant="contained"
              className={classes.setproductbtnsend}
              onClick={handleopenrecord}
            >
              Save
            </Button>
          </Grid>
        </Grid>
      </Paper>

      {openDuplicateRecord && (
        <Paper className={classes.setProductpaperdupliacte} elevation={5}>
          <div className={classes.setduplicatedatadiv}>
            <Typography className={classes.seterrorlabelduplicate}>
              Updated Data
            </Typography>
            <Divider />
          </div>
          <Paper className={classes.setinsidepaper}>
            <TableContainer>
              <Table stickyHeader className={classes.settable}>
                <TableHead>
                  <TableRow>
                    <TableCell align="center" className={classes.tableth}>
                      Order Id
                    </TableCell>
                    <TableCell align="center" className={classes.tableth}>
                      Product Name
                    </TableCell>
                    <TableCell align="center" className={classes.tableth}>
                      Qty
                    </TableCell>
                    <TableCell align="center" className={classes.tableth}>
                      Awb
                    </TableCell>
                    <TableCell align="center" className={classes.tableth}>
                      Amount
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {flipcartDuplicatedata.map((e, index) => {
                    return (
                      <StyledTableRow>
                        <StyledTableCell
                          align="center"
                          className={classes.tabletd}
                        >
                          {e.order_id}
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
                          {e.qty}
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
                          {e.invoice_amount}
                        </StyledTableCell>
                      </StyledTableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Paper>
      )}

      {openRecord && (
        <Paper className={classes.setProductpaper} elevation={5}>
          <TableContainer>
            {errors.isCheck && (
              <Typography className={classes.seterrorlabel}>
                {errors.isCheck}{" "}
              </Typography>
            )}
            {finalSendErr && (
              <Typography className={classes.seterrorlabel}>
                {finalSendErr}{" "}
              </Typography>
            )}
            <Table stickyHeader className={classes.settable}>
              <TableHead>
                <TableRow>
                  <TableCell align="center" className={classes.tableth}>
                    <Checkbox
                      checked={
                        !flipcartdata.some((user) => user?.isChecked !== true)
                      }
                      onChange={handleOnChange}
                      name="allselect"
                    />{" "}
                  </TableCell>
                  <TableCell align="center" className={classes.tableth}>
                    Order Id
                  </TableCell>
                  <TableCell align="center" className={classes.tableth}>
                    Product Name
                  </TableCell>
                  <TableCell align="center" className={classes.tableth}>
                    Qty
                  </TableCell>
                  <TableCell align="center" className={classes.tableth}>
                    Awb
                  </TableCell>
                  <TableCell align="center" className={classes.tableth}>
                    Amount
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {flipcartdata.map((e, index) => {
                  return (
                    <StyledTableRow>
                      <StyledTableCell
                        key={e.order_id}
                        align="center"
                        className={classes.tabletd}
                      >
                        <Checkbox
                          name={e.order_id}
                          checked={e?.isChecked || false}
                          onChange={handleOnChange}
                        />{" "}
                      </StyledTableCell>
                      <StyledTableCell
                        align="center"
                        className={classes.tabletd}
                      >
                        {e.order_id}
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
                        {e.qty}
                      </StyledTableCell>
                      {flipcarterrdata.map((data) => {
                        if (data.order_id === e.order_id) {
                          if (data.awb_error) {
                            errStatus = true;
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
                          id="awb_no"
                          name="awb_no"
                          style={{ minWidth: "130px" }}
                          value={e.awb_no}
                          onChange={handleawbdisplay(index)}
                          className={classes.settextfield}
                        />
                      </StyledTableCell>
                      <StyledTableCell
                        className={classes.tabletd}
                        align="center"
                      >
                        {e.invoice_amount}
                      </StyledTableCell>
                      {/* <TableCell className={classes.tabletd} align="center">
                        {e.courier_name}
                      </TableCell> */}
                    </StyledTableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
          <div className={classes.setendbtn}>
            <div>
              {errors.flipcartid && (
                <Typography className={classes.seterrorlabel}>
                  {errors.flipcartid}{" "}
                </Typography>
              )}
              {finalSendErr && (
                <Typography className={classes.seterrorlabel}>
                  {finalSendErr}{" "}
                </Typography>
              )}
            </div>
            {/* {btndisplay && (
              <Button
                variant="contained"
                className={classes.setproductbtnsendremove}
                onClick={removedata}
              >
                Remove Data
              </Button>
            )} */}
            <Button
              variant="contained"
              className={classes.setproductbtnsend}
              onClick={handlesendrecord}
            >
              Save
            </Button>
          </div>
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

      <Backdrop
        sx={{
          color: "#fff",
          backgroundColor: "#000000a1",
          zIndex: (theme) => theme.zIndex.drawer + 2,
        }}
        // open={upid ? active : upActive}
        open={active}
      >
        <DotLoader color="white" />
      </Backdrop>
    </>
  );
}

export default AddFlipcartfile;
