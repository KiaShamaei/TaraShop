function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var doZframe = /*#__PURE__*/function () {
  function doZframe() {
    _classCallCheck(this, doZframe);
  }

  _createClass(doZframe, [{
    key: "call_verifycode",
    value: function () {
      var _call_verifycode = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(P_verifycode) {
        var param, s;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                param = [];
                param.push({
                  name: 'verifycode',
                  value: P_verifycode
                });
                _context.next = 4;
                return callZf_jslib('security/verify/', 'verifycode', param, 1);

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

      function call_verifycode(_x) {
        return _call_verifycode.apply(this, arguments);
      }

      return call_verifycode;
    }()
  }, {
    key: "check_verify",
    value: function () {
      var _check_verify = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        var passCode, c;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                //event.preventDefault();
                passCode = $('#pwd').val();
                _context2.next = 3;
                return this.call_verifycode(passCode);

              case 3:
                c = _context2.sent;

                if (c.Mid == 1) {
                  window.location.replace("./initialInfo.html"); //alert('Accept Code')
                } else {
                  alert('کد ارسالی اشتباه وارد شده لطفا مجدد تلاش کنید ');
                }

              case 5:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function check_verify() {
        return _check_verify.apply(this, arguments);
      }

      return check_verify;
    }()
  }]);

  return doZframe;
}();

$('#verifyForm').on('submit', function (e) {
  e.preventDefault();
  var dozee = new doZframe();
  dozee.check_verify();
});