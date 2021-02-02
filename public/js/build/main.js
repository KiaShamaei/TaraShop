function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

//ZFrame Java Script Engine 
var baseapplicationsrc = "http://172.30.21.39:8080/ZSHOP/";
var zfjavascriptversion = "1004";
var formhightinview = "90";
var selectcounter = parseInt("0");
var lookupcontrol = null;
var ProcessHightIF = 0;
var tcounter = 0;
var activeentergotonext = 0;
var __documentlocktab__ = false;
shortcut = {
  'all_shortcuts': {},
  //All the shortcuts are stored in this array 
  'add': function add(shortcut_combination, callback, opt) {
    //Provide a set of default options 
    var default_options = {
      'type': 'keydown',
      'propagate': false,
      'disable_in_input': false,
      'target': document,
      'keycode': false
    };
    if (!opt) opt = default_options;else {
      for (var dfo in default_options) {
        if (typeof opt[dfo] == 'undefined') opt[dfo] = default_options[dfo];
      }
    }
    var ele = opt.target;
    if (typeof opt.target == 'string') ele = document.getElementById(opt.target);
    var ths = this;
    shortcut_combination = shortcut_combination.toLowerCase(); //The function to be called at keypress 

    var func = function func(e) {
      e = e || window.event;

      if (opt['disable_in_input']) {
        //Don't enable shortcut keys in Input, Textarea fields 
        var element;
        if (e.target) element = e.target;else if (e.srcElement) element = e.srcElement;
        if (element.nodeType == 3) element = element.parentNode;
        if (element.tagName == 'INPUT' || element.tagName == 'TEXTAREA') return;
      } //Find Which key is pressed 


      if (e.keyCode) code = e.keyCode;else if (e.which) code = e.which;
      var character = String.fromCharCode(code).toLowerCase();
      if (code == 188) character = ","; //If the user presses , when the type is onkeydown 

      if (code == 190) character = "."; //If the user presses , when the type is onkeydown 

      var keys = shortcut_combination.split("+"); //Key Pressed - counts the number of valid keypresses - if it is same as the number of keys, the shortcut function is invoked 

      var kp = 0; //Work around for stupid Shift key bug created by using lowercase - as a result the shift+num combination was broken 

      var shift_nums = {
        "`": "~",
        "1": "!",
        "2": "@",
        "3": "#",
        "4": "$",
        "5": "%",
        "6": "^",
        "7": "&",
        "8": "*",
        "9": "(",
        "0": ")",
        "-": "_",
        "=": "+",
        ";": ":",
        "'": "\"",
        ",": "<",
        ".": ">",
        "/": "?",
        "\\": "|"
      }; //Special Keys - and their codes 

      var special_keys = {
        'esc': 27,
        'escape': 27,
        'tab': 9,
        'space': 32,
        'return': 13,
        'enter': 13,
        'backspace': 8,
        'scrolllock': 145,
        'scroll_lock': 145,
        'scroll': 145,
        'capslock': 20,
        'caps_lock': 20,
        'caps': 20,
        'numlock': 144,
        'num_lock': 144,
        'num': 144,
        'pause': 19,
        'break': 19,
        'insert': 45,
        'home': 36,
        'delete': 46,
        'end': 35,
        'pageup': 33,
        'page_up': 33,
        'pu': 33,
        'pagedown': 34,
        'page_down': 34,
        'pd': 34,
        'left': 37,
        'up': 38,
        'right': 39,
        'down': 40,
        'f1': 112,
        'f2': 113,
        'f3': 114,
        'f4': 115,
        'f5': 116,
        'f6': 117,
        'f7': 118,
        'f8': 119,
        'f9': 120,
        'f10': 121,
        'f11': 122,
        'f12': 123
      };
      var modifiers = {
        shift: {
          wanted: false,
          pressed: false
        },
        ctrl: {
          wanted: false,
          pressed: false
        },
        alt: {
          wanted: false,
          pressed: false
        },
        meta: {
          wanted: false,
          pressed: false
        } //Meta is Mac specific 

      };
      if (e.ctrlKey) modifiers.ctrl.pressed = true;
      if (e.shiftKey) modifiers.shift.pressed = true;
      if (e.altKey) modifiers.alt.pressed = true;
      if (e.metaKey) modifiers.meta.pressed = true;

      for (var i = 0; k = keys[i], i < keys.length; i++) {
        //Modifiers 
        if (k == 'ctrl' || k == 'control') {
          kp++;
          modifiers.ctrl.wanted = true;
        } else if (k == 'shift') {
          kp++;
          modifiers.shift.wanted = true;
        } else if (k == 'alt') {
          kp++;
          modifiers.alt.wanted = true;
        } else if (k == 'meta') {
          kp++;
          modifiers.meta.wanted = true;
        } else if (k.length > 1) {
          //If it is a special key 
          if (special_keys[k] == code) kp++;
        } else if (opt['keycode']) {
          if (opt['keycode'] == code) kp++;
        } else {
          //The special keys did not match 
          if (character == k) kp++;else {
            if (shift_nums[character] && e.shiftKey) {
              //Stupid Shift key bug created by using lowercase 
              character = shift_nums[character];
              if (character == k) kp++;
            }
          }
        }
      }

      if (kp == keys.length && modifiers.ctrl.pressed == modifiers.ctrl.wanted && modifiers.shift.pressed == modifiers.shift.wanted && modifiers.alt.pressed == modifiers.alt.wanted && modifiers.meta.pressed == modifiers.meta.wanted) {
        callback(e);

        if (!opt['propagate']) {
          //Stop the event 
          //e.cancelBubble is supported by IE - this will kill the bubbling process. 
          e.cancelBubble = true;
          e.returnValue = false; //e.stopPropagation works in Firefox. 

          if (e.stopPropagation) {
            e.stopPropagation();
            e.preventDefault();
          }

          return false;
        }
      }
    };

    this.all_shortcuts[shortcut_combination] = {
      'callback': func,
      'target': ele,
      'event': opt['type']
    }; //Attach the function with the event 

    if (ele.addEventListener) ele.addEventListener(opt['type'], func, false);else if (ele.attachEvent) ele.attachEvent('on' + opt['type'], func);else ele['on' + opt['type']] = func;
  },
  //Remove the shortcut - just specify the shortcut and I will remove the binding 
  'remove': function remove(shortcut_combination) {
    shortcut_combination = shortcut_combination.toLowerCase();
    var binding = this.all_shortcuts[shortcut_combination];
    delete this.all_shortcuts[shortcut_combination];
    if (!binding) return;
    var type = binding['event'];
    var ele = binding['target'];
    var callback = binding['callback'];
    if (ele.detachEvent) ele.detachEvent('on' + type, callback);else if (ele.removeEventListener) ele.removeEventListener(type, callback, false);else ele['on' + type] = false;
  }
};
$(document).keydown(function (e) {
  // Set self as the current item in focus 
  var self = $(':focus'),
      // Set the form by the current item in focus 
  form = self.parents('form:eq(0)'),
      focusable; // Array of Indexable/Tab-able items 

  focusable = form.find('input,a,select,button,textarea,div[contenteditable=true]').filter(':visible');

  function enterKey() {
    if (e.which === 13 && !self.is('textarea,div[contenteditable=true],.textboxFindBoxtable,.textboxSearchText')) {
      // [Enter] key 
      // If not a regular hyperlink/button/textarea 
      if ($.inArray(self, focusable) && !self.is('a,button')) {
        // Then prevent the default [Enter] key behaviour from submitting the form 
        e.preventDefault();
      } // Otherwise follow the link/button as by design, or put new line in textarea 
      // Focus on the next item (either previous or next depending on shift) 


      focusable.eq(focusable.index(self) + (e.shiftKey ? -1 : 1)).focus();
      return false;
    }
  } // We need to capture the [Shift] key and check the [Enter] key either way. 


  if (e.shiftKey) {
    enterKey();
  } else {
    enterKey();
  }
});

function ApplicationCheckVersion() {
  return _ApplicationCheckVersion.apply(this, arguments);
}

function _ApplicationCheckVersion() {
  _ApplicationCheckVersion = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    var localjavascriptversion, address, c, liveversion;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            localjavascriptversion = zfjavascriptversion;
            address = baseapplicationsrc + 'zfversioninfo';
            _context.next = 4;
            return RestApiCall(address, null, 1);

          case 4:
            c = _context.sent;
            liveversion = c[0].javascript;

            if (liveversion > localjavascriptversion) {
              window.location.reload(true);
            }

          case 7:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _ApplicationCheckVersion.apply(this, arguments);
}

function stopRKey(evt) {
  var evt = evt ? evt : event ? event : null;
  var node = evt.target ? evt.target : evt.srcElement ? evt.srcElement : null;

  if (evt.keyCode == 13 && node.type == "text") {
    return false;
  }
}

function loaddoc() {
  var outvalue = document.getElementById("___pagescrolvalue");

  if (outvalue != null) {
    v = outvalue.value;
    var objectscrool = document.getElementById("FormPanel");
    objectscrool.scrollTop = v;
  }
} //document.onkeypress = stopRKey; 


function loadpanelhightInStart() {
  try {
    var ObjectPanel = document.getElementById("MainDivTree");
    var HightV = screen.height - 210;
    var HV = "height:" + HightV.toString() + "px";
    ObjectPanel.setAttribute("style", HV.toString());
  } catch (e) {}

  try {
    var HightV = screen.height - 152;
    var HV = "height:" + HightV.toString() + "px;" + "width:100%;";
    ProcessHightIF = HV;
    var ObjectPanelMainIFRame = document.getElementById("FormViewer");
    ObjectPanelMainIFRame.setAttribute("style", HV.toString());
    var ObjectPanelMain = document.getElementById("maintab");
    ObjectPanelMain.setAttribute("style", HV.toString());
    document.getElementById('SCDIV').scrollTop = document.getElementById('scroll').value;
  } catch (ex) {}
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
  var objectid = formname + "P_Message";
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
  findspace.innerHTML += "<div id=\"findpanel\" class=\"ShowPanel\" ><div class=\"ShowPanelContenet\" style=\" height:" + formhightinview + "vh;width:90%;\" align=\"Center\"><Table dir=\"rtl\" style=\"width:100%;\" class=\"FromCaption\" ><tr> <td align=\"right\" ><input type=\"button\" id=\"close\"   class=\"closebutton\" onclick=\"CloseFindForm();\"><span class=\"Title\">     Find Form    </span><span class=\"Title\">" + title + "</span> &nbsp;&nbsp;&nbsp; <input type=\"button\" id=\"closeandapplay\" value=\"Accept   \"  style=\"width:150px;\"   onclick=\"CloseFindFormAndSubmit(" + formid + ");\"> </td></tr></table><iframe frameborder=\"0\" id=\"findiframe" + formid + "\"  src=\"" + baseapplicationsrc + "FindForm.bpm?ID=" + formid + "\" style=\"width:100%; height:" + formhightinview + "vh;background: #FFFFFF;\"> </iframe><Table id=\"submitformpanel\" dir=\"rtl\" style=\"width:100%;\" class=\"FindSubmit\" ><tr> <td align=\"Right\" ></td></tr></table></div></div>   ";
  HiddenNowSelected();
}

function FindFormP(formid, objectcontrol, title, p1, p2, p3) {
  lookupcontrol = objectcontrol;
  var findspace = document.getElementById("findobjectinOtherform");
  findspace.innerHTML = "";
  findspace.innerHTML += "<div id=\"findpanel\" class=\"ShowPanel\" ><div  class=\"ShowPanelContenet\" style=\" height:" + formhightinview + "vh;width:90%;\" align=\"Center\"><Table dir=\"rtl\" style=\"width:100%;\" class=\"FromCaption\" ><tr> <td align=\"right\" ><input type=\"button\" id=\"close\"   class=\"closebutton\" onclick=\"CloseFindForm();\"><span class=\"Title\">     Find Form    </span><span class=\"Title\">" + title + "</span> &nbsp;&nbsp;&nbsp; <input type=\"button\" id=\"closeandapplay\" value=\"Accept   \"  style=\"width:150px;\"   onclick=\"CloseFindFormAndSubmit(" + formid + ");\"> </td></tr></table><iframe frameborder=\"0\"  id=\"findiframe" + formid + "\"  src=\"" + baseapplicationsrc + "FindForm.bpm?ID=" + formid + "&KeyID=0&ZPPA1=" + p1 + "&ZPPA2=" + p2 + "&ZPPA3=" + p3 + "\" style=\"width:100%; height:" + formhightinview + "vh;background: #FFFFFF;\"> </iframe><Table id=\"submitformpanel\" dir=\"rtl\" style=\"width:100%;\" class=\"FindSubmit\" ><tr> <td align=\"Right\" ></td></tr></table></div></div>   ";
  HiddenNowSelected();
}

