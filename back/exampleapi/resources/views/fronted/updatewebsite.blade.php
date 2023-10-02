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
        <div class="row">
          <div class="col-4">
            <div class="card card-Primary">
              <div class="card-header">
                <h3 class="card-title">Edit Website Name</h3>
              </div>
              <!-- /.card-header -->
              <!-- form start -->
              <form method="post" action="{{route('updatewebsite',$web->id)}}" enctype="multipart/form-data">
                @csrf
                <div class="card-body">
                  <div class="row">
                    <div class="col-md-12">
                      <div class="form-group">
                        <label for="name">Website Name</label><span class="text-danger">*</span>
                        <input type="text" class="form-control"  name="name" value="{{$web->name}}">
                        @error('name')
                            <span class="text-red">{{$message}}</span>
                        @enderror
                      </div>
                      <div class="form-group">
                        <label for="">Select Website</label>
                        <select name="site_id" class="form-control">
                          <option value="">Select Site</option>
                          @foreach($site as $val)
                            <option value="{{$val->id}}" {{$val->id == $web->site_id ?  'selected' : ''}}>{{$val->site}}</option>
                          @endforeach
                        </select>
                        @error('site_id')
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