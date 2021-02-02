function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

//zfarma code to call services 
function call_existaccountuser(_x) {
  return _call_existaccountuser.apply(this, arguments);
}

function _call_existaccountuser() {
  _call_existaccountuser = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(P_emailmobile) {
    var param, s;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            param = [];
            param.push({
              name: 'emailmobile',
              value: P_emailmobile
            });
            _context2.next = 4;
            return callZf_jslib('activity/account/', 'existaccountuser', param, 2);

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
  return _call_existaccountuser.apply(this, arguments);
}

var alertMessage = document.getElementById("alertMessage");

var do_existaccountuser = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(item) {
    var result, fullname;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return call_existaccountuser(item);

          case 2:
            result = _context.sent;
            if (result.Mid == 0) alertMessage.style.display = "block";else {
              fullname = result.MName + "-" + result.MLastname;
              localStorage.setItem('userItem', fullname);
              localStorage.setItem('userId', result.Mid);
              localStorage.setItem('userName', item);
              window.location.replace("/ZSHOP/SHOP/Register/signin.html");
            }

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function do_existaccountuser(_x2) {
    return _ref.apply(this, arguments);
  };
}();

var username = document.querySelector('#username');
var formSignin = document.querySelector('#formSignin');
formSignin.addEventListener('submit', function (e) {
  debugger;
  e.preventDefault();
  var checkinput = checkRequired($('#username'), $("#alertMesssage"));

  if (checkinput) {
    do_existaccountuser($('#username').val());
  }
});