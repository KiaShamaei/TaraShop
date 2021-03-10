$(document).ready(function(){
    let container = $('#pagination');
let getData = '';
let productlist =  "";
class Getproduct {

    static async call_getproducttemp() {
        
        var param = [];

        let s = await callZf_jslib('activity/producttemp/fetchdata/', 'getproducttemp', param, 2);
        return s;
    }


}
Getproduct.call_getproducttemp().then((e) => {

    getData = e;
    container.pagination({
        dataSource: getData,
        pageSize: 10,
        showGoInput: true,
        showGoButton: true,
        callback: function (data, pagination) {
            var dataHtml = '';
            $.each(data, function (index, item) {

                dataHtml += `<div class="proMatch"><img src=${item.IMAGE_URL} >
                <a href="#" class="text-primary"> دسته : ${item.CATEGORY_NAME}</a>
                 <div class="productDetail">  <div>${item.PRODUCT_NAME}</div>
                   <div><span class="badge badge-info badge-pill m-1">${(item.IS_INVENTORY) ? "موجود است" : "موجود نیست"}</span></div>
                   <div><span class="badge badge-warning badge-pill m-1">${(item.IS_AVAILABLE) ? "در دسترس" : "در دسترس نیست"}</span></div>
                   <div><span class="badge ${(item.IS_MATCHING)>0 ?"badge-success":"badge-warning"} "badge-pill m-1">${(item.IS_MATCHING)>0 ? "ادغام" : "در انتظار ادغام"}</span></div>
                   <div><span class="badge badge-danger badge-pill m-1">${(item.IS_ACTIVE) ? "فعال" : "فعال نیست"}</span></div>
                   <div><a><i class=" proIcon proclose fa fa-times p-2"   data-productId = ${item.PRODUCT_CODE} ></i></span></a> </div>
                   <div><a href="#/productMatch"><i class="fas fa-edit  proedit proIcon p-2 "   data-productId = ${item.PRODUCT_CODE} ></i></a> </div>


                 </div></div>
                `;
            });
            $("#data-container").html(dataHtml);
           
           proEdit =document.querySelectorAll(".proedit");
           proClose = document.querySelectorAll('.proclose');
          
            proEdit.forEach(item=>{
                item.addEventListener("click", function (e) {
                    localStorage.removeItem("productTempId");
                    localStorage.setItem("productTempId",e.target.dataset.productid )

                })
            })
            proClose.forEach(item=>{
                item.addEventListener("click", function (e) {
                })
            })
       
        }
    })
   
})
})
    





