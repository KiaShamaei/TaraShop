function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

$(document).ready(function () {
  var dataHtml = '';
  var pageSize = 10;
  var currentPageParam = 0;

  var paginationEl = _toConsumableArray(document.querySelectorAll(".page-link"));

  var pervBtn = document.getElementById('previousPage');
  var nexttBtn = document.getElementById('nextPage');
  var dataContainer = document.getElementById('data-container');

  var Getproduct = /*#__PURE__*/function () {
    function Getproduct() {
      _classCallCheck(this, Getproduct);
    }

    _createClass(Getproduct, null, [{
      key: "call_getproducttemp",
      value: function () {
        var _call_getproducttemp = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(P_pageindex, P_pagesize) {
          var param, s;
          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  param = [];
                  param.push({
                    name: 'pageindex',
                    value: P_pageindex
                  });
                  param.push({
                    name: 'pagesize',
                    value: P_pagesize
                  });
                  _context.next = 5;
                  return callZf_jslib('activity/producttemp/fetchdata/', 'getproducttemp', param, 2);

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

        function call_getproducttemp(_x, _x2) {
          return _call_getproducttemp.apply(this, arguments);
        }

        return call_getproducttemp;
      }()
    }, {
      key: "do_call_getproducttemp",
      value: function () {
        var _do_call_getproducttemp = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(pageindex, pagesize) {
          return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  return _context2.abrupt("return", this.call_getproducttemp(pageindex, pagesize));

                case 1:
                case "end":
                  return _context2.stop();
              }
            }
          }, _callee2, this);
        }));

        function do_call_getproducttemp(_x3, _x4) {
          return _do_call_getproducttemp.apply(this, arguments);
        }

        return do_call_getproducttemp;
      }()
    }]);

    return Getproduct;
  }();

  var View = /*#__PURE__*/function () {
    function View() {
      _classCallCheck(this, View);
    }

    _createClass(View, [{
      key: "whoisActive",
      value: function whoisActive(currentPage, countpage) {
        debugger;

        switch (currentPage) {
          case "1":
            pervBtn.disabled = true;
            break;

          case countpage.toString():
            {
              nexttBtn.disabled = true;
              pervBtn.disabled = false;
            }
            break;

          default:
            {
              exttBtn.disabled = false;
            }
        }
      }
    }, {
      key: "changePaginationByNext",
      value: function changePaginationByNext() {}
    }, {
      key: "makeList",
      value: function makeList(items) {
        debugger;
        var pagseCount = Math.ceil(items.count / pageSize);
        this.whoisActive(items.currentpage, pagseCount);
        dataHtml = "";
        items.data.forEach(function (item) {
          dataHtml += "<div class=\"proMatch\"><img src=".concat(item.IMAGE_URL, " >\n            <a href=\"#\" class=\"text-primary\"> \u062F\u0633\u062A\u0647 : ").concat(item.CATEGORY_NAME, "</a>\n             <div class=\"productDetail\">  <div>").concat(item.PRODUCT_NAME, "</div>\n               <div><span class=\"badge badge-info badge-pill m-1\">").concat(item.IS_INVENTORY ? "موجود است" : "موجود نیست", "</span></div>\n               <div><span class=\"badge badge-warning badge-pill m-1\">").concat(item.IS_AVAILABLE ? "در دسترس" : "در دسترس نیست", "</span></div>\n               <div><span class=\"badge ").concat(item.IS_MATCHING > 0 ? "badge-success" : "badge-warning", " \"badge-pill m-1\">").concat(item.IS_MATCHING > 0 ? "ادغام" : "در انتظار ادغام", "</span></div>\n               <div><span class=\"badge badge-danger badge-pill m-1\">").concat(item.IS_ACTIVE ? "فعال" : "فعال نیست", "</span></div>\n               <div><a><i class=\" proIcon proclose fa fa-times p-2\"   data-productId = ").concat(item.PRODUCT_CODE, " ></i></span></a> </div>\n               <div><a href=\"#/productMatch\"><i class=\"fas fa-edit  proedit proIcon p-2 \"   data-productId = ").concat(item.PRODUCT_CODE, " ></i></a> </div>\n             </div>\n             </div>\n            ");
        });
      }
    }, {
      key: "do_makeList",
      value: function do_makeList(num) {
        Getproduct.do_call_getproducttemp(num, pageSize).then(function (items) {
          view.makeList(items);
          currentPageParam = parseInt(items.currentpage);
          dataContainer.innerHTML = "";
          dataContainer.innerHTML = dataHtml;
        });
      }
    }]);

    return View;
  }();

  var Pagination = /*#__PURE__*/function () {
    function Pagination() {
      _classCallCheck(this, Pagination);
    }

    _createClass(Pagination, [{
      key: "changePagination",
      value: function changePagination(e) {
        var activepage = document.querySelector('.page-link-active');
        activepage.classList.remove('page-link-active');
        e.classList.add("page-link-active");
        view.do_makeList(e.dataset.page);
      }
    }]);

    return Pagination;
  }();

  var view = new View();
  var pagination = new Pagination();
  view.do_makeList(1);
  paginationEl.forEach(function (item) {
    item.addEventListener('click', function (e) {
      e.preventDefault();
      pagination.changePagination(e.target);
    });
  });
  nexttBtn.addEventListener("click", function () {
    view.do_makeList(currentPageParam + 1);
  });
  pervBtn.addEventListener("click", function () {
    view.do_makeList(currentPageParam - 1);
  });
});