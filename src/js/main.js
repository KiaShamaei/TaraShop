//ZFrame Java Script Engine 
var baseapplicationsrc = "http://172.30.21.39:8080/ZSHOP/"; 
var zfjavascriptversion = "1004"; 
var formhightinview = "90"; 
var selectcounter = parseInt("0"); 
var lookupcontrol = null; 
var ProcessHightIF = 0; 
var tcounter = 0; 
var activeentergotonext = 0 ; 
var __documentlocktab__ = false; 
 
shortcut = { 
	'all_shortcuts':{},//All the shortcuts are stored in this array 
	'add': function(shortcut_combination,callback,opt) { 
		//Provide a set of default options 
		var default_options = { 
			'type':'keydown', 
			'propagate':false, 
			'disable_in_input':false, 
			'target':document, 
			'keycode':false 
		} 
		if(!opt) opt = default_options; 
		else { 
			for(var dfo in default_options) { 
				if(typeof opt[dfo] == 'undefined') opt[dfo] = default_options[dfo]; 
			} 
		} 
 
		var ele = opt.target; 
		if(typeof opt.target == 'string') ele = document.getElementById(opt.target); 
		var ths = this; 
		shortcut_combination = shortcut_combination.toLowerCase(); 
 
		//The function to be called at keypress 
		var func = function(e) { 
			e = e || window.event; 
			 
			if(opt['disable_in_input']) { //Don't enable shortcut keys in Input, Textarea fields 
				var element; 
				if(e.target) element=e.target; 
				else if(e.srcElement) element=e.srcElement; 
				if(element.nodeType==3) element=element.parentNode; 
 
				if(element.tagName == 'INPUT' || element.tagName == 'TEXTAREA') return; 
			} 
	 
			//Find Which key is pressed 
			if (e.keyCode) code = e.keyCode; 
			else if (e.which) code = e.which; 
			var character = String.fromCharCode(code).toLowerCase(); 
			 
			if(code == 188) character=","; //If the user presses , when the type is onkeydown 
			if(code == 190) character="."; //If the user presses , when the type is onkeydown 
 
			var keys = shortcut_combination.split("+"); 
			//Key Pressed - counts the number of valid keypresses - if it is same as the number of keys, the shortcut function is invoked 
			var kp = 0; 
			 
			//Work around for stupid Shift key bug created by using lowercase - as a result the shift+num combination was broken 
			var shift_nums = { 
				"`":"~", 
				"1":"!", 
				"2":"@", 
				"3":"#", 
				"4":"$", 
				"5":"%", 
				"6":"^", 
				"7":"&", 
				"8":"*", 
				"9":"(", 
				"0":")", 
				"-":"_", 
				"=":"+", 
				";":":", 
				"'":"\"", 
				",":"<", 
				".":">", 
				"/":"?", 
				"\\":"|" 
			} 
			//Special Keys - and their codes 
			var special_keys = { 
				'esc':27, 
				'escape':27, 
				'tab':9, 
				'space':32, 
				'return':13, 
				'enter':13, 
				'backspace':8, 
	 
				'scrolllock':145, 
				'scroll_lock':145, 
				'scroll':145, 
				'capslock':20, 
				'caps_lock':20, 
				'caps':20, 
				'numlock':144, 
				'num_lock':144, 
				'num':144, 
				 
				'pause':19, 
				'break':19, 
				 
				'insert':45, 
				'home':36, 
				'delete':46, 
				'end':35, 
				 
				'pageup':33, 
				'page_up':33, 
				'pu':33, 
	 
				'pagedown':34, 
				'page_down':34, 
				'pd':34, 
	 
				'left':37, 
				'up':38, 
				'right':39, 
				'down':40, 
	 
				'f1':112, 
				'f2':113, 
				'f3':114, 
				'f4':115, 
				'f5':116, 
				'f6':117, 
				'f7':118, 
				'f8':119, 
				'f9':120, 
				'f10':121, 
				'f11':122, 
				'f12':123 
			} 
	 
			var modifiers = {  
				shift: { wanted:false, pressed:false}, 
				ctrl : { wanted:false, pressed:false}, 
				alt  : { wanted:false, pressed:false}, 
				meta : { wanted:false, pressed:false}	//Meta is Mac specific 
			}; 
                         
			if(e.ctrlKey)	modifiers.ctrl.pressed = true; 
			if(e.shiftKey)	modifiers.shift.pressed = true; 
			if(e.altKey)	modifiers.alt.pressed = true; 
			if(e.metaKey)   modifiers.meta.pressed = true; 
                         
			for(var i=0; k=keys[i],i<keys.length; i++) { 
				//Modifiers 
				if(k == 'ctrl' || k == 'control') { 
					kp++; 
					modifiers.ctrl.wanted = true; 
 
				} else if(k == 'shift') { 
					kp++; 
					modifiers.shift.wanted = true; 
 
				} else if(k == 'alt') { 
					kp++; 
					modifiers.alt.wanted = true; 
				} else if(k == 'meta') { 
					kp++; 
					modifiers.meta.wanted = true; 
				} else if(k.length > 1) { //If it is a special key 
					if(special_keys[k] == code) kp++; 
					 
				} else if(opt['keycode']) { 
					if(opt['keycode'] == code) kp++; 
 
				} else { //The special keys did not match 
					if(character == k) kp++; 
					else { 
						if(shift_nums[character] && e.shiftKey) { //Stupid Shift key bug created by using lowercase 
							character = shift_nums[character];  
							if(character == k) kp++; 
						} 
					} 
				} 
			} 
			 
			if(kp == keys.length &&  
						modifiers.ctrl.pressed == modifiers.ctrl.wanted && 
						modifiers.shift.pressed == modifiers.shift.wanted && 
						modifiers.alt.pressed == modifiers.alt.wanted && 
						modifiers.meta.pressed == modifiers.meta.wanted) { 
				callback(e); 
	 
				if(!opt['propagate']) { //Stop the event 
					//e.cancelBubble is supported by IE - this will kill the bubbling process. 
					e.cancelBubble = true; 
					e.returnValue = false; 
	 
					//e.stopPropagation works in Firefox. 
					if (e.stopPropagation) { 
						e.stopPropagation(); 
						e.preventDefault(); 
					} 
					return false; 
				} 
			} 
		} 
		this.all_shortcuts[shortcut_combination] = { 
			'callback':func,  
			'target':ele,  
			'event': opt['type'] 
		}; 
		//Attach the function with the event 
		if(ele.addEventListener) ele.addEventListener(opt['type'], func, false); 
		else if(ele.attachEvent) ele.attachEvent('on'+opt['type'], func); 
		else ele['on'+opt['type']] = func; 
	}, 
 
	//Remove the shortcut - just specify the shortcut and I will remove the binding 
	'remove':function(shortcut_combination) { 
		shortcut_combination = shortcut_combination.toLowerCase(); 
		var binding = this.all_shortcuts[shortcut_combination]; 
		delete(this.all_shortcuts[shortcut_combination]) 
		if(!binding) return; 
		var type = binding['event']; 
		var ele = binding['target']; 
		var callback = binding['callback']; 
 
		if(ele.detachEvent) ele.detachEvent('on'+type, callback); 
		else if(ele.removeEventListener) ele.removeEventListener(type, callback, false); 
		else ele['on'+type] = false; 
	} 
} 
 
$(document).keydown(function(e) {  
  // Set self as the current item in focus 
  var self = $(':focus'), 
      // Set the form by the current item in focus 
      form = self.parents('form:eq(0)'), 
      focusable; 
  
  // Array of Indexable/Tab-able items 
  focusable = form.find('input,a,select,button,textarea,div[contenteditable=true]').filter(':visible'); 
  
  function enterKey(){ 
    if (e.which === 13 && !self.is('textarea,div[contenteditable=true],.textboxFindBoxtable,.textboxSearchText') ) { // [Enter] key 
  
      // If not a regular hyperlink/button/textarea 
      if ($.inArray(self, focusable) && (!self.is('a,button'))){ 
        // Then prevent the default [Enter] key behaviour from submitting the form 
        e.preventDefault(); 
      } // Otherwise follow the link/button as by design, or put new line in textarea 
  
      // Focus on the next item (either previous or next depending on shift) 
      focusable.eq(focusable.index(self) + (e.shiftKey ? -1 : 1)).focus(); 
  
      return false; 
    } 
  } 
  // We need to capture the [Shift] key and check the [Enter] key either way. 
  if (e.shiftKey) { enterKey() } else { enterKey() } 
}); 
 
 
async function ApplicationCheckVersion() 
{ 
    var localjavascriptversion = zfjavascriptversion; 
    var address = baseapplicationsrc+ 'zfversioninfo'; 
    let c= await RestApiCall(address,null,1); 
    var liveversion  = c[0].javascript ; 
    if (liveversion > localjavascriptversion) 
    { 
        window.location.reload(true); 
    } 
} 
 
function stopRKey(evt) { 
                var evt = (evt) ? evt : ((event) ? event : null); 
                var node = (evt.target) ? evt.target : ((evt.srcElement) ? evt.srcElement : null); 
                if ((evt.keyCode == 13) && (node.type=="text"))  {return false;} 
              } 
function loaddoc() { 
    var outvalue = document.getElementById("___pagescrolvalue"); 
    if (outvalue != null) 
    { 
        v = outvalue.value; 
        var objectscrool = document.getElementById("FormPanel"); 
        objectscrool.scrollTop = v; 
         
    } 
} 
//document.onkeypress = stopRKey; 
function loadpanelhightInStart() { 
    try 
    { 
        var ObjectPanel = document.getElementById("MainDivTree"); 
        var HightV = screen.height - 210; 
        var HV = "height:" + HightV.toString() + "px"; 
        ObjectPanel.setAttribute("style", HV.toString()); 
    } catch (e) { 
    } 
 
    try 
    { 
 
        var HightV = screen.height - 152; 
        var HV = "height:" + HightV.toString() + "px;" + "width:100%;"; 
 
        ProcessHightIF = HV; 
 
 
         
        var ObjectPanelMainIFRame = document.getElementById("FormViewer"); 
        ObjectPanelMainIFRame.setAttribute("style", HV.toString()); 
 
 
var ObjectPanelMain = document.getElementById("maintab"); 
        ObjectPanelMain.setAttribute("style", HV.toString()); 
 
 
        document.getElementById('SCDIV').scrollTop = document.getElementById('scroll').value; 
 
 
    } catch (ex) { 
    } 
 
} 
function managescrollform() { 
    var outvalue = document.getElementById("___pagescrolvalue"); 
    var objectscrool = document.getElementById("FormPanel"); 
    var y = objectscrool.scrollTop; 
    outvalue.value = y; 
} 
function managescroll() { 
    var outvalue = document.getElementById("___pagescrolvalue"); 
    var y = window.scrollTop; 
    outvalue.value = y; 
} 
function numberWithCommas(x) { 
    var h = x.replace(/\,/g, ''); 
    return h.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","); 
} 
function ToPriceChange(obj) { 
    var b = document.getElementById(obj); 
    b.value = numberWithCommas(b.value); 
} 
function ToPriceChangeObj(obj) { 
    var b = obj; 
    b.value = numberWithCommas(b.value); 
} 
function Closeform() { 
    var divform = document.getElementById("SysObjectControl"); 
    divform.className = "hiddenPanel"; 
 
    var inputshowvalue = document.getElementById("P_FromAction"); 
    inputshowvalue.value = "false"; 
} 
function dodeleteaction(message) { 
 
    if (confirm(message)) { 
        return true; 
    } else { 
        return false; 
    } 
} 
function doaction(formname) { 
 
    var objectid = formname + "P_Message" 
    var Msg = document.getElementById(objectid); 
    var value = Msg.value; 
 
    if (value.trim().length > 0) { 
        if (confirm(value)) { 
            return true; 
        } else { 
            return false; 
        } 
    } 
    return true; 
} 
function ShowPanel(divid, editmode) { 
     
     
        var divObject = document.getElementById(divid); 
        var editmodeobject = document.getElementById(editmode); 
        divObject.className = "ShowObjectDive"; 
        editmodeobject.value = "true"; 
        return false; 
     
} 
function CloseFormPanel(divid, editmode) { 
    var divObject = document.getElementById(divid); 
    var editmodeobject = document.getElementById(editmode); 
    divObject.className = "hiddenObject"; 
    editmodeobject.value = "false"; 
    return false; 
} 
function FindForm(formid, objectcontrol, title) { 
    lookupcontrol = objectcontrol; 
    var findspace = document.getElementById("findobjectinOtherform"); 
    findspace.innerHTML = ""; 
    findspace.innerHTML += "<div id=\"findpanel\" class=\"ShowPanel\" ><div class=\"ShowPanelContenet\" style=\" height:" + formhightinview + "vh;width:90%;\" align=\"Center\"><Table dir=\"rtl\" style=\"width:100%;\" class=\"FromCaption\" ><tr> <td align=\"right\" ><input type=\"button\" id=\"close\"   class=\"closebutton\" onclick=\"CloseFindForm();\"><span class=\"Title\">     Find Form    </span><span class=\"Title\">"+ title +"</span> &nbsp;&nbsp;&nbsp; <input type=\"button\" id=\"closeandapplay\" value=\"Accept   \"  style=\"width:150px;\"   onclick=\"CloseFindFormAndSubmit(" + formid + ");\"> </td></tr></table><iframe frameborder=\"0\" id=\"findiframe" + formid + "\"  src=\"" + baseapplicationsrc + "FindForm.bpm?ID=" + formid + "\" style=\"width:100%; height:" + formhightinview + "vh;background: #FFFFFF;\"> </iframe><Table id=\"submitformpanel\" dir=\"rtl\" style=\"width:100%;\" class=\"FindSubmit\" ><tr> <td align=\"Right\" ></td></tr></table></div></div>   "; 
    HiddenNowSelected(); 
 
} 
  
function FindFormP(formid, objectcontrol, title, p1 ,p2 ,p3 ) { 
    lookupcontrol = objectcontrol; 
    var findspace = document.getElementById("findobjectinOtherform"); 
    findspace.innerHTML = ""; 
    findspace.innerHTML += "<div id=\"findpanel\" class=\"ShowPanel\" ><div  class=\"ShowPanelContenet\" style=\" height:" + formhightinview + "vh;width:90%;\" align=\"Center\"><Table dir=\"rtl\" style=\"width:100%;\" class=\"FromCaption\" ><tr> <td align=\"right\" ><input type=\"button\" id=\"close\"   class=\"closebutton\" onclick=\"CloseFindForm();\"><span class=\"Title\">     Find Form    </span><span class=\"Title\">"+ title +"</span> &nbsp;&nbsp;&nbsp; <input type=\"button\" id=\"closeandapplay\" value=\"Accept   \"  style=\"width:150px;\"   onclick=\"CloseFindFormAndSubmit(" + formid + ");\"> </td></tr></table><iframe frameborder=\"0\"  id=\"findiframe" + formid + "\"  src=\"" + baseapplicationsrc + "FindForm.bpm?ID=" + formid + "&KeyID=0&ZPPA1="+p1+"&ZPPA2="+p2+"&ZPPA3="+p3+"\" style=\"width:100%; height:" + formhightinview + "vh;background: #FFFFFF;\"> </iframe><Table id=\"submitformpanel\" dir=\"rtl\" style=\"width:100%;\" class=\"FindSubmit\" ><tr> <td align=\"Right\" ></td></tr></table></div></div>   "; 
    HiddenNowSelected(); 
  
}   
 
