function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

$(document).ready(function () {
  var root = document.querySelector("#rootCat"); //calling zframe function and retrived data from dataBase.

  var GetDataZfram = /*#__PURE__*/function () {
    function GetDataZfram() {
      _classCallCheck(this, GetDataZfram);
    }

    _createClass(GetDataZfram, [{
      key: "call_getcategoryagent",
      value: function () {
        var _call_getcategoryagent = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(P_entityid) {
          var param, s;
          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  param = [];
                  param.push({
                    name: 'entityid',
                    value: P_entityid
                  });
                  ;
                  _context.next = 5;
                  return callZf_jslib('activity/agent/', 'getcategoryagent', param, 1);

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

        function call_getcategoryagent(_x) {
          return _call_getcategoryagent.apply(this, arguments);
        }

        return call_getcategoryagent;
      }()
    }]);

    return GetDataZfram;
  }(); //make ui base on entity ui .


  var MakeUi = /*#__PURE__*/function () {
    function MakeUi() {
      _classCallCheck(this, MakeUi);
    }

    _createClass(MakeUi, [{
      key: "add",
      value: function add(data) {
        var pattern = "";
        data.forEach(function (item) {
          pattern += " <div class=\"col-lg-3 justify-content-start mt-md-2\">\n            <div class=\"card\">\n                <div class=\"card-body\">\n                  <h5 class=\"card-title\">".concat(item.CATEGORY_NAME, "</h5>\n                  <p class=\"card-text\">\u062A\u0648\u0636\u06CC\u062D\u0627\u062A : ").concat(item.DESCRIPTION, "...</p>\n                  <p class=\"card-text\"> \u0645\u0627\u062F\u0631 \u062F\u0633\u062A\u0647 :").concat(item.PARENT_NAME, "</p>\n                  <button href=\"#\" class=\"btn btn-outline-danger deletecat\" id = ").concat(item.CATEGORY_ID, ">\u062D\u0630\u0641 \u062F\u0633\u062A\u0647</button>\n                </div>\n              </div>\n        </div>");
        });
        root.innerHTML = pattern;
      }
    }, {
      key: "showMsg",
      value: function showMsg() {
        root.innerHTML = "<p class=\"card-text\">\u062F\u0633\u062A\u0647 \u0628\u0646\u062F\u06CC \u0627\u0646\u062A\u062E\u0627\u0628 \u0646\u0634\u062F\u0647 \u0644\u0637\u0641\u0627 \u062D\u062F\u0627\u0642\u0644 \u06CC\u06A9 \u062F\u0633\u062A\u0647 \u0645\u062D\u0635\u0648\u0644 \u0627\u0646\u062A\u062E\u0627\u0628 \u0641\u0631\u0645\u0627\u06CC\u06CC\u062F  ...</p>";
      }
    }]);

    return MakeUi;
  }(); //store data in database 


  var Storage = /*#__PURE__*/function () {
    function Storage() {
      _classCallCheck(this, Storage);
    }

    _createClass(Storage, null, [{
      key: "getStore",
      value: function getStore(data) {
        localStorage.setItem("category ", data);
      }
    }, {
      key: "update",
      value: function update(id) {}
    }]);

    return Storage;
  }();

  var DeleteCategory = /*#__PURE__*/function () {
    function DeleteCategory() {
      _classCallCheck(this, DeleteCategory);
    }

    _createClass(DeleteCategory, [{
      key: "call_deletecategoryagent",
      value: function () {
        var _call_deletecategoryagent = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(P_categoryid) {
          var param, s;
          return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  param = [];
                  param.push({
                    name: 'categoryid',
                    value: P_categoryid
                  });
                  _context2.next = 4;
                  return callZf_jslib('activity/agentcategory/delete/', 'deletecategoryagent', param, 2);

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

        function call_deletecategoryagent(_x2) {
          return _call_deletecategoryagent.apply(this, arguments);
        }

        return call_deletecategoryagent;
      }()
    }, {
      key: "getDeleteItem",
      value: function getDeleteItem() {
        var _this = this;

        var deleteBtn = document.querySelectorAll('.deletecat');
        deleteBtn.forEach(function (item) {
          return item.addEventListener('click', function (e) {
            _this.deletItem(e.target.id);
          });
        });
      }
    }, {
      key: "deletItem",
      value: function deletItem(id) {
        var _this2 = this;

        this.call_deletecategoryagent(id).then(function (data) {
          if (data.Mid == 1) {
            getDataZfram.call_getcategoryagent(userInfo.MEntityId).then(function (data) {
              if (data[0].MSG != "  EXECUTE SUCCESS ") {
                makeUi.add(data);
                Storage.getStore(data);

                _this2.getDeleteItem();
              } else {
                makeUi.showMsg();
              }
            });
          } else {
            alert("something wrong!");
          }
        });
      }
    }]);

    return DeleteCategory;
  }(); //getdata from database 


  var getDataZfram = new GetDataZfram();
  var makeUi = new MakeUi();
  var deletecategory = new DeleteCategory();
  var userInfo = JSON.parse(localStorage.getItem('userInfo'));
  getDataZfram.call_getcategoryagent(userInfo.MEntityId).then(function (data) {
    if (data[0].MSG != "  EXECUTE SUCCESS ") {
      makeUi.add(data);
      Storage.getStore(data);
      deletecategory.getDeleteItem();
    } else {
      makeUi.showMsg();
    }

    ;
  });
  $("#acceptEdit").click(function () {
    location.replcae('#/category');
  });
});