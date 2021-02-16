$(document).ready(function(){
 
 
// if  user comes from loginsaler or be in this page ---------------------------- 
if (localStorage.getItem('token') != null )
{
    //get from zfram services ---------------------
    async function call_getsalerinfo(P_mobile)
    {
       var param = []; 
          param.push({name:'mobile', value:P_mobile});
    
           let s= await  callZf_jslib('register/saler/fetchdata/','getsalerinfo',param,2); 
          return s; 
    }
    

const Do_getsalerinfo= async function(){
    const mobileuser= localStorage.getItem('token');
    const info = await call_getsalerinfo(mobileuser)
    $('#user').html(info[0].FIRSTNAME+" "+ info[0].LASTNAME);
    $('#username').html(info[0].FIRSTNAME+" "+ info[0].LASTNAME);
}
Do_getsalerinfo();
}
else
{
//must be open after edition end ------------------------------------------------------------------------------
  // window.location.replace('../public/pages/loginsaler.html')
}


//=================================dynamic sammy 

(function($) {
    var app = $.sammy('#wrapper-dynamic', function() {
      this.debug = true;
      var form_fields = null;

      this.get('#/', function() {
        this.app.swap('');
        this.partial('partial/main.html');
      });

      this.get('#/redirect', function() {
        this.app.swap('');
        this.redirect('#/');
      });

      this.get('#/d-editinfo', function() {
        this.app.swap('');
        this.partial('partial/d-editinfo.html');
      });
      this.get('#/d-editinfoF', function() {
        this.app.swap('');
        this.partial('partial/d-editinfoF.html');
      });
      this.get('#/color-theme', function() {
        this.app.swap('');
        this.partial('partial/color-theme.html');
      });
      this.get('#/othersetting-theme', function() {
        this.app.swap('');
        this.partial('partial/othersetting-theme.html');
      });
      this.get('#/typography-theme', function() {
        this.app.swap('');
        this.partial('partial/typography-theme.html');
      });
      this.get('#/chart', function() {
        this.app.swap('');
        this.partial('partial/chart.html');
      });
      this.get('#/tabel', function() {
        this.app.swap('');
        this.partial('partial/tabel.html');
      });

    

    });

    $(function() {
      app.run('#/');
    });

  })(jQuery);
  //--- end of sammy 

//exit of admin page ===== 
  $('#acceptExit').on('click',function(){
    window.location.assign(window.location.origin+"/ZSHOP/SHOP/index.html");
    localStorage.clear();
  })




})
