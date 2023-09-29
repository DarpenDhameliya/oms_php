import React, { useState, useEffect } from "react";
import Container from "@mui/material/Container";
import { Divider, Grid, Paper } from "@material-ui/core";
import Typography from "@mui/material/Typography";
import Button from "@material-ui/core/Button";
import useStylesCourier from "./CourierStyle";
import TextField from "@mui/material/TextField";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Tooltip from "@mui/material/Tooltip";
import ClearIcon from "@mui/icons-material/Clear";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Liststate, ListFetch } from "../../commonLink/ListApi";
import {
  AddCourierSlice,
  Addcourierstate,
  Addcourierstateslice,
} from "./Slice/CourierAddSlice";
import {
  EditCourierSlice,
  Editcoirierstate,
  Editcourierstateslice,
} from "./Slice/CourierEditSlice";
import {
  DeleteCourierSlice,
  Deletecoirierstate,
  Delcourierstateslice,
} from "./Slice/CourierDelSlice";
import Backdrop from "@mui/material/Backdrop";
import { DotLoader } from "react-spinners";
import { TableContainer } from "@mui/material";
import { styled } from "@mui/material/styles";
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
function CourierList() {
  const [modelOpen, setModelOpen] = useState(false);
  const [courieLIst, setCourieLIst] = useState([]);
  const [name, setName] = useState("");
  const [upname, setUpname] = useState("");
  const [upid, setUpid] = useState("");
  const [upnameerr, setUpnameerr] = useState("");
  const [nameerr, setNameerr] = useState("");
  const [dberr, setDberr] = useState("");
  const [dbAdderr, setDbAdderr] = useState("");
  const [delid, setDelid] = useState("");
  const [active, setActive] = useState(false);
  const [modelcount, setModelcount] = useState(1);
  const [modelOpennet, setModelOpennet] = useState(0);
  const [deleteCou, setDeleteCou] = useState([]);
  const dispatch = useDispatch();
  const liststate = useSelector(Liststate);
  const courieraddstate = useSelector(Addcourierstate);
  const couriereditstate = useSelector(Editcoirierstate);
  const courierdelstate = useSelector(Deletecoirierstate);
  const classes = useStylesCourier();
  const history = useHistory();

  const notify = () =>
    toast.error("You Can't Delete this Courier.", {
      autoClose: 3000,
    });
  const handledelete = (record) => {
    const delid = record.value;
    setDelid(delid);
    setModelOpen(true);
  };

  useEffect(() => {
    dispatch(ListFetch());
  }, []);
  const hanldemodelclose = () => {
    setModelOpennet(0);
  };
  const handlelogout = () => {
    localStorage.removeItem("userdata");
    localStorage.removeItem("username");
    localStorage.removeItem("useremail");
    history.push("/");
    window.location.reload();
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
      setModelOpennet(1);
      setModelcount(2);
    }
  });

  useEffect(() => {
    if (liststate.status === "loading") {
      setActive(true);
    } else if (liststate.status === "succeeded") {
      setActive(false);
      setCourieLIst(liststate.List.list.courier_list);
    } else if (liststate.status === "failed") {
      setActive(false);
      if (liststate.error.errors == "token expire") {
        handlelogout();
      }
    } else {
    }
  }, [liststate]);

  useEffect(() => {
    if (couriereditstate.status === "loading") {
      console.log(active);
      setActive(true);
    } else if (couriereditstate.status === "succeeded") {
      setActive(false);
      setUpname("");
      dispatch(ListFetch());
      dispatch(Editcourierstateslice());
    } else if (couriereditstate.status === "failed") {
      setActive(false);
      if (couriereditstate.error.errors == "token expire") {
        handlelogout();
      } else {
        setDberr(couriereditstate.error.errors);
        setTimeout(() => {
          setDberr("");
        }, 4000);
        dispatch(ListFetch());
      }
      dispatch(Editcourierstateslice());
    } else {
    }
  }, [couriereditstate]);

  useEffect(() => {
    if (courieraddstate.status === "loading") {
      setActive(true);
    } else if (courieraddstate.status === "succeeded") {
      setActive(false);
      setName("");
      dispatch(ListFetch());
      dispatch(Addcourierstateslice());
    } else if (courieraddstate.status === "failed") {
      setActive(false);
      if (courieraddstate.error.errors == "token expire") {
        handlelogout();
      } else {
        setDbAdderr(courieraddstate.error.errors);
        setTimeout(() => {
          setDbAdderr("");
        }, 4000);
        dispatch(ListFetch());
      }
      dispatch(Addcourierstateslice());
    } else {
    }
  }, [courieraddstate]);

  useEffect(() => {
    if (courierdelstate.status === "loading") {
    } else if (courierdelstate.status === "succeeded") {
      dispatch(ListFetch());
      dispatch(Delcourierstateslice());
    } else if (courierdelstate.status === "failed") {
      if (courierdelstate.error.message == "token expire") {
        handlelogout();
      } else {
        console.log(courierdelstate.error.message);
        setDeleteCou(courierdelstate.error.message);
        setTimeout(() => {
          setDeleteCou([]);
        }, 3000);
      }
      dispatch(ListFetch());
      dispatch(Delcourierstateslice());
    } else {
    }
  }, [courierdelstate]);

  const handleadd = (e) => {
    setName(e.target.value);
    setNameerr("");
  };

  const handleeditname = (e) => {
    setUpname(e.target.value);
    setUpnameerr("");
  };

  const handleedit = (data) => {
    const values = data;
    setUpid(values.value);
    setUpname(values.label);
  };

  // final send data for add and edit api call
  const handlesenddata = () => {
    if (upid) {
      if (navigator.onLine === true) {
        if (!upname) {
          setUpnameerr("Courier Name Required !!");
        } else {
          dispatch(EditCourierSlice({ name: upname, id: upid }));
          setUpnameerr("");
          setDberr("");
          setUpid("");
          setName("");
        }
      } else {
        setModelOpennet(1);
        setModelcount(2);
      }
    } else {
      if (navigator.onLine === true) {
        if (!name) {
          setNameerr("Courier Name Required !!");
        } else {
          dispatch(AddCourierSlice({ name: name }));
          setNameerr("");
          setDbAdderr("");
        }
      } else {
        setModelOpennet(1);
        setModelcount(2);
      }
    }
  };

  // delete api call
  const handlefinaldelete = () => {
    dispatch(DeleteCourierSlice({ id: delid }));
    setModelOpen(false);
  };

  const handleeditdataremove = () => {
    setUpid("");
    setName("");
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
            Courier
          </Typography>
        </div>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={5} className={classes.setinputlayout}>
            <Paper className={classes.setProductpaper} elevation={5}>
              {dberr && (
                <Typography className={classes.seterrorlabel}>
                  {dberr}{" "}
                </Typography>
              )}
              {dbAdderr && (
                <Typography className={classes.seterrorlabel}>
                  {dbAdderr}{" "}
                </Typography>
              )}
              <Typography className={classes.setlabel}>Name :</Typography>
              <TextField
                id="outlined-basic"
                size="small"
                variant="outlined"
                className={classes.settextfield}
                placeholder="courier name *"
                InputLabelProps={{ shrink: false }}
                value={upid ? upname : name}
                onChange={upid ? handleeditname : handleadd}
              />
              {nameerr && (
                <Typography className={classes.seterrorlabel}>
                  {nameerr}{" "}
                </Typography>
              )}{" "}
              {upnameerr && (
                <Typography className={classes.seterrorlabel}>
                  {upnameerr}{" "}
                </Typography>
              )}
              <div className={classes.setsendbutton}>
                {upid && (
                  <Button
                    endIcon={<ClearIcon />}
                    className={classes.setstateclear}
                    onClick={handleeditdataremove}
                  >
                    clear
                  </Button>
                )}
                {upid ? (
                  <Button
                    variant="contained"
                    size="medium"
                    className={classes.setsendbtninside}
                    onClick={handlesenddata}
                  >
                    update
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    size="medium"
                    className={classes.setsendbtninside}
                    onClick={handlesenddata}
                  >
                    Add
                  </Button>
                )}
              </div>
            </Paper>
          </Grid>
          {courieLIst.length > 0 && (
            <Grid item xs={12} sm={7} className={classes.setinputlayout}>
              <Paper className={classes.setProductpaper} elevation={5}>
                {deleteCou && (
                  <Typography className={classes.seterrorlabel}>
                    {deleteCou}{" "}
                  </Typography>
                )}
                <TableContainer>
                  <Table className={classes.settable} aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell align="center" className={classes.tableth}>
                          No.
                        </TableCell>
                        <TableCell align="center" className={classes.tableth}>
                          Name
                        </TableCell>
                        <TableCell align="center" className={classes.tableth}>
                          Action
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {courieLIst.map((e, index) => {
                        return (
                          <StyledTableRow key={e.id}>
                            <StyledTableCell
                              align="center"
                              component="th"
                              scope="row"
                              className={classes.tabletd}
                            >
                              {index + 1}
                            </StyledTableCell>
                            <StyledTableCell
                              className={classes.tabletd}
                              align="center"
                            >
                              {e.label}
                            </StyledTableCell>
                            <StyledTableCell
                              className={classes.tabletdicon}
                              align="center"
                            >
                              <div className={classes.seticondiv}>
                                <div>
                                  <Tooltip title="Edit">
                                    <EditIcon
                                      className={classes.seteditincon}
                                      onClick={() => handleedit(e)}
                                    />
                                  </Tooltip>
                                </div>
                                <div>
                                  <Tooltip title="Remove">
                                    <DeleteIcon
                                      className={classes.setdeleteincon}
                                      onClick={() => handledelete(e)}
                                    />
                                  </Tooltip>
                                </div>
                              </div>
                            </StyledTableCell>
                          </StyledTableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Paper>
            </Grid>
          )}
        </Grid>

        <Modal
          open={modelOpen}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box className={classes.setmodeldisplay}>
            <Typography id="modal-modal-title" variant="h5" component="h2">
              Delete Conformation
            </Typography>
            <Divider />
            <Typography
              id="modal-modal-title"
              variant="body1"
              component="h2"
              style={{ margin: "19px 10px" }}
            >
              Would you like to remove this item from the list ?
            </Typography>
            <Divider />
            <div className={classes.setbtndeldiv}>
              <Button
                variant="contained"
                onClick={() => setModelOpen(false)}
                className={classes.canclebtn}
              >
                Cancle
              </Button>
              <Button
                variant="contained"
                className={classes.deletebtn}
                onClick={handlefinaldelete}
              >
                Delete
              </Button>
            </div>
          </Box>
        </Modal>
        <Modal
          open={modelOpennet}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box className={classes.setmodeldisplayerr}>
            <div>
              {/* <WifiOffIcon /> */}
              <Typography
                className={classes.setmodeltypo}
                id="modal-modal-title"
                variant="h5"
                component="h2"
              >
                No Internet Connection
              </Typography>
            </div>
            <Divider />
            <div className={classes.setbtndeldiv}>
              <Button
                variant="contained"
                onClick={hanldemodelclose}
                className={classes.canclebtn}
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
        // open={upid ? active : upActive}
        open={active}
      >
        <DotLoader color="white" />
      </Backdrop>
    </>
  );
}

export default CourierList;
