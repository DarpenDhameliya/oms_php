import { createTheme } from "@material-ui/core";

export let theme = createTheme({
  palette: {
    primary: {
      // main: indigo[600],
      main: "#3c8dbc",
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 992,
      lg: 1280,
      xl: 1920,
    },
  },
  typography: {
    fontFamily: ["Poppins", "sans-serif"].join(","),

    h5: {
      fontFamily: ["Poppins", "sans-serif"],
      fontWeight:400,
      fontSize:'1.5rem',
      lineHeight:'1.334',
      letterSpacing:'0em'
    },
    h4:{
      fontFamily: ["Poppins", "sans-serif"],
    },
    h2:{
      fontFamily: ["Poppins", "sans-serif"],
    }
  },

  // overrides:{
  //   MuiCssBaseline:{
  //     '@global':{
  //       '::-webkit-scrollbar': {
  //         width: '2px',
  //       },
        
  //       /* Track */
  //       '::-webkit-scrollbar-track': {
  //         background: '#f1f1f1',
  //       },
        
  //       /* Handle */
  //       '::-webkit-scrollbar-thumb': {
  //         background: 'white',
  //       },
        
  //       /* Handle on hover */
  //       '::-webkit-scrollbar-thumb:hover': {
  //         background: '#555',
  //       },
  //     }
  //   }
  // }
});