function FindFormvar(formid, objectcontrol, title, ...relatedcontrol)  { 
    lookupcontrol = objectcontrol; 
     var  p1 ,p2 ,p3; 
     p1= "0"; 
     p2= "0"; 
     p3= "0";      
     var i; 
     var Extentionparam="";      
     for (i=0 ; i < relatedcontrol.length ; i++ ) 
     { 
         var C = document.getElementById(relatedcontrol[i]); 
         var Valueofpassobject = C.value; 
         if (i==0) 
         { 
             p1 = Valueofpassobject; 
         } 
         if (i==1) 
         { 
             p2 = Valueofpassobject; 
         } 
         if (i==2) 
         { 
             p3 = Valueofpassobject; 
         } 
          
          
     } 
     
    var findspace = document.getElementById("findobjectinOtherform"); 
    findspace.innerHTML = ""; 
    findspace.innerHTML += "<div id=\"findpanel\" class=\"ShowPanel\" ><div  class=\"ShowPanelContenet\" style=\" height:" + formhightinview + "vh;width:90%;\" align=\"Center\"><Table dir=\"rtl\" style=\"width:100%;\" class=\"FromCaption\" ><tr> <td align=\"right\" ><input type=\"button\" id=\"close\"   class=\"closebutton\" onclick=\"CloseFindForm();\"><span class=\"Title\">     Find Form    </span><span class=\"Title\">"+ title +"</span> &nbsp;&nbsp;&nbsp; <input type=\"button\" id=\"closeandapplay\" value=\"Accept   \"  style=\"width:150px;\"   onclick=\"CloseFindFormAndSubmit(" + formid + ");\"> </td></tr></table><iframe frameborder=\"0\"  id=\"findiframe" + formid + "\"  src=\"" + baseapplicationsrc + "FindForm.bpm?ID=" + formid + "&KeyID=0&ZPPA1="+p1+"&ZPPA2="+p2+"&ZPPA3="+p3+"\" style=\"width:100%; height:" + formhightinview + "vh;background: #FFFFFF;\"> </iframe><Table id=\"submitformpanel\" dir=\"rtl\" style=\"width:100%;\" class=\"FindSubmit\" ><tr> <td align=\"Right\" ></td></tr></table></div></div>   "; 
    HiddenNowSelected(); 
 
} 
 
function FindFormLookupTable(formid, objectcontrol, title,SecondControl) { 
    lookupcontrol = objectcontrol; 
    var findspace = document.getElementById("findobjectinOtherform"); 
    findspace.innerHTML = ""; 
    findspace.innerHTML += "<div id=\"findpanel\" class=\"ShowPanel\" ><div class=\"ShowPanelContenet\" style=\" height:" + formhightinview + "vh;width:90%;\" align=\"Center\"><Table dir=\"rtl\" style=\"width:100%;\" class=\"FromCaption\" ><tr> <td align=\"right\" ><input type=\"button\" id=\"close\"   class=\"closebutton\" onclick=\"CloseFindForm();\"><span class=\"Title\">     Find Form    </span><span class=\"Title\">"+ title +"</span> &nbsp;&nbsp;&nbsp; <input type=\"button\" id=\"closeandapplay\" value=\"Accept   \"  style=\"width:150px;\"   onclick=\"CloseFindFormAndSubmitLookUp(" + formid + ",'"+SecondControl+"');\"> </td></tr></table><iframe frameborder=\"0\" id=\"findiframe" + formid + "\"  src=\"" + baseapplicationsrc + "FindForm.bpm?ID=" + formid + "\" style=\"width:100%; height:" + formhightinview + "vh;background: #FFFFFF;\"> </iframe><Table id=\"submitformpanel\" dir=\"rtl\" style=\"width:100%;\" class=\"FindSubmit\" ><tr> <td align=\"Right\" ></td></tr></table></div></div>   "; 
    HiddenNowSelected(); 
 
} 
function FindFormLookupTableP(formid, objectcontrol, title,SecondControl, p1 ,p2 ,p3 ) { 
    lookupcontrol = objectcontrol; 
    var findspace = document.getElementById("findobjectinOtherform"); 
    findspace.innerHTML = ""; 
    findspace.innerHTML += "<div id=\"findpanel\" class=\"ShowPanel\" ><div class=\"ShowPanelContenet\" style=\" height:" + formhightinview + "vh;width:90%;\" align=\"Center\"><Table dir=\"rtl\" style=\"width:100%;\" class=\"FromCaption\" ><tr> <td align=\"right\" ><input type=\"button\" id=\"close\"   class=\"closebutton\" onclick=\"CloseFindForm();\"><span class=\"Title\">     Find Form    </span><span class=\"Title\">"+ title +"</span> &nbsp;&nbsp;&nbsp; <input type=\"button\" id=\"closeandapplay\" value=\"Accept   \"  style=\"width:150px;\"   onclick=\"CloseFindFormAndSubmitLookUp(" + formid + ",'"+SecondControl+"');\"> </td></tr></table><iframe frameborder=\"0\" id=\"findiframe" + formid + "\"  src=\"" + baseapplicationsrc + "FindForm.bpm?ID=" + formid + "&KeyID=0&ZPPA1="+p1+"&ZPPA2="+p2+"&ZPPA3="+p3+"\" style=\"width:100%; height:" +  formhightinview + "vh;background: #FFFFFF;\"> </iframe><Table id=\"submitformpanel\" dir=\"rtl\" style=\"width:100%;\" class=\"FindSubmit\" ><tr> <td align=\"Right\" ></td></tr></table></div></div>   "; 
    HiddenNowSelected(); 
} 
 
function FindFormLookupTablevar(formid, objectcontrol, title,SecondControl, ...relatedcontrol)  { 
    lookupcontrol = objectcontrol; 
     var  p1 ,p2 ,p3; 
     p1= "0"; 
     p2= "0"; 
     p3= "0";      
     var i; 
     var Extentionparam="";      
     for (i=0 ; i < relatedcontrol.length ; i++ ) 
     { 
         var C = document.getElementById(relatedcontrol[i]); 
         var Valueofpassobject = C.value; 
         if (i==0) 
         { 
             p1 = Valueofpassobject; 
         } 
         if (i==1) 
         { 
             p2 = Valueofpassobject; 
         } 
         if (i==2) 
         { 
             p3 = Valueofpassobject; 
         } 
          
          
     } 
     
    var findspace = document.getElementById("findobjectinOtherform"); 
    findspace.innerHTML = ""; 
    findspace.innerHTML += "<div id=\"findpanel\" class=\"ShowPanel\" ><div class=\"ShowPanelContenet\" style=\" height:" + formhightinview + "vh;width:90%;\" align=\"Center\"><Table dir=\"rtl\" style=\"width:100%;\" class=\"FromCaption\" ><tr> <td align=\"right\" ><input type=\"button\" id=\"close\"   class=\"closebutton\" onclick=\"CloseFindForm();\"><span class=\"Title\">     Find Form    </span><span class=\"Title\">"+ title +"</span> &nbsp;&nbsp;&nbsp; <input type=\"button\" id=\"closeandapplay\" value=\"Accept   \"  style=\"width:150px;\"   onclick=\"CloseFindFormAndSubmitLookUp(" + formid + ",'"+SecondControl+"');\"> </td></tr></table><iframe frameborder=\"0\" id=\"findiframe" + formid + "\"  src=\"" + baseapplicationsrc + "FindForm.bpm?ID=" + formid + "&KeyID=0&ZPPA1="+p1+"&ZPPA2="+p2+"&ZPPA3="+p3+"\" style=\"width:100%; height:" +  formhightinview + "vh;background: #FFFFFF;\"> </iframe><Table id=\"submitformpanel\" dir=\"rtl\" style=\"width:100%;\" class=\"FindSubmit\" ><tr> <td align=\"Right\" ></td></tr></table></div></div>   "; 
    HiddenNowSelected(); 
 
} 
 
function ShowDialogForm(formid, recordvalue) { 
     
    var findspace = document.getElementById("findobjectinOtherform"); 
    findspace.innerHTML = ""; 
    findspace.innerHTML += "<div id=\"findpanel\" class=\"ShowPanel\" ><div class=\"ShowPanelContenet\" style=\" height:" + formhightinview + "vh;width:90%;\" align=\"Center\"><Table dir=\"rtl\" style=\"width:100%;\" class=\"FromCaption\" ><tr> <td align=\"right\" ><input type=\"button\" id=\"close\"   class=\"closebutton\" onclick=\"CloseFindForm();\"><span class=\"Title\">        </span></td></tr></table><iframe frameborder=\"0\" id=\"findiframe" + formid + "\"  src=\"" + baseapplicationsrc + "ZBPMS.bpm?ID=" + formid + "&KeyID="+recordvalue+"\" style=\"width:100%;  height:" + formhightinview + "vh;background: #FFFFFF;\"> </iframe></div></div>   "; 
    HiddenNowSelected(); 
 
} 
function openNewPage(pageaddress) { 
 
    var findspace = document.getElementById("findobjectinOtherform"); 
    findspace.innerHTML = ""; 
    findspace.innerHTML += "<div id=\"findpanel\" class=\"ShowPanel\" ><div class=\"ShowPanelContenet\"  style=\" height:" + formhightinview + "vh;width:90%;\" align=\"Center\"><Table dir=\"rtl\" style=\"width:100%;\" class=\"FromCaption\" ><tr> <td align=\"right\" ><input type=\"button\" id=\"close\"   class=\"closebutton\" onclick=\"CloseFindForm();\"><span class=\"Title\">    </span></td></tr></table><iframe frameborder=\"0\" id=\"Zframenewformuser\"  src=\"" + pageaddress + "\" style=\"width:100%;  height:" + formhightinview + "vh;background: #FFFFFF;\"> </iframe><Table id=\"submitformpanel\" dir=\"rtl\" style=\"width:100%;\" class=\"FindSubmit\" ></table></div></div>   "; 
    HiddenNowSelected(); 
 
} 
function openNewPageAndC(pageaddress) { 
 
    window.open(pageaddress); 
 
} 
function openNewPageAndRefresh(pageaddress) { 
 
    var findspace = document.getElementById("findobjectinOtherform"); 
    findspace.innerHTML = ""; 
    findspace.innerHTML += "<div id=\"findpanel\" class=\"ShowPanel\" ><div class=\"ShowPanelContenet\"  style=\" height:" + formhightinview + "vh;width:90%;\" align=\"Center\"><Table dir=\"rtl\" style=\"width:100%;\" class=\"FromCaption\" ><tr> <td align=\"right\" ><input type=\"button\" id=\"close\"   class=\"closebutton\" onclick=\"CloseFindFormAndRefresh();\"><span class=\"Title\">    </span></td></tr></table><iframe frameborder=\"0\" id=\"Zframenewformuser\"  src=\"" + pageaddress + "\" style=\"width:100%; height:" + formhightinview + "vh;background: #FFFFFF;\"> </iframe><Table id=\"submitformpanel\" dir=\"rtl\" style=\"width:100%;\" class=\"FindSubmit\" ></table></div></div>   "; 
    HiddenNowSelected(); 
 
} 
function FindInTree(ControlID, objectcontrol) { 
    lookupcontrol = objectcontrol; 
 
    var findspace = document.getElementById("findobjectinOtherform"); 
    findspace.innerHTML = ""; 
    findspace.innerHTML += " <div id=\"findpanel\" class=\"ShowPanel\" ><div  class=\"ShowPanelContenet\" style=\" height:" + formhightinview + "vh;width:90%;\" align=\"Center\"><Table dir=\"rtl\" style=\"width:100%;\" class=\"FromCaption\" ><tr> <td align=\"right\" ><input type=\"button\" id=\"close\"   class=\"closebutton\" onclick=\"CloseFindForm();\"><span class=\"Title\">   Show Data In Three View Mode  </span>&nbsp;&nbsp;&nbsp;  <input type=\"button\" id=\"closeandapplay\" value=\"Accept   \"  style=\"width:150px;\"   onclick=\"CloseFindFormAndSubmittree(" + formid + ");\"></td></tr></table><iframe frameborder=\"0\" id=\"findiframe" + formid + "\"  src=\"" + baseapplicationsrc + "TreeViewer.tre?ID=" + ControlID + "\" style=\"width:100%; height:" + formhightinview + "vh;background: #FFFFFF;\"> </iframe><Table id=\"submitformpanel\" dir=\"rtl\" style=\"width:100%;\" class=\"FindSubmit\" ><tr> <td align=\"Right\" ></td></tr></table></div></div>"; 
    HiddenNowSelected(); 
} 
function loadChildObject(ChildObjectID, LoadKeyID) { 
 
    if (LoadKeyID != 0) { 
        var findspace = document.getElementById("findobjectinOtherform"); 
        findspace.innerHTML = ""; 
        findspace.innerHTML += " <div id=\"findpanel\" class=\"ShowPanel\" ><div class=\"ShowPanelContenet\"  style=\" height:" + formhightinview + "vh;width:90%;\" align=\"Center\"><Table dir=\"rtl\" style=\"width:100%;\" class=\"FromCaption\" ><tr> <td align=\"right\" style=\"vertical-align:bottom;\" ><input type=\"button\" id=\"close\"   class=\"closebutton\" onclick=\"CloseFindForm();\"> <span class=\"Title\">  &nbsp;&nbsp; </span> <span class=\"Title\">   Detail   </span></td></tr></table><iframe frameborder=\"0\" id=\"findiframe\"  src=\"" + baseapplicationsrc + "ChildObject.bpm?ID=" + ChildObjectID + "&KeyID=" + LoadKeyID + "\" style=\"width:100%;  height:" + formhightinview + "vh;background: #FFFFFF;\"></iframe></div></div>"; 
    } else { 
        alert(" for save record  please fill required field "); 
    } 
 
} 
function HiddenNowSelected() { 
    try 
    { 
 
        //var NowApplayCmd = window.parent.document.getElementById("closeandapplay"); 
        //NowApplayCmd.disabled = true; 
    } catch (e) { 
    } 
} 
function ShowNowSelected() { 
    try { 
 
        var NowApplayCmd = window.parent.document.getElementById("closeandapplay"); 
        NowApplayCmd.disabled = false; 
    } catch (e) { 
    } 
} 
function CloseFindForm() { 
 
    var panel = document.getElementById("findpanel"); 
    panel.className = "hiddenPanel"; 
    ShowNowSelected(); 
} 
function CloseFindFormAndSubmit(formidvalue) { 
 
 
    var findpanel = document.getElementById("findpanel"); 
 
 
    var x = document.getElementById("findiframe" + formidvalue); 
    var y = (x.contentWindow || x.contentDocument); 
    if (y.document) 
        y = y.document; 
    var doc = y; 
    var RecordID = doc.getElementById('SelectRecordID').value; 
    var RecordValue = doc.getElementById('SelectRecordValue').value; 
 
    var lookupvalue = document.getElementById(lookupcontrol); 
    var lookupText = document.getElementById(lookupcontrol + "txt"); 
    if (RecordID.trim().length != 0) { 
        if (lookupText != null) 
        { 
            lookupText.value = RecordValue; 
        } 
        if (lookupvalue != null ) 
        { 
            lookupvalue.value = RecordID;      
        } 
        findpanel.className = "hiddenPanel"; 
        ShowNowSelected();         
        fixvalidatezframe(lookupText); 
    } else { 
        alert(" you m ust select record for search "); 
    } 
 
 
 
} 
function CloseFindFormAndSubmitLookUp(formidvalue,SecondControl) { 
 
 
    var findpanel = document.getElementById("findpanel"); 
 
 
    var x = document.getElementById("findiframe" + formidvalue); 
    var y = (x.contentWindow || x.contentDocument); 
    if (y.document) 
        y = y.document; 
    var doc = y; 
    var RecordID = doc.getElementById('SelectRecordID').value; 
    var RecordValue = doc.getElementById('SelectRecordValue').value; 
 
    var SecondControlObject = document.getElementById(SecondControl); 
    var lookupvalue = document.getElementById(lookupcontrol); 
    var lookupText = document.getElementById(lookupcontrol + "txt"); 
    if (RecordID.trim().length != 0) { 
        lookupText.value = RecordValue; 
        lookupvalue.value = RecordID; 
        SecondControlObject.value = RecordValue; 
        findpanel.className = "hiddenPanel"; 
        ShowNowSelected(); 
         
        var e = new Event("keydown"); 
        e.key="";    // just enter the char you want to send  
        e.keyCode=13; 
        e.which=e.keyCode; 
        e.altKey=false; 
        e.ctrlKey=true; 
        e.shiftKey=false; 
        e.metaKey=false; 
        e.bubbles=true; 
        SecondControlObject.dispatchEvent(e); 
         
    } else { 
        alert(" you m ust select record for search "); 
    } 
 
 
 
} 
function CloseFindFormAndSubmittree() { 
    var panel = document.getElementById("findpanel"); 
    var ifrm = document.getElementById('findiframe'); 
    var doc = ifrm.contentDocument ? ifrm.contentDocument : ifrm.contentWindow.document; 
    var RecordID = doc.getElementById('SelectRecordID').value; 
    var RecordValue = doc.getElementById('SelectRecordValue').value; 
 
    var lookupvalue = document.getElementById(lookupcontrol); 
    var lookupText = document.getElementById(lookupcontrol + "txt"); 
    if (RecordID.trim().length != 0) { 
        lookupText.value = RecordValue; 
        lookupvalue.value = RecordID; 
        panel.className = "hiddenPanel"; 
        ShowNowSelected(); 
    } 
} 
function mask(str, textbox, loc, delim) { 
    var locs = loc.split(','); 
 
    for (var i = 0; i <= locs.length; i++) { 
        for (var k = 0; k <= str.length; k++) { 
            if (k == locs[i]) { 
                if (str.substring(k, k + 1) != delim) { 
                    str = str.substring(0, k) + delim + str.substring(k, str.length) 
                } 
            } 
        } 
    } 
    textbox.value = str 
} 
function exitapplication() { 
    window.location = "Exit.bpm"; 
} 
function DoStart() { 
    alert("StartAction"); 
} 
function CloseFindFormAndRefresh() { 
 
    var panel = document.getElementById("findpanel"); 
    panel.className = "hiddenPanel"; 
    try 
    { 
        ShowNowSelected(); 
    } catch (Ex) { 
    } 
 
    var objectform = document.getElementById('bpmform'); 
    objectform.submit(); 
} 
 
 
 
