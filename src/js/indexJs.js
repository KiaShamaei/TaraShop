
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
    items: 2, //10 items above 1000px browser width
    itemsDesktop: [995, 2], //5 items between 1000px and 901px
    itemsDesktopSmall: [767, 2], // betweem 900px and 601px
    itemsTablet: [700, 2], //2 items between 600 and 0
    itemsMobile: [479, 1], // itemsMobile disabled - inherit from itemsTablet option
    navigation: true,
    pagination: false
  });
  $().UItoTop({ easingType: 'easeOutQuart' });


  /*sidenav  -------===============================>*/

  /* api from zfram code */
  class GetDataZframe {

    async call_getmenuwithparent(P_parent_id) {
      var param = [];
      param.push({
        name: 'parent_id',
        value: P_parent_id
      });
      let s = await callZf_jslib('ui/view/menu/', 'getmenuwithparent', param, 2);
      return s;
    }
    async getData(id) {
      let data = await this.call_getmenuwithparent(id);
      return data;
    }

  }
  const getDataZframe = new GetDataZframe();



  /*getting data  from database for main menu sid nav*/
  /*-- کلاس مرتبط با دیتاساید منو اول  --*/
  class ViewMenu {

    static async createMenu() {
      const menudata = await getDataZframe.getData(1);
      for (let i = 0; i < menudata.length; i++) {
        const itemEl = document.createElement('a');
        const itemLi = document.createElement('li')
        const itemPo = document.getElementById('mySidenavList');
        itemEl.textContent = menudata[i].CATEGORY_NAME;

        const sideList2 = await getDataZframe.getData(menudata[i].CATEGORY_ID);

        itemLi.appendChild(itemEl);
        itemPo.appendChild(itemLi);
        if (sideList2.length > 0 && sideList2[0].MSG == undefined) {
          sideList2.map(item => {
            const submenuIcon = document.createElement('i');
            submenuIcon.className = 'fa fa-angle-left float-left';
            const itemEl2 = document.createElement('a');
            const itemLi2 = document.createElement('li');
            itemEl2.textContent = item.CATEGORY_NAME;
            itemEl2.classList.add('sideChild');
            itemEl2.appendChild(submenuIcon);
            itemEl2.addEventListener('click', () => {
              /* this function is in indexjs.js */
              openSecound();
            })
            itemLi2.appendChild(itemEl2);
            itemPo.appendChild(itemLi2);
          });

        }

      }
    }
  }

  ViewMenu.createMenu();





  /*-- کلاس مرتبط با دیتاساید منو اول  --*/

  /**بعد از ورود به سیستم  */
  if (localStorage.getItem('userInfo') != null && localStorage.getItem("token")==1) {
    debugger;
    const userEntity = JSON.parse(localStorage.getItem('userInfo'));
    const username = userEntity.MName + "-" + userEntity.MLastname;
    
    const poUsernameMenu = document.getElementById("userMenu");
    const poUsernameSide = document.getElementById("userSide");
    const dropDown = document.getElementById("dropUser");


    poUsernameMenu.setAttribute("data-toggle", "dropdown")
    poUsernameSide.textContent = username;
    poUsernameMenu.textContent = username;



  }
  $('#exitUser').on('click', function () {
    localStorage.clear();
    location.reload();
  })

});

// inline call function use in modal 
const openNav = function () {
  document.getElementById("mySidenav").style.width = "350px";
  document.querySelector('.modal').style.display = "block";
}


const modal = document.getElementById("main-nav");
const btn = document.getElementById("btn-slideMenu");


function openSecound() {
  document.getElementById("mySidenav2").style.width = "350px";

}
function closeNav2() {
  document.getElementById("mySidenav2").style.width = "0";
}
document.querySelector('#closeSide2').addEventListener('click', function () {
  closeNav2();
})
const closeNav = function () {
  document.getElementById("mySidenav").style.width = "0";
  document.querySelector('.modal').style.display = "none";
}
