import React, { useState, useEffect } from "react";
import useStylesPaymentRecieve from "./PaymentRecieveStyle";
import Collapse from "@mui/material/Collapse";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import IconButton from "@mui/material/IconButton";
import { useDispatch, useSelector } from "react-redux";
import { orderType, orderStatus } from "../commonLink/OrderList";
// import TablePagination from "@mui/material/TablePagination";
import { Typography } from "@mui/material";

import {
  PaymentReportFulldataSlice,
  Paymentreportfulldatastate,
  Paymentreportfulldatastatus,
} from "./Slice/PaymentReportFulldata";
function PaymentReciveRecord(props) {
  const classes = useStylesPaymentRecieve();
  const [open, setOpen] = useState(false);
  const [hidePaymentRecord, setHidePaymentRecord] = useState([]);
  const [index, setIndex] = useState([])
  const dispatch = useDispatch();
  const hidedata = useSelector(Paymentreportfulldatastate);

  useEffect(() => {
    setIndex(props.index)
    console.log(props)
  });
  // console.log(index)

  const handleopenreport = (index , event ) => {
    console.log('open',index)
     setOpen(open === index ? false : index)
    setOpen(!open)
    if(!open) {
      dispatch(
        PaymentReportFulldataSlice({
          from_date: props.fromdate,
          to_date: props.todate,
          // website_id: webid,
        })
      );
    }

  };

  useEffect(() => {
    if (hidedata.status === "loading") {
    } else if (hidedata.status === "succeeded") {
      console.log(hidedata);
      setHidePaymentRecord(hidedata.response.data);
      dispatch(Paymentreportfulldatastatus());
    } else if (hidedata.status === "failed") {
      // console.log(hidedata);
      dispatch(Paymentreportfulldatastatus());
    } else {
    }
  },[hidedata.status === "loading" , hidedata.status === "succeeded" , hidedata.status === "failed"]);
  return (
    <>
      <TableRow>
        <TableCell align="center" className={classes.tabletd}>
          {props.website}{" "}
        </TableCell>
        <TableCell align="center" className={classes.tabletd}>
          {props.amount.receive_amount}
        </TableCell>
        <TableCell align="center">
          <IconButton
            aria-label="expand row"
            size="small"
            // id={props.index}
            onClick={() => handleopenreport( index)}
          >
            <RemoveRedEyeIcon />
          </IconButton>
        </TableCell>
      </TableRow>

      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          {/* <Collapse in={open} timeout="auto" unmountOnExit={true}> */}
          <Collapse in={open === index}  timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Table stickyHeader className={classes.settable}>
                <TableHead>
                  <TableRow>
                    <TableCell align="center" className={classes.tableth}>
                      Product
                    </TableCell>
                    <TableCell align="center" className={classes.tableth}>
                      Order Id
                    </TableCell>
                    <TableCell align="center" className={classes.tableth}>
                      AWB No
                    </TableCell>
                    <TableCell align="center" className={classes.tableth}>
                      Order Status
                    </TableCell>
                    <TableCell align="center" className={classes.tableth}>
                      Order TYpe
                    </TableCell>
                    <TableCell align="center" className={classes.tableth}>
                      Website
                    </TableCell>
                    <TableCell align="center" className={classes.tableth}>
                      Courier
                    </TableCell>
                    <TableCell align="center" className={classes.tableth}>
                      Qty
                    </TableCell>
                    <TableCell align="center" className={classes.tableth}>
                      Order Amount
                    </TableCell>
                    <TableCell align="center" className={classes.tableth}>
                      Payment Status
                    </TableCell>
                    <TableCell align="center" className={classes.tableth}>
                      Receive Amount
                    </TableCell>
                    <TableCell align="center" className={classes.tableth}>
                      Order Amount
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {hidePaymentRecord.map((e , index) => {
                    console.log(e)
                    return (
                      <TableRow>
                        <TableCell scope="row" align="center" className={classes.tabletd}>
                          {e.product_name}
                        </TableCell>
                        <TableCell className={classes.tabletd} align="center">
                          {e.order_id}
                        </TableCell>
                        <TableCell className={classes.tabletd} align="center">
                          {e.awb_no}
                        </TableCell>
                        <TableCell className={classes.tabletd} align="center">
                          {orderStatus.map((or) => {
                            if (e.order_status == or.value) {
                              return (
                                <Typography
                                  key={index}
                                  className={classes.settypo}
                                >
                                  {or.label}
                                </Typography>
                              );
                            }
                          })}
                        </TableCell>
                        <TableCell className={classes.tabletd} align="center">
                          {/* {e.order_type} */}
                          {orderType.map((ea, index) => {
                          if (ea.value == e.order_type) {
                            return (
                              <Typography
                                key={index}
                                className={classes.settypo}
                              >
                                {ea.label}
                              </Typography>
                            );
                          }
                        })}
                        </TableCell>
                        <TableCell className={classes.tabletd} align="center">
                          {e.name}
                        </TableCell>
                        <TableCell className={classes.tabletd} align="center">
                          {e.courier_name}
                        </TableCell>
                        <TableCell className={classes.tabletd} align="center">
                          {e.qty}
                        </TableCell>
                        <TableCell className={classes.tabletd} align="center">
                          {e.order_amount}
                        </TableCell>
                        <TableCell className={classes.tabletd} align="center">
                          {e.receive_amount ? "Receive" : ""}
                        </TableCell>
                        <TableCell className={classes.tabletd} align="center">
                          {e.receive_amount}
                        </TableCell>
                        <TableCell className={classes.tabletd} align="center">
                          {e.amountreceive_date}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>

              {/* <TablePagination
                  rowsPerPageOptions={[]}
                  component="div"
                  count={props.forpagination.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                /> */}
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}

export default PaymentReciveRecord;
