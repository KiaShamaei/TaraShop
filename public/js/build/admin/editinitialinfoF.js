function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

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
  }); //checked for timeworking ==================================

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
  }); //checked websit is or not ===================================

  $("#siteIs").change(function () {
    if (this.checked) {
      $('#sitStore').removeAttr('disabled');
    } else {
      $('#sitStore').attr('disabled', 'disabled');
    }
  });

  var GetInfo = /*#__PURE__*/function () {
    function GetInfo() {
      _classCallCheck(this, GetInfo);
    }

    _createClass(GetInfo, [{
      key: "call_getcityfromprfovaince",
      //get city from province in select------------------zfram services---------------------       
      value: function () {
        var _call_getcityfromprfovaince = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(P_province_id) {
          var param, s;
          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  param = [];
                  param.push({
                    name: 'province_id',
                    value: P_province_id
                  });
                  _context.next = 4;
                  return callZf_jslib('common/', 'getcityfromprfovaince', param, 2);

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

        function call_getcityfromprfovaince(_x) {
          return _call_getcityfromprfovaince.apply(this, arguments);
        }

        return call_getcityfromprfovaince;
      }() //state provinces get ====================================================================

    }, {
      key: "call_getproviancelist",
      value: function () {
        var _call_getproviancelist = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
          var param, s;
          return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  param = [];
                  _context2.next = 3;
                  return callZf_jslib('common/', 'getproviancelist', param, 1);

                case 3:
                  s = _context2.sent;
                  return _context2.abrupt("return", s);

                case 5:
                case "end":
                  return _context2.stop();
              }
            }
          }, _callee2);
        }));

        function call_getproviancelist() {
          return _call_getproviancelist.apply(this, arguments);
        }

        return call_getproviancelist;
      }()
    }, {
      key: "fillInptPro",
      value: function () {
        var _fillInptPro = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(a, b, c) {
          var list, Ele;
          return regeneratorRuntime.wrap(function _callee3$(_context3) {
            while (1) {
              switch (_context3.prev = _context3.next) {
                case 0:
                  _context3.next = 2;
                  return a(c);

                case 2:
                  list = _context3.sent;
                  Ele = document.getElementById(b);

                  if (c == undefined) {
                    list.forEach(function (ele) {
                      var opt = document.createElement('option');
                      opt.setAttribute('value', ele.LT_PROVINCE_ID);
                      opt.textContent = ele.NAME;
                      Ele.add(opt);
                    });
                  } else {
                    list.forEach(function (ele) {
                      var opt = document.createElement('option');
                      opt.setAttribute('value', ele.LT_CITY_ID);
                      opt.textContent = ele.NAME;
                      Ele.add(opt);
                    });
                  }

                case 5:
                case "end":
                  return _context3.stop();
              }
            }
          }, _callee3);
        }));

        function fillInptPro(_x2, _x3, _x4) {
          return _fillInptPro.apply(this, arguments);
        }

        return fillInptPro;
      }()
    }, {
      key: "Do_getsaleragentinfo",
      value: function () {
        var _Do_getsaleragentinfo = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
          var userInfo, result, arrayTimeOpen, arrayTimeClose;
          return regeneratorRuntime.wrap(function _callee4$(_context4) {
            while (1) {
              switch (_context4.prev = _context4.next) {
                case 0:
                  debugger;
                  _context4.t0 = this;
                  _context4.next = 4;
                  return this.call_getproviancelist;

                case 4:
                  _context4.t1 = _context4.sent;
                  _context4.next = 7;
                  return _context4.t0.fillInptPro.call(_context4.t0, _context4.t1, "stateStore");

                case 7:
                  userInfo = JSON.parse(localStorage.getItem('userInfo'));
                  _context4.next = 10;
                  return this.call_getsaleragentinfo(userInfo.MEntityId);

                case 10:
                  result = _context4.sent;
                  debugger;
                  arrayTimeOpen = result[0].OPEN_TIME.split(":");
                  arrayTimeClose = result[0].CLOSE_TIME.split(":");
                  $('#storName').val(result[0].AGENT_NAME != " " ? result[0].AGENT_NAME : "");
                  $('#ecoNum').val(result[0].ECONOMIC_CODE != " " ? result[0].ECONOMIC_CODE : "");
                  $('#storeNcode').val(result[0].NATIONAL_CODE != " " ? result[0].NATIONAL_CODE : "");
                  $('#telStore').val(result[0].TEL != " " ? result[0].TEL : "");
                  $('#faxStore').val(result[0].FAX != " " ? result[0].FAX : "");
                  $('#postalCodStore').val(result[0].POSTALCODE != " " ? result[0].POSTALCODE : "");
                  $('#emailStore').val(result[0].EMAIL != " " ? result[0].EMAIL : "");
                  $('#stateCityStore').val(result[0].REGION != " " ? result[0].REGION : "");
                  $('#cityNum').val(result[0].BUILDING_NUMBER != " " ? result[0].BUILDING_NUMBER : "");
                  $('#cityStore').val(result[0].LT_CITY_ID ? result[0].LT_CITY_ID : "");
                  $('#typeStore').val(result[0].AGENT_TITLE != " " ? result[0].AGENT_TITLE : "");
                  $('#sitStore').val(result[0].URL != " " ? result[0].URL : "");
                  $('#addStore').val(result[0].ADDRESS != " " ? result[0].ADDRESS : "");
                  $('#stateStore').val(result[0].LT_PROVINCE_ID);
                  _context4.t2 = this;
                  _context4.next = 31;
                  return this.call_getcityfromprfovaince;

                case 31:
                  _context4.t3 = _context4.sent;
                  _context4.t4 = result[0].LT_PROVINCE_ID;
                  _context4.next = 35;
                  return _context4.t2.fillInptPro.call(_context4.t2, _context4.t3, 'cityStore', _context4.t4);

                case 35:
                  if (parseInt(arrayTimeOpen[0]) == 0 && parseInt(arrayTimeOpen[1]) == 1 && parseInt(arrayTimeClose[0]) == 23 && parseInt(arrayTimeClose[1]) == 59) {
                    $("#open24").prop('checked', true);
                  } else {
                    $('#timeHon').val(parseInt(arrayTimeOpen[0]));
                    $('#timeMon').val(parseInt(arrayTimeOpen[1]));
                    $('#timeHoff').val(parseInt(arrayTimeClose[0]));
                    $('#timeMoff').val(parseInt(arrayTimeClose[1]));
                  }

                  if (result[0].URL) {
                    $('#siteIs').prop('checked', true);
                    $('#sitStore').removeAttr('disabled');
                  }

                case 37:
                case "end":
                  return _context4.stop();
              }
            }
          }, _callee4, this);
        }));

        function Do_getsaleragentinfo() {
          return _Do_getsaleragentinfo.apply(this, arguments);
        }

        return Do_getsaleragentinfo;
      }() //----geting data from zfram service

    }, {
      key: "call_getsaleragentinfo",
      value: function () {
        var _call_getsaleragentinfo = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(P_owner_entity_id) {
          var param, s;
          return regeneratorRuntime.wrap(function _callee5$(_context5) {
            while (1) {
              switch (_context5.prev = _context5.next) {
                case 0:
                  param = [];
                  param.push({
                    name: 'owner_entity_id',
                    value: P_owner_entity_id
                  });
                  _context5.next = 4;
                  return callZf_jslib('register/saler/fetchdata/', 'getsaleragentinfo', param, 1);

                case 4:
                  s = _context5.sent;
                  return _context5.abrupt("return", s);

                case 6:
                case "end":
                  return _context5.stop();
              }
            }
          }, _callee5);
        }));

        function call_getsaleragentinfo(_x5) {
          return _call_getsaleragentinfo.apply(this, arguments);
        }

        return call_getsaleragentinfo;
      }()
    }]);

    return GetInfo;
  }();

  var getinfo = new GetInfo(); //GetInfo class end =================================================================================

  getinfo.Do_getsaleragentinfo(); //state and number input 

  $('#stateStore').on('change', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6() {
    var provId, selectEle, initialcity, res;
    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            provId = $(this).val();
            selectEle = document.getElementById('cityStore');
            selectEle.innerHTML = "";
            initialcity = {
              LT_CITY_ID: 0,
              NAME: "لطفا شهر خود را انتخاب کنید "
            };
            _context6.next = 6;
            return getinfo.call_getcityfromprfovaince(provId);

          case 6:
            res = _context6.sent;
            res.unshift(initialcity);
            res.forEach(function (element) {
              var opt = document.createElement('option');
              opt.setAttribute('value', element.LT_CITY_ID);
              opt.textContent = element.NAME;
              selectEle.add(opt);
            });

          case 9:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6, this);
  }))); //class of edit info and set to database -------------------

  var SetInfo = /*#__PURE__*/function () {
    function SetInfo() {
      _classCallCheck(this, SetInfo);
    }

    _createClass(SetInfo, [{
      key: "Do_setinitialinfo",
      value: function () {
        var _Do_setinitialinfo = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7() {
          var storeName, ecoNum, storeNcode, telStore, postalCodStore, faxstore, emailStore, sitStore, region, building_number, closeTimeStore, openTimeStore, closeTimeM, openTimeM, cityStore, storeAddr, s, mid;
          return regeneratorRuntime.wrap(function _callee7$(_context7) {
            while (1) {
              switch (_context7.prev = _context7.next) {
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
                  _context7.next = 18;
                  return this.call_setinitialinfoagent(storeName, sitStore, telStore, storeAddr, storeNcode, openTimeStore, closeTimeStore, cityStore, region, building_number, postalCodStore, faxstore, emailStore, ecoNum);

                case 18:
                  s = _context7.sent;
                  mid = s.Mid;

                  if (mid == 1) {
                    $('#editAccept').modal('show');
                  } else {
                    alert('خطایی در سیستم رخ داده لطفا مجدد تلاش کنید ');
                  }

                case 21:
                case "end":
                  return _context7.stop();
              }
            }
          }, _callee7, this);
        }));

        function Do_setinitialinfo() {
          return _Do_setinitialinfo.apply(this, arguments);
        }

        return Do_setinitialinfo;
      }() //do zfram================================ services

    }, {
      key: "call_setinitialinfoagent",
      value: function () {
        var _call_setinitialinfoagent = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(P_agent_name, P_url, P_tel, P_address, P_national_code, P_open_time, P_close_time, P_city_id, P_region, P_building_number, P_postalcode, P_fax, P_email, P_economic_code) {
          var param, s;
          return regeneratorRuntime.wrap(function _callee8$(_context8) {
            while (1) {
              switch (_context8.prev = _context8.next) {
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
                  _context8.next = 17;
                  return callZf_jslib('register/setinfo/', 'setinitialinfoagent', param, 2);

                case 17:
                  s = _context8.sent;
                  return _context8.abrupt("return", s);

                case 19:
                case "end":
                  return _context8.stop();
              }
            }
          }, _callee8);
        }));

        function call_setinitialinfoagent(_x6, _x7, _x8, _x9, _x10, _x11, _x12, _x13, _x14, _x15, _x16, _x17, _x18, _x19) {
          return _call_setinitialinfoagent.apply(this, arguments);
        }

        return call_setinitialinfoagent;
      }()
    }]);

    return SetInfo;
  }();

  var setinfo = new SetInfo();
  setinfo.Do_setinitialinfo(); //submit form 
  //site input enable if checkbox checked

  $('#siteIs').on('change', function () {
    if (!this.checked) {
      $("#sitStore").attr('disabled', 'disabled');
    } else {
      $('#sitStore').removeAttr('disabled');
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
      //try
      //{
      setinfo.Do_setinitialinfo(); //}catch(e)
      //{
      //throw(e,"اطلاعات ثبت نشد مجدد تلاش کنید ")
      //}
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
  });
  $('#acceptEdit').on('click', function () {
    window.location.assign(window.location.origin + "/ZSHOP/SHOP/admin/index.html");
  });
});