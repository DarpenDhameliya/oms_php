@include('layout.header')


<section class="content-header">
  <div class="container-fluid">
    <div class="row mb-2">
      <div class="col-sm-6">
        <h1>Order Entry</h1>
      </div>
    </div>
  </div>
</section>

<section class="content">
  <div class="container-fluid">
  @if(Session::has('success'))
  <div class="alert alert-success">
      {{ Session::get('success') }}
      @php
          Session::forget('success');
      @endphp
  </div>
  @endif
    <div class="row">
      <div class="col-md-12">
        <div class="card card-Primary">
          <div class="card-header">
            <h3 class="card-title">Order Entry</h3>
          </div>
          <!-- /.card-header -->
          <!-- form start -->
          <form method="post" action="{{route('orderEntry.post')}}">
          	@csrf
            <div class="card-body">
            	<div class="row">
	            	<div class="col-md-4">
		              <div class="form-group">
		                <label for="exampleInputEmail1">Order Id</label><span class="text-danger">*</span>
		                <input type="text" class="form-control"  name="order_id" value="{{old('order_id')}}">
		              </div>
	            	@if ($errors->has('order_id'))
          				<span class="text-danger">{{ $errors->first('order_id') }}</span>
        				@endif
	            	</div>
            		<div class="col-md-4">
	                <div class="form-group">
	                  <label>Website</label><span class="text-danger">*</span>
	                  <select class="form-control select2" name="website" style="width: 100%;">
	                  	<option value="">select</option>
	                  	@foreach($website_list as $web)
	                    	<option value="{{$web->id}}" >{{$web->name}}</option>
	                    @endforeach
	                  </select>
	                </div>
            		@if ($errors->has('website'))
          				<span class="text-danger">{{ $errors->first('website') }}</span>
        				@endif
            		</div>
             		<div class="col-md-4">
              		<div class="form-group">
                  	<label>Courier</label>
	                  <select class="form-control select2" name="courier" style="width: 100%;">
	                  	<option value="">select</option>
	                   	@foreach($courier_list as $courier)
	                    	<option value="{{$courier->id}}">{{$courier->name}}</option>
	                    @endforeach
	                  </select>
                	</div>
            		</div>
            	</div>

            	<div class="row">
            		<div class="col-md-4">
	                <div class="form-group">
	                  <label>Product</label><span class="text-danger">*</span>
	                  <select class="form-control select2" name="product" style="width: 100%;">
	                  	<option value="">select</option>
	                    @foreach($product_list as $p)
	                    	<option value="{{$p->id}}">{{$p->name}}</option>
	                    @endforeach
	                  </select>
	                </div>
            		@if ($errors->has('product'))
          				<span class="text-danger">{{ $errors->first('product') }}</span>
        				@endif
            		</div>
             		<div class="col-md-4">
              		<div class="form-group">
                  	<label>Qty</label><span class="text-danger">*</span>
	                 <input type="text" class="form-control"  name="qty" value="{{old('qty')}}">
                	</div>
                		@if ($errors->has('qty'))
          				<span class="text-danger">{{ $errors->first('qty') }}</span>
        				@endif
            		</div>
            		<div class="col-md-4">
		              <div class="form-group">
		                <label>Order Amount</label><span class="text-danger">*</span>
		                <input type="text" class="form-control"name="order_amount" value="{{old('order_amount')}}">
		              </div>
	            		@if ($errors->has('order_amount'))
          				<span class="text-danger">{{ $errors->first('order_amount') }}</span>
        				@endif
	            	</div>
            	</div>

            	<div class="row">
	            	<div class="col-md-4">
		              <div class="form-group">
		                <label>AWb No</label>
		                <input type="text" class="form-control" name="awb">
		              </div>
	            	</div>
            		<div class="col-md-4">
	                <div class="form-group">
	                  <label>Order Type</label>
	                  <select class="form-control select2" name="order_type" style="width: 100%;">
	                  	<option value="">select</option>
	                    @foreach($order_type as $ot)
	                    <option value="{{$ot['value']}}">{{$ot['label']}}</option>
	                    @endforeach
	                  </select>
	                </div>

            		</div>
             		<div class="col-md-4">
              		<div class="form-group">
                  	<label>Order Status</label>
	                  <select class="form-control select2" name="order_status" style="width: 100%;">
	                  	<option value="">select</option>
	                    @foreach($order_status as $os)
	                    <option value="{{$os['value']}}">{{$os['label']}}</option>
	                    @endforeach
	                  </select>
                	</div>
            		</div>
            	</div>


            	<div class="row">
	            	<div class="col-md-4">
	            		 <div class="form-group">
                        <label>Note</label>
                        <textarea class="form-control" rows="3" name="note"></textarea>
                      </div>
	            	</div>
	            </div>


	            <div class="card-footer text-right">
	              <button type="submit" class="btn btn-primary">Submit</button>
	            </div>
	          </div>
          </form>
        </div>
     </div>
    </div> 
  </div>
</section>

@include('layout.footer')