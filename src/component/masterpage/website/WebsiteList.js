import React, { useState, useEffect } from "react";
import Container from "@mui/material/Container";
import { Divider, Grid, Paper } from "@material-ui/core";
import Typography from "@mui/material/Typography";
import Button from "@material-ui/core/Button";
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
import useStylesCourier from "../courier/CourierStyle";
import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";
import { ListFetch, Liststate } from "../../commonLink/ListApi";
import ClearIcon from "@mui/icons-material/Clear";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  AddWebsiteSlice,
  Addwebsitestate,
  Addwebsitestateslice,
} from "./Slice/WebsiteAddSlice";
import {
  EditWebsiteSlice,
  Editwebsitestate,
  Editwebsitestateslice,
} from "./Slice/WebsiteEditSlice";
import {
  DeleteWebsiteSlice,
  Deletewebsitestate,
  Delwebsitestateslice,
} from "./Slice/WebsiteDelSlice";
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

function WebsiteList() {
  const [active, setActive] = useState(false);
  const [modelOpen, setModelOpen] = useState(false);
  const [webname, setWebname] = useState("");
  const [websitename, setWebsitename] = useState("");
  const [siteList, setSiteList] = useState([]);
  const [websiteList, setWebsiteList] = useState([]);
  const [error, setError] = useState([]);
  const [sendbid, setSendbid] = useState("");
  const [editname, setEditname] = useState("");
  const [delid, setDelid] = useState("");
  const [dbUperr, setDbUperr] = useState("");
  const [editwebsitename, setEditwebsitename] = useState("");
  const [dberr, setDberr] = useState([]);
  const [editSiteId, setEditSiteId] = useState("");
  const [modelcount, setModelcount] = useState(1);
  const [modelOpennet, setModelOpennet] = useState(0);
  const [isClearable, setIsClearable] = useState(true);
  const notify = (data) =>
    toast.error(data, {
      autoClose: 3000,
    });
  const handlewebname = (e) => {
    setWebname(e.target.value);
  };
  const handleupwebname = (e) => {
    setEditname(e.target.value);
  };
  const handledeleteid = (id) => {
    const delid = id.value;
    setDelid(delid);
    setModelOpen(true);
  };

  const history = useHistory();
  const classes = useStylesCourier();
  const dispatch = useDispatch();
  const liststate = useSelector(Liststate);
  const addwebstate = useSelector(Addwebsitestate);
  const editwebstate = useSelector(Editwebsitestate);
  const deleteWebstate = useSelector(Deletewebsitestate);
  useEffect(() => {
    if (navigator.onLine === true) {
      dispatch(ListFetch());
    } else {
      setModelOpennet(1);
      setModelcount(2);
    }
  }, []);

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
      setModelOpennet(1);
      setModelcount(2);
    }
  });

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

  // list responce redux
  useEffect(() => {
    if (liststate.status === "loading") {
      setActive(true);
    } else if (liststate.status === "succeeded") {
      setActive(false);
      setSiteList(liststate.List.list.site_list);
      setWebsiteList(liststate.List.list.website_list);
    } else if (liststate.status === "failed") {
      setActive(false);
    } else {
    }
  }, [liststate])
    
  // add website
  useEffect(() => {
    if (addwebstate.status === "loading") {
      setActive(true);
    } else if (addwebstate.status === "succeeded") {
      setActive(false);
      dispatch(ListFetch());
      dispatch(Addwebsitestateslice());
    } else if (addwebstate.status === "failed") {
      setActive(false);
      if (addwebstate.error.errors === "token expire") {
        handlelogout();
      } else {
        setDberr(addwebstate.error.errors);
        setTimeout(() => {
          setDberr("");
        }, 4000);
        dispatch(ListFetch());
      }
      dispatch(Addwebsitestateslice());
    } else {
    }
  }, [addwebstate])
  
  // edit website
  useEffect(() => {
    if (editwebstate.status === "loading") {
      setActive(false);
    } else if (editwebstate.status === "succeeded") {
      setActive(false);
      dispatch(ListFetch());
      dispatch(Editwebsitestateslice());
    } else if (editwebstate.status === "failed") {
      setActive(false);
      if (editwebstate.error.errors === "token expire") {
        handlelogout();
      } else {
        setDbUperr(editwebstate.error.errors);
        setTimeout(() => {
          setDbUperr("");
        }, 4000);
        dispatch(ListFetch());
      }
      dispatch(Editwebsitestateslice());
    } else {
    }
  }, [editwebstate])
  
  // delete website
  useEffect(() => {
    if (deleteWebstate.status === "loading") {
    } else if (deleteWebstate.status === "succeeded") {
      dispatch(ListFetch());
      dispatch(Delwebsitestateslice());
    } else if (deleteWebstate.status === "failed") {
      if (deleteWebstate.error.message === "token expire") {
        handlelogout();
      }
      notify(deleteWebstate.error.message);
      // console.log(deleteWebstate.error.message)
      dispatch(Delwebsitestateslice());
    } else {
    }
  }, [deleteWebstate]);

  // on click of edit icon
  const handleedit = (label) => {
    const labelval = label;
    setEditSiteId(labelval.site_id);
    setSendbid(labelval.value);
    const siteid = labelval.site_id;
    const website = labelval.label;
    let sitename = " ";
    {
      siteList.map((e) => {
        if (siteid == e.id) {
          sitename = e.site;
        }
      });
    }
    setEditname(website);
    setEditwebsitename(sitename);
  };

  // on click of delete icon
  const handleeditdataremove = () => {
    setSendbid("");
    setWebname("");
    setWebsitename("");
  };

  // final edit or add data api call
  const handlesenddata = (e) => {
    if (sendbid) {

      if (navigator.onLine === true) {
        if (!editname || !editwebsitename) {
          if (!editname) {
            error.upname = "Name Required !!";
          } else {
            error.upname = "";
          }

          if (!editwebsitename) {
            error.upwebname = "Website Required !!";
          } else {
            error.upwebname = "";
          }
          setError({ ...error, [e.target.name]: e.target.value });
        } else {
          dispatch(
            EditWebsiteSlice({
              name: editname,
              site_id:
                typeof editwebsitename == "string"
                  ? editSiteId
                  : editwebsitename.id,
              id: sendbid,
            })
          );
          setError([]);
          setSendbid("");
          setWebname("");
          setWebsitename("");
        }
      } else {
        setModelOpennet(1);
        setModelcount(2);
      }
    } else {
      if (navigator.onLine == true) {
        if (!webname || !websitename) {
          if (!webname) {
            error.name = "Name Required !!";
          } else {
            error.name = "";
          }

          if (!websitename) {
            error.webname = "Website Required !!";
          } else {
            error.webname = "";
          }
          setError({ ...error, [e.target.name]: e.target.value });
        } else {
          setError([]);
          setDberr([]);
          dispatch(AddWebsiteSlice({ name: webname, site_id: websitename.id }));
          setWebname('')
          setWebsitename('')
        }
      } else {
        setModelOpennet(1);
        setModelcount(2);
      }
    }
    setTimeout(() => {
      setError([]);
    }, 4000);
  };

  // delete api call
  const handledelete = () => {
    dispatch(DeleteWebsiteSlice({ id: delid }));
    setModelOpen(false);
    setTimeout(() => {
      dispatch(ListFetch());
    }, 1000);
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
            Website
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
              {dbUperr && (
                <Typography className={classes.seterrorlabel}>
                  {dbUperr}{" "}
                </Typography>
              )}
              <Grid container spacing={2}>
                <Grid item xs={12} className={classes.setinputlayout}>
                  <Typography className={classes.setlabel}>
                    Account Name :
                  </Typography>
                  <TextField
                    className={classes.settextfield}
                    fullWidth
                    id="outlined-basic"
                    size="small"
                    variant="outlined"
                    placeholder="web name *"
                    InputLabelProps={{ shrink: false }}
                    value={sendbid ? editname : webname}
                    onChange={sendbid ? handleupwebname : handlewebname}
                  />
                  {error.name && (
                    <Typography className={classes.seterrorlabel}>
                      {error.name}{" "}
                    </Typography>
                  )}
                  {error.upname && (
                    <Typography className={classes.seterrorlabel}>
                      {error.upname}{" "}
                    </Typography>
                  )}
                </Grid>
                <Grid item xs={12} className={classes.setinputlayout}>
                  <Typography className={classes.setlabel}>
                    Select Website :{" "}
                  </Typography>

                  <Select
                    value={sendbid ? editwebsitename : websitename}
                    onChange={sendbid ? setEditwebsitename : setWebsitename}
                    className={classes.settextarea}
                    isClearable={isClearable}
                    placeholder={sendbid
                      ? typeof editwebsitename == "string"
                        ? editwebsitename
                        : ""
                      : websitename === ""
                        ? "select site *"
                        : ""}
                    classNamePrefix="select"
                    getOptionValue={(option) => option.id}
                    getOptionLabel={(option) => option.site}
                    options={siteList}
                  />
                  {error.webname && (
                    <Typography className={classes.seterrorlabel}>
                      {error.webname}{" "}
                    </Typography>
                  )}
                  {error.upwebname && (
                    <Typography className={classes.seterrorlabel}>
                      {error.upwebname}{" "}
                    </Typography>
                  )}
                </Grid>
              </Grid>
              <div className={classes.setsendbutton}>
                {sendbid && (
                  <Button
                    endIcon={<ClearIcon />}
                    className={classes.setstateclear}
                    onClick={handleeditdataremove}
                  >
                    clear
                  </Button>
                )}
                {sendbid ? (
                  <Button
                    variant="contained"
                    size="medium"
                    className={classes.setsendbtninside}
                    onClick={handlesenddata}
                  >
                    Update
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
          {websiteList.length > 0 && 
          <Grid item xs={12} sm={7} className={classes.setinputlayout}>
            <Paper className={classes.setProductpaper} elevation={5}>
              <TableContainer>
                <Table className={classes.settable} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell align="center" className={classes.tableth}>
                        No.
                      </TableCell>
                      <TableCell align="center" className={classes.tableth}>
                        Website Name
                      </TableCell>
                      <TableCell align="center" className={classes.tableth}>
                        Site Name
                      </TableCell>
                      <TableCell align="center" className={classes.tableth}>
                        Action
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {websiteList.map((e, index) => {
                      return (
                        <StyledTableRow >
                          <StyledTableCell
                          key={e.id}
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
                            className={classes.tabletd}
                            align="center"
                          >
                            {siteList.map((id, index) => {
                              if (id.id == e.site_id) {
                                return (
                                  <Typography
                                    key={index}
                                    className={classes.tabletd}
                                  >
                                    {id.site}
                                  </Typography>
                                );
                              }
                            })}
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
                                    onClick={() => handledeleteid(e)}
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
          </Grid>}
        </Grid>
      </Container>

      {/* delete modal */}
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
              onClick={handledelete}
            >
              Delete
            </Button>
          </div>
        </Box>
      </Modal>

      {/* network error modal */}
      <Modal
        open={modelOpennet}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="setmodeldisplay">
          <div>
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

export default WebsiteList;
