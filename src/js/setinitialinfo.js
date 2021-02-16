

$(document).ready(function () {



    //data picker and show ======================================================
    $("#date-id").pDatepicker({
        observer: true,
        format: 'YYYY/MM/DD',
    });


    //check validation
  $("#nationalCodUser").on('change', function () {
      
        NationalCode($(this), $("#alertNationalCod"));
    });
    $("#postalCodUser").on('change', function () {
        
        IsIranPostalCode($(this), $('#alertPosatlcode'))
    });
    $('#eUser').on('change', function () {
        
        ValidateEmail($(this), $('#alertEmail'))
    });

    //show caledaer in input ==============================
    $("#date-id").pDatepicker({
        observer: true,
        format: 'YYYY/MM/DD',
    });






    //submit form part -----------------------------------------------------------
    const submit = document.getElementById('formInfo');
    submit.addEventListener('submit', function (e) {
        e.preventDefault();
        
        const fname = $("#nameUser").val();
        const lname = $('#familyUser').val();
        const ncode = $('#nationalCodUser').val();
        const birthday = toEnglishDigits($('#date-id').val());
        const postcod = $('#postalCodUser').val();
        const email = $('#emailUser').val();
        const addUser = $('#addUser').val();
        const check1 = checkRequired($("#nameUser"), $('#alertName'))
        const check2 =checkRequired($('#familyUser'), $('#alertFName'))
        const check3 =checkRequired($('#nationalCodUser'), $('#alertNationalCod'))
        const check4 =checkRequired($('#date-id'), $('#alertDate'))
        const check5 =checkRequired($('#postalCodUser'), $('#alertPosatlcode'))
        const check6 =checkRequired($('#emailUser'), $('#alertEmail'))
        if(check1&&check2&&check3&&check4&&check5&&check6)
        {
        Do_setinitialinfo(fname, lname, ncode, birthday, postcod, email, addUser);
        }
        else
        {
         $("#nameUser").select()
        }

    })



    //zframe call service part =====================================================
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

    async function Do_setinitialinfo(fname, lname, ncode, birthday, postcod, email, addUser) {
        
        let s = await call_setinitialinfo(fname, lname, ncode, birthday, postcod, email, addUser);
        var mid = s.Mid;
        if (mid == 1) {
            window.location.replace('./signinOrRegister.html');
        }
        else {
            alert('Deny');
        }

    }


    function toEnglishDigits(str) {
        const persianNumbers = ["۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹", "۰"]
        const arabicNumbers = ["١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩", "٠"]
        const englishNumbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"]

        return str.split("").map(c => englishNumbers[persianNumbers.indexOf(c)] ||
            englishNumbers[arabicNumbers.indexOf(c)] || c).join("")
    }

});