function FindFormvar(formid, objectcontrol, title) {
  lookupcontrol = objectcontrol;
  var p1, p2, p3;
  p1 = "0";
  p2 = "0";
  p3 = "0";
  var i;
  var Extentionparam = "";

  for (var _len = arguments.length, relatedcontrol = new Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {
    relatedcontrol[_key - 3] = arguments[_key];
  }

  for (i = 0; i < relatedcontrol.length; i++) {
    var C = document.getElementById(relatedcontrol[i]);
    var Valueofpassobject = C.value;

    if (i == 0) {
      p1 = Valueofpassobject;
    }

    if (i == 1) {
      p2 = Valueofpassobject;
    }

    if (i == 2) {
      p3 = Valueofpassobject;
    }
  }

  var findspace = document.getElementById("findobjectinOtherform");
  findspace.innerHTML = "";
  findspace.innerHTML += "<div id=\"findpanel\" class=\"ShowPanel\" ><div  class=\"ShowPanelContenet\" style=\" height:" + formhightinview + "vh;width:90%;\" align=\"Center\"><Table dir=\"rtl\" style=\"width:100%;\" class=\"FromCaption\" ><tr> <td align=\"right\" ><input type=\"button\" id=\"close\"   class=\"closebutton\" onclick=\"CloseFindForm();\"><span class=\"Title\">     Find Form    </span><span class=\"Title\">" + title + "</span> &nbsp;&nbsp;&nbsp; <input type=\"button\" id=\"closeandapplay\" value=\"Accept   \"  style=\"width:150px;\"   onclick=\"CloseFindFormAndSubmit(" + formid + ");\"> </td></tr></table><iframe frameborder=\"0\"  id=\"findiframe" + formid + "\"  src=\"" + baseapplicationsrc + "FindForm.bpm?ID=" + formid + "&KeyID=0&ZPPA1=" + p1 + "&ZPPA2=" + p2 + "&ZPPA3=" + p3 + "\" style=\"width:100%; height:" + formhightinview + "vh;background: #FFFFFF;\"> </iframe><Table id=\"submitformpanel\" dir=\"rtl\" style=\"width:100%;\" class=\"FindSubmit\" ><tr> <td align=\"Right\" ></td></tr></table></div></div>   ";
  HiddenNowSelected();
}

function FindFormLookupTable(formid, objectcontrol, title, SecondControl) {
  lookupcontrol = objectcontrol;
  var findspace = document.getElementById("findobjectinOtherform");
  findspace.innerHTML = "";
  findspace.innerHTML += "<div id=\"findpanel\" class=\"ShowPanel\" ><div class=\"ShowPanelContenet\" style=\" height:" + formhightinview + "vh;width:90%;\" align=\"Center\"><Table dir=\"rtl\" style=\"width:100%;\" class=\"FromCaption\" ><tr> <td align=\"right\" ><input type=\"button\" id=\"close\"   class=\"closebutton\" onclick=\"CloseFindForm();\"><span class=\"Title\">     Find Form    </span><span class=\"Title\">" + title + "</span> &nbsp;&nbsp;&nbsp; <input type=\"button\" id=\"closeandapplay\" value=\"Accept   \"  style=\"width:150px;\"   onclick=\"CloseFindFormAndSubmitLookUp(" + formid + ",'" + SecondControl + "');\"> </td></tr></table><iframe frameborder=\"0\" id=\"findiframe" + formid + "\"  src=\"" + baseapplicationsrc + "FindForm.bpm?ID=" + formid + "\" style=\"width:100%; height:" + formhightinview + "vh;background: #FFFFFF;\"> </iframe><Table id=\"submitformpanel\" dir=\"rtl\" style=\"width:100%;\" class=\"FindSubmit\" ><tr> <td align=\"Right\" ></td></tr></table></div></div>   ";
  HiddenNowSelected();
}

function FindFormLookupTableP(formid, objectcontrol, title, SecondControl, p1, p2, p3) {
  lookupcontrol = objectcontrol;
  var findspace = document.getElementById("findobjectinOtherform");
  findspace.innerHTML = "";
  findspace.innerHTML += "<div id=\"findpanel\" class=\"ShowPanel\" ><div class=\"ShowPanelContenet\" style=\" height:" + formhightinview + "vh;width:90%;\" align=\"Center\"><Table dir=\"rtl\" style=\"width:100%;\" class=\"FromCaption\" ><tr> <td align=\"right\" ><input type=\"button\" id=\"close\"   class=\"closebutton\" onclick=\"CloseFindForm();\"><span class=\"Title\">     Find Form    </span><span class=\"Title\">" + title + "</span> &nbsp;&nbsp;&nbsp; <input type=\"button\" id=\"closeandapplay\" value=\"Accept   \"  style=\"width:150px;\"   onclick=\"CloseFindFormAndSubmitLookUp(" + formid + ",'" + SecondControl + "');\"> </td></tr></table><iframe frameborder=\"0\" id=\"findiframe" + formid + "\"  src=\"" + baseapplicationsrc + "FindForm.bpm?ID=" + formid + "&KeyID=0&ZPPA1=" + p1 + "&ZPPA2=" + p2 + "&ZPPA3=" + p3 + "\" style=\"width:100%; height:" + formhightinview + "vh;background: #FFFFFF;\"> </iframe><Table id=\"submitformpanel\" dir=\"rtl\" style=\"width:100%;\" class=\"FindSubmit\" ><tr> <td align=\"Right\" ></td></tr></table></div></div>   ";
  HiddenNowSelected();
}

function FindFormLookupTablevar(formid, objectcontrol, title, SecondControl) {
  lookupcontrol = objectcontrol;
  var p1, p2, p3;
  p1 = "0";
  p2 = "0";
  p3 = "0";
  var i;
  var Extentionparam = "";

  for (var _len2 = arguments.length, relatedcontrol = new Array(_len2 > 4 ? _len2 - 4 : 0), _key2 = 4; _key2 < _len2; _key2++) {
    relatedcontrol[_key2 - 4] = arguments[_key2];
  }

  for (i = 0; i < relatedcontrol.length; i++) {
    var C = document.getElementById(relatedcontrol[i]);
    var Valueofpassobject = C.value;

    if (i == 0) {
      p1 = Valueofpassobject;
    }

    if (i == 1) {
      p2 = Valueofpassobject;
    }

    if (i == 2) {
      p3 = Valueofpassobject;
    }
  }

  var findspace = document.getElementById("findobjectinOtherform");
  findspace.innerHTML = "";
  findspace.innerHTML += "<div id=\"findpanel\" class=\"ShowPanel\" ><div class=\"ShowPanelContenet\" style=\" height:" + formhightinview + "vh;width:90%;\" align=\"Center\"><Table dir=\"rtl\" style=\"width:100%;\" class=\"FromCaption\" ><tr> <td align=\"right\" ><input type=\"button\" id=\"close\"   class=\"closebutton\" onclick=\"CloseFindForm();\"><span class=\"Title\">     Find Form    </span><span class=\"Title\">" + title + "</span> &nbsp;&nbsp;&nbsp; <input type=\"button\" id=\"closeandapplay\" value=\"Accept   \"  style=\"width:150px;\"   onclick=\"CloseFindFormAndSubmitLookUp(" + formid + ",'" + SecondControl + "');\"> </td></tr></table><iframe frameborder=\"0\" id=\"findiframe" + formid + "\"  src=\"" + baseapplicationsrc + "FindForm.bpm?ID=" + formid + "&KeyID=0&ZPPA1=" + p1 + "&ZPPA2=" + p2 + "&ZPPA3=" + p3 + "\" style=\"width:100%; height:" + formhightinview + "vh;background: #FFFFFF;\"> </iframe><Table id=\"submitformpanel\" dir=\"rtl\" style=\"width:100%;\" class=\"FindSubmit\" ><tr> <td align=\"Right\" ></td></tr></table></div></div>   ";
  HiddenNowSelected();
}

function ShowDialogForm(formid, recordvalue) {
  var findspace = document.getElementById("findobjectinOtherform");
  findspace.innerHTML = "";
  findspace.innerHTML += "<div id=\"findpanel\" class=\"ShowPanel\" ><div class=\"ShowPanelContenet\" style=\" height:" + formhightinview + "vh;width:90%;\" align=\"Center\"><Table dir=\"rtl\" style=\"width:100%;\" class=\"FromCaption\" ><tr> <td align=\"right\" ><input type=\"button\" id=\"close\"   class=\"closebutton\" onclick=\"CloseFindForm();\"><span class=\"Title\">        </span></td></tr></table><iframe frameborder=\"0\" id=\"findiframe" + formid + "\"  src=\"" + baseapplicationsrc + "ZBPMS.bpm?ID=" + formid + "&KeyID=" + recordvalue + "\" style=\"width:100%;  height:" + formhightinview + "vh;background: #FFFFFF;\"> </iframe></div></div>   ";
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
  try {//var NowApplayCmd = window.parent.document.getElementById("closeandapplay"); 
    //NowApplayCmd.disabled = true; 
  } catch (e) {}
}

function ShowNowSelected() {
  try {
    var NowApplayCmd = window.parent.document.getElementById("closeandapplay");
    NowApplayCmd.disabled = false;
  } catch (e) {}
}

function CloseFindForm() {
  var panel = document.getElementById("findpanel");
  panel.className = "hiddenPanel";
  ShowNowSelected();
}

function CloseFindFormAndSubmit(formidvalue) {
  var findpanel = document.getElementById("findpanel");
  var x = document.getElementById("findiframe" + formidvalue);
  var y = x.contentWindow || x.contentDocument;
  if (y.document) y = y.document;
  var doc = y;
  var RecordID = doc.getElementById('SelectRecordID').value;
  var RecordValue = doc.getElementById('SelectRecordValue').value;
  var lookupvalue = document.getElementById(lookupcontrol);
  var lookupText = document.getElementById(lookupcontrol + "txt");

  if (RecordID.trim().length != 0) {
    if (lookupText != null) {
      lookupText.value = RecordValue;
    }

    if (lookupvalue != null) {
      lookupvalue.value = RecordID;
    }

    findpanel.className = "hiddenPanel";
    ShowNowSelected();
    fixvalidatezframe(lookupText);
  } else {
    alert(" you m ust select record for search ");
  }
}

function CloseFindFormAndSubmitLookUp(formidvalue, SecondControl) {
  var findpanel = document.getElementById("findpanel");
  var x = document.getElementById("findiframe" + formidvalue);
  var y = x.contentWindow || x.contentDocument;
  if (y.document) y = y.document;
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
    e.key = ""; // just enter the char you want to send  

    e.keyCode = 13;
    e.which = e.keyCode;
    e.altKey = false;
    e.ctrlKey = true;
    e.shiftKey = false;
    e.metaKey = false;
    e.bubbles = true;
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
          str = str.substring(0, k) + delim + str.substring(k, str.length);
        }
      }
    }
  }

  textbox.value = str;
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

  try {
    ShowNowSelected();
  } catch (Ex) {}

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
      return;
    }
}

