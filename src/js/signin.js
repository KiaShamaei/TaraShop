const userItem = document.getElementById("userItem");
const userEntity = localStorage.getItem('userItem');
const userName = localStorage.getItem('userName');
const userId = localStorage.getItem('userId');
userItem.textContent = userName;
const userPasswordForm = document.getElementById("userpass");
let password ="";



async function call_checkpassword(P_password,P_entityid)
{
    var param = []; 
    param.push({name:'password', value:P_password});
    param.push({name:'entityid', value:P_entityid});
    
    let s= await  callZf_jslib('activity/loginuser/checkpassword/','checkpassword',param,2); 
    return s; 
}
const alertMessage = document.getElementById("alertMessage") ;
const do_validity =async function (item1,item2){
    
  const result= await call_checkpassword (item1 , item2 )
  if (result.Mid == 0 ){
      
      alertMessage.style.display = "block";

  }else {
    window.location.replace("/ZSHOP/SHOP/index.html");

  }

    
}
userPasswordForm.addEventListener('submit', function(e){
  debugger;
    e.preventDefault();
    password = e.target.elements[0].value ;
   
    do_validity(password , userId)
    localStorage.removeItem('userId');
})


localStorage.removeItem('userName');