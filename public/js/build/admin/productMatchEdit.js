function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

$(document).ready(function () {
  var productIdTemp = localStorage.getItem("productTempId");
  var name = document.getElementById('productTitle');
  var productCat = document.getElementById('productCat');
  var productDes = document.getElementById('productDes');
  var productImage = document.getElementById('productImage');
  var productTempLike = document.querySelector('.cardtemp');
  var matchpart = document.getElementById("matchPart");
  var htmlLiketemp = "";
  var matchProductlist = "";
  var matchselected = "";
  var nodeSelected = "";
  var productwanamatch = localStorage.getItem("productTempId");

  var GetData = /*#__PURE__*/function () {
    function GetData() {
      _classCallCheck(this, GetData);
    }

    _createClass(GetData, null, [{
      key: "call_getproducttempbyid",
      value: function () {
        var _call_getproducttempbyid = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(P_producttempid) {
          var param, s;
          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  param = [];
                  param.push({
                    name: 'producttempid',
                    value: P_producttempid
                  });
                  _context.next = 4;
                  return callZf_jslib('activity/producttemp/fetchdata/', 'getproducttempbyid', param, 1);

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

        function call_getproducttempbyid(_x) {
          return _call_getproducttempbyid.apply(this, arguments);
        }

        return call_getproducttempbyid;
      }()
    }, {
      key: "call_getproductmatchbycategoryid",
      value: function () {
        var _call_getproductmatchbycategoryid = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(P_producttempid) {
          var param, s;
          return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  param = [];
                  param.push({
                    name: 'producttempid',
                    value: P_producttempid
                  });
                  _context2.next = 4;
                  return callZf_jslib('activity/producttemp/fetchdata/', 'getproductmatchbycategoryid', param, 1);

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

        function call_getproductmatchbycategoryid(_x2) {
          return _call_getproductmatchbycategoryid.apply(this, arguments);
        }

        return call_getproductmatchbycategoryid;
      }()
    }]);

    return GetData;
  }();

  var View = /*#__PURE__*/function () {
    function View() {
      _classCallCheck(this, View);
    }

    _createClass(View, null, [{
      key: "filterMatchItem",
      value: function filterMatchItem(listOfMatch, id) {
        return listOfMatch.filter(function (e) {
          return e.PRODUCT_ID == id;
        });
      }
    }, {
      key: "ChangeMatchSelected",
      value: function ChangeMatchSelected(arrObj) {
        debugger;
        var listOfProduct = document.querySelectorAll('.semiMatch');
        Array.from(listOfProduct).map(function (e) {
          e.dataset.matched = "false";
        });
        var htmlMatched = document.getElementById(arrObj[0].PRODUCT_ID);
        htmlMatched.dataset.matched = "true";
        return arrObj[0].PRODUCT_ID;
      }
    }, {
      key: "showMatchSelect",
      value: function showMatchSelect() {
        var listOfProduct = document.querySelectorAll('.semiMatch');
        listOfProduct.forEach(function (item) {
          if (item.dataset.matched == "true") {
            document.getElementById('span' + item.id).classList.remove('d-none');
          } else {
            document.getElementById('span' + item.id).classList.add('d-none');
          }
        });
      }
    }]);

    return View;
  }();

  var SetData = /*#__PURE__*/function () {
    function SetData() {
      _classCallCheck(this, SetData);
    }

    _createClass(SetData, [{
      key: "call_setmatchproduct",
      value: function () {
        var _call_setmatchproduct = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(P_ismatching, P_productcode) {
          var param, s;
          return regeneratorRuntime.wrap(function _callee3$(_context3) {
            while (1) {
              switch (_context3.prev = _context3.next) {
                case 0:
                  param = [];
                  param.push({
                    name: 'ismatching',
                    value: P_ismatching
                  });
                  param.push({
                    name: 'productcode',
                    value: P_productcode
                  });
                  _context3.next = 5;
                  return callZf_jslib('activity/producttemp/fetchdata/', 'setmatchproduct', param, 2);

                case 5:
                  s = _context3.sent;
                  return _context3.abrupt("return", "ok");

                case 7:
                case "end":
                  return _context3.stop();
              }
            }
          }, _callee3);
        }));

        function call_setmatchproduct(_x3, _x4) {
          return _call_setmatchproduct.apply(this, arguments);
        }

        return call_setmatchproduct;
      }()
    }, {
      key: "do_setmatchproduct",
      value: function () {
        var _do_setmatchproduct = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(P_ismatching, P_productcode) {
          var result;
          return regeneratorRuntime.wrap(function _callee4$(_context4) {
            while (1) {
              switch (_context4.prev = _context4.next) {
                case 0:
                  _context4.next = 2;
                  return this.call_setmatchproduct(P_ismatching, P_productcode);

                case 2:
                  result = _context4.sent;

                  if (result == "ok") {
                    window.location.assign(window.location.origin + "/ZSHOP/SHOP/admin/index.html#/productsMatch");
                  }

                case 4:
                case "end":
                  return _context4.stop();
              }
            }
          }, _callee4, this);
        }));

        function do_setmatchproduct(_x5, _x6) {
          return _do_setmatchproduct.apply(this, arguments);
        }

        return do_setmatchproduct;
      }()
    }]);

    return SetData;
  }();

  GetData.call_getproducttempbyid(productIdTemp).then(function (e) {
    name.innerHTML = e[0].PRODUCT_NAME;
    productDes.innerHTML = e[0].DESCRIPTION;
    productCat.innerHTML = e[0].CATEGORY_NAME;
    productImage.src = e[0].IMAGE_URL; //if select match product is exist ---

    nodeSelected = e[0].IS_MATCHING;
  });
  GetData.call_getproductmatchbycategoryid(productIdTemp).then(function (e) {
    e.forEach(function (item) {
      htmlLiketemp += " <div class=\"col-4\">\n            <div class=\"card cardtemp p-3 semiMatch \" id=".concat(item.PRODUCT_ID, " data-matched=").concat(nodeSelected == item.PRODUCT_ID ? "true" : "false", ">\n                <img class=\"card-img-top\" src=").concat(item.IMAGE_URL, " alt=\"Card image cap\">\n                \n                <div class=\"card-body\">\n                  <h5 class=\"card-title\">").concat(item.PRODUCT_NAME, "</h5>\n                  <p class=\"card-text\">\u062A\u0648\u0636\u06CC\u062D \u0645\u062D\u0635\u0648\u0644 :").concat(item.DESCRIPTION, " </p>\n                  <p class=\"card-text\">\u06A9\u062F \u0645\u062D\u0635\u0648\u0644  :").concat(item.PRODUCT_CODE, " </p>\n                  <span class=\"badge badge-warning d-none matchSign\" id=span").concat(item.PRODUCT_ID, ">\u0627\u0646\u062A\u062E\u0627\u0628 \u0634\u062F\u0647 \u062C\u0647\u062A \u0627\u062F\u063A\u0627\u0645 </span>\n                  <button class=\"J-paginationjs-go-button matchButton\" data-toggle=\"modal\" data-target=\"#matchModal\"  data-matchId =").concat(item.PRODUCT_ID, " >\u0627\u062F\u063A\u0627\u0645</buttno>\n                  \n                  </div>\n              </div>\n           </div>");
    });
    productTempLike.innerHTML = htmlLiketemp;
    matchProductlist = e;
  }).then(function () {
    var matchButton = document.querySelectorAll(".matchButton");
    matchButton.forEach(function (item) {
      item.addEventListener('click', function (e) {
        matchselected = View.filterMatchItem(matchProductlist, e.target.dataset.matchid);
      });
    }); //if select match product is exist --- this part show if is selected match is exist             

    View.showMatchSelect();
  }).then(function () {
    //accept match is id for modal in root of admin
    document.getElementById('acceptmatch').addEventListener('click', function (e) {
      nodeSelected = View.ChangeMatchSelected(matchselected);
      View.showMatchSelect();
    });
  }).then(function () {
    var matchproductBtn = document.getElementById("matchProduct");
    matchproductBtn.addEventListener("click", function () {
      var setData = new SetData();
      setData.do_setmatchproduct(nodeSelected, productwanamatch);
    });
  });
});