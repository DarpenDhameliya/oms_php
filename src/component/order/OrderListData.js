import React from "react";
import useStylesOrder from "./OrderStyle";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import { styled } from "@mui/material/styles";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableContainer from "@mui/material/TableContainer";
import { orderStatus, orderType } from "../commonLink/OrderList";
import { Typography } from "@mui/material";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

function OrderListData(props) {
  const classes = useStylesOrder();

  return (
    <>
      <TableContainer>
        <Table stickyHeader className={classes.settable}>
          <TableHead>
            <TableRow>
              <TableCell align="center" className={classes.tablethList}>
                No.
              </TableCell>
              <TableCell
                align="center"
                className={classes.tablethList}
                style={{ minWidth: "140px" }}
              >
                Product Name
              </TableCell>
              <TableCell align="center" className={classes.tablethList}>
                Order Id
              </TableCell>
              <TableCell align="center" className={classes.tablethList}>
                AwB No
              </TableCell>
              <TableCell align="center" className={classes.tablethList}>
                Order Status
              </TableCell>
              <TableCell align="center" className={classes.tablethList}>
                Order Type
              </TableCell>
              <TableCell align="center" className={classes.tablethList}>
                website
              </TableCell>
              <TableCell align="center" className={classes.tablethList}>
                Courier
              </TableCell>
              <TableCell align="center" className={classes.tablethList}>
                Qty
              </TableCell>
              <TableCell align="center" className={classes.tablethList}>
                Order Amount
              </TableCell>
              <TableCell align="center" className={classes.tablethList}>
                Payment Status
              </TableCell>
              <TableCell align="center" className={classes.tablethList}>
                Receive Amount
              </TableCell>
              <TableCell align="center" className={classes.tablethList}>
                Receive Date
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.data.map((e, index) => {
              return (
                <StyledTableRow key={e.order_id}>
                  <StyledTableCell align="center" className={classes.tabletd}>
                    {props.pageonpagination === 1 ? index + 1  : (props.rowperpage * props.pageonpagination) + index -props.rowperpage +1}
                    {/* {index +1 } */}
                  </StyledTableCell>
                  <StyledTableCell align="center" className={classes.tabletd}>
                    {e.product_name}
                  </StyledTableCell>
                  <StyledTableCell className={classes.tabletd} align="center">
                    {e.order_id}
                  </StyledTableCell>
                  <StyledTableCell className={classes.tabletd} align="center">
                    {e.awb_no}
                  </StyledTableCell>
                  <StyledTableCell className={classes.tabletd} align="center">
                    {orderStatus.map((ea) => {
                      if (ea.value == e.order_status) {
                        return (
                          <Typography className={classes.settypo}>
                            {ea.label}
                          </Typography>
                        );
                      }
                    })}
                  </StyledTableCell>
                  <StyledTableCell className={classes.tabletd} align="center">
                    {/* {e.order_type} */}
                    {orderType.map((ea, index) => {
                      if (ea.value == e.order_type) {
                        return (
                          <Typography key={index} className={classes.settypo}>
                            {ea.label}
                          </Typography>
                        );
                      }
                    })}
                  </StyledTableCell>
                  <StyledTableCell className={classes.tabletd} align="center">
                    {e.website_name}
                  </StyledTableCell>
                  <StyledTableCell className={classes.tabletd} align="center">
                    {e.courier_name}
                  </StyledTableCell>
                  <StyledTableCell className={classes.tabletd} align="center">
                    {e.qty}
                  </StyledTableCell>
                  <StyledTableCell className={classes.tabletd} align="center">
                    {e.order_amount}
                  </StyledTableCell>
                  <StyledTableCell className={classes.tabletd} align="center">
                    {e.amountreceive_date ? 'Receive' : ''}
                  </StyledTableCell>
                  <StyledTableCell className={classes.tabletd} align="center">
                    {e.receive_amount}
                  </StyledTableCell>
                  <StyledTableCell className={classes.tabletd} align="center">
                    {e.amountreceive_date}
                  </StyledTableCell>
                </StyledTableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default OrderListData;
    //     from_date: dataslice.response.payload.from_date,
    //     to_date: dataslice.response.payload.to_date,
    //     order_status: dataslice.response.payload.order_status,
    //     courier_id: dataslice.response.payload.courier_id,
    //     product_id: dataslice.response.payload.product_id,
    //     website_id: dataslice.response.payload.website_id,
    //     order_type: dataslice.response.payload.order_type,
    //     order_id: dataslice.response.payload.order_id,
    //     per_page:onPage