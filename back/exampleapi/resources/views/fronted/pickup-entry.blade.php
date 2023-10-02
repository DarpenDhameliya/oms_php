@include('layout.header')
 <meta name="csrf-token" content="{{ csrf_token() }}" />
<section class="content-header">
  <div class="container-fluid">
    <div class="row mb-2">
      <div class="col-sm-6">
        <h1>PickUp Entry</h1>
      </div>
    </div>
  </div>
</section>
  @if(Session::has('error'))
  <div class="alert alert-sucess">
      {{ Session::get('error') }}
      @php
          Session::forget('error');
      @endphp
  </div>
  @endif
<section class="content">
  <div class="container-fluid">

  <div class="alert alert-danger selecterror" style="display:none">
      <span class="select-error"></span>
  </div>
 
    <div class="row">
      <div class="col-md-12">
        <div class="card card-Primary">
          <div class="card-header">
            <h3 class="card-title">PickUp Entry</h3>
          </div>
        
          <form >
          	@csrf
            <div class="card-body">
            	<div class="row">
            		<div class="col-md-4">
            			<div class="form-group">
		                <label for="exampleInputEmail1">Order Id/AWB</label>
		                <input type="text" class="form-control" id="order_id" name="order_id">
		              </div>
            		
          				<span class="text-danger orderid-error"></span>
        				
            		</div>
            	 <div class="col-md-4"style="padding-top: 29px;">
            	 	<div class="form-group">
 	              <button type="button" class="btn btn-primary save">Save</button>
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
<section class="content" id="data_div" style="display:none;">
  <div class="container-fluid">
    <div class="row">
      <div class="col-md-4">
        <div class="form-group">
          <label>Dispath date:</label>
          <div class="input-group date" id="reservationdate" data-target-input="nearest">
            <input type="text" class="form-control datetimepicker-input" data-target="#reservationdate" name="dispatch_date" id="dispatch_date" value="
            <?php if(isset($main)){echo $from_date;}else{echo date('Y-m-d');}
            ?>" />
            <div class="input-group-append" data-target="#reservationdate" data-toggle="datetimepicker">
              <div class="input-group-text"><i class="fa fa-calendar"></i></div>
            </div>
          </div>
          <span class="text-danger dispatch-error"></span>
        </div>
      </div>
      <div class="col-md-4">
        <div class="form-group">
          <label>Courier:</label>
          <select class="select2" name="courier" data-placeholder="Select a Courier" id="courier" style="width: 100%;">
            <option value="">select</option>
            @foreach($courier_list as $courier)
              <?php if(isset($courier_id)){ foreach ($courier_id as $c) {?>
              <option value="{{$courier->id}}" <?php if(isset($courier_id)){if($courier->id==$c){echo "selected";}}?>>{{$courier->name}}</option>
            <?php } }else{?>
              <option value="{{$courier->id}}">{{$courier->name}}</option>
              <?php } ?>
            @endforeach
          </select>
          <span class="text-danger courier-error"></span>
        </div>
      </div>
    </div>
  </div>

  <div class="container-fluid">
    <div class="card">
        <div class="card-header">
          <h3 class="card-title">PickUp Entry</h3>
          <div class="card-tools">
            <div class="input-group input-group-sm" style="width: 150px;">
              <input type="text" name="table_search" class="form-control float-right" placeholder="Search">
              <div class="input-group-append">
                <button type="submit" class="btn btn-default">
                  <i class="fas fa-search"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div class="card-body table-responsive p-0" >
          <table class="table table-head-fixed text-nowrap">
            <thead>
              <tr>
                <th><div class="form-check"><input class="form-check-input check" type="checkbox" id="select_all" >Select all</div></th>
                <th>product</th>
                <th>order Id</th>
                <th>AWB</th>
                <th>Order Type</th>
                <th>Website</th>
                <th>Courier</th>
                <th>Qty</th>
                <th>Order Amount</th>
              </tr>
            </thead>
            <tbody  class="datatable">
             
            </tbody>
          </table>
          <div class="card-footer text-right">
            <button type="button" class="btn btn-primary submit" id="submit">Submit</button>
          </div>
        </div>
      </div>
  </div>
</section>

