import { makeStyles } from "@material-ui/styles";

const useStylesOrder = makeStyles((theme) => ({
  setcontainer: {
    maxWidth: "100% !important",
    minHeight: "100vh",
    position: "relative",
    overflow: 'hidden',
    zIndex: 1,
    backgroundColor: "#f9fafc",
    paddingTop: "80px",
    paddingBottom: "30px",
  },
  setheader: {
    display: "flex",
    justifyContent: "space-between !important",
    alignItems: "center",
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
      padding: "5px",
      margin: "0 !important",
      color: "#202223",
      fontWeight: "600 !important",
      fontSize: "20px !important",
      lineHeight: "20px",
      fontFamily: ["Poppins", "sans-serif", "!important"],
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
  setProductpaper: {
    textAlign: "left",
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(2),
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    margin: "auto",
    maxWidth: "100% !important",
    borderRadius: "10px",
    marginTop: "30px",
  },
  setProductpaperdupliacte: {
    textAlign: "left",
    backgroundColor: theme.palette.background.paper,
    // padding: theme.spacing(2),
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    borderTop: "2px solid #7f2121",
    margin: "auto",
    maxWidth: "100% !important",
    borderRadius: "10px",
    marginTop: "30px",
  },
  setduplicatedatadiv:{
    backgroundColor: "#7f212117",

  },
  setinsidepaper: {
    textAlign: "left",
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(2),
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    // margin: "auto",
    maxWidth: "100% !important",
    borderRadius: "10px",
  },
  setGridcard: {
    columnSpacing: 3,
    [theme.breakpoints.down("xs")]: {
      columnSpacing: 1,
    },
  },
  setonegried: {
    padding: theme.spacing(1),
    [theme.breakpoints.up("sm")]: {
      padding: theme.spacing(1),
    },
  },
  setlabel: {
    fontFamily: ["Poppins", "sans-serif", "!important"],
    fontSize: "15px !important",
    lineHeight: "21px !important",
    marginRight: "10px !important",
    marginBottom: "2px !important",
    fontWeight: "600 !important",
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
  setinsidegrid: {
    display: "grid",
  },
  setinputlayoutforbtn: {
    display: "flex !important",
    justifyContent: "flex-end !important",
    [theme.breakpoints.down("xs")]: {
      display: "flex !important",
      justifyContent: "flex-start !important",
    },
  },
  setinputlayoutforodrbtn: {
    display: "flex !important",
    justifyContent: "flex-start !important",
  },

  setproductbtnsend: {
    fontWeight: 600,
    height: "40px",
    marginTop: "22px",
    textTransform: "none",
    marginLeft:"5px !important",
    padding: "0px 15px",
    backgroundColor: "#3c8dbc",
    color: "white",
    "&:hover": { backgroundColor: "#3c8dbc !important" },
    [theme.breakpoints.down("xs")]: {
      marginTop: 0,
    },
    [theme.breakpoints.down("sm")]: {
      marginTop: "15px",
    },
  },
  setproductbtnsenddown: {
    fontWeight: 600,
    height: "40px",
    marginTop: "22px",
    textTransform: "none",
    padding: "0px 15px",
    backgroundColor: "#3c8dbc",
    color: "white",
    "&:hover": { backgroundColor: "#3c8dbc !important" },
    [theme.breakpoints.down("xs")]: {
      marginTop: 0,
    },
    [theme.breakpoints.down("sm")]: {
      marginTop: "15px",
    },
  },
  setbtndownpdf:{
    fontWeight: 600,
    height: "40px",
    marginTop: "22px",
    marginLeft:'11px !important',
    marginRight:'10px !important',
    textTransform: "none",
    padding: "0px 15px",
    backgroundColor: "#3c8dbc",
    color: "white",
    "&:hover": { backgroundColor: "#3c8dbc !important" },
    [theme.breakpoints.down("xs")]: {
      marginTop: 0,
    },
    [theme.breakpoints.down("sm")]: {
      marginTop: "15px",
    },
  },
  setproductbtnsendremove: {
    fontWeight: 600,
    height: "40px",
    marginTop: "15px",
    marginRight: "10px !important",
    textTransform: "none",
    padding: "0px 15px",
    backgroundColor: "#3c8dbc",
    color: "white",
    "&:hover": { backgroundColor: "#3c8dbc !important" },
  },
  setbtngrid: {
    [theme.breakpoints.down("sm")]: {
      display: "flex",
      justifyContent: "flex-end",
    },
  },
  setproductbtnsendspecific: {
    fontWeight: 600,
    height: "40px",
    marginTop: "22px",
    textTransform: "none",
    padding: "0px 15px",
    backgroundColor: "#3c8dbc",
    color: "white",
    "&:hover": { backgroundColor: "#3c8dbc !important" },
    [theme.breakpoints.down("xs")]: {
      marginTop: 0,
    },
  },
  setmoreicon: {
    color: "black",
  },
  setavtarback: {
    backgroundColor: "transparent !important",
    // marginLeft: "5px",
    marginTop:'16px !important',
    border: "1px solid #202223",
  },
  setavtarbackexport: {
    backgroundColor: "transparent !important",
    marginTop:'22px !important',
    width:'30px !important',
    marginLeft:"5px !important",
    // border: "1px solid #202223",
    [theme.breakpoints.down("sm")]: {
      marginTop: "15px !important",
    },
  },
  textField: {
    margin: "0 !important",
    "&:hover": { boxShadow: `${theme.shadows[3]}`, border: 0 },
  },
  textFieldselect: {
    margin: "0 !important",
    "&:hover": { boxShadow: `${theme.shadows[3]}`, borderColor:'#0000008a !important' },
  },
  setfiltericon: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: 'center',

  },
  setlistfiltericon:{
    display: "flex",
    justifyContent: "flex-end",
    // alignItems:'center'
  },
  settextfield: {
    '& .MuiInputBase-root':{
      fontFamily: ["Poppins", "sans-serif", "!important"],
    },
    "&:hover": { boxShadow: `${theme.shadows[3]}`, border: 0 },
  },
  tableth: {
    padding: "8px !important",
    fontWeight: "600 !important",
    color: "#353535 !important",
        zIndex:"0 !important",

    fontFamily: ["Poppins", "sans-serif", "!important"],
  },
  tablethList: {
    padding: "8px !important",
    fontWeight: "600 !important",
    color: "#353535 !important",
    zIndex:"0 !important",
    fontFamily: ["Poppins", "sans-serif", "!important"],
  },
  tabletd: {
    fontFamily: ["Poppins", "sans-serif", "!important"],
    padding: "8px !important",
    color: "#202223 !important",
  },
  setcardbgcolor: {
    backgroundColor: "#f9fafc !important",
  },
  setdisplaygrid: {
    display: "flex",
    alignItems: 'baseline',

  },
  setheadingwidth: {
    width: "150px",
    [theme.breakpoints.down("xs")]: {
      fontSize: '18px !important',
      width: "130px",
    },
  },
  seticon:{
    fontSize: 'x-large !important'

  },
  setaddproheaderarrow: {
    border: "1px solid #202223",
    backgroundColor: "transparent !important",
    marginTop: "6px !important",
    marginRight: "20px",
    marginLeft: "4px",
  },
  setpageheading: {
    width: "100%",
    margin: "auto",
    display: "flex",
    justifyContent: "space-between",
  },
  setbtndiv: {
    display: "flex",
    justifyContent: "flex-end",
  },
  setmovildisplay: {
    display: "none",
    [theme.breakpoints.down("sm")]: {
      display: "flex",
    },
  },
  setmobileview: {
    display: "flex",
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  setHeadinglabel: {
    fontFamily: ["Poppins", "sans-serif", "!important"],
    fontSize: "24px !important",
    lineHeight: "21px !important",
    marginRight: "10px !important",
    marginBottom: "11px !important",
    fontWeight: "600 !important",
  },
  setproductbtndisformob: {
    fontWeight: "600 !important",
    textTransform: "none",
    height: "40px",
    backgroundColor: "#3c8dbc",
    color: "white",
    width: "-webkit-fill-available !important",
    // marginRight:'10px !important',
    "&:hover": { backgroundColor: "#3c8dbc !important" },
  },
  seterrorlabel: {
    fontFamily: ["Poppins", "sans-serif", "!important"],
    fontSize: "15px !important",
    lineHeight: "21px !important",
    marginTop: "7px !important",
    marginRight: "10px",
    color: "#7f2121",
    fontWeight: "600 !important",
  },
  seterrorlabelduplicate: {
    fontFamily: ["Poppins", "sans-serif", "!important"],
    fontSize: "15px !important",
    lineHeight: "21px !important",
    marginBottom: "8px !important",
    paddingLeft: "15px !important",
    paddingTop: "8px !important",
    color: "#7f2121",
    fontWeight: "600 !important",
  },
  settypo: {
    fontFamily: ["Poppins", "sans-serif", "!important"],
    fontSize: "15px !important",
    color: "#202223 !important",
  },
  setendbtn: {
    display: "flex",
    justifyContent: "space-between",
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
  setpaginations:{
    '&.MuiPagination-outlined':{
      size:"small"
    }
  },
  setdividerstyle:{
    marginTop:'10px !important'
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
      // marginTop:"3px !important",
      border: '1px solid #bfbcbc'

    },
    // "& .react-date-picker__wrapper :hover":{
    //   boxShadow: `${theme.shadows[3]}`, border: '1px solid black' 
    // }
    
    },
    setdatepicker1:{
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
}));

export default useStylesOrder;