function autosearchcomplete(Rule, SYSID, SYSCONID, event, sender) { 
    var keyCode = event.which; 
    var KeyEVENT = event.keyCode; 
    if (KeyEVENT == 13) // enter  
    { 
        var txtObject = document.getElementById(sender.toString()); 
        event.preventDefault(); 
        if (txtObject.value.toString().length > 1) { 
            selectcounter = 0; 
            var urlv = baseapplicationsrc + 'AutoSearch.ajx?R=0&SYS=' + SYSID.toString() + "&SYSCONTROL=" + SYSCONID.toString() + "&fillObject=" + sender.toString() + "&search=" + txtObject.value.toString(); 
            xmlHttp = new XMLHttpRequest(); 
            xmlHttp.open("GET", urlv, false); 
            xmlHttp.send(null); 
            var rt = xmlHttp.responseText; 
            var dicname = "searchjob" + sender.toString(); 
            var divobject = document.getElementById(dicname); 
            divobject.innerHTML = rt; 
        } 
  
        setObjectInText(selectcounter, sender, SYSCONID, 1); 
       return ; 
    }   
    
} 
function autosearchcompletewithparameter(Rule, SYSID, SYSCONID, event, sender,...relatedcontrol) { 
    var keyCode = event.which; 
    var KeyEVENT = event.keyCode; 
     
     var i; 
     var Extentionparam="";      
     for (i=0 ; i < relatedcontrol.length ; i++ ) 
     { 
         var C = document.getElementById(relatedcontrol[i]); 
         var Valueofpassobject = C.value; 
         Extentionparam += "Param"+i.toString()+"="+Valueofpassobject; 
         if (i < relatedcontrol.length-1 ) 
         { 
             Extentionparam += "&"; 
         } 
          
     } 
     
    if (Extentionparam.length > 0) 
    { 
            Extentionparam ="&"+Extentionparam;         
    } 
     
    if (KeyEVENT == 13) // enter  
    { 
        var txtObject = document.getElementById(sender.toString()); 
        event.preventDefault(); 
        if (txtObject.value.toString().length > 1) { 
            selectcounter = 0; 
            var urlv = baseapplicationsrc + 'AutoSearch.ajx?R=0&SYS=' + SYSID.toString() + "&SYSCONTROL=" + SYSCONID.toString() + "&fillObject=" + sender.toString() + "&search=" + txtObject.value.toString()+Extentionparam; 
            xmlHttp = new XMLHttpRequest(); 
            xmlHttp.open("GET", urlv, false); 
            xmlHttp.send(null); 
            var rt = xmlHttp.responseText; 
            var dicname = "searchjob" + sender.toString(); 
            var divobject = document.getElementById(dicname); 
            divobject.innerHTML = rt; 
        } 
 
        setObjectInText(selectcounter, sender, SYSCONID, 1); 
        return ; 
    } 
 
   
} 
function pressautosearchcomplete(Rule, SYSID, SYSCONID, event, sender)  
{ 
    // function is empty dont change ..-> for barcode 
} 
function pressautosearchcompletewithparameter(Rule, SYSID, SYSCONID, event, sender,...relatedcontrol) 
{ 
    // function is empty dont change ..-> for barcode 
} 
 
function autosearch(Rule, SYSID, SYSCONID, event, sender) { 
 
 
    var txtObject = document.getElementById(sender.toString()); 
    var keyCode = event.which; 
    var KeyEVENT = event.keyCode; 
    // Event KeyCode ( KeyDown = 40 ) ( KeyUp =  38 ) 
    //alert('Event Code ='+event.keyCode ); 
    //alert('Event which ='+event.which ); 
 
 
 if (KeyEVENT == 13) 
    { 
        event.preventDefault(); 
        setObjectInText(selectcounter, sender, SYSCONID, 1); 
        return ; 
    } 
 
 
    
    if ((keyCode != 0)&&(keyCode != 40)&&(keyCode != 13)&&(keyCode != 38)){ 
 
        if (txtObject.value.toString().length > 1) { 
            selectcounter = 0; 
            var urlv = baseapplicationsrc + 'AutoSearch.ajx?R=0&SYS=' + SYSID.toString() + "&SYSCONTROL=" + SYSCONID.toString() + "&fillObject=" + sender.toString() + "&search=" + txtObject.value.toString(); 
            xmlHttp = new XMLHttpRequest(); 
            xmlHttp.open("GET", urlv, false); 
            xmlHttp.send(null); 
            var rt = xmlHttp.responseText; 
            var dicname = "searchjob" + sender.toString(); 
            var divobject = document.getElementById(dicname); 
 
            divobject.innerHTML = rt; 
            return; 
        } 
 
    } 
    else 
    { 
        pressautosearch(Rule, SYSID, SYSCONID, event, sender); 
    } 
 
 
   return ; 
} 
 
function autosearchwithparam(Rule, SYSID, SYSCONID, event, sender,...relatedcontrol) { 
 
     event.preventDefault(); 
    var txtObject = document.getElementById(sender.toString()); 
    var keyCode = event.which; 
    var KeyEVENT = event.keyCode; 
    // Event KeyCode ( KeyDown = 40 ) ( KeyUp =  38 ) 
    //alert('Event Code ='+event.keyCode ); 
    //alert('Event which ='+event.which ); 
    if (KeyEVENT == 13) 
    { 
        event.preventDefault(); 
        setObjectInText(selectcounter, sender, SYSCONID, 1); 
        return false; 
    } 
 
     
     var i; 
     var Extentionparam="";      
     for (i=0 ; i < relatedcontrol.length ; i++ ) 
     { 
         var C = document.getElementById(relatedcontrol[i]); 
         var Valueofpassobject = C.value; 
         Extentionparam += "Param"+i.toString()+"="+Valueofpassobject; 
         if (i < relatedcontrol.length-1 ) 
         { 
             Extentionparam += "&"; 
         } 
          
     } 
     
    if (Extentionparam.length > 0) 
    { 
            Extentionparam ="&"+Extentionparam;         
    } 
     
 
    if ((keyCode != 0)&&(keyCode != 40)&&(keyCode != 13)&&(keyCode != 38)) { 
 
        if (txtObject.value.toString().length > 1) { 
            selectcounter = 0; 
            var urlv = baseapplicationsrc + 'AutoSearch.ajx?R=0&SYS=' + SYSID.toString() + "&SYSCONTROL=" + SYSCONID.toString() + "&fillObject=" + sender.toString() + "&search=" + txtObject.value.toString()+Extentionparam; 
            xmlHttp = new XMLHttpRequest(); 
            xmlHttp.open("GET", urlv, false); 
            xmlHttp.send(null); 
            var rt = xmlHttp.responseText; 
            var dicname = "searchjob" + sender.toString(); 
            var divobject = document.getElementById(dicname); 
 
            divobject.innerHTML = rt; 
            return ; 
        } 
 
    } 
    else 
    { 
        pressautosearch(Rule, SYSID, SYSCONID, event, sender); 
    } 
 
 
    
 
    return ; 
} 
 
 
 
function pressautosearch(Rule, SYSID, SYSCONID, event, sender) { 
 
 
    event.preventDefault(); 
    var txtObject = document.getElementById(sender.toString()); 
    var keyCode = event.which; 
    var KeyEVENT = event.keyCode; 
    // Event KeyCode ( KeyDown = 40 ) ( KeyUp =  38 ) 
    //alert('Event Code ='+event.keyCode ); 
    //alert('Event which ='+event.which ); 
 
    
     
 
    if (KeyEVENT == 40) 
    { 
        // KeyDown 
        selectcounter = selectcounter + 1; 
 
        var nameh = "searchitem" + selectcounter.toString(); 
        var Objectexist = document.getElementById(nameh.toString()); 
        if (Objectexist == null) 
        { 
            selectcounter = selectcounter - 1; 
        } 
 
        setObjectInText(selectcounter, sender, SYSCONID, 0); 
    } 
 
    if (KeyEVENT == 38) 
    { 
        // KeyUp 
        if (selectcounter >= 0) 
        { 
            selectcounter = selectcounter - 1; 
        } 
 
        setObjectInText(selectcounter, sender, SYSCONID, 0); 
 
    } 
    if (KeyEVENT == 13) // enter  
    { 
        setObjectInText(selectcounter, sender, SYSCONID, 1); 
    } 
 
    return false; 
} 
function pressautosearchwithparam(Rule, SYSID, SYSCONID, event, sender,...relatedcontrol) { 
 
 
    var txtObject = document.getElementById(sender.toString()); 
    var keyCode = event.which; 
    var KeyEVENT = event.keyCode; 
    // Event KeyCode ( KeyDown = 40 ) ( KeyUp =  38 ) 
    //alert('Event Code ='+event.keyCode ); 
    //alert('Event which ='+event.which ); 
     
     var i; 
     var Extentionparam="";      
     for (i=0 ; i < relatedcontrol.length ; i++ ) 
     { 
         var C = document.getElementById(relatedcontrol[i]); 
         var Valueofpassobject = C.value; 
         Extentionparam += "Param"+i.toString()+"="+Valueofpassobject; 
         if (i < relatedcontrol.length-1 ) 
         { 
             Extentionparam += "&"; 
         } 
          
     } 
     
    if (Extentionparam.length > 0) 
    { 
            Extentionparam ="&"+Extentionparam;         
    } 
     
 
    if (KeyEVENT == 13) 
    { 
        event.preventDefault(); 
        setObjectInText(selectcounter, sender, SYSCONID, 1); 
          return ; 
    } 
    
 
    if (KeyEVENT == 40) 
    { 
        // KeyDown 
        selectcounter = selectcounter + 1; 
 
        var nameh = "searchitem" + selectcounter.toString(); 
        var Objectexist = document.getElementById(nameh.toString()); 
        if (Objectexist == null) 
        { 
            selectcounter = selectcounter - 1; 
        } 
 
        setObjectInText(selectcounter, sender, SYSCONID, 0); 
    } 
 
    if (KeyEVENT == 38) 
    { 
        // KeyUp 
        if (selectcounter >= 0) 
        { 
            selectcounter = selectcounter - 1; 
        } 
 
        setObjectInText(selectcounter, sender, SYSCONID, 0); 
 
    } 
    if (KeyEVENT == 13) // enter  
    { 
        setObjectInText(selectcounter, sender, SYSCONID, 1); 
    } 
 
    return false; 
} 
 
