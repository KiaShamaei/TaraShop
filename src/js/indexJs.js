
// Get the modal
var modal = document.getElementById("main-nav");

// Get the button that opens the modal
var btn = document.getElementById("btn-slideMenu");

// Get the <span> element that closes the modal
// var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
// btn.onclick = function() {
//   modal.style.display = "block";
// }

// When the user clicks on <span> (x), close the modal
// span.onclick = function() {
//   modal.style.display = "none";
// }



// When the user clicks anywhere outside of the modal, close it
function openNav() {
  
  document.getElementById("mySidenav").style.width = "350px";
  document.querySelector('.modal').style.display="block";
  
}
function openSecound() {
  
  document.getElementById("mySidenav2").style.width = "350px";
  
  
}
function closeNav2(){
  document.getElementById("mySidenav2").style.width = "0";
}
document.querySelector('#closeSide2').addEventListener('click', function(){
  closeNav2();
})
function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
  document.querySelector('.modal').style.display="none";
  // window.addEventListener("click",function(event) {
  //     if (event.target.class == modal) {
  //       document.querySelector('.modal').style.display="none";
  //     }
  //   })
  }
  // slider  -------------------------------------------->
  $(document).ready(function(){
    jQuery('#camera_wrap').camera({
            loader: false,
            pagination: false ,
            minHeight: '444',
            thumbnails: false,
            height: '48.375%',
            caption: true,
            navigation: true,
            fx: 'mosaic'
    });
    /*carousel*/
    var owl=$("#owl");
            owl.owlCarousel({
            items : 2, //10 items above 1000px browser width
            itemsDesktop : [995,2], //5 items between 1000px and 901px
            itemsDesktopSmall : [767, 2], // betweem 900px and 601px
            itemsTablet: [700, 2], //2 items between 600 and 0
            itemsMobile : [479, 1], // itemsMobile disabled - inherit from itemsTablet option
            navigation : true,
            pagination : false
            });
    $().UItoTop({ easingType: 'easeOutQuart' });
    });
 /*sidenav  -------===============================>*/
 
/* api from zfram code */


// async function call_getmenuwithparent(P_parent_id) {
//   var param = [];
//   param.push({
//     name: 'parent_id',
//     value: P_parent_id
//   });
//   let s = await callZf_jslib('ui/view/menu/', 'getmenuwithparent', param, 2);
//   return s;
// }


// /*getting data  from database for main menu sid nav*/
//  /*-- کلاس مرتبط با دیتاساید منو اول  --*/
//    function IcreateMenu(id,name,parentId,master){
//             this.Id=id;
//             this.Name=name;
//             this.ParentId=parentId;
//             this.Master=master;
//         }
// let  menuList=[];
// async function getData (id){
//     let data= await call_getmenuwithparent(id);
//     return data ; 
// }
// const createMenu =async function (){
 
//     const id  = 1;
//     const menudata = await  getData(1);
//     for(let i = 0 ; i < menudata.length ; i++){
//         const itemEl= document.createElement('a');
//         const itemLi = document.createElement('li')
//         const itemPo = document.getElementById('mySidenavList');
//         itemEl.textContent = menudata[i].CATEGORY_NAME ;
       
        
        
// /*--create icon for submenu --*/
       
//         const sideList2 = await getData(menudata[i].CATEGORY_ID);
        
//         itemLi.appendChild(itemEl);
//         itemPo.appendChild(itemLi);
//         if (sideList2.length > 0 && sideList2[0].MSG==undefined){
//             sideList2.map(item =>{
//               const submenuIcon = document.createElement('i');
//               submenuIcon.className = 'fa fa-angle-left float-left';
//               const itemEl2= document.createElement('a');
//               const itemLi2 = document.createElement('li');
//               itemEl2.textContent = item.CATEGORY_NAME ;
//               itemEl2.classList.add('sideChild');
//               itemEl2.appendChild(submenuIcon);
//               itemEl2.addEventListener('click',()=>{
//               /* this function is in indexjs.js */
//                 openSecound();
//             })
//               itemLi2.appendChild(itemEl2);
//               itemPo.appendChild(itemLi2);
//             }) ;
            
