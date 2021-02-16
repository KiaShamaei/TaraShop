function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var userItem = document.getElementById("userItem");
var userEntity = localStorage.getItem('userItem');
var userName = localStorage.getItem('userName');
var userId = localStorage.getItem('userId');
userItem.textContent = userName;
var userPasswordForm = document.getElementById("userpass");
var alertMessage = document.getElementById("alertMessage");
var password = "";
var icon = document.getElementById('passIcon');
var inputTarget = document.getElementById('userpassword'); //toggleshow password ==================================================
//show passsword by click blink icon 

togglePassword(icon, inputTarget); //do zfram chseck passsword 

var GetDatazframe = /*#__PURE__*/function () {
  function GetDatazframe() {
    _classCallCheck(this, GetDatazframe);
  }

  _createClass(GetDatazframe, [{
    key: "call_checkpassword",
    value: function () {
      var _call_checkpassword = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(P_password, P_entityid) {
        var param, s;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
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
                _context.next = 5;
                return callZf_jslib('activity/loginuser/checkpassword/', 'checkpassword', param, 2);

              case 5:
                s = _context.sent;
                return _context.abrupt("return", s);

              case 7:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function call_checkpassword(_x, _x2) {
        return _call_checkpassword.apply(this, arguments);
      }

      return call_checkpassword;
    }()
  }, {
    key: "do_validity",
    value: function () {
      var _do_validity = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(item1, item2) {
        var result, userlog;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return this.call_checkpassword(item1, item2);

              case 2:
                result = _context2.sent;

                if (result.Mid == 0) {
                  this.alertMessage.style.display = "block";
                } else {
                  userlog = localStorage.getItem('userItem');
                  localStorage.setItem('userlog', userlog);
                  localStorage.removeItem('userItem');
                  window.location.replace("/ZSHOP/SHOP/index.html");
                }

              case 4:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function do_validity(_x3, _x4) {
        return _do_validity.apply(this, arguments);
      }

      return do_validity;
    }()
  }]);

  return GetDatazframe;
}();

var getdataZfram = new GetDatazframe();
userPasswordForm.addEventListener('submit', function (e) {
  e.preventDefault();
  password = e.target.elements[0].value;
  getdataZfram.do_validity(password, userId);
  localStorage.removeItem('userId');
  localStorage.removeItem('userName');
});