function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

$(document).ready(function () {
  //data picker and show ======================================================
  $("#date-id").pDatepicker({
    observer: true,
    format: 'YYYY/MM/DD'
  }); //check validation

  $("#nationalCodUser").on('change', function () {
    NationalCode($(this), $("#alertNationalCod"));
  });
  $("#postalCodUser").on('change', function () {
    IsIranPostalCode($(this), $('#alertPosatlcode'));
  });
  $('#eUser').on('change', function () {
    ValidateEmail($(this), $('#alertEmail'));
  }); //show caledaer in input ==============================

  $("#date-id").pDatepicker({
    observer: true,
    format: 'YYYY/MM/DD'
  }); //submit form part -----------------------------------------------------------

  var submit = document.getElementById('formInfo');
  submit.addEventListener('submit', function (e) {
    e.preventDefault();
    var fname = $("#nameUser").val();
    var lname = $('#familyUser').val();
    var ncode = $('#nationalCodUser').val();
    var birthday = toEnglishDigits($('#date-id').val());
    var postcod = $('#postalCodUser').val();
    var email = $('#emailUser').val();
    var addUser = $('#addUser').val();
    var check1 = checkRequired($("#nameUser"), $('#alertName'));
    var check2 = checkRequired($('#familyUser'), $('#alertFName'));
    var check3 = checkRequired($('#nationalCodUser'), $('#alertNationalCod'));
    var check4 = checkRequired($('#date-id'), $('#alertDate'));
    var check5 = checkRequired($('#postalCodUser'), $('#alertPosatlcode'));
    var check6 = checkRequired($('#emailUser'), $('#alertEmail'));

    if (check1 && check2 && check3 && check4 && check5 && check6) {
      Do_setinitialinfo(fname, lname, ncode, birthday, postcod, email, addUser);
    } else {
      $("#nameUser").select();
    }
  }); //zframe call service part =====================================================

  function call_setinitialinfo(_x, _x2, _x3, _x4, _x5, _x6, _x7) {
    return _call_setinitialinfo.apply(this, arguments);
  }

  function _call_setinitialinfo() {
    _call_setinitialinfo = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(P_name, P_fname, P_nationalcode, P_birthday, P_postalcode, P_emailaddress, P_address) {
      var param, s;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              param = [];
              param.push({
                name: 'name',
                value: P_name
              });
              param.push({
                name: 'fname',
                value: P_fname
              });
              param.push({
                name: 'nationalcode',
                value: P_nationalcode
              });
              param.push({
                name: 'birthday',
                value: P_birthday
              });
              param.push({
                name: 'postalcode',
                value: P_postalcode
              });
              param.push({
                name: 'emailaddress',
                value: P_emailaddress
              });
              param.push({
                name: 'address',
                value: P_address
              });
              _context.next = 10;
              return callZf_jslib('register/setinfo/', 'setinitialinfo', param, 2);

            case 10:
              s = _context.sent;
              return _context.abrupt("return", s);

            case 12:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));
    return _call_setinitialinfo.apply(this, arguments);
  }

  function Do_setinitialinfo(_x8, _x9, _x10, _x11, _x12, _x13, _x14) {
    return _Do_setinitialinfo.apply(this, arguments);
  }

  function _Do_setinitialinfo() {
    _Do_setinitialinfo = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(fname, lname, ncode, birthday, postcod, email, addUser) {
      var s, mid;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return call_setinitialinfo(fname, lname, ncode, birthday, postcod, email, addUser);

            case 2:
              s = _context2.sent;
              mid = s.Mid;

              if (mid == 1) {
                window.location.replace('./signinOrRegister.html');
              } else {
                alert('Deny');
              }

            case 5:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));
    return _Do_setinitialinfo.apply(this, arguments);
  }

  function toEnglishDigits(str) {
    var persianNumbers = ["۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹", "۰"];
    var arabicNumbers = ["١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩", "٠"];
    var englishNumbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];
    return str.split("").map(function (c) {
      return englishNumbers[persianNumbers.indexOf(c)] || englishNumbers[arabicNumbers.indexOf(c)] || c;
    }).join("");
  }
});