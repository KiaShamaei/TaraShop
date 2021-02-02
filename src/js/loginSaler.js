



//-----------------valid test of form with valid function -----------
$("#useremail").on('change', function(){
    const showmessage = $("#validEmail")
    ValidateEmail($(this),showmessage);
})

//get captcha image==zfram service
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


//------------------------------------zfram api code ----------------
async function call_registersaler(P_email,P_mobile,P_captcha)
{
	 var param = []; 
	 	 param.push({name:'email', value:P_email});
	 	 param.push({name:'mobile', value:P_mobile});
	 	 param.push({name:'captcha', value:P_captcha});

 	 	 let s= await  callZf_jslib('activity/register/','registersaler',param,2); 
	 	 return s; 
}
async function Do_registersaler (useremail, usermobile, captcha) {
    let response = await call_registersaler(useremail, usermobile, captcha)
    if (response.Mid == 4) {
        localStorage.setItem("token",response.Mid)
        window.location.replace('./registerSalerVerifyCode.html')
    }
}

$("#form").on("submit", function (e) {
    const useremail = $("#useremail").val();
    console.log(useremail)
    const usermobile = $("#usermobile").val();
    const captcha = $("#txtcaptcha").val();
    e.preventDefault();
    Do_registersaler(useremail, usermobile, captcha);
})

});