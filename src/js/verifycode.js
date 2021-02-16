
class doZframe{
    async call_verifycode(P_verifycode) {
        var param = [];
        param.push({ name: 'verifycode', value: P_verifycode });
    
        let s= await  callZf_jslib('security/verify/','verifycode',param,1); 
        return s;
      }
      async check_verify() {
        //event.preventDefault();
        var passCode = $('#pwd').val();
        let c = await this.call_verifycode(passCode);
        if (c.Mid == 1) {
          window.location.replace("./initialInfo.html");
          //alert('Accept Code')
        }
        else {
          alert('کد ارسالی اشتباه وارد شده لطفا مجدد تلاش کنید ')
        }
      }
}

$('#verifyForm').on('submit',function(e){
    e.preventDefault();
    const dozee = new doZframe;
    dozee.check_verify();

})