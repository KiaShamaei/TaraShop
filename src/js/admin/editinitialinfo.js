$(document).ready(function(){
  const username = $('#name');
  const nationalcode = $('#nationalCodUser')

  const fname = $('#familyUser');
  const postalcode = $('#postalCodUser');
  const email = $('#emailUser');
  const mobile =$('#mobileuser');





  //valid input
  nationalcode.on('change', function () {
      NationalCode($(this), $("#alertNationalCod"));
  });

  postalcode.on('change', function () {
      IsIranPostalCode($(this), $('#alertPosatlcode'))
  });
  email.on('change', function () {
      ValidateEmail($(this), $('#alertEmail'))
  });
  mobile.on('change',function(){
    IsIranPhone($(this),$("#alertmobile"))
  })


  //check required
  username.on('change', function () {
      checkRequired($(this), $('#alertName'));
  });
  //show calender in input ==============================
  $("#date-id").pDatepicker({
      observer: true,
      format: 'YYYY/MM/DD',
  });
//get from zfram services ---------------------
class GetInfo{
  async  call_getsalerinfo(P_mobile)
  {
     var param = []; 
        param.push({name:'mobile', value:P_mobile});
  
         let s= await  callZf_jslib('register/saler/fetchdata/','getsalerinfo',param,2); 
        return s; 
  }  
 async Do_getsalerinfo(){
  const mobileuser= localStorage.getItem('token');
  const info = await this.call_getsalerinfo(mobileuser);
  //localStorage.setItem('id',info[0].ENTITY_ID);
  const form = $('#formInfo');
  $('#name').val(info[0].FIRSTNAME);
  $('#fname').val(info[0].LASTNAME);
  $('#parentuser').val(info[0].FATHER_NAME);
  $('#mobileuser').val(info[0].MOBILE);
  $('#nationalCodUser').val(info[0].NATIONALCODE);
  $('#emailUser').val(info[0].EMAIL_ADDRESS);
  $('#postalCodUser').val(info[0].POSTAL_CODE);
  $('#addUser').val(info[0].MAIN_ADDRESS);
  $('#date-id').val(info[0].BIRTHDATE);
 
  }

}
const getinfo = new GetInfo() ;
getinfo.Do_getsalerinfo();

//after edit store edition in databased 
class SubmitEdit {
  async  call_setinitialinfo(P_name, P_fname, P_nationalcode, P_birthday, P_postalcode, P_emailaddress, P_address) {
    var param = [];
    param.push({ name: 'name', value: P_name });
    param.push({ name: 'fname', value: P_fname });
    param.push({ name: 'nationalcode', value: P_nationalcode });
    param.push({ name: 'birthday', value: P_birthday });
    param.push({ name: 'postalcode', value: P_postalcode });
    param.push({ name: 'emailaddress', value: P_emailaddress });
    param.push({ name: 'address', value: P_address });
  
  
    let s = await callZf_jslib('register/setinfo/', 'setinitialinfo', param, 2);
    return s;
  }
  async Do_setinitialinfo() {
  
    const fname = $("#name").val();
    const lname = $('#fname').val();
    const ncode = $('#nationalCodUser').val();
    const birthday = toEnglishDigits($('#date-id').val());
    const postcod = $('#postalCodUser').val();
    const email = $('#emailUser').val();
    const addUser = $('#addUser').val();
    let s = await this.call_setinitialinfo(fname, lname, ncode, birthday, postcod, email, addUser);
    var mid = s.Mid;
    if (mid == 1) {
   debugger
        $('#editAccept').modal('show');
       
        //var ss=window.location.origin+"/ZSHOP/SHOP/admin/index.html";
        // window.location.assign(window.location.origin+"/ZSHOP/SHOP/admin/index.html");
        //window.location.replace("#/redirect");

    }
    else {
        alert('خطایی در سیستم رخ داده لطفا مجدد تلاش کنید ');
    }
  
  }
}
//submitpart with zfram function in submitedit class------------
$("#formInfo").on('submit', (e)=>{
  
  e.preventDefault();
  const submitedit = new SubmitEdit() ;
  const check1 = checkRequired($("#name"),$('#alertName'));
  const check2 =checkRequired($('#fname'),$('#alertFname'));
  const check3 =checkRequired($('#nationalCodUser'),$('#alertNationalCod'));
  const check4 =checkRequired($('#date-id'),$('#alertDate'));
  const check5 =checkRequired($('#postalCodUser'),$('#alertPosatlcode'));
  const check6 =checkRequired($('#emailUser'),$('#alertEmail'));
  if(check1&&check2&&check3&&check4&&check5&&check6)
  {
    submitedit.Do_setinitialinfo();

  }
  else
  {
      $("#nameUser").select()
  }

})
$('#acceptEdit').on('click',function(){
  window.location.assign(window.location.origin+"/ZSHOP/SHOP/admin/index.html");
})



})