//         }
         
//     }
// }
// createMenu();





//  /*-- کلاس مرتبط با دیتاساید منو اول  --*/

// /**بعد از ورود به سیستم  */
// if(localStorage.getItem('userItem')!=null){
//   const username = localStorage.getItem('userItem') ;
//   localStorage.removeItem('userItem')
//   const poUsernameMenu = document.getElementById("userMenu");
//   const poUsernameSide = document.getElementById("userSide");
//   poUsernameSide.textContent = username ;
//   poUsernameMenu.textContent = username ;
  
// }
//-----------------------after transpile --------------

"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function call_getmenuwithparent(_x) {
  return _call_getmenuwithparent.apply(this, arguments);
}
/*getting data  from database for main menu sid nav*/

/*-- کلاس مرتبط با دیتاساید منو اول  --*/


function _call_getmenuwithparent() {
  _call_getmenuwithparent = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(P_parent_id) {
    var param, s;
    return regeneratorRuntime.wrap(function _callee2$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            param = [];
            param.push({
              name: 'parent_id',
              value: P_parent_id
            });
            _context3.next = 4;
            return callZf_jslib('ui/view/menu/', 'getmenuwithparent', param, 2);

          case 4:
            s = _context3.sent;
            return _context3.abrupt("return", s);

          case 6:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee2);
  }));
  return _call_getmenuwithparent.apply(this, arguments);
}

function IcreateMenu(id, name, parentId, master) {
  this.Id = id;
  this.Name = name;
  this.ParentId = parentId;
  this.Master = master;
}

var menuList = [];

function getData(_x2) {
  return _getData.apply(this, arguments);
}

function _getData() {
  _getData = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(id) {
    var data;
    return regeneratorRuntime.wrap(function _callee3$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return call_getmenuwithparent(id);

          case 2:
            data = _context4.sent;
            return _context4.abrupt("return", data);

          case 4:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee3);
  }));
  return _getData.apply(this, arguments);
}

var createMenu = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    var id, menudata, _loop, i;

    return regeneratorRuntime.wrap(function _callee$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            id = 1;
            _context2.next = 3;
            return getData(1);

          case 3:
            menudata = _context2.sent;
            _loop = /*#__PURE__*/regeneratorRuntime.mark(function _loop(i) {
              var itemEl, itemLi, itemPo, sideList2;
              return regeneratorRuntime.wrap(function _loop$(_context) {
                while (1) {
                  switch (_context.prev = _context.next) {
                    case 0:
                      itemEl = document.createElement('a');
                      itemLi = document.createElement('li');
                      itemPo = document.getElementById('mySidenavList');
                      itemEl.textContent = menudata[i].CATEGORY_NAME;
                      /*--create icon for submenu --*/

                      _context.next = 6;
                      return getData(menudata[i].CATEGORY_ID);

                    case 6:
                      sideList2 = _context.sent;
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
                      return _context.stop();
                  }
                }
              }, _loop);
            });
            i = 0;

          case 6:
            if (!(i < menudata.length)) {
              _context2.next = 11;
              break;
            }

            return _context2.delegateYield(_loop(i), "t0", 8);

          case 8:
            i++;
            _context2.next = 6;
            break;

          case 11:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee);
  }));

  return function createMenu() {
    return _ref.apply(this, arguments);
  };
}();

createMenu();
/*-- کلاس مرتبط با دیتاساید منو اول  --*/

/**بعد از ورود به سیستم  */

if (localStorage.getItem('userItem') != null) {
  var username = localStorage.getItem('userItem');
  localStorage.removeItem('userItem');
  var poUsernameMenu = document.getElementById("userMenu");
  var poUsernameSide = document.getElementById("userSide");
  poUsernameSide.textContent = username;
  poUsernameMenu.textContent = username;
}

