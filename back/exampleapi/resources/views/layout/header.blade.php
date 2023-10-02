<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="csrf-token" content="{{ csrf_token() }}">
  <title>AdminLTE 3 | Dashboard</title>

  <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,400i,700&display=fallback">
  <link rel="stylesheet" href="{{asset('Asset/plugins/fontawesome-free/css/all.min.css')}}">

  
  <link rel="stylesheet" href="{{asset('Asset/plugins/daterangepicker/daterangepicker.css')}}">
  <link rel="stylesheet" href="{{asset('Asset/plugins/icheck-bootstrap/icheck-bootstrap.min.css')}}">
  <link rel="stylesheet" href="https://code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css">
  <link rel="stylesheet" href="{{asset('Asset/plugins/tempusdominus-bootstrap-4/css/tempusdominus-bootstrap-4.min.css')}}">
  <link rel="stylesheet" href="{{asset('Asset/plugins/icheck-bootstrap/icheck-bootstrap.min.css')}}">
  <link rel="stylesheet" href="{{asset('Asset/plugins/jqvmap/jqvmap.min.css')}}">
  <link rel="stylesheet" href="{{asset('Asset/plugins/bootstrap-colorpicker/css/bootstrap-colorpicker.min.css')}}">
  <link rel="stylesheet" href="{{asset('Asset/plugins/select2/css/select2.min.css')}}">
  <link rel="stylesheet" href="{{asset('Asset/plugins/select2-bootstrap4-theme/select2-bootstrap4.min.css')}}">
  <link rel="stylesheet" href="{{asset('Asset/plugins/bootstrap4-duallistbox/bootstrap-duallistbox.min.css')}}">
  <link rel="stylesheet" href="{{asset('Asset/plugins/bs-stepper/css/bs-stepper.min.css')}}">
  <link rel="stylesheet" href="{{asset('Asset/plugins/dropzone/min/dropzone.min.css')}}">
  <link rel="stylesheet" href="{{asset('Asset/dist/css/adminlte.min.css')}}">
  <link rel="stylesheet" href="{{asset('Asset/plugins/overlayScrollbars/css/OverlayScrollbars.min.css')}}">
  <link rel="stylesheet" href="{{asset('Asset/plugins/daterangepicker/daterangepicker.css')}}">
  <link rel="stylesheet" href="{{asset('Asset/plugins/summernote/summernote-bs4.min.css')}}">

  <link rel="stylesheet" href="{{asset('Asset/plugins/datatables-bs4/css/dataTables.bootstrap4.min.css')}}">
  <link rel="stylesheet" href="{{asset('Asset/plugins/datatables-responsive/css/responsive.bootstrap4.min.css')}}">
  <link rel="stylesheet" href="{{asset('Asset/plugins/datatables-buttons/css/buttons.bootstrap4.min.css')}}">

  
