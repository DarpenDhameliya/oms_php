@include('layout.header')

<style>
  .button {
    float: right;
    border-radius: 50px;
  }
  .image {
    height: 70px;
    width: 70px;
  }
</style>
<!-- Content Wrapper. Contains page content -->
    <!-- Content Header (Page header) -->
    <section class="content-header">
      <div class="container-fluid">
          @if(Session::has('errors'))
  <div class="alert alert-danger">
    {{ Session::get('errors') }}
    @php
      Session::forget('errors');
    @endphp
  </div>
  @endif
        <div class="row mb-2">
          <div class="col-sm-6">
            <h1>DataTables</h1>
          </div>
          <div class="col-sm-6">
            <ol class="breadcrumb float-sm-right">
              <li class="breadcrumb-item"><a href="#">Home</a></li>
              <li class="breadcrumb-item active">DataTables</li>
            </ol>
          </div>
        </div>
      </div><!-- /.container-fluid -->
    </section>

    <!-- Main content -->
    <section class="content">
      <div class="container-fluid">
        <div class="row">
          <div class="col-12">
            
            <!-- /.card -->

            <div class="card">
              <div class="card-header">
                <h1 class="card-title">User Master</h1>
                <a href="{{url('/addproduct')}}/" class="btn btn-primary button">+ Add</a>
              </div>
              <!-- /.card-header -->
              <div class="card-body">
                <table id="example1" class="table table-bordered table-striped">
                  <thead>
                  <tr>
                    <th>No.</th>
                    <th>Product Name</th>
                    <th>Sku</th>
                    <th>Unit</th>
                    <th>GST</th>
                    <th>Image</th>
                    <th>Action</th>
                  </tr>
                  </thead>
                  <tbody>
                    @php $i=1; @endphp
                  @foreach ($product as $val)
                  <tr>
                    <td>{{$i++}}</td>
                    <td>{{$val->name}}</td>
                    <td>{{$val->sku}}</td>
                    <td>{{$val->unit}}</td>
                    <td>{{$val->gst_no}}</td>
                    <td>
                      <img src="{{asset('public/uploads/product/')}}/{{$val->image}}" alt="{{$val->image}}" class="image">
                    </td>
                    <td>
                      <a href="{{route('fatchproduct',$val->sku)}}"><i class="fa fa-edit"></i></a>
                      <a href="{{route('deleteproduct',$val->sku)}}"><i class="fa fa-trash"></i></a>
                    </td>
                  </tr>
                  @endforeach
                  </tbody>
                </table>
              </div>
              <!-- /.card-body -->
            </div>
            <!-- /.card -->
          </div>
          <!-- /.col -->
        </div>
        <!-- /.row -->
      </div>
      <!-- /.container-fluid -->
    </section>
    <!-- /.content -->
  </div>
  <!-- /.content-wrapper -->
@include('layout.footer')