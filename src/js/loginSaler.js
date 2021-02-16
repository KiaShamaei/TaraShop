$(document).ready(function () {




    //-----------------valid test of form with valid function -----------
    $("#usermobile").on('change', function () {
        const showmessage = $("#validusermobile")
        IsIranPhone($(this), showmessage);
    })

class GetCaptcha {
        //get captcha image==zfram service
        async call_getcaptcha(P_value) {
            var param = [];
            param.push({ name: 'value', value: P_value });
            let s = await callZf_jslib('security/captcha/', 'getcaptcha', param, 1);
            return s;
        }
    
    
        async  loadimage() {
            let c = await this.call_getcaptcha('1234567899');
            var dataimage = c.chimage;
            imgcaptcha.src = "data:image/png;base64," + dataimage;
        }
}
const getcaptcha = new GetCaptcha();



    getcaptcha.loadimage();

//------------------------------------zfram api code ----------------
class Login {
    async  call_loginuser(P_mobileno, P_password, P_captha) {
        var param = [];
        param.push({ name: 'mobileno', value: P_mobileno });
        param.push({ name: 'password', value: P_password });
        param.push({ name: 'captha', value: P_captha });

        let s = await callZf_jslib('activity/loginuser/', 'loginuser', param, 2);
        return s;
    }

    async  Do_loginuser(usermobile, userpass, captcha) {
        
        let response = await this.call_loginuser(usermobile, userpass, captcha)
        if (response.Mid > 0) {
            localStorage.setItem("token", response.Mid)
            localStorage.setItem('id',response.ENTITYID);
            window.location.replace('../../admin/index.html')
        }else if(response.Mid == 0)
        {
            $('#validusermobile').html('رمز عبور اشتباه است ')

        }else  if(response.Mid == -1)
        {
            $('#validusermobile').html('کد کپچا اشتباه است ')
        }
    }
}
//submit login -------------------------
const login = new Login();


    
    $("#form").on("submit", function (e) {
        e.preventDefault();
        const usermobile = $("#usermobile").val();
        const userpass = $("#userpassword").val();
        const captcha = $("#txtcaptcha").val();
       
        login.Do_loginuser(usermobile, userpass, captcha);
    })

//toggleshow password ==================================================
//show passsword by click blink icon 
const icon = document.getElementById('passIcon');
const inputTarget = document.getElementById('userpassword')
togglePassword(icon, inputTarget);
// const iconre = document.getElementById('repassIcon');
// const inputTargetre = document.getElementById('repassword')
// togglePassword(iconre, inputTargetre);

});