</head>
<body class="hold-transition sidebar-mini layout-fixed">
<div class="wrapper">

  <!-- Navbar -->
  <nav class="main-header navbar navbar-expand navbar-white navbar-light">
    <!-- Left navbar links -->
    <ul class="navbar-nav">
      <li class="nav-item">
        <a class="nav-link" data-widget="pushmenu" href="#" role="button"><i class="fas fa-bars"></i></a>
      </li>
      <!-- <li class="nav-item d-none d-sm-inline-block">
        <a href="#" class="nav-link">Home</a>
      </li>
      <li class="nav-item d-none d-sm-inline-block">
        <a href="#" class="nav-link">Contact</a>
      </li> -->
    </ul>

    <!-- Right navbar links -->
    <ul class="navbar-nav ml-auto">
      <!-- Navbar Search -->
      <li class="nav-item">
        <a class="nav-link" data-widget="navbar-search" href="#" role="button">
          <i class="fas fa-search"></i>
        </a>
        <div class="navbar-search-block">
          <form class="form-inline">
            <div class="input-group input-group-sm">
              <input class="form-control form-control-navbar" type="search" placeholder="Search" aria-label="Search">
              <div class="input-group-append">
                <button class="btn btn-navbar" type="submit">
                  <i class="fas fa-search"></i>
                </button>
                <button class="btn btn-navbar" type="button" data-widget="navbar-search">
                  <i class="fas fa-times"></i>
                </button>
              </div>
            </div>
          </form>
        </div>
      </li>

      <!-- Messages Dropdown Menu -->
      <li class="nav-item dropdown">
        <a class="nav-link" data-toggle="dropdown" href="#">
          <i class="far fa-user"></i>
          <span class="badge badge-danger"></span>
        </a>
        <div class="dropdown-menu dropdown-menu-lg dropdown-menu-right">
          <a href="#" class="dropdown-item">
            <div class="pull-right">
              <h6>You Are Logged In</h6>
              <a href="{{url('/logout')}}" class="btn btn-flat">Sign out</a>
            </div>
          </a>
        </div>
      </li>
      <!-- Notifications Dropdown Menu -->
      <!-- <li class="nav-item dropdown">
        <a class="nav-link" data-toggle="dropdown" href="#">
          <i class="far fa-bell"></i>
          <span class="badge badge-warning navbar-badge">15</span>
        </a>
        <div class="dropdown-menu dropdown-menu-lg dropdown-menu-right">
          <span class="dropdown-item dropdown-header">15 Notifications</span>
          <div class="dropdown-divider"></div>
          <a href="#" class="dropdown-item">
            <i class="fas fa-envelope mr-2"></i> 4 new messages
            <span class="float-right text-muted text-sm">3 mins</span>
          </a>
          <div class="dropdown-divider"></div>
          <a href="#" class="dropdown-item">
            <i class="fas fa-users mr-2"></i> 8 friend requests
            <span class="float-right text-muted text-sm">12 hours</span>
          </a>
          <div class="dropdown-divider"></div>
          <a href="#" class="dropdown-item">
            <i class="fas fa-file mr-2"></i> 3 new reports
            <span class="float-right text-muted text-sm">2 days</span>
          </a>
          <div class="dropdown-divider"></div>
          <a href="#" class="dropdown-item dropdown-footer">See All Notifications</a>
        </div>
      </li> -->
      <li class="nav-item">
        <a class="nav-link" data-widget="fullscreen" href="#" role="button">
          <i class="fas fa-expand-arrows-alt"></i>
        </a>
      </li>
      <!-- <li class="nav-item">
        <a class="nav-link" data-widget="control-sidebar" data-slide="true" href="#" role="button">
          <i class="fas fa-th-large"></i>
        </a>
      </li> -->
    </ul>
  </nav>
  <!-- /.navbar -->

  <!-- Main Sidebar Container -->
  <aside class="main-sidebar sidebar-dark-primary elevation-4">
  
    <a href="#" class="brand-link">
      <img src="{{asset('Asset/dist/img/sstpl_logo.png')}}" alt="AdminLTE Logo" class="brand-image img-circle elevation-3" style="opacity: .8">
      <span class="brand-text font-weight-light">Online Managment</span>
    </a>

   
    <div class="sidebar">
      <div class="user-panel mt-3 pb-3 mb-3 d-flex">
        <div class="image">
          <img src="{{asset('Asset/dist/img/user2-160x160.jpg')}}" class="img-circle elevation-2" alt="User Image">
        </div>
        <div class="info">
          <a href="#" class="d-block">{{session('user')->name}}</a>
        </div>
      </div>

    <!--   <div class="form-inline">
        <div class="input-group" data-widget="sidebar-search">
          <input class="form-control form-control-sidebar" type="search" placeholder="Search" aria-label="Search">
          <div class="input-group-append">
            <button class="btn btn-sidebar">
              <i class="fas fa-search fa-fw"></i>
            </button>
          </div>
        </div>
      </div> -->

      <nav class="mt-2">
        <ul class="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
          <li class="nav-item menu-open">
            <ul class="nav nav-treeview">
              <li class="nav-item">
                <a href="#" class="nav-link">
                  <i class="nav-icon fas fa-tachometer-alt"></i>
                  <p>Dashboard v1</p>
                </a>
              </li>
            </ul>
          </li>
          <li class="nav-item <?php if(Session::get('mainmenu')=='Master'){echo "menu-open";} ?>">
            <a href="#" class="nav-link <?php if(Session::get('mainmenu')=='Master'){echo "active";} ?>">
              <i class="nav-icon fas fa-book"></i>
              <p>
                Master
                <i class="fas fa-angle-left right"></i>
              </p>
            </a>
            <ul class="nav nav-treeview">
              <li class="nav-item">
                <a href="{{url('productlist')}}" class="nav-link <?php if(Session::get('sub_menu')=='Product'){echo "active";} ?>">
                  <i class="far fa-circle nav-icon"></i>
                  <p>Product</p>
                </a>
              </li>
              <li class="nav-item">
                <a href="{{url('websitelist')}}" class="nav-link <?php if(Session::get('sub_menu')=='Website'){echo "active";} ?>">
                  <i class="far fa-circle nav-icon"></i>
                  <p>Website</p>
                </a>
              </li>
              <li class="nav-item">
                <a href="{{url('courierlist')}}" class="nav-link <?php if(Session::get('sub_menu')=='Courier'){echo "active";} ?>">
                  <i class="far fa-circle nav-icon"></i>
                  <p>Courier</p>
                </a>
              </li>
              <li class="nav-item">
                <a href="{{url('banklist')}}" class="nav-link <?php if(Session::get('sub_menu')=='Bank_master'){echo "active";} ?>">
                  <i class="far fa-circle nav-icon"></i>
                  <p>Bank Master</p>
                </a>
              </li>
            </ul>
          </li>
          <li class="nav-item <?php if(Session::get('mainmenu')=='Order_Entry'){echo "menu-open";} ?>">
            <a href="#" class="nav-link <?php if(Session::get('mainmenu')=='Order_Entry'){echo "active";} ?>">
              <i class="nav-icon fas fa-book"></i>
              <p>
                Order Entry
                <i class="fas fa-angle-left right"></i>
              </p>
            </a>
            <ul class="nav nav-treeview">
              <li class="nav-item">
                <a href="{{route('orderEntry')}}" class="nav-link <?php if(Session::get('sub_menu')=='Manual_Order_Entry'){echo "active";} ?>">
                  <i class="nav-icon fas fa-edit"></i>
                  <p>
                    Manual Order Entry 
                  </p>
                </a>
              </li>
               <li class="nav-item">
            <a href="{{route('Import_Flipcartexcel')}}" class="nav-link <?php if(Session::get('sub_menu')=='Import_Flipcartexcel'){echo "active";} ?>">
              <i class="nav-icon fas fa-cloud-upload-alt"></i>
              <p>
                Import Flipcart Excel
              </p>
            </a>
          </li>
           <li class="nav-item">
            <a href="{{route('Import_amazoneexcel')}}" class="nav-link <?php if(Session::get('sub_menu')=='Import_amazoneexcel'){echo "active";} ?>">
              <i class="nav-icon fas fa-cloud-upload-alt"></i>
              <p>
               Import Amazone Excel
              </p>
            </a>
          </li>
           <li class="nav-item">
            <a href="{{route('Import_meeshoexcel')}}" class="nav-link <?php if(Session::get('sub_menu')=='Import_meeshoexcel'){echo "active";} ?>">
              <i class="nav-icon fas fa-cloud-upload-alt"></i>
              <p>
                Import Meesho Excel
              </p>
            </a>
          </li>
            </ul>
          </li>

          <li class="nav-item <?php if(Session::get('mainmenu')=='Report'){echo "menu-open";} ?>">
            <a href="#" class="nav-link <?php if(Session::get('mainmenu')=='Report'){echo "active";} ?>">
              <i class="nav-icon fas fa-book"></i>
              <p>
               Report
                <i class="fas fa-angle-left right"></i>
              </p>
            </a>
            <ul class="nav nav-treeview">
              <li class="nav-item">
                <a href="{{route('orderReport')}}" class="nav-link  <?php if(Session::get('sub_menu')=='Order_report'){echo "active";} ?>">
                  <i class="far fa-circle nav-icon"></i>
                  <p>Order Report</p>
                </a>
              </li>
                <li class="nav-item">
                <a href="{{route('PaymentReceiveReport')}}" class="nav-link  <?php if(Session::get('sub_menu')=='Payment_receive_report'){echo "active";} ?>">
                  <i class="far fa-circle nav-icon"></i>
                  <p>Payment Receive Report</p>
                </a>
              </li>
              <li class="nav-item">
                <a href="{{route('TransactionReport')}}" class="nav-link  <?php if(Session::get('sub_menu')=='Transaction_report'){echo "active";} ?>">
                  <i class="far fa-circle nav-icon"></i>
                  <p>Transaction Report</p>
                </a>
              </li>
            </ul>
          </li>

           <li class="nav-item">
            <a href="{{route('order_detail')}}" class="nav-link <?php if(Session::get('mainmenu')=='Order_Detail'){echo "active";} ?>">
              <i class="nav-icon fas fa-file"></i>
              <p>
                Order Detail
              </p>
            </a>
          </li>

           <li class="nav-item">
            <a href="{{route('Pickup_entry')}}" class="nav-link <?php if(Session::get('mainmenu')=='Pickup_entry'){echo "active";} ?>">
              <i class="nav-icon fas fa-truck"></i>
              <p>
                Pickup Entry
              </p>
            </a>
          </li>

          <li class="nav-item">
            <a href="{{route('Payment_receive')}}" class="nav-link <?php if(Session::get('mainmenu')=='Payment_receive'){echo "active";} ?>">
              <i class="nav-icon fas fa-money-bill"></i>
                <p>
                Payment Receive
              </p>
            </a>
          </li>

          <li class="nav-item">
            <a href="{{route('order_return')}}" class="nav-link <?php if(Session::get('mainmenu')=='Order_Return'){echo "active";} ?>">
              <i class="nav-icon fas fa-money-bill"></i>
                <p>
                Order Return
              </p>
            </a>
          </li>
         
        </ul>
      </nav>
    </div>
  </aside>
  <div class="content-wrapper">