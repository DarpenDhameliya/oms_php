import { makeStyles } from "@material-ui/styles";


const useStyleAuth = makeStyles((theme) => ({
  setloginbackpaper: {
    textAlign: "center",
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(3),
    display: "flex !important",
    justifyContent: "center",
    flexDirection: "column",
    margin: "auto",
    maxWidth: "510px",
    borderRadius: "10px",
  },
  setcontainer: {
    maxWidth: "100% !important",
    minHeight: "100vh",
    position: "relative",
    zIndex: 1,
    backgroundColor: "aliceblue",
    paddingTop: "70px",
    // backgroundImage:`url(${image})`
  },
  setcontainerprofile: {
    maxWidth: "100% !important",
    minHeight: "100vh",
    position: "relative",
    zIndex: 1,
    backgroundColor: "#f9fafc",
    paddingTop: "70px",
  },
  setpageheading: {
    maxWidth: "100% !important",
    margin: "auto",
    display: "flex",
    justifyContent: "center",
  },
  setheading: {
    display:'flex',
    padding: "5px",
    margin: "0 !important",
    color: "#495057",
    alignItems: 'center',
    fontSize: "30px !important",
    lineHeight: "32px",
    fontFamily: ["Poppins", "sans-serif", "!important"],
    [theme.breakpoints.down("xs")]: {
      fontSize:'25px !important'
    },  },
  setheadingfront:{
    padding: "5px",
    margin: "0 !important",
    color: "#202223",
    paddingRight:'0px !important',
    fontWeight: "600 !important",
    fontSize: "30px !important",
    lineHeight: "32px",
    fontFamily: ["Poppins", "sans-serif", "!important"],
    [theme.breakpoints.down("xs")]: {
      fontSize:'20px !important'
    },
  },
  setloginheadset:{
    fontSize:'15px !important',
    color:'#524c4c',
    fontFamily: ["Poppins", "sans-serif", "!important"],
    fontWeight: "600 !important",
  },
  settextfield: {
    '& .MuiInputBase-root':{
      fontFamily: ["Poppins", "sans-serif", "!important"],
    },
    "&:hover": { boxShadow: `${theme.shadows[3]}`, border: 0 },
  },
  seterrorlabel:{
    margin:0,
    display:'flex',
    color:'#7f2121'
  },
  setinput:{
    display:'grid',
    marginTop:'12px !important'
  },
  setinputFirst:{
    display:'grid',
  },
  setHeadingpass: {
    display:'flex',
    fontFamily: ["Poppins", "sans-serif", "!important"],
    fontSize: '21px !important',
    marginBottom: '25px !important',
    fontWeight: '600 !important',
    lineHeight: '25px !important'
  },
  setlabel: {
    display:'flex',
    fontFamily: ["Poppins", "sans-serif", "!important"],
    fontSize: "15px !important",
    lineHeight: "21px !important",
    marginTop: "7px !important",
    marginRight: "10px !important",
    marginBottom: "2px !important",
  },
  setlabelprofile: {
    display:'flex',
    alignItems:'center',
    fontFamily: ["Poppins", "sans-serif", "!important"],
    fontSize: "15px !important",
    lineHeight: "21px !important",
    marginTop: "7px !important",
    marginRight: "10px !important",
    marginBottom: "2px !important",
    fontWeight: '600 !important',
  },
  setloginbutton: {
    marginTop: "20px !important",
    backgroundColor: "#367fa9 !important",
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
    marginTop: "20px",
    [theme.breakpoints.only('sm')]:{
      minWidth:'340px'
    }
  },
  setProductpaperdisplay: {
    textAlign: "left",
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(3),
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    margin: "auto",
    width: "100% !important",
    borderRadius: "10px",
    marginTop: "20px",
    [theme.breakpoints.only('sm')]:{
      minWidth:'340px'
    }
  },
  setsendbtninside: {
    // marginTop:"15px",
    height: "40px",
    fontWeight: "600 !important",
    textTransform: "none",
    padding: "0px 15px",
    backgroundColor: "#3c8dbc",
    color: "white",
    "&:hover": { backgroundColor: "#3c8dbccc  !important" },
  },
  setBtnrow:{
    display:"flex",
    justifyContent:"flex-end",
    marginTop:'10px !important'
  },
  setmodeldisplay: {
    position: "absolute",
    top: "45%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: '400px',
    backgroundColor: "white !important",
    border: "1px solid #000",
    boxShadow: `${theme.shadows[8]}`,
    borderRadius: "9px !important",
    padding: 10,
    [theme.breakpoints.down("xs")]: {
      width: '200px !important',
      heigth: "200px !important",
    },
  },
  setmodeltypo: {
    fontFamily: ["Poppins", "sans-serif", "!important"],
  },
  setbtndeldiv: {
    display: "flex",
    justifyContent: "flex-end",
    paddingTop: "5px",
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
}));

export default useStyleAuth;
