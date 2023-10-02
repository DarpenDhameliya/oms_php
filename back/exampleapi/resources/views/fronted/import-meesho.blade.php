@include('layout.header')
 <meta name="csrf-token" content="{{ csrf_token() }}" />
<section class="content-header">
  <div class="container-fluid">
    <div class="row mb-2">
      <div class="col-sm-6">
        <h1>Import Meesho</h1>
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
  
  @if(Session::has('sucess'))
  <div class="alert alert-success">
      {{ Session::get('sucess') }}
      @php
          Session::forget('sucess');
      @endphp
  </div>
  @endif
    <div class="row">
      <div class="col-md-12">
        <div class="card card-Primary">
          <div class="card-header">
            <h3 class="card-title">Import Meesho</h3>
          </div>
        
           <form action="{{ route('import_meesho') }}" method="POST" enctype="multipart/form-data">
          	@csrf
            <div class="card-body">
            	<div class="row">
            		<div class="col-md-4">
            			<div class="form-group">
                    <label for="exampleInputFile">Import File</label>
                    <div class="input-group">
                      <div class="custom-file">
                        <input type="file" name="file" class="custom-file-input" id="image">
                        <label class="custom-file-label" for="exampleInputFile">Choose file</label>
                      </div>
                    </div>
                  </div>
                  @if ($errors->has('file'))
                  <span class="text-danger">{{ $errors->first('file') }}</span>
                @endif
            		</div>
                <div class="col-md-4">
                  <div class="form-group">
                    <label>Website</label><span class="text-danger">*</span>
                    <select class="form-control select2" name="website" id="website" style="width: 100%;">
                      <option value="">select</option>
                      @foreach($website as $web)
                        <option value="{{$web->id}}" >{{$web->name}}</option>
                      @endforeach
                    </select>
                  </div>
                  <span class="text-danger website-error"></span>
                <!-- @if ($errors->has('website'))
                  <span class="text-danger">{{ $errors->first('website') }}</span>
                @endif -->
                </div>
            	 <div class="col-md-3"style="padding-top: 29px;">
            	 	<div class="form-group">
 	              <button type="submit" class="btn btn-primary save">Save</button>
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

<?php if(isset($meesho_data)){if(!empty($meesho_data)){?>
<section class="content" id="data_div">
  <div class="container-fluid">
    <div class="card">
      <div class="card">
        <div class="card-header">
          <h3 class="card-title">Meesho Excel Data</h3>
          <div class="card-tools">
            <div class="input-group input-group-sm" style="width: 150px;">
              
              <div class="input-group-append">
               
              </div>
            </div>
          </div>
        </div>
        <div class="card-body table-responsive p-0" >
          <table class="table table-head-fixed text-nowrap">
            <thead>
              <tr>
                <th>Order Id</th>
               <!--  <th>Product Id</th> -->
                <th>Product Name</th>
                <th>Qty</th>
                <th>Awb</th>
                <th>Packed</th>
                <th>Courier Name</th>
               
              </tr>
            </thead>
           
            <tbody>
              <?php $i=1;foreach ($meesho_data as $k) { ?>
               <tr>
                  <td>{{$k['order_id']}}</td>
                  <!--<td>{{$k['product_id']}}</td> -->
                  <td>{{$k['product_name']}}</td>
                  <td>{{$k['qty']}}</td>
                  <td id="awb{{$i}}"><?php if(empty($k['awb_no'])){ ?> <input type="text" class="form-control" id="awb_{{$i}}" name="awb_no"><span class="text-danger awb-error{{$i}}"></span><?php }else{echo $k['awb_no'];}?></td>
                  <td>{{$k['packed']}}</td>
                  <td>{{$k['courier_name']}}</td>
                  <input type="hidden" name="count_meeshodata" class="count_meeshodata" id="count_meeshodata{{$i}}" data-orderid="{{$k['order_id']}}" data-qty="{{$k['qty']}}" data-product_id="{{$k['product_id']}}" data-courier="{{$k['courier_name']}}" value="<?php echo count($meesho_data);?>">
               </tr>
              <?php $i++;}?>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</section>


<?php }}if(isset($duplicate_data)){?>
<div class="card-footer text-right">
<?php  if(isset($meesho_data)){if(!empty($meesho_data)){?>
  <button type="button" class="btn btn-primary submit">Submit</button>
<?php }} ?>
<input type="hidden" name="filename" id="filename" value="<?php echo $fileName;?>">
  <button type="button" class="btn btn-danger cancel">Cancel</button>
</div>
<?php } ?>


