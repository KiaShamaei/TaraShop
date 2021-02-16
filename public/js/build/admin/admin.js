function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

$(document).ready(function () {
  // if  user comes from loginsaler or be in this page ---------------------------- 
  if (localStorage.getItem('token') != null) {
    //get from zfram services ---------------------
    var call_getsalerinfo = /*#__PURE__*/function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(P_mobile) {
        var param, s;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                param = [];
                param.push({
                  name: 'mobile',
                  value: P_mobile
                });
                _context.next = 4;
                return callZf_jslib('register/saler/fetchdata/', 'getsalerinfo', param, 2);

              case 4:
                s = _context.sent;
                return _context.abrupt("return", s);

              case 6:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      return function call_getsalerinfo(_x) {
        return _ref.apply(this, arguments);
      };
    }();

    var Do_getsalerinfo = /*#__PURE__*/function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        var mobileuser, info;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                mobileuser = localStorage.getItem('token');
                _context2.next = 3;
                return call_getsalerinfo(mobileuser);

              case 3:
                info = _context2.sent;
                $('#user').html(info[0].FIRSTNAME + " " + info[0].LASTNAME);
                $('#username').html(info[0].FIRSTNAME + " " + info[0].LASTNAME);

              case 6:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      return function Do_getsalerinfo() {
        return _ref2.apply(this, arguments);
      };
    }();

    Do_getsalerinfo();
  } else {//must be open after edition end ------------------------------------------------------------------------------
    // window.location.replace('../public/pages/loginsaler.html')
  } //=================================dynamic sammy 


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
      this.get('#/tabel', function () {
        this.app.swap('');
        this.partial('partial/tabel.html');
      });
    });
    $(function () {
      app.run('#/');
    });
  })(jQuery); //--- end of sammy 
  //exit of admin page ===== 


  $('#acceptExit').on('click', function () {
    window.location.assign(window.location.origin + "/ZSHOP/SHOP/index.html");
    localStorage.clear();
  });
});