function autosearchcompletewithparameter(Rule, SYSID, SYSCONID, event, sender) {
  var keyCode = event.which;
  var KeyEVENT = event.keyCode;
  var i;
  var Extentionparam = "";

  for (var _len3 = arguments.length, relatedcontrol = new Array(_len3 > 5 ? _len3 - 5 : 0), _key3 = 5; _key3 < _len3; _key3++) {
    relatedcontrol[_key3 - 5] = arguments[_key3];
  }

  for (i = 0; i < relatedcontrol.length; i++) {
    var C = document.getElementById(relatedcontrol[i]);
    var Valueofpassobject = C.value;
    Extentionparam += "Param" + i.toString() + "=" + Valueofpassobject;

    if (i < relatedcontrol.length - 1) {
      Extentionparam += "&";
    }
  }

  if (Extentionparam.length > 0) {
    Extentionparam = "&" + Extentionparam;
  }

  if (KeyEVENT == 13) // enter  
    {
      var txtObject = document.getElementById(sender.toString());
      event.preventDefault();

      if (txtObject.value.toString().length > 1) {
        selectcounter = 0;
        var urlv = baseapplicationsrc + 'AutoSearch.ajx?R=0&SYS=' + SYSID.toString() + "&SYSCONTROL=" + SYSCONID.toString() + "&fillObject=" + sender.toString() + "&search=" + txtObject.value.toString() + Extentionparam;
        xmlHttp = new XMLHttpRequest();
        xmlHttp.open("GET", urlv, false);
        xmlHttp.send(null);
        var rt = xmlHttp.responseText;
        var dicname = "searchjob" + sender.toString();
        var divobject = document.getElementById(dicname);
        divobject.innerHTML = rt;
      }

      setObjectInText(selectcounter, sender, SYSCONID, 1);
      return;
    }
}

function pressautosearchcomplete(Rule, SYSID, SYSCONID, event, sender) {// function is empty dont change ..-> for barcode 
}

function pressautosearchcompletewithparameter(Rule, SYSID, SYSCONID, event, sender) {// function is empty dont change ..-> for barcode 
}

function autosearch(Rule, SYSID, SYSCONID, event, sender) {
  var txtObject = document.getElementById(sender.toString());
  var keyCode = event.which;
  var KeyEVENT = event.keyCode; // Event KeyCode ( KeyDown = 40 ) ( KeyUp =  38 ) 
  //alert('Event Code ='+event.keyCode ); 
  //alert('Event which ='+event.which ); 

  if (KeyEVENT == 13) {
    event.preventDefault();
    setObjectInText(selectcounter, sender, SYSCONID, 1);
    return;
  }

  if (keyCode != 0 && keyCode != 40 && keyCode != 13 && keyCode != 38) {
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
  } else {
    pressautosearch(Rule, SYSID, SYSCONID, event, sender);
  }

  return;
}

function autosearchwithparam(Rule, SYSID, SYSCONID, event, sender) {
  event.preventDefault();
  var txtObject = document.getElementById(sender.toString());
  var keyCode = event.which;
  var KeyEVENT = event.keyCode; // Event KeyCode ( KeyDown = 40 ) ( KeyUp =  38 ) 
  //alert('Event Code ='+event.keyCode ); 
  //alert('Event which ='+event.which ); 

  if (KeyEVENT == 13) {
    event.preventDefault();
    setObjectInText(selectcounter, sender, SYSCONID, 1);
    return false;
  }

  var i;
  var Extentionparam = "";

  for (var _len4 = arguments.length, relatedcontrol = new Array(_len4 > 5 ? _len4 - 5 : 0), _key4 = 5; _key4 < _len4; _key4++) {
    relatedcontrol[_key4 - 5] = arguments[_key4];
  }

  for (i = 0; i < relatedcontrol.length; i++) {
    var C = document.getElementById(relatedcontrol[i]);
    var Valueofpassobject = C.value;
    Extentionparam += "Param" + i.toString() + "=" + Valueofpassobject;

    if (i < relatedcontrol.length - 1) {
      Extentionparam += "&";
    }
  }

  if (Extentionparam.length > 0) {
    Extentionparam = "&" + Extentionparam;
  }

  if (keyCode != 0 && keyCode != 40 && keyCode != 13 && keyCode != 38) {
    if (txtObject.value.toString().length > 1) {
      selectcounter = 0;
      var urlv = baseapplicationsrc + 'AutoSearch.ajx?R=0&SYS=' + SYSID.toString() + "&SYSCONTROL=" + SYSCONID.toString() + "&fillObject=" + sender.toString() + "&search=" + txtObject.value.toString() + Extentionparam;
      xmlHttp = new XMLHttpRequest();
      xmlHttp.open("GET", urlv, false);
      xmlHttp.send(null);
      var rt = xmlHttp.responseText;
      var dicname = "searchjob" + sender.toString();
      var divobject = document.getElementById(dicname);
      divobject.innerHTML = rt;
      return;
    }
  } else {
    pressautosearch(Rule, SYSID, SYSCONID, event, sender);
  }

  return;
}

