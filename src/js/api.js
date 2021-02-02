function includeHTML() {
    var z, i, elmnt, file, xhttp;
    /* Loop through a collection of all HTML elements: */
    z = document.getElementsByTagName("*");
    for (i = 0; i < z.length; i++) {
        elmnt = z[i];
        /*search for elements with a certain atrribute:*/
        file = elmnt.getAttribute("ZJ-INCLUDE");
        if (file) {
            /* Make an HTTP request using the attribute value as the file name: */
            xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function() {
                if (this.readyState == 4) {
                    if (this.status == 200) {elmnt.innerHTML = this.responseText;}
                    if (this.status == 404) {elmnt.innerHTML = "Page not found.";}
                    /* Remove the attribute, and call this function once more: */
                    elmnt.removeAttribute("ZJ-INCLUDE");
                    includeHTML();
                }
            }
            xhttp.open("GET", file, true);
            xhttp.send();
            /* Exit the function: */
            return;
        }
    }
}


async function call_getcaptcha(P_value)
{
    var param = []; 
    param.push({name:'value', value:P_value});
    let s= await  callZf_jslib('security/captcha/','getcaptcha',param,1); 
    return s; 
}



async function call_reguser(P_mobileno,P_email,P_password,P_captha,P_fname,P_lname)
{
    var param = []; 
    param.push({name:'mobileno', value:P_mobileno});
    param.push({name:'email', value:P_email});
    param.push({name:'password', value:P_password});
    param.push({name:'captha', value:P_captha});
    param.push({name:'fname', value:P_fname});
    param.push({name:'lname', value:P_lname});

    let s= await  callZf_jslib('activity/register/','reguser',param,2); 
    return s; 
}

async function call_loginuser(P_mobileno,P_password,P_captha)
{
    var param = []; 
    param.push({name:'mobileno', value:P_mobileno});
    param.push({name:'password', value:P_password});
    param.push({name:'captha', value:P_captha});

    let s= await  callZf_jslib('activity/loginuser/','loginuser',param,2); 
    return s; 
}



async function call_getmenubyid(P_category_id)
{
    var param = []; 
    param.push({name:'category_id', value:P_category_id});

    let s= await  callZf_jslib('ui/view/menu/','getmenubyid',param,2); 
    return s; 
}


