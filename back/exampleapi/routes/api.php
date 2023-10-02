<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::group(['prefix' => 'auth'], function () {

    Route::get('test' , [AuthController::class,'index']);
    Route::post('signup' , [AuthController::class,'signup']);
    Route::post('login' , [AuthController::class,'login']);
    Route::get('logout' , [AuthController::class,'logout']);
    Route::get('user' , [AuthController::class,'user']);
    Route::get('Wallet_balance' , [AuthController::class,'Wallet_balance']);
    Route::post('add_seller' , [AuthController::class,'add_seller']);
    Route::put('/Edit_seller/{id}',[AuthController::class,'Edit_seller']);
    Route::delete('/Delete_seller/{id}',[AuthController::class,'Delete_seller']);

    Route::post('add_product' , [AuthController::class,'add_product']);
    Route::get('get_product/{sku}' , [AuthController::class,'get_product']);
    Route::post('/edit_product/{sku}',[AuthController::class,'edit_product']);
    Route::delete('/delete_Product/{sku}',[AuthController::class,'delete_Product']);

    Route::post('add_website' , [AuthController::class,'add_website']);
    Route::post('/edit_website/{id}',[AuthController::class,'edit_website']);
    Route::delete('/delete_website/{id}',[AuthController::class,'delete_website']);
    Route::get('get_website/{id}' , [AuthController::class,'get_website']);

    Route::post('add_courier' , [AuthController::class,'add_courier']);
    Route::post('/edit_courier/{id}',[AuthController::class,'edit_courier']);
    Route::delete('/delete_courier/{id}',[AuthController::class,'delete_courier']);
    Route::get('get_courier/{id}' , [AuthController::class,'get_courier']);

    Route::post('add_bank_detail' , [AuthController::class,'add_bankdetail']);
    Route::delete('/delete_bankdetail/{id}',[AuthController::class,'delete_bankdetail']);
    Route::post('/edit_bankdetail/{id}',[AuthController::class,'edit_bankdetail']);
    Route::get('get_bankdetail/{id}' , [AuthController::class,'get_bankdetail']);

    Route::get('all_list',[AuthController::class,'all_list']);

    Route::post('orderEntry' , [AuthController::class,'add_orderby_form']);

    Route::post('order_report' , [AuthController::class,'order_report']);
    Route::post('payment_receive_report' , [AuthController::class,'payment_receive_report']);
    Route::post('paymentdata' , [AuthController::class,'paymentdata']);
    Route::post('transaction_report' , [AuthController::class,'transaction_report']);

    Route::post('Pending_order' , [AuthController::class,'Pending_order']);
    Route::post('pickup_entry' , [AuthController::class,'pickup_entry']);
    Route::post('amount_receive' , [AuthController::class,'amount_receive']);
    Route::post('amount_receive_data' , [AuthController::class,'amount_receive_data']);

    Route::post('get_returndata' , [AuthController::class,'get_returndata']);
    Route::post('insert_returndata' , [AuthController::class,'insert_returndata']);
  
    Route::post('amazoneread' , [AuthController::class,'amazonefileread']);
    Route::post('insert_amazoneexcel' , [AuthController::class,'insert_amazoneexcel']);

    Route::post('flipcartread' , [AuthController::class,'flipcartread']);
    Route::post('insert_flipcartexcel' , [AuthController::class,'insert_flipcartexcel']);
   
    Route::post('meeshoread' , [AuthController::class,'meeshofileread']);
    Route::post('insert_meeshopdf' , [AuthController::class,'insert_meeshopdf']);

    Route::post('meesho_payment_update' , [AuthController::class,'meesho_payment_update_from_excel']);
    Route::post('change_password' , [AuthController::class,'change_password']);
});


/*Route::group([
    'prefix' => 'auth'
], function () {
    Route::post('login', 'AuthController@login');
    Route::post('signup', 'AuthController@signup');

    Route::group([
      'middleware' => 'auth:api'
    ], function() {
        Route::get('logout', 'AuthController@logout');
        Route::get('user', 'AuthController@user');
    });
    Route::get('/home', 'HomeController@index')->name('home');
});*/