function pressautosearch(Rule, SYSID, SYSCONID, event, sender) {
  event.preventDefault();
  var txtObject = document.getElementById(sender.toString());
  var keyCode = event.which;
  var KeyEVENT = event.keyCode; // Event KeyCode ( KeyDown = 40 ) ( KeyUp =  38 ) 
  //alert('Event Code ='+event.keyCode ); 
  //alert('Event which ='+event.which ); 

  if (KeyEVENT == 40) {
    // KeyDown 
    selectcounter = selectcounter + 1;
    var nameh = "searchitem" + selectcounter.toString();
    var Objectexist = document.getElementById(nameh.toString());

    if (Objectexist == null) {
      selectcounter = selectcounter - 1;
    }

    setObjectInText(selectcounter, sender, SYSCONID, 0);
  }

  if (KeyEVENT == 38) {
    // KeyUp 
    if (selectcounter >= 0) {
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

function pressautosearchwithparam(Rule, SYSID, SYSCONID, event, sender) {
  var txtObject = document.getElementById(sender.toString());
  var keyCode = event.which;
  var KeyEVENT = event.keyCode; // Event KeyCode ( KeyDown = 40 ) ( KeyUp =  38 ) 
  //alert('Event Code ='+event.keyCode ); 
  //alert('Event which ='+event.which ); 

  var i;
  var Extentionparam = "";

  for (var _len5 = arguments.length, relatedcontrol = new Array(_len5 > 5 ? _len5 - 5 : 0), _key5 = 5; _key5 < _len5; _key5++) {
    relatedcontrol[_key5 - 5] = arguments[_key5];
  }

  for (i = 0; i < relatedcontrol.length; i++) {
    var C = document.getElementById(relatedcontrol[i]);
    var Valueofpassobject = C.value;
    Extentionparam += "Param" + i.toString() + "=" + Valueofpassobject;

    if (i < relatedcontrol.length - 1) {
      Extentionparam += "&";
    }
  }

  if (Extentionparam.length > 0) {
    Extentionparam = "&" + Extentionparam;
  }

  if (KeyEVENT == 13) {
    event.preventDefault();
    setObjectInText(selectcounter, sender, SYSCONID, 1);
    return;
  }

  if (KeyEVENT == 40) {
    // KeyDown 
    selectcounter = selectcounter + 1;
    var nameh = "searchitem" + selectcounter.toString();
    var Objectexist = document.getElementById(nameh.toString());

    if (Objectexist == null) {
      selectcounter = selectcounter - 1;
    }

    setObjectInText(selectcounter, sender, SYSCONID, 0);
  }

  if (KeyEVENT == 38) {
    // KeyUp 
    if (selectcounter >= 0) {
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

function hpress(event) {
  var keyCode = event.which;
  var KeyEVENT = event.keyCode;

  if (KeyEVENT == 13) {
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

  if (actionevent == 1) {
    items[indexid].click();
    return false;
  }

  return false;
}

function HiddenAll() {//    try { 
  //        var objectlist = document.getElementsByClassName("divsearch"); 
  //        for (var a = 0; a <= objectlist.length - 1; a++) 
  //        { 
  //            objectlist[a].style.visibility = "hidden"; 
  //        } 
  //    } catch (ex) { 
  //    } 
}

function SearchSearchItem(id, value, ControlName, divName) {
  try {
    var TextObject = document.getElementById(ControlName);

    if (TextObject == null) {
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
  } catch (ex) {}
}

function DeleteObjectInBinding(tr, deleteid, deletelistname, updatelistlistname) {
  var ValueAdd = "-" + deleteid.toString() + "-";
  var deletelistobject = document.getElementById(deletelistname);
  var updatelistobject = document.getElementById(updatelistlistname);
  var TextValue = deletelistobject.value; // remove from update      

  var UpdateTextValue = updatelistobject.value;
  updatelistobject.value = UpdateTextValue.replace(ValueAdd, "-");
  var trObject = document.getElementById(tr);

  if (TextValue.includes(ValueAdd)) {
    trObject.setAttribute("class", "BindngListExistItem");
    deletelistobject.value = TextValue.replace(ValueAdd, "-");
  } else {
    deletelistobject.value += ValueAdd;
    trObject.setAttribute("class", "BindngListDeleteItem");
  }
}

function UpdateObjectInBinding(tr, updateid, updatelistlistname, deletelistname) {
  var ValueAdd = "-" + updateid.toString() + "-";
  var updatelistobject = document.getElementById(updatelistlistname);
  var deletelistobject = document.getElementById(deletelistname);
  var TextValue = updatelistobject.value; // remove from delete list  

  var DeleteTextValue = deletelistobject.value;
  deletelistobject.value = DeleteTextValue.replace(ValueAdd, "-");
  var trObject = document.getElementById(tr);
  var fildsetobject = document.getElementById(tr + 'fs');

  if (TextValue.includes(ValueAdd)) {
    trObject.setAttribute("class", "BindngListExistItem");
    fildsetobject.disabled = true;
    updatelistobject.value = TextValue.replace(ValueAdd, "-");
  } else {
    updatelistobject.value += ValueAdd;
    trObject.setAttribute("class", "BindngListUpdateItem");
    fildsetobject.disabled = false;
  }
}

function TdUpdateObjectInBinding(tr, updateid, updatelistlistname, deletelistname) {
  var ValueAdd = "-" + updateid.toString() + "-";
  var updatelistobject = document.getElementById(updatelistlistname);
  var deletelistobject = document.getElementById(deletelistname);
  var TextValue = updatelistobject.value; // remove from delete list  

  var DeleteTextValue = deletelistobject.value;
  deletelistobject.value = DeleteTextValue.replace(ValueAdd, "-");
  var trObject = document.getElementById(tr);
  var fildsetobject = document.getElementById(tr + 'fs');

  if (!TextValue.includes(ValueAdd)) {
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

  if (eventArgument.toString().includes("Select")) {
    var objectselect = document.getElementById('P_ZBPMSKEYIDFORPASSING');
    objectselect.value = eventArgument;
  }

  objectform.submit();
}

function __doPostBackPageing(OT, OA, eventTarget, ObjectV) {
  var ValueText = ObjectV.value;
  ValueText = 'Page$' + ValueText;

  __doPostBack(OT, OA, eventTarget, ValueText);
}

function __doPostBackPageingSize(OT, OA, eventTarget, ObjectV) {
  var ValueText = ObjectV.value;
  ValueText = 'Size$' + ValueText;

  __doPostBack(OT, OA, eventTarget, ValueText);
}

function __doPostBackgrid(OT, OA, eventTarget, eventArgument, valueid, valuemane) {
  var object1 = document.getElementById(OT);
  object1.value = eventTarget;
  var object2 = document.getElementById(OA);
  object2.value = eventArgument;
  var objectform = document.getElementById('bpmform');

  if (eventArgument.toString().includes("Select")) {
    var objectselect = document.getElementById('P_ZBPMSKEYIDFORPASSING');
    objectselect.value = eventArgument;
    var RecordIDObject = document.getElementById('SelectRecordID');
    var RecordValueObject = document.getElementById('SelectRecordValue');
    RecordIDObject.value = valueid;
    RecordValueObject.value = valuemane;
    var txtv = document.getElementById(eventTarget);
    txtv.value = valueid;
  }

  try {
    var RC = OT.substring(13);
    RC = "__RecordID" + RC;
    var RCCONT = document.getElementById(RC);
    RCCONT.value = valueid;
  } catch (e) {}

  objectform.submit();
}

function __doPostBackgridControl(OT, OA, eventTarget, eventArgument, valueid, valuemane) {
  var object1 = document.getElementById(OT);
  object1.value = eventTarget;
  var object2 = document.getElementById(OA);
  object2.value = eventArgument;
  var objectform = document.getElementById('bpmform');

  if (eventArgument.toString().includes("Select")) {
    var RecordIDObject = document.getElementById('SelectRecordID');
    var RecordValueObject = document.getElementById('SelectRecordValue');
    RecordIDObject.value = valueid;
    RecordValueObject.value = valuemane;
    var txtv = document.getElementById(eventTarget);
    txtv.value = valueid;
  }

  try {
    var RC = OT.substring(13);
    RC = "__RecordID" + RC;
    var RCCONT = document.getElementById(RC);
    RCCONT.value = valueid;
  } catch (e) {}

  objectform.submit();
}

function __doPostBacktreeNode(OT, OA, eventTarget, eventArgument, valueid, valuemane, TreeName) {
  var ObjectTextView = document.getElementById("treeViewSearchInput" + TreeName);
  var ObjectID = document.getElementById(TreeName);

  if (ObjectTextView != null) {
    ObjectTextView.value = valuemane;
  }

  if (ObjectID != null) {
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

  if (ObjectTextView != null) {
    ObjectTextView.value = valuemane;
  }

  if (ObjectID != null) {
    ObjectID.value = valueid;
  }

  var object1 = document.getElementById(OT);
  object1.value = eventTarget;
  var object2 = document.getElementById(OA);
  object2.value = eventArgument;
  var objectform = document.getElementById('bpmform');

  if (eventArgument.toString().includes("Select")) {
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
  var Ifram = document.getElementById('FormViewer'); //Ifram.style.visibility='hidden'; 

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
  var Ifram = document.getElementById('FormViewer'); //  Ifram.style.visibility='hidden'; 

  var navigateaddress = NavigateAddressValue;
  Ifram.src = navigateaddress;
}

function ManageExpand(pimg, pdiv, IDV) {
  var img = document.getElementById(pimg);
  var div = document.getElementById(pdiv);

  if (div.style.display == "block") {
    div.style.display = "none";
    div.style.transition = "3s";
    img.src = "Images/Control/Plus.gif";

    try {
      var expandText = document.getElementById("___formtreeviewstatus");
      expandText.value = expandText.value.replace(IDV + ";", "");
    } catch (ex) {}
  } else {
    div.style.display = "block";
    div.style.transition = "3s";
    img.src = "Images/Control/Minus.gif";

    try {
      var expandText = document.getElementById("___formtreeviewstatus");
      expandText.value = expandText.value + IDV + ";";
    } catch (ex) {}
  }
}

function ShowDropDownTreeView(TreeID) {
  var div = document.getElementById(TreeID);

  if (div.style.display == "block") {
    div.style.display = "none";
  } else {
    div.style.display = "block";
  }
}

function LogutFromSystem() {
  if (dodeleteaction(" are you sure want to exit ")) {
    window.location.href = 'exit.jsp';
  }
}

function logoutFromSystemen() {
  if (dodeleteaction(" are you sure want to exit ")) {
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

  if (divobject.style.visibility == "visible") {
    divobject.style.visibility = "hidden";
    Button.innerHTML = " Enable Message ";
  } else {
    divobject.style.visibility = "visible";
    Button.innerHTML = " Disable Message ";
  }
}

function opentab(evt, tabname, maintabcname) {
  // Declare all variables 
  var i, tabcontent, tablinks; // Get all elements with class="tabcontent" and hide them 

  tabcontent = document.getElementsByClassName("tabcontent");

  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  } // Get all elements with class="tablinks" and remove the class "active" 


  tablinks = document.getElementsByClassName("tablinks");

  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  } // Show the current tab, and add an "active" class to the button that opened the tab 


  document.getElementById(tabname).style.display = "block";

  if (document.getElementById(maintabcname) != null) {
    document.getElementById(maintabcname).value = tabname;
  }

  evt.currentTarget.className += " active";
}

function opentabmain(tabname, maintabcname, senderobjecr) {
  // Declare all variables 
  var i, tabcontent, tablinks; // Get all elements with class="tabcontent" and hide them 

  tabcontent = document.getElementsByClassName("tabcontent");

  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  } // Get all elements with class="tablinks" and remove the class "active" 


  tablinks = document.getElementsByClassName("tablinks");

  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = "tablinksNormal";
    tabcontent[i].style.display = "none";
  } // Show the current tab, and add an "active" class to the button that opened the tab 


  document.getElementById(tabname).style.display = "block"; //document.getElementById(maintabcname).value = tabname; 

  document.getElementById(senderobjecr).className = "tablinks";

  try {
    //siavash  
    var h = senderobjecr;

    try {
      z_f_activetabid.value = h;
      var le = h.length;
      z_f_activetabcloseid.value = "cmdclose" + h.substring(3, le);
    } catch (e) {}
  } catch (e) {}
}

function showFormChildinContain(imgobjct, divobject, hobject) {
  var divV = document.getElementById(hobject);
  var divO = document.getElementById(divobject);
  var imgO = document.getElementById(imgobjct);

  if (divV.value == "1") {
    divV.value = "0";
    divO.style.display = "none";
    imgO.src = "Images/Control/expand.png";
  } else {
    divV.value = "1";
    divO.style.display = "block";
    imgO.src = "Images/Control/collapse.png";
  }
}

function CheckPriceText() {
  var items = document.getElementsByClassName("PriceText");

  for (var i = 0; i < items.length; ++i) {
    ToPriceChangeObj(items[i]);
  }

  loaddoc();
}

function moveup(obj) {
  var row = obj.parentNode.parentNode.parentNode;
  var idx = row.rowIndex;
  var rows = row.parentNode.rows;

  if (idx > 2) {
    var NowR = rows[idx].innerHTML;
    var Prv = rows[idx - 1].innerHTML;
    rows[idx - 1].innerHTML = NowR;
    rows[idx].innerHTML = Prv;
    rows[idx - 1].getElementsByClassName('InputText')[0].value = idx - 1;
    rows[idx].getElementsByClassName('InputText')[0].value = idx;
  }
}

function movedown(obj) {
  var row = obj.parentNode.parentNode.parentNode;
  var idx = row.rowIndex;
  var rows = row.parentNode.rows;

  if (rows.length > idx) {
    var NowR = rows[idx].innerHTML;
    var Next = rows[idx + 1].innerHTML;
    rows[idx + 1].innerHTML = NowR;
    rows[idx].innerHTML = Next;
    rows[idx + 1].getElementsByClassName('InputText')[0].value = idx + 1;
    rows[idx].getElementsByClassName('InputText')[0].value = idx;
  }
}

function openWindowsInNewTab(passformid, formname, formCaption) {
  tablinks = document.getElementsByClassName("tablinks");

  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = "tablinksNormal"; //tabcontent[i].style.display = "none"; 
  }

  var TabButton = document.getElementById('TBC');

  if (TabButton != null) {
    tcounter += 1;
    var IFName = "";

    if (tcounter > 0) {
      IFName = tcounter.toString();
    }

    var TabContainer = document.getElementById('TABCC');
    var CT = "";
    CT = "<input id=\"cmd" + formname + tcounter.toString() + "\" class=\"tablinks\" onclick=\"opentabmain( '" + formname + tcounter.toString() + "','SelectTabVfrmDesktop','cmd" + formname + tcounter.toString() + "')\" value=\"" + formCaption + "\" type=\"button\">";
    CT += "<input id=\"cmdclose" + formname + tcounter.toString() + "\"  class=\"tablinksclose\" title=\"بستن\"   onclick=\"CloseTabinMainForm('cmd" + formname + tcounter.toString() + "','cmdclose" + formname + tcounter.toString() + "','" + formname + tcounter.toString() + "')\" alt=\"بستن\"  value=\"X\" type=\"button\">&nbsp;";
    TabButton.innerHTML = CT + TabButton.innerHTML;
    var newElement = document.createElement("div");
    newElement.setAttribute('id', formname + tcounter.toString());
    newElement.setAttribute('name', formname + tcounter.toString());
    newElement.setAttribute('class', 'tabcontent');
    newElement.setAttribute('width', '100%');
    newElement.innerHTML = "<iframe frameborder=\"0\" id=\"FormViewer" + IFName.toString() + "\"  class=\"MainView\" src=\"ZBPMS.bpm?ID=" + passformid.toString() + "\"   runat=\"server\" style=\"width:100%;" + ProcessHightIF + ";\"> </iframe>";
    TabContainer.appendChild(newElement);
    opentabmain(formname + tcounter.toString(), 'SelectTabVfrmDesktop', "cmd" + formname + tcounter.toString());

    try {
      z_f_activetabid.value = "cmd" + formname + tcounter.toString();
      z_f_activetabcloseid.value = "cmdclose" + formname + tcounter.toString();
    } catch (e) {}
  } else {
    navigatebpm(passformid);
  }
}

function openmobile(passformid, formname, formCaption, control) {
  tablinks = document.getElementsByClassName("tablinks");

  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = "tablinksNormal"; //tabcontent[i].style.display = "none"; 
  }

  var TabButton = document.getElementById('TBC');

  if (TabButton != null) {
    tcounter += 1;
    var IFName = "";

    if (tcounter > 0) {
      IFName = tcounter.toString();
    }

    var TabContainer = document.getElementById('TABCC');
    var CT = "";
    CT = "<input id=\"cmd" + formname + tcounter.toString() + "\" class=\"tablinks\" onclick=\"opentabmain( '" + formname + tcounter.toString() + "','SelectTabVfrmDesktop','cmd" + formname + tcounter.toString() + "')\" value=\"" + formCaption + "\" type=\"button\">";
    CT += "<input id=\"cmdclose" + formname + tcounter.toString() + "\"  class=\"tablinksclose\" title=\"بستن\"   onclick=\"CloseTabinMainForm('cmd" + formname + tcounter.toString() + "','cmdclose" + formname + tcounter.toString() + "','" + formname + tcounter.toString() + "')\" alt=\"بستن\"  value=\"X\" type=\"button\">&nbsp;";
    TabButton.innerHTML = CT + TabButton.innerHTML;
    var newElement = document.createElement("div");
    newElement.setAttribute('id', formname + tcounter.toString());
    newElement.setAttribute('name', formname + tcounter.toString());
    newElement.setAttribute('class', 'tabcontent');
    newElement.setAttribute('width', '100%');
    newElement.innerHTML = "<iframe frameborder=\"0\" id=\"FormViewer" + IFName.toString() + "\"  class=\"MainView\" src=\"ZBPMS.bpm?ID=" + passformid.toString() + "\"   runat=\"server\" style=\"width:100%;" + ProcessHightIF + ";\"> </iframe>";
    TabContainer.appendChild(newElement);
    opentabmain(formname + tcounter.toString(), 'SelectTabVfrmDesktop', "cmd" + formname + tcounter.toString());

    try {
      z_f_activetabid.value = "cmd" + formname + tcounter.toString();
      z_f_activetabcloseid.value = "cmdclose" + formname + tcounter.toString();
    } catch (e) {}
  } else {
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

function openWindowsInNewTabNavigation(passformid, formname, formCaption, control) {
  if (__documentlocktab__) {
    openWindowsInNewTabNavigationlock(passformid, formname, formCaption, control);
    return;
  }

  tablinks = document.getElementsByClassName("tablinks");

  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = "tablinksNormal"; //tabcontent[i].style.display = "none"; 
  }

  var TabButton = document.getElementById('TBC');

  if (TabButton != null) {
    tcounter += 1;
    var IFName = "";

    if (tcounter > 0) {
      IFName = tcounter.toString();
    }

    var TabContainer = document.getElementById('TABCC');
    var CT = "";
    CT = "<input id=\"cmd" + formname + tcounter.toString() + "\" class=\"tablinks\" onclick=\"opentabmain( '" + formname + tcounter.toString() + "','SelectTabVfrmDesktop','cmd" + formname + tcounter.toString() + "')\" value=\"" + formCaption + "\" type=\"button\">";
    CT += "<input id=\"cmdclose" + formname + tcounter.toString() + "\"  class=\"tablinksclose\" title=\"بستن\"   onclick=\"CloseTabinMainForm('cmd" + formname + tcounter.toString() + "','cmdclose" + formname + tcounter.toString() + "','" + formname + tcounter.toString() + "')\" alt=\"بستن\"  value=\"X\" type=\"button\">&nbsp;";
    TabButton.innerHTML = CT + TabButton.innerHTML;
    var newElement = document.createElement("div");
    newElement.setAttribute('id', formname + tcounter.toString());
    newElement.setAttribute('name', formname + tcounter.toString());
    newElement.setAttribute('class', 'tabcontent');
    newElement.setAttribute('width', '100%');
    newElement.innerHTML = "<iframe frameborder=\"0\" id=\"FormViewer" + IFName.toString() + "\"  class=\"MainView\" src=\"ZBPMS.bpm?ID=" + passformid.toString() + "\"   runat=\"server\" style=\"width:100%;" + ProcessHightIF + ";\"> </iframe>";
    TabContainer.appendChild(newElement);
    opentabmain(formname + tcounter.toString(), 'SelectTabVfrmDesktop', "cmd" + formname + tcounter.toString());

    try {
      z_f_activetabid.value = "cmd" + formname + tcounter.toString();
      z_f_activetabcloseid.value = "cmdclose" + formname + tcounter.toString();
    } catch (e) {}
  } else {
    navigatebpm(passformid);
  }
}

function openWindowsInNewTabNavigationlock(passformid, formname, formCaption, control) {
  tablinks = document.getElementsByClassName("tablinks");

  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = "tablinksNormal"; //tabcontent[i].style.display = "none"; 
  }

  var TabButton = document.getElementById('TBC');

  if (TabButton != null) {
    var commandcontrolname = "cmd" + formname;
    var co = document.getElementById(commandcontrolname);

    if (co != null) {
      co.click();
      return;
    }

    var TabContainer = document.getElementById('TABCC');
    var CT = "";
    CT = "<input id=\"cmd" + formname + "\" class=\"tablinks\" onclick=\"opentabmain( '" + formname + "','SelectTabVfrmDesktop','cmd" + formname + "')\" value=\"" + formCaption + "\" type=\"button\">";
    CT += "<input id=\"cmdclose" + formname + "\"  class=\"tablinksclose\" title=\"بستن\"   onclick=\"CloseTabinMainFormLock('cmd" + formname + "','cmdclose" + formname + "','" + formname + "','" + passformid + "')\" alt=\"بستن\"  value=\"X\" type=\"button\">&nbsp;";
    TabButton.innerHTML = CT + TabButton.innerHTML;
    var newElement = document.createElement("div");
    newElement.setAttribute('id', formname);
    newElement.setAttribute('name', formname);
    newElement.setAttribute('class', 'tabcontent');
    newElement.setAttribute('ZFIDLOCK', passformid);
    newElement.setAttribute('width', '100%');
    newElement.innerHTML = "<iframe frameborder=\"0\" id=\"FormViewer" + commandcontrolname.toString() + "\"  class=\"MainView\" src=\"ZBPMS.bpm?ID=" + passformid.toString() + "\"   runat=\"server\" style=\"width:100%;" + ProcessHightIF + ";\"> </iframe>";
    TabContainer.appendChild(newElement);
    opentabmain(formname, 'SelectTabVfrmDesktop', "cmd" + formname);

    try {
      z_f_activetabid.value = "cmd" + formname;
      z_f_activetabcloseid.value = "cmdclose" + formname;
    } catch (e) {}
  } else {
    navigatebpm(passformid);
  }
}

function openWindowsInNewTabNavigationUrl(navigationurl, formname, formCaption, control) {
  var commandcontrolname = "cmd" + formname;
  var co = document.getElementById(commandcontrolname);

  if (co != null) {
    co.click();
    return;
  }

  tablinks = document.getElementsByClassName("tablinks");

  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = "tablinksNormal"; //tabcontent[i].style.display = "none"; 
  }

  var TabButton = document.getElementById('TBC');

  if (TabButton != null) {
    tcounter += 1;
    var IFName = "";

    if (tcounter > 0) {
      IFName = tcounter.toString();
    }

    var TabContainer = document.getElementById('TABCC');
    var CT = "";
    CT = "<input id=\"cmd" + formname + "\" class=\"tablinks\" onclick=\"opentabmain( '" + formname + "','SelectTabVfrmDesktop','cmd" + formname + "')\" value=\"" + formCaption + "\" type=\"button\">";
    CT += "<input id=\"cmdclose" + formname + "\"  class=\"tablinksclose\" title=\"بستن\"   onclick=\"CloseTabinMainForm('cmd" + formname + "','cmdclose" + formname + "','" + formname + "')\" alt=\"بستن\"  value=\"X\" type=\"button\">&nbsp;";
    TabButton.innerHTML = CT + TabButton.innerHTML;
    var newElement = document.createElement("div");
    newElement.setAttribute('id', formname);
    newElement.setAttribute('name', formname);
    newElement.setAttribute('class', 'tabcontent');
    newElement.setAttribute('width', '100%');
    newElement.innerHTML = "<iframe frameborder=\"0\" id=\"FormViewer" + IFName.toString() + "\"  class=\"MainView\" src=\"" + navigationurl + "\"   runat=\"server\" style=\"width:100%;" + ProcessHightIF + ";\"> </iframe>";
    TabContainer.appendChild(newElement);
    opentabmain(formname, 'SelectTabVfrmDesktop', "cmd" + formname);

    try {
      z_f_activetabid.value = "cmd" + formname;
      z_f_activetabcloseid.value = "cmdclose" + formname;
    } catch (e) {}
  } else {
    navigateAddress(navigationurl);
  }
}

function LoadlookupTable(Key, indexv, KeyCodeV, ObjectS) {
  if (KeyCodeV == 13) {
    var ObjectContenetname = ObjectS + indexv;
    var objectContenet = document.getElementById(ObjectContenetname);
    var Value = objectContenet.value;
    var i;
    var Extentionparam = "";

    for (var _len6 = arguments.length, relatedcontrol = new Array(_len6 > 4 ? _len6 - 4 : 0), _key6 = 4; _key6 < _len6; _key6++) {
      relatedcontrol[_key6 - 4] = arguments[_key6];
    }

    for (i = 0; i < relatedcontrol.length; i++) {
      var C = document.getElementById(relatedcontrol[i]);
      var Valueofpassobject = C.value;
      Extentionparam += "Param" + i.toString() + "=" + Valueofpassobject;

      if (i < relatedcontrol.length - 1) {
        Extentionparam += "&";
      }
    }

    if (Extentionparam.length > 0) {
      Extentionparam = "&" + Extentionparam;
    }

    if (Value.toString().length > 1) {
      selectcounter = 0;
      var urlv = baseapplicationsrc + 'AutoSearch.ajx?R=1&INDEX=' + indexv.toString() + "&SYSCONTROL=" + Key.toString() + "&fillObject=" + Value.toString() + "&search=1" + Extentionparam;
      xmlHttp = new XMLHttpRequest();
      xmlHttp.open("GET", urlv, false);
      xmlHttp.send(null);
      var rt = xmlHttp.responseText;

      if (rt.toString() == "null") {
        for (var a = 0; a < 10; a++) {
          try {
            if (a == 0) {
              var MAINOBJECTNAME = ObjectS;
              var KEYIDOBJECT = document.getElementById(MAINOBJECTNAME);
              KEYIDOBJECT.value = "";
            } else {
              var MAINOBJECTNAME = ObjectS + a;
              var KEYIDOBJECT = document.getElementById(MAINOBJECTNAME);
              KEYIDOBJECT.value = "";
            }
          } catch (e) {}
        }
      } else {
        var outdata = JSON.parse(rt);
        var counter = 0; // if you need it 

        var B = outdata[0];

        for (var key in B) {
          if (counter == 0) {
            var MAINOBJECTNAME = ObjectS;
            var KEYIDOBJECT = document.getElementById(MAINOBJECTNAME);
            KEYIDOBJECT.value = B[key];
          } else {
            var MAINOBJECTNAME = ObjectS + counter;
            var KEYIDOBJECT = document.getElementById(MAINOBJECTNAME);
            KEYIDOBJECT.value = B[key];
          }

          counter++;
        }
      } // rt is json Text  

    } else {
      for (var a = 0; a < 10; a++) {
        try {
          if (a == 0) {
            var MAINOBJECTNAME = ObjectS;
            var KEYIDOBJECT = document.getElementById(MAINOBJECTNAME);
            KEYIDOBJECT.value = "";
          } else {
            var MAINOBJECTNAME = ObjectS + a;
            var KEYIDOBJECT = document.getElementById(MAINOBJECTNAME);
            KEYIDOBJECT.value = "";
          }
        } catch (e) {}
      }
    }

    return false;
  }

  return false;
}

function CloseTabinMainForm(ButtonMain, ButtonClose, DivAddd) {
  var element1 = document.getElementById(ButtonMain);
  element1.parentNode.removeChild(element1);
  var element2 = document.getElementById(ButtonClose);
  element2.parentNode.removeChild(element2);
  var element3 = document.getElementById(DivAddd);
  element3.parentNode.removeChild(element3);
}

function CloseTabinMainFormLock(_x, _x2, _x3, _x4) {
  return _CloseTabinMainFormLock.apply(this, arguments);
}

function _CloseTabinMainFormLock() {
  _CloseTabinMainFormLock = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(ButtonMain, ButtonClose, DivAddd, formid) {
    var element1, element2, element3;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            RemoveConcurrencyForm(formid);
            element1 = document.getElementById(ButtonMain);
            element1.parentNode.removeChild(element1);
            element2 = document.getElementById(ButtonClose);
            element2.parentNode.removeChild(element2);
            element3 = document.getElementById(DivAddd);
            element3.parentNode.removeChild(element3);

          case 7:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _CloseTabinMainFormLock.apply(this, arguments);
}

function RemoveConcurrencyForm(_x5) {
  return _RemoveConcurrencyForm.apply(this, arguments);
}

function _RemoveConcurrencyForm() {
  _RemoveConcurrencyForm = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(formid) {
    var param, s;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            param = [];
            param.push({
              name: 'ID',
              value: formid
            });
            _context3.next = 4;
            return callAjax('free.rcc', param, 1);

          case 4:
            s = _context3.sent;

          case 5:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));
  return _RemoveConcurrencyForm.apply(this, arguments);
}

function BindingFormNavigatePage(Childdiv, maindiv, senderbutton, pagenumber, pagesaver) {
  document.getElementById(pagesaver).value = pagenumber;
  var a = document.getElementById(maindiv);
  var Alldiv = a.getElementsByClassName("childslide");

  for (var i = 0; i < Alldiv.length; ++i) {
    Alldiv[i].style.display = 'none';
  }

  document.getElementById(Childdiv).style.display = 'block';
}

function RestApiCall_nfx(_x6, _x7, _x8, _x9) {
  return _RestApiCall_nfx.apply(this, arguments);
}

function _RestApiCall_nfx() {
  _RestApiCall_nfx = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(address, param, method, fn) {
    var isok, outdata, fullAddress, xhr, url;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            isok = false;

            if (method == 1) {
              // get  
              // create in url  
              fullAddress = address;

              if (fullAddress.trim().length > 0) {
                xhr = new XMLHttpRequest();
                url = fullAddress;

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
            } else {
              fullAddress = address;
              xhr = new XMLHttpRequest();
              url = fullAddress;
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

          case 2:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));
  return _RestApiCall_nfx.apply(this, arguments);
}

function RestApiCall(_x10, _x11, _x12) {
  return _RestApiCall.apply(this, arguments);
}

function _RestApiCall() {
  _RestApiCall = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(address, param, method) {
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            return _context5.abrupt("return", new Promise(function (resolve) {
              RestApiCall_nfx(address, param, method, resolve);
            }));

          case 1:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));
  return _RestApiCall.apply(this, arguments);
}

function NativecallZf_jslib_nfx(_x13, _x14, _x15, _x16) {
  return _NativecallZf_jslib_nfx.apply(this, arguments);
}

function _NativecallZf_jslib_nfx() {
  _NativecallZf_jslib_nfx = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(address, param, method, fn) {
    var isok, outdata, fullAddress, i, xhr, url, data;
    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            isok = false;

            if (method == 1) {
              // get  
              // create in url  
              fullAddress = address;

              if (param != null) {
                if (param.length > 0) {
                  fullAddress += "?";
                }
              }

              for (i = 0; i < param.length; i++) {
                fullAddress += param[i].name + '=' + param[i].value;

                if (i != param.length - 1) {
                  fullAddress + "&";
                }
              } //return fullAddress;	 


              if (fullAddress.trim().length > 0) {
                xhr = new XMLHttpRequest();
                url = fullAddress;

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
            } else {
              fullAddress = address;
              xhr = new XMLHttpRequest();
              url = fullAddress;
              xhr.open("POST", url, true);
              xhr.setRequestHeader("Content-type", "application/json");

              xhr.onreadystatechange = function () {
                if (xhr.readyState === 4 && xhr.status === 200) {
                  var outdata = JSON.parse(xhr.responseText);
                  fn(outdata);
                }
              };

              if (param.length > 0) {
                data = "{";

                for (i = 0; i < param.length; i++) {
                  data += '"' + param[i].name + '"' + ':' + '"' + param[i].value + '"';

                  if (i != param.length - 1) {
                    fullAddress + ",";
                  }
                }

                data += "}";
                xhr.send(data);
              } else {
                xhr.send(null);
              }
            }

          case 2:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  }));
  return _NativecallZf_jslib_nfx.apply(this, arguments);
}

function nativecallZf_jslib(_x17, _x18, _x19) {
  return _nativecallZf_jslib.apply(this, arguments);
}

function _nativecallZf_jslib() {
  _nativecallZf_jslib = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(address, param, method) {
    return regeneratorRuntime.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            return _context7.abrupt("return", new Promise(function (resolve) {
              NativecallZf_jslib_nfx(address, param, method, resolve);
            }));

          case 1:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7);
  }));
  return _nativecallZf_jslib.apply(this, arguments);
}

function TranslateText(_x20, _x21) {
  return _TranslateText.apply(this, arguments);
}

function _TranslateText() {
  _TranslateText = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(languageid, translattext) {
    var param, TrPage;
    return regeneratorRuntime.wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            param = [];
            param.push({
              name: 'LANGUAGE_ID',
              value: languageid
            });
            param.push({
              name: 'OBJECT_TEXT',
              value: translattext
            });
            TrPage = baseapplicationsrc + 'zfdic.jsp';
            return _context8.abrupt("return", new Promise(function (resolve) {
              NativecallZf_jslib_nfx(TrPage, param, 2, resolve);
            }));

          case 5:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8);
  }));
  return _TranslateText.apply(this, arguments);
}

