function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var userItem = document.getElementById("userItem");
var userEntity = localStorage.getItem('userItem');
var userName = localStorage.getItem('userName');
var userId = localStorage.getItem('userId');
userItem.textContent = userName;
var userPasswordForm = document.getElementById("userpass");
var password = "";

function call_checkpassword(_x, _x2) {
  return _call_checkpassword.apply(this, arguments);
}

function _call_checkpassword() {
  _call_checkpassword = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(P_password, P_entityid) {
    var param, s;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            param = [];
            param.push({
              name: 'password',
              value: P_password
            });
            param.push({
              name: 'entityid',
              value: P_entityid
            });
            _context2.next = 5;
            return callZf_jslib('activity/loginuser/checkpassword/', 'checkpassword', param, 2);

          case 5:
            s = _context2.sent;
            return _context2.abrupt("return", s);

          case 7:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _call_checkpassword.apply(this, arguments);
}

var alertMessage = document.getElementById("alertMessage");

var do_validity = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(item1, item2) {
    var result;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return call_checkpassword(item1, item2);

          case 2:
            result = _context.sent;

            if (result.Mid == 0) {
              alertMessage.style.display = "block";
            } else {
              window.location.replace("/ZSHOP/SHOP/index.html");
            }

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function do_validity(_x3, _x4) {
    return _ref.apply(this, arguments);
  };
}();

userPasswordForm.addEventListener('submit', function (e) {
  debugger;
  e.preventDefault();
  password = e.target.elements[0].value;
  do_validity(password, userId);
  localStorage.removeItem('userId');
});
localStorage.removeItem('userName');