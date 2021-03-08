const userItem = document.getElementById("userItem");
//all info of user goes to userEntity
const userEntity = JSON.parse(localStorage.getItem('userInfo'));
const userName = userEntity.MName + "-" + userEntity.MLastname;
const userId = userEntity.Mid;
userItem.textContent = userName;
const userPasswordForm = document.getElementById("userpass");
const  alertMessage = document.getElementById("alertMessage") ;
let password ="";
const icon = document.getElementById('passIcon');
const inputTarget = document.getElementById('userpassword')

//toggleshow password ==================================================
//show passsword by click blink icon 
togglePassword(icon, inputTarget);

//do zfram chseck passsword 
class GetDatazframe {
  async  call_checkpassword(P_password,P_entityid)
{
    var param = []; 
    param.push({name:'password', value:P_password});
    param.push({name:'entityid', value:P_entityid});
    
    let s= await  callZf_jslib('activity/loginuser/checkpassword/','checkpassword',param,2); 
    return s; 
}

 async do_validity  (item1,item2){  
  const result= await this.call_checkpassword (item1 , item2 )
  console.log(result.Mid)
  if (result.Mid == 0 )
   { 
    alertMessage.style.display = "block";
   }else 
   {
     localStorage.setItem("token", 1)
     window.location.replace("/ZSHOP/SHOP/index.html");

   }
  
  }
}
const getdataZfram = new GetDatazframe();
userPasswordForm.addEventListener('submit', function(e){
    e.preventDefault();
    password = e.target.elements[0].value ;
   
    getdataZfram.do_validity(password , userId);
    
  
})


