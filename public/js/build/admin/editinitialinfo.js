function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

$(document).ready(function () {
  var username = $('#name');
  var nationalcode = $('#nationalCodUser');
  var fname = $('#familyUser');
  var postalcode = $('#postalCodUser');
  var email = $('#emailUser');
  var mobile = $('#mobileuser'); //valid input

  nationalcode.on('change', function () {
    NationalCode($(this), $("#alertNationalCod"));
  });
  postalcode.on('change', function () {
    IsIranPostalCode($(this), $('#alertPosatlcode'));
  });
  email.on('change', function () {
    ValidateEmail($(this), $('#alertEmail'));
  });
  mobile.on('change', function () {
    IsIranPhone($(this), $("#alertmobile"));
  }); //check required

  username.on('change', function () {
    checkRequired($(this), $('#alertName'));
  }); //show calender in input ==============================

  $("#date-id").pDatepicker({
    observer: true,
    format: 'YYYY/MM/DD'
  }); //get from zfram services ---------------------

  var GetInfo = /*#__PURE__*/function () {
    function GetInfo() {
      _classCallCheck(this, GetInfo);
    }

    _createClass(GetInfo, [{
      key: "call_getsalerinfo",
      value: function () {
        var _call_getsalerinfo = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(P_mobile) {
          var param, s;
          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  param = [];
                  param.push({
                    name: 'mobile',
                    value: P_mobile
                  });
                  _context.next = 4;
                  return callZf_jslib('register/saler/fetchdata/', 'getsalerinfo', param, 2);

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

        function call_getsalerinfo(_x) {
          return _call_getsalerinfo.apply(this, arguments);
        }

        return call_getsalerinfo;
      }()
    }, {
      key: "Do_getsalerinfo",
      value: function () {
        var _Do_getsalerinfo = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
          var userInfo, info, form;
          return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  userInfo = JSON.parse(localStorage.getItem('userInfo'));
                  _context2.next = 3;
                  return this.call_getsalerinfo(userInfo.Mid);

                case 3:
                  info = _context2.sent;
                  //localStorage.setItem('id',info[0].ENTITY_ID);
                  form = $('#formInfo');
                  $('#name').val(info[0].FIRSTNAME);
                  $('#fname').val(info[0].LASTNAME);
                  $('#parentuser').val(info[0].FATHER_NAME);
                  $('#mobileuser').val(info[0].MOBILE);
                  $('#nationalCodUser').val(info[0].NATIONALCODE);
                  $('#emailUser').val(info[0].EMAIL_ADDRESS);
                  $('#postalCodUser').val(info[0].POSTAL_CODE);
                  $('#addUser').val(info[0].MAIN_ADDRESS);
                  $('#date-id').val(info[0].BIRTHDATE);

                case 14:
                case "end":
                  return _context2.stop();
              }
            }
          }, _callee2, this);
        }));

        function Do_getsalerinfo() {
          return _Do_getsalerinfo.apply(this, arguments);
        }

        return Do_getsalerinfo;
      }()
    }]);

    return GetInfo;
  }();

  var getinfo = new GetInfo();
  getinfo.Do_getsalerinfo(); //after edit store edition in databased 

  var SubmitEdit = /*#__PURE__*/function () {
    function SubmitEdit() {
      _classCallCheck(this, SubmitEdit);
    }

    _createClass(SubmitEdit, [{
      key: "call_setinitialinfo",
      value: function () {
        var _call_setinitialinfo = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(P_name, P_fname, P_nationalcode, P_birthday, P_postalcode, P_emailaddress, P_address) {
          var param, s;
          return regeneratorRuntime.wrap(function _callee3$(_context3) {
            while (1) {
              switch (_context3.prev = _context3.next) {
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
                  _context3.next = 10;
                  return callZf_jslib('register/setinfo/', 'setinitialinfo', param, 2);

                case 10:
                  s = _context3.sent;
                  return _context3.abrupt("return", s);

                case 12:
                case "end":
                  return _context3.stop();
              }
            }
          }, _callee3);
        }));

        function call_setinitialinfo(_x2, _x3, _x4, _x5, _x6, _x7, _x8) {
          return _call_setinitialinfo.apply(this, arguments);
        }

        return call_setinitialinfo;
      }()
    }, {
      key: "Do_setinitialinfo",
      value: function () {
        var _Do_setinitialinfo = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
          var fname, lname, ncode, birthday, postcod, email, addUser, s, mid;
          return regeneratorRuntime.wrap(function _callee4$(_context4) {
            while (1) {
              switch (_context4.prev = _context4.next) {
                case 0:
                  fname = $("#name").val();
                  lname = $('#fname').val();
                  ncode = $('#nationalCodUser').val();
                  birthday = toEnglishDigits($('#date-id').val());
                  postcod = $('#postalCodUser').val();
                  email = $('#emailUser').val();
                  addUser = $('#addUser').val();
                  _context4.next = 9;
                  return this.call_setinitialinfo(fname, lname, ncode, birthday, postcod, email, addUser);

                case 9:
                  s = _context4.sent;
                  mid = s.Mid;

                  if (mid == 1) {
                    $('#editAccept').modal('show'); //var ss=window.location.origin+"/ZSHOP/SHOP/admin/index.html";
                    // window.location.assign(window.location.origin+"/ZSHOP/SHOP/admin/index.html");
                    //window.location.replace("#/redirect");
                  } else {
                    alert('خطایی در سیستم رخ داده لطفا مجدد تلاش کنید ');
                  }

                case 12:
                case "end":
                  return _context4.stop();
              }
            }
          }, _callee4, this);
        }));

        function Do_setinitialinfo() {
          return _Do_setinitialinfo.apply(this, arguments);
        }

        return Do_setinitialinfo;
      }()
    }]);

    return SubmitEdit;
  }(); //submitpart with zfram function in submitedit class------------


  $("#formInfo").on('submit', function (e) {
    e.preventDefault();
    var submitedit = new SubmitEdit();
    var check1 = checkRequired($("#name"), $('#alertName'));
    var check2 = checkRequired($('#fname'), $('#alertFname'));
    var check3 = checkRequired($('#nationalCodUser'), $('#alertNationalCod'));
    var check4 = checkRequired($('#date-id'), $('#alertDate'));
    var check5 = checkRequired($('#postalCodUser'), $('#alertPosatlcode'));
    var check6 = checkRequired($('#emailUser'), $('#alertEmail'));

    if (check1 && check2 && check3 && check4 && check5 && check6) {
      submitedit.Do_setinitialinfo();
    } else {
      $("#nameUser").select();
    }
  });
  $('#acceptEdit').on('click', function () {
    window.location.assign(window.location.origin + "/ZSHOP/SHOP/admin/index.html");
  });
});