function hpress(event) 
{ 
    var keyCode = event.which; 
    var KeyEVENT = event.keyCode;     
    if (KeyEVENT == 13) 
    { 
        event.preventDefault();         
        return false; 
    } 
} 
 
function setObjectInText(indexid, textv, objcode, actionevent) { 
    var objname = "searchlistbul" + objcode; 
    var lists = document.getElementById(objname); 
    var items = lists.getElementsByTagName("li"); 
    var textobject = document.getElementById(textv); 
 
    for (var i = 0; i < items.length; ++i) { 
        items[i].setAttribute("class", "searchitemlist"); 
    } 
 
 
    textobject.value = items[indexid].innerText; 
    items[indexid].setAttribute("class", "searchitemlistselected"); 
    if (actionevent == 1) 
    { 
        items[indexid].click(); 
        return false ; 
    } 
     
    return false ;     
} 
 
 
function HiddenAll() { 
 
//    try { 
//        var objectlist = document.getElementsByClassName("divsearch"); 
//        for (var a = 0; a <= objectlist.length - 1; a++) 
//        { 
//            objectlist[a].style.visibility = "hidden"; 
//        } 
//    } catch (ex) { 
//    } 
 
} 
function SearchSearchItem(id, value, ControlName, divName) { 
 
    try 
    { 
 
        var TextObject = document.getElementById(ControlName); 
        if (TextObject == null) 
        { 
            TextObject = document.getElementById(ControlName + "txt"); 
        } 
        var EndCode = ControlName.substr(ControlName.length - 3, 3); 
        if (EndCode == "txt") { 
            ControlName = ControlName.substr(0, ControlName.length - 3); 
        } 
        var InputValueIDName = ControlName; 
        var InputID = document.getElementById(InputValueIDName); 
        InputID.value = id; 
        TextObject.value = value; 
         
        var DivBox = document.getElementById(divName); 
        DivBox.style.visibility = "hidden"; 
    } catch (ex) 
    { 
    } 
 
} 
function DeleteObjectInBinding(tr, deleteid, deletelistname, updatelistlistname) { 
 
    var ValueAdd = "-" + deleteid.toString() + "-"; 
    var deletelistobject = document.getElementById(deletelistname);                
    var updatelistobject = document.getElementById(updatelistlistname); 
    var TextValue = deletelistobject.value; 
     
    // remove from update      
    var UpdateTextValue = updatelistobject.value; 
        updatelistobject.value = UpdateTextValue.replace(ValueAdd, "-"); 
     
    var trObject = document.getElementById(tr); 
    if (TextValue.includes(ValueAdd)) 
    { 
        trObject.setAttribute("class", "BindngListExistItem"); 
        deletelistobject.value = TextValue.replace(ValueAdd, "-"); 
         
 
    } else 
    { 
        deletelistobject.value += ValueAdd; 
        trObject.setAttribute("class", "BindngListDeleteItem"); 
         
    } 
 
 
} 
 
function UpdateObjectInBinding(tr, updateid, updatelistlistname , deletelistname) { 
 
    var ValueAdd = "-" + updateid.toString() + "-"; 
    var updatelistobject = document.getElementById(updatelistlistname); 
    var deletelistobject = document.getElementById(deletelistname);                    
    var TextValue = updatelistobject.value; 
     
    // remove from delete list  
    var DeleteTextValue = deletelistobject.value; 
     deletelistobject.value = DeleteTextValue.replace(ValueAdd, "-"); 
             
    var trObject = document.getElementById(tr); 
    var fildsetobject = document.getElementById(tr+'fs'); 
     
    if (TextValue.includes(ValueAdd)) 
    { 
        trObject.setAttribute("class", "BindngListExistItem"); 
        fildsetobject.disabled = true; 
        updatelistobject.value = TextValue.replace(ValueAdd, "-"); 
         
         
 
    } else 
    { 
        updatelistobject.value += ValueAdd; 
        trObject.setAttribute("class", "BindngListUpdateItem"); 
        fildsetobject.disabled = false; 
         
         
    } 
 
 
} 
 
 
function TdUpdateObjectInBinding(tr, updateid, updatelistlistname , deletelistname) { 
 
    var ValueAdd = "-" + updateid.toString() + "-"; 
    var updatelistobject = document.getElementById(updatelistlistname); 
    var deletelistobject = document.getElementById(deletelistname);                    
    var TextValue = updatelistobject.value; 
     
    // remove from delete list  
    var DeleteTextValue = deletelistobject.value; 
     deletelistobject.value = DeleteTextValue.replace(ValueAdd, "-"); 
             
    var trObject = document.getElementById(tr); 
    var fildsetobject = document.getElementById(tr+'fs'); 
     
    if (!TextValue.includes(ValueAdd)) 
    { 
         
        updatelistobject.value += ValueAdd; 
        trObject.setAttribute("class", "BindngListUpdateItem"); 
        fildsetobject.disabled = false;  
         
 
    }  
 
 
} 
 
 
 
 
 
function __doPostBackOnly() { 
 
    var objectform = document.getElementById('bpmform'); 
    objectform.submit(); 
} 
function __doPostBack(OT, OA, eventTarget, eventArgument) { 
    var object1 = document.getElementById(OT); 
    object1.value = eventTarget; 
    var object2 = document.getElementById(OA); 
    object2.value = eventArgument; 
    var objectform = document.getElementById('bpmform'); 
 
    if (eventArgument.toString().includes("Select")) 
    { 
        var objectselect = document.getElementById('P_ZBPMSKEYIDFORPASSING'); 
        objectselect.value = eventArgument; 
    } 
 
 
    objectform.submit(); 
 
} 
function __doPostBackPageing(OT, OA, eventTarget, ObjectV){ 
    var ValueText = ObjectV.value; 
    ValueText = 'Page$'+ ValueText; 
    __doPostBack(OT, OA, eventTarget,ValueText); 
} 
function __doPostBackPageingSize(OT, OA, eventTarget, ObjectV){ 
    var ValueText = ObjectV.value; 
    ValueText = 'Size$'+ ValueText; 
    __doPostBack(OT, OA, eventTarget,ValueText); 
} 
function __doPostBackgrid(OT, OA, eventTarget, eventArgument, valueid, valuemane) { 
    var object1 = document.getElementById(OT); 
    object1.value = eventTarget; 
    var object2 = document.getElementById(OA); 
    object2.value = eventArgument; 
    var objectform = document.getElementById('bpmform'); 
 
    if (eventArgument.toString().includes("Select")) 
    { 
        var objectselect = document.getElementById('P_ZBPMSKEYIDFORPASSING'); 
        objectselect.value = eventArgument; 
        var RecordIDObject = document.getElementById('SelectRecordID'); 
        var RecordValueObject = document.getElementById('SelectRecordValue'); 
        RecordIDObject.value = valueid; 
        RecordValueObject.value = valuemane; 
        var txtv = document.getElementById(eventTarget); 
        txtv.value = valueid; 
 
 
    } 
 
    try 
    { 
        var RC = OT.substring(13); 
        RC = "__RecordID" + RC; 
        var RCCONT = document.getElementById(RC); 
        RCCONT.value = valueid; 
    } catch (e) 
    { 
    } 
 
 
 
 
    objectform.submit(); 
 
} 
function __doPostBackgridControl(OT, OA, eventTarget, eventArgument, valueid, valuemane) { 
    var object1 = document.getElementById(OT); 
    object1.value = eventTarget; 
    var object2 = document.getElementById(OA); 
    object2.value = eventArgument; 
    var objectform = document.getElementById('bpmform'); 
 
    if (eventArgument.toString().includes("Select")) 
    {         
        var RecordIDObject = document.getElementById('SelectRecordID'); 
        var RecordValueObject = document.getElementById('SelectRecordValue'); 
        RecordIDObject.value = valueid; 
        RecordValueObject.value = valuemane; 
        var txtv = document.getElementById(eventTarget); 
        txtv.value = valueid; 
 
 
    } 
 
    try 
    { 
        var RC = OT.substring(13); 
        RC = "__RecordID" + RC; 
        var RCCONT = document.getElementById(RC); 
        RCCONT.value = valueid; 
    } catch (e) 
    { 
    } 
 
 
 
 
    objectform.submit(); 
 
} 
function __doPostBacktreeNode(OT, OA, eventTarget, eventArgument, valueid, valuemane, TreeName) { 
 
    var ObjectTextView = document.getElementById("treeViewSearchInput" + TreeName); 
    var ObjectID = document.getElementById(TreeName); 
    if (ObjectTextView != null) 
    { 
        ObjectTextView.value = valuemane; 
    } 
 
    if (ObjectID != null) 
    { 
        ObjectID.value = valueid; 
    } 
    /* 
     var object1 = document.getElementById(OT); 
     object1.value = eventTarget;      
     var object2 = document.getElementById(OA);     
     object2.value = eventArgument;  
     */ 
    var objectform = document.getElementById('bpmform'); 
     
     
    /*if (eventArgument.toString().includes("Select")) 
    { 
        var objectselect = document.getElementById('P_ZBPMSKEYIDFORPASSING'); 
        objectselect.value = eventArgument; 
        var RecordIDObject = document.getElementById('SelectRecordID'); 
        var RecordValueObject = document.getElementById('SelectRecordValue'); 
        RecordIDObject.value = valueid; 
        RecordValueObject.value = valuemane; 
    }*/ 
 
 
    objectform.submit(); 
 
} 
function __doPostBacktreeNodeWithSelect(OT, OA, eventTarget, eventArgument, valueid, valuemane, TreeName) { 
 
    var ObjectTextView = document.getElementById("treeViewSearchInput" + TreeName); 
    var ObjectID = document.getElementById(TreeName); 
    if (ObjectTextView != null) 
    { 
        ObjectTextView.value = valuemane; 
    } 
 
    if (ObjectID != null) 
    { 
        ObjectID.value = valueid; 
    } 
     
     var object1 = document.getElementById(OT); 
     object1.value = eventTarget;      
     var object2 = document.getElementById(OA);     
     object2.value = eventArgument;  
     
    var objectform = document.getElementById('bpmform'); 
     
     
    if (eventArgument.toString().includes("Select")) 
    { 
        var objectselect = document.getElementById('P_ZBPMSKEYIDFORPASSING'); 
        objectselect.value = eventArgument; 
        var RecordIDObject = document.getElementById('SelectRecordID'); 
        var RecordValueObject = document.getElementById('SelectRecordValue'); 
        RecordIDObject.value = valueid; 
        RecordValueObject.value = valuemane; 
    } 
    objectform.submit(); 
 
} 
function navigatebpm(passformid) { 
    var Ifram = document.getElementById('FormViewer'); 
    //Ifram.style.visibility='hidden'; 
 
    var navigateaddress = "ZBPMS.bpm?ID=" + passformid.toString(); 
    Ifram.src = navigateaddress; 
 
} 
function navigatebpmwithid(passformid, recid) { 
    //var Ifram = document.getElementById('FormViewer'); 
    //Ifram.style.visibility='hidden'; 
 
    var navigateaddress = "ZBPMS.bpm?ID=" + passformid.toString() + "&KeyID=" + recid.toString(); 
    window.location = navigateaddress; 
} 
function Formnavigatebpm(passformid) { 
 
 
    var navigateaddress = "ZBPMS.bpm?ID=" + passformid.toString(); 
    window.location.href = navigateaddress; 
 
 
} 
function navigatestate(stateid) { 
    var Ifram = document.getElementById('FormViewer'); 
    Ifram.style.visibility = 'hidden'; 
    var navigateaddress = "ZBPMS.state?ID=" + stateid.toString(); 
    Ifram.src = navigateaddress; 
} 
function navigateAddress(NavigateAddressValue) { 
    var Ifram = document.getElementById('FormViewer'); 
    //  Ifram.style.visibility='hidden'; 
    var navigateaddress = NavigateAddressValue; 
    Ifram.src = navigateaddress; 
 
} 
function ManageExpand(pimg, pdiv, IDV) { 
    var img = document.getElementById(pimg); 
    var div = document.getElementById(pdiv); 
 
    if (div.style.display == "block") 
    { 
         
        div.style.display = "none"; 
        div.style.transition = "3s"; 
        img.src = "Images/Control/Plus.gif"; 
 
        try 
        { 
 
            var expandText = document.getElementById("___formtreeviewstatus"); 
            expandText.value = expandText.value.replace(IDV + ";", ""); 
        } catch (ex) 
        { 
        } 
    } else 
    { 
         
         
        div.style.display = "block"; 
        div.style.transition = "3s"; 
        img.src = "Images/Control/Minus.gif"; 
        try 
        { 
 
            var expandText = document.getElementById("___formtreeviewstatus"); 
            expandText.value = expandText.value + IDV + ";"; 
        } catch (ex) 
        { 
        } 
 
    } 
 
 
 
} 
function ShowDropDownTreeView(TreeID) { 
    var div = document.getElementById(TreeID); 
    if (div.style.display == "block") 
    { 
        div.style.display = "none"; 
    } else 
    { 
        div.style.display = "block"; 
    } 
} 
function LogutFromSystem() { 
    if (dodeleteaction(" are you sure want to exit ")) 
    { 
        window.location.href = 'exit.jsp'; 
    } 
} 
function logoutFromSystemen() { 
    if (dodeleteaction(" are you sure want to exit ")) 
    { 
        window.location.href = 'exiten.jsp'; 
    } 
} 
function GotoForm(navigateaddress) { 
    var Ifram = document.getElementById('FormViewer'); 
    Ifram.src = navigateaddress; 
} 
function GotoChangePassword() { 
    var Ifram = document.getElementById('FormViewer'); 
    var navigateaddress = "changepassword.jsp"; 
    Ifram.src = navigateaddress; 
} 
function GotoUserFormAccess() { 
    var Ifram = document.getElementById('FormViewer'); 
    var navigateaddress = "accessibility.jsp"; 
    Ifram.src = navigateaddress; 
} 
function ShowNotify() { 
    var divobject = document.getElementById("Notify"); 
    var Button = document.getElementById("ShowMessagebtn"); 
 
    if (divobject.style.visibility == "visible") 
    { 
        divobject.style.visibility = "hidden"; 
        Button.innerHTML = " Enable Message "; 
    } else 
    { 
        divobject.style.visibility = "visible"; 
        Button.innerHTML = " Disable Message "; 
    } 
} 
function opentab(evt, tabname, maintabcname) { 
    // Declare all variables 
    var i, tabcontent, tablinks; 
 
    // Get all elements with class="tabcontent" and hide them 
    tabcontent = document.getElementsByClassName("tabcontent"); 
    for (i = 0; i < tabcontent.length; i++) { 
        tabcontent[i].style.display = "none"; 
    } 
 
    // Get all elements with class="tablinks" and remove the class "active" 
    tablinks = document.getElementsByClassName("tablinks"); 
    for (i = 0; i < tablinks.length; i++) { 
        tablinks[i].className = tablinks[i].className.replace(" active", ""); 
    } 
 
    // Show the current tab, and add an "active" class to the button that opened the tab 
    document.getElementById(tabname).style.display = "block"; 
    if (document.getElementById(maintabcname) != null) 
    { 
        document.getElementById(maintabcname).value = tabname; 
    } 
    evt.currentTarget.className += " active"; 
} 
function opentabmain(tabname, maintabcname, senderobjecr) { 
    // Declare all variables 
    var i, tabcontent, tablinks; 
 
    // Get all elements with class="tabcontent" and hide them 
    tabcontent = document.getElementsByClassName("tabcontent"); 
    for (i = 0; i < tabcontent.length; i++) { 
        tabcontent[i].style.display = "none"; 
    } 
     
    // Get all elements with class="tablinks" and remove the class "active" 
    tablinks = document.getElementsByClassName("tablinks"); 
    for (i = 0; i < tablinks.length; i++) { 
        tablinks[i].className = "tablinksNormal"; 
        tabcontent[i].style.display = "none"; 
    } 
 
    // Show the current tab, and add an "active" class to the button that opened the tab 
    document.getElementById(tabname).style.display = "block"; 
    //document.getElementById(maintabcname).value = tabname; 
    document.getElementById(senderobjecr).className = "tablinks"; 
     
    try  
    { 
        //siavash  
            var h = senderobjecr; 
            try  
                  { 
                        z_f_activetabid.value =  h;        
                        var le = h.length; 
                        z_f_activetabcloseid.value = "cmdclose" + h.substring(3,le); 
                  } 
                  catch (e) 
                  {} 
         
         
    } 
    catch (e) 
    { 
         
    } 
     
 
} 
function showFormChildinContain(imgobjct, divobject, hobject) { 
    var divV = document.getElementById(hobject); 
    var divO = document.getElementById(divobject); 
    var imgO = document.getElementById(imgobjct); 
 
 
    if (divV.value == "1") 
    { 
        divV.value = "0"; 
        divO.style.display = "none"; 
        imgO.src = "Images/Control/expand.png"; 
    } else 
    { 
        divV.value = "1"; 
        divO.style.display = "block"; 
        imgO.src = "Images/Control/collapse.png"; 
    } 
} 
function CheckPriceText() { 
    var items = document.getElementsByClassName("PriceText"); 
    for (var i = 0; i < items.length; ++i) 
    { 
        ToPriceChangeObj(items[i]); 
    } 
     
    loaddoc(); 
} 
function moveup(obj){ 
    var row = obj.parentNode.parentNode.parentNode; 
     var idx = row.rowIndex; 
     var rows = row.parentNode.rows; 
     if (idx > 2) 
     { 
         var NowR = rows[idx].innerHTML; 
         var Prv = rows[idx-1].innerHTML; 
         rows[idx-1].innerHTML = NowR; 
         rows[idx].innerHTML = Prv; 
         rows[idx-1].getElementsByClassName('InputText')[0].value = idx-1; 
         rows[idx].getElementsByClassName('InputText')[0].value = idx; 
     } 
     
} 
function movedown(obj){ 
     var row = obj.parentNode.parentNode.parentNode; 
     var idx = row.rowIndex; 
     var rows = row.parentNode.rows; 
     if (rows.length > idx) 
     { 
         var NowR = rows[idx].innerHTML; 
         var Next = rows[idx+1].innerHTML; 
         rows[idx+1].innerHTML = NowR; 
         rows[idx].innerHTML = Next; 
          
         rows[idx+1].getElementsByClassName('InputText')[0].value = idx+1; 
         rows[idx].getElementsByClassName('InputText')[0].value = idx; 
          
     } 
}    
function openWindowsInNewTab(passformid, formname, formCaption){ 
 
 
    tablinks = document.getElementsByClassName("tablinks"); 
    for (i = 0; i < tablinks.length; i++) { 
        tablinks[i].className = "tablinksNormal"; 
        //tabcontent[i].style.display = "none"; 
    } 
     
     
    var TabButton = document.getElementById('TBC'); 
    if (TabButton != null) 
    { 
        tcounter += 1; 
        var IFName = ""; 
        if (tcounter > 0) 
        { 
            IFName = tcounter.toString(); 
        } 
 
        var TabContainer = document.getElementById('TABCC'); 
        var CT = ""; 
        CT  =  "<input id=\"cmd" + formname + tcounter.toString() + "\" class=\"tablinks\" onclick=\"opentabmain( '" + formname + tcounter.toString() + "','SelectTabVfrmDesktop','cmd" + formname + tcounter.toString() + "')\" value=\"" + formCaption + "\" type=\"button\">"; 
        CT += "<input id=\"cmdclose" + formname + tcounter.toString() + "\"  class=\"tablinksclose\" title=\"بستن\"   onclick=\"CloseTabinMainForm('cmd" + formname + tcounter.toString() + "','cmdclose" + formname + tcounter.toString() + "','" + formname + tcounter.toString() + "')\" alt=\"بستن\"  value=\"X\" type=\"button\">&nbsp;"; 
        TabButton.innerHTML =  CT + TabButton.innerHTML; 
         var newElement = document.createElement("div"); 
         newElement.setAttribute('id', formname + tcounter.toString()); 
         newElement.setAttribute('name', formname + tcounter.toString()); 
         newElement.setAttribute('class','tabcontent'); 
         newElement.setAttribute('width','100%'); 
         newElement.innerHTML  = "<iframe frameborder=\"0\" id=\"FormViewer" + IFName.toString() + "\"  class=\"MainView\" src=\"ZBPMS.bpm?ID=" + passformid.toString() + "\"   runat=\"server\" style=\"width:100%;" + ProcessHightIF + ";\"> </iframe>" ;                
         TabContainer.appendChild(newElement); 
 
        opentabmain(formname + tcounter.toString(), 'SelectTabVfrmDesktop', "cmd" + formname + tcounter.toString()); 
         
             try  
                  { 
                        z_f_activetabid.value =  "cmd" + formname + tcounter.toString();  
                        z_f_activetabcloseid.value = "cmdclose" + formname + tcounter.toString() ; 
                  } 
                  catch (e) 
                  {} 
         
    } else 
    { 
        navigatebpm(passformid); 
    } 
 
 
} 
 
 
function openmobile(passformid, formname, formCaption,control){ 
 
 
    tablinks = document.getElementsByClassName("tablinks"); 
    for (i = 0; i < tablinks.length; i++) { 
        tablinks[i].className = "tablinksNormal"; 
        //tabcontent[i].style.display = "none"; 
    } 
 
    var TabButton = document.getElementById('TBC'); 
    if (TabButton != null) 
    { 
        tcounter += 1; 
        var IFName = ""; 
        if (tcounter > 0)  
        { 
            IFName = tcounter.toString(); 
        } 
 
        var TabContainer = document.getElementById('TABCC'); 
        var CT = ""; 
        CT  =  "<input id=\"cmd" + formname + tcounter.toString() + "\" class=\"tablinks\" onclick=\"opentabmain( '" + formname + tcounter.toString() + "','SelectTabVfrmDesktop','cmd" + formname + tcounter.toString() + "')\" value=\"" + formCaption + "\" type=\"button\">"; 
        CT += "<input id=\"cmdclose" + formname + tcounter.toString() + "\"  class=\"tablinksclose\" title=\"بستن\"   onclick=\"CloseTabinMainForm('cmd" + formname + tcounter.toString() + "','cmdclose" + formname + tcounter.toString() + "','" + formname + tcounter.toString() + "')\" alt=\"بستن\"  value=\"X\" type=\"button\">&nbsp;"; 
        TabButton.innerHTML =  CT + TabButton.innerHTML; 
 
         var newElement = document.createElement("div"); 
         newElement.setAttribute('id', formname + tcounter.toString()); 
         newElement.setAttribute('name', formname + tcounter.toString()); 
         newElement.setAttribute('class','tabcontent'); 
         newElement.setAttribute('width','100%'); 
         newElement.innerHTML  = "<iframe frameborder=\"0\" id=\"FormViewer" + IFName.toString() + "\"  class=\"MainView\" src=\"ZBPMS.bpm?ID=" + passformid.toString() + "\"   runat=\"server\" style=\"width:100%;" + ProcessHightIF + ";\"> </iframe>" ;                        
         TabContainer.appendChild(newElement);                   
         opentabmain(formname + tcounter.toString(), 'SelectTabVfrmDesktop', "cmd" + formname + tcounter.toString()); 
          
         try  
         { 
         z_f_activetabid.value =  "cmd" + formname + tcounter.toString(); 
         z_f_activetabcloseid.value = "cmdclose" + formname + tcounter.toString(); 
         } 
         catch (e) 
         {} 
      
          
          
    } else 
    { 
        mobile_navigatebpm(passformid); 
    } 
 
 
} 
 
