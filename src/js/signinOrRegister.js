
  const username = document.querySelector('#username') ;
  const formSignin = document.querySelector('#formSignin');
  const alertMessage = document.getElementById("alertMessage") ;

//zfarma code to call services 
class GetdataZfram{
    async  call_existaccountuser(P_emailmobile)
    {
         var param = []; 
              param.push({name:'emailmobile', value:P_emailmobile});
    
               let s= await  callZf_jslib('activity/account/','existaccountuser',param,2); 
              return s; 
    }
   
   
   
    async do_existaccountuser ( item ) {
    
        let result  =await this.call_existaccountuser(item);
   
   
        if ( result.Mid == 0  )
        alertMessage.style.display="block";
        else{
            
        //     const fullname = result.MName + "-" + result.MLastname;
        //    localStorage.setItem('userItem', fullname );
        //    localStorage.setItem('userId', result.Mid);
        //    localStorage.setItem('userName' , item)
           localStorage.setItem("userInfo",JSON.stringify( result))
           window.location.replace("/ZSHOP/SHOP/public/pages/signin.html");
        }
   
   
    }
   
}

const getdataZfram = new GetdataZfram();
formSignin.addEventListener('submit', function(e){

    e.preventDefault();
    const checkinput = checkRequired($('#username'),$("#alertMesssage"));
    if(checkinput)
    {

        getdataZfram.do_existaccountuser($('#username').val());
    }

})