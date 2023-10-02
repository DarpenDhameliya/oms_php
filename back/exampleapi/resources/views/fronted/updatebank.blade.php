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
              <li class="breadcrumb-item active">UpdateBank</li>
            </ol>
          </div>
        </div>
      </div><!-- /.container-fluid -->
    </section>

    <!-- Main content -->
    <section class="content">
      <div class="container-fluid">
        <div class="row">
          <div class="col-6">
            <div class="card card-Primary">
              <div class="card-header">
                <h3 class="card-title">Add Bank Name</h3>
              </div>
              <!-- /.card-header -->
              <!-- form start -->
              <form method="post" action="{{route('updatebank',$bank->id)}}" enctype="multipart/form-data">
                @csrf
                <div class="card-body">
                  <div class="row">
                    <div class="col-md-12">
                      <div class="form-group">
                        <label for="name">Bank Name</label><span class="text-danger">*</span>
                        <input type="text" class="form-control"  name="bank_name" value="{{$bank->bank_name}}">
                        @error('bank_name')
                            <span class="text-red">{{$message}}</span>
                        @enderror
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-md-12">
                      <div class="form-group">
                        <label for="name">IFSC Code</label><span class="text-danger">*</span>
                        <input type="text" class="form-control"  name="ifsc" value="{{$bank->ifsc}}">
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
                        <input type="text" class="form-control"  name="account" value="{{$bank->account}}">
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
                        <input type="text" class="form-control"  name="branch" value="{{$bank->branch}}">
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