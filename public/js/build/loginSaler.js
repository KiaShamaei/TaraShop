function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

$(document).ready(function () {
  //-----------------valid test of form with valid function -----------
  $("#usermobile").on('change', function () {
    var showmessage = $("#validusermobile");
    IsIranPhone($(this), showmessage);
  });

  var GetCaptcha = /*#__PURE__*/function () {
    function GetCaptcha() {
      _classCallCheck(this, GetCaptcha);
    }

    _createClass(GetCaptcha, [{
      key: "call_getcaptcha",
      //get captcha image==zfram service
      value: function () {
        var _call_getcaptcha = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(P_value) {
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

        function call_getcaptcha(_x) {
          return _call_getcaptcha.apply(this, arguments);
        }

        return call_getcaptcha;
      }()
    }, {
      key: "loadimage",
      value: function () {
        var _loadimage = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
          var c, dataimage;
          return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  _context2.next = 2;
                  return this.call_getcaptcha('1234567899');

                case 2:
                  c = _context2.sent;
                  dataimage = c.chimage;
                  imgcaptcha.src = "data:image/png;base64," + dataimage;

                case 5:
                case "end":
                  return _context2.stop();
              }
            }
          }, _callee2, this);
        }));

        function loadimage() {
          return _loadimage.apply(this, arguments);
        }

        return loadimage;
      }()
    }]);

    return GetCaptcha;
  }();

  var getcaptcha = new GetCaptcha();
  getcaptcha.loadimage(); //------------------------------------zfram api code ----------------

  var Login = /*#__PURE__*/function () {
    function Login() {
      _classCallCheck(this, Login);
    }

    _createClass(Login, [{
      key: "call_loginuser",
      value: function () {
        var _call_loginuser = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(P_mobileno, P_password, P_captha) {
          var param, s;
          return regeneratorRuntime.wrap(function _callee3$(_context3) {
            while (1) {
              switch (_context3.prev = _context3.next) {
                case 0:
                  param = [];
                  param.push({
                    name: 'mobileno',
                    value: P_mobileno
                  });
                  param.push({
                    name: 'password',
                    value: P_password
                  });
                  param.push({
                    name: 'captha',
                    value: P_captha
                  });
                  _context3.next = 6;
                  return callZf_jslib('activity/loginuser/', 'loginuser', param, 2);

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

        function call_loginuser(_x2, _x3, _x4) {
          return _call_loginuser.apply(this, arguments);
        }

        return call_loginuser;
      }()
    }, {
      key: "Do_loginuser",
      value: function () {
        var _Do_loginuser = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(usermobile, userpass, captcha) {
          var response;
          return regeneratorRuntime.wrap(function _callee4$(_context4) {
            while (1) {
              switch (_context4.prev = _context4.next) {
                case 0:
                  _context4.next = 2;
                  return this.call_loginuser(usermobile, userpass, captcha);

                case 2:
                  response = _context4.sent;

                  if (response.Mid > 0) {
                    localStorage.setItem("token", response.Mid);
                    localStorage.setItem('id', response.ENTITYID);
                    window.location.replace('../../admin/index.html');
                  } else if (response.Mid == 0) {
                    $('#validusermobile').html('رمز عبور اشتباه است ');
                  } else if (response.Mid == -1) {
                    $('#validusermobile').html('کد کپچا اشتباه است ');
                  }

                case 4:
                case "end":
                  return _context4.stop();
              }
            }
          }, _callee4, this);
        }));

        function Do_loginuser(_x5, _x6, _x7) {
          return _Do_loginuser.apply(this, arguments);
        }

        return Do_loginuser;
      }()
    }]);

    return Login;
  }(); //submit login -------------------------


  var login = new Login();
  $("#form").on("submit", function (e) {
    e.preventDefault();
    var usermobile = $("#usermobile").val();
    var userpass = $("#userpassword").val();
    var captcha = $("#txtcaptcha").val();
    login.Do_loginuser(usermobile, userpass, captcha);
  }); //toggleshow password ==================================================
  //show passsword by click blink icon 

  var icon = document.getElementById('passIcon');
  var inputTarget = document.getElementById('userpassword');
  togglePassword(icon, inputTarget); // const iconre = document.getElementById('repassIcon');
  // const inputTargetre = document.getElementById('repassword')
  // togglePassword(iconre, inputTargetre);
});