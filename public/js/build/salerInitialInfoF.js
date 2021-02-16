function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

$(document).ready(function () {
  var ecoNum = $("#ecoNum");
  var storeNcode = $('#storeNcode');
  var telStore = $('#telStore');
  var faxStore = $('#faxStore');
  var postalCodStore = $('#postalCodStore');
  var cityNum = $('#cityNum');
  var emailStore = $('#emailStore'); //valid feild only number =====================================================

  ecoNum.on('change', function () {
    IsNumber($(this), $('#alertecoNum'));
  });
  storeNcode.on('change', function () {
    IsNumber($(this), $('#alertstoreNcode'));
  });
  telStore.on('change', function () {
    IsNumber($(this), $('#alertetelStore'));
  });
  faxStore.on('change', function () {
    IsNumber($(this), $('#alertfaxStore'));
  });
  cityNum.on('change', function () {
    IsNumber($(this), $('#alertcityNum'));
  }); //time output manage ========================================================

  document.querySelectorAll('.time').forEach(function (e) {
    return e.oninput = function () {
      // Always 2 digits
      if (e.value.length >= 2) e.value = e.value.slice(0, 2); // 0 on the left (doesn't work on FF)

      if (e.value.length === 1) e.value = '0' + e.value; // Avoiding letters on FF

      if (!e.value) e.value = '00';
    };
  }); //valid postal add 

  postalCodStore.on('change', function () {
    IsNumber($(this), $('#alertpostalCodStore'));
    IsIranPostalCode($(this), $('#alertpostalCodStore'));
  }); //valid email ==================================

  emailStore.on('change', function () {
    ValidateEmail($(this), $('#alertemailStore'));
  }); //get city from province in select

  function call_getcityfromprfovaince(_x) {
    return _call_getcityfromprfovaince.apply(this, arguments);
  } //state provinces get 


  function _call_getcityfromprfovaince() {
    _call_getcityfromprfovaince = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(P_province_id) {
      var param, s;
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              param = [];
              param.push({
                name: 'province_id',
                value: P_province_id
              });
              _context3.next = 4;
              return callZf_jslib('common/', 'getcityfromprfovaince', param, 2);

            case 4:
              s = _context3.sent;
              return _context3.abrupt("return", s);

            case 6:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    }));
    return _call_getcityfromprfovaince.apply(this, arguments);
  }

  function call_getproviancelist() {
    return _call_getproviancelist.apply(this, arguments);
  }

  function _call_getproviancelist() {
    _call_getproviancelist = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
      var param, s;
      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              param = [];
              _context4.next = 3;
              return callZf_jslib('common/', 'getproviancelist', param, 1);

            case 3:
              s = _context4.sent;
              return _context4.abrupt("return", s);

            case 5:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4);
    }));
    return _call_getproviancelist.apply(this, arguments);
  }

  var fillInptPro = /*#__PURE__*/function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      var provincelist, provEle;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return call_getproviancelist();

            case 2:
              provincelist = _context.sent;
              provincelist.unshift({
                LT_PROVINCE_ID: 0,
                "NAME": "لطفا استان خود را انتخاب کنید ."
              });
              provEle = document.getElementById('stateStore');
              provincelist.forEach(function (ele) {
                var opt = document.createElement('option');
                opt.setAttribute('value', ele.LT_PROVINCE_ID);
                opt.textContent = ele.NAME;
                provEle.add(opt);
              });

            case 6:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function fillInptPro() {
      return _ref.apply(this, arguments);
    };
  }();

  fillInptPro(); //state and number input 

  $('#stateStore').on('change', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
    var provId, selectEle, initialcity, res;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            provId = $(this).val();
            selectEle = document.getElementById('cityStore');
            selectEle.innerHTML = "";
            initialcity = {
              LT_CITY_ID: 0,
              NAME: "لطفا شهر خود را انتخاب کنید "
            };
            _context2.next = 6;
            return call_getcityfromprfovaince(provId);

          case 6:
            res = _context2.sent;
            res.unshift(initialcity);
            res.forEach(function (element) {
              var opt = document.createElement('option');
              opt.setAttribute('value', element.LT_CITY_ID);
              opt.textContent = element.NAME;
              selectEle.add(opt);
            }); // citySelect($(this).val(),document.getElementById("cityStore"))

          case 9:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }))); //checked for timeworking ==================================

  $("#open24").change(function () {
    if (this.checked) {
      $('#timeHon').attr('disabled', 'disabled');
      $('#timeMon').attr('disabled', 'disabled');
      $('#timeHoff').attr('disabled', 'disabled');
      $('#timeMoff').attr('disabled', 'disabled');
    } else {
      $('#timeHon').removeAttr('disabled');
      $('#timeMon').removeAttr('disabled');
      $('#timeHoff').removeAttr('disabled');
      $('#timeMoff').removeAttr('disabled');
    }
  }); //submit form 

  var submit = document.getElementById('formInfo');
  submit.addEventListener('submit', function (e) {
    e.preventDefault();
    var check1 = checkRequired($("#storName"), $('#alertstorName'));
    var check2 = checkRequired($('#ecoNum'), $('#alertecoNum'));
    var check3 = checkRequired($('#storeNcode'), $('#alertstoreNcode'));
    var check4 = checkRequired($('#telStore'), $('#alerttelStore'));
    var check5 = checkRequired($('#faxStore'), $('#alertfaxStore'));
    var check6 = checkRequired($('#postalCodStore'), $('#alertpostalCodStore'));
    var check7 = checkRequired($('#emailStore'), $('#alertemailStore'));
    var check8 = checkRequired($('#stateStore'), $('#alertstateStore'));
    var check9 = checkRequired($('#cityStore'), $('#alertcityStore'));
    var check10 = checkRequired($('#cityNum'), $('#alertcityNume'));
    var check11 = checkRequired($('#typeStore'), $('#alerttypeStore'));

    if (check1 && check2 && check3 && check4 && check5 && check6 && check7 && check8 && check9 && check10 && check11) {
      try {
        Do_setinitialinfo();
      } catch (e) {
        throw e, "اطلاعات ثبت نشد مجدد تلاش کنید ";
      }
    } else {
      $("#nameUser").select();
    }
  }); //site input enable if checkbox checked

  $('#siteIs').on('change', function () {
    if (!this.checked) {
      $("#sitStore").attr('disabled', 'disabled');
    } else {
      $('#sitStore').removeAttr('disabled');
    }
  }); //do submit info to database base on zfram function

  function Do_setinitialinfo() {
    return _Do_setinitialinfo.apply(this, arguments);
  } //do zfram================================ services


  function _Do_setinitialinfo() {
    _Do_setinitialinfo = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
      var storeName, ecoNum, storeNcode, telStore, postalCodStore, faxstore, emailStore, sitStore, region, building_number, closeTimeStore, openTimeStore, closeTimeM, openTimeM, cityStore, storeAddr, s, mid;
      return regeneratorRuntime.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              debugger;
              storeName = $("#storName").val();
              ecoNum = $('#ecoNum').val();
              storeNcode = $('#storeNcode').val();
              telStore = $('#telStore').val();
              postalCodStore = $('#postalCodStore').val();
              faxstore = $('#faxStore').val();
              emailStore = $('#emailStore').val();
              sitStore = $('#sitStore').val();
              region = $('#stateCityStore').val();
              building_number = $('#cityNum').val();
              closeTimeStore = "23:59";
              openTimeStore = "00:01";

              if ($('#open24').is(':checked')) {// closeTimeStore = "23:59";
                // openTimeStore = "00:01";
              } else {
                closeTimeM = $('#timeMon').val() ? $('#timeMon').val() : ":00";
                closeTimeStore = $('#timeHon').val() + closeTimeM;
                openTimeM = $('#timeMoff').val() ? $('#timeMoff').val() : ":00";
                openTimeStore = $('#timeHoff').val() + openTimeM;
              }

              cityStore = $('#cityStore').val();
              storeAddr = $("#addStore").val();
              _context5.next = 18;
              return call_setinitialinfoagent(storeName, sitStore, telStore, storeAddr, storeNcode, openTimeStore, closeTimeStore, cityStore, region, building_number, postalCodStore, faxstore, emailStore, ecoNum);

            case 18:
              s = _context5.sent;
              mid = s.Mid;

              if (mid == 1) {
                alert('اطلاعت به درستی ذخیره شد ');
                window.location.replace('./loginsaler.html');
              } else {
                alert('خطایی در سیستم رخ داده لطفا مجدد تلاش کنید ');
              }

            case 21:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5);
    }));
    return _Do_setinitialinfo.apply(this, arguments);
  }

  function call_setinitialinfoagent(_x2, _x3, _x4, _x5, _x6, _x7, _x8, _x9, _x10, _x11, _x12, _x13, _x14, _x15) {
    return _call_setinitialinfoagent.apply(this, arguments);
  }

  function _call_setinitialinfoagent() {
    _call_setinitialinfoagent = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(P_agent_name, P_url, P_tel, P_address, P_national_code, P_open_time, P_close_time, P_city_id, P_region, P_building_number, P_postalcode, P_fax, P_email, P_economic_code) {
      var param, s;
      return regeneratorRuntime.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              param = [];
              param.push({
                name: 'agent_name',
                value: P_agent_name
              });
              param.push({
                name: 'url',
                value: P_url
              });
              param.push({
                name: 'tel',
                value: P_tel
              });
              param.push({
                name: 'address',
                value: P_address
              });
              param.push({
                name: 'national_code',
                value: P_national_code
              });
              param.push({
                name: 'open_time',
                value: P_open_time
              });
              param.push({
                name: 'close_time',
                value: P_close_time
              });
              param.push({
                name: 'city_id',
                value: P_city_id
              });
              param.push({
                name: 'region',
                value: P_region
              });
              param.push({
                name: 'building_number',
                value: P_building_number
              });
              param.push({
                name: 'postalcode',
                value: P_postalcode
              });
              param.push({
                name: 'fax',
                value: P_fax
              });
              param.push({
                name: 'email',
                value: P_email
              });
              param.push({
                name: 'economic_code',
                value: P_economic_code
              });
              _context6.next = 17;
              return callZf_jslib('register/setinfo/', 'setinitialinfoagent', param, 2);

            case 17:
              s = _context6.sent;
              return _context6.abrupt("return", s);

            case 19:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6);
    }));
    return _call_setinitialinfoagent.apply(this, arguments);
  }
});