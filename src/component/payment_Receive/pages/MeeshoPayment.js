import React, { useState, useEffect } from "react";
import { Grid, Paper } from "@material-ui/core";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Button from "@material-ui/core/Button";
import useStylesOrder from "../../order/OrderStyle";
import { Divider } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableContainer from "@mui/material/TableContainer";
import { ListFetch, Liststate ,listfetchstate } from "../../commonLink/ListApi";
import { MesshoReadSlice , Messhoreadstatus , Messhoreadstate} from "./Slice/MesshoRead";
import Checkbox from "@mui/material/Checkbox";
// import {
//   MesshosenddataSlice,
//   Messhosenddatastatus,
//   Messhosenddatastate,
// } from "./slice/MesshodatasendSlice";

import { useDispatch, useSelector } from "react-redux";
import Backdrop from "@mui/material/Backdrop";
import { DotLoader } from "react-spinners";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import { styled } from "@mui/material/styles";
import TablePagination from "@mui/material/TablePagination";
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

const MeeshoPayment = () => {
  const [websiteid, setWebsiteid] = useState("");
  const [openRecord, setOpenRecord] = useState(false);
  const [openDuplicateRecord, setOpenDuplicateRecord] = useState(false);
  const dispatch = useDispatch();
  const [active, setActive] = useState(false);
  const [isClearable, setIsClearable] = useState(true);
  const [fileErr, setFileErr] = useState("");
  const [messhotfetch, setMesshotfetch] = useState([]);
  const [messhodata, setMesshodata] = useState([]);
  const [messhoDuplicatedata, setMesshoDuplicatedata] = useState([]);
  const [filetype, setFiletype] = useState('');
  const [messhoerrdata, setMesshoerrdata] = useState([]);
  const [errors, setErrors] = useState([]);
  const [dbFetchErr, setDbFetchErr] = useState("");
  const [commmonWeb, setCommmonWeb] = useState([]);
  const [dbSendErr, setDbSendErr] = useState("");
  const [modelcount, setModelcount] = useState(1);
  const [modelOpen, setModelOpen] = useState(0);

  const handlelogout = () => {
    localStorage.removeItem("userdata");
    localStorage.removeItem("username");
    localStorage.removeItem("useremail");
    history.push("/");
    window.location.reload();
  };

  const history = useHistory();
  const liststate = useSelector(Liststate);
  // const messhostate = useSelector(Messhostate);
  const messhoread = useSelector(Messhoreadstate);
  console.log(messhoread)
  useEffect(() => {
    if(navigator.onLine == true){
      dispatch(ListFetch());
    } else {
      setModelOpen(1);
        setModelcount(2);
    }
  }, []);

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
    if (liststate.status === "succeeded") {
      // setCommmonWeb(liststate.List.list.website_list);
      const sitedata = []
      const data = []
      data.push(liststate.List.list.website_list)

      data[0].forEach(element => {
        if (element.site_id == 3){
          sitedata.push(element)
        }
      });
      setCommmonWeb(sitedata)
      dispatch(listfetchstate())

    }   
    //  if (liststate.status === "failed") {
    //   handlelogout();
    //  }

    // data fetch time
    // if (messhostate.status === "loading") {
    //   setActive(true)
    // } else if (messhostate.status === "succeeded") {
    //   setMesshotfetch([]);
    //   // if(messhostate.response.meesho_data.length === 0){
    //   //   setOpenRecord(false)
    //   // } else {
    //   //   setOpenRecord(true);
    //   //   setMesshodata(messhostate.response.meesho_data);
    //   // }
    //   if (messhostate.response.duplicate_data.length === 0) {
    //     setActive(false)
    //   } else {
    //     setActive(false)
    //     setOpenDuplicateRecord(true);
    //     setMesshoDuplicatedata(messhostate.response.duplicate_data);
    //   }
    //   setActive(false)
    //   dispatch(Messhostatus());
    // } else if (messhostate.status === "failed") {
    //   setActive(false)
    //   if(messhostate.error.message == 'token expire'){
    //     handlelogout();
    //   } else {
    //     setDbFetchErr(messhostate.error.message);
    //     setTimeout(() => {
    //       setDbFetchErr("");
    //     }, 3000);
    //   }
    //   // console.log(messhostate.error.message)
    //   dispatch(Messhostatus());
    // } else {
    // }

    if(messhoread === 'loading'){
      setActive(true)
    } else if (messhoread === 'succeeded'){
      setActive(false)
      console.log(messhoread)
    }  else if (messhoread === 'failed'){
      setActive(false)
      console.log(messhoread);
    } else {

    }


    // data send time
    // if (messhosenddatastates.status === "loading") {
    //   setActive(true);
    // } else if (messhosenddatastates.status === "succeeded") {
    //   setActive(true);
    //   errStatus = false
    //   setWebsiteid("");
    //   setMesshotfetch('')
    //   setOpenDuplicateRecord(false);
    //   setOpenRecord(false);
    //   setMesshodata([]);
    //   setMesshoDuplicatedata([]);

    //   dispatch(Messhosenddatastatus());
    // } else if (messhosenddatastates.status === "failed") {
    //   setActive(false);
    //   console.log(messhosenddatastates.error)
    //   setDbSendErr(messhosenddatastates.error.errors);
    //   setTimeout(() => {
    //     setDbSendErr("");
    //   }, 4000);
    //   dispatch(Messhosenddatastatus());
    // } else {
    //   // setActive(false);
    // }
  });

  const classes = useStylesOrder();
  const handlewebsiteChange = (e) => {
    setWebsiteid(e.target.value);
  };

  // fetch data
  const handleopenrecord = () => {
    // if(navigator.onLine == true){
    //   console.log(messhotfetch.length === 0)
    //   let extension = messhotfetch.name.split(".")[1]
    //   if(extension !== 'pdf' || messhotfetch.length === 0){
    //     if (messhotfetch.length === 0) {
    //       setFileErr("file Required !!");
    //     }
    //     if (!extension !== 'pdf') {
    //       setFiletype("upload only pdf file !!");
    //     }
    //     setTimeout(() => {
    //       setFileErr("");
    //       setFiletype('')
    //     }, 3000);
    //   } else {
    //   }
    // } else {
    //   setModelOpen(1);
    //   setModelcount(2);
    // }
    dispatch(MesshoReadSlice({ file: messhotfetch }));
  };

  const handlesheet = async (e) => {
    const file = e.target.files[0];
    setMesshotfetch(file);
  };

  // const handleOnChange = (e) => {
  //   const { name, checked } = e.target;
  //   if (e.target.name === "allselect") {
  //     const tempUser = messhodata.map((user) => {
  //       return { ...user, isChecked: checked };
  //     });
  //     setMesshodata(tempUser);
  //   } else {
  //     let tempUser = messhodata.map((user) =>
  //       user.order_id === name ? { ...user, isChecked: checked } : user
  //     );
  //     setMesshodata(tempUser);
  //   }
  // };

  // const handleawbdisplay = (index) => (e) => {
  //   let Array = [...messhodata];
  //   Array[index]["awb_no"] = e.target.value;
  //   setMesshodata(Array);
  // };

  var errStatus = false
  // const handlesendrecord = (e) => {
  //   if(navigator.onLine == true){
  //     const Extra_data = [];
  //     let tempData = messhodata.map((e) => {
  //       if (e.isChecked) {
  //         if (e.awb_no === "") {
  //           return { ...e, awb_error: "AWB is Required" };
  //         } else {
  //           return { ...e };
  //         }
  //       } else {
  //         Extra_data.push(e);
  //       }
  //     });
  
  //     let chehckerr = 0;
  //     const sending_data = [];
  //     {
  //       messhodata.map((e) => {
  //         {
  //           tempData.map((data) => {
  //             if (!data) {
  //             } else {
  //               if (data.order_id === e.order_id) {
  //                 sending_data.push(data);
  //                 if (data.awb_error !== undefined) {
  //                   chehckerr = chehckerr + 1;
  //                 }
  //               }
  //             }
  //           });
  //         }
  //       });
  //     }
  //     setMesshoerrdata(sending_data);
  //     if (sending_data.length === 0 || chehckerr !== 0 || !websiteid) {
  //       if (!websiteid) {
  //         errors.websiteid = "Site Name Required";
  //       } else {
  //         errors.websiteid = "";
  //       }
  
  //       if (sending_data.length === 0) {
  //         errors.isCheck = "Please select data";
  //       } else {
  //         errors.isCheck = "";
  //       }
  
  //       setErrors({ ...errors, [e.target.name]: e.target.value });
  //       setTimeout(() => {
  //         setErrors([]);
  //       }, 3000);
  //     } else {
  //       dispatch(
  //         MesshosenddataSlice({
  //           data: sending_data,
  //           website_id: websiteid.value,
  //         })
  //       );
  //       // dispatch(MesshoUncheckdatastatus(Extra_data));
  //     }
  //   } else {
  //     setModelOpen(1);
  //     setModelcount(2);
  //   }
  // };
  return <>
       <ToastContainer
          position="top-right"
          closeOnClick
          style={{ marginTop: "55px" }}
        />
      <Paper className={classes.setProductpaper} elevation={5}>
        <Typography className={classes.setHeadinglabel}>
          Meesho Entry
        </Typography>
        <Divider />
        <Grid container spacing={2} style={{ marginTop: "10px" }}>
          <Grid item xs={12} sm={6} md={4}>
            <div className={classes.setinsidegrid}>
              <Typography className={classes.setlabel}>
                Import File :
              </Typography>
              <TextField
                id="outlined-basic"
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
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <div className={classes.setinsidegrid}>
              <Typography className={classes.setlabel}>Website :</Typography>
              {/* <Select
                value={websiteid}
                onChange={setWebsiteid}
                className={classes.settextarea}
                isClearable={isClearable}
                placeholder="Select Status"
                classNamePrefix="select"
                options={commmonWeb}
               /> */}
            </div>
            {errors.websiteid && (
              <Typography className={classes.seterrorlabel}>
                {errors.websiteid}{" "}
              </Typography>
            )}
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

      {/* {openDuplicateRecord && (
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
                      Awb
                    </TableCell>
                    <TableCell align="center" className={classes.tableth}>
                      Qty
                    </TableCell>
                    <TableCell align="center" className={classes.tableth}>
                      courier
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {messhoDuplicatedata.map((e, index) => {
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
                          {e.awb_no}
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
                          {e.courier_name}
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
            {dbSendErr && (
              <Typography className={classes.seterrorlabel}>
                {dbSendErr}
              </Typography>
            )}
            <Table stickyHeader className={classes.settable}>
              <TableHead>
                <TableRow>
                  <TableCell align="center" className={classes.tableth}>
                    <Checkbox
                      checked={
                        !messhodata.some((user) => user?.isChecked !== true)
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
                    AwB No
                  </TableCell>

                  <TableCell align="center" className={classes.tableth}>
                    qty
                  </TableCell>
                  <TableCell align="center" className={classes.tableth}>
                    Courier
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {messhodata.map((e, index) => {
                  return (
                    <StyledTableRow>
                      <StyledTableCell
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
                      {messhoerrdata.map((data) => {
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
                        {e.qty}
                      </StyledTableCell>
                      <StyledTableCell
                        className={classes.tabletd}
                        align="center"
                      >
                        {e.courier_name}
                      </StyledTableCell>
                    </StyledTableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
          <div className={classes.setendbtn}>
          <div>
          {dbSendErr && (
              <Typography className={classes.seterrorlabel}>
                {dbSendErr}
              </Typography>
            )}
            {errors.websiteid && (
              <Typography className={classes.seterrorlabel}>
                {errors.websiteid}{" "}
              </Typography>
            )}
          </div>
            <Button
              variant="contained"
              className={classes.setproductbtnsend}
              onClick={handlesendrecord}
            >
              Save
            </Button>
          </div>
        </Paper>
      )} */}
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
        // open={upid ? active : upActive}
        open={active}
      >
        <DotLoader color="white" />
      </Backdrop>
  </>;
};

export default MeeshoPayment;
