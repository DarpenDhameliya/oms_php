import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
  setcontainer: {
    maxWidth: "100% !important",
    minHeight: "100vh",
    position: "relative",
    paddingBottom: "30px !important",
    zIndex: 1,
    backgroundColor: "#f9fafc",
    paddingTop: "80px",
    overflow: 'hidden',
  },
  // setloginbackpaper: {
  //   textAlign: "left",
  //   backgroundColor: theme.palette.background.paper,
  //   display: "flex",
  //   justifyContent: "center",
  //   flexDirection: "column",
  //   margin: "auto",
  //   maxWidth: "1250px",
  //   borderRadius: "10px",
  //   marginTop: "50px",
  // },
  setheading: {
    padding: "5px",
    margin: "0 !important",
    color: "#202223",
    fontWeight: "600 !important",
    fontSize: "35px !important",
    lineHeight: "32px",
    fontFamily: ["Poppins", "sans-serif", "!important"],
  },
  setpageheading: {
    width: "100% !important",
    margin: "auto",
    display: "flex",
    justifyContent: "space-between",
    alignItems:'center'
  },
  setproductbtn: {
    fontWeight: 600,
    textTransform: "none",
    padding: "0px 15px",
    height: "40px",
    backgroundColor: "#3c8dbc",
    marginLeft:'5px !important',
    color: "white",
    "&:hover": { backgroundColor: "#3c8dbc !important" },
  },
  setProductpaper: {
    textAlign: "left",
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(3),
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    margin: "auto",
    width: "100% !important",
    borderRadius: "10px",
    marginTop: "30px",
  },
  setcarddiv: {
    display: "flex",
  },
  setImage: {
    height: "180px",
    width: "100%",
    boxShadow: `${theme.shadows[5]}`,
  },
  setGridcard: {
    columnSpacing: '3 !important',
    [theme.breakpoints.down("xs")]: {
      columnSpacing: "1 !important",
    },
  },
  setonegried: {
    padding: theme.spacing(1),
    [theme.breakpoints.up("sm")]: {
      padding: theme.spacing(1),
    },
  },
  settypo: {
    fontFamily: ["Poppins", "sans-serif", "!important"],
    fontWeight: "500 !important",
    fontSize: "15px !important",
    marginLeft: "10px !important",
    // [theme.breakpoints.down("xs")]: {
    //   fontSize: "16px !important",
    // },
    // [theme.breakpoints.down("sm")]: {
    //   fontSize: "16px !important",
    // },
    // [theme.breakpoints.down("md")]: {
    //   fontSize: "16px !important",
    // },
  },
  settypohead: {
    fontFamily: ["Poppins", "sans-serif", "!important"],
    fontWeight: "600 !important",
    fontSize: "18px !important",
    // margin: 0,
    [theme.breakpoints.down("xs")]: {
      fontSize: "16px !important",
    },
    [theme.breakpoints.down("sm")]: {
      fontSize: "16px !important",
    },
    [theme.breakpoints.down("md")]: {
      fontSize: "16px !important",
    },
  },
  setlistdiv: {
    display: "flex !important",
    justifyContent: "flex-start !important",
    alignItems: "center",
  },
  setbtn: {
    justifyContent: "left",
    padding: "8px 0px !important",
    [theme.breakpoints.down("xs")]: {
      justifyContent: "space-around !important",
    },
  },
  setdelbtn: {
    width: "100%",
    fontWeight: 800,
    "&:hover": { color: "#7f2121 !important", backgroundColor: "antiquewhite" },
  },
  seteditbtn: {
    width: "100%",
    fontWeight: 800,
    "&:hover": { color: "#3c8dbc !important", backgroundColor: "#d6efef" },
  },
  setmodeldisplay: {
    position: "absolute",
    top: "45%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    backgroundColor: "white !important",
    border: "1px solid #000",
    boxShadow: `${theme.shadows[8]}`,
    borderRadius: "9px !important",
    padding: 10,
    [theme.breakpoints.down("xs")]: {
      width: 200,
      heigth: "200px !important",
    },
  },
  deletebtn: {
    fontWeight: 600,
    height: "35px",
    textTransform: "none",
    padding: "0px 15px",
    backgroundColor: "#931d1d",
    color: "white",
    "&:hover": { backgroundColor: "#931d1d !important" },
  },
  canclebtn: {
    fontWeight: 600,
    height: "35px",
    textTransform: "none",
    padding: "0px 15px",
    backgroundColor: "#3c8dbc",
    marginRight: "5px",
    color: "white",
    "&:hover": { backgroundColor: "#3c8dbc !important" },
  },
  setbtndeldiv: {
    display: "flex",
    justifyContent: "flex-end",
    paddingTop: "5px",
  },
  addproductheader: {
    display: "flex",
    justifyContent: "left",
  },
  setaddproheaderarrow: {
    border: "1px solid #202223",
    backgroundColor: "transparent !important",
    marginTop: "6px !important",
    marginRight: "20px",
    marginLeft: "4px",
  },
  setsercharrow: {
    border: "1px solid #202223",
    backgroundColor: "transparent !important",
    [theme.breakpoints.down("xs")]: {
      display :'none !important'
     },
  },
  setremmoveicon: {
    backgroundColor: "transparent !important",
    "&:hover": { backgroundColor: "antiquewhite  !important" },
    marginTop:"7px !important",
    height:"25px !important",
    width:"25px !important"
  },
  setlabel: {
    fontFamily: ["Poppins", "sans-serif", "!important"],
    fontSize: "15px",
    lineHeight: "21px",
    marginTop: "7px",
    marginRight: "10px",
    marginBottom: "2px",
    fontWeight: "600 !important",
  },
  textField: {
    '& .MuiInputBase-root':{
      fontFamily: ["Poppins", "sans-serif", "!important"],
    },
    margin: "0 !important",
    "&:hover": { boxShadow: `${theme.shadows[3]}`, border: 0 },

  },
  setinputlayout: {
    display: "grid",
  },
  settopgrid: {
    display: "flex",
  },
  setsendbutton: {
    display: "flex",
    justifyContent: "end",
  },
  setsendbtninside: {
    height: "40px",
    marginTop: "5px",
    fontWeight: 600,
    textTransform: "none",
    padding: "0px 15px",
    backgroundColor: "#3c8dbc",
    color: "white",
    "&:hover": { backgroundColor: "#3c8dbccc  !important" },
  },
  setdisimage: {
    objectFit: "cover !important",
    height: "180px",
  },
  setImageleftlabel: {
    fontFamily: ["Poppins", "sans-serif", "!important"],
    fontSize: "15px",
    lineHeight: "21px",
    fontWeight: "600 !important",
    marginBottom: "2px",
  },
  setImggrid: {
    [theme.breakpoints.down("xs")]: {
      padding: "8px",
    },
  },
  setmodeltypo: {
    fontFamily: ["Poppins", "sans-serif", "!important"],
  },
  seterrorlabel: {
    fontFamily: ["Poppins", "sans-serif", "!important"],
    fontSize: "15px !important",
    lineHeight: "21px !important",
    marginTop: "7px !important",
    marginRight: "10px",
    color: "#7f2121",
    marginBottom: "20px !important",
    fontWeight: "600 !important",
  },
  setbtndisplay: {
    display: "flex",
    width: "100%",
  },
  setcardeff: {
    "&:hover": { boxShadow: `${theme.shadows[10]}` },
  },
  setpagination: {
    display: "none",
    [theme.breakpoints.down("sm")]: {
      display: "flex",
      justifyContent: "end !important",
    },
  },
  setsearch:{
    height:"40px !important",
    width:'250px',
    backgroundColor:"#fff",
    borderRadius:'30px !important',
    [theme.breakpoints.down("xs")]: {
      display :'none !important'
     },
  },
  setinsideheaddive:{
    display:'flex',
    justifyContent:'flex-end',
  },
  settextfield: {
    '& .MuiInputBase-root':{
      fontFamily: ["Poppins", "sans-serif", "!important"],
    },
    "&:hover": { boxShadow: `${theme.shadows[3]}`, border: 0 },
  },
}));

export default useStyles;