function mobile_navigatebpm(passformid) { 
    var Ifram = document.getElementById('FormViewer');     
    var navigateaddress = "zframe.android?ID=" + passformid.toString(); 
    Ifram.src = navigateaddress; 
 
} 
function mobile_navigatebpmwithid(passformid, recid) { 
     
    var navigateaddress = "zframe.android?ID=" + passformid.toString() + "&KeyID=" + recid.toString(); 
    window.location = navigateaddress; 
} 
 
 
 
function openWindowsInNewTabNavigation(passformid, formname, formCaption,control){ 
 
 if (__documentlocktab__) 
 { 
     openWindowsInNewTabNavigationlock (passformid, formname, formCaption,control); 
     return; 
 } 
 
    tablinks = document.getElementsByClassName("tablinks"); 
    for (i = 0; i < tablinks.length; i++) { 
        tablinks[i].className = "tablinksNormal"; 
        //tabcontent[i].style.display = "none"; 
    } 
 
    var TabButton = document.getElementById('TBC'); 
    if (TabButton != null) 
    { 
        tcounter += 1; 
        var IFName = ""; 
        if (tcounter > 0)  
        { 
            IFName = tcounter.toString(); 
        } 
 
        var TabContainer = document.getElementById('TABCC'); 
        var CT = ""; 
        CT  =  "<input id=\"cmd" + formname + tcounter.toString() + "\" class=\"tablinks\" onclick=\"opentabmain( '" + formname + tcounter.toString() + "','SelectTabVfrmDesktop','cmd" + formname + tcounter.toString() + "')\" value=\"" + formCaption + "\" type=\"button\">"; 
        CT += "<input id=\"cmdclose" + formname + tcounter.toString() + "\"  class=\"tablinksclose\" title=\"بستن\"   onclick=\"CloseTabinMainForm('cmd" + formname + tcounter.toString() + "','cmdclose" + formname + tcounter.toString() + "','" + formname + tcounter.toString() + "')\" alt=\"بستن\"  value=\"X\" type=\"button\">&nbsp;"; 
        TabButton.innerHTML =  CT + TabButton.innerHTML; 
 
         var newElement = document.createElement("div"); 
         newElement.setAttribute('id', formname + tcounter.toString()); 
         newElement.setAttribute('name', formname + tcounter.toString()); 
         newElement.setAttribute('class','tabcontent'); 
         newElement.setAttribute('width','100%'); 
         newElement.innerHTML  = "<iframe frameborder=\"0\" id=\"FormViewer" + IFName.toString() + "\"  class=\"MainView\" src=\"ZBPMS.bpm?ID=" + passformid.toString() + "\"   runat=\"server\" style=\"width:100%;" + ProcessHightIF + ";\"> </iframe>" ;                        
         TabContainer.appendChild(newElement);                   
         opentabmain(formname + tcounter.toString(), 'SelectTabVfrmDesktop', "cmd" + formname + tcounter.toString()); 
          
         try  
         { 
         z_f_activetabid.value =  "cmd" + formname + tcounter.toString(); 
         z_f_activetabcloseid.value = "cmdclose" + formname + tcounter.toString(); 
         } 
         catch (e) 
         {} 
      
          
          
    } else 
    { 
        navigatebpm(passformid); 
    } 
 
 
} 
function openWindowsInNewTabNavigationlock(passformid, formname, formCaption,control){ 
 
 
    tablinks = document.getElementsByClassName("tablinks"); 
    for (i = 0; i < tablinks.length; i++) { 
        tablinks[i].className = "tablinksNormal"; 
        //tabcontent[i].style.display = "none"; 
    } 
 
    var TabButton = document.getElementById('TBC'); 
    if (TabButton != null) 
    { 
        
        var commandcontrolname = "cmd"+formname; 
        var co = document.getElementById(commandcontrolname); 
        if (co != null) 
        { 
            co.click(); 
            return; 
        } 
 
        var TabContainer = document.getElementById('TABCC'); 
        var CT = ""; 
        CT  =  "<input id=\"cmd" + formname  + "\" class=\"tablinks\" onclick=\"opentabmain( '" + formname  + "','SelectTabVfrmDesktop','cmd" + formname  + "')\" value=\"" + formCaption + "\" type=\"button\">"; 
        CT += "<input id=\"cmdclose" + formname + "\"  class=\"tablinksclose\" title=\"بستن\"   onclick=\"CloseTabinMainFormLock('cmd" + formname  + "','cmdclose" + formname  + "','" + formname  + "','"+passformid+"')\" alt=\"بستن\"  value=\"X\" type=\"button\">&nbsp;"; 
        TabButton.innerHTML =  CT + TabButton.innerHTML; 
 
         var newElement = document.createElement("div"); 
         newElement.setAttribute('id', formname ); 
         newElement.setAttribute('name', formname ); 
         newElement.setAttribute('class','tabcontent'); 
          newElement.setAttribute('ZFIDLOCK',passformid); 
         newElement.setAttribute('width','100%'); 
         newElement.innerHTML  = "<iframe frameborder=\"0\" id=\"FormViewer" + commandcontrolname.toString() + "\"  class=\"MainView\" src=\"ZBPMS.bpm?ID=" + passformid.toString() + "\"   runat=\"server\" style=\"width:100%;" + ProcessHightIF + ";\"> </iframe>" ;                        
         TabContainer.appendChild(newElement);                   
         opentabmain(formname , 'SelectTabVfrmDesktop', "cmd" + formname ); 
          
         try  
         { 
         z_f_activetabid.value =  "cmd" + formname ; 
         z_f_activetabcloseid.value = "cmdclose" + formname ; 
         } 
         catch (e) 
         {} 
      
          
          
    } else 
    { 
        navigatebpm(passformid); 
    } 
 
 
} 
function openWindowsInNewTabNavigationUrl(navigationurl, formname, formCaption,control){ 
 
      
 
 
    var commandcontrolname = "cmd"+formname; 
        var co = document.getElementById(commandcontrolname); 
        if (co != null) 
        { 
            co.click(); 
            return; 
        } 
  
 
 
    tablinks = document.getElementsByClassName("tablinks"); 
    for (i = 0; i < tablinks.length; i++) { 
        tablinks[i].className = "tablinksNormal"; 
        //tabcontent[i].style.display = "none"; 
    } 
 
    var TabButton = document.getElementById('TBC'); 
    if (TabButton != null) 
    { 
        tcounter += 1; 
        var IFName = ""; 
        if (tcounter > 0)  
        { 
            IFName = tcounter.toString(); 
        } 
 
        var TabContainer = document.getElementById('TABCC'); 
        var CT = ""; 
        CT  =  "<input id=\"cmd" + formname  + "\" class=\"tablinks\" onclick=\"opentabmain( '" + formname  + "','SelectTabVfrmDesktop','cmd" + formname  + "')\" value=\"" + formCaption + "\" type=\"button\">"; 
        CT += "<input id=\"cmdclose" + formname  + "\"  class=\"tablinksclose\" title=\"بستن\"   onclick=\"CloseTabinMainForm('cmd" + formname  + "','cmdclose" + formname + "','" + formname  + "')\" alt=\"بستن\"  value=\"X\" type=\"button\">&nbsp;"; 
        TabButton.innerHTML =  CT + TabButton.innerHTML; 
 
         var newElement = document.createElement("div"); 
         newElement.setAttribute('id', formname ); 
         newElement.setAttribute('name', formname ); 
         newElement.setAttribute('class','tabcontent'); 
         newElement.setAttribute('width','100%'); 
         newElement.innerHTML  = "<iframe frameborder=\"0\" id=\"FormViewer" + IFName.toString() + "\"  class=\"MainView\" src=\""+ navigationurl + "\"   runat=\"server\" style=\"width:100%;" + ProcessHightIF + ";\"> </iframe>" ;                        
         TabContainer.appendChild(newElement);                   
         opentabmain(formname, 'SelectTabVfrmDesktop', "cmd" + formname ); 
          
                    try  
                  { 
                        z_f_activetabid.value =  "cmd" + formname;  
                        z_f_activetabcloseid.value = "cmdclose" + formname ; 
                  } 
                  catch (e) 
                  {} 
          
          
    } else 
    { 
        navigateAddress(navigationurl); 
    } 
 
 
} 
 
