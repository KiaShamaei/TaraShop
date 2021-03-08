function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

$(document).ready(function () {
  //  //get from zfram services ---------------------
  //  async function call_getsalerinfo(P_mobile)
  //  {
  //     var param = []; 
  //        param.push({name:'mobile', value:P_mobile});
  //         let s= await  callZf_jslib('register/saler/fetchdata/','getsalerinfo',param,2); 
  //        return s; 
  //  }
  // if  user comes from loginsaler or be in this page ---------------------------- 
  var Getdata = /*#__PURE__*/function () {
    function Getdata() {
      _classCallCheck(this, Getdata);
    }

    _createClass(Getdata, null, [{
      key: "Do_getsalerinfo",
      value: function Do_getsalerinfo(userinfo) {
        $('#saler,#user').html(userinfo.MName + " " + userinfo.MLastname);
        $('#username').html(userinfo.MName + " " + userinfo.MLastname);
      } // static manageSideBar(flag) {
      //   if (flag == 0) {
      //     $(".usersidebar").removeClass('hide');
      //     $(".salersidebar").addClass('hide');
      //   } else {
      //     $(".salersidebar").removeClass('hide');
      //     $(".usersidebar").addClass('hide');
      //   }
      // }

    }]);

    return Getdata;
  }();

  var userinfo = JSON.parse(localStorage.getItem('userInfo')); //main content dynamic =================

  (function ($) {
    var app = $.sammy('#wrapper-dynamic', function () {
      this.debug = true;
      var form_fields = null;
      this.get('#/', function () {
        this.app.swap('');
        this.partial('partial/main.html');
      });
      this.get('#/redirect', function () {
        this.app.swap('');
        this.redirect('#/');
      });
      this.get('#/d-editinfo', function () {
        this.app.swap('');
        this.partial('partial/d-editinfo.html');
      });
      this.get('#/d-editinfoF', function () {
        this.app.swap('');
        this.partial('partial/d-editinfoF.html');
      });
      this.get('#/color-theme', function () {
        this.app.swap('');
        this.partial('partial/color-theme.html');
      });
      this.get('#/othersetting-theme', function () {
        this.app.swap('');
        this.partial('partial/othersetting-theme.html');
      });
      this.get('#/typography-theme', function () {
        this.app.swap('');
        this.partial('partial/typography-theme.html');
      });
      this.get('#/chart', function () {
        this.app.swap('');
        this.partial('partial/chart.html');
      });
      this.get('#/editCategory', function () {
        this.app.swap('');
        this.partial('partial/editCategory.html');
      });
      this.get('#/category', function () {
        this.app.swap('');
        this.partial('partial/category.html');
      });
      this.get('#/productsMatch', function () {
        this.app.swap('');
        this.partial('partial/productsMatch.html');
      });
      this.get('#/productMatch', function () {
        this.app.swap('');
        this.partial('partial/productMatch.html');
      });
    });
    $(function () {
      app.run('#/');
    });
  })(jQuery); //--- end of sammy 
  //sidebar dynamic 


  (function ($) {
    var app = $.sammy('#dynamic-sidebar', function () {
      this.debug = true;
      var form_fields = null;

      if (userinfo.MIsSaler == 0) {
        this.get("", function () {
          this.app.swap('');
          this.partial('partial/userSideBar.html').then(function () {
            Getdata.Do_getsalerinfo(userinfo);
          });
        });
      } else {
        this.get("", function () {
          this.app.swap('');
          this.partial('partial/salerSideBar.html').then(function () {
            Getdata.Do_getsalerinfo(userinfo);
          });
        });
      }
    });
    $(function () {
      app.run('');
    });
  })(jQuery); //Getdata.manageSideBar(userinfo.MIsSaler);
  //exit of admin page ===== 


  $('#acceptExit').on('click', function () {
    window.location.assign(window.location.origin + "/ZSHOP/SHOP/index.html");
    localStorage.clear();
  });
});