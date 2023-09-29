import React, { useState, useEffect } from "react";
import Container from "@mui/material/Container";
import { Divider, Grid, Paper } from "@material-ui/core";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@material-ui/core/Button";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CardActions from "@mui/material/CardActions";
import useStyles from "./ProductStyle";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { useHistory, Link } from "react-router-dom";
import { ListFetch, Liststate, listfetchstate } from "../../commonLink/ListApi";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import InputAdornment from "@mui/material/InputAdornment";
import OutlinedInput from "@mui/material/OutlinedInput";
import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";
import {
  updateProductstateaction,
  DeleteProductSlice,
  Deleteproductstate,
} from "./slice/DeleteProductSlice";
import Backdrop from "@mui/material/Backdrop";
import { DotLoader } from "react-spinners";
import Avatar from "@mui/material/Avatar";
const ariaLabel = { "aria-label": "description" };

function ProductList() {
  const [modelOpen, setModelOpen] = useState(0);
  const [productList, setProductList] = useState([]);
  const [deletesku, setDeletesku] = useState("");
  const [active, setActive] = useState(false);
  const [dberr, setDberr] = useState("");
  const [openINput, setOpenINput] = useState(false);
  const [RemoveINput, setRemoveINput] = useState(false);
  const [displaymainSearch, setDisplaymainSearch] = useState(true);
  const [modelcount, setModelcount] = useState(1);
  const [modelOpennet, setModelOpennet] = useState(0);
  const [searchval, setSearchval] = useState("");
  // const [page, setPage] = useState(1)
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const listState = useSelector(Liststate);
  const deletestatus = useSelector(Deleteproductstate);

  // const PER_PAGE = 10;
  // const count = Math.ceil(productList.length / PER_PAGE);
  // const paginationdata = UsePagination(productList, PER_PAGE);
  // const handleChange = (e, p) => {
  //   setPage(p);
  //   paginationdata.jump(p);
  // };
  // console.log(openINput)
  const notify = () =>
    toast.success("Product Delete Successfully ..  ", {
      autoClose: 3000,
    });
  const notifyerr = (data) =>
    toast.error(data, {
      autoClose: 3000,
    });

  const handlemodel = (sku) => {
    const skuid = sku;
    setDeletesku(skuid);
    setModelOpen(1);
  };

  const finaldelete = () => {
    if (navigator.onLine === true) {
      dispatch(DeleteProductSlice(deletesku));
    } else {
      setModelOpennet(1);
      setModelcount(2);
    }
  };

  const handleeditdata = (sku) => {
    const skuid = sku;
    if (navigator.onLine == true) {
      history.push(`/app/productedit/${skuid}`);
    } else {
      setModelOpennet(1);
      setModelcount(2);
    }
  };
  
  const handlelogout = () => {
    localStorage.removeItem("userdata");
    localStorage.removeItem("username");
    localStorage.removeItem("useremail");
    history.push("/");
    window.location.reload();
  };

  useEffect((e) => {
    if (navigator.onLine == true) {
      dispatch(ListFetch());
    } else {
      setModelOpennet(1);
      setModelcount(2);
    }
  }, []);

  useEffect(() => {
    if (listState.status === "loading") {
      setActive(true);
    } else if (listState.status === "succeeded") {
      // console.log(listState.List.list.product_list)
      setProductList(listState.List.list.product_list);
      setActive(false);
      dispatch(listfetchstate());
    } else if (listState.status === "failed") {
      setActive(false);
      if (listState.error.errors == "token expire") {
        handlelogout();
      } else {
        console.log(listState.error);
        setDberr(listState.error);
        setTimeout(() => {
          setDberr("");
        }, 4000);
      }
      dispatch(listfetchstate());
    } else {
    }
  }, [listState])
  
  useEffect(() => {
    if (deletestatus.status === "succeeded") {
      dispatch(ListFetch());
      setModelOpen(0);
      notify();
      dispatch(updateProductstateaction());
    }
    if (deletestatus.status === "failed") {
      setModelOpen(0);
      // console.log(deletestatus.error.response.data)
      notifyerr(deletestatus.error.response.data.message);
      dispatch(updateProductstateaction());
    }
  } ,[deletestatus]);

  const hanldemodelclose = () => {
    setModelOpennet(0);
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

  const handleOpenInput = () => {
    setOpenINput(true);
    setRemoveINput(true);
    setDisplaymainSearch(false);
  };

  const handleRemoveInput = () => {
    setRemoveINput(false);
    setOpenINput(false);
    setSearchval("");
    setDisplaymainSearch(true);
  };

  return (
    <>
      <ToastContainer position="top-right" closeOnClick />

      <Container
        component="main"
        maxWidth="xl"
        className={classes.setcontainer}
      >
        <div className={classes.setpageheading}>
          <Typography variant="h4" gutterBottom className={classes.setheading}>
            Product
          </Typography>
          <div className={classes.setinsideheaddive}>
            {displaymainSearch && (
              <Avatar
                className={classes.setsercharrow}
                variant="rounded"
                onClick={handleOpenInput}
              >
                <SearchIcon sx={{ color: "black" }} />
              </Avatar>
            )}

            {openINput && (
              <>
                <OutlinedInput
                  id="outlined-adornment-password"
                  className={classes.setsearch}
                  value={searchval}
                  size="small"
                  placeholder="Search .."
                  onChange={(e) => setSearchval(e.target.value)}
                  endAdornment={
                    <InputAdornment position="end">
                      <SearchIcon
                        aria-label="toggle password visibility"
                        edge="end"
                        inputProps={ariaLabel}
                      />
                    </InputAdornment>
                  }
                />
                <Avatar
                  className={classes.setremmoveicon}
                  variant="rounded"
                  onClick={handleRemoveInput}
                >
                  <CloseIcon sx={{ color: "black" }} />{" "}
                </Avatar>
              </>
            )}
            <Button
              variant="contained"
              className={classes.setproductbtn}
              component={Link}
              to="/app/productadd"
            >
              Add Product
            </Button>
          </div>
        </div>

        {productList.length > 0 && (
          <Paper className={classes.setProductpaper} elevation={5}>
            <Grid container className={classes.setGridcard}>
            {dberr && (
            <Typography className={classes.seterrorlabel}>
              {dberr}{" "}
            </Typography>
          )}
              {productList
                .filter((data) => {
                  return searchval.toLowerCase() === ""
                    ? data
                    : data.label.toLowerCase().includes(searchval) ||
                        data.sku.toLowerCase().includes(searchval);
                })
                .map((e) => {
                  // eslint-disable-next-line no-lone-blocks
                  {
                    /* let data =
                  searchval.toLowerCase() === ""
                    ? e
                    : e.label.toLowerCase().includes(searchval) ||
                      e.sku.toLowerCase().includes(searchval); */
                  }
                  return (
                    <Grid
                      item
                      xs={12}
                      sm={6}
                      md={4}
                      lg={3}
                      key={e.sku}
                      className={classes.setonegried}
                    >
                      <Card
                        style={{ position: "relative", width: "100%" }}
                        className={classes.setcardeff}
                      >
                        <CardMedia
                          component="img"
                          className={classes.setImage}
                          image={e.image}
                          alt="Product Image"
                        />
                        <CardContent sx={{ padding: "5px 10px" }}>
                          <div className={classes.setlistdiv}>
                            <Typography
                              gutterBottom
                              variant="h5"
                              component="div"
                              className={classes.settypohead}
                            >
                              Name :
                              <span className={classes.settypo}>{e.label}</span>
                            </Typography>
                          </div>
                          <Typography
                            gutterBottom
                            variant="h6"
                            component="div"
                            className={classes.settypohead}
                          >
                            SKU:
                            <span className={classes.settypo}>{e.sku} </span>
                          </Typography>
                        </CardContent>
                        <Divider />
                        <CardActions
                          className={classes.setbtn}
                          sx={{ justifyContent: "left" }}
                        >
                          <Grid className={classes.setbtndisplay}>
                            <Grid item xs={12}>
                              <Button
                                endIcon={<EditIcon />}
                                className={classes.seteditbtn}
                                onClick={() => handleeditdata(e.sku)}
                              >
                                Edit
                              </Button>
                            </Grid>
                            <Divider orientation="vertical" flexItem />

                            <Grid item xs={12}>
                              <Button
                                endIcon={<DeleteIcon />}
                                className={classes.setdelbtn}
                                onClick={() => handlemodel(e.sku)}
                              >
                                Delete
                              </Button>
                            </Grid>
                          </Grid>
                        </CardActions>
                      </Card>
                    </Grid>
                  );
                })}
            </Grid>
          </Paper>
        )}
      </Container>
      <Modal
        open={modelOpen}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className={classes.setmodeldisplay}>
          <Typography
            className={classes.setmodeltypo}
            id="modal-modal-title"
            variant="h5"
            component="h2"
          >
            Delete Conformation
          </Typography>
          <Divider />
          <Typography
            className={classes.setmodeltypo}
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
              onClick={() => setModelOpen(0)}
              className={classes.canclebtn}
            >
              Cancle
            </Button>
            <Button
              variant="contained"
              className={classes.deletebtn}
              onClick={finaldelete}
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
      </Backdrop>
    </>
  );
}

export default ProductList;
