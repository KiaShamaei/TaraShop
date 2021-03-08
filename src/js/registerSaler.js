


//get captcha image
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

$(document).ready(function () {

    loadimage();
    //-----------------valid test of form with valid function -----------
    $("#useremail").on('change', function () {
        const showmessage = $("#validEmail")
        ValidateEmail($(this), showmessage);
    })
    $("#usermobile").on('change', function () {
        const showmessage = $("#validMobile");
        IsIranPhone($(this), showmessage)
    })
const reload = document.getElementById("repeatCaptcha");
reload.addEventListener("click",()=>{
    loadimage();
})


});

//toggleshow password ==================================================
//show passsword by click blink icon 
const icon = document.getElementById('passIcon');
const inputTarget = document.getElementById('userpassword')
togglePassword(icon, inputTarget);
const iconre = document.getElementById('repassIcon');
const inputTargetre = document.getElementById('repassword')
togglePassword(iconre, inputTargetre);

//----check password enter be same & valid =================================
$('#repassword,#userpassword').on('change', function () {
    $('#validpassword').html('');
})
$('#repassword').on('change', function () {
    if ($('#userpassword').val() == $('#repassword').val()) {
        $('#validpassword').html('')
        const isvalid = IsPassword($('#userpassword'), $('#validpassword'))
        if (isvalid) {
            $('#submit').removeAttr('disabled')
        }
    } else {
        $('#validpassword').html('رمز وارد شده یکسان نیست ')
    }

})

//------------------------------------zfram api code ----------------
async function call_registersaler(P_password, P_mobile, P_captcha) {
    var param = [];
    param.push({ name: 'mobile', value: P_mobile });
    param.push({ name: 'captcha', value: P_captcha });
    param.push({ name: 'password', value: P_password });

    let s = await callZf_jslib('activity/register/', 'registersaler', param, 2);
    return s;
}
async function Do_registersaler(userpassword, usermobile, captcha) {
    let response = await call_registersaler(userpassword, usermobile, captcha)
    if (response.Mid == 4) {
        localStorage.setItem("token", response.Mid)
        window.location.replace('./registerSalerVerifyCode.html')
    }
}

$("#form").on("submit", function (e) {
    const userpassword = $("#userpassword").val();
    const usermobile = $("#usermobile").val();
    const captcha = $("#txtcaptcha").val();
    e.preventDefault();
    Do_registersaler(userpassword, usermobile, captcha);
})

