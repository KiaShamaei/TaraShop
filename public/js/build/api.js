function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function includeHTML() {
  var z, i, elmnt, file, xhttp;
  /* Loop through a collection of all HTML elements: */

  z = document.getElementsByTagName("*");

  for (i = 0; i < z.length; i++) {
    elmnt = z[i];
    /*search for elements with a certain atrribute:*/

    file = elmnt.getAttribute("ZJ-INCLUDE");

    if (file) {
      /* Make an HTTP request using the attribute value as the file name: */
      xhttp = new XMLHttpRequest();

      xhttp.onreadystatechange = function () {
        if (this.readyState == 4) {
          if (this.status == 200) {
            elmnt.innerHTML = this.responseText;
          }

          if (this.status == 404) {
            elmnt.innerHTML = "Page not found.";
          }
          /* Remove the attribute, and call this function once more: */


          elmnt.removeAttribute("ZJ-INCLUDE");
          includeHTML();
        }
      };

      xhttp.open("GET", file, true);
      xhttp.send();
      /* Exit the function: */

      return;
    }
  }
}

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

function call_reguser(_x2, _x3, _x4, _x5, _x6, _x7) {
  return _call_reguser.apply(this, arguments);
}

function _call_reguser() {
  _call_reguser = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(P_mobileno, P_email, P_password, P_captha, P_fname, P_lname) {
    var param, s;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            param = [];
            param.push({
              name: 'mobileno',
              value: P_mobileno
            });
            param.push({
              name: 'email',
              value: P_email
            });
            param.push({
              name: 'password',
              value: P_password
            });
            param.push({
              name: 'captha',
              value: P_captha
            });
            param.push({
              name: 'fname',
              value: P_fname
            });
            param.push({
              name: 'lname',
              value: P_lname
            });
            _context2.next = 9;
            return callZf_jslib('activity/register/', 'reguser', param, 2);

          case 9:
            s = _context2.sent;
            return _context2.abrupt("return", s);

          case 11:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _call_reguser.apply(this, arguments);
}

function call_loginuser(_x8, _x9, _x10) {
  return _call_loginuser.apply(this, arguments);
}

function _call_loginuser() {
  _call_loginuser = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(P_mobileno, P_password, P_captha) {
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
  return _call_loginuser.apply(this, arguments);
}

function call_getmenubyid(_x11) {
  return _call_getmenubyid.apply(this, arguments);
}

function _call_getmenubyid() {
  _call_getmenubyid = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(P_category_id) {
    var param, s;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            param = [];
            param.push({
              name: 'category_id',
              value: P_category_id
            });
            _context4.next = 4;
            return callZf_jslib('ui/view/menu/', 'getmenubyid', param, 2);

          case 4:
            s = _context4.sent;
            return _context4.abrupt("return", s);

          case 6:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));
  return _call_getmenubyid.apply(this, arguments);
}