function LoadlookupTable(Key,indexv,KeyCodeV,ObjectS,...relatedcontrol){ 
    if (KeyCodeV == 13) 
    { 
        var ObjectContenetname  =ObjectS + indexv; 
        var objectContenet = document.getElementById(ObjectContenetname); 
        var Value = objectContenet.value; 
         
         
     var i; 
     var Extentionparam="";      
     for (i=0 ; i < relatedcontrol.length ; i++ ) 
     { 
         var C = document.getElementById(relatedcontrol[i]); 
         var Valueofpassobject = C.value; 
         Extentionparam += "Param"+i.toString()+"="+Valueofpassobject; 
         if (i < relatedcontrol.length-1 ) 
         { 
             Extentionparam += "&"; 
         } 
          
     } 
      
     if (Extentionparam.length > 0) 
    { 
            Extentionparam ="&"+Extentionparam;         
    } 
         
        if (Value.toString().length > 1)  
        { 
            selectcounter = 0; 
            var urlv = baseapplicationsrc + 'AutoSearch.ajx?R=1&INDEX=' + indexv.toString() + "&SYSCONTROL=" + Key.toString() + "&fillObject=" + Value.toString() + "&search=1"+Extentionparam ; 
            xmlHttp = new XMLHttpRequest(); 
            xmlHttp.open("GET", urlv, false); 
            xmlHttp.send(null); 
            var rt = xmlHttp.responseText; 
            if (rt.toString() == "null") 
            {                                 
                for (var a=0 ; a <10 ;a++) 
                { 
                    try  
                    { 
                        if (a==0)    
                        { 
                                  var MAINOBJECTNAME  =ObjectS; 
                                  var KEYIDOBJECT = document.getElementById(MAINOBJECTNAME); 
                                  KEYIDOBJECT.value = ""; 
                        } 
                        else 
                        { 
                                  var MAINOBJECTNAME  =ObjectS + a; 
                                  var KEYIDOBJECT = document.getElementById(MAINOBJECTNAME); 
                                  KEYIDOBJECT.value = ""; 
                        } 
                    } 
                    catch (e){} 
                } 
            } 
            else 
            { 
                var outdata = JSON.parse(rt);  
                var counter = 0; // if you need it 
                var B = outdata[0]; 
                for (var key in B)  
                { 
                     
                       if (counter == 0) 
                            { 
                               var MAINOBJECTNAME  =ObjectS; 
                               var KEYIDOBJECT = document.getElementById(MAINOBJECTNAME); 
                               KEYIDOBJECT.value = B[key];                               
                            } 
                            else 
                            { 
                               var MAINOBJECTNAME  =ObjectS + counter; 
                               var KEYIDOBJECT = document.getElementById(MAINOBJECTNAME); 
                               KEYIDOBJECT.value = B[key]; 
                            }                             
                       counter++; 
                        
                } 
                 
                 
            } 
             
            // rt is json Text  
             
             
        } 
        else 
        { 
            for (var a=0 ; a <10 ;a++) 
                { 
                    try  
                    { 
                        if (a==0)    
                        { 
                                  var MAINOBJECTNAME  =ObjectS; 
                                  var KEYIDOBJECT = document.getElementById(MAINOBJECTNAME); 
                                  KEYIDOBJECT.value = ""; 
                        } 
                        else 
                        { 
                                  var MAINOBJECTNAME  =ObjectS + a; 
                                  var KEYIDOBJECT = document.getElementById(MAINOBJECTNAME); 
                                  KEYIDOBJECT.value = ""; 
                        } 
                    } 
                    catch (e){} 
                } 
        } 
                                
        return false; 
    } 
     
    return false; 
} 
function CloseTabinMainForm(ButtonMain, ButtonClose, DivAddd){ 
 
 
 
    var element1 = document.getElementById(ButtonMain); 
    element1.parentNode.removeChild(element1); 
 
    var element2 = document.getElementById(ButtonClose); 
    element2.parentNode.removeChild(element2); 
 
    var element3 = document.getElementById(DivAddd); 
    element3.parentNode.removeChild(element3); 
  
} 
async function  CloseTabinMainFormLock(ButtonMain, ButtonClose, DivAddd,formid){ 
    RemoveConcurrencyForm(formid); 
    var element1 = document.getElementById(ButtonMain); 
    element1.parentNode.removeChild(element1); 
 
    var element2 = document.getElementById(ButtonClose); 
    element2.parentNode.removeChild(element2); 
 
    var element3 = document.getElementById(DivAddd); 
    element3.parentNode.removeChild(element3); 
     
} 
async function RemoveConcurrencyForm(formid){ 
        var param = []; 
	param.push({name:'ID', value:formid}); 
        let s= await  callAjax('free.rcc',param,1); 
   
} 
function BindingFormNavigatePage(Childdiv, maindiv, senderbutton, pagenumber, pagesaver){ 
 
    document.getElementById(pagesaver).value = pagenumber; 
    var a = document.getElementById(maindiv); 
    var Alldiv = a.getElementsByClassName("childslide"); 
 
 
 
    for (var i = 0; i < Alldiv.length; ++i) 
    { 
        Alldiv[i].style.display = 'none'; 
    } 
 
    document.getElementById(Childdiv).style.display = 'block'; 
 
 
 
 
  
} 
 
 
async  function RestApiCall_nfx(address,param,method,fn){ 
    
   var isok = false; 
   var outdata ;    
   if (method == 1) 
		{ 
		   // get  
		   // create in url  
		        var fullAddress =  address ; 
                                                			                      
                         if (fullAddress.trim().length > 0 ) 
							{																 
								        var xhr = new XMLHttpRequest(); 
									var url =  fullAddress; 
							             
                                                                        xhr.onreadystatechange = function () { 
                                                                                   if (xhr.readyState == 4 && xhr.status == 200) { 
                                                                                           
                                                                                           var outdata = JSON.parse(xhr.responseText); 
                                                                                            
                                                                                           fn(outdata); 
 
                                                                                   } 
									}; 
                                                                        xhr.open("GET", url, true); 
								        xhr.setRequestHeader("Content-type", "application/json");								     
									xhr.send(); 
                                                    }             			 	 
			 
		}    
		else 
		{ 
                                    var fullAddress =  address ;                       
                                    var xhr = new XMLHttpRequest(); 
                                    var url = fullAddress; 
                                    xhr.open("POST", url, true); 
                                    xhr.setRequestHeader("Content-type", "application/json"); 
                                    xhr.onreadystatechange = function () { 
                                        if (xhr.readyState === 4 && xhr.status === 200) { 
                                              
                                                var outdata = JSON.parse(xhr.responseText);                                                                                            
                                                fn(outdata); 
                                        } 
                                    };                                                                         
                                xhr.send(param);                                                                           
		} 
	 
 
       
 
} 
async  function RestApiCall (address,param,method){ 
    return new Promise(resolve => {RestApiCall_nfx(address,param,method, resolve);}); 
}    
 
 
 
async  function NativecallZf_jslib_nfx(address,param,method,fn){ 
    
   var isok = false; 
   var outdata ;    
   if (method == 1) 
		{ 
		   // get  
		   // create in url  
		        var fullAddress =  address ; 
                         
                        if (param != null) 
                        { 
                                if (param.length > 0) 
                                { 
                                    fullAddress += "?"; 
                                } 
                        } 
                         
			 for (var i=0 ; i < param.length ; i++) 
			 {			  
			     fullAddress+= param[i].name+'='+param[i].value; 
			     if (i != param.length-1) 
				 { 
				    fullAddress+"&"; 
				 } 
			 } 
			   
			  //return fullAddress;	 
			  
                     
                         if (fullAddress.trim().length > 0 ) 
							{ 
								 
								 
								        var xhr = new XMLHttpRequest(); 
									var url =  fullAddress; 
							             
                                                                        xhr.onreadystatechange = function () { 
                                                                                   if (xhr.readyState == 4 && xhr.status == 200) { 
                                                                                           
                                                                                           var outdata = JSON.parse(xhr.responseText); 
                                                                                            
                                                                                           fn(outdata); 
 
                                                                                   } 
									}; 
                                                                        xhr.open("GET", url, true); 
								        xhr.setRequestHeader("Content-type", "application/json");								     
									xhr.send(); 
                                                    }             			 	 
			 
		}    
		else 
		{ 
                                    var fullAddress =  address ;                       
                                    var xhr = new XMLHttpRequest(); 
                                    var url = fullAddress; 
                                    xhr.open("POST", url, true); 
                                    xhr.setRequestHeader("Content-type", "application/json"); 
                                    xhr.onreadystatechange = function () { 
                                        if (xhr.readyState === 4 && xhr.status === 200) { 
                                              
                                                var outdata = JSON.parse(xhr.responseText);                                                                                            
                                                fn(outdata); 
                                        } 
                                    }; 
                                     
                                    if (param.length > 0 ) 
                                    { 
                                    var data  ="{"; 
                                     for (var i=0 ; i < param.length ; i++) 
                                        {			  
                                             
                                            data += '"'+param[i].name+'"'+':'+'"'+param[i].value+'"'; 
                                             
                                            if (i != param.length-1) 
                                                { 
                                                   fullAddress+","; 
                                                } 
                                        } 
                                      
                                      data += "}" 
                                    xhr.send(data); 
                                   } 
                                   else 
                                   { 
                                       xhr.send(null); 
                                   } 
                     
                     
		} 
	 
 
       
 
} 
async  function nativecallZf_jslib (address,param,method){ 
    return new Promise(resolve => {NativecallZf_jslib_nfx(address,param,method, resolve);}); 
}    
 
 
 
async  function  TranslateText(languageid,translattext)        { 
            var param = []; 
	    param.push({name:'LANGUAGE_ID', value:languageid}); 
            param.push({name:'OBJECT_TEXT', value:translattext}); 
            var TrPage = baseapplicationsrc+'zfdic.jsp';             
            return new Promise(resolve => {NativecallZf_jslib_nfx( TrPage ,param,2,resolve);}); 
             
             
        } 
