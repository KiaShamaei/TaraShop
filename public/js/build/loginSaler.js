function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

//-----------------valid test of form with valid function -----------
$("#useremail").on('change', function () {
  var showmessage = $("#validEmail");
  ValidateEmail($(this), showmessage);
}); //get captcha image==zfram service

function call_getcaptcha(_x) {
  return _call_getcaptcha.apply(this, arguments);
}

function _call_getcaptcha() {
  _call_getcaptcha = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(P_value) {
    var param, s;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            param = [];
            param.push({
              name: 'value',
              value: P_value
            });
            _context3.next = 4;
            return callZf_jslib('security/captcha/', 'getcaptcha', param, 1);

          case 4:
            s = _context3.sent;
            return _context3.abrupt("return", s);

          case 6:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));
  return _call_getcaptcha.apply(this, arguments);
}

function loadimage() {
  return _loadimage.apply(this, arguments);
}

function _loadimage() {
  _loadimage = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
    var c, dataimage;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return call_getcaptcha('1234567899');

          case 2:
            c = _context4.sent;
            dataimage = c.chimage;
            imgcaptcha.src = "data:image/png;base64," + dataimage;

          case 5:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));
  return _loadimage.apply(this, arguments);
}

$(document).ready(function () {
  loadimage(); //------------------------------------zfram api code ----------------

  function call_registersaler(_x2, _x3, _x4) {
    return _call_registersaler.apply(this, arguments);
  }

  function _call_registersaler() {
    _call_registersaler = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(P_email, P_mobile, P_captcha) {
      var param, s;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              param = [];
              param.push({
                name: 'email',
                value: P_email
              });
              param.push({
                name: 'mobile',
                value: P_mobile
              });
              param.push({
                name: 'captcha',
                value: P_captcha
              });
              _context.next = 6;
              return callZf_jslib('activity/register/', 'registersaler', param, 2);

            case 6:
              s = _context.sent;
              return _context.abrupt("return", s);

            case 8:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));
    return _call_registersaler.apply(this, arguments);
  }

  function Do_registersaler(_x5, _x6, _x7) {
    return _Do_registersaler.apply(this, arguments);
  }

  function _Do_registersaler() {
    _Do_registersaler = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(useremail, usermobile, captcha) {
      var response;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return call_registersaler(useremail, usermobile, captcha);

            case 2:
              response = _context2.sent;

              if (response.Mid == 4) {
                localStorage.setItem("token", response.Mid);
                window.location.replace('./registerSalerVerifyCode.html');
              }

            case 4:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));
    return _Do_registersaler.apply(this, arguments);
  }

  $("#form").on("submit", function (e) {
    var useremail = $("#useremail").val();
    console.log(useremail);
    var usermobile = $("#usermobile").val();
    var captcha = $("#txtcaptcha").val();
    e.preventDefault();
    Do_registersaler(useremail, usermobile, captcha);
  });
});