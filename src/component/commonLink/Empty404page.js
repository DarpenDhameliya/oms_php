import React from 'react'
import Container from "@mui/material/Container";
import useStylesOrder from '../order/OrderStyle';

const Empty404page = () => {
  const classes = useStylesOrder()
  return (
    <Container
        component="main"
        maxWidth="xl"
        className={classes.setcontainer}
      >
    <div>Empty404page</div>
      </Container>
  )
}

export default Empty404page