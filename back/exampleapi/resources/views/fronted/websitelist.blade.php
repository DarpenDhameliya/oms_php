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
        @if(Session::has('error'))
  <div class="alert alert-danger">
    {{ Session::get('error') }}
    @php
      Session::forget('error');
    @endphp
  </div>
  @endif
        <div class="row mb-2">
          <div class="col-sm-6">
            <h1>WebSite List</h1>
          </div>
          <div class="col-sm-6">
            <ol class="breadcrumb float-sm-right">
              <li class="breadcrumb-item"><a href="#">Home</a></li>
              <li class="breadcrumb-item active">WebSiteList</li>
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
                <h3 class="card-title">Add Website Name</h3>
              </div>
              <!-- /.card-header -->
              <!-- form start -->
              <form method="post" action="{{route('insertwebsite')}}" enctype="multipart/form-data">
                @csrf
                <div class="card-body">
                  <div class="row">
                    <div class="col-md-12">
                      <div class="form-group">
                        <label for="name">Website Name</label><span class="text-danger">*</span>
                        <input type="text" class="form-control"  name="name" placeholder="Enter WebSite Name">
                        @error('name')
                            <span class="text-red">{{$message}}</span>
                        @enderror
                      </div>
                      <div class="form-group">
                        <label for="">Select Website</label><span class="text-danger">*</span>
                        <select name="site_id" class="form-control select2" multiple="multiple"  data-placeholder="Select Website">
                           <!-- multiple="multiple"  data-placeholder="Select Website" -->
                          <option value="">Select Site</option>
                          @foreach($site as $val)
                            <option value="{{$val->id}}">{{$val->site}}</option>
                          @endforeach
                        </select>
                        @error('site_id')
                            <span class="text-red">{{$message}}</span>
                        @enderror
                      </div>
                    </div>
                  </div>
                  <?php 
                    // print_r(session()->all());
                  ?>
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
                <h1 class="card-title">WebSite List</h1>
              </div>
              <!-- /.card-header -->
              <div class="card-body">
                <table id="example1" class="table table-bordered table-striped">
                  <thead>
                  <tr>
                    <th>No</th>
                    <th>Website Name</th>
                    <th>Site Name</th>
                    <th>Action</th>
                  </tr>
                  </thead>
                  <tbody>
                    @php $i=1; @endphp
                  @foreach ($web as $val)
                  <tr>
                    <td>{{$i++}}</td>
                    <td>{{$val->name}}</td>
                    <td>{{$val->site}}</td>
                    <td>
                      <a href="{{route('fatchwebsite',$val->w_id)}}"><i class="fa fa-edit"></i></a>
                      <a href="{{route('deletewebsite',$val->w_id)}}"><i class="fa fa-trash"></i></a>
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