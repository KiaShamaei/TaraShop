function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var username = document.querySelector('#username');
var formSignin = document.querySelector('#formSignin');
var alertMessage = document.getElementById("alertMessage"); //zfarma code to call services 

var GetdataZfram = /*#__PURE__*/function () {
  function GetdataZfram() {
    _classCallCheck(this, GetdataZfram);
  }

  _createClass(GetdataZfram, [{
    key: "call_existaccountuser",
    value: function () {
      var _call_existaccountuser = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(P_emailmobile) {
        var param, s;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                param = [];
                param.push({
                  name: 'emailmobile',
                  value: P_emailmobile
                });
                _context.next = 4;
                return callZf_jslib('activity/account/', 'existaccountuser', param, 2);

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

      function call_existaccountuser(_x) {
        return _call_existaccountuser.apply(this, arguments);
      }

      return call_existaccountuser;
    }()
  }, {
    key: "do_existaccountuser",
    value: function () {
      var _do_existaccountuser = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(item) {
        var result;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return this.call_existaccountuser(item);

              case 2:
                result = _context2.sent;
                if (result.Mid == 0) alertMessage.style.display = "block";else {
                  //     const fullname = result.MName + "-" + result.MLastname;
                  //    localStorage.setItem('userItem', fullname );
                  //    localStorage.setItem('userId', result.Mid);
                  //    localStorage.setItem('userName' , item)
                  localStorage.setItem("userInfo", JSON.stringify(result));
                  window.location.replace("/ZSHOP/SHOP/public/pages/signin.html");
                }

              case 4:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function do_existaccountuser(_x2) {
        return _do_existaccountuser.apply(this, arguments);
      }

      return do_existaccountuser;
    }()
  }]);

  return GetdataZfram;
}();

var getdataZfram = new GetdataZfram();
formSignin.addEventListener('submit', function (e) {
  e.preventDefault();
  var checkinput = checkRequired($('#username'), $("#alertMesssage"));

  if (checkinput) {
    getdataZfram.do_existaccountuser($('#username').val());
  }
});