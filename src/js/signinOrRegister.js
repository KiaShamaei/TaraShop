

//zfarma code to call services 
 async function call_existaccountuser(P_emailmobile)
 {
      var param = []; 
           param.push({name:'emailmobile', value:P_emailmobile});
 
            let s= await  callZf_jslib('activity/account/','existaccountuser',param,2); 
           return s; 
 }


const alertMessage = document.getElementById("alertMessage") ;
 const do_existaccountuser = async function ( item ) {
 
     let result  =await call_existaccountuser(item);


     if ( result.Mid == 0  )
     alertMessage.style.display="block";
     else{
         const fullname = result.MName + "-" + result.MLastname;
        localStorage.setItem('userItem', fullname );
        localStorage.setItem('userId', result.Mid);
        localStorage.setItem('userName' , item)
        window.location.replace("/ZSHOP/SHOP/Register/signin.html");
     }


 }


  const username = document.querySelector('#username') ;
  const formSignin = document.querySelector('#formSignin');

formSignin.addEventListener('submit', function(e){
    debugger;
    e.preventDefault();
    const checkinput = checkRequired($('#username'),$("#alertMesssage"));
    if(checkinput)
    {

        do_existaccountuser($('#username').val());
    }

})