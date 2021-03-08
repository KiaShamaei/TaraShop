function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

$(document).ready(function () {
  // jquery make ui of tree ------------------------------------------------
  $.fn.extend({
    treed: function treed(o) {
      var openedClass = 'fa-minus-square';
      var closedClass = 'fa-plus-square';

      if (typeof o != 'undefined') {
        if (typeof o.openedClass != 'undefined') {
          openedClass = o.openedClass;
        }

        if (typeof o.closedClass != 'undefined') {
          closedClass = o.closedClass;
        }
      }

      ; //initialize each of the top levels

      var tree = $(this);
      tree.addClass("tree");
      tree.find('li').has("ul").each(function () {
        var branch = $(this); //li with children ul

        branch.prepend("<i class='indicator fa " + closedClass + "'></i>");
        branch.addClass('branch');
        branch.on('click', function (e) {
          if (this == e.target) {
            var icon = $(this).children('i:first');
            icon.toggleClass(openedClass + " " + closedClass);
            $(this).children().children().toggle();
          }
        });
        branch.children().children().toggle();
      }); //fire event from the dynamically added icon

      tree.find('.branch .indicator').each(function () {
        $(this).on('click', function () {
          $(this).closest('li').click();
        });
      }); //fire event to open branch if the li contains an anchor instead of text

      tree.find('.branch>a').each(function () {
        $(this).on('click', function (e) {
          $(this).closest('li').click();
          e.preventDefault();
        });
      }); //fire event to open branch if the li contains a button instead of text

      tree.find('.branch>button').each(function () {
        $(this).on('click', function (e) {
          $(this).closest('li').click();
          e.preventDefault();
        });
      });
    }
  }); //Initialization of treeviews=========
  // $('#tree2').treed({openedClass:'glyphicon-folder-open', closedClass:'glyphicon-folder-close'});
  // $('#tree3').treed({openedClass:'glyphicon-chevron-right', closedClass:'glyphicon-chevron-down'});
  //geting dom --------------------------------------------------------------------------

  var wrap = document.getElementById('tree1');
  var msg = document.getElementById('success-msg');
  var outputs = ""; //call services

  var GetData = /*#__PURE__*/function () {
    function GetData() {
      _classCallCheck(this, GetData);
    }

    _createClass(GetData, [{
      key: "call_getcategory",
      value: function () {
        var _call_getcategory = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
          var param, s;
          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  param = [];
                  _context.next = 3;
                  return callZf_jslib('activity/category/fetchdata/', 'getcategory', param, 1);

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

        function call_getcategory() {
          return _call_getcategory.apply(this, arguments);
        }

        return call_getcategory;
      }()
    }]);

    return GetData;
  }();

  var getdata = new GetData();

  var MakeElement = /*#__PURE__*/function () {
    function MakeElement() {
      _classCallCheck(this, MakeElement);
    }

    _createClass(MakeElement, null, [{
      key: "makeChild",
      value: function () {
        var _makeChild = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(obj, data) {
          var _this = this;

          var output;
          return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  outputs += "<li class=\"mx-2\"><input type=\"checkbox\" class=\"categoryselected parentcat  mx-2\" data-id=".concat(obj.CATEGORY_ID, "> ").concat(obj.CATEGORY_NAME, "<ul>");
                  output = data.filter(function (item) {
                    return item.PARENT_ID == obj.CATEGORY_ID;
                  });
                  output.forEach(function (item) {
                    item.CHILDCOUNT > 0 ? _this.makeChild(item, data) : outputs += "<li class=\"mx-2\"><input type=\"checkbox\"  class=\"categoryselected mx-2 \" data-id=".concat(item.CATEGORY_ID, "> ").concat(item.CATEGORY_NAME, " </li>");
                  });
                  outputs += "</ul>";

                case 4:
                case "end":
                  return _context2.stop();
              }
            }
          }, _callee2);
        }));

        function makeChild(_x, _x2) {
          return _makeChild.apply(this, arguments);
        }

        return makeChild;
      }()
    }, {
      key: "makeParent",
      value: function makeParent(root, data) {
        var _this2 = this;

        root.forEach(function (obj) {
          if (obj.CHILDCOUNT > 0) {
            _this2.makeChild(obj, data);
          } else {
            outputs += "<li class=\"mx-2\"><input type=\"checkbox\" class=\"categoryselected mx-2 \" data-id=".concat(obj.CATEGORY_ID, ">").concat(obj.CATEGORY_NAME, " </li>");
          }
        });
      }
    }]);

    return MakeElement;
  }(); //make elemeet base on response 


  function createCategory() {
    return _createCategory.apply(this, arguments);
  }

  function _createCategory() {
    _createCategory = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
      var data, root;
      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.next = 2;
              return getdata.call_getcategory();

            case 2:
              data = _context4.sent;
              root = data.filter(function (item) {
                return item.PARENT_ID == "1";
              });
              MakeElement.makeParent(root, data);
              wrap.innerHTML = outputs; //Initialization of treeviews=========

              $('#tree1').treed();

            case 7:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4);
    }));
    return _createCategory.apply(this, arguments);
  }

  createCategory(); //send data to server 

  var SendData = /*#__PURE__*/function () {
    function SendData() {
      _classCallCheck(this, SendData);
    }

    _createClass(SendData, [{
      key: "call_insertagentcategory",
      value: function () {
        var _call_insertagentcategory = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(P_category) {
          var param, C, s;
          return regeneratorRuntime.wrap(function _callee3$(_context3) {
            while (1) {
              switch (_context3.prev = _context3.next) {
                case 0:
                  param = [];
                  C = window.btoa(P_category); // encode a string

                  param.push({
                    name: 'category',
                    value: C
                  });
                  _context3.next = 5;
                  return callZf_jslib('activity/agentcategory/insert/', 'insertagentcategory', param, 2);

                case 5:
                  s = _context3.sent;
                  return _context3.abrupt("return", s);

                case 7:
                case "end":
                  return _context3.stop();
              }
            }
          }, _callee3);
        }));

        function call_insertagentcategory(_x3) {
          return _call_insertagentcategory.apply(this, arguments);
        }

        return call_insertagentcategory;
      }()
    }]);

    return SendData;
  }(); //submit & send select item to backend------------------------


  var senddata = new SendData();
  $("#btn").on('click', function () {
    var ItemCat = Array.prototype.slice.call(document.querySelectorAll('.categoryselected'));
    var selected = ItemCat.filter(function (item) {
      return item.checked == true;
    });
    var idselected = selected.map(function (item) {
      return item.dataset.id;
    });
    var object = JSON.stringify({
      data: idselected
    });
    senddata.call_insertagentcategory(object).then(function (data) {
      if (data.Mid == "1") {
        $('#editAccept').modal('show');
      } else {
        msg.innerHTML = "خطایی رخ داده است مجددا تلاش کنید";
      }
    });
  });
});