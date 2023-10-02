@include('layout.header')

<section class="content-header">
  <div class="container-fluid">
    <div class="row mb-2">
      <div class="col-sm-6">
        <h1>Add Product</h1>
      </div>
    </div>
  </div>
</section>
  @if(Session::has('success'))
  <div class="alert alert-sucess">
      {{ Session::get('success') }}
      @php
          Session::forget('success');
      @endphp
  </div>
  @endif

<section class="content">
  <div class="container-fluid">
    <div class="row">
      <div class="col-md-12">
        <div class="card card-Primary">
          <div class="card-header">
            <h3 class="card-title">Add Product</h3>
          </div>
          <!-- /.card-header -->
          <!-- form start -->
          <form method="post" action="{{route('insertproduct')}}" enctype="multipart/form-data">
          	@csrf
            <div class="card-body">
            	<div class="row">
	            	<div class="col-md-6">
		              <div class="form-group">
		                <label for="name">Product Name</label><span class="text-danger">*</span>
		                <input type="text" class="form-control" name="name" placeholder="Enter ProductName" value="{{old('name')}}">
                    @error('name')
                        <span class="text-red">{{$message}}</span>
                    @enderror
		              </div>
	            	</div>
            		<div class="col-md-6">
	                <div class="form-group">
	                  <label>SKU</label><span class="text-danger">*</span>
	                  <input type="text" name="sku" class="form-control" id="sku" placeholder="Enter SKU" value="{{old('sku')}}">
                    @error('sku')
                        <span class="text-red">{{$message}}</span>
                    @enderror
                    <span id="error" class="text-danger"></span>
                    <span id="success" class="text-success"></span>
	                </div>
            		</div>
            	</div>
            	<div class="row">
            		<div class="col-md-6">
	                <div class="form-group">
	                  <label>Unit</label><span class="text-danger">*</span>
                    <select name="unit_id" class="form-control select2">
                      <option value="">Select</option>
                      @foreach ($unit as $val)
                        @if (old('unit_id') == $val->id)
                          <option value="{{$val->id}}" selected>{{ $val->unit }}</option>
                        @else
                          <option value="{{$val->id}}">{{$val->unit}}</option>
                        @endif
                      @endforeach
                    </select>
                    @error('unit_id')
                        <span class="text-red">{{$message}}</span>
                    @enderror
	                </div>
            		</div>
             		<div class="col-md-6">
              		<div class="form-group">
                  	<label>GST</label><span class="text-danger">*</span>
                    <select name="gst_id" class="form-control select2">
                      <option value="">Select</option>
                      @foreach ($gst as $val)
                        @if (old('gst_id') == $val->id)
                          <option value="{{$val->id}}" selected>{{ $val->gst_no }}</option>
                        @else
                          <option value="{{$val->id}}">{{$val->gst_no}}</option>
                        @endif
                      @endforeach
                    </select>
                    @error('gst_id')
                        <span class="text-red">{{$message}}</span>
                    @enderror
                	</div>
            		</div>
            	</div>

            	<div class="row">
	            	<div class="col-md-6">
		              <div class="form-group">
		                <label for="exampleInputFile">Select Product Image</label><span class="text-red">*</span>
                    <div class="input-group">
                      <div class="custom-file">
    		                <input type="file" class="custom-file-input" name="image">
                        <label class="custom-file-label" for="exampleInputFile">Choose Image</label>
                      </div>
                    </div>
                    @error('image')
                        <span class="text-red">{{$message}}</span>
                    @enderror
		              </div>
	            	</div>
            	</div>
              <input type="hidden" class="form-control" name="status" value="1">
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

@include('layout.footer')

<script>
  $(document).on('focusout',"#sku",function(){
    // alert($(this).val());
    var sku = $(this).val();
    // alert(sku);
    $.ajaxSetup({
            headers: {
                'X-CSRF-TOKEN': jQuery('meta[name="csrf-token"]').attr('content')
            }
      });
    $.ajax({ 
      type: 'post',
      dataType: 'json',
      url: '{{route("getsku")}}',
      data:{
          "sku":sku,
          
      },
        success: function (result) {
          console.log(result);
          if(result == 1)
          {
            $("#error").html("* This is SKU is already Used");
            $('.btn').attr('disabled', '');
          }
          else
          {
            $("#success").html("* This SKU is Available");
          }
        }
      });
    });
</script>