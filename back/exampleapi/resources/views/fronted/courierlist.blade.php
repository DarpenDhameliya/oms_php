@include('layout.header')

<style>
  .button {
    float: right;
    border-radius: 50px;
  }
  
</style>
<!-- Content Wrapper. Contains page content -->
    <!-- Content Header (Page header) -->
    <section class="content-header">
      <div class="container-fluid">
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
         @if(Session::has('error'))
  <div class="alert alert-danger">
    {{ Session::get('error') }}
    @php
      Session::forget('error');
    @endphp
  </div>
  @endif
        <div class="row">
          <div class="col-4">
            <div class="card card-Primary">
              <div class="card-header">
                <h3 class="card-title">Add Courier Name</h3>
              </div>
              <!-- /.card-header -->
              <!-- form start -->
              <form method="post" action="{{route('insertcourier')}}" enctype="multipart/form-data">
                @csrf
                <div class="card-body">
                  <div class="row">
                    <div class="col-md-12">
                      <div class="form-group">
                        <label for="name">Courier Name</label><span class="text-danger">*</span>
                        <input type="text" class="form-control"  name="name" placeholder="Enter Courier Name">
                        @error('name')
                            <span class="text-red">{{$message}}</span>
                        @enderror
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
          <div class="col-8">
            <div class="card">
              <div class="card-header">
                <h1 class="card-title">Courier List</h1>
              </div>
              <!-- /.card-header -->
              <div class="card-body">
                <table id="example1" class="table table-bordered table-striped">
                  <thead>
                  <tr>
                    <th>No</th>
                    <th>Courier Name</th>
                    <th>Action</th>
                  </tr>
                  </thead>
                  <tbody>
                    @php $i=1; @endphp
                  @foreach ($courier as $val)
                  <tr>
                    <td>{{$i++}}</td>
                    <td>{{$val->name}}</td>
                    <td>
                      <a href="{{route('fatchcourier',$val->id)}}"><i class="fa fa-edit"></i></a>
                      <a href="{{route('deletecourier',$val->id)}}"><i class="fa fa-trash"></i></a>
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