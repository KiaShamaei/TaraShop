function ValidateEmail(inputText)
{
   
var mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
if(inputText.value.match(mailformat))
{

document.formInfo.emailUser.focus();
return true;
}
else
{
alert("ایمیل وارد شده صحیح نیست! ");
var input = document.getElementById('eUser');
input.focus();
input.select()
return false;
}
}

function IsIranPostalCode(postalcod) {
    
    var regExPostalCode = /^\d{10}$/;
    if ( postalcod.getAttribute("name")=== "postalCodUser"){
    console.log('is it ready postalcode:', postalcod)
    if((postalcod.value.match(regExPostalCode)))
       {
        var input = document.getElementById('postalCodUser');
        return true;
           
       }
     else
       {
        postalcod.classList.add('InputTrue');
        alert('کد پستی اشتباه است ')
        postalcod.focus();
        postalcod.select()
        return false;
       
       }
   }else if (postalcod.getAttribute("name")=== "nationalCodUser"){
      console.log('is it ready nationalCode:', postalcod) 
      if((postalcod.value.match(regExPostalCode)))
       {
        var input = document.getElementById('nationalCodUser');
        return true;
           
       }
     else
       {
        postalcod.classList.add('InputTrue');
        alert('کد ملی اشتباه است ')
        postalcod.focus();
        postalcod.select()
        return false;
       
       }
   }
   }