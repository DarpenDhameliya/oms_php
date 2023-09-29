import useStylesBank from "./BanklistStyle";
import React, { useState, useEffect } from "react";
import Container from "@mui/material/Container";
import { Grid, Paper, Divider } from "@material-ui/core";
import Typography from "@mui/material/Typography";
import Button from "@material-ui/core/Button";
import TextField from "@mui/material/TextField";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Tooltip from "@mui/material/Tooltip";
import TableContainer from "@mui/material/TableContainer";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { useDispatch, useSelector } from "react-redux";
import { ListFetch, Liststate } from "../../commonLink/ListApi";
import ClearIcon from "@mui/icons-material/Clear";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Backdrop from "@mui/material/Backdrop";
import { DotLoader } from "react-spinners";
import {
  DeleteBankSlice,
  Deletebankstate,
  Delbankstateslice,
} from "./slice/DeleteBankSlice";
import {
  EditBankSlice,
  Editbankstate,
  Editbankstateslice,
} from "./slice/EditBankSlice";
import {
  AddBankSlice,
  Addbankstate,
  Addbankstateslice,
} from "./slice/AddBankSlice";
import { styled } from '@mui/material/styles';
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
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));
function BankList() {
  const [name, setName] = useState("");
  const [account, setAccount] = useState("");
  const [branch, setBranch] = useState("");
  const [ifsc, setIfsc] = useState("");
  const [upname, setUpName] = useState("");
  const [upaccount, seUptAccount] = useState("");
  const [upbranch, setUpBranch] = useState("");
  const [upifsc, setUpIfsc] = useState("");
  const [modelOpen, setModelOpen] = useState(false);
  const [bankList, setBankList] = useState([]);
  const [editid, setEditid] = useState("");
  const [deleteid, setDeleteid] = useState("");
  const [error, setError] = useState([]);
  const [active, setActive] = useState(false);

  const classes = useStylesBank();
  const dispatch = useDispatch();
  const liststate = useSelector(Liststate);
  const addBankstate = useSelector(Addbankstate);
  const editBankstate = useSelector(Editbankstate);
  const deleteBankstate = useSelector(Deletebankstate);
  const history = useHistory();
  const handlelogout = () => {
    localStorage.removeItem("userdata");
    localStorage.removeItem("username");
    localStorage.removeItem("useremail");
    history.push("/");
    window.location.reload();
  };

  useEffect(() => {
    dispatch(ListFetch());
  }, []);


  // add and list redux
  useEffect(() => {
    if (liststate.status === "succeeded") {
      setBankList(liststate.List.list.bankmaster_list);
    }

    if (addBankstate.status === "loading") {
      setActive(true);
    } else if (addBankstate.status === "succeeded") {
      setActive(false);
      setName("");
      setAccount("");
      setBranch("");
      setIfsc("");
      dispatch(ListFetch());
      dispatch(Addbankstateslice());
    } else if (addBankstate.status === "failed") {
      setActive(false);
      console.log(addBankstate)
      dispatch(ListFetch());
      dispatch(Addbankstateslice());
    } else {
    }
  }, [addBankstate , liststate])
  
  // edit and delete redux
  useEffect(() => {
   
    if (editBankstate.status === "loading") {
      setActive(true);
    } else if (editBankstate.status === "succeeded") {
      setActive(false);
      setUpName("");
      seUptAccount("");
      setUpBranch("");
      setUpIfsc("");
      dispatch(ListFetch());
      dispatch(Editbankstateslice());
    } else if (editBankstate.status === "failed") {
      setActive(false);
      dispatch(ListFetch());
      dispatch(Editbankstateslice());
    } else {
    }

    if (deleteBankstate.status === "succeeded") {
      dispatch(ListFetch());
      dispatch(Delbankstateslice());
    }
  }, [deleteBankstate , editBankstate]);

  const handlename = (e) => {
    setName(e.target.value);
  };
  const handleaccount = (e) => {
    setAccount(e.target.value);
  };
  const handlebranch = (e) => {
    setBranch(e.target.value);
  };
  const handleifsc = (e) => {
    setIfsc(e.target.value);
  };

  const handleupname = (e) => {
    setUpName(e.target.value);
  };
  const handleupnaccount = (e) => {
    seUptAccount(e.target.value);
  };
  const handleupbranch = (e) => {
    setUpBranch(e.target.value);
  };
  const handleupifsc = (e) => {
    setUpIfsc(e.target.value);
  };

  const handleeditid = (editid) => {
    setEditid(editid.id);
    setUpName(editid.bank_name);
    seUptAccount(editid.account);
    setUpBranch(editid.branch);
    setUpIfsc(editid.ifsc);
  };

  const handledeleteid = (delid) => {
    setDeleteid(delid.id);
    setModelOpen(true);
  };

  const handleeditdataremove = () => {
    setEditid("");
  };

  // send data to db of add and edit api
  const handlesenddata = (e) => {
    if (editid) {
      if (!upname || !upaccount || !upbranch || !upifsc) {
        if (!upname) {
          error.upname = "Name Required !!";
        } else {
          error.upname = "";
        }

        if (!upaccount) {
          error.upaccount = "Account Required !!";
        } else {
          error.upaccount = "";
        }

        if (!upbranch) {
          error.upbranch = "Branch Required !!";
        } else {
          error.upbranch = "";
        }

        if (!upifsc) {
          error.upifsc = "Ifsc Required !!";
        } else {
          error.upifsc = "";
        }

        setError({ ...error, [e.target.name]: e.target.value });
      } else {
        dispatch(
          EditBankSlice({
            bankname: upname,
            account: upaccount,
            ifsc: upifsc,
            branch: upbranch,
            id: editid,
          })
        );
        setEditid("");
        setError([]);
      }
    } else {
      if (!name || !account || !branch || !ifsc) {
        if (!name) {
          error.name = "Name Required !!";
        } else {
          error.name = "";
        }

        if (!account) {
          error.account = "Account Required !!";
        } else {
          error.account = "";
        }

        if (!branch) {
          error.branch = "Branch Required !!";
        } else {
          error.branch = "";
        }

        if (!ifsc) {
          error.ifsc = "Ifsc Required !!";
        } else {
          error.ifsc = "";
        }

        setError({ ...error, [e.target.name]: e.target.value });
      } else {
        dispatch(
          AddBankSlice({
            bankname: name,
            account: account,
            ifsc: ifsc,
            branch: branch,
          })
        );
        setError([]);
      }
    }
    setTimeout(() => {
      setError([]);
    }, 4000);
  };

  // delete api call
  const handlefinaldelete = () => {
    dispatch(DeleteBankSlice({ id: deleteid }));
    setModelOpen(false);
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
          <Typography
            variant="h4"
            gutterBottom
            className={classes.setheading}
          >
            Bank
          </Typography>
        </div>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={8} md={4} className={classes.setinputlayout}>
            <Paper className={classes.setProductpaper} elevation={5}>
              <Typography className={classes.setlabel}>Name :</Typography>
              <TextField
                id="outlined-basic"
                fullWidth
                size="small"
                variant="outlined"
                placeholder="Bank Name *"
                className={classes.settextfield}

                value={editid ? upname : name}
                onChange={editid ? handleupname : handlename}
              />
              {error.upname && (
                <Typography className={classes.seterrorlabel}>
                  {error.upname}{" "}
                </Typography>
              )}
              {error.name && (
                <Typography className={classes.seterrorlabel}>
                  {error.name}{" "}
                </Typography>
              )}
              <Typography className={classes.setlabel}>Account :</Typography>
              <TextField
                id="outlined-basic"
                fullWidth
                size="small"
                placeholder="Account Type *"
                variant="outlined"
                className={classes.settextfield}
                value={editid ? upaccount : account}
                onChange={editid ? handleupnaccount : handleaccount}
              />
              {error.upaccount && (
                <Typography className={classes.seterrorlabel}>
                  {error.upaccount}{" "}
                </Typography>
              )}
              {error.account && (
                <Typography className={classes.seterrorlabel}>
                  {error.account}{" "}
                </Typography>
              )}

              <Typography className={classes.setlabel}>
                Branch Name :
              </Typography>
              <TextField
                id="outlined-basic"
                fullWidth
                size="small"
                placeholder="Branch *"
                variant="outlined"
                className={classes.settextfield}
                value={editid ? upbranch : branch}
                onChange={editid ? handleupbranch : handlebranch}
              />
              {error.upbranch && (
                <Typography className={classes.seterrorlabel}>
                  {error.upbranch}{" "}
                </Typography>
              )}
              {error.branch && (
                <Typography className={classes.seterrorlabel}>
                  {error.branch}{" "}
                </Typography>
              )}
              <Typography className={classes.setlabel}>IFSC :</Typography>
              <TextField
                id="outlined-basic"
                fullWidth
                size="small"
                placeholder="Ifsc *"
                variant="outlined"
                className={classes.settextfield}

                value={editid ? upifsc : ifsc}
                onChange={editid ? handleupifsc : handleifsc}
              />
              {error.upifsc && (
                <Typography className={classes.seterrorlabel}>
                  {error.upifsc}{" "}
                </Typography>
              )}
              {error.ifsc && (
                <Typography className={classes.seterrorlabel}>
                  {error.ifsc}{" "}
                </Typography>
              )}
              <div className={classes.setsendbutton}>
                {editid && (
                  <Button
                    endIcon={<ClearIcon />}
                    className={classes.setstateclear}
                    onClick={handleeditdataremove}
                  >
                    clear
                  </Button>
                )}
                {editid ? (
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
          {bankList.length > 0 && 
          <Grid
            item
            xs={12}
            sm={12}
            md={8}
            className={classes.setinputlayout}
          >
            <Paper className={classes.setProductpaper} elevation={5}>
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
                        Account
                      </TableCell>
                      <TableCell align="center" className={classes.tableth}>
                        Branch Name
                      </TableCell>
                      <TableCell align="center" className={classes.tableth}>
                        Ifsc
                      </TableCell>
                      <TableCell
                        align="center"
                        className={classes.tablethaction}
                      >
                        {" "}
                        Action
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {bankList.map((e, index) => {
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
                            {e.bank_name}
                          </StyledTableCell>
                          <StyledTableCell
                            className={classes.tabletd}
                            align="center"
                          >
                            {e.account}
                          </StyledTableCell>
                          <StyledTableCell
                            className={classes.tabletd}
                            align="center"
                          >
                            {e.branch}
                          </StyledTableCell>
                          <StyledTableCell
                            className={classes.tabletd}
                            align="center"
                          >
                            {e.ifsc}
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
                                    onClick={() => handleeditid(e)}
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

export default BankList;
