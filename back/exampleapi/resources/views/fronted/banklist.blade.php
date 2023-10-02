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
            <h1>Add Bank</h1>
          </div>
          <div class="col-sm-6">
            <ol class="breadcrumb float-sm-right">
              <li class="breadcrumb-item"><a href="#">Home</a></li>
              <li class="breadcrumb-item active">Add Bank</li>
            </ol>
          </div>
        </div>
      </div><!-- /.container-fluid -->
    </section>

    <!-- Main content -->
    <section class="content">
      <div class="container-fluid">
        <div class="row">
          <div class="col-4">
            <div class="card card-Primary">
              <div class="card-header">
                <h3 class="card-title">Add Bank Name</h3>
              </div>
              <!-- /.card-header -->
              <!-- form start -->
              <form method="post" action="{{route('insertbank')}}" enctype="multipart/form-data">
                @csrf
                <div class="card-body">
                  <div class="row">
                    <div class="col-md-12">
                      <div class="form-group">
                        <label for="name">Bank Name</label><span class="text-danger">*</span>
                        <input type="text" class="form-control"  name="bank_name" placeholder="Enter Bank Name" value="{{old('bank_name')}}">
                        @error('bank_name')
                            <span class="text-red">{{$message}}</span>
                        @enderror
                      </div>
                    </div>
                  </div>
                  <div>
                    <div class="col-md-12">
                      <div class="form-group">
                        <label for="name">IFSC Code</label><span class="text-danger">*</span>
                        <input type="text" class="form-control"  name="ifsc" placeholder="Enter IFSC Code" value="{{old('ifsc')}}">
                        @error('ifsc')
                            <span class="text-red">{{$message}}</span>
                        @enderror
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-md-12">
                      <div class="form-group">
                        <label for="name">Account</label><span class="text-danger">*</span>
                        <input type="text" class="form-control"  name="account" placeholder="Enter Account Number" value="{{old('account')}}">
                        @error('account')
                            <span class="text-red">{{$message}}</span>
                        @enderror
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-md-12">
                      <div class="form-group">
                        <label for="name">Branch</label><span class="text-danger">*</span>
                        <input type="text" class="form-control"  name="branch" placeholder="Enter Branch Name" value="{{old('branch')}}">
                        @error('branch')
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
                    <th>Bank Name</th>
                    <th>IFSC</th>
                    <th>Account</th>
                    <th>Branch</th>
                    <th>Action</th>
                  </tr>
                  </thead>
                  <tbody>
                    @php $i=1; @endphp
                  @foreach ($bank as $val)
                  <tr>
                    <td>{{$i++}}</td>
                    <td>{{$val->bank_name}}</td>
                    <td>{{$val->ifsc}}</td>
                    <td>{{$val->account}}</td>
                    <td>{{$val->branch}}</td>
                    <td>
                      <a href="{{route('fatchbank',$val->id)}}"><i class="fa fa-edit"></i></a>
                      <a href="{{route('deletebank',$val->id)}}"><i class="fa fa-trash"></i></a>
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