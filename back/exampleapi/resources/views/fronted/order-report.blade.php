@include('layout.header')
<section class="content-header">
  <div class="container-fluid">
    <div class="row mb-2">
      <div class="col-sm-6">
        <h1>Order Report</h1>
      </div>
    </div>
  </div>
</section>

<section class="content">
  <div class="container-fluid">
  	
	@if(Session::has('errors'))
	<div class="alert alert-danger">
		{{ Session::get('errors') }}
		@php
			Session::forget('errors');
		@endphp
	</div>
	@endif

    <div class="row">
      <div class="col-md-12">
        <div class="card card-Primary">
          <div class="card-header">
            <h3 class="card-title">Order Report</h3>
          </div>
        
          <form method="post" action="{{route('orderReport.post')}}">
          	@csrf
            <div class="card-body">
            	<div class="row">

            		<div class="col-md-3">
            			<div class="form-group">
          				 	<label>From:</label>
                    <div class="input-group date" id="reservationdate" data-target-input="nearest">
                      <input type="text" class="form-control datetimepicker-input" name="from_date" data-target="#reservationdate" value="<?php if(isset($main)){echo $from_date;}?>"/>
                      <div class="input-group-append" data-target="#reservationdate" data-toggle="datetimepicker">
                          <div class="input-group-text"><i class="fa fa-calendar"></i></div>
                      </div>
                    </div> 
		              </div>
            		</div>

            		<div class="col-md-3">
            			<div class="form-group">
                  	<label>To:</label>
                    <div class="input-group date" id="reservationdate1" data-target-input="nearest">
                      <input type="text" class="form-control datetimepicker-input" data-target="#reservationdate1" name="to_date" value="<?php if(isset($main)){echo $to_date;}?>"/>
                      <div class="input-group-append" data-target="#reservationdate1" data-toggle="datetimepicker">
                          <div class="input-group-text"><i class="fa fa-calendar"></i></div>
                      </div>
                    </div>
	                </div>
            		</div>

	            	<div class="col-md-3">
		              <div class="form-group">
		                <label for="exampleInputEmail1">Order Id/AWB</label>
		                <input type="text" class="form-control"  name="order_id">
		              </div>
	            	</div>

	            	<div class="col-md-3">
              		<div class="form-group">
                  	<label>Order Status</label>
                  	<select class="select2" multiple="multiple" name="order_status[]" data-placeholder="Select a OrderStatus" style="width: 100%;">
                  		<option value="">select</option>
                    	@foreach($order_status as $os)
                    	<?php if(isset($orderstatus)){ foreach ($orderstatus as $o) {?>
                  			<option value="{{$os['value']}}"  <?php if(isset($orderstatus)){if($os['value']==$o){echo "selected";}}?>>{{$os['label']}}</option>
                    	<?php } }else{?>
                    		<option value="{{$os['value']}}"  >{{$os['label']}}</option>
                    		<?php } ?>
                    	@endforeach 
                  	</select>
                	</div>
            		</div>

            	</div>
 
            	<div class="row">

            		<div class="col-md-3">
	                <div class="form-group">
	                  <label>Website</label>
	                  <select class="select2" multiple="multiple" name="website[]" data-placeholder="Select a Website" style="width: 100%;">
	                  	<option value="">select</option>
	                  	@foreach($website_list as $web)
	                  	<?php if(isset($website_id)){ foreach ($website_id as $w) {?>
	                    	<option value="{{$web->id}}" <?php if(isset($website_id)){if($web->id==$w){echo "selected";}}?>>{{$web->name}}</option>
	                    <?php } }else{?>
	                    		<option value="{{$web->id}}">{{$web->name}}</option>
	                    		<?php } ?>
	                    @endforeach
	                  </select>
	                </div>
            		</div>

             		<div class="col-md-3">
              		<div class="form-group">
                  	<label>Courier</label>
	                  <select class="select2" multiple="multiple" name="courier[]" data-placeholder="Select a Courier" style="width: 100%;">
	                  	<option value="">select</option>
	                   	@foreach($courier_list as $courier)
	                   		<?php if(isset($courier_id)){ foreach ($courier_id as $c) {?>
	                    	<option value="{{$courier->id}}" <?php if(isset($courier_id)){if($courier->id==$c){echo "selected";}}?>>{{$courier->name}}</option>
	                    <?php } }else{?>
	                    	<option value="{{$courier->id}}">{{$courier->name}}</option>
	                    	<?php } ?>
	                    @endforeach
	                  </select>
                	</div>
            		</div>

            		<div class="col-md-3">
	                <div class="form-group">
	                  <label>Product</label>
	                  <select class="select2" multiple="multiple" name="product[]" data-placeholder="Select a Product" style="width: 100%;">
	                  	<option value="">select</option>
	                    @foreach($product_list as $p)
	                    <?php if(isset($product_id)){ foreach ($product_id as $pro) {?>
	                    	<option value="{{$p->id}}" <?php if(isset($product_id)){if($p->id==$pro){echo "selected";}}?>>{{$p->name}}</option>
	                    <?php } }else{?>
	                    	<option value="{{$p->id}}">{{$p->name}}</option>
	                    		<?php } ?>
	                    @endforeach
	                  </select>
	                </div>
            		</div>

            		<div class="col-md-3">
	                <div class="form-group">
	                  <label>Order Type</label>
	                  <select class="select2" multiple="multiple" name="order_type[]" data-placeholder="Select a OrderType" style="width: 100%;">
	                  	<option value="">select</option>
	                    @foreach($order_type as $ot)
	                     <?php if(isset($ordertype)){ foreach ($ordertype as $o) {?>
	                    	<option value="{{$ot['value']}}" <?php if(isset($ordertype)){if($ot['value']==$o){echo "selected";}}?>>{{$ot['label']}}</option>
	                    <?php } }else{?>
	                    <option value="{{$ot['value']}}">{{$ot['label']}}</option>
	                    	<?php } ?>
	                    @endforeach
	                  </select>
	                </div>
            		</div>
             	
            	</div>

	            <div class="text-right">
	              <button type="submit" class="btn btn-primary">Submit</button>
	            </div>

	          </div>
          </form>
        </div>
     </div>
    </div> 
  </div>
</section>

@if(isset($main))

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
		        	@foreach($main as $data)
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
@endif


<script type="text/javascript">
	$(".date-picker").datepicker("setDate", "");
</script>


@include('layout.footer')
<!-- <script>

var $datepicker = $('#reservationdate');
$datepicker.datetimepicker();
$datepicker.datetimepicker('setDate', new Date());

 $('#reservationdate').datetimepicker({
        format: 'L',
        defaultDate:new Date()
    });
</script> -->