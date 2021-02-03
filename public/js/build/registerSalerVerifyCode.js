function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function call_verifycode(_x) {
  return _call_verifycode.apply(this, arguments);
}

function _call_verifycode() {
  _call_verifycode = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(P_verifycode) {
    var param, s;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            param = [];
            param.push({
              name: 'verifycode',
              value: P_verifycode
            });
            _context2.next = 4;
            return callZf_jslib('security/verify/', 'verifycode', param, 1);

          case 4:
            s = _context2.sent;
            return _context2.abrupt("return", s);

          case 6:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _call_verifycode.apply(this, arguments);
}

var formSubmit = $('#form');
var code = $('#pwd');
formSubmit.on('submit', /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(e) {
    var c;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            e.preventDefault();
            _context.next = 3;
            return call_verifycode(code.val());

          case 3:
            c = _context.sent;

            if (c.Mid == 1) {
              window.location.replace("./salerInitialInfo.html"); //alert('Accept Code')
            } else {
              $('#alert').html('کد وارد شده صحیح نمی باشد ');
            }

          case 5:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function (_x2) {
    return _ref.apply(this, arguments);
  };
}());