function callZf_jslib_n(_x22, _x23, _x24, _x25, _x26) {
  return _callZf_jslib_n.apply(this, arguments);
}

function _callZf_jslib_n() {
  _callZf_jslib_n = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9(address, funcname, param, method, fn) {
    var isok, outdata, fullAddress, i, xhr, url, data;
    return regeneratorRuntime.wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            isok = false;

            if (method == 1) {
              // get  
              // create in url  
              fullAddress = baseapplicationsrc + address + funcname + '.zjs';

              if (param != null) {
                if (param.length > 0) {
                  fullAddress += "?";
                }
              }

              for (i = 0; i < param.length; i++) {
                fullAddress += param[i].name + '=' + param[i].value;

                if (i != param.length - 1) {
                  fullAddress + "&";
                }
              } //return fullAddress;	 


              if (fullAddress.trim().length > 0) {
                xhr = new XMLHttpRequest();
                url = fullAddress;

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
            } else {
              fullAddress = baseapplicationsrc + address + funcname + '.zjs';
              xhr = new XMLHttpRequest();
              url = fullAddress;
              xhr.open("POST", url, true);
              xhr.setRequestHeader("Content-type", "application/json");

              xhr.onreadystatechange = function () {
                if (xhr.readyState === 4 && xhr.status === 200) {
                  var outdata = JSON.parse(xhr.responseText);
                  fn(outdata);
                }
              };

              if (param.length > 0) {
                data = "{";

                for (i = 0; i < param.length; i++) {
                  data += '"' + param[i].name + '"' + ':' + '"' + param[i].value + '"';

                  if (i != param.length - 1) {
                    fullAddress + ",";
                  }
                }

                data += "}";
                xhr.send(data);
              } else {
                xhr.send(null);
              }
            }

          case 2:
          case "end":
            return _context9.stop();
        }
      }
    }, _callee9);
  }));
  return _callZf_jslib_n.apply(this, arguments);
}

