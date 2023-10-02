@include('layout.header')
<section class="content-header">
  <div class="container-fluid">
    <div class="row mb-2">
      <div class="col-sm-6">
        <h1>Payment Receive</h1>
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
            <h3 class="card-title">Payment Receive</h3>
          </div>
        
          <form method="post" action="{{route('order_detail.post')}}">
          	@csrf
           
            <div class="card-body">
              <div class="row">
                <div class="col-md-3">
                  <div class="form-group">
                    <label for="exampleInputEmail1">Order Id/AWB</label>
                    <input type="text" class="form-control" id="order_id" name="order_id">
                  </div>
                
                  <span class="text-danger orderid-error"></span>
                
                </div>
               <div class="col-md-3"style="padding-top: 29px;">
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
          <label>Payment date:</label>
          <div class="input-group date" id="reservationdate" data-target-input="nearest">
            <input type="text" class="form-control datetimepicker-input" data-target="#reservationdate" name="payment_date" id="payment_date" value="
            <?php if(isset($main)){echo $from_date;}else{echo date('Y-m-d');}
            ?>" />
            <div class="input-group-append" data-target="#reservationdate" data-toggle="datetimepicker">
              <div class="input-group-text"><i class="fa fa-calendar"></i></div>
            </div>
          </div>
          <span class="text-danger payment-error"></span>
        </div>
      </div>
    </div>
  </div>
  <div class="container-fluid">
    <div class="card">
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
                <th><div class="form-check"><input class="form-check-input checkbox" type="checkbox" id="select_all" >Select all</div></th>
                <th>product</th>
                <th>order Id</th>
                <th>Amount</th>
                <th>Order Type</th>
                <th>Website</th>
                <th>Courier</th>
                <th>Qty</th>
               
              </tr>
            </thead>
            <tbody  class="datatable">
             
            </tbody>
          </table>
             <div class="card-footer text-right">
                <button type="button" class="btn btn-primary submit">Submit</button>
              </div>
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
            $('.checkbox').each(function(){
                this.checked = true;
            });
        }else{
             $('.checkbox').each(function(){
                this.checked = false;
            });
        }
    });

    $('.checkbox').on('click',function(){
      alert('sad');
        if($('.checkbox:checked').length == $('.checkbox').length){
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
    var paymentdata = [];

    $(document).on("click",".save",function(){
      var order_id = $('#order_id').val();
      if(order_id==""){
        $('.orderid-error').html('OrderId or Awb No is Required.');
      }else{
          $('.orderid-error').html('')
          $.ajax({
            url: '{{route('getpaymentdata.post')}}',
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

              //paymentdata.push(data.data);

              if(paymentdata.length==0){
                $('.orderid-error').html('');
                paymentdata.push(data.data);

             }else{
                if(paymentdata.some(item => item.o_id === data.data.o_id)==false){
                  paymentdata.push(data.data);
                }else{
                  $('.orderid-error').html('OrderId or Awb No is  added in list.');
                }
                
             }


              var html='';

              $.each( paymentdata, function( key,value ) {
                var int= key+1;
                html+=`<tr>
                          <td><div class="form-check"><input class="checkbox form-check-input" name="checkbox" type="checkbox" id="check`+int+`"></div></td>
                          <td>`+value.product_name+`</td>
                          <td>`+value.order_id+`</td>
                          <td><input type="text" class="form-control amount" id="amount`+int+`"  value="`+value.order_amount+`"><span class="text-danger amount-error`+int+`"></span></td>
                          <td>`+value.order_type+`</td>
                          <td>`+value.website_name+`</td>
                          <td>`+value.courier_name+`</td>
                          <td>`+value.qty+`</td>
                         <input type="hidden" id="o_id`+int+`" value="`+value.o_id+`">
                        </tr>`;
                $('.datatable').html(html);
              });
            }
          }
        });
      }
    });

    $(document).on("click",".submit",function(){

      var payment_date = $('#payment_date').val();
      if(payment_date==""){
        $('.payment-error').html('Payment Date is Required.');
      }else{
        $('.payment-error').html('');
        var checkdata = [];
        var error=0;
        for (var i = 1; i <= paymentdata.length; i++) {
          if ($('#check'+i).is(":checked")){
           
            if($('#amount'+i).val()==''){
              $('.amount-error'+i).html('Amount is Required.');
              error=1;
            }else{
              $('.amount-error'+i).html('');
              checkdata.push({'check':1,'amount':$('#amount'+i).val(),'o_id':$('#o_id'+i).val()});
                $('.selecterror').hide();
                $('.select-error').html('');
            }
          }else{ 
          }
        }
       
        if(error==0){
          $.ajax({
            url: '{{route('insert_amountdata.post')}}',
            type: "post",
            dataType:"json",
            data: {
                "data":checkdata,
                "payment_date":payment_date
            },
            success : function(data){
              if(data.result==true){
                $('#data_div').hide();
                paymentdata.length = 0;
              }else{
                $('.selecterror').show();
                $('.select-error').html(data.error);
              }
            }
          });
        }

      }
    });

    $(document).on("click",".cancel",function(){
      $.ajax({
        url: '{{route('insert_amountdata.post')}}',
        type: "post",
        dataType:"json",
        data: {
            "data":checkdata
        },
        success : function(data){
          if(data.result==true){
            $('#data_div').hide();
            paymentdata.length = 0;
          }else{
            $('.selecterror').show();
            $('.select-error').html(data.error);
          }
        }
      });

    });
  });
</script>