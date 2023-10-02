<?php

namespace App\Imports;

use App\Models\OrderEntry;
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\WithHeadingRow;
use Illuminate\Support\Facades\Auth;
use App\Models\Product;
use Illuminate\Support\Facades\Validator;
use Maatwebsite\Excel\Concerns\ToCollection;
use Maatwebsite\Excel\Concerns\WithValidation;
use Illuminate\Support\Collection;

use Maatwebsite\Excel\Concerns\WithMultipleSheets;

class OrderImportexcel implements WithMultipleSheets 
{
    /**
    * @param array $row
    *
    * @return \Illuminate\Database\Eloquent\Model|null
    */
    

    // public function collection(Collection $rows)
    // {

       // return $rows;
        //print_r($rows);
        /*foreach($rows as $row){
            

                $data[]=[
                    'order_id' => $row['order_id'],
                    'qty' => $row['quantity'],
                    'awb_no' => $row['tracking_id'],
                    'order_amount'=>$row['invoice_amount'],
                    'website_id' => 3,
                    'sku' => $product[0]['id'],
                    'upload_date' => date('Y-m-d',strtotime(date_format(date_create($row['ordered_on']),"Y-m-d"))),
                    'order_status' => 1,
                    'upload_type' => 'Excel',
                    'user_id' => Auth::user()->id
                ];
            
        }
                return $data;*/
    //}

    
   public function sheets(): array
{
    return [
        'Orders' => new OrderImportexcel(),
    ];
}

   
}