function callZf_jslib(_x27, _x28, _x29, _x30) {
  return _callZf_jslib.apply(this, arguments);
}

function _callZf_jslib() {
  _callZf_jslib = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee10(address, funcname, param, method) {
    return regeneratorRuntime.wrap(function _callee10$(_context10) {
      while (1) {
        switch (_context10.prev = _context10.next) {
          case 0:
            return _context10.abrupt("return", new Promise(function (resolve) {
              callZf_jslib_n(address, funcname, param, method, resolve);
            }));

          case 1:
          case "end":
            return _context10.stop();
        }
      }
    }, _callee10);
  }));
  return _callZf_jslib.apply(this, arguments);
}

function NativecallZf_jslib_nfxfile(_x31, _x32, _x33, _x34) {
  return _NativecallZf_jslib_nfxfile.apply(this, arguments);
}

function _NativecallZf_jslib_nfxfile() {
  _NativecallZf_jslib_nfxfile = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee11(address, param, method, fn) {
    var isok, outdata, fullAddress, i, xhr, url, data;
    return regeneratorRuntime.wrap(function _callee11$(_context11) {
      while (1) {
        switch (_context11.prev = _context11.next) {
          case 0:
            isok = false;

            if (method == 1) {
              // get  
              // create in url  
              fullAddress = address;

              if (param != null) {
                if (param.length > 0) {
                  fullAddress += "?";
                }
              }

              for (i = 0; i < param.length; i++) {
                fullAddress += param[i].name + '=' + param[i].value;

                if (i != param.length - 1) {
                  fullAddress + "&";
                }
              } //return fullAddress;	 


              if (fullAddress.trim().length > 0) {
                xhr = new XMLHttpRequest();
                xhr.responseType = 'blob';
                url = fullAddress;

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
            } else {
              fullAddress = address;
              xhr = new XMLHttpRequest();
              url = fullAddress;
              xhr.open("POST", url, true);
              xhr.responseType = 'blob';
              xhr.setRequestHeader("Content-type", "application/json");

              xhr.onreadystatechange = function () {
                if (xhr.readyState === 4 && xhr.status === 200) {
                  var outdata = xhr.response;
                  fn(outdata);
                }
              };

              if (param.length > 0) {
                data = "{";

                for (i = 0; i < param.length; i++) {
                  data += '"' + param[i].name + '"' + ':' + '"' + param[i].value + '"';

                  if (i != param.length - 1) {
                    fullAddress + ",";
                  }
                }

                data += "}";
                xhr.send(data);
              } else {
                xhr.send(null);
              }
            }

          case 2:
          case "end":
            return _context11.stop();
        }
      }
    }, _callee11);
  }));
  return _NativecallZf_jslib_nfxfile.apply(this, arguments);
}

function nativecallZf_jslib_file(_x35, _x36, _x37) {
  return _nativecallZf_jslib_file.apply(this, arguments);
}

function _nativecallZf_jslib_file() {
  _nativecallZf_jslib_file = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee12(address, param, method) {
    return regeneratorRuntime.wrap(function _callee12$(_context12) {
      while (1) {
        switch (_context12.prev = _context12.next) {
          case 0:
            return _context12.abrupt("return", new Promise(function (resolve) {
              NativecallZf_jslib_nfxfile(address, param, method, resolve);
            }));

          case 1:
          case "end":
            return _context12.stop();
        }
      }
    }, _callee12);
  }));
  return _nativecallZf_jslib_file.apply(this, arguments);
}

function testcall() {
  return _testcall.apply(this, arguments);
}

function _testcall() {
  _testcall = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee13() {
    var param, s;
    return regeneratorRuntime.wrap(function _callee13$(_context13) {
      while (1) {
        switch (_context13.prev = _context13.next) {
          case 0:
            param = [];
            param.push({
              name: 'parties_entities_id',
              value: '8'
            });
            _context13.next = 4;
            return callZf_jslib('yourpath/fx/', 'fxname', param, 2);

          case 4:
            s = _context13.sent;
            alert(s[0].PARTIES_ENTITIES_NAME);

          case 6:
          case "end":
            return _context13.stop();
        }
      }
    }, _callee13);
  }));
  return _testcall.apply(this, arguments);
}

function fixvalidatezframe(o) {
  if (o.willValidate) {
    o.setCustomValidity('');
  }
}

function showfilterpanelcombo(p) {
  var maint = document.getElementById(p);
  var childrendiv = maint.getElementsByTagName('div');
  var div;

  for (var i = 0; i < childrendiv.length; i++) {
    if (childrendiv[i].getAttribute('id') == 'myDropdown') {
      div = childrendiv[i];
    }
  }

  div.classList.toggle("show");
}

function filterFunction(p) {
  var maint = document.getElementById(p);
  var childrentxt = maint.getElementsByTagName('input');
  var input, filter, ul, li, a, i, div;

  for (var i = 0; i < childrentxt.length; i++) {
    if (childrentxt[i].getAttribute('id') == 'myInput') {
      input = childrentxt[i];
    }
  }

  var childrendiv = maint.getElementsByTagName('div');

  for (var i = 0; i < childrendiv.length; i++) {
    if (childrendiv[i].getAttribute('id') == 'myDropdown') {
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

  if (root.hasAttribute(attr) && root.getAttribute(attr) == value) {
    return root;
  }

  var children = root.children,
      element;

  for (var i = children.length; i--;) {
    element = getElementByAttribute(attr, value, children[i]);

    if (element) {
      return element;
    }
  }

  return null;
}

function GetControlByName(value) {
  return getElementByAttribute('zid', value, null);
}

function GetRequiredControlListCaption() {
  var arr = [];
  var form = document.getElementById('bpmform');
  var c = 0;
  var returnString = "";

  for (var i = 0; i < form.elements.length; i++) {
    if (form.elements[i].value === '' && form.elements[i].hasAttribute('required')) {
      arr[c] = form.elements[i].getAttribute('zcp');
      c++;
    }
  }

  return arr;
}

function GetRequiredControlListID() {
  var arr = [];
  var form = document.getElementById('bpmform');
  var c = 0;
  var returnString = "";

  for (var i = 0; i < form.elements.length; i++) {
    if (form.elements[i].value === '' && form.elements[i].hasAttribute('required')) {
      arr[c] = form.elements[i].getAttribute('zid');
      c++;
    }
  }

  return arr;
}

function GetUrlParamter(name) {
  var url_string = window.location.href;
  var url = new URL(url_string);
  var c = url.searchParams.get(name);
  return c;
}

function GetUrlParameter(name) {
  var url_string = window.location.href;
  var url = new URL(url_string);
  var c = url.searchParams.get(name);
  return c;
}

function CloseActiveTab() {
  var PFCCCID = parent.document.getElementById('z_f_activetabcloseid');
  var CID = PFCCCID.value;
  var a = parent.document.getElementById(CID);
  a.click();
}

function CheckBoxCheckDo(isChecked, ctrlname) {
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

function powerfloatc(value1, value2, distination) {
  try {
    distination.value = value1 * value2;
  } catch (e) {
    distination.value = 0;
  }
}

function ZfAction_lib(_x38, _x39, _x40, _x41) {
  return _ZfAction_lib.apply(this, arguments);
}

function _ZfAction_lib() {
  _ZfAction_lib = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee14(formid, method, param, fn) {
    var isok, outdata, fullAddress, xhr, url, data, i;
    return regeneratorRuntime.wrap(function _callee14$(_context14) {
      while (1) {
        switch (_context14.prev = _context14.next) {
          case 0:
            isok = false;
            fullAddress = baseapplicationsrc + 'zfrestlib/restobject/' + formid + '/' + method + '.zor';
            xhr = new XMLHttpRequest();
            url = fullAddress;
            xhr.open("POST", url, true);
            xhr.setRequestHeader("Content-type", "application/json");

            xhr.onreadystatechange = function () {
              if (xhr.readyState === 4 && xhr.status === 200) {
                var outdata = JSON.parse(xhr.responseText);
                fn(outdata);
              }
            };

            if (param.length > 0) {
              data = "{";

              for (i = 0; i < param.length; i++) {
                data += '"' + param[i].name + '"' + ':' + '"' + param[i].value + '"';

                if (i != param.length - 1) {
                  fullAddress + ",";
                }
              }

              data += "}";
              xhr.send(data);
            } else {
              xhr.send(null);
            }

          case 8:
          case "end":
            return _context14.stop();
        }
      }
    }, _callee14);
  }));
  return _ZfAction_lib.apply(this, arguments);
}

function ZfAction(_x42, _x43, _x44) {
  return _ZfAction.apply(this, arguments);
}

function _ZfAction() {
  _ZfAction = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee15(formid, method, param) {
    return regeneratorRuntime.wrap(function _callee15$(_context15) {
      while (1) {
        switch (_context15.prev = _context15.next) {
          case 0:
            return _context15.abrupt("return", new Promise(function (resolve) {
              ZfAction_lib(formid, method, param, resolve);
            }));

          case 1:
          case "end":
            return _context15.stop();
        }
      }
    }, _callee15);
  }));
  return _ZfAction.apply(this, arguments);
}

