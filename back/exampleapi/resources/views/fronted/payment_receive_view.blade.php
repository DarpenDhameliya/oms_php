@include('layout.header')


<section class="content-header">
  <div class="container-fluid">
    <div class="row mb-2">
      <div class="col-sm-6">
        <h1>Payment Receive Report</h1>
      </div>
    </div>
  </div>
</section>

<section class="content">
    <div class="container-fluid">
      <div class="card">
        <div class="card-header">
          <h3 class="card-title">Order Report</h3>
        </div>
        <div class="card-body">
          <table id="example1" class="table table-bordered table-striped">
            <thead>
              <tr>
                <th>#</th>
                <th>Product</th>
                <th>OrderId</th>
                <th>AWB No</th>
                <th>Order<br>Status</th>
                <th>Order<br>Type</th>
                <th>Website</th>
                <th>Courier</th>
                <th>Qty</th>
                <th>Order<br>Amount</th>
                <th>Payment<br>Status</th>
                <th>Receive<br>Amount</th>
                <th>Receive<br>Date</th>
              </tr>
            </thead>
            <tbody>
              <?php $i=1;?>
              @foreach($main as  $data)
              <tr>
                <th>{{$i}}</th>
                <td>{{$data['product_name']}}</td>
                <td>{{$data['order_id']}}</td>
                <td>{{$data['awb_no']}}</td>
                <td>{{$data['order_status']}}</td>
                <td>{{$data['order_type']}}</td>
                <td>{{$data['website_name']}}</td>
                <td>{{$data['courier_name']}}</td>
                <td>{{$data['qty']}}</td>
                <td>{{$data['order_amount']}}</td>
                <td><?php if(!empty($data['receive_amount'])){echo "Received";}?></td>
                <td>{{$data['receive_amount']}}</td>
                <td>{{$data['amountreceive_date']}}</td>
              </tr>
              <?php $i++;?>
              @endforeach
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </section>
  
@include('layout.footer')