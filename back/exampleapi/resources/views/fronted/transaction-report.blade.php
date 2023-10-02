@include('layout.header')


<section class="content-header">
  <div class="container-fluid">
    <div class="row mb-2">
      <div class="col-sm-6">
        <h1>Transaction Report</h1>
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
            <h3 class="card-title">Transaction Report</h3>
          </div>
        
          <form method="post" action="{{route('TransactionReport.post')}}">
          	@csrf
            <div class="card-body">
            	<div class="row">
            		<div class="col-md-3">
            			<div class="form-group">
          				 	<label>From:</label>

          				
                     <div class="input-group date" id="reservationdate" data-target-input="nearest">
                        <input type="text" class="form-control datetimepicker-input from_date" name="from_date" data-target="#reservationdate" value="
                      <?php if(isset($main)){echo $from_date;}else{echo date('m/d/Y');}
                      ?>"/>
                        <div class="input-group-append" data-target="#reservationdate" data-toggle="datetimepicker">
                            <div class="input-group-text"><i class="fa fa-calendar"></i></div>
                        </div>
                    </div> 
                 		  
		              </div>
            		</div>
            		<div class="col-md-3">
            			<div class="form-group">
                  	<label>To:</label>
                 
                  <!-- 		<input type="date" name="to_date" class="form-control" value="
                      <?php if(isset($main)){echo $from_date;}else{echo date('Y-m-d');}
                      ?>"> -->
                    <div class="input-group date" id="reservationdate1" data-target-input="nearest">
                        <input type="text" class="form-control datetimepicker-input to_date" data-target="#reservationdate1" name="to_date" value="
                      <?php if(isset($main)){echo $to_date ;}else{echo date('m/d/Y');}
                      ?>" />
                        <div class="input-group-append" data-target="#reservationdate1" data-toggle="datetimepicker">
                            <div class="input-group-text"><i class="fa fa-calendar"></i></div>
                        </div>
                    </div>
                   
	                </div>
            		</div>

	            <div class="text-right" style="margin-top:30px;">
	           
	              <button type="submit" class="btn btn-primary">Submit</button>
	            </div>
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
		          	<th>OrderId OR ExcelName</th>
		            <th>Type</th>
		          	<th>Data Count</th>
		          	<th>Charge</th>
		            <th>Opening Balance</th>
		            <th>Total Charge amount</th>
		           	<th>Closing Balance</th>
		          </tr>
		        </thead>
		        <tbody>
		       
		        	@foreach($main as  $data)
		          <tr>
		            <td><?php if(!empty($data['order_id'])){echo $data['order_id'];}else{
		            	echo $data['excel_filename'];
		            } ?></td> 
		            <td>{{$data['type']}}</td> 
		            <td><?php if(!empty($data['exceldata_count'])){echo $data['exceldata_count'];}else{
		            	echo 1;
		            } ?></td> 
		            <td>{{$data['main_charge']}}</td> 
		            <td>{{$data['opening_balance']}}</td> 
		            <td>{{$data['total_charge']}}</td> 
		            <td>{{$data['closing_balance']}}</td> 
		          </tr>
		          @endforeach
		        </tbody>
					</table>
		    </div>
		  </div>
		</div>
	</section>
@endif





@include('layout.footer')
