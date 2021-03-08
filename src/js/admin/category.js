$(document).ready(function () {

    const root = document.querySelector("#rootCat");

    //calling zframe function and retrived data from dataBase.
    class GetDataZfram {
        async call_getcategoryagent(P_entityid) {

            var param = [];
            param.push({ name: 'entityid', value: P_entityid });;

            let s = await callZf_jslib('activity/agent/', 'getcategoryagent', param, 1);
            return s;
        }


    }
    //make ui base on entity ui .
    class MakeUi {
        add(data) {
            

            let pattern = "";
            data.forEach(item => {
                pattern +=
                    ` <div class="col-lg-3 justify-content-start mt-md-2">
            <div class="card">
                <div class="card-body">
                  <h5 class="card-title">${item.CATEGORY_NAME}</h5>
                  <p class="card-text">توضیحات : ${item.DESCRIPTION}...</p>
                  <p class="card-text"> مادر دسته :${item.PARENT_NAME}</p>
                  <button href="#" class="btn btn-outline-danger deletecat" id = ${item.CATEGORY_ID}>حذف دسته</button>
                </div>
              </div>
        </div>`;
            });

            root.innerHTML = pattern;
        };
        showMsg() {
            root.innerHTML = `<p class="card-text">دسته بندی انتخاب نشده لطفا حداقل یک دسته محصول انتخاب فرمایید  ...</p>`
        }
    }
    //store data in database 
    class Storage {
        static getStore(data) {
            localStorage.setItem("category ", data)
        }
        static update(id) {


        }
    }
    class DeleteCategory {

        async call_deletecategoryagent(P_categoryid) {
            var param = [];
            param.push({ name: 'categoryid', value: P_categoryid });

            let s = await callZf_jslib('activity/agentcategory/delete/', 'deletecategoryagent', param, 2);
            return s;
        }
        getDeleteItem() {

            const deleteBtn = document.querySelectorAll('.deletecat');
            deleteBtn.forEach(item => item.addEventListener('click', (e) => {
                this.deletItem(e.target.id)
            }))
        }
        deletItem(id) {
            
            this.call_deletecategoryagent(id).then(data => {
            
                if (data.Mid == 1) {
                    getDataZfram.call_getcategoryagent(userInfo.MEntityId).then((data) => {
                        
                        if (data[0].MSG!="  EXECUTE SUCCESS ") {
                            makeUi.add(data);
                            Storage.getStore(data);
                            this.getDeleteItem();
                        } else {
                            makeUi.showMsg();

                        }
                    })
                } else {
                    alert("something wrong!")
                }
            })
        }

    }
    //getdata from database 
    const getDataZfram = new GetDataZfram();
    const makeUi = new MakeUi();
    const deletecategory = new DeleteCategory();
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    getDataZfram.call_getcategoryagent(userInfo.MEntityId)
        .then((data) => {
            
            if (data[0].MSG!="  EXECUTE SUCCESS ") {
                
                makeUi.add(data);
                Storage.getStore(data);
                deletecategory.getDeleteItem();
            } else {
                makeUi.showMsg();

            };
        });
        $("#acceptEdit").click(function(){
            location.replcae('#/category');
        })




})