<?php  if(isset($duplicate_data)){ if(!empty($duplicate_data)){ ?>
<section class="content" id="data_div"> 
  <div class="container-fluid">
  <div class="alert alert-danger">
     Please Verify <?php if(!empty($meesho_data)){ ?>Before Submit  <b><?php } echo count($duplicate_data)?> </b>Records Have Duplicate Order Id.
  </div>
    <div class="card">
      <div class="card">
        <div class="card-header">
          <h3 class="card-title">Meesho Duplicate Data</h3>
          <div class="card-tools">
            <div class="input-group input-group-sm" style="width: 150px;">
             
              <div class="input-group-append">
               
              </div>
            </div>
          </div>
        </div>
        <div class="card-body table-responsive p-0" >
          <table class="table table-head-fixed text-nowrap">
            <thead>
              <tr>
                <th>Order Id</th>
               <!--  <th>Product Id</th> -->
                <th>Product Name</th>
                <th>Qty</th>
                <th>Awb</th>
                <th>Packed</th>
                <th>Courier Name</th>
              
               
              </tr>
            </thead>
            <tbody>
              <?php if(isset($duplicate_data)){  foreach ($duplicate_data as $k) { ?>
               <tr>
                  <td>{{$k['order_id']}}</td>
                  <!-- <td>{{$k['product_id']}}</td> -->
                  <td>{{$k['product_name']}}</td>
                  <td>{{$k['qty']}}</td>
                  <td>{{$k['awb_no']}}</td>
                  <td>{{$k['packed']}}</td>
                   <td>{{$k['courier_name']}}</td>
               </tr>
              <?php }}?>
             
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</section>
<?php } }?>

@include('layout.footer')
<script type="text/javascript">
  $(document).ready(function() { 
      $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });
 
     
    $(document).on("click",".submit",function(){
      var error =0;
      var data =[];
      var website = $('#website option:selected').val();
      var count_meeshodata = $('.count_meeshodata').val();

      if(website==""){
        var error =1;
        $('.website-error').html('Website is Required.');
      }else{
        $('.website-error').html('');
      }

      for (var i = 1; i <=count_meeshodata; i++) {
        if($('#awb_'+i).val()==""){
          var error =1;
          $('.awb-error'+i).html('Awb No is Required.');
        }else{ 
          $('.awb-error'+i).html('');
          var awb = $('#awb_'+i).val();
          if(typeof(awb) != "undefined" && awb !== null) {
             awb = awb;
          }else{
            awb=$('#awb'+i).html();

          }

          data.push({"website_id":website,
            "order_id":$('#count_meeshodata'+i).attr('data-orderid'),
            'product_id':$('#count_meeshodata'+i).attr('data-product_id'),
            'qty':$('#count_meeshodata'+i).attr('data-qty'),
            "awb_no":awb
          });
        }
      }

      if(error==0){
        $.ajax({
          url: '{{route('insert_meeshoexcel.post')}}',
          type: "post",
          dataType:"json",
          data: {
              "data":data,
              "filename":$('#filename').val()
          },
          success : function(data){
            if(data.result==true){
              window.location.replace("{{route('Import_meeshoexcel')}}");
            }
          }
        });
      }

    });

   $(document).on("click",".cancel",function(){

      $.ajax({
          url: '{{route('cancel_meeshoexcel.post')}}',
          type: "post",
          dataType:"json",
          data: {
              "filename":$('#filename').val()
          },
          success : function(data){
            if(data.result==true){
              window.location.replace("{{route('Import_meeshoexcel')}}");
            }
          }
        });
    });

  });
</script>

