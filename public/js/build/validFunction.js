function ValidateEmail(inputText, showmessage) {
  var value = inputText.val();
  var mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  if (value.match(mailformat)) {
    showmessage.html("");
    return true;
  } else {
    showmessage.html("ایمیل وارد شده صحیح نیست! ");
    inputText.focus();
    inputText.select();
    return false;
  }
} //check valid mobile phone  number 


function IsIranPhone(phone, showmessage) {
  var value = phone.val();
  var phoneno = /^(\+98|0)?9\d{9}$/;

  if (value.match(phoneno)) {
    showmessage.html("");
    return true;
  } else {
    showmessage.html("شماره موبایل وارد شده صحیح نیست! ");
    phone.focus();
    phone.select();
  }
} //check postal code 


function IsIranPostalCode(postalcod, showmessage) {
  var value = postalcod.val();
  debugger;
  var regExPostalCode = /^\d{10}$/;

  if (value.match(regExPostalCode)) {
    showmessage.html("");
    return true;
  } else {
    showmessage.html("کدپستی صحیح نیست  ");
    postalcod.focus();
    postalcod.select();
  }
} //check national code 


function NationalCode(nationalcode, showmessage) {
  var value = nationalcode.val();
  var regExPostalCode = /^\d{10}$/;

  if (value.match(regExPostalCode)) {
    showmessage.html("");
    return true;
  } else {
    showmessage.html(" شماره ملی صحیح نیست  ");
    nationalcode.focus();
    nationalcode.select();
  }
} //toggle input password part 


function togglePassword(showpassword, inputpassword) {
  showpassword.addEventListener('click', function () {
    debugger;
    var state = inputpassword.getAttribute('type');
    if (state == 'password') inputpassword.setAttribute('type', 'text');else inputpassword.setAttribute('type', 'password');
  });
} //check requried


function checkRequired(input, showmessage) {
  var value = input.val();

  if (value != "") {
    showmessage.html('');
    return true;
  } else {
    showmessage.html('این مقدار الزامی است');
    return false;
  }
} //set persian to english 


function toEnglishDigits(str) {
  var persianNumbers = ["۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹", "۰"];
  var arabicNumbers = ["١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩", "٠"];
  var englishNumbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];
  return str.split("").map(function (c) {
    return englishNumbers[persianNumbers.indexOf(c)] || englishNumbers[arabicNumbers.indexOf(c)] || c;
  }).join("");
} //set only number ================================================================


function IsNumber(Number, showmessage) {
  var value = Number.val();
  var num = /^[0-9]*$/;

  if (value.match(num)) {
    showmessage.html("");
    return true;
  } else {
    showmessage.html("لطفا فقط عددوارد کنید! ");
    Number.focus();
    Number.select();
  }
} //(?=.*[A-Za-z])
//password validation  role accept Minimum eight characters, at least one letter and one number:


function IsPassword(input, showmessage) {
  var value = input.val();
  var model = "^(?=.*\d)[A-Za-z\d]{8,}$";

  if (value.match(model)) {
    showmessage.html("");
    return true;
  } else {
    showmessage.html("رمز ورود باید حداقل 8 کاراکتر  باشد  ");
    input.focus();
    input.select();
  }
}