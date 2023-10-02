<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\OrderController;



use App\Http\Controllers\ClientController;
use App\Http\Controllers\SellerController;
use App\Http\Controllers\MailController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\WebsiteController;
use App\Http\Controllers\CourierController;
use App\Http\Controllers\BankController;
use App\Http\Controllers\ReportController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

/*Route::get('/', function () {
    return view('welcome');
});*/
Route::get('/', [UserController::class, 'index'])->name("login");
Route::get('login', [UserController::class, 'index']);
Route::post('post-login', [UserController::class, 'postlogin'])->name('login.post'); 
Route::get('theme', [UserController::class, 'theme']);

Route::get('logout', [UserController::class, 'logout'])->name('logout');

Route::get('productlist', [ProductController::class, 'productlist'])->name('productlist');
Route::get('addproduct', [ProductController::class, 'add_product'])->name('addproduct');
Route::post('getsku', [ProductController::class, 'getsku'])->name('getsku');
Route::post('insertproduct', [ProductController::class, 'insertproduct'])->name('insertproduct');
Route::get('deleteproduct/{sku}', [ProductController::class, 'deleteproduct'])->name('deleteproduct');
Route::get('fatchproduct/{sku}', [ProductController::class, 'fatchproduct'])->name('fatchproduct');
Route::post('updateproduct/{sku}', [ProductController::class, 'updateproduct'])->name('updateproduct');

Route::get('websitelist', [WebsiteController::class, 'websitelist'])->name('websitelist');
Route::post('insertwebsite', [WebsiteController::class, 'insertwebsite'])->name('insertwebsite');
Route::get('deletewebsite/{id}', [WebsiteController::class, 'deletewebsite'])->name('deletewebsite');
Route::get('fatchwebsite/{id}', [WebsiteController::class, 'fatchwebsite'])->name('fatchwebsite');
Route::post('updatewebsite/{id}', [WebsiteController::class, 'updatewebsite'])->name('updatewebsite');

Route::get('courierlist', [CourierController::class, 'courierlist'])->name('courierlist');
Route::post('insertcourier', [CourierController::class, 'insertcourier'])->name('insertcourier');
Route::get('deletecourier/{id}', [CourierController::class, 'deletecourier'])->name('deletecourier');
Route::get('fatchcourier/{id}', [CourierController::class, 'fatchcourier'])->name('fatchcourier');
Route::post('updatecourier/{id}', [CourierController::class, 'updatecourier'])->name('updatecourier');

Route::get('banklist', [BankController::class, 'banklist'])->name('banklist');
Route::post('insertbank', [BankController::class, 'insertbank'])->name('insertbank');
Route::get('deletebank/{id}', [bankController::class, 'deletebank'])->name('deletebank');
Route::get('fatchbank/{id}', [bankController::class, 'fatchbank'])->name('fatchbank');
Route::post('updatebank/{id}', [bankController::class, 'updatebank'])->name('updatebank');

Route::get('orderReport', [ReportController::class, 'orderReport'])->name('orderReport');
Route::post('post-orderReport', [ReportController::class, 'orderReportdata'])->name('orderReport.post'); 
Route::get('PaymentReceiveReport', [ReportController::class, 'PaymentReceiveReport'])->name('PaymentReceiveReport');
Route::post('post-PaymentReport', [ReportController::class, 'paymentreceivedata'])->name('PaymentReceiveReport.post'); 
Route::get('receive_payment_data/{website?}/{from_date?}/{to_date?}', [ReportController::class, 'paymentdata'])->name('receive_payment_data');
Route::get('TransactionReport', [ReportController::class, 'TransactionReport'])->name('TransactionReport');
Route::post('post-transactionReport', [ReportController::class, 'transactiondata'])->name('TransactionReport.post'); 

Route::get('orderEntry', [OrderController::class, 'orderentry'])->name('orderEntry');
Route::post('post-orderEntry', [OrderController::class, 'insert_orderentry'])->name('orderEntry.post');

Route::get('orderDetail', [OrderController::class, 'orderDetail'])->name('order_detail');
Route::post('post-orderDetail', [OrderController::class, 'getorder_detail'])->name('order_detail.post'); 

Route::get('Pickup_entry', [OrderController::class, 'Pickup_entry'])->name('Pickup_entry');
Route::post('get-pendingdata', [OrderController::class, 'get_pendingdata'])->name('get_pendingdata.post'); 
Route::post('insert_pickupdata', [OrderController::class, 'insert_pickupdata'])->name('insert_pickupdata.post'); 

Route::get('Payment_receive', [OrderController::class, 'Payment_receive'])->name('Payment_receive');
Route::post('getpaymentdata', [OrderController::class, 'getpaymentdata'])->name('getpaymentdata.post'); 
Route::post('insert_amountdata', [OrderController::class, 'insert_amountdata'])->name('insert_amountdata.post'); 


Route::get('Import_Flipcartexcel', [OrderController::class, 'Import_Flipcartexcel'])->name('Import_Flipcartexcel');
Route::post('import', [OrderController::class, 'import'])->name('import');
Route::post('insert_flipcartexcel', [OrderController::class, 'insert_flipcartexcel'])->name('insert_flipcartexcel.post');
Route::post('cancel_flipcartexcel', [OrderController::class, 'cancel_flipcartexcel'])->name('cancel_flipcartexcel.post');


Route::get('Import_amazoneexcel', [OrderController::class, 'Import_amazoneexcel'])->name('Import_amazoneexcel');
Route::post('import_amazone', [OrderController::class, 'import_amazone'])->name('import_amazone');
Route::post('insert_amazoneexcel', [OrderController::class, 'insert_amazoneexcel'])->name('insert_amazoneexcel.post');
Route::post('cancel_amazoneexcel', [OrderController::class, 'cancel_amazoneexcel'])->name('cancel_amazoneexcel.post');

Route::get('Import_meeshoexcel', [OrderController::class, 'Import_meeshoexcel'])->name('Import_meeshoexcel');
Route::post('import_meesho', [OrderController::class, 'import_meesho'])->name('import_meesho');
Route::post('insert_meeshoexcel', [OrderController::class, 'insert_meeshoexcel'])->name('insert_meeshoexcel.post'); 
Route::post('cancel_meeshoexcel', [OrderController::class, 'cancel_meeshoexcel'])->name('cancel_meeshoexcel.post');








Route::get('user', [UserController::class, 'signup']);
Route::post('post-signup', [UserController::class, 'postsignup'])->name('signup.post'); 
Route::get('dashboard', [UserController::class, 'dashboard']);

Route::get('add-client', [ClientController::class, 'add_client'])->name('Addclient');
Route::post('post-client', [ClientController::class, 'post_client'])->name('client.post'); 
Route::get('edit-client/{client_id}', [ClientController::class, 'Edit_client'])->name('client.edit');
Route::get('delete-client/{client_id}', [ClientController::class, 'Delete_client'])->name('client.delete');  

Route::get('add-seller', [SellerController::class, 'add_seller'])->name('Addseller');
Route::post('post-seller', [SellerController::class, 'post_seller'])->name('seller.post'); 
Route::get('edit-seller/{id}', [SellerController::class, 'Edit_seller'])->name('seller.edit');
Route::get('delete-seller/{id}', [SellerController::class, 'Delete_seller'])->name('seller.delete'); 

Route::get('send-email',[MailController::class,'sendEmail']);

Route::get('generate-pdf', [SellerController::class, 'generatePDF']);

Route::get('add-product', [ProductController::class, 'add_product'])->name('Addproduct');