function disable_all_control_in(obj) {
  try {
    for (var i = 0; i < obj.childNodes.length; i++) {
      if (obj.childNodes[i].tagName == "INPUT" || obj.childNodes[i].tagName == "SELECT") {
        obj.childNodes[i].disabled = true;
        obj.childNodes[i].readOnly = true;
      } else {
        var h = obj.childNodes[i];
        disable_all_control_in(h);
      }
    }
  } catch (e) {}
}

function enable_all_control_in(obj) {
  try {
    for (var i = 0; i < obj.childNodes.length; i++) {
      if (obj.childNodes[i].tagName == "INPUT" || obj.childNodes[i].tagName == "SELECT") {
        obj.childNodes[i].disabled = false;
        obj.childNodes[i].readOnly = false;
      } else {
        var h = obj.childNodes[i];
        enable_all_control_in(h);
      }
    }
  } catch (e) {}
}

function disable_all_control_in_binding(obj) {
  try {
    for (var i = 0; i < obj.childNodes.length; i++) {
      if (obj.childNodes[i].tagName == "INPUT" || obj.childNodes[i].tagName == "SELECT") {
        if (obj.childNodes[i]["class"] != "DeleteButton" && obj.childNodes[i]["class"] != "updateButton") {
          obj.childNodes[i].readOnly = true;
        }
      } else {
        var h = obj.childNodes[i];
        disable_all_control_in_binding(h);
      }
    }
  } catch (e) {}
}

function enable_all_control_in_binding(obj) {
  try {
    for (var i = 0; i < obj.childNodes.length; i++) {
      if (obj.childNodes[i].tagName == "INPUT" || obj.childNodes[i].tagName == "SELECT") {
        if (obj.childNodes[i]["class"] != "DeleteButton" && obj.childNodes[i]["class"] != "updateButton") {
          obj.childNodes[i].readOnly = false;
        }
      } else {
        var h = obj.childNodes[i];
        enable_all_control_in_binding(h);
      }
    }
  } catch (e) {}
}

function disable_all_control() {
  var obj = document.forms[0].elements;

  for (i = 0; i < obj.length; i++) {
    if (obj[i].tagName == "INPUT" || obj[i].tagName == "SELECT") {
      obj[i].disabled = true;
    }
  }

  var panel = document.getElementById('ControlPanel');
  panel.style.visibility = 'hidden';
}

function enable_all_control() {
  var obj = document.forms[0].elements;

  for (i = 0; i < obj.length; i++) {
    if (obj[i].tagName == "INPUT" || obj[i].tagName == "SELECT") {
      obj[i].disabled = false;
    }
  }

  var panel = document.getElementById('ControlPanel');
  panel.style.visibility = 'visible';
}

function DosearchGrid(searchC, KeyCodeV) {
  if (KeyCodeV == 13) {
    var cmdsearch = document.getElementById(searchC);
    cmdsearch.click();
  }
}

function callAjax_l(_x45, _x46, _x47, _x48) {
  return _callAjax_l.apply(this, arguments);
}

function _callAjax_l() {
  _callAjax_l = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee16(address, param, method, fn) {
    var isok, outdata, fullAddress, i, xhr, url, data;
    return regeneratorRuntime.wrap(function _callee16$(_context16) {
      while (1) {
        switch (_context16.prev = _context16.next) {
          case 0:
            isok = false;

            if (method == 1) {
              // get  
              // create in url  
              fullAddress = baseapplicationsrc + address;

              if (param != null) {
                if (param.length > 0) {
                  fullAddress += "?";
                }
              }

              for (i = 0; i < param.length; i++) {
                fullAddress += param[i].name + '=' + param[i].value;

                if (i != param.length - 1) {
                  fullAddress + "&";
                }
              } //return fullAddress;				                     	  


              if (fullAddress.trim().length > 0) {
                xhr = new XMLHttpRequest();
                url = fullAddress;

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
            } else {
              fullAddress = baseapplicationsrc + address;
              xhr = new XMLHttpRequest();
              url = fullAddress;
              xhr.open("POST", url, true);
              xhr.setRequestHeader("Content-type", "application/json");

              xhr.onreadystatechange = function () {
                if (xhr.readyState === 4 && xhr.status === 200) {
                  var outdata = JSON.parse(xhr.responseText);
                  fn(outdata);
                }
              };

              if (param.length > 0) {
                data = "{";

                for (i = 0; i < param.length; i++) {
                  data += '"' + param[i].name + '"' + ':' + '"' + param[i].value + '"';

                  if (i != param.length - 1) {
                    fullAddress + ",";
                  }
                }

                data += "}";
                xhr.send(data);
              } else {
                xhr.send(null);
              }
            }

          case 2:
          case "end":
            return _context16.stop();
        }
      }
    }, _callee16);
  }));
  return _callAjax_l.apply(this, arguments);
}

function callAjax(_x49, _x50, _x51) {
  return _callAjax.apply(this, arguments);
}

function _callAjax() {
  _callAjax = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee17(address, param, method) {
    return regeneratorRuntime.wrap(function _callee17$(_context17) {
      while (1) {
        switch (_context17.prev = _context17.next) {
          case 0:
            return _context17.abrupt("return", new Promise(function (resolve) {
              callAjax_l(address, param, method, resolve);
            }));

          case 1:
          case "end":
            return _context17.stop();
        }
      }
    }, _callee17);
  }));
  return _callAjax.apply(this, arguments);
}

function unloadmainformchecking() {
  return _unloadmainformchecking.apply(this, arguments);
}

function _unloadmainformchecking() {
  _unloadmainformchecking = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee18() {
    var elementlist, i, nf;
    return regeneratorRuntime.wrap(function _callee18$(_context18) {
      while (1) {
        switch (_context18.prev = _context18.next) {
          case 0:
            elementlist = document.getElementsByClassName("tabcontent");

            for (i = elementlist.length; i--;) {
              if (elementlist[i].hasAttribute('zfidlock')) {
                nf = elementlist[i].getAttribute('zfidlock');
                RemoveConcurrencyForm(nf);
              }
            }

          case 2:
          case "end":
            return _context18.stop();
        }
      }
    }, _callee18);
  }));
  return _unloadmainformchecking.apply(this, arguments);
}

function searchtextclear(idc) {
  var textvalue = idc + 'txt';
  var textbixc = document.getElementById(textvalue);

  if (textbixc.value.trim().length == 0) {
    var hidtext = document.getElementById(idc);
    hidtext.value = "";
  }
}

function replaceAll(str, find, replace) {
  return str.replace(new RegExp(find, 'g'), replace);
}

function autocompletefx(_x52, _x53, _x54, _x55) {
  return _autocompletefx.apply(this, arguments);
}

function _autocompletefx() {
  _autocompletefx = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee20(inp, control_id, Control, hidvalue) {
    var _len7,
        relatedcontrol,
        _key7,
        currentFocus,
        cc,
        addActive,
        removeActive,
        closeAllLists,
        _args20 = arguments;

    return regeneratorRuntime.wrap(function _callee20$(_context20) {
      while (1) {
        switch (_context20.prev = _context20.next) {
          case 0:
            closeAllLists = function _closeAllLists(elmnt) {
              /*close all autocomplete lists in the document, 
              except the one passed as an argument:*/
              var x = document.getElementsByClassName("autocomplete-items");

              for (var i = 0; i < x.length; i++) {
                if (elmnt != x[i] && elmnt != inp) {
                  x[i].parentNode.removeChild(x[i]);
                }
              }

              if (inp.value.trim().length == 0) {
                cc.value = "0";
              }
            };

            removeActive = function _removeActive(x) {
              /*a function to remove the "active" class from all autocomplete items:*/
              for (var i = 0; i < x.length; i++) {
                x[i].classList.remove("autocomplete-active");
              }
            };

            addActive = function _addActive(x) {
              /*a function to classify an item as "active":*/
              if (!x) return false;
              /*start by removing the "active" class on all items:*/

              removeActive(x);
              if (currentFocus >= x.length) currentFocus = 0;
              if (currentFocus < 0) currentFocus = x.length - 1;
              /*add class "autocomplete-active":*/

              x[currentFocus].classList.add("autocomplete-active");
            };

            for (_len7 = _args20.length, relatedcontrol = new Array(_len7 > 4 ? _len7 - 4 : 0), _key7 = 4; _key7 < _len7; _key7++) {
              relatedcontrol[_key7 - 4] = _args20[_key7];
            }

            cc = document.getElementById(hidvalue);
            /*execute a function when someone writes in the text field:*/

            inp.addEventListener("input", /*#__PURE__*/function () {
              var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee19(e) {
                var a, b, i, val, arr, keys, Key_Id, key_value;
                return regeneratorRuntime.wrap(function _callee19$(_context19) {
                  while (1) {
                    switch (_context19.prev = _context19.next) {
                      case 0:
                        val = inp.value;
                        /*close any already open lists of autocompleted values*/

                        _context19.next = 3;
                        return FillFindObjectBoxAndTextSearch.apply(void 0, [control_id, Control].concat(relatedcontrol));

                      case 3:
                        arr = _context19.sent;
                        closeAllLists();

                        if (val) {
                          _context19.next = 7;
                          break;
                        }

                        return _context19.abrupt("return", false);

                      case 7:
                        if (!(arr == null || arr.length == 0)) {
                          _context19.next = 9;
                          break;
                        }

                        return _context19.abrupt("return", false);

                      case 9:
                        currentFocus = -1;
                        /*create a DIV element that will contain the items (values):*/

                        a = document.createElement("DIV");
                        a.setAttribute("id", inp.id + "autocomplete-list");
                        a.setAttribute("class", "autocomplete-items");
                        /*append the DIV element as a child of the autocomplete container:*/

                        inp.parentNode.appendChild(a);
                        /*for each item in the array...*/

                        keys = Object.keys(arr[0]);
                        Key_Id = keys[0];
                        key_value = keys[1];
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

                          b.addEventListener("click", function (e) {
                            /*insert the value for the autocomplete text field:*/
                            cc.value = this.getElementsByTagName("input")[0].value;
                            inp.value = this.innerText; //inp.onchange(); 

                            /*close the list of autocompleted values, 
                            (or any other open lists of autocompleted values:*/

                            closeAllLists();
                          });
                          a.appendChild(b);
                        }

                      case 19:
                      case "end":
                        return _context19.stop();
                    }
                  }
                }, _callee19);
              }));

              return function (_x62) {
                return _ref.apply(this, arguments);
              };
            }());
            /*execute a function presses a key on the keyboard:*/

            inp.addEventListener("keydown", function (e) {
              var x = document.getElementById(this.id + "autocomplete-list");
              if (x) x = x.getElementsByTagName("div");

              if (e.keyCode == 40) {
                /*If the arrow DOWN key is pressed, 
                increase the currentFocus variable:*/
                currentFocus++;
                /*and and make the current item more visible:*/

                addActive(x);
              } else if (e.keyCode == 38) {
                //up 

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

            /*execute a function when someone clicks in the document:*/
            document.addEventListener("click", function (e) {
              closeAllLists(e.target);
            });

          case 8:
          case "end":
            return _context20.stop();
        }
      }
    }, _callee20);
  }));
  return _autocompletefx.apply(this, arguments);
}