@include('layout.footer')
<script type="text/javascript">

   



 	$(document).ready(function() { 
    $('#order_id').keypress(function (e) {
      if (e.which == 13) {
        $(".save").click();
        return false;
      }
    });

    
     $('#select_all').on('click',function(){
        if(this.checked){
            $('.check').each(function(){
                this.checked = true;
            });
        }else{
             $('.check').each(function(){
                this.checked = false;
            });
        }
    });

    $('.check').on('click',function(){
      
        if($('.check:checked').length == $('.check').length){
            $('#select_all').prop('checked',true);
        }else{
            $('#select_all').prop('checked',false);
        }
    });

 		$.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });

 		var pendingdata = [];
 		$(document).on("click",".save",function(){
 			var order_id = $('#order_id').val();
      var dispatch_date= $('#dispatch_date').val();
      var courier= $('#courier').val();

     
        if(order_id==""){
          $('.orderid-error').html('OrderId or Awb No is Required.');
        }else{
          $('.orderid-error').html('')
        

       
  			$.ajax({
          url: '{{route('get_pendingdata.post')}}',
          type: "post",
          dataType:"json",
          data: {
              "order_id":order_id
    			},
      	  success : function(data){
          	if(data.result==false){
            		$('.orderid-error').html(data.error);
          	}else{
          		$('.orderid-error').html('');
              $('#order_id').val('');
              $('#data_div').show();

             //  console.log(data.data.o_id);
            if(pendingdata.length==0){
              $('.orderid-error').html('');
            	 pendingdata.push(data.data);

             }else{
            
               if(pendingdata.some(item => item.o_id === data.data.o_id)==false){
                  pendingdata.push(data.data);
                }else{
                  $('.orderid-error').html('OrderId or Awb No is  added in list.');
                }
             }


              var html='';
              $.each( pendingdata, function( key,value ) {
                var int= key+1;
                html+=`<tr>
                          <td><div class="form-check"><input class="form-check-input check" type="checkbox" id="check`+int+`"></div></td>

                          <td>`+value.product_name+`</td>
                          <td>`+value.order_id+`</td>
                          <td><input type="text" class="form-control" id="awb`+int+`"  value="`+value.awb_no+`"><span class="text-danger awb-error`+int+`"></span></td>
                          <td>`+value.order_type+`</td>
                          <td>`+value.website_name+`</td>
                          <td>`+value.courier_name+`</td>
                          <td>`+value.qty+`</td>
                          <td>`+value.order_amount+`</td><input type="hidden" id="o_id`+int+`" value="`+value.o_id+`">
                        </tr>`;
                $('.datatable').html(html);
              });
            }
          }
    		});
   		}
    });

    $(document).on("click",".submit",function(){
     

      var dispatch_date= $('#dispatch_date').val();
      var courier= $('#courier').val();
      if(dispatch_date==""||courier==""){
        if(dispatch_date==""){
          $('.dispatch-error').html('Dispatch Date is Required.');
        }else{
          $('.dispatch-error').html('');
        }

        if(courier==""){
          $('.courier-error').html('Courier Date is Required.');
        }else{
          $('.courier-error').html('');
        }
      }else{
        $('.dispatch-error').html('');
        $('.courier-error').html('');
        var checkdata = [];
        var error=0;
        for (var i = 1; i <= pendingdata.length; i++) {
          if ($('#check'+i).is(":checked")){
           
            if($('#awb'+i).val()==''){
              $('.awb-error'+i).html('Awb No is Required.');
              error=1;
            }else{

              $('.awb-error'+i).html('');
              checkdata.push({'check':1,'awbno':$('#awb'+i).val(),'o_id':$('#o_id'+i).val()});
                $('.selecterror').hide();
                $('.select-error').html('');
            }
          }else{ 
          }
        }
       
        if(error==0){
          $.ajax({
            url: '{{route('insert_pickupdata.post')}}',
            type: "post",
            dataType:"json",
            data: {
                "data":checkdata,
                "dispatch_date":dispatch_date,
                "courier":courier
            },
            success : function(data){
              if(data.result==true){
              
                $('#data_div').hide();
                pendingdata.length = 0;
              }else{
                $('.selecterror').show();
                $('.select-error').html(data.error);
              }

            }
          });
        }
      }
    });

 	});
</script>