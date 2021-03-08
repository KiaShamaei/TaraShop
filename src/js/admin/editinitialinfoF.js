$(document).ready(function () {
    const ecoNum = $("#ecoNum");
    const storeNcode = $('#storeNcode');
    const telStore = $('#telStore');
    const faxStore = $('#faxStore');
    const postalCodStore = $('#postalCodStore');
    const cityNum = $('#cityNum');
    const emailStore = $('#emailStore');
    //valid feild only number =====================================================
    ecoNum.on('change', function () {
        IsNumber($(this), $('#alertecoNum'));
    })
    storeNcode.on('change', function () {
        IsNumber($(this), $('#alertstoreNcode'));
    })
    telStore.on('change', function () {
        IsNumber($(this), $('#alertetelStore'));
    })
    faxStore.on('change', function () {
        IsNumber($(this), $('#alertfaxStore'))
    })
    cityNum.on('change', function () {
        IsNumber($(this), $('#alertcityNum'))
    })
    //time output manage ========================================================
    document.querySelectorAll('.time')
        .forEach(e => e.oninput = () => {
            // Always 2 digits
            if (e.value.length >= 2) e.value = e.value.slice(0, 2);
            // 0 on the left (doesn't work on FF)
            if (e.value.length === 1) e.value = '0' + e.value;
            // Avoiding letters on FF
            if (!e.value) e.value = '00';
        })
    //valid postal add 
    postalCodStore.on('change', function () {

        IsNumber($(this), $('#alertpostalCodStore'));
        IsIranPostalCode($(this), $('#alertpostalCodStore'));
    });
    //valid email ==================================
    emailStore.on('change', function () {

        ValidateEmail($(this), $('#alertemailStore'))
    })
    //checked for timeworking ==================================
    $("#open24").change(function () {

        if (this.checked) {
            $('#timeHon').attr('disabled', 'disabled');
            $('#timeMon').attr('disabled', 'disabled');
            $('#timeHoff').attr('disabled', 'disabled');
            $('#timeMoff').attr('disabled', 'disabled');
        } else {
            $('#timeHon').removeAttr('disabled');
            $('#timeMon').removeAttr('disabled');
            $('#timeHoff').removeAttr('disabled');
            $('#timeMoff').removeAttr('disabled');

        }
    });
    //checked websit is or not ===================================
    $("#siteIs").change(function () {

        if (this.checked) {
            $('#sitStore').removeAttr('disabled');
        } else {
            $('#sitStore').attr('disabled', 'disabled');
        }
    })
    class GetInfo {
        //get city from province in select------------------zfram services---------------------       
        async call_getcityfromprfovaince(P_province_id) {

            var param = [];
            param.push({ name: 'province_id', value: P_province_id });

            let s = await callZf_jslib('common/', 'getcityfromprfovaince', param, 2);
            return s;
        }

        //state provinces get ====================================================================

        async call_getproviancelist() {
            var param = [];

            let s = await callZf_jslib('common/', 'getproviancelist', param, 1);
            return s;
        }

        async fillInptPro(a, b, c) {

            const list = await a(c);
            const Ele = document.getElementById(b);
            if (c == undefined) {
                list.forEach(function (ele) {
                    const opt = document.createElement('option');
                    opt.setAttribute('value', ele.LT_PROVINCE_ID);
                    opt.textContent = ele.NAME;
                    Ele.add(opt)

                })
            }
            else {
                list.forEach(function (ele) {

                    const opt = document.createElement('option');
                    opt.setAttribute('value', ele.LT_CITY_ID);
                    opt.textContent = ele.NAME;
                    Ele.add(opt)

                })
            }
        }
       async Do_getsaleragentinfo() {
            debugger
            await this.fillInptPro(await this.call_getproviancelist, "stateStore");
            const userInfo = JSON.parse(localStorage.getItem('userInfo'));
            const result = await this.call_getsaleragentinfo(userInfo.MEntityId);
            debugger
            const arrayTimeOpen = result[0].OPEN_TIME.split(":");
            const arrayTimeClose = result[0].CLOSE_TIME.split(":");
            $('#storName').val(result[0].AGENT_NAME!=" " ? result[0].AGENT_NAME : "")
            $('#ecoNum').val(result[0].ECONOMIC_CODE!=" " ? result[0].ECONOMIC_CODE : "" )
            $('#storeNcode').val(result[0].NATIONAL_CODE!=" " ? result[0].NATIONAL_CODE : "" )
            $('#telStore').val(result[0].TEL!=" " ? result[0].TEL : "" )
            $('#faxStore').val(result[0].FAX!=" " ? result[0].FAX : "" )
            $('#postalCodStore').val(result[0].POSTALCODE!=" " ? result[0].POSTALCODE : "")
            $('#emailStore').val(result[0].EMAIL!=" " ? result[0].EMAIL : "")
            $('#stateCityStore').val(result[0].REGION!=" " ? result[0].REGION : "")
            $('#cityNum').val(result[0].BUILDING_NUMBER!=" " ?result[0].BUILDING_NUMBER : "")
            $('#cityStore').val(result[0].LT_CITY_ID ? result[0].LT_CITY_ID : "" )
            $('#typeStore').val(result[0].AGENT_TITLE!=" " ? result[0].AGENT_TITLE :"")
            $('#sitStore').val(result[0].URL!=" " ? result[0].URL : "")
            $('#addStore').val(result[0].ADDRESS!=" " ? result[0].ADDRESS : "" )


            $('#stateStore').val(result[0].LT_PROVINCE_ID)
            await this.fillInptPro( await this.call_getcityfromprfovaince, 'cityStore', result[0].LT_PROVINCE_ID)

            
            if (parseInt(arrayTimeOpen[0]) == 0 && parseInt(arrayTimeOpen[1]) == 1 && parseInt(arrayTimeClose[0]) == 23 && parseInt(arrayTimeClose[1]) == 59) {
                $("#open24").prop('checked', true);

            } else {
                $('#timeHon').val(parseInt(arrayTimeOpen[0]));
                $('#timeMon').val(parseInt(arrayTimeOpen[1]));
                $('#timeHoff').val(parseInt(arrayTimeClose[0]));
                $('#timeMoff').val(parseInt(arrayTimeClose[1]));
            }
            if (result[0].URL) {
                $('#siteIs').prop('checked', true);
                $('#sitStore').removeAttr('disabled')
            }
        }
        //----geting data from zfram service

        async call_getsaleragentinfo(P_owner_entity_id) {
            var param = [];
            param.push({ name: 'owner_entity_id', value: P_owner_entity_id });

            let s = await callZf_jslib('register/saler/fetchdata/', 'getsaleragentinfo', param, 1);
            return s;
        }
    }
    const getinfo = new GetInfo();

    //GetInfo class end =================================================================================
    getinfo.Do_getsaleragentinfo();
    //state and number input 
    $('#stateStore').on('change', async function () {


        const provId = $(this).val();
        const selectEle = document.getElementById('cityStore');
        selectEle.innerHTML = ""
        const initialcity = { LT_CITY_ID: 0, NAME: "لطفا شهر خود را انتخاب کنید " };
        const res = await getinfo.call_getcityfromprfovaince(provId);
        res.unshift(initialcity)
        res.forEach(element => {

            const opt = document.createElement('option');
            opt.setAttribute('value', element.LT_CITY_ID);
            opt.textContent = element.NAME;
            selectEle.add(opt)
        });
    })
    //class of edit info and set to database -------------------
    class SetInfo {
        async Do_setinitialinfo() {
            debugger

            const storeName = $("#storName").val();
            const ecoNum = $('#ecoNum').val();
            const storeNcode = $('#storeNcode').val();
            const telStore = $('#telStore').val();
            const postalCodStore = $('#postalCodStore').val();
            const faxstore = $('#faxStore').val();
            const emailStore = $('#emailStore').val();
            const sitStore = $('#sitStore').val();
            const region = $('#stateCityStore').val();
            const building_number = $('#cityNum').val();
            let closeTimeStore = "23:59";
            let openTimeStore = "00:01";

            if ($('#open24').is(':checked')) {
                // closeTimeStore = "23:59";
                // openTimeStore = "00:01";

            }
            else {

                const closeTimeM = ($('#timeMon').val()) ? $('#timeMon').val() : ":00";
                closeTimeStore = $('#timeHon').val() + closeTimeM;
                const openTimeM = ($('#timeMoff').val()) ? $('#timeMoff').val() : ":00";
                openTimeStore = $('#timeHoff').val() + openTimeM;
            }

            const cityStore = $('#cityStore').val();
            const storeAddr = $("#addStore").val();

            let s = await this.call_setinitialinfoagent(storeName, sitStore, telStore, storeAddr, storeNcode, openTimeStore, closeTimeStore, cityStore, region, building_number, postalCodStore, faxstore, emailStore, ecoNum);
            var mid = s.Mid;
            if (mid == 1) {

                $('#editAccept').modal('show');
               
            }
            else {
                alert('خطایی در سیستم رخ داده لطفا مجدد تلاش کنید ');
            }

        }
        //do zfram================================ services
        async call_setinitialinfoagent(P_agent_name, P_url, P_tel, P_address, P_national_code, P_open_time, P_close_time, P_city_id, P_region, P_building_number, P_postalcode, P_fax, P_email, P_economic_code) {
            var param = [];
            param.push({ name: 'agent_name', value: P_agent_name });
            param.push({ name: 'url', value: P_url });
            param.push({ name: 'tel', value: P_tel });
            param.push({ name: 'address', value: P_address });
            param.push({ name: 'national_code', value: P_national_code });
            param.push({ name: 'open_time', value: P_open_time });
            param.push({ name: 'close_time', value: P_close_time });
            param.push({ name: 'city_id', value: P_city_id });
            param.push({ name: 'region', value: P_region });
            param.push({ name: 'building_number', value: P_building_number });
            param.push({ name: 'postalcode', value: P_postalcode });
            param.push({ name: 'fax', value: P_fax });
            param.push({ name: 'email', value: P_email });
            param.push({ name: 'economic_code', value: P_economic_code });
    
            let s = await callZf_jslib('register/setinfo/', 'setinitialinfoagent', param, 2);
            return s;
        }
    }
    const setinfo = new SetInfo();
    setinfo.Do_setinitialinfo();
    //submit form 
    //site input enable if checkbox checked
    $('#siteIs').on('change', function () {
        if (!(this).checked) {
            $("#sitStore").attr('disabled', 'disabled')

        } else {
            $('#sitStore').removeAttr('disabled')
        }
    })
    //submit form 

    const submit = document.getElementById('formInfo');
    submit.addEventListener('submit', function (e) {

        e.preventDefault();
        const check1 = checkRequired($("#storName"), $('#alertstorName'));
        const check2 = checkRequired($('#ecoNum'), $('#alertecoNum'));
        const check3 = checkRequired($('#storeNcode'), $('#alertstoreNcode'));
        const check4 = checkRequired($('#telStore'), $('#alerttelStore'));
        const check5 = checkRequired($('#faxStore'), $('#alertfaxStore'));
        const check6 = checkRequired($('#postalCodStore'), $('#alertpostalCodStore'));
        const check7 = checkRequired($('#emailStore'), $('#alertemailStore'));
        const check8 = checkRequired($('#stateStore'), $('#alertstateStore'));
        const check9 = checkRequired($('#cityStore'), $('#alertcityStore'));
        const check10 = checkRequired($('#cityNum'), $('#alertcityNume'));
        const check11 = checkRequired($('#typeStore'), $('#alerttypeStore'));



        if (check1 && check2 && check3 && check4 && check5 && check6 && check7 && check8 && check9 && check10 && check11) {
            //try
            //{
            setinfo.Do_setinitialinfo();


            //}catch(e)
            //{
            //throw(e,"اطلاعات ثبت نشد مجدد تلاش کنید ")

            //}

        }
        else {
            $("#nameUser").select()
        }

    })
    //site input enable if checkbox checked
    $('#siteIs').on('change', function () {
        if (!(this).checked) {
            $("#sitStore").attr('disabled', 'disabled')

        } else {
            $('#sitStore').removeAttr('disabled')
        }
    })
    $('#acceptEdit').on('click',function(){
        window.location.assign(window.location.origin+"/ZSHOP/SHOP/admin/index.html");
      })




})