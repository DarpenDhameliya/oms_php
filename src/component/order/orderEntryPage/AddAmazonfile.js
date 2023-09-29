import React, { useState, useEffect } from "react";
import { Grid, Paper } from "@material-ui/core";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@material-ui/core/Button";
import useStylesOrder from "../OrderStyle";
import { Divider } from "@mui/material";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import { styled } from "@mui/material/styles";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableContainer from "@mui/material/TableContainer";
import { ListFetch, Liststate, listfetchstate } from "../../commonLink/ListApi";
import { useDispatch, useSelector } from "react-redux";
import { AmazonSlice, Amazonstate, amazonstatus } from "./slice/AmazonSlice";
import TableBody from "@mui/material/TableBody";
import Checkbox from "@mui/material/Checkbox";
import Backdrop from "@mui/material/Backdrop";
import { DotLoader } from "react-spinners";
import {
  AmazonsenddataSlice,
  Amazonsenddatastate,
  amazonsenddatastatus,
} from "./slice/AmazondatasendSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
function AddAmazonfile() {
  const [amazonid, setAmazonid] = useState("");
  const classes = useStylesOrder();
  const [disabled, setDisabled] = useState(true);
  const [openRecord, setOpenRecord] = useState(false);
  const [openDuplicateRecord, setOpenDuplicateRecord] = useState(false);
  const [isClearable, setIsClearable] = useState(true);
  const [fileErr, setFileErr] = useState("");
  const [filetype, setFiletype] = useState("");
  const [finalSendErr, setFinalSendErr] = useState("");
  const [errors, setErrors] = useState([]);
  const [amazonerrdata, setAmazonerrdata] = useState([]);
  const [commmonWeb, setCommmonWeb] = useState([]);
  const [amazonFile, setAmazonFile] = useState("");
  const [amazondata, setAmazondata] = useState([]);
  const [amazonDuplicate, setAmazonDuplicate] = useState([]);
  const [dberr, setDberr] = useState("");
  const [active, setActive] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();
  const liststate = useSelector(Liststate);
  const amazonstatuss = useSelector(Amazonstate);
  const amazonsenddata = useSelector(Amazonsenddatastate);
  const [modelcount, setModelcount] = useState(1);
  const [modelOpen, setModelOpen] = useState(0);
  const handlelogout = () => {
    localStorage.removeItem("userdata");
    localStorage.removeItem("username");
    localStorage.removeItem("useremail");
    history.push("/");
    window.location.reload();
  };
  const notify = () =>
    toast.success("Data Add Successfully ..  ", {
      autoClose: 3000,
    });
  useEffect(() => {
    if (navigator.onLine == true) {
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
  });
  const hanldemodelclose = () => {
    setModelOpen(0);
  };

  // fetch all list
  useEffect(() => {
    if (liststate.status === "succeeded") {
      const sitedata = [];
      const data = [];
      data.push(liststate.List.list.website_list);

      data[0].forEach((element) => {
        if (element.site_id == 2) {
          sitedata.push(element);
        }
      });
      setCommmonWeb(sitedata);
      dispatch(listfetchstate());
    }
  }, [liststate]);

  // react txt file
  useEffect(() => {
    if (amazonstatuss.status === "Loading") {
      setActive(true);
    } else if (amazonstatuss.status === "succeeded") {
      console.log(amazonstatuss);
      setActive(false);
      setAmazondata(amazonstatuss.response.amazone_data);
      setAmazonDuplicate(amazonstatuss.response.duplicate_data);
      if (amazonstatuss.response.amazone_data.length === 0) {
        setOpenRecord(false);
      } else {
        setOpenRecord(true);
      }
      if (amazonstatuss.response.duplicate_data.length === 0) {
      } else {
        setOpenDuplicateRecord(true);
      }

      dispatch(amazonstatus());
    } else if (amazonstatuss.status === "failed") {
      setActive(false);
      if (amazonstatuss.error.errors == "token expire ") {
        handlelogout();
      } else {
        setDberr(amazonstatuss.error.errors);
        setTimeout(() => {
          setDberr("");
        }, 4000);
      }
      dispatch(amazonstatus());
    } else {
    }
  }, [amazonstatuss]);

  // insert data to db redux
  useEffect(() => {
    if (amazonsenddata.status === "Loading") {
      setActive(true);
    } else if (amazonsenddata.status === "succeeded") {
      notify();
      setActive(false);
      setOpenDuplicateRecord(false);
      setOpenRecord(false);
      setAmazondata([]);
      setAmazonDuplicate([]);
      errStatus = false;
      dispatch(amazonsenddatastatus());
    } else if (amazonsenddata.status === "failed") {
      setActive(false);
      setFinalSendErr(amazonsenddata.error.errors);
      setTimeout(() => {
        setFinalSendErr("");
      }, 3000);
      dispatch(amazonsenddatastatus());
    } else {
    }
  }, [amazonsenddata]);

  const handlesheet = async (e) => {
    const file = e.target.files[0];
    setAmazonFile(file);
  };

  // view doc api
  const handleopenrecord = () => {
    if (navigator.onLine == true) {
      // const extension = amazonFile.name.split(".")[1]
      // console.log(extension)
      console.log(amazonFile);
      // if(extension !== 'txt' || !amazonFile){
      //   if (!amazonFile) {
      //     setFileErr("file Required !!");
      //   }
      //   if (!extension !== 'xlsx') {
      //     setFiletype("upload only txt file !!");
      //   }
      //   setTimeout(() => {
      //     setFileErr("");
      //     setFiletype('')
      //   }, 3000);
      // } else {
      //   dispatch(AmazonSlice({ file: amazonFile }));
      // }
      if (!amazonFile) {
        setFileErr("file Required !!");

        setTimeout(() => {
          setFileErr("");
        }, 3000);
      } else {
        dispatch(AmazonSlice({ file: amazonFile }));
      }
    } else {
      setModelOpen(1);
      setModelcount(2);
    }
  };

  const handleawbdisplay = (index) => (e) => {
    let Array = [...amazondata];
    Array[index]["awb_no"] = e.target.value;
    setAmazondata(Array);
  };

  const handleOnChange = (e) => {
    const { name, checked } = e.target;
    if (e.target.name === "allselect") {
      const tempUser = amazondata.map((user) => {
        return { ...user, isChecked: checked };
      });
      setAmazondata(tempUser);
    } else {
      let tempUser = amazondata.map((user) =>
        user.order_id == name ? { ...user, isChecked: checked } : user
      );
      setAmazondata(tempUser);
    }
  };
  var errStatus = false;

  // send data to db api
  const handlesendrecord = (e) => {
    if (navigator.onLine == true) {
      const Extra_data = [];

      let tempData = amazondata.map((e) => {
        if (e.isChecked) {
          if (e.awb_no === "") {
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
        amazondata.map((e) => {
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

      setAmazonerrdata(sending_data);
      if (sending_data.length === 0 || chehckerr !== 0 || !amazonid) {
        if (!amazonid) {
          errors.amazonid = "Site Name Required";
        } else {
          errors.amazonid = "";
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
        dispatch(
          AmazonsenddataSlice({
            data: sending_data,
            website_id: amazonid.value,
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
          Amazon Entry{" "}
        </Typography>
        <Divider />{" "}
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
                onChange={handlesheet}
                variant="outlined"
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
            {dberr && (
              <Typography className={classes.seterrorlabel}>
                {dberr}{" "}
              </Typography>
            )}
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <div className={classes.setinsidegrid}>
              <Typography className={classes.setlabel}>Account :</Typography>
              <Select
                value={amazonid}
                onChange={setAmazonid}
                className={classes.settextarea}
                isClearable={isClearable}
                placeholder="Select Status"
                classNamePrefix="select"
                options={commmonWeb}
              />
            </div>
            {errors.amazonid && (
              <Typography className={classes.seterrorlabel}>
                {errors.amazonid}{" "}
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
      {openDuplicateRecord && (
        <Paper className={classes.setProductpaperdupliacte} elevation={5}>
          <div>
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
                    <TableCell align="center" className={classes.tableth}>
                      Courier
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {amazonDuplicate.map((e, index) => {
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
            {finalSendErr && (
              <Typography className={classes.seterrorlabel}>
                {finalSendErr}{" "}
              </Typography>
            )}
            {errors.isCheck && (
              <Typography className={classes.seterrorlabel}>
                {errors.isCheck}{" "}
              </Typography>
            )}
            <Table stickyHeader className={classes.settable}>
              <TableHead>
                <TableRow>
                  <TableCell align="center" className={classes.tableth}>
                    <Checkbox
                      checked={
                        !amazondata.some((user) => user?.isChecked !== true)
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
                  <TableCell align="center" className={classes.tableth}>
                    Courier
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {amazondata.map((e, index) => {
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
                      <StyledTableCell
                        className={classes.tabletd}
                        align="center"
                      >
                        {e.qty}
                      </StyledTableCell>
                      {amazonerrdata.map((data) => {
                        if (data.order_id === e.order_id) {
                          if (data.awb_error) {
                            errStatus = true;
                            {
                              /* return (
                                <Typography className={classes.seterrorlabel}>
                                  {data.awb_error}
                                </Typography>
                              ); */
                            }
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
              {errors.amazonid && (
                <Typography className={classes.seterrorlabel}>
                  {errors.amazonid}{" "}
                </Typography>
              )}
              {finalSendErr && (
                <Typography className={classes.seterrorlabel}>
                  {finalSendErr}{" "}
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
        open={active}
      >
        <DotLoader color="white" />
      </Backdrop>{" "}
    </>
  );
}

export default AddAmazonfile;
