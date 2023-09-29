import { makeStyles } from "@material-ui/styles";

const useStylesPaymentRecieve = makeStyles((theme) => ({
  setcontainer: {
    maxWidth: "100% !important",
    minHeight: "100vh",
    position: "relative",
    zIndex: 1,
    backgroundColor: "#f9fafc",
    paddingTop: "80px !important",
    paddingBottom:'30px !important',
    overflow: 'hidden',

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
    [theme.breakpoints.down("xs")]: {
      fontSize: "22px !important",
    },
    [theme.breakpoints.between('sm', 'md')]: {
      fontSize: "30px !important",
    },
  },
  setProductpaper: {
    textAlign: "left",
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(3),
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    maxWidth: "auto",
    width: "100% !important",
    borderRadius: "10px",
    marginTop: "30px",
  },
  setProductpaperview: {
    textAlign: "left",
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(1),
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    margin: "auto",
    width: "100% !important",
    borderRadius: "10px",
    marginTop: "30px",
  },

  setaccordionsummry:{
    padding:'0 !important',
    '& .MuiAccordionSummary-content':{
      margin:'0px !importantb',
    }
  },
  sethidedata:{
    '& .MuiAccordionDetails-root':{
      padding:'0px 16px !important'
    }
  },
  setinsidegrid:{
    display:'grid'
  },
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
  textField: {
    margin: "0 !important",
    "&:hover": { boxShadow: `${theme.shadows[3]}`, border: 0 },
  },
  setproductbtnsend: {
    fontWeight: 600,
    height: '40px',
marginTop: '21px',
    textTransform: "none",
    marginLeft:'5px !important',
    padding: "0px 15px",
    backgroundColor: "#3c8dbc",
    color: "white",
    "&:hover": { backgroundColor: "#3c8dbc !important" },
    [theme.breakpoints.down("xs")]: {
      marginTop: '15px',
    },
    [theme.breakpoints.between("xs","sm")]: {
      marginTop: '15px',
    },
  },
  tableth:{
    padding:'8px !important',
    fontWeight: '600 !important',
    color:'#353535 !important',
    fontFamily:["Poppins", "sans-serif", "!important"],
    zIndex:'0 !important'
  },
  tabletd:{
    fontFamily:["Poppins", "sans-serif", "!important"],
    padding:'5px !important',
    // padding: '5px 0px !important',
    color:'#202223 !important'
  },
  settypo: {
    fontFamily: ["Poppins", "sans-serif", "!important"],
    fontSize: "15px !important",
    color: "#202223 !important",
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
  setavtarbackexport: {
    backgroundColor: "transparent !important",
    marginTop:'22px !important',
    width:"30px !important",
    marginLeft:"5px !important",
    // border: "1px solid #202223",
    [theme.breakpoints.down("sm")]: {
      marginTop: "15px !important",
    },
  },
  setavtarbackexportfile: {
    backgroundColor: "transparent !important",
    marginTop:'22px !important',
    width:'30px !important',
    marginLeft:"5px !important",
    // border: "1px solid #202223",
    [theme.breakpoints.down("sm")]: {
      marginTop: "15px !important",
    },
  },
  setinputlayoutforbtn: {
    display: "flex !important",
    justifyContent: "flex-end !important",
    [theme.breakpoints.down("xs")]: {
      display: "flex !important",
      justifyContent: "flex-end !important",
    },
    [theme.breakpoints.between("xs","sm")]: {
      justifyContent: "flex-start !important",
    },
  },
  setpaginationdiv:{
    display: "flex",
    justifyContent: "space-between",
    marginTop:'7px !important',
    alignItems: 'center',

  },
  setrowperpage:{
    display: "flex",
    justifyContent: "start",
    alignItems: 'center',
  },
  setlabelrow: {
    fontFamily: ["Poppins", "sans-serif", "!important"],
    fontSize: "15px !important",
    lineHeight: "21px !important",
    marginRight: "10px !important",
    marginBottom: "2px !important",
    fontWeight: "600 !important",
    minWidth:"122px !important"
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
  setdatepicker:{
    "&:hover": { boxShadow: `${theme.shadows[3]}`, border: '1px solid black' },

  "& .react-date-picker__calendar":{
      width: '350px !important',
      maxWidth: '-webkit-fill-available !important',
      // z-index: 1;
    },
    "& .react-date-picker__wrapper":{
      height:'35px !important',
      border: '1px solid #bfbcbc'
  }
  }
}))

export default useStylesPaymentRecieve;