

$(document).ready(function () {
    // jquery make ui of tree ------------------------------------------------
    $.fn.extend({
        treed: function (o) {

            var openedClass = 'fa-minus-square';
            var closedClass = 'fa-plus-square';

            if (typeof o != 'undefined') {
                if (typeof o.openedClass != 'undefined') {
                    openedClass = o.openedClass;
                }
                if (typeof o.closedClass != 'undefined') {
                    closedClass = o.closedClass;
                }
            };
            //initialize each of the top levels
            var tree = $(this);
            tree.addClass("tree");
            tree.find('li').has("ul").each(function () {
                var branch = $(this); //li with children ul
                branch.prepend("<i class='indicator fa " + closedClass + "'></i>");
                branch.addClass('branch');
                branch.on('click', function (e) {
                    if (this == e.target) {
                        var icon = $(this).children('i:first');
                        icon.toggleClass(openedClass + " " + closedClass);
                        $(this).children().children().toggle();
                    }
                })
                branch.children().children().toggle();
            });
            //fire event from the dynamically added icon
            tree.find('.branch .indicator').each(function () {
                $(this).on('click', function () {
                    $(this).closest('li').click();
                });
            });
            //fire event to open branch if the li contains an anchor instead of text
            tree.find('.branch>a').each(function () {
                $(this).on('click', function (e) {
                    $(this).closest('li').click();
                    e.preventDefault();
                });
            });
            //fire event to open branch if the li contains a button instead of text
            tree.find('.branch>button').each(function () {
                $(this).on('click', function (e) {
                    $(this).closest('li').click();
                    e.preventDefault();
                });
            });
        }
    });

    //Initialization of treeviews=========



    // $('#tree2').treed({openedClass:'glyphicon-folder-open', closedClass:'glyphicon-folder-close'});

    // $('#tree3').treed({openedClass:'glyphicon-chevron-right', closedClass:'glyphicon-chevron-down'});


    //geting dom --------------------------------------------------------------------------
    const wrap = document.getElementById('tree1');
    const msg = document.getElementById('success-msg')
    let outputs = ""
    //call services
    class GetData {
        async call_getcategory() {
          
            var param = [];

            let s = await callZf_jslib('activity/category/fetchdata/', 'getcategory', param, 1);

            return s;
        }


    }
    const getdata = new GetData();



    class MakeElement {

        static async makeChild(obj, data) {

            outputs += `<li class="mx-2"><input type="checkbox" class="categoryselected parentcat  mx-2" data-id=${obj.CATEGORY_ID}> ${obj.CATEGORY_NAME}<ul>`;
        
            let output = data.filter(item => item.PARENT_ID == obj.CATEGORY_ID);
            output.forEach(item => {

                (item.CHILDCOUNT > 0) ? this.makeChild(item, data) : outputs += `<li class="mx-2"><input type="checkbox"  class="categoryselected mx-2 " data-id=${item.CATEGORY_ID}> ${item.CATEGORY_NAME} </li>`;
            })

            outputs += `</ul>`
        }
        static makeParent(root, data) {
        
            root.forEach(obj => {
           
                if (obj.CHILDCOUNT > 0) {

                    this.makeChild(obj, data)


                }
                else {
                    outputs += `<li class="mx-2"><input type="checkbox" class="categoryselected mx-2 " data-id=${obj.CATEGORY_ID}>${obj.CATEGORY_NAME} </li>`;
                }

            })
        }

    }
    //make elemeet base on response 
    async function createCategory() {
        const data = await getdata.call_getcategory();
        const root = data.filter(item => item.PARENT_ID == "1");
        MakeElement.makeParent(root, data);
        wrap.innerHTML = outputs
        //Initialization of treeviews=========
        $('#tree1').treed();

    }
    createCategory();
    //send data to server 

    class SendData {
        async call_insertagentcategory(P_category) {
       
            var param = [];

            var C = window.btoa(P_category); // encode a string
            param.push({ name: 'category', value: C });

            let s = await callZf_jslib('activity/agentcategory/insert/', 'insertagentcategory', param, 2);
            return s;
        }


    }
    //submit & send select item to backend------------------------
    const senddata = new SendData();
    $("#btn").on('click', function () {
        const ItemCat = Array.prototype.slice.call(document.querySelectorAll('.categoryselected'));
        const selected = ItemCat.filter(item => item.checked == true);
        const idselected = selected.map((item) => item.dataset.id);
        const object = JSON.stringify({ data: idselected });
     
        senddata.call_insertagentcategory(object).then((data) => {
            if (data.Mid=="1")
            {
                $('#editAccept').modal('show');
            } else
           {msg.innerHTML = "خطایی رخ داده است مجددا تلاش کنید"}
        });

    })
    


})





