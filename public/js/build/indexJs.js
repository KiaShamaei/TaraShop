function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

$(document).ready(function () {
  // slider  -------------------------------------------->
  jQuery('#camera_wrap').camera({
    loader: false,
    pagination: false,
    minHeight: '444',
    thumbnails: false,
    height: '48.375%',
    caption: true,
    navigation: true,
    fx: 'mosaic'
  });
  /*carousel*/

  var owl = $("#owl");
  owl.owlCarousel({
    items: 2,
    //10 items above 1000px browser width
    itemsDesktop: [995, 2],
    //5 items between 1000px and 901px
    itemsDesktopSmall: [767, 2],
    // betweem 900px and 601px
    itemsTablet: [700, 2],
    //2 items between 600 and 0
    itemsMobile: [479, 1],
    // itemsMobile disabled - inherit from itemsTablet option
    navigation: true,
    pagination: false
  });
  $().UItoTop({
    easingType: 'easeOutQuart'
  });
  /*sidenav  -------===============================>*/

  /* api from zfram code */

  var GetDataZframe = /*#__PURE__*/function () {
    function GetDataZframe() {
      _classCallCheck(this, GetDataZframe);
    }

    _createClass(GetDataZframe, [{
      key: "call_getmenuwithparent",
      value: function () {
        var _call_getmenuwithparent = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(P_parent_id) {
          var param, s;
          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  param = [];
                  param.push({
                    name: 'parent_id',
                    value: P_parent_id
                  });
                  _context.next = 4;
                  return callZf_jslib('ui/view/menu/', 'getmenuwithparent', param, 2);

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

        function call_getmenuwithparent(_x) {
          return _call_getmenuwithparent.apply(this, arguments);
        }

        return call_getmenuwithparent;
      }()
    }, {
      key: "getData",
      value: function () {
        var _getData = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(id) {
          var data;
          return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  _context2.next = 2;
                  return this.call_getmenuwithparent(id);

                case 2:
                  data = _context2.sent;
                  return _context2.abrupt("return", data);

                case 4:
                case "end":
                  return _context2.stop();
              }
            }
          }, _callee2, this);
        }));

        function getData(_x2) {
          return _getData.apply(this, arguments);
        }

        return getData;
      }()
    }]);

    return GetDataZframe;
  }();

  var getDataZframe = new GetDataZframe();
  /*getting data  from database for main menu sid nav*/

  /*-- کلاس مرتبط با دیتاساید منو اول  --*/

  var ViewMenu = /*#__PURE__*/function () {
    function ViewMenu() {
      _classCallCheck(this, ViewMenu);
    }

    _createClass(ViewMenu, null, [{
      key: "createMenu",
      value: function () {
        var _createMenu = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
          var menudata, _loop, i;

          return regeneratorRuntime.wrap(function _callee3$(_context4) {
            while (1) {
              switch (_context4.prev = _context4.next) {
                case 0:
                  _context4.next = 2;
                  return getDataZframe.getData(1);

                case 2:
                  menudata = _context4.sent;
                  _loop = /*#__PURE__*/regeneratorRuntime.mark(function _loop(i) {
                    var itemEl, itemLi, itemPo, sideList2;
                    return regeneratorRuntime.wrap(function _loop$(_context3) {
                      while (1) {
                        switch (_context3.prev = _context3.next) {
                          case 0:
                            itemEl = document.createElement('a');
                            itemLi = document.createElement('li');
                            itemPo = document.getElementById('mySidenavList');
                            itemEl.textContent = menudata[i].CATEGORY_NAME;
                            _context3.next = 6;
                            return getDataZframe.getData(menudata[i].CATEGORY_ID);

                          case 6:
                            sideList2 = _context3.sent;
                            itemLi.appendChild(itemEl);
                            itemPo.appendChild(itemLi);

                            if (sideList2.length > 0 && sideList2[0].MSG == undefined) {
                              sideList2.map(function (item) {
                                var submenuIcon = document.createElement('i');
                                submenuIcon.className = 'fa fa-angle-left float-left';
                                var itemEl2 = document.createElement('a');
                                var itemLi2 = document.createElement('li');
                                itemEl2.textContent = item.CATEGORY_NAME;
                                itemEl2.classList.add('sideChild');
                                itemEl2.appendChild(submenuIcon);
                                itemEl2.addEventListener('click', function () {
                                  /* this function is in indexjs.js */
                                  openSecound();
                                });
                                itemLi2.appendChild(itemEl2);
                                itemPo.appendChild(itemLi2);
                              });
                            }

                          case 10:
                          case "end":
                            return _context3.stop();
                        }
                      }
                    }, _loop);
                  });
                  i = 0;

                case 5:
                  if (!(i < menudata.length)) {
                    _context4.next = 10;
                    break;
                  }

                  return _context4.delegateYield(_loop(i), "t0", 7);

                case 7:
                  i++;
                  _context4.next = 5;
                  break;

                case 10:
                case "end":
                  return _context4.stop();
              }
            }
          }, _callee3);
        }));

        function createMenu() {
          return _createMenu.apply(this, arguments);
        }

        return createMenu;
      }()
    }]);

    return ViewMenu;
  }();

  ViewMenu.createMenu();
  /*-- کلاس مرتبط با دیتاساید منو اول  --*/

  /**بعد از ورود به سیستم  */

  if (localStorage.getItem('userInfo') != null && localStorage.getItem("token") == 1) {
    debugger;
    var userEntity = JSON.parse(localStorage.getItem('userInfo'));
    var username = userEntity.MName + "-" + userEntity.MLastname;
    var poUsernameMenu = document.getElementById("userMenu");
    var poUsernameSide = document.getElementById("userSide");
    var dropDown = document.getElementById("dropUser");
    poUsernameMenu.setAttribute("data-toggle", "dropdown");
    poUsernameSide.textContent = username;
    poUsernameMenu.textContent = username;
  }

  $('#exitUser').on('click', function () {
    localStorage.clear();
    location.reload();
  });
}); // inline call function use in modal 

var openNav = function openNav() {
  document.getElementById("mySidenav").style.width = "350px";
  document.querySelector('.modal').style.display = "block";
};

var modal = document.getElementById("main-nav");
var btn = document.getElementById("btn-slideMenu");

function openSecound() {
  document.getElementById("mySidenav2").style.width = "350px";
}

function closeNav2() {
  document.getElementById("mySidenav2").style.width = "0";
}

document.querySelector('#closeSide2').addEventListener('click', function () {
  closeNav2();
});

var closeNav = function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
  document.querySelector('.modal').style.display = "none";
};