async  function callZf_jslib_n(address,funcname,param,method,fn){ 
    
   var isok = false; 
   var outdata ;    
   if (method == 1) 
		{ 
		   // get  
		   // create in url  
		        var fullAddress = baseapplicationsrc + address + funcname+'.zjs'; 
                         
                        if (param != null) 
                        { 
                                if (param.length > 0) 
                                { 
                                    fullAddress += "?"; 
                                } 
                        } 
                         
			 for (var i=0 ; i < param.length ; i++) 
			 {			  
			     fullAddress+= param[i].name+'='+param[i].value; 
			     if (i != param.length-1) 
				 { 
				    fullAddress+"&"; 
				 } 
			 } 
			   
			  //return fullAddress;	 
			  
                     
                         if (fullAddress.trim().length > 0 ) 
							{ 
								 
								 
								        var xhr = new XMLHttpRequest(); 
									var url =  fullAddress; 
							             
                                                                        xhr.onreadystatechange = function () { 
                                                                                   if (xhr.readyState == 4 && xhr.status == 200) { 
                                                                                           
                                                                                           var outdata = JSON.parse(xhr.responseText); 
                                                                                            
                                                                                           fn(outdata); 
 
                                                                                   } 
									}; 
                                                                        xhr.open("GET", url, true); 
								        xhr.setRequestHeader("Content-type", "application/json");								     
									xhr.send(); 
                                                    }             			 	 
			 
		}    
		else 
		{ 
                                    var fullAddress = baseapplicationsrc + address + funcname+'.zjs';                       
                                    var xhr = new XMLHttpRequest(); 
                                    var url = fullAddress; 
                                    xhr.open("POST", url, true); 
                                    xhr.setRequestHeader("Content-type", "application/json"); 
                                    xhr.onreadystatechange = function () { 
                                        if (xhr.readyState === 4 && xhr.status === 200) { 
                                              
                                                var outdata = JSON.parse(xhr.responseText);                                                                                            
                                                fn(outdata); 
                                        } 
                                    }; 
                                     
                                    if (param.length > 0 ) 
                                    { 
                                    var data  ="{"; 
                                     for (var i=0 ; i < param.length ; i++) 
                                        {			  
                                             
                                            data += '"'+param[i].name+'"'+':'+'"'+param[i].value+'"'; 
                                             
                                            if (i != param.length-1) 
                                                { 
                                                   fullAddress+","; 
                                                } 
                                        } 
                                      
                                      data += "}" 
                                    xhr.send(data); 
                                   } 
                                   else 
                                   { 
                                       xhr.send(null); 
                                   } 
                     
                     
		} 
	 
 
       
 
} 
async  function callZf_jslib (address,funcname,param,method){ 
    return new Promise(resolve => {callZf_jslib_n(address,funcname,param,method, resolve);}); 
}    
async  function NativecallZf_jslib_nfxfile(address,param,method,fn){ 
    
   var isok = false; 
   var outdata ;    
   if (method == 1) 
		{ 
		   // get  
		   // create in url  
		        var fullAddress =  address ; 
                         
                        if (param != null) 
                        { 
                                if (param.length > 0) 
                                { 
                                    fullAddress += "?"; 
                                } 
                        } 
                         
			 for (var i=0 ; i < param.length ; i++) 
			 {			  
			     fullAddress+= param[i].name+'='+param[i].value; 
			     if (i != param.length-1) 
				 { 
				    fullAddress+"&"; 
				 } 
			 } 
			   
			  //return fullAddress;	 
			  
                     
                         if (fullAddress.trim().length > 0 ) 
							{ 
								 
								 
								        var xhr = new XMLHttpRequest(); 
                                                                        xhr.responseType = 'blob'; 
									var url =  fullAddress; 
							             
                                                                        xhr.onreadystatechange = function () { 
                                                                                   if (xhr.readyState == 4 && xhr.status == 200) { 
                                                                                           
                                                                                           var outdata = xhr.response; 
                                                                                            
                                                                                           fn(outdata); 
 
                                                                                   } 
									}; 
                                                                        xhr.open("GET", url, true); 
								        xhr.setRequestHeader("Content-type", "application/json");								     
									xhr.send(); 
                                                    }             			 	 
			 
		}    
		else 
		{ 
                                    var fullAddress =  address ;                       
                                    var xhr = new XMLHttpRequest(); 
                                    var url = fullAddress; 
                                    xhr.open("POST", url, true); 
                                    xhr.responseType = 'blob'; 
                                    xhr.setRequestHeader("Content-type", "application/json"); 
                                    xhr.onreadystatechange = function () { 
                                        if (xhr.readyState === 4 && xhr.status === 200) { 
                                              
                                                var outdata = xhr.response; 
                                                fn(outdata); 
                                        } 
                                    }; 
                                     
                                    if (param.length > 0 ) 
                                    { 
                                    var data  ="{"; 
                                     for (var i=0 ; i < param.length ; i++) 
                                        {			  
                                             
                                            data += '"'+param[i].name+'"'+':'+'"'+param[i].value+'"'; 
                                             
                                            if (i != param.length-1) 
                                                { 
                                                   fullAddress+","; 
                                                } 
                                        } 
                                      
                                      data += "}" 
                                    xhr.send(data); 
                                   } 
                                   else 
                                   { 
                                       xhr.send(null); 
                                   } 
                     
                     
		} 
	 
 
       
 
} 
async  function nativecallZf_jslib_file (address,param,method){ 
    return new Promise(resolve => {NativecallZf_jslib_nfxfile(address,param,method, resolve);}); 
}    
async function testcall(){ 
  var param = []; 
	param.push({name:'parties_entities_id', value:'8'}); 
        let s= await  callZf_jslib('yourpath/fx/','fxname',param,2); 
        alert(s[0].PARTIES_ENTITIES_NAME); 
	 
} 
function fixvalidatezframe(o){if (o.willValidate) 
        { 
         o.setCustomValidity(''); 
        } 
     
} 
function showfilterpanelcombo(p) { 
                        var maint  = document.getElementById(p); 
                         var childrendiv = maint.getElementsByTagName('div');                                               
                         var div; 
                        for(var i = 0; i< childrendiv.length;i++) 
                         { 
                           if (childrendiv[i].getAttribute('id') == 'myDropdown')  
                           { 
 
                             div = childrendiv[i]; 
 
                           } 
                         } 
                       div.classList.toggle("show"); 
} 
function filterFunction(p) { 
            var maint  = document.getElementById(p); 
            var childrentxt = maint.getElementsByTagName('input'); 
            var input, filter, ul, li, a, i ,div; 
 
            for(var i = 0; i< childrentxt.length;i++) 
             { 
               if (childrentxt[i].getAttribute('id') == 'myInput')  
               { 
 
                 input = childrentxt[i]; 
 
               } 
             } 
 
            var childrendiv = maint.getElementsByTagName('div');                                               
            for(var i = 0; i< childrendiv.length;i++) 
             { 
               if (childrendiv[i].getAttribute('id') == 'myDropdown')  
               { 
 
                 div = childrendiv[i]; 
 
               } 
             } 
 
           filter = input.value.toUpperCase();                       
           a = div.getElementsByTagName("span"); 
           for (i = 0; i < a.length; i++) { 
             if (a[i].innerHTML.toUpperCase().indexOf(filter) > -1) { 
               a[i].style.display = ""; 
             } else { 
               a[i].style.display = "none"; 
             } 
           } 
}  
function getElementByAttribute(attr, value, root) { 
    root = root || document.body; 
    if(root.hasAttribute(attr) && root.getAttribute(attr) == value) { 
        return root; 
    } 
    var children = root.children,  
        element; 
    for(var i = children.length; i--; ) { 
        element = getElementByAttribute(attr, value, children[i]); 
        if(element) { 
            return element; 
        } 
    } 
    return null; 
} 
function GetControlByName(value ) { 
    return getElementByAttribute('zid',value,null) ; 
} 
function GetRequiredControlListCaption(){ 
  var arr = []; 
  var form = document.getElementById('bpmform');   
  var c =  0 ; 
  var returnString  = ""; 
    for(var i=0; i < form.elements.length; i++) 
    { 
      if(form.elements[i].value === '' && form.elements[i].hasAttribute('required')) 
      {  
        arr[c] = form.elements[i].getAttribute('zcp'); 
        c++; 
      }         
    } 
     
    return arr;     
     
 } 
function GetRequiredControlListID(){ 
  var arr = []; 
  var form = document.getElementById('bpmform');   
  var c =  0 ; 
  var returnString  = ""; 
    for(var i=0; i < form.elements.length; i++) 
    { 
      if(form.elements[i].value === '' && form.elements[i].hasAttribute('required')) 
      {  
        arr[c] = form.elements[i].getAttribute('zid'); 
        c++; 
      }         
    } 
     
    return arr;     
     
 } 
function GetUrlParamter(name){ 
    
	var url_string = window.location.href ; 
	var url = new URL(url_string); 
	var c = url.searchParams.get(name); 
	return c; 
} 
 
function GetUrlParameter(name){ 
    
	var url_string = window.location.href ; 
	var url = new URL(url_string); 
	var c = url.searchParams.get(name); 
	return c; 
} 
function CloseActiveTab(){ 
     var PFCCCID = parent.document.getElementById('z_f_activetabcloseid'); 
     var CID  = PFCCCID.value; 
     var a = parent.document.getElementById(CID); 
     a.click(); 
} 
function CheckBoxCheckDo(isChecked, ctrlname){ 
        var checkboxes = new Array(); 
        checkboxes = document.getElementsByTagName('input'); 
            for (var i = 0; i < checkboxes.length; i++) { 
                    if (checkboxes[i].type == 'checkbox') { 
                            if (checkboxes[i].name == ctrlname) { 
                                checkboxes[i].checked = isChecked; 
                    } 
            } 
            } 
} 
function powerfloatc(value1,value2,distination){ 
    try  
    { 
         
             distination.value = value1*value2; 
     } 
    catch  (e){ 
    distination.value = 0;     
    } 
} 
async  function ZfAction_lib(formid,method,param,fn){ 
    
   var isok = false; 
   var outdata ;    
        var fullAddress = baseapplicationsrc + 'zfrestlib/restobject/' + formid+'/'+method +'.zor';                       
          var xhr = new XMLHttpRequest(); 
          var url = fullAddress; 
          xhr.open("POST", url, true); 
          xhr.setRequestHeader("Content-type", "application/json"); 
          xhr.onreadystatechange = function () { 
              if (xhr.readyState === 4 && xhr.status === 200) { 
 
                      var outdata = JSON.parse(xhr.responseText);                                                                                            
                      fn(outdata); 
              } 
          }; 
 
          if (param.length > 0 ) 
          { 
          var data  ="{"; 
           for (var i=0 ; i < param.length ; i++) 
              {			  
 
                  data += '"'+param[i].name+'"'+':'+'"'+param[i].value+'"'; 
 
                  if (i != param.length-1) 
                      { 
                         fullAddress+","; 
                      } 
              } 
 
            data += "}" 
          xhr.send(data); 
         } 
         else 
         { 
             xhr.send(null); 
         }                    
} 
async  function ZfAction    (formid,method,param)   { 
    return new Promise(resolve => {ZfAction_lib(formid,method,param, resolve);}); 
}    
function disable_all_control_in(obj) {  
    try  
    { 
    for (var  i = 0; i < obj.childNodes.length; i++) {  
        if (obj.childNodes[i].tagName == "INPUT" || obj.childNodes[i].tagName == "SELECT" )  {  
            obj.childNodes[i].disabled = true;  
            obj.childNodes[i].readOnly = true;  
        }  
        else  
        {  
            var h  = obj.childNodes[i]; 
            disable_all_control_in(h);  
        }  
    } 
    } 
    catch (e) 
    { } 
     
 }  
function enable_all_control_in(obj) {  
    try  
    { 
         
            for (var i = 0; i < obj.childNodes.length; i++)  
            {  
              if (obj.childNodes[i].tagName == "INPUT" || obj.childNodes[i].tagName  == "SELECT" )   
              {  
                  obj.childNodes[i].disabled = false;     
                  obj.childNodes[i].readOnly = false;  
              }  
              else  
              {  
                  var h = obj.childNodes[i]; 
                  enable_all_control_in(h);  
              }  
 
          } 
    } 
    catch (e) 
    {} 
 }  
  
 
function disable_all_control_in_binding(obj) {  
    try  
    { 
    for (var  i = 0; i < obj.childNodes.length; i++) {  
        if (obj.childNodes[i].tagName == "INPUT" || obj.childNodes[i].tagName == "SELECT" )  {  
             
            if (obj.childNodes[i].class != "DeleteButton" && obj.childNodes[i].class != "updateButton") 
                  {                         
                        obj.childNodes[i].readOnly = true;  
                 } 
        }  
        else  
        {  
            var h  = obj.childNodes[i]; 
            disable_all_control_in_binding(h);  
        }  
    } 
    } 
    catch (e) 
    { } 
     
 }  
function enable_all_control_in_binding(obj) {  
    try  
    { 
         
            for (var i = 0; i < obj.childNodes.length; i++)  
            {  
              if (obj.childNodes[i].tagName == "INPUT" || obj.childNodes[i].tagName  == "SELECT" )   
              {  
                  if (obj.childNodes[i].class != "DeleteButton" && obj.childNodes[i].class != "updateButton") 
                  {                     
                    obj.childNodes[i].readOnly = false;  
                  } 
              }  
              else  
              {  
                  var h = obj.childNodes[i]; 
                  enable_all_control_in_binding(h);  
              }  
 
          } 
    } 
    catch (e) 
    {} 
 }  
 
 
 
function disable_all_control() {  
     var obj = document.forms[0].elements;  
    for (i = 0; i < obj.length; i++) {  
        if (obj[i].tagName == "INPUT" || obj[i].tagName == "SELECT" ) {  
            obj[i].disabled = true;  
        }  
    }  
      
    var panel = document.getElementById('ControlPanel');  
      panel.style.visibility='hidden'   
 }    
function enable_all_control() {  
     var obj = document.forms[0].elements;  
    for (i = 0; i < obj.length; i++) {  
        if (obj[i].tagName == "INPUT"  || obj[i].tagName == "SELECT" ) {  
            obj[i].disabled = false;  
        }         
    }      
    var panel = document.getElementById('ControlPanel');  
    panel.style.visibility='visible'   
 }  
function DosearchGrid(searchC , KeyCodeV){ 
    if (KeyCodeV == 13) 
    { 
         var cmdsearch = document.getElementById(searchC);  
         cmdsearch.click(); 
    } 
} 
async  function callAjax_l(address,param,method,fn){    
   var isok = false; 
   var outdata ;    
   if (method == 1) 
		{ 
		   // get  
		   // create in url  
		        var fullAddress = baseapplicationsrc + address ;                         
                        if (param != null) 
                        { 
                                if (param.length > 0) 
                                { 
                                    fullAddress += "?"; 
                                } 
                        }                         
			 for (var i=0 ; i < param.length ; i++) 
			 {			  
			     fullAddress+= param[i].name+'='+param[i].value; 
			     if (i != param.length-1) 
				 { 
				    fullAddress+"&"; 
				 } 
			 }			   
			  //return fullAddress;				                     	  
                         if (fullAddress.trim().length > 0 ) 
							{ 
								 
								 
								        var xhr = new XMLHttpRequest(); 
                                                                        var url =  fullAddress; 
								 
							             
                                                                        xhr.onreadystatechange = function () { 
                                                                                   if (xhr.readyState == 4 && xhr.status == 200) { 
                                                                                           
                                                                                           var outdata = JSON.parse(xhr.responseText); 
                                                                                            
                                                                                           fn(outdata); 
 
                                                                                   } 
									}; 
                                                                        xhr.open("GET", url, true); 
								        xhr.setRequestHeader("Content-type", "application/json");								     
									xhr.send(); 
                                                    }             			 	 
			 
		}    
		else 
		{ 
                                    var fullAddress = baseapplicationsrc + address ;                       
                                    var xhr = new XMLHttpRequest(); 
                                    var url = fullAddress; 
                                    xhr.open("POST", url, true); 
                                    xhr.setRequestHeader("Content-type", "application/json"); 
                                    xhr.onreadystatechange = function () { 
                                        if (xhr.readyState === 4 && xhr.status === 200) { 
                                              
                                                var outdata = JSON.parse(xhr.responseText);                                                                                            
                                                fn(outdata); 
                                        } 
                                    }; 
                                     
                                    if (param.length > 0 ) 
                                    { 
                                    var data  ="{"; 
                                     for (var i=0 ; i < param.length ; i++) 
                                        {			  
                                             
                                            data += '"'+param[i].name+'"'+':'+'"'+param[i].value+'"'; 
                                             
                                            if (i != param.length-1) 
                                                { 
                                                   fullAddress+","; 
                                                } 
                                        } 
                                      
                                      data += "}" 
                                    xhr.send(data); 
                                   } 
                                   else 
                                   { 
                                       xhr.send(null); 
                                   }                    
		} 
} 
async  function callAjax (address,param,method){ 
    return new Promise(resolve => {callAjax_l(address,param,method,resolve);}); 
}  
 
 
async function unloadmainformchecking(){ 
     
      var  elementlist = document.getElementsByClassName("tabcontent"); 
      for(var i = elementlist.length; i--; ) { 
        if (elementlist[i].hasAttribute('zfidlock')) 
        { 
            var nf = elementlist[i].getAttribute('zfidlock'); 
            RemoveConcurrencyForm(nf); 
        } 
    } 
} 
 
