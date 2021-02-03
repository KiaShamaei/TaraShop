
 async function call_verifycode(P_verifycode)
 {
      var param = []; 
           param.push({name:'verifycode', value:P_verifycode});
 
            let s= await  callZf_jslib('security/verify/','verifycode',param,1); 
           return s; 
 }

const formSubmit = $('#form');
const code = $('#pwd')
formSubmit.on('submit',async function(e){
    e.preventDefault();
    let c = await call_verifycode(code.val());
    if (c.Mid == 1) {
        window.location.replace("./salerInitialInfo.html");
        //alert('Accept Code')
    } else {
        $('#alert').html('کد وارد شده صحیح نمی باشد ')
    }
})


