import React, { useState, useEffect } from "react";
import useStyles from "./ProductStyle";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Button from "@material-ui/core/Button";
import { Paper, Grid } from "@material-ui/core";
import Avatar from "@mui/material/Avatar";
import TextField from "@mui/material/TextField";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Tooltip from "@mui/material/Tooltip";
import CardMedia from "@mui/material/CardMedia";
import Card from "@mui/material/Card";
import { useDispatch, useSelector } from "react-redux";
import { Liststate } from "../../commonLink/ListApi";
import { Link, useHistory, useParams } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import { Divider } from "@material-ui/core";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import {
  EditProductdata,
  updateproducteditstate,
  Editproductstate,
} from "./slice/EditProductdata";
import { ListFetch } from "../../commonLink/ListApi";
import {
  FinalEditProductSlice,
  Finaleditproductstate,
  updateproducteditfinalstate,
} from "./slice/FinalEditProduct";
import Backdrop from '@mui/material/Backdrop';
import { DotLoader } from "react-spinners";
import Select from "react-select";

function EditProduct() {
  const [unitid, setUnitid] = useState("");
  const [gstid, setGstid] = useState("");
  const [name, setName] = useState("");
  const [sku, setSku] = useState("");
  const [active, setActive] = useState(false);
  const [unitList, setUnitList] = useState([]);
  const [gstList, setGstList] = useState([]);
  const [Imgpre, setImgpre] = useState(false);
  const [sendgstid, setSendgstid] = useState("");
  const [disunit, setDisunit] = useState("");
  const [disgst, setDisgst] = useState("");
  const [image, setImage] = useState("");
  const [sendunitid, setSendunitid] = useState("");
  const [isClearable, setIsClearable] = useState(true);
  const [imgdisplay, setImgdisplay] = useState([]);
  const [disImage, setDisImage] = useState("");
  const [modelcount, setModelcount] = useState(1);
  const [modelOpen, setModelOpen] = useState(0);
  const [error, setError] = useState([]);
  const [dberr, setDberr] = useState([]);
  const [finaldberr, setFinaldberr] = useState("");
  const classes = useStyles();
  const listState = useSelector(Liststate);
  const dispatch = useDispatch();
  const Editprotstate = useSelector(Editproductstate);
  const finaleditstate = useSelector(Finaleditproductstate);
  const skuidparam = useParams();
  const history = useHistory();
  const handlename = (event) => {
    setName(event.target.value);
  };
  const handlesku = (event) => {
    setSku(event.target.value);
  };

  const handlelogout = () => {
    localStorage.removeItem("userdata");
    localStorage.removeItem("username");
    localStorage.removeItem("useremail");
    history.push("/");
    window.location.reload();
  };
  const imagehandle = (e) => {
    const addImage = e.target.files[0];
    setImage(addImage);
    const displayImg = URL.createObjectURL(e.target.files[0]);
    setImgdisplay(displayImg);
    setImgpre(true);
  };
  const handlemodel = () => {
    setImage("");
    setImgdisplay("");
    setDisImage("");
    setImgpre(false);
    document.getElementById('handleimagetext').value = null
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

  })

  // get data at page open time
  useEffect(() => {
    if (listState.status === "succeeded") {
      setUnitList(listState.List.list.unit_list);
      setGstList(listState.List.list.gst_list);
    }
    if (listState.status === "failed") {
      if (listState.error.errors == "token expire") {
        handlelogout();
      }
    }

    if (Editprotstate.status === "loading") {
      setActive(true)
    } else if (Editprotstate.status === "succeeded") {
      setActive(false)
      setImgpre(true);
      setName(Editprotstate.response.name);
      setSku(Editprotstate.response.sku);
      setDisunit(Editprotstate.response.unit);
      setDisgst(Editprotstate.response.gst);
      setDisImage(Editprotstate.response.image);
      dispatch(updateproducteditstate());
    } else if (Editprotstate.status === "failed") {
      setActive(false)
      if (Editprotstate.error.errors == "token expire") {
        handlelogout();
      } else {
        setDberr(Editprotstate.error.errors);
      }
      setTimeout(() => {
        setDberr("");
      }, 3000);
      dispatch(updateproducteditstate());
    } else {
      setActive(false)
    }
  }, [listState , Editprotstate])
  

  // send updated data to db
  useEffect(() => {
    if (finaleditstate.status === "loading") {
    } else if (finaleditstate.status === "succeeded") {
      setName("");
      setSku("");
      setImage("");
      setDisImage("");
      setUnitid("");
      setGstid("");
      setSendunitid("");
      setSendgstid("");
      setDisunit("");
      setDisgst("");
      dispatch(updateproducteditfinalstate());
      history.push("/app/productlist");
      dispatch(ListFetch());
    } else if (finaleditstate.status === "failed") {
      console.log(finaleditstate.error.errors[0])
      if (finaleditstate.error.errors[0] == 'token expire') {
        handlelogout();
      } else {
        setFinaldberr(finaleditstate.error.errors[0]);
        setTimeout(() => {
          setFinaldberr("");
        }, 3000);
      }
      dispatch(updateproducteditfinalstate());
    } else {
    }
  },[finaleditstate]);

  // set selected val in gst & unit
  useEffect(() => {
    {
      unitList.map((e) => {
        if (disunit == e.unit) {
          setSendunitid(e.id);
        }
      });
    }
    {
      gstList.map((e) => {
        if (disgst == e.gst_no) setSendgstid(e.id);
      });
    }
  })
  
  useEffect(() => {
    dispatch(ListFetch()); //list fetch
    dispatch(EditProductdata(skuidparam.id)); //fetch dat from sku
  }, []);

  const hanldemodelclose = () => {
    setModelOpen(0);
  };

  // call api and data send time
  const handlefinaldatasend = (e) => {
    if (navigator.onLine == true) {
      if (!name || (!image && !disImage)) {
        if (!name) {
          error.name = "Name Required !!";
        } else {
          error.name = "";
        }

        if (!image && !disImage) {
          error.image = "Image Required";
        } else {
          error.image = "";
        }
        setError({ ...error, [e.target.name]: e.target.value });
        setTimeout(() => {
          setError([]);
        }, 3000);
      } else {
        dispatch(
          FinalEditProductSlice({
            name,
            sku,
            unit_id: !unitid ? sendunitid : unitid.id,
            gst_id: !gstid ? sendgstid : gstid.id,
            image,
          })
        );
        setError([]);
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
        <div className={classes.addproductheader}>
          <Tooltip title="Back">
            <Avatar
              className={classes.setaddproheaderarrow}
              variant="rounded"
              component={Link}
              to="/app/productlist"
            >
              <ArrowBackIcon sx={{ color: "black" }} />
            </Avatar>
          </Tooltip>
          <Typography variant="h4" gutterBottom className={classes.setheading}>
            Edit Product
          </Typography>
        </div>
        <Paper className={classes.setProductpaper} elevation={5}>
          {/* page open time err */}
          {dberr && (
            <Typography className={classes.seterrorlabel}>{dberr} </Typography>
          )}
          {/* data send time err */}
          {finaldberr && (
            <Typography className={classes.seterrorlabel}>
              {finaldberr}{" "}
            </Typography>
          )}
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={3} className={classes.setinputlayout}>
              <div>
                <Typography className={classes.setlabel}>Name :</Typography>
                <TextField
                  fullWidth
                  id="outlined-basic"
                  size="small"
                  placeholder="name"
                  variant="outlined"
                  value={name}
                  onChange={handlename}
                  className={classes.settextfield}
                />{" "}
              </div>
              {error.name && (
                <Typography className={classes.seterrorlabel}>
                  {error.name}{" "}
                </Typography>
              )}
            </Grid>
            <Grid item xs={12} sm={6} md={3} className={classes.setinputlayout}>
              <div>
                <Typography className={classes.setlabel}>sku :</Typography>
                <TextField
                  fullWidth
                  id="outlined-basic"
                  size="small"
                  disabled
                  placeholder="sku"
                  variant="outlined"
                  value={sku}
                  onChange={handlesku}
                  className={classes.settextfield}
                />{" "}
              </div>
            </Grid>
            <Grid item xs={12} sm={6} md={3} className={classes.setinputlayout}>
              <div>
                <Typography className={classes.setlabel}>
                  Unit Number
                </Typography>
                <Select
                  value={unitid}
                  onChange={setUnitid}
                  className={classes.settextarea}
                  isClearable={isClearable}
                  placeholder={disunit}
                  classNamePrefix="select"
                  getOptionValue={(option) => option.id}
                  getOptionLabel={(option) => option.unit}
                  options={unitList}
                />
              </div>
            </Grid>
            <Grid item xs={12} sm={6} md={3} className={classes.setinputlayout}>
              <div>
                <Typography className={classes.setlabel}>Gst Number</Typography>
                <Select
                  value={gstid}
                  onChange={setGstid}
                  className={classes.settextarea}
                  isClearable={isClearable}
                  placeholder={disgst}
                  classNamePrefix="select"
                  getOptionValue={(option) => option.id}
                  getOptionLabel={(option) => option.gst_no}
                  options={gstList}
                />
              </div>
            </Grid>
          </Grid>
          <Grid container spacing={2} style={{ margin: "4px 0px 0px -8px" }}>
            <Grid item xs={12} sm={6} md={3}>
              <div>
                <Typography className={classes.setImageleftlabel}>
                  photo :
                </Typography>
                <TextField
                  fullWidth
                  id="handleimagetext"
                  size="small"
                  type="file"
                  variant="outlined"
                  onChange={imagehandle}
                  className={classes.settextfield}
                />
              </div>
              {error.image && (
                <Typography className={classes.seterrorlabel}>
                  {error.image}{" "}
                </Typography>
              )}
            </Grid>

            {Imgpre && (
              <Grid
                item
                sm={6}
                md={3}
                style={{ marginTop: "10px" }}
                className={classes.setImggrid}
              >
                <Card sx={{ height: "auto" }}>
                  <CardMedia
                    component="img"
                    src={imgdisplay.length === 0 ? disImage : imgdisplay}
                    className={classes.setdisimage}
                  />
                  <Button
                    endIcon={<DeleteIcon />}
                    className={classes.setdelbtn}
                    onClick={handlemodel}
                  >
                    Delete
                  </Button>
                </Card>
              </Grid>
            )}
          </Grid>
          <div className={classes.setsendbutton}>
            <Button
              variant="contained"
              size="medium"
              className={classes.setsendbtninside}
              onClick={handlefinaldatasend}
            >
              Save
            </Button>
          </div>
        </Paper>
      </Container>
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
        open={active}
      >
        <DotLoader color="white" />
      </Backdrop>
    </>
  );
}

export default EditProduct;
