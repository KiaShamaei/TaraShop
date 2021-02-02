$(document).ready(function () {
    const username = $('#name');
    const nationalcode = $('#nationalCodUser')

    const fname = $('#familyUser');
    const postalcode = $('#postalCodUser');
    const email = $('#emailUser');





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

    //check required
    username.on('change', function () {
        checkRequired($(this), $('#alertName'));
    });
    //show caledaer in input ==============================
    $("#date-id").pDatepicker({
        observer: true,
        format: 'YYYY/MM/DD',
    });

//zfram function=======================================
async function call_setinitialinfo(P_name, P_fname, P_nationalcode, P_birthday, P_postalcode, P_emailaddress, P_address) {
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

async function Do_setinitialinfo() {
    debugger;
    const fname = $("#name").val();
    const lname = $('#fname').val();
    const ncode = $('#nationalCodUser').val();
    const birthday = toEnglishDigits($('#date-id').val());
    const postcod = $('#postalCodUser').val();
    const email = $('#emailUser').val();
    const addUser = $('#addUser').val();
    let s = await call_setinitialinfo(fname, lname, ncode, birthday, postcod, email, addUser);
    var mid = s.Mid;
    if (mid == 1) {
        window.location.replace('./salerInitialInfoF.html')
    }
    else {
        alert('خطایی در سیستم رخ داده لطفا مجدد تلاش کنید ');
    }

}
//Do required and subit ===================================================
const submit = document.getElementById('formInfo');
submit.addEventListener('submit', function (e) {
    debugger;
    e.preventDefault();
    const check1 = checkRequired($("#name"),$('#alertName'));
    const check2 =checkRequired($('#fname'),$('#alertFname'));
    const check3 =checkRequired($('#nationalCodUser'),$('#alertNationalCod'));
    const check4 =checkRequired($('#date-id'),$('#alertDate'));
    const check5 =checkRequired($('#postalCodUser'),$('#alertPosatlcode'));
    const check6 =checkRequired($('#emailUser'),$('#alertEmail'));
    if(check1&&check2&&check3&&check4&&check5&&check6)
    {
        Do_setinitialinfo();

    }
    else
    {
        $("#nameUser").select()
    }

})



})