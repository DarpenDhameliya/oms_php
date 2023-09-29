import React, { useState, useEffect } from "react";
import useStyles from "./ProductStyle";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Button from "@material-ui/core/Button";
import { Divider, Paper, Grid } from "@material-ui/core";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import TextField from "@mui/material/TextField";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Tooltip from "@mui/material/Tooltip";
import CardMedia from "@mui/material/CardMedia";
import Card from "@mui/material/Card";
import { Link, useHistory } from "react-router-dom";
import { ListFetch } from "../../commonLink/ListApi";
import { useDispatch, useSelector } from "react-redux";
import { Liststate } from "../../commonLink/ListApi";
import DeleteIcon from "@mui/icons-material/Delete";
import Zoom from "@mui/material/Zoom";
import { AddProductSlice, Addproductstate } from "./slice/AddProductSlice";
import { updateProductAddSlice } from "./slice/AddProductSlice";
import Select from "react-select";

function AddProduct() {
  const [unitid, setUnitid] = useState("");
  const [gstid, setGstid] = useState("");
  const [name, setName] = useState("");
  const [sku, setSku] = useState("");
  const [image, setImage] = useState("");
  const [imgdisplay, setImgdisplay] = useState([]);
  const [Imgpre, setImgpre] = useState(false);
  const [unitList, setUnitList] = useState([]);
  const [gstList, setGstList] = useState([]);
  const [errors, setErrors] = useState([]);
  const [databaseErr, setDatabaseErr] = useState([]);
  const [modelcount, setModelcount] = useState(1);
  const [modelOpen, setModelOpen] = useState(0);
  const [isClearable, setIsClearable] = useState(true);

  const classes = useStyles();
  const dispatch = useDispatch();
  const listState = useSelector(Liststate);
  const AddProductState = useSelector(Addproductstate);
  const history = useHistory();
  // console.log(AddProductState);
  const handlename = (event) => {
    setName(event.target.value);
  };
  const handlesku = (event) => {
    setSku(event.target.value);
  };
  const handlemodel = () => {
    setImage("");
    setImgdisplay("");
    setImgpre(false);
    document.getElementById('handleimagetext').value = null
  };
  const imagehandle = (e) => {
    const addImage = e.target.files[0];
    setImage(addImage);
    const displayImg = URL.createObjectURL(e.target.files[0]);
    setImgdisplay(displayImg);
    setImgpre(true);
    console.log(image);
    console.log(addImage);
  };

  // add data in db
  const senddata = (e) => {
    e.preventDefault();
    let imagevalid = false;
    if (
      image.name.split(".")[1] === "png" ||
      image.name.split(".")[1] === "jpg" ||
      image.name.split(".")[1] === "jpeg"
    ) {
      imagevalid = false;
    } else {
      imagevalid = true;
    }
    if (navigator.onLine == true) {
      if (!name || !sku || !unitid || !gstid || !image || imagevalid === true) {
        if (!name) {
          errors.name = "Name Required !";
        } else {
          errors.name = "";
        }

        if (!sku) {
          errors.sku = "sku Required !";
        } else {
          errors.sku = "";
        }

        if (!unitid) {
          errors.unitid = "Unitno Required !";
        } else {
          errors.unitid = "";
        }

        if (!gstid) {
          errors.gstid = "gstno Required !";
        } else {
          errors.gstid = "";
        }

        if (!image) {
          errors.image = "Image Required !";
        } else {
          errors.image = "";
        }

        if (imagevalid === true) {
          errors.imagetype = "Image must be jpg / jpeg / png !";
        } else {
          errors.imagetype = "";
        }
        console.log(errors);
        setErrors({ ...errors, [e.target.name]: e.target.value });
      } else {
        dispatch(
          AddProductSlice({
            name: name,
            sku: sku,
            unit_id: unitid.id,
            gst_id: gstid.id,
            image: image,
          })
        );
        setDatabaseErr([]);
        setErrors([]);
      }
      setTimeout(() => {
        setErrors([]);
      }, 3000);
    } else {
      setModelOpen(1);
      setModelcount(2);
    }
  };
  useEffect(() => {
    dispatch(ListFetch());
  }, []);

  const handlelogout = () => {
    localStorage.removeItem("userdata");
    localStorage.removeItem("username");
    localStorage.removeItem("useremail");
    history.push("/");
    window.location.reload();
  };
  const hanldemodelclose = () => {
    setModelOpen(0);
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

    if (AddProductState.status === "succeeded") {
      history.push("/app/productlist");
      dispatch(updateProductAddSlice());
      dispatch(ListFetch());
    }
    if (AddProductState.status === "failed") {
      if (AddProductState.error.errors == "token expire") {
        handlelogout();
      } else {
        setDatabaseErr(AddProductState.error.errors);
        setTimeout(() => {
          setDatabaseErr([]);
        }, 3000);
      }
      dispatch(updateProductAddSlice());
    }
  },[listState, AddProductState]);

  return (
    <>
      <Container
        component="main"
        maxWidth="xl"
        className={classes.setcontainer}
      >
        <div className={classes.addproductheader}>
          <Tooltip
            title="Back to List"
            TransitionComponent={Zoom}
            placement="bottom-end"
            sx={{ fontsize: "15px" }}
          >
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
            Add Product
          </Typography>
        </div>
        <Paper className={classes.setProductpaper} elevation={5}>
          {databaseErr && (
            <Typography className={classes.seterrorlabel}>
              {databaseErr}{" "}
            </Typography>
          )}
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={3} className={classes.setinputlayout}>
              <div>
                <Typography className={classes.setlabel}>Name : </Typography>
                <TextField
                  fullWidth
                  id="outlined-basic"
                  size="small"
                  variant="outlined"
                  placeholder="name *"
                  value={name}
                  onChange={handlename}
                  className={classes.settextfield}
                />
              </div>
              {errors.name && (
                <Typography className={classes.seterrorlabel}>
                  {errors.name}{" "}
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
                  variant="outlined"
                  placeholder="sku *"
                  value={sku}
                  onChange={handlesku}
                  className={classes.settextfield}
                />
              </div>
              {errors.sku && (
                <Typography className={classes.seterrorlabel}>
                  {errors.sku}{" "}
                </Typography>
              )}
            </Grid>
            <Grid item xs={12} sm={6} md={3} className={classes.setinputlayout}>
              <div>
                <Typography className={classes.setlabel}>Unit :</Typography>
                <Select
                  value={unitid}
                  onChange={setUnitid}
                  className={classes.settextarea}
                  isClearable={isClearable}
                  placeholder="Select Status *"
                  classNamePrefix="select"
                  getOptionValue={(option) => option.id}
                  getOptionLabel={(option) => option.unit}
                  options={unitList}
                />
              </div>
              {errors.unitid && (
                <Typography className={classes.seterrorlabel}>
                  {errors.unitid}{" "}
                </Typography>
              )}
            </Grid>
            <Grid item xs={12} sm={6} md={3} className={classes.setinputlayout}>
              <div>
                <Typography className={classes.setlabel}>Gst :</Typography>
                <Select
                  value={gstid}
                  onChange={setGstid}
                  className={classes.settextarea}
                  isClearable={isClearable}
                  placeholder="Select Status *"
                  classNamePrefix="select"
                  getOptionValue={(option) => option.id}
                  getOptionLabel={(option) => option.gst_no}
                  options={gstList}
                />
              </div>
              {errors.gstid && (
                <Typography className={classes.seterrorlabel}>
                  {errors.gstid}{" "}
                </Typography>
              )}
            </Grid>
          </Grid>
          <Grid container spacing={2} style={{ margin: "4px 0px 0px -8px" }}>
            <Grid item xs={12} sm={6} md={3}>
              <Typography className={classes.setImageleftlabel}>
                Image :
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
              {errors.image && (
                <Typography className={classes.seterrorlabel}>
                  {errors.image}{" "}
                </Typography>
              )}
              {errors.imagetype && (
                <Typography className={classes.seterrorlabel}>
                  {errors.imagetype}{" "}
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
                    image={imgdisplay}
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
              onClick={senddata}
            >
              Add Product
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
      </Container>
    </>
  );
}

export default AddProduct;
