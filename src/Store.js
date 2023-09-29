import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import  formReducer  from "./component/header&sidebar/slice//AppReducer";
import userReducer from './component/authenticate/slice/LoginRedux'
import listReducer from './component/commonLink/ListApi'
import addproductReducer from './component/masterpage/Product/slice/AddProductSlice'
import sidebardataReducer from "./component/header&sidebar/slice/SidebarDataReducer";
import deleteproductReducer from "./component/masterpage/Product/slice/DeleteProductSlice"
import editproductdataReducer from './component/masterpage/Product/slice/EditProductdata'
import finaleditproductReducer from './component/masterpage/Product/slice/FinalEditProduct'
import addwebsiteReducer from './component/masterpage/website/Slice/WebsiteAddSlice'
import editwebsiteReducer from './component/masterpage/website/Slice/WebsiteEditSlice'
import addcourierReducer from './component/masterpage/courier/Slice/CourierAddSlice'
import editcourierReducer from './component/masterpage/courier/Slice/CourierEditSlice'
import deletecourierReducer from './component/masterpage/courier/Slice/CourierDelSlice'
import deletewebsiteReducer from './component/masterpage/website/Slice/WebsiteDelSlice'
import addbankReducer from './component/masterpage/bank/slice/AddBankSlice'
import editbankReducer from './component/masterpage/bank/slice/EditBankSlice'
import deletebankReducer from './component/masterpage/bank/slice/DeleteBankSlice'
import manualaddReducer from './component/order/orderEntryPage/slice/ManualAddSlice'
import spacificodrReducer from './component/order/slice/SpecificOdrSlice'
import pickupReducer from './component/pickup/slice/PickupAwbSlice'
import pickupcheckReducer from './component/pickup/slice/PickupChecked'
import orderlistReduxer from './component/order/slice/OrderListSlice'
import pickupuncheckReducer from './component/pickup/slice/PickupUncheckdata'
import paymentreceiveReducer from './component/payment_Receive/pages/Slice/PaymentReceiveSlice'
import paymentsubmitReducer from './component/payment_Receive/pages/Slice/PaymentcheckedSlice'
import paymentuncheckReducer from './component/payment_Receive/pages/Slice/PaymentUncheckSlice'
import amazonReducer from './component/order/orderEntryPage/slice/AmazonSlice'
import paymentreportReducer from './component/PaymentRecieveReport/Slice/PaymentReoportSlice'
import flipcartReducer from './component/order/orderEntryPage/slice/FlipcartSlice'
import messhoReducer from './component/order/orderEntryPage/slice/MesshoSlice'
import amazonsenddataReducer from "./component/order/orderEntryPage/slice/AmazondatasendSlice";
import messhosenddataReducer from "./component/order/orderEntryPage/slice/MesshodatasendSlice";
import flipcartsenddataReducer from './component/order/orderEntryPage/slice/FlipcartsenddataSlice'
import paymentreportfulldataReducer from './component/PaymentRecieveReport/Slice/PaymentReportFulldata'
import transactionReducer from './component/Transectionreport/slice/TransactionSlice'
import orderlistpaginationReducer from './component/order/slice/OrderListPagination'
import paymentreceivepaginationReducer from './component/order/slice/PaymentReceivePagination'
import transactionpaginationReducer from './component/Transectionreport/slice/TransactionPagination'
import orderlistdataReducer from './component/order/slice/OrderData'
import transactiondataReducer from './component/Transectionreport/slice/TransactionData'
import paymentpaginationReducer from './component/PaymentRecieveReport/Slice/PaymentPagination'
import paginationdataReducer from './component/PaymentRecieveReport/Slice/Paymentdata'
import filedownloadReducer from './component/order/slice/FileDownload'
import exportReducer from './component/Transectionreport/slice/Export'
import orderreturnfetchReducer from './component/order/slice/OrderReturnfetchSlice'
import orderreturnsendReducer from './component/order/slice/OrderReturnSend'
import orderreturnuncheckReducer from './component/order/slice/OrderReturnUncheck'
import walletballenceReducer from './component/header&sidebar/slice/WalletBallenceSlice'
import neterrReducer from './component/commonLink/NetErr'
import profileReducer from './component/authenticate/slice/ProfileSlice'
import userdataReducer from "./component/authenticate/slice/UserData"
import messhoreadpaymentReduce from  './component/payment_Receive/pages/Slice/MesshoRead'
import messhopaymentsendRedux from './component/payment_Receive/pages/Slice/MesshoSend'
import flipcartpaymentsendReducer from './component/payment_Receive/pages/Slice/FlipcartSend'
import flipcartpaymentreadReducer from './component/payment_Receive/pages/Slice/FlipcartRead'
import amazonpaymentreadReducer from './component/payment_Receive/pages/Slice/Amazonread'
import amazonpaymentsendReducer from './component/payment_Receive/pages/Slice/AmazonSend'

export const store = configureStore({
  reducer: {
   form:formReducer,
   login:userReducer,
   productList:listReducer,
   addproduct:addproductReducer,
   sidebardata: sidebardataReducer,
   deleteproduct:deleteproductReducer,
   editproduct:editproductdataReducer,
   addwebsite:addwebsiteReducer,
   editwebsite:editwebsiteReducer,
   deletewebsite:deletewebsiteReducer,
   addcourier:addcourierReducer,
   editcoirier:editcourierReducer,
   deletecoirier:deletecourierReducer,
   addbank:addbankReducer,
   editbank:editbankReducer,
   deletebank:deletebankReducer,
   manualadd:manualaddReducer,
   spacificodr:spacificodrReducer,
   pickup: pickupReducer,
   pickupcheck:pickupcheckReducer,
   orderlist:orderlistReduxer,
   finaleditproduct:finaleditproductReducer,
   pickupuncheck:pickupuncheckReducer,
   paymentreceive:paymentreceiveReducer,
  paymentsubmit:paymentsubmitReducer,
   paymentuncheck:paymentuncheckReducer,
   paymentreport:paymentreportReducer,
   amazon:amazonReducer,
   flipcart:flipcartReducer,
   messho:messhoReducer,
   amazonsenddata:amazonsenddataReducer,
   messhosenddata:messhosenddataReducer,
   flipcartsenddata:flipcartsenddataReducer,
   paymentreportfulldata:paymentreportfulldataReducer,
   transaction:transactionReducer,
   orderlistpagination:orderlistpaginationReducer,
   paymentreceivepagination:paymentreceivepaginationReducer,
   transactionpagination:transactionpaginationReducer,
   orderlistdata:orderlistdataReducer,
   transactiondata:transactiondataReducer,
   paymentpagination:paymentpaginationReducer,
   paginationdata:paginationdataReducer,
   filedownload:filedownloadReducer,
   export:exportReducer,
   orderreturnfetch:orderreturnfetchReducer,
   orderreturnsend:orderreturnsendReducer,
   orderreturnuncheck:orderreturnuncheckReducer,
   walletballence:walletballenceReducer,
   neterr:neterrReducer,
   profile:profileReducer,
   userdata:userdataReducer,
   messhoreadpayment: messhoreadpaymentReduce,
   messhopaymentsend:messhopaymentsendRedux,
   flipcartpaymentsend:flipcartpaymentsendReducer,
   flipcartpaymentread: flipcartpaymentreadReducer,
   amazonpaymentread:amazonpaymentreadReducer,
   amazonpaymentsend:amazonpaymentsendReducer
  },
  middleware: getDefaultMiddleware({
    serializableCheck: false,
  }),
});