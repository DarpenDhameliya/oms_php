import React, { useState, useEffect } from "react";
import Container from "@mui/material/Container";
import { Paper, Grid } from "@material-ui/core";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import { Link, useHistory } from "react-router-dom";
import useStyleAuth from "./AuthStyle";
import { useDispatch, useSelector } from "react-redux";
import { userLogin, LoginstatusSlice, userstate } from "./slice/LoginRedux";
import { Userdataslice } from "./slice/UserData";
import OutlinedInput from "@mui/material/OutlinedInput";
import { Divider } from "@material-ui/core";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import UserData from "./slice/UserData";
import CryptoJS from 'crypto-js';
const ariaLabel = { "aria-label": "description" };

export default function Login() {
  const [passvisible, setPassvisible] = useState(false);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState([]);
  const [dberror, setDberror] = useState("");
  const [modelcount, setModelcount] = useState(1);
  const [modelOpen, setModelOpen] = useState(0);
  const classes = useStyleAuth();
  const history = useHistory();
  const handleChange = (e) => {
    setPassword(e.target.value);
  };

  const handleemail = (e) => {
    setEmail(e.target.value);
  };

  const handleClickShowPassword = () => {
    setPassvisible(!passvisible);
  };

  const handleEnter = (e) => {
    if (e.key === "Enter") {
      handlesenddata();
    }
  };
  const hanldemodelclose = () => {
    setModelOpen(0);
  };
  // redux responce

useEffect(() => {
  if(localStorage.getItem('userdata')){
    localStorage.removeItem('userdata')
  }
}, [])


  useEffect(() => {
    if (userState.status === "succeeded") {

      console.log(userState)
      const secretKey = 'mySecretKey123';
      const plaintext = userState.token;
      const ciphertext = CryptoJS.AES.encrypt(plaintext, secretKey).toString();
      console.log(ciphertext);
      const bytes = CryptoJS.AES.decrypt(ciphertext, secretKey);
      const plaintexts = bytes.toString(CryptoJS.enc.Utf8);
      console.log(plaintexts);
      // let data = process.env.suth_key
      // console.log(data)
      // dispatch(Userdataslice(userState.token))
      history.push("/app/productlist");
      dispatch(LoginstatusSlice());
    } else if (userState.status === "failed") {
      setDberror(userState.error);
      setTimeout(() => {
        setDberror("");
      }, 4000);
      dispatch(LoginstatusSlice());
    } else {
    }
  });

  // network err
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

  const userState = useSelector(userstate);
  const dispatch = useDispatch();
  const handlesenddata = (e) => {
    if (navigator.onLine == true) {
      if (!email || !password) {
        if (!email) {
          errors.email = "Email Required";
        } else {
          errors.email = "";
        }

        if (!password) {
          errors.password = "Password Rqeuired";
        } else {
          errors.password = "";
        }
        setErrors({ ...errors, [e.target.name]: e.target.value });
        setTimeout(() => {
          setErrors([]);
        }, 4000);
      } else {
        dispatch(userLogin({ email, password }));
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
        <div className={classes.setpageheading}>
          <Typography variant="h5" gutterBottom className={classes.setheading}>
            <Typography variant="h5" gutterBottom className={classes.setheadingfront}>Ecommerce</Typography>Managment
          </Typography>
        </div>

        <Paper className={classes.setloginbackpaper} elevation={5}>
          <Typography
            variant="h6"
            gutterBottom
            className={classes.setloginheadset}
          >
            Sign in to start your session
          </Typography>
          {dberror && <p className={classes.seterrorlabel}>{dberror}</p>}
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <div className={classes.setinput}>
                <label className={classes.setlabel}>Email :</label>
                <TextField
                  id="outlined-basic"
                  size="small"
                  type="email"
                  placeholder="email"
                  variant="outlined"
                  value={email}
                  onChange={handleemail}
                  onKeyPress={handleEnter}
                />
              </div>
              {errors.email && (
                <p className={classes.seterrorlabel}>{errors.email}</p>
              )}
            </Grid>
            <Grid item xs={12}>
              <div className={classes.setinput}>
                <label className={classes.setlabel}>Password :</label>
                <OutlinedInput
                  id="outlined-adornment-password"

                  type={passvisible ? "text" : "password"}
                  value={password}
                  size="small"
                  placeholder="password"
                  onChange={handleChange}
                  onKeyPress={handleEnter}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        edge="end"
                        inputProps={ariaLabel}
                      >
                        {passvisible ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </div>
              {errors.password && (
                <p className={classes.seterrorlabel}>{errors.password}</p>
              )}
            </Grid>
          </Grid>

          <Button
            variant="contained"
            className={classes.setloginbutton}
            onClick={handlesenddata}
          >
            Login
          </Button>
          {/* <div className={classes.setbottomtypography}>
            <Typography
              variant="body2"
              className={classes.setacctypography}
              gutterBottom
            >
              Don't have an Account ?
            </Typography>
            <Typography
              className={classes.setsignuilink}
              variant="body2"
              noWrap
              component={Link}
              to="/auth/register"
              color="textPrimary"
              underline="none"
            >
              Sign up.
            </Typography>
          </div> */}
        </Paper>
      </Container>
      <Modal
        open={modelOpen}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className={classes.setmodeldisplay}>
          <div >
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
    </>
  );
}
