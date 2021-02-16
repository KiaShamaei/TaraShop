const userItem = document.getElementById("userItem");
const userEntity = localStorage.getItem('userItem');
const userName = localStorage.getItem('userName');
const userId = localStorage.getItem('userId');
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
  if (result.Mid == 0 )
   { 
    this.alertMessage.style.display = "block";
   }else 
   {
    
    const userlog = localStorage.getItem('userItem');
    localStorage.setItem('userlog',userlog);
    localStorage.removeItem('userItem');
    window.location.replace("/ZSHOP/SHOP/index.html");

   }
  
  }
}
const getdataZfram = new GetDatazframe();
userPasswordForm.addEventListener('submit', function(e){
    e.preventDefault();
    password = e.target.elements[0].value ;
   
    getdataZfram.do_validity(password , userId);
    
    localStorage.removeItem('userId');
    localStorage.removeItem('userName');
})


