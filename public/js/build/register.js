function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

$(document).ready(function () {
  //call geting recaPTCHA IMGAE.
  loadimage();

  function call_getcaptcha(_x) {
    return _call_getcaptcha.apply(this, arguments);
  }

  function _call_getcaptcha() {
    _call_getcaptcha = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(P_value) {
      var param, s;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              param = [];
              param.push({
                name: 'value',
                value: P_value
              });
              _context.next = 4;
              return callZf_jslib('security/captcha/', 'getcaptcha', param, 1);

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
    return _call_getcaptcha.apply(this, arguments);
  }

  function loadimage() {
    return _loadimage.apply(this, arguments);
  } //check mobile and captcha be sync ---------------------------------


  function _loadimage() {
    _loadimage = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
      var c, dataimage;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return call_getcaptcha('1234567899');

            case 2:
              c = _context2.sent;
              dataimage = c.chimage;
              imgcaptcha.src = "data:image/png;base64," + dataimage;

            case 5:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));
    return _loadimage.apply(this, arguments);
  }

  function call_checkmobileno(_x2, _x3, _x4) {
    return _call_checkmobileno.apply(this, arguments);
  }

  function _call_checkmobileno() {
    _call_checkmobileno = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(P_captcha, P_mobileno, P_password) {
      var param, s;
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              param = [];
              param.push({
                name: 'captcha',
                value: P_captcha
              });
              param.push({
                name: 'mobileno',
                value: P_mobileno
              });
              param.push({
                name: 'password',
                value: P_password
              });
              _context3.next = 6;
              return callZf_jslib('security/reg/', 'checkmobileno', param, 2);

            case 6:
              s = _context3.sent;
              return _context3.abrupt("return", s);

            case 8:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    }));
    return _call_checkmobileno.apply(this, arguments);
  }

  function DoVerify() {
    return _DoVerify.apply(this, arguments);
  } //valid mobile test of form with valid function -----------


  function _DoVerify() {
    _DoVerify = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
      var capthca_code, mobile_no, password, c, mid;
      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              capthca_code = txtcaptcha.value;
              mobile_no = usermobile.value;
              password = userpassword.value; //var test= IsIranPhone(mobile_no);

              _context4.next = 5;
              return call_checkmobileno(capthca_code, mobile_no, password);

            case 5:
              c = _context4.sent;
              mid = c.Mid;

              if (mid == 4) {
                //alert(mid);
                //console.log(window.history);
                //window.history.pushState({}, null, '/ZSHOP/SHOP/verifycode.html');
                window.location.replace("./verifycode.html");
              } //alert(mid);


            case 8:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4);
    }));
    return _DoVerify.apply(this, arguments);
  }

  $("#usermobile").on('change', function () {
    var showmessage = $("#validMobile");
    var checkmobile = IsIranPhone($(this), showmessage);

    if (checkmobile) {
      $('#cmdcheck').removeAttr('disabled');
    } else {
      $('#cmdcheck').attr('disabled', 'disabled');
    }
  }); //valid password enter check ------------------------------   

  $("#userpassword").on('change', function () {
    var showmessage = $("#validpassword");
    var checkpassword = IsPassword($(this), showmessage);

    if (checkpassword) {
      $('#cmdcheck').removeAttr('disabled');
    } else {
      $('#cmdcheck').attr('disabled', 'disabled');
    }
  }); //show passsword by click blink icon 

  var icon = document.getElementById('iconpass');
  var inputTarget = document.getElementById('userpassword');
  togglePassword(icon, inputTarget); //submit form

  $('#signForm').on('submit', function (e) {
    e.preventDefault();
    DoVerify();
  }); //relaod captcha from server 

  var reload = document.getElementById("repeatCaptcha");
  reload.addEventListener("click", function () {
    loadimage();
  });
});