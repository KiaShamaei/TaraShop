function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

$(document).ready(function () {
  var container = $('#pagination');
  var getData = '';
  var productlist = "";

  var Getproduct = /*#__PURE__*/function () {
    function Getproduct() {
      _classCallCheck(this, Getproduct);
    }

    _createClass(Getproduct, null, [{
      key: "call_getproducttemp",
      value: function () {
        var _call_getproducttemp = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
          var param, s;
          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  param = [];
                  _context.next = 3;
                  return callZf_jslib('activity/producttemp/fetchdata/', 'getproducttemp', param, 2);

                case 3:
                  s = _context.sent;
                  return _context.abrupt("return", s);

                case 5:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee);
        }));

        function call_getproducttemp() {
          return _call_getproducttemp.apply(this, arguments);
        }

        return call_getproducttemp;
      }()
    }]);

    return Getproduct;
  }();

  Getproduct.call_getproducttemp().then(function (e) {
    getData = e;
    container.pagination({
      dataSource: getData,
      pageSize: 10,
      showGoInput: true,
      showGoButton: true,
      callback: function callback(data, pagination) {
        var dataHtml = '';
        $.each(data, function (index, item) {
          dataHtml += "<div class=\"proMatch\"><img src=".concat(item.IMAGE_URL, " >\n                <a href=\"#\" class=\"text-primary\"> \u062F\u0633\u062A\u0647 : ").concat(item.CATEGORY_NAME, "</a>\n                 <div class=\"productDetail\">  <div>").concat(item.PRODUCT_NAME, "</div>\n                   <div><span class=\"badge badge-info badge-pill m-1\">").concat(item.IS_INVENTORY ? "موجود است" : "موجود نیست", "</span></div>\n                   <div><span class=\"badge badge-warning badge-pill m-1\">").concat(item.IS_AVAILABLE ? "در دسترس" : "در دسترس نیست", "</span></div>\n                   <div><span class=\"badge ").concat(item.IS_MATCHING > 0 ? "badge-success" : "badge-warning", " \"badge-pill m-1\">").concat(item.IS_MATCHING > 0 ? "ادغام" : "در انتظار ادغام", "</span></div>\n                   <div><span class=\"badge badge-danger badge-pill m-1\">").concat(item.IS_ACTIVE ? "فعال" : "فعال نیست", "</span></div>\n                   <div><a><i class=\" proIcon proclose fa fa-times p-2\"   data-productId = ").concat(item.PRODUCT_CODE, " ></i></span></a> </div>\n                   <div><a href=\"#/productMatch\"><i class=\"fas fa-edit  proedit proIcon p-2 \"   data-productId = ").concat(item.PRODUCT_CODE, " ></i></a> </div>\n\n\n                 </div></div>\n                ");
        });
        $("#data-container").html(dataHtml);
        proEdit = document.querySelectorAll(".proedit");
        proClose = document.querySelectorAll('.proclose');
        proEdit.forEach(function (item) {
          item.addEventListener("click", function (e) {
            localStorage.removeItem("productTempId");
            localStorage.setItem("productTempId", e.target.dataset.productid);
          });
        });
        proClose.forEach(function (item) {
          item.addEventListener("click", function (e) {});
        });
      }
    });
  });
});