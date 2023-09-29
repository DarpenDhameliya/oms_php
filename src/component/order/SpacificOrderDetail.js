import useStylesOrder from "./OrderStyle";
import React, { useState, useEffect } from "react";
import Container from "@mui/material/Container";
import { Divider, Grid, Paper } from "@material-ui/core";
import Typography from "@mui/material/Typography";
import Button from "@material-ui/core/Button";
import TextField from "@mui/material/TextField";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { useDispatch, useSelector } from "react-redux";
import { orderType, orderStatus } from "../commonLink/OrderList";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import LoadingOverlay from "react-loading-overlay";
import { ClimbingBoxLoader, DotLoader } from "react-spinners";
import {
  SpecificOdrSlice,
  Spacificodrstate,
  specificodrstatus,
} from "./slice/SpecificOdrSlice";
import moment from "moment";
import { useHistory } from "react-router-dom";

function SpacificOrderDetail() {
  const [opendata, setOpendata] = useState(false);
  const [active, setActive] = useState(false);
  const [odrid, setOdrid] = useState("");
  const [pronm, setPronm] = useState("");
  const [webnm, setWebnm] = useState("");
  const [odrdate, setodrdate] = useState("");
  const [oid, setOid] = useState("");
  const [counm, setCounm] = useState("");
  const [awb, setAwb] = useState("");
  const [qty, setQty] = useState("");
  const [modelcount, setModelcount] = useState(1);
  const [modelOpen, setModelOpen] = useState(0);
  const [odtamt, setOdtamt] = useState("");
  const [odridErr, setOdridErr] = useState("");
  const [odtstatus, setodtstatus] = useState("");
  const [odrtype, setOdrtype] = useState("");
  const [dberr, setDberr] = useState("");
  const classes = useStylesOrder();
  const dispatch = useDispatch();
  const odrdetails = useSelector(Spacificodrstate);
  const history = useHistory();
  const handleopenfata = (e) => {
    if (navigator.onLine == true) {
      if (!odrid) {
        setOdridErr("id Required !!");
        setTimeout(() => {
          setOdridErr("");
        }, 3000);
      } else {
        dispatch(SpecificOdrSlice({ order_id: odrid }));
      }
    } else {
      setModelOpen(1);
      setModelcount(2);
    }
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
  });
  const hanldemodelclose = () => {
    setModelOpen(0);
  };

  // const notify = () =>
  //   toast.success("Order Add Successfully ..  ", {
  //     autoClose: 3000,
  //   });
  const handleEnter = (e) => {
    if (e.key === "Enter") {
      handleopenfata();
    }
  };

  const handleodridchange = (e) => {
    setOdrid(e.target.value);
  };
  useEffect(() => {
    if (odrdetails.status === "loading") {
      setActive(true);
    } else if (odrdetails.status === "succeeded") {
      setActive(false);
      setOdrid("");
      setPronm(odrdetails.response.data[0].product_name);
      setWebnm(odrdetails.response.data[0].website_name);
      setodrdate(odrdetails.response.data[0].updated_at);
      setOid(odrdetails.response.data[0].order_id);
      setCounm(odrdetails.response.data[0].courier_name);
      setAwb(odrdetails.response.data[0].awb_no);
      setQty(odrdetails.response.data[0].qty);
      setOdtamt(odrdetails.response.data[0].receive_amount);
      setodtstatus(odrdetails.response.data[0].order_status);
      setOdrtype(odrdetails.response.data[0].order_type);
      setOpendata(true);
      dispatch(specificodrstatus());
    } else if (odrdetails.status === "failed") {
      setActive(false);
      setOpendata(false);
      if (odrdetails.error.errors == "token expire") {
        localStorage.removeItem("userdata");
        localStorage.removeItem("username");
        localStorage.removeItem("useremail");
        history.push("/");
        window.location.reload();
      } else {
        setDberr(odrdetails.error.errors);
        setTimeout(() => {
          setDberr("");
        }, 4000);
        dispatch(specificodrstatus());
      }
    } else {
      setActive(false);
    }
  },[odrdetails]);

  return (
    <>
      {" "}
      <LoadingOverlay
        className="setbackground"
        active={active}
        spinner={<DotLoader color="#fff" />}
        classNamePrefix="MyLoader_overlay"
        styles={{
          wrapper: {
            width: "100%",
          },
        }}
      >
        <Container
          component="main"
          maxWidth="xl"
          className={classes.setcontainer}
        >
          <div className={classes.setpageheading}>
            <Typography
              variant="h4"
              gutterBottom
              className={classes.setheading}
            >
              Order Detail
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
                    id="outlined-basic"
                    size="small"
                    variant="outlined"
                    required
                    label={odrid === "" ? "Enter Id." : ""}
                    InputLabelProps={{ shrink: false }}
                    className={classes.settextfield}
                    value={odrid}
                    onChange={handleodridchange}
                    onKeyPress={handleEnter}
                  />
                </div>
                {dberr && (
                  <Typography className={classes.seterrorlabel}>
                    {dberr}{" "}
                  </Typography>
                )}
                {odridErr && (
                  <Typography className={classes.seterrorlabel}>
                    {odridErr}{" "}
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
                  className={classes.setproductbtnsendspecific}
                  onClick={handleopenfata}
                >
                  Save
                </Button>
              </Grid>
            </Grid>
          </Paper>

          {opendata && (
            <Paper className={classes.setProductpaper} elevation={5}>
              <Card className={classes.setcardbgcolor}>
                <CardContent>
                  <Grid container spacing={2} style={{ marginTop: "10px" }}>
                    <Grid item xs={12} sm={12} md={6}>
                      <div className={classes.setdisplaygrid}>
                        <Typography
                          gutterBottom
                          variant="h6"
                          className={classes.setheadingwidth}
                        >
                          Product :
                        </Typography>
                        <Typography
                          sx={{ fontFamily: ["Poppins", "sans-serif"] }}
                          variant="body1"
                        >
                          {pronm}{" "}
                        </Typography>
                      </div>
                    </Grid>
                    <Grid item xs={12} sm={12} md={6}>
                      <div className={classes.setdisplaygrid}>
                        <Typography
                          gutterBottom
                          variant="h6"
                          className={classes.setheadingwidth}
                        >
                          Order Date :
                        </Typography>
                        {/* <Typography variant="body1">{odrdate} </Typography> */}
                        <Typography
                          sx={{ fontFamily: ["Poppins", "sans-serif"] }}
                          variant="body1"
                        >
                          {moment(odrdate.slice(0, 10)).format("DD-MM-yyyy")}{" "}
                        </Typography>
                      </div>
                    </Grid>
                    <Grid item xs={12} sm={12} md={6}>
                      <div className={classes.setdisplaygrid}>
                        <Typography
                          gutterBottom
                          variant="h6"
                          className={classes.setheadingwidth}
                        >
                          Website :
                        </Typography>
                        <Typography
                          sx={{ fontFamily: ["Poppins", "sans-serif"] }}
                          variant="body1"
                        >
                          {webnm}
                        </Typography>
                      </div>
                    </Grid>
                    <Grid item xs={12} sm={12} md={6}>
                      <div className={classes.setdisplaygrid}>
                        <Typography
                          gutterBottom
                          variant="h6"
                          className={classes.setheadingwidth}
                        >
                          Order Id :
                        </Typography>
                        <Typography
                          sx={{ fontFamily: ["Poppins", "sans-serif"] }}
                          variant="body1"
                        >
                          {oid}
                        </Typography>
                      </div>
                    </Grid>
                    <Grid item xs={12} sm={12} md={6}>
                      <div className={classes.setdisplaygrid}>
                        <Typography
                          gutterBottom
                          variant="h6"
                          className={classes.setheadingwidth}
                        >
                          Courier :
                        </Typography>
                        <Typography
                          sx={{ fontFamily: ["Poppins", "sans-serif"] }}
                          variant="body1"
                        >
                          {counm}
                        </Typography>
                      </div>
                    </Grid>
                    <Grid item xs={12} sm={12} md={6}>
                      <div className={classes.setdisplaygrid}>
                        <Typography
                          gutterBottom
                          variant="h6"
                          className={classes.setheadingwidth}
                        >
                          AWB No :
                        </Typography>
                        <Typography
                          sx={{ fontFamily: ["Poppins", "sans-serif"] }}
                          variant="body1"
                        >
                          {awb}
                        </Typography>
                      </div>
                    </Grid>
                    <Grid item xs={12} sm={12} md={6}>
                      <div className={classes.setdisplaygrid}>
                        <Typography
                          gutterBottom
                          variant="h6"
                          className={classes.setheadingwidth}
                        >
                          Qty :
                        </Typography>
                        <Typography
                          sx={{ fontFamily: ["Poppins", "sans-serif"] }}
                          variant="body1"
                        >
                          {qty}
                        </Typography>
                      </div>
                    </Grid>

                    <Grid item xs={12} sm={12} md={6}>
                      <div className={classes.setdisplaygrid}>
                        <Typography
                          gutterBottom
                          variant="h6"
                          className={classes.setheadingwidth}
                        >
                          Order Amount :
                        </Typography>
                        <Typography
                          sx={{ fontFamily: ["Poppins", "sans-serif"] }}
                          variant="body1"
                        >
                          {odtamt}
                        </Typography>
                      </div>
                    </Grid>
                    <Grid item xs={12} sm={12} md={6}>
                      <div className={classes.setdisplaygrid}>
                        <Typography
                          gutterBottom
                          variant="h6"
                          className={classes.setheadingwidth}
                        >
                          Order Status :
                        </Typography>
                        <Typography
                          sx={{ fontFamily: ["Poppins", "sans-serif"] }}
                          variant="body1"
                        >
                          {orderStatus.map((e) => {
                            if (e.value == odtstatus) {
                              return (
                                <Typography
                                  sx={{ fontFamily: ["Poppins", "sans-serif"] }}
                                  key={e.value}
                                  value={e.value}
                                >
                                  {e.label}
                                </Typography>
                              );
                            }
                          })}
                        </Typography>
                      </div>
                    </Grid>
                    <Grid item xs={12} sm={12} md={6}>
                      <div className={classes.setdisplaygrid}>
                        <Typography
                          gutterBottom
                          variant="h6"
                          className={classes.setheadingwidth}
                        >
                          Order Type :
                        </Typography>
                        <Typography
                          sx={{ fontFamily: ["Poppins", "sans-serif"] }}
                          variant="body1"
                        >
                          {orderType.map((ea) => {
                            if (ea.value == odrtype) {
                              return (
                                <Typography
                                  sx={{ fontFamily: ["Poppins", "sans-serif"] }}
                                  key={ea.value}
                                >
                                  {ea.label}
                                </Typography>
                              );
                            }
                          })}
                        </Typography>
                      </div>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Paper>
          )}
        </Container>
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
      </LoadingOverlay>
    </>
  );
}

export default SpacificOrderDetail;