function FillFindObjectBoxAndTextSearch(_x56, _x57) {
  return _FillFindObjectBoxAndTextSearch.apply(this, arguments);
}

function _FillFindObjectBoxAndTextSearch() {
  _FillFindObjectBoxAndTextSearch = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee21(control_id, content) {
    var form_id,
        value,
        param,
        i,
        _len8,
        relatedcontrol,
        _key8,
        cname,
        C,
        value_data,
        Param_Name,
        fucname,
        address,
        s,
        _args21 = arguments;

    return regeneratorRuntime.wrap(function _callee21$(_context21) {
      while (1) {
        switch (_context21.prev = _context21.next) {
          case 0:
            _context21.prev = 0;
            form_id = GetUrlParameter('ID');
            value = content.value;
            param = [];
            param.push({
              name: 'rule_id',
              value: "0"
            });
            param.push({
              name: 'form_id',
              value: form_id
            });
            param.push({
              name: 'control_id',
              value: control_id
            });
            param.push({
              name: 'content',
              value: value
            });
            param.push({
              name: 'te',
              value: "null"
            });

            try {
              for (_len8 = _args21.length, relatedcontrol = new Array(_len8 > 2 ? _len8 - 2 : 0), _key8 = 2; _key8 < _len8; _key8++) {
                relatedcontrol[_key8 - 2] = _args21[_key8];
              }

              if (relatedcontrol[0] != undefined) {
                for (i = 0; i < relatedcontrol.length; i++) {
                  cname = relatedcontrol[i].toString();
                  C = document.getElementById(cname);

                  if (C != null) {
                    value_data = C.value;
                    Param_Name = C.getAttribute('zid');
                    param.push({
                      name: Param_Name,
                      value: value_data
                    });
                  }
                }
              }
            } catch (ee) {}

            fucname = "Search.ZF_COMPLEX";
            address = baseapplicationsrc + "searchEngine/" + fucname;
            _context21.next = 14;
            return nativecallZf_jslib(address, param, 2);

          case 14:
            s = _context21.sent;
            return _context21.abrupt("return", s);

          case 18:
            _context21.prev = 18;
            _context21.t0 = _context21["catch"](0);
            return _context21.abrupt("return", null);

          case 21:
          case "end":
            return _context21.stop();
        }
      }
    }, _callee21, null, [[0, 18]]);
  }));
  return _FillFindObjectBoxAndTextSearch.apply(this, arguments);
}

function SelectLocation(formid, objectcontrol, title) {
  lookupcontrol = objectcontrol;
  var findspace = document.getElementById("findobjectinOtherform");
  findspace.innerHTML = "";
  findspace.innerHTML += "<div id=\"findpanel\" class=\"ShowPanel\" ><div class=\"ShowPanelContenet\" style=\" height:" + formhightinview + "vh;width:90%;\" align=\"Center\"><Table dir=\"rtl\" style=\"width:100%;\" class=\"FromCaption\" ><tr> <td align=\"right\" ><input type=\"button\" id=\"close\"   class=\"closebutton\" onclick=\"CloseFindForm();\"><span class=\"Title\">     Find Form    </span><span class=\"Title\">" + title + "</span> &nbsp;&nbsp;&nbsp; <input type=\"button\" id=\"closeandapplay\" value=\"Accept   \"  style=\"width:150px;\"   onclick=\"CloseFindFormAndSubmit(" + formid + ");\"> </td></tr></table><iframe frameborder=\"0\" id=\"findiframe" + formid + "\"  src=\"" + baseapplicationsrc + "GOMAP/SelectLocation.html\" style=\"width:100%; height:" + formhightinview + "vh;background: #FFFFFF;\"> </iframe><Table id=\"submitformpanel\" dir=\"rtl\" style=\"width:100%;\" class=\"FindSubmit\" ><tr> <td align=\"Right\" ></td></tr></table></div></div>   ";
  HiddenNowSelected();
}

function NavigateLocation(fromlocation, tolocation) {
  var addressnavigate = baseapplicationsrc + "GOMAP/Navigate.html?from=" + fromlocation + "&to=" + tolocation;
  openNewPage(addressnavigate);
}

function Showhelp(fromid) {
  var addressnavigate = baseapplicationsrc + "HelpForm/" + fromid + ".pdf";
  openNewPage(addressnavigate);
  return false;
}

function CreateGridFormRestTable(_x58, _x59, _x60, _x61) {
  return _CreateGridFormRestTable.apply(this, arguments);
} /// Java websocket Main Api For ZFrame Service  
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// 


function _CreateGridFormRestTable() {
  _CreateGridFormRestTable = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee22(datasource, activecheckbox, parentdiv, lngid) {
    var len, htmlcode, mainkeyvalue, c, classtr, B, countercolumns, key, valuedata, keyValue, datatranslate, texttranslate;
    return regeneratorRuntime.wrap(function _callee22$(_context22) {
      while (1) {
        switch (_context22.prev = _context22.next) {
          case 0:
            len = datasource.length;
            htmlcode = "";

            if (len > 0) {
              htmlcode = "<table dir=\"rtl\" class=\"Grid\" rules=\"all\" cellspacing=\"0\" border=\"1\">";
              htmlcode += "<thead><tr>";
            }

            mainkeyvalue = "";
            c = 0;

          case 5:
            if (!(c < len)) {
              _context22.next = 37;
              break;
            }

            classtr = "";

            if ((c + 1) % 2 == 0) {
              classtr = "class=\"alt\"";
            }

            if (c != 0) {
              htmlcode += "<tr " + classtr + ">";
            }

            B = datasource[c];
            countercolumns = 0;
            _context22.t0 = regeneratorRuntime.keys(B);

          case 12:
            if ((_context22.t1 = _context22.t0()).done) {
              _context22.next = 32;
              break;
            }

            key = _context22.t1.value;
            valuedata = B[key];
            keyValue = key;

            if (!(c == 0)) {
              _context22.next = 28;
              break;
            }

            if (!(countercolumns < 2)) {
              _context22.next = 21;
              break;
            }

            htmlcode += "<th style=\"width: 40px; cursor: default; user-select: text;\" align=\"Center\"><span class=\"title\" style=\"color:#ffffff;\"> </span></th>";
            _context22.next = 26;
            break;

          case 21:
            _context22.next = 23;
            return TranslateText(lngid, keyValue);

          case 23:
            datatranslate = _context22.sent;
            texttranslate = datatranslate[0].TXT;
            htmlcode += "<th style=\"cursor: default; user-select: text;\"><span style=\"cursor: default; user-select: text;\">  " + texttranslate + "  <span></span></span></a></th>";

          case 26:
            _context22.next = 29;
            break;

          case 28:
            // Create Row Data  
            if (countercolumns == 0) {
              mainkeyvalue = valuedata;
              htmlcode += "<td align=\"Center\"><span class=\"title\">" + (c + 1) + "</span></td>";
            } else if (countercolumns == 1) {
              htmlcode += "<td class=\"selecttd\" align=\"Center\"><input value=\"" + mainkeyvalue + "\"class=\"GridButton\" type=\"button\"><input type=\"hidden\" class=\"GridRecordValue\" value=\"" + mainkeyvalue + "\"></td>";
            } else {
              htmlcode += "<td><span class=\"title\">" + valuedata + "</span></td>";
            }

          case 29:
            countercolumns++;
            _context22.next = 12;
            break;

          case 32:
            htmlcode += "</tr>";

            if (c == 0) {
              htmlcode += "</thead>";
            }

          case 34:
            c++;
            _context22.next = 5;
            break;

          case 37:
            if (htmlcode != "") {
              htmlcode += "</table>";
            }

            parentdiv.innerHTML = htmlcode;

          case 39:
          case "end":
            return _context22.stop();
        }
      }
    }, _callee22);
  }));
  return _CreateGridFormRestTable.apply(this, arguments);
}

var ClientZFServiceCallbackfunction;

var WebSocketClient = /*#__PURE__*/function () {
  function WebSocketClient(protocol, hostname, port, endpoint, cbfonreceive, zfmode) {
    _classCallCheck(this, WebSocketClient);

    this.webSocket = null;
    this.protocol = protocol;
    this.hostname = hostname;
    this.port = port;
    this.endpoint = endpoint;
    ClientZFServiceCallbackfunction = cbfonreceive; //function(){cbfonreceive()}.bind(this);             

    this.ZFrameMode = zfmode;
  }

  _createClass(WebSocketClient, [{
    key: "getServerUrl",
    value: function getServerUrl() {
      return this.protocol + "://" + this.hostname + ":" + this.port + this.endpoint;
    }
  }, {
    key: "getZframeServiceUrl",
    value: function getZframeServiceUrl() {
      return baseapplicationsrc.replace("https:", "wss:").replace("http:", "ws:") + "zfservice";
    }
  }, {
    key: "connect",
    value: function connect() {
      try {
        if (this.webSocket == null || this.webSocket.readyState == WebSocket.CLOSED) {
          if (this.ZFrameMode == 1) {
            this.webSocket = new WebSocket(this.getZframeServiceUrl());
          } else {
            this.webSocket = new WebSocket(this.getServerUrl());
          }

          this.webSocket.onopen = function (event) {
            console.log('onopen::' + JSON.stringify(event, null, 4));
          };

          this.webSocket.onmessage = function (event) {
            var msg = event.data;
            ClientZFServiceCallbackfunction(msg);
          };

          this.webSocket.onclose = function (event) {
            console.log('onclose::' + JSON.stringify(event, null, 4));
          };

          this.webSocket.onerror = function (event) {
            console.log('onerror::' + JSON.stringify(event, null, 4));
          };
        }
      } catch (exception) {//console.error(exception); 
      }
    }
  }, {
    key: "getStatus",
    value: function getStatus() {
      return this.webSocket.readyState;
    }
  }, {
    key: "send",
    value: function send(message) {
      if (this.webSocket.readyState == WebSocket.OPEN) {
        this.webSocket.send(message);
      } else {
        console.error('webSocket is not open. readyState=' + this.webSocket.readyState);
      }
    }
  }, {
    key: "disconnect",
    value: function disconnect() {
      if (this.webSocket.readyState == WebSocket.OPEN) {
        this.webSocket.close();
      } else {
        console.error('webSocket is not open. readyState=' + this.webSocket.readyState);
      }
    }
  }]);

  return WebSocketClient;
}();

var ClientZFService = null;

function ConnectZFService(cbfonreceive) {
  ClientZFService = new WebSocketClient('ws', '127.0.0.1', 8080, ' ', cbfonreceive, 1);
  ClientZFService.connect();
}

function SendDataZFService(data) {
  ClientZFService.send(data);
}

function CloseConnectionZFService() {
  ClientZFService.disconnect();
} //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////	 


function zframeispostback() {
  var c = document.getElementById("___zframepostmethod");

  if (c.value == 1) {
    return true;
  }

  return false;
}

function CheckCloseCustomGrid() {
  if (zframeispostback()) {
    var CloseCommandOnParent = window.parent.document.getElementById("close");

    if (CloseCommandOnParent != null) {
      CloseCommandOnParent.click();
    }
  }
}