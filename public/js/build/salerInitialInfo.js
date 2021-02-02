function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

$(document).ready(function () {
  var username = $('#name');
  var nationalcode = $('#nationalCodUser');
  var fname = $('#familyUser');
  var postalcode = $('#postalCodUser');
  var email = $('#emailUser'); //valid input

  nationalcode.on('change', function () {
    NationalCode($(this), $("#alertNationalCod"));
  });
  postalcode.on('change', function () {
    IsIranPostalCode($(this), $('#alertPosatlcode'));
  });
  email.on('change', function () {
    ValidateEmail($(this), $('#alertEmail'));
  }); //check required

  username.on('change', function () {
    checkRequired($(this), $('#alertName'));
  }); //show caledaer in input ==============================

  $("#date-id").pDatepicker({
    observer: true,
    format: 'YYYY/MM/DD'
  }); //zfram function=======================================

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

  function Do_setinitialinfo() {
    return _Do_setinitialinfo.apply(this, arguments);
  } //Do required and subit ===================================================


  function _Do_setinitialinfo() {
    _Do_setinitialinfo = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
      var fname, lname, ncode, birthday, postcod, email, addUser, s, mid;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              debugger;
              fname = $("#name").val();
              lname = $('#fname').val();
              ncode = $('#nationalCodUser').val();
              birthday = toEnglishDigits($('#date-id').val());
              postcod = $('#postalCodUser').val();
              email = $('#emailUser').val();
              addUser = $('#addUser').val();
              _context2.next = 10;
              return call_setinitialinfo(fname, lname, ncode, birthday, postcod, email, addUser);

            case 10:
              s = _context2.sent;
              mid = s.Mid;

              if (mid == 1) {
                window.location.replace('./salerInitialInfoF.html');
              } else {
                alert('خطایی در سیستم رخ داده لطفا مجدد تلاش کنید ');
              }

            case 13:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));
    return _Do_setinitialinfo.apply(this, arguments);
  }

  var submit = document.getElementById('formInfo');
  submit.addEventListener('submit', function (e) {
    debugger;
    e.preventDefault();
    var check1 = checkRequired($("#name"), $('#alertName'));
    var check2 = checkRequired($('#fname'), $('#alertFname'));
    var check3 = checkRequired($('#nationalCodUser'), $('#alertNationalCod'));
    var check4 = checkRequired($('#date-id'), $('#alertDate'));
    var check5 = checkRequired($('#postalCodUser'), $('#alertPosatlcode'));
    var check6 = checkRequired($('#emailUser'), $('#alertEmail'));

    if (check1 && check2 && check3 && check4 && check5 && check6) {
      Do_setinitialinfo();
    } else {
      $("#nameUser").select();
    }
  });
});