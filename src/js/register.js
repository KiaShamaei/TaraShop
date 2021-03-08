$(document).ready(function () {
//call geting recaPTCHA IMGAE.
    loadimage();

async function call_getcaptcha(P_value) {
    var param = [];
    param.push({ name: 'value', value: P_value });
    let s = await callZf_jslib('security/captcha/', 'getcaptcha', param, 1);
    return s;
}

async function loadimage() {
    let c = await call_getcaptcha('1234567899');
    var dataimage = c.chimage;
    imgcaptcha.src = "data:image/png;base64," + dataimage;
}
//check mobile and captcha be sync ---------------------------------

async function call_checkmobileno(P_captcha, P_mobileno,P_password) {
    var param = [];
    param.push({ name: 'captcha', value: P_captcha });
    param.push({ name: 'mobileno', value: P_mobileno });
    param.push({name:'password', value:P_password});
    let s = await callZf_jslib('security/reg/', 'checkmobileno', param, 2);
    return s;
}
async function DoVerify() {

    var capthca_code = txtcaptcha.value;
    var mobile_no = usermobile.value;
    var password = userpassword.value;
    //var test= IsIranPhone(mobile_no);
    let c = await call_checkmobileno(capthca_code, mobile_no,password);
    var mid = c.Mid;
    if (mid == 4) {
        //alert(mid);
        //console.log(window.history);
        //window.history.pushState({}, null, '/ZSHOP/SHOP/verifycode.html');
        window.location.replace("./verifycode.html");
    }

    //alert(mid);

}

//valid mobile test of form with valid function -----------

$("#usermobile").on('change', function () {
    const showmessage = $("#validMobile");
    const checkmobile = IsIranPhone($(this), showmessage)
    
    
    if (checkmobile){
        $('#cmdcheck').removeAttr('disabled')
    }else{
        $('#cmdcheck').attr('disabled','disabled') 
    }
})
//valid password enter check ------------------------------   
$("#userpassword").on('change', function () {
    const showmessage = $("#validpassword");
    const checkpassword = IsPassword($(this), showmessage)
    if (checkpassword){
        $('#cmdcheck').removeAttr('disabled')
    }else{
        $('#cmdcheck').attr('disabled','disabled') 
    }

})
//show passsword by click blink icon 
const icon = document.getElementById('iconpass');
const inputTarget = document.getElementById('userpassword')
togglePassword(icon,inputTarget);

//submit form
$('#signForm').on('submit', function(e){
    e.preventDefault();
    DoVerify();
})
//relaod captcha from server 
const reload = document.getElementById("repeatCaptcha");
reload.addEventListener("click",()=>{
    loadimage();
})














});