function searchtextclear(idc) 
{ 
    var textvalue = idc+'txt'; 
    var textbixc =document.getElementById(textvalue); 
    if (textbixc.value.trim().length == 0) 
    { 
         
        var hidtext  =document.getElementById(idc); 
        hidtext.value = ""; 
    } 
} 
 
 
function replaceAll(str, find, replace) { 
    return str.replace(new RegExp(find, 'g'), replace); 
} 
 
 
async function autocompletefx(inp, control_id, Control,hidvalue ,...relatedcontrol) { 
  /*the autocomplete function takes two arguments, 
  the text field element and an array of possible autocompleted values:*/ 
  var currentFocus; 
  var cc = document.getElementById(hidvalue); 
  /*execute a function when someone writes in the text field:*/ 
   
  inp.addEventListener("input", async (e) =>  { 
      var a, b, i, val = inp.value; 
      /*close any already open lists of autocompleted values*/ 
    let arr = await FillFindObjectBoxAndTextSearch(control_id,Control,...relatedcontrol);     
    
    
      closeAllLists(); 
      if (!val) { return false;} 
       
      if ( arr == null || arr.length == 0)  
      { return false;} 
       
      currentFocus = -1; 
      /*create a DIV element that will contain the items (values):*/ 
      a = document.createElement("DIV"); 
      a.setAttribute("id", inp.id + "autocomplete-list"); 
      a.setAttribute("class", "autocomplete-items"); 
      /*append the DIV element as a child of the autocomplete container:*/ 
      inp.parentNode.appendChild(a); 
      /*for each item in the array...*/ 
       
        var keys = Object.keys(arr[0]); 
        var Key_Id  = keys[0]; 
        var key_value = keys[1]; 
        cc.value = "0"; 
      for (i = 0; i < arr.length; i++) { 
        /*check if the item starts with the same letters as the text field value:*/ 
         
         
          /*create a DIV element for each matching element:*/ 
          b = document.createElement("DIV"); 
          /*make the matching letters bold:*/ 
          //b.innerHTML = "<strong>" + arr[i][key_value].substr(0, val.length) + "</strong>"; 
          //b.innerHTML += arr[i][key_value].substr(val.length); 
          b.innerHTML += arr[i][key_value]; 
          /*insert a input field that will hold the current array item's value:*/ 
          b.innerHTML += "<input type='hidden' value='" + arr[i][Key_Id] + "'>"; 
          /*execute a function when someone clicks on the item value (DIV element):*/ 
              b.addEventListener("click", function(e) { 
              /*insert the value for the autocomplete text field:*/ 
               
                  cc.value = this.getElementsByTagName("input")[0].value; 
                  inp.value = this.innerText ; 
                  //inp.onchange(); 
               
              /*close the list of autocompleted values, 
              (or any other open lists of autocompleted values:*/ 
              closeAllLists(); 
          }); 
          a.appendChild(b); 
         
      } 
  }); 
  /*execute a function presses a key on the keyboard:*/ 
  inp.addEventListener("keydown", function(e) { 
      var x = document.getElementById(this.id + "autocomplete-list"); 
      if (x) x = x.getElementsByTagName("div"); 
      if (e.keyCode == 40) { 
        /*If the arrow DOWN key is pressed, 
        increase the currentFocus variable:*/ 
        currentFocus++; 
        /*and and make the current item more visible:*/ 
        addActive(x); 
      } else if (e.keyCode == 38) { //up 
        /*If the arrow UP key is pressed, 
        decrease the currentFocus variable:*/ 
        currentFocus--; 
        /*and and make the current item more visible:*/ 
        addActive(x); 
      } else if (e.keyCode == 13) { 
        /*If the ENTER key is pressed, prevent the form from being submitted,*/ 
        e.preventDefault(); 
        if (currentFocus > -1) { 
          /*and simulate a click on the "active" item:*/ 
          if (x) x[currentFocus].click(); 
        } 
      } 
  }); 
  function addActive(x) { 
    /*a function to classify an item as "active":*/ 
    if (!x) return false; 
    /*start by removing the "active" class on all items:*/ 
    removeActive(x); 
    if (currentFocus >= x.length) currentFocus = 0; 
    if (currentFocus < 0) currentFocus = (x.length - 1); 
    /*add class "autocomplete-active":*/ 
    x[currentFocus].classList.add("autocomplete-active"); 
  } 
  function removeActive(x) { 
    /*a function to remove the "active" class from all autocomplete items:*/ 
    for (var i = 0; i < x.length; i++) { 
      x[i].classList.remove("autocomplete-active"); 
    } 
  } 
  function closeAllLists(elmnt) { 
    /*close all autocomplete lists in the document, 
    except the one passed as an argument:*/ 
    var x = document.getElementsByClassName("autocomplete-items"); 
    for (var i = 0; i < x.length; i++) { 
      if (elmnt != x[i] && elmnt != inp) { 
      x[i].parentNode.removeChild(x[i]); 
    } 
  } 
   
  if ( inp.value.trim().length == 0) 
  { 
      cc.value = "0"; 
  } 
   
   
} 
/*execute a function when someone clicks in the document:*/ 
document.addEventListener("click", function (e) { 
    closeAllLists(e.target); 
}); 
}  
 
 
async function FillFindObjectBoxAndTextSearch(control_id,content,...relatedcontrol) 
{ 
     try  
    { 
        var form_id = GetUrlParameter('ID'); 
        var value  = content.value; 
        var param= []; 
    	param.push({name:'rule_id', value:"0"}); 
        param.push({name:'form_id', value:form_id}); 
        param.push({name:'control_id', value:control_id}); 
        param.push({name:'content', value:value}); 
        param.push({name:'te', value:"null"}); 
         
        var i; 
        try  
            { 
            if ( relatedcontrol[0]  != undefined) 
            { 
            for (i=0 ; i < relatedcontrol.length ; i++ ) 
                { 
                    var cname = relatedcontrol[i].toString();                 
                    var C = document.getElementById(cname); 
                    if (C != null) 
                    { 
                            var value_data  =  C.value; 
                            var Param_Name = C.getAttribute('zid'); 
                            param.push({name:Param_Name, value:value_data}); 
                    } 
 
                } 
            } 
       } 
       catch (ee){} 
     
                 
        var fucname = "Search.ZF_COMPLEX"; 
        var address = baseapplicationsrc + "searchEngine/"+ fucname;         
        let s= await  nativecallZf_jslib(address,param,2); 
        return s;     
    } 
    catch (e) 
    { 
        return null; 
    } 
} 
 
function SelectLocation(formid, objectcontrol, title) { 
    lookupcontrol = objectcontrol; 
    var findspace = document.getElementById("findobjectinOtherform"); 
    findspace.innerHTML = ""; 
    findspace.innerHTML += "<div id=\"findpanel\" class=\"ShowPanel\" ><div class=\"ShowPanelContenet\" style=\" height:" + formhightinview + "vh;width:90%;\" align=\"Center\"><Table dir=\"rtl\" style=\"width:100%;\" class=\"FromCaption\" ><tr> <td align=\"right\" ><input type=\"button\" id=\"close\"   class=\"closebutton\" onclick=\"CloseFindForm();\"><span class=\"Title\">     Find Form    </span><span class=\"Title\">"+ title +"</span> &nbsp;&nbsp;&nbsp; <input type=\"button\" id=\"closeandapplay\" value=\"Accept   \"  style=\"width:150px;\"   onclick=\"CloseFindFormAndSubmit(" + formid + ");\"> </td></tr></table><iframe frameborder=\"0\" id=\"findiframe" + formid + "\"  src=\"" + baseapplicationsrc + "GOMAP/SelectLocation.html\" style=\"width:100%; height:" + formhightinview + "vh;background: #FFFFFF;\"> </iframe><Table id=\"submitformpanel\" dir=\"rtl\" style=\"width:100%;\" class=\"FindSubmit\" ><tr> <td align=\"Right\" ></td></tr></table></div></div>   "; 
    HiddenNowSelected(); 
} 
 
function NavigateLocation(fromlocation,tolocation ) { 
    var addressnavigate = baseapplicationsrc + "GOMAP/Navigate.html?from="+fromlocation+"&to="+tolocation; 
    openNewPage(addressnavigate); 
} 
 
function Showhelp(fromid) 
{ 
    var addressnavigate = baseapplicationsrc + "HelpForm/"+fromid+".pdf"; 
    openNewPage(addressnavigate); 
    return false; 
} 
 
 
 
async function CreateGridFormRestTable(datasource , activecheckbox , parentdiv , lngid) 
{ 
     
        var len = datasource.length; 
        var htmlcode = ""; 
        if (len > 0) 
        { 
            htmlcode = "<table dir=\"rtl\" class=\"Grid\" rules=\"all\" cellspacing=\"0\" border=\"1\">"; 
            htmlcode+="<thead><tr>"; 
        } 
         
        var mainkeyvalue = ""; 
         
        for (var c=0 ; c < len ;c++) 
        { 
            var classtr = ""; 
             
            if ((c+1)%2==0) 
            { 
                classtr = "class=\"alt\"";             
            } 
            if (c!=0) 
            { 
                htmlcode+="<tr "+classtr+">"; 
            } 
             
               var B = datasource[c]; 
               var countercolumns = 0 ; 
                for (var key in B)  
                { 
                     
                    var valuedata = B[key];                               
                    var keyValue = key; 
                       if (c == 0) 
                            { 
                              // Create Header     
                              if (countercolumns < 2) 
                              { 
                                htmlcode+="<th style=\"width: 40px; cursor: default; user-select: text;\" align=\"Center\"><span class=\"title\" style=\"color:#ffffff;\"> </span></th>" ;  
                              } 
                              else 
                              { 
                                  let datatranslate = await TranslateText(lngid ,keyValue); 
                                  var texttranslate = datatranslate[0].TXT; 
                                  htmlcode+="<th style=\"cursor: default; user-select: text;\"><span style=\"cursor: default; user-select: text;\">  "+texttranslate+"  <span></span></span></a></th>"; 
                              }                             
                            } 
                            else 
                            { 
                                // Create Row Data  
                                if (countercolumns  == 0) 
                                { 
                                    mainkeyvalue = valuedata; 
                                    htmlcode+="<td align=\"Center\"><span class=\"title\">"+(c+1)+"</span></td>" 
                                } 
                                else if (countercolumns  == 1) 
                                { 
                                    htmlcode+= "<td class=\"selecttd\" align=\"Center\"><input value=\""+mainkeyvalue+"\"class=\"GridButton\" type=\"button\"><input type=\"hidden\" class=\"GridRecordValue\" value=\""+mainkeyvalue+"\"></td>"; 
                                } 
                                else  
                                { 
                                 htmlcode+="<td><span class=\"title\">"+valuedata+"</span></td>"   ; 
                                }                                 
                            }                             
                  countercolumns++; 
               }                
               htmlcode+="</tr>"; 
               if (c==0) 
               { 
                   htmlcode+="</thead>"; 
               }                
        } 
         
        if (htmlcode != "") 
        { 
            htmlcode+= "</table>" 
        } 
        parentdiv.innerHTML  = htmlcode; 
    
     
} 
 
 
 
/// Java websocket Main Api For ZFrame Service  
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// 
 
 
var ClientZFServiceCallbackfunction ; 
 
        class WebSocketClient { 
         
         
        constructor(protocol, hostname, port, endpoint, cbfonreceive ,zfmode) { 
             
            this.webSocket = null;             
            this.protocol = protocol; 
            this.hostname = hostname; 
            this.port     = port; 
            this.endpoint = endpoint; 
            ClientZFServiceCallbackfunction = cbfonreceive ; //function(){cbfonreceive()}.bind(this);             
            this.ZFrameMode = zfmode; 
        } 
         
       
         
        getServerUrl() { 
            return this.protocol + "://" + this.hostname + ":" + this.port + this.endpoint; 
        } 
        getZframeServiceUrl() 
        { 
           return baseapplicationsrc.replace("https:","wss:").replace("http:","ws:")+"zfservice";    
        } 
         
         
        connect() { 
            try { 
                 if (this.webSocket == null || this.webSocket.readyState == WebSocket.CLOSED) 
                 { 
                      if (this.ZFrameMode == 1) 
                      { 
                              this.webSocket = new WebSocket(this.getZframeServiceUrl());                 
                      } 
                      else 
                      { 
                            this.webSocket = new WebSocket(this.getServerUrl());                 
                      } 
 
                            this.webSocket.onopen = function(event) {                     
                                console.log('onopen::' + JSON.stringify(event, null, 4)); 
                            } 
 
                            this.webSocket.onmessage = function(event) { 
                                var msg = event.data; 
                                ClientZFServiceCallbackfunction(msg);					 
 
                            } 
                            this.webSocket.onclose = function(event) { 
                                console.log('onclose::' + JSON.stringify(event, null, 4));                 
                            } 
                            this.webSocket.onerror = function(event) { 
                                console.log('onerror::' + JSON.stringify(event, null, 4)); 
                            } 
                 } 
                 
            } catch (exception) { 
                //console.error(exception); 
            } 
        } 
         
        getStatus() { 
            return this.webSocket.readyState; 
        } 
        send(message) { 
             
            if (this.webSocket.readyState == WebSocket.OPEN) { 
                this.webSocket.send(message); 
                 
            } else { 
                console.error('webSocket is not open. readyState=' + this.webSocket.readyState); 
            } 
        } 
        disconnect() { 
            if (this.webSocket.readyState == WebSocket.OPEN) { 
                this.webSocket.close(); 
                 
            } else { 
                console.error('webSocket is not open. readyState=' + this.webSocket.readyState); 
            } 
        } 
    } 
	 
        var ClientZFService=null; 
	 
        function ConnectZFService(cbfonreceive ) 
	{ 
		ClientZFService = new WebSocketClient('ws', '127.0.0.1', 8080, ' ',cbfonreceive ,1); 
		ClientZFService.connect(); 
	} 
	 
	function SendDataZFService(data) 
	{	  	 
		ClientZFService.send(data);				 
	} 
		 
	function CloseConnectionZFService() 
	{ 
		ClientZFService.disconnect(); 
	} 
                 
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////	 
 
 
 
function zframeispostback() 
{ 
   var c =   document.getElementById( "___zframepostmethod");  
    if (c.value == 1) 
    { 
            return true; 
    } 
    
   return false; 
} 
 
function CheckCloseCustomGrid() 
{ 
 
        if (zframeispostback()) 
        { 
              
             var CloseCommandOnParent = window.parent.document.getElementById("close"); 
             if (CloseCommandOnParent != null ) 
             { 
                 CloseCommandOnParent.click(); 
             } 
             
        } 
 
} 

