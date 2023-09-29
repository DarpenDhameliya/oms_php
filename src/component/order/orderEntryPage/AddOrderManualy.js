import useStylesOrder from "../OrderStyle";
import React, { useState, useEffect } from "react";
import { Grid, Paper } from "@material-ui/core";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@material-ui/core/Button";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import { Divider } from "@mui/material";
import { Liststate, ListFetch } from "../../commonLink/ListApi";
import { useDispatch, useSelector } from "react-redux";
import { orderStatus, orderType } from "../../commonLink/OrderList";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Select from "react-select";
import {
  Manualaddstate,
  ManualAddSlice,
  manualodrstatus,
} from "./slice/ManualAddSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Backdrop from "@mui/material/Backdrop";
import { DotLoader } from "react-spinners";
import { useHistory } from "react-router-dom";

function AddOrderManualy() {
  const [websiteList, setWebsiteList] = useState([]);
  const [courierList, setCourierList] = useState([]);
  const [productList, setProductList] = useState([]);
  const [active, setActive] = useState(false);
  const [webid, setWebid] = useState("");
  const [courid, setCourid] = useState("");
  const [prodid, setProdid] = useState(null);
  const [odrstatus, setOdrstatus] = useState("");
  const [odrtype, setOdrtype] = useState("");
  const [odrid, setOdrid] = useState("");
  const [odramt, setOdramt] = useState("");
  const [odrqty, setOdrqty] = useState("");
  const [awbno, setAwbno] = useState("");
  const [error, setError] = useState([]);
  const [dberror, setDberror] = useState("");
  const [isClearable, setIsClearable] = useState(true);

  const [note, setNote] = useState("");
  const classes = useStylesOrder();
  const dispatch = useDispatch();
  const liststate = useSelector(Liststate);
  const manualadd = useSelector(Manualaddstate);
  const [modelcount, setModelcount] = useState(1);
  const [modelOpen, setModelOpen] = useState(0);
  const history = useHistory();
  const notify = () =>
    toast.success("Order Add Successfully ..  ", {
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
  useEffect(() => {
    if (liststate.status === "succeeded") {
      setWebsiteList(liststate.List.list.website_list);
      setCourierList(liststate.List.list.courier_list);
      setProductList(liststate.List.list.product_list);
    }

    if (manualadd.status === "loading") {
      setActive(true);
    } else if (manualadd.status === "succeeded") {
      setActive(false);
      setWebid("");
      setOdrid("");
      setProdid("");
      setOdrqty("");
      setCourid("");
      setOdramt("");
      setOdrtype("");
      setOdrstatus("");
      setNote("");
      notify();
      dispatch(manualodrstatus());
    } else if (manualadd.status === "failed") {

      setActive(false);
      if (manualadd.error.errors[0] == "token expire") {
        handlelogout();
      } else {
        setDberror(manualadd.error.errors);
        setTimeout(() => {
          setDberror("");
        }, 4000);
      }
      dispatch(manualodrstatus());
    } else {
    }
  }, [manualadd , liststate]);

  const handleodridChange = (e) => {
    setOdrid(e.target.value);
  };
  const handleodramtChange = (e) => {
    setOdramt(e.target.value);
  };
  const handleodrawbChange = (e) => {
    setAwbno(e.target.value);
  };
  const handlenotesChange = (e) => {
    setNote(e.target.value);
  };
  const handleodrqtyChange = (e) => {
    setOdrqty(e.target.value);
  };

  // data add api
  const handledatasend = (e) => {
    if (navigator.onLine == true) {
      if (
        !odrid ||
        !prodid ||
        !odrqty ||
        !webid ||
        !odramt ||
        !isNaN(+odramt) === false ||
        !isNaN(+odrqty) === false
      ) {
        if (!odrid) {
          error.odrid = "Required !!";
        } else {
          error.odrid = "";
        }
        if (!prodid) {
          error.prodid = "Required !!";
        } else {
          error.prodid = "";
        }
        if (!odrqty) {
          error.odrqty = "Required !!";
        } else {
          error.odrqty = "";
        }
        if (!webid) {
          error.webid = "Required !!";
        } else {
          error.webid = "";
        }
        if (!odramt) {
          error.odramt = "Required !!";
        } else {
          error.odramt = "";
        }
        if (!isNaN(+odramt) === false) {
          error.odramtnum = "Valid Numbers";
        } else {
          error.odramtnum = "";
        }
        if (!isNaN(+odrqty) === false) {
          error.odrqtynum = "Valid Numbers !!";
        } else {
          error.odrqtynum = "";
        }
        setError({ ...error, [e.target.name]: e.target.value });
        setTimeout(() => {
          setError([]);
          setDberror("");
        }, 4000);
      } else {
        dispatch(
          ManualAddSlice({
            website_id: webid ? webid.value : "",
            order_id: odrid,
            product_id: prodid ? prodid.value : "",
            qty: odrqty,
            courier_id: courid ? courid.value : "",
            awb_no: awbno,
            order_amount: odramt,
            order_type: odrtype ? odrtype.value : "",
            order_status: odrstatus ? odrstatus.value : "",
            note: note,
          })
        );
        setError([]);
        setDberror("");
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
          Manual Entry{" "}
        </Typography>
        <Divider />

        {dberror && (
          <Typography className={classes.seterrorlabel}>{dberror} </Typography>
        )}
        <Grid container spacing={2} style={{ marginTop: "10px" }}>
          <Grid item xs={12} sm={6} md={3}>
            <div className={classes.setinsidegrid}>
              <Typography className={classes.setlabel}>Order Id :</Typography>
              <TextField
                id="outlined-basic"
                required
                size="small"
                label={odrid === "" ? "Enter Orderid." : ""}
                InputLabelProps={{ shrink: false }}
                variant="outlined"
                value={odrid}
                onChange={handleodridChange}
                className={classes.settextfield}
              />
            </div>
            {error.odrid && (
              <Typography className={classes.seterrorlabel}>
                {error.odrid}{" "}
              </Typography>
            )}
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <div className={classes.setinsidegrid}>
              <Typography className={classes.setlabel}>Qty :</Typography>
              <TextField
                required
                id="outlined-basic"
                size="small"
                label={odrqty === "" ? "Enter Qty." : ""}
                InputLabelProps={{ shrink: false }}
                variant="outlined"
                value={odrqty}
                onChange={handleodrqtyChange}
                className={classes.settextfield}
              />
            </div>
            {error.odrqty && (
              <Typography className={classes.seterrorlabel}>
                {error.odrqty}{" "}
              </Typography>
            )}
            {error.odrqtynum && (
              <Typography className={classes.seterrorlabel}>
                {error.odrqtynum}{" "}
              </Typography>
            )}
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <div className={classes.setinsidegrid}>
              <Typography className={classes.setlabel}>
                Order Amount :
              </Typography>
              <TextField
                required
                id="outlined-basic"
                size="small"
                label={odramt === "" ? "Enter Amount." : ""}
                InputLabelProps={{ shrink: false }}
                value={odramt}
                onChange={handleodramtChange}
                variant="outlined"
                className={classes.settextfield}
              />
            </div>
            {error.odramt && (
              <Typography className={classes.seterrorlabel}>
                {error.odramt}{" "}
              </Typography>
            )}
            {error.odramtnum && (
              <Typography className={classes.seterrorlabel}>
                {error.odramtnum}{" "}
              </Typography>
            )}
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <div className={classes.setinsidegrid}>
              <Typography className={classes.setlabel}>Awb No :</Typography>
              <TextField
                id="outlined-basic"
                size="small"
                variant="outlined"
                label={awbno === "" ? "Enter AWB no." : ""}
                InputLabelProps={{ shrink: false }}
                value={awbno}
                onChange={handleodrawbChange}
                className={classes.textFieldselect}
              />
            </div>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <div className={classes.setinsidegrid}>
              <Typography className={classes.setlabel}>Order Type :</Typography>
              <Select
                value={odrtype}
                onChange={setOdrtype}
                className={classes.textFieldselect}
                isClearable={isClearable}
                placeholder="Select"
                options={orderType}
                classNamePrefix="select"
              />
            </div>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <div className={classes.setinsidegrid}>
              <Typography className={classes.setlabel}>
                Order Status :
              </Typography>
              <Select
                value={odrstatus}
                onChange={setOdrstatus}
                className={classes.textFieldselect}
                isClearable={isClearable}
                placeholder="Select"
                options={orderStatus}
                classNamePrefix="select"
              />
            </div>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <div className={classes.setinsidegrid}>
              <Typography className={classes.setlabel}>Website :</Typography>
              <Select
                value={webid}
                onChange={setWebid}
                className={classes.textFieldselect}
                isClearable={isClearable}
                placeholder="Select *"
                options={websiteList}
                classNamePrefix="select"
              />
            </div>
            {error.webid && (
              <Typography className={classes.seterrorlabel}>
                {error.webid}{" "}
              </Typography>
            )}
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <div className={classes.setinsidegrid}>
              <Typography className={classes.setlabel}>Courier :</Typography>
              <Select
                value={courid}
                onChange={setCourid}
                className={classes.textFieldselect}
                isClearable={isClearable}
                placeholder="Select"
                options={courierList}
                classNamePrefix="select"
              />
            </div>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <div className={classes.setinsidegrid}>
              <Typography className={classes.setlabel}>Product :</Typography>
              <Select
                value={prodid}
                onChange={setProdid}
                className={classes.textFieldselect}
                isClearable={isClearable}
                placeholder="Select *"
                options={productList}
                classNamePrefix="select"
              />
            </div>
            {error.prodid && (
              <Typography className={classes.seterrorlabel}>
                {error.prodid}{" "}
              </Typography>
            )}
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <TextareaAutosize
              aria-label="minimum height"
              minRows={4}
              maxRows={4}
              value={note}
              onChange={handlenotesChange}
              className={classes.settextarea}
              style={{ width: "100%" }}
              placeholder="Enter Comment"
            />
          </Grid>
        </Grid>
        <div className={classes.setbtndiv}>
          <Button
            variant="contained"
            className={classes.setproductbtnsend}
            onClick={handledatasend}
          >
            Save
          </Button>
        </div>
      </Paper>
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

export default AddOrderManualy;
