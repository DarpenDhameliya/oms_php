@include('layout.header')
<section class="content-header">
  <div class="container-fluid">
    <div class="row mb-2">
      <div class="col-sm-6">
        <h1>Order Detail</h1>
      </div>
    </div>
  </div>
</section>
 
<section class="content">
  <div class="container-fluid">
  	 @if(Session::has('error'))
  <div class="alert alert-danger">
      {{ Session::get('error') }}
      @php
          Session::forget('error');
      @endphp
  </div>
  @endif
    <div class="row">
      <div class="col-md-12">
        <div class="card card-Primary">
          <div class="card-header">
            <h3 class="card-title">Order Detail</h3>
          </div>
        
          <form method="post" action="{{route('order_detail.post')}}">
          	@csrf
            <div class="card-body">
            	<div class="row">
            		<div class="col-md-3">
            			<div class="form-group">
		                <label for="exampleInputEmail1">Order Id/AWB</label>
		                <input type="text" class="form-control"  name="order_id">
		              </div>
            		@if ($errors->has('order_id'))
          				<span class="text-danger">{{ $errors->first('order_id') }}</span>
        				@endif
            		</div>
            	 <div class="col-md-3"style="padding-top: 29px;">
            	 	<div class="form-group">
 	              <button type="submit" class="btn btn-primary">Submit</button>
 	            </div>
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
          <h3 class="card-title text-lg">Order Detail</h3>
        </div>  
        <div class="card-body p-0">
		      <table class="table table-striped">
		      	<tr>
		      		<td class="text-lg">Product : </td>
		      		<td>{{$main[0]['product_name']}}</td>
		      		<td class="text-lg">Order Date :</td>
		      		<td>{{$main[0]['order_date']}}</td>
		      	</tr>
		      	<tr>
		      		<td class="text-lg">Website : </td>
		      		<td>{{$main[0]['website_name']}}</td>
		      		<td class="text-lg">Order Id :</td>
		      		<td>{{$main[0]['order_id']}}</td>
		      	</tr>
		      	<tr>
		      		<td class="text-lg">Courier : </td>
		      		<td>{{$main[0]['product_name']}}</td>
		      		<td class="text-lg">AWB No :</td>
		      		<td>{{$main[0]['courier_name']}}</td>
		      		</tr>
						<tr>
							<td class="text-lg">Qty : </td>
							<td>{{$main[0]['qty']}}</td>
		      		<td class="text-lg">Order Amount :</td>
		      		<td>{{$main[0]['order_amount']}}</td>
		      	</tr>
						<tr>
							<td class="text-lg">Order Status : </td>
							<td>{{$main[0]['order_status']}}</td>
		      		<td class="text-lg">Order Type :</td>
		      		<td>{{$main[0]['order_type']}}</td>
		      	</tr>
						<tr>
							<td class="text-lg">Note : </td>
						</tr>
		      </table>
		    </div>
		  </div>
		</div>
	</section>
@endif
        
@include('layout.footer')
