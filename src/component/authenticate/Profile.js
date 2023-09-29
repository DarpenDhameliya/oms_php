import React, { useState, useEffect } from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Button from "@material-ui/core/Button";
import TextField from "@mui/material/TextField";
import useStyleAuth from "./AuthStyle";
import { Paper, Grid } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { userstate } from "./slice/LoginRedux";
import { Walletballencestate } from "../header&sidebar/slice/WalletBallenceSlice";
import { Divider } from "@mui/material";
import {
  ProfileSlice,
  Profilestate,
  Profilestatus,
} from "./slice/ProfileSlice";
import { useHistory } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function Profile() {
  const [walletBallences, setWalletBallencers] = useState("");
  const [oldpassword, setOldpassword] = useState("");
  const [newpassword, setNewpassword] = useState("");
  const [conpassword, setConpassword] = useState("");
  const [error, setError] = useState([]);
  const [dberr, setDberr] = useState("");
  // const [passwordVisible, setPasswordVisible] = useState(false);
  const [OpenTransaction, setOpenTransaction] = useState(false);
  const classes = useStyleAuth();
  const dispatch = useDispatch();
  const history = useHistory();
  const wallet_Balance = useSelector(Walletballencestate);
  // const ForgotPassword = useSelector(Forgotpasswordstate)
  const userdetail = useSelector(userstate);
  const profilestatepass = useSelector(Profilestate);
  const notify = () =>
  toast.success("Password Changed", {
    autoClose: 3000,
  });
  const handlelogout = () => {
    localStorage.removeItem("userdata");
    localStorage.removeItem("username");
    localStorage.removeItem("useremail");
    history.push("/");
    window.location.reload();
  };
  useEffect(() => {
    setWalletBallencers(wallet_Balance.responce);

    if (profilestatepass.status === "succeeded") {
      notify();
      console.log(profilestatepass.response);
      setOldpassword("");
    setNewpassword("");
    setConpassword("");
      // setPasswordVisible(false);
    }
    dispatch(Profilestatus())
    console.log(profilestatepass)
    if (profilestatepass.status === "failed") {
      if (profilestatepass.error == "token expire") {
        handlelogout();
      } else {
        setDberr(profilestatepass.error);
        setTimeout(() => {
          setDberr("");
        }, 3000);
      }
    dispatch(Profilestatus())

    }
  });

  const handlesend = (e) => {
    if (
      !oldpassword ||
      !newpassword ||
      !conpassword ||
      newpassword !== conpassword
    ) {
      if (!oldpassword) {
        error.oldpassword = "Old Password Required !!";
      } else {
        error.oldpassword = " ";
      }
      if (!newpassword) {
        error.newpassword = "New Password Required !!";
      } else {
        error.newpassword = "  ";
      }
      if (!conpassword) {
        error.conpassword = "Conform Password Required !!";
      } else {
        error.conpassword = " ";
      }
      if (!newpassword !== conpassword) {
        error.conpassword = "password mismatch !!";
      } else {
        error.conpassword = " ";
      }
      setError({ ...error, [e.target.name]: e.target.value });
      setTimeout(() => {
        setError([]);
      }, 3000);
    } else {
      dispatch(
        ProfileSlice({
          current_password: oldpassword,
          new_password: newpassword,
        })
      );
    }
  };
  const handleclose = () => {
    setOldpassword("");
    setNewpassword("");
    setConpassword("");
    // setPasswordVisible(false);
  };

  // const handleforgotopen = () => {
  //   setPasswordVisible(true);
  // };

  const handleTransaction = () => {
    setOpenTransaction(true);
  };
  return (
    <>
      <Container
        component="main"
        maxWidth="xl"
        className={classes.setcontainerprofile}
      >
              <ToastContainer
          position="top-right"
          closeOnClick
          style={{ marginTop: "55px" }}
        />
        <Typography variant="h4" gutterBottom className={classes.setheading}>
          Profile
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={12} sm={8} md={5} className={classes.setinputlayout}>
          {/* <Grid item className={classes.setfix}> */}
            <Paper className={classes.setProductpaperdisplay} elevation={5}>
              <Typography className={classes.setlabelprofile}>
                Name :
                <span
                  style={{
                    marginLeft: "8px",
                    fontFamily: " Poppins, sans-serif",
                  }}
                >
                  {JSON.parse(localStorage.getItem("username"))}
                </span>
              </Typography>
              <Typography className={classes.setlabelprofile}>
                Email :{" "}
                <span
                  style={{
                    marginLeft: "8px",
                    fontFamily: " Poppins, sans-serif",
                  }}
                >
                  {JSON.parse(localStorage.getItem("useremail"))}
                </span>
              </Typography>
              <Typography className={classes.setlabelprofile}>
                Wallet_balance :{" "}
                <span
                  style={{
                    marginLeft: "8px",
                    fontFamily: " Poppins, sans-serif",
                  }}
                >
                  {!walletBallences ? 0 : walletBallences}
                </span>
              </Typography>
              {/* <Divider style={{ marginTop: "10px" }} /> */}
              {/* <div className={classes.setBtnrow}>
                <Button
                  variant="contained"
                  size="medium"
                  style={{ marginLeft: "10px" }}
                  className={classes.setsendbtninside}
                  onClick={handleTransaction}
                >
                  Transaction Report
                </Button>
                <Button
                  variant="contained"
                  size="medium"
                  style={{ marginLeft: "10px" }}
                  className={classes.setsendbtninside}
                  onClick={handleforgotopen}
                >
                  Forgot Password
                </Button>
              </div> */}
            </Paper>
          </Grid>
          {/* {passwordVisible && ( */}
            <Grid item xs={12} sm={8} md={6} className={classes.setinputlayout}>
              <Paper className={classes.setProductpaper} elevation={5}>
              <Typography className={classes.setHeadingpass}>
                    Change Password 
                  </Typography>
                <div className={classes.setinputFirst}>
                  <Typography className={classes.setlabel}>
                    Old Password :
                  </Typography>
                  <TextField
                    id="outlined-basic"
                    fullWidth
                    type="password"
                    size="small"
                    variant="outlined"
                    placeholder="Old Password"
                    className={classes.settextfield}
                    value={oldpassword}
                    onChange={(e) => setOldpassword(e.target.value)}
                  />
                  {error.oldpassword && (
                    <Typography className={classes.seterrorlabel}>
                      {error.oldpassword}{" "}
                    </Typography>
                  )}
                  {dberr && (
                  <Typography className={classes.seterrorlabel}>
                    {dberr}{" "}
                  </Typography>
                )}
                </div>
                <div className={classes.setinput}>
                  <Typography className={classes.setlabel}>
                    New Password :
                  </Typography>
                  <TextField
                    id="outlined-basic"
                    fullWidth
                    type="password"
                    size="small"
                    variant="outlined"
                    placeholder="New Password"
                    className={classes.settextfield}
                    value={newpassword}
                    onChange={(e) => setNewpassword(e.target.value)}
                  />
                  {error.newpassword && (
                    <Typography className={classes.seterrorlabel}>
                      {error.newpassword}{" "}
                    </Typography>
                  )}
                </div>
                <div className={classes.setinput}>
                  <Typography className={classes.setlabel}>
                    Conform Password :
                  </Typography>
                  <TextField
                    id="outlined-basic"
                    fullWidth
                    size="small"
                    type="password"
                    variant="outlined"
                    placeholder="Conform Password"
                    className={classes.settextfield}
                    value={conpassword}
                    onChange={(e) => setConpassword(e.target.value)}
                  />
                  {error.conpassword && (
                    <Typography className={classes.seterrorlabel}>
                      {error.conpassword}{" "}
                    </Typography>
                  )}
                </div>
                <div className={classes.setBtnrow}>
                  {/* <Button
                    variant="contained"
                    size="medium"
                    className={classes.setsendbtninside}
                    onClick={handleclose}
                  >
                    close
                  </Button> */}
                  <Button
                    variant="contained"
                    size="medium"
                    style={{ marginLeft: "10px" }}
                    className={classes.setsendbtninside}
                    onClick={handlesend}
                  >
                    Update
                  </Button>
                </div>
              </Paper>
            </Grid>
          {/* )} */}
        </Grid>
        {OpenTransaction && (
          <Paper className={classes.setProductpaper} elevation={5}></Paper>
        )}
      </Container>
    </>
  );
}

export default Profile;
