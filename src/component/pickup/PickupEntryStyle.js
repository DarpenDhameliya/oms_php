import { makeStyles } from "@material-ui/styles";

const useStylesPickupEntry = makeStyles((theme) => ({
  setcontainer: {
    overflow: 'hidden',
    maxWidth: "100% !important",
    minHeight: "100vh",
    position: "relative",
    zIndex: 1,
    backgroundColor: "#f9fafc",
    paddingTop: "80px",
    paddingBottom: '30px !important',
  },
  setpageheading: {
    maxWidth: "100% !important",
    margin: "auto",
    display: "flex",
    justifyContent: "space-between",
  },
  setheading: {
    padding: "5px",
    margin: "0 !important",
    color: "#202223",
    fontWeight: "600 !important",
    fontSize: "35px !important",
    lineHeight: "32px",
    fontFamily: ["Poppins", "sans-serif", "!important"],
  },
  setProductpaper: {
    textAlign: "left",
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(3),
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    margin: "auto",
    maxWidth: "100% !important",
    borderRadius: "10px",
    marginTop: "30px",
  },
  // setinsidegrid:{
  //   display:'grid'
  // },
  setlabel: {
    fontFamily: ["Poppins", "sans-serif", "!important"],
    fontSize: "15px !important",
    lineHeight: "21px !important",
    marginRight: "10px !important",
    marginBottom: "2px !important",
    fontWeight: '600 !important' ,
  },
  settextfield:{
    '& .MuiInputBase-root':{
      fontFamily: ["Poppins", "sans-serif", "!important"],
    },    "&:hover": { boxShadow : `${theme.shadows[3]}`, border:0 },
  },
  setproductbtnsend: {
    fontWeight: '600 !important',
    height: '40px',
    marginTop: '21px',
    textTransform: "none",
    padding: "0px 15px",
    backgroundColor: "#3c8dbc",
    color: "white",
    "&:hover": { backgroundColor: "#3c8dbc !important" },
    [theme.breakpoints.down("xs")]: {
      marginTop: 0,
    },
  },
  setproductbtnfinalsend: {
    fontWeight: '600 !important',
    height: '40px',
    textTransform: "none",
    padding: "0px 15px",
    backgroundColor: "#3c8dbc",
    color: "white",
    "&:hover": { backgroundColor: "#3c8dbc !important" },
    [theme.breakpoints.down("xs")]: {
      marginTop: 0,
    },
  },
  setinputlayout: {
    display: "grid",
  },
  textField: {
    '& .MuiInputBase-root':{
      fontFamily: ["Poppins", "sans-serif", "!important"],
    }, 
    margin: "0 !important",
    "&:hover": { boxShadow : `${theme.shadows[3]}`, border:0 },
  },
  tableth:{
    padding:'8px !important',
    fontWeight: '600 !important',
    color:'#353535 !important',
    zIndex:'0 !important',
    fontFamily:["Poppins", "sans-serif", "!important"],
    '& .MuiTableCell-root':{
      backgroundColor:'#f9fafc !important'
    }
  },
  tabletd:{
    fontFamily:["Poppins", "sans-serif", "!important"],
    padding:'8px !important',
    color:'#202223 !important'
  },
  setdividerstyle:{
    marginTop:'10px !important'
  },
  setbtndiv:{
    display: 'flex',
    justifyContent: 'end'
  },
  settextarea:{
    margin: "0 !important",
    "&:hover": { boxShadow: `${theme.shadows[3]}`, borderColor:'#0000008a' },
    width:'100%',
    fontFamily:["Poppins", "sans-serif", "!important"],
    fontSize:'15px',
  },
  setfinsubmit:{
    marginTop:'20px !important',
    display:'flex',
    justifyContent:'space-between !important',
    alignItems: 'center !important',

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
  setcheckerrorlabel:{
    fontFamily: ["Poppins", "sans-serif", "!important"],
    fontSize: "15px !important",
    lineHeight: "21px !important",
    marginTop: "7px !important",
    marginRight: "10px",
    color: "#7f2121",
    fontWeight: "600 !important",
  },
  setdatepicker:{
    "&:hover": { boxShadow: `${theme.shadows[3]}`, border: 0 },
    width: '-webkit-fill-available !important',
    height: '33px !important',
    marginTop: '3px',
    "& .react-date-picker__calendar":{
        width: '350px !important',
        maxWidth: '-webkit-fill-available !important',
        // z-index: 1;
    },
  },
  setheader: {
    display: "flex",
    justifyContent: "space-between !important",
    alignItems: "center",
  },
  setmobileview: {
    display: "flex",
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  setproductbtndis: {
    fontWeight: "600 !important",
    textTransform: "none",
    padding: "0px 15px",
    height: "40px",
    marginTop: "6px",
    backgroundColor: "#3c8dbc",
    color: "white",
    marginRight: "10px !important",
    "&:hover": { backgroundColor: "#3c8dbc !important" },
  },
  setmovildisplay: {
    display: "none",
    [theme.breakpoints.down("sm")]: {
      display: "flex",
    },
  },
}))

export default useStylesPickupEntry;