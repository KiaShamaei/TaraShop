$(document).ready(function(){
 
let dataHtml = '';
const pageSize = 10;
let currentPageParam = 0;

const paginationEl =[...document.querySelectorAll(".page-link")]
const pervBtn = document.getElementById('previousPage');
const nexttBtn = document.getElementById('nextPage')
let dataContainer = document.getElementById('data-container');
class Getproduct {

    static async call_getproducttemp(P_pageindex,P_pagesize)
    {
         var param = []; 
              param.push({name:'pageindex', value:P_pageindex});
              param.push({name:'pagesize', value:P_pagesize});
    
               let s= await  callZf_jslib('activity/producttemp/fetchdata/','getproducttemp',param,2); 
              return s; 
    }
    static async do_call_getproducttemp(pageindex,pagesize){
        return this.call_getproducttemp(pageindex,pagesize);
    }


}

class View {
    whoisActive(currentPage , countpage){
        debugger;
        switch (currentPage){
            case "1" : pervBtn.disabled=true;
            break; 
            case countpage.toString() : {nexttBtn.disabled =true;pervBtn.disabled=false;}
            break;
            default :{exttBtn.disabled =false}
        }

    }
    changePaginationByNext(){}
    makeList(items){
        debugger;
        let pagseCount = Math.ceil(items.count/pageSize)
        this.whoisActive(items.currentpage,pagseCount)
        
        dataHtml="";
        items.data.forEach(item => {
            dataHtml += `<div class="proMatch"><img src=${item.IMAGE_URL} >
            <a href="#" class="text-primary"> دسته : ${item.CATEGORY_NAME}</a>
             <div class="productDetail">  <div>${item.PRODUCT_NAME}</div>
               <div><span class="badge badge-info badge-pill m-1">${(item.IS_INVENTORY) ? "موجود است" : "موجود نیست"}</span></div>
               <div><span class="badge badge-warning badge-pill m-1">${(item.IS_AVAILABLE) ? "در دسترس" : "در دسترس نیست"}</span></div>
               <div><span class="badge ${(item.IS_MATCHING)>0 ?"badge-success":"badge-warning"} "badge-pill m-1">${(item.IS_MATCHING)>0 ? "ادغام" : "در انتظار ادغام"}</span></div>
               <div><span class="badge badge-danger badge-pill m-1">${(item.IS_ACTIVE) ? "فعال" : "فعال نیست"}</span></div>
               <div><a><i class=" proIcon proclose fa fa-times p-2"   data-productId = ${item.PRODUCT_CODE} ></i></span></a> </div>
               <div><a href="#/productMatch"><i class="fas fa-edit  proedit proIcon p-2 "   data-productId = ${item.PRODUCT_CODE} ></i></a> </div>
             </div>
             </div>
            `;
        });
    }

    do_makeList(num){
        Getproduct.do_call_getproducttemp(num,pageSize).then((items) => {
            view.makeList(items);
            currentPageParam =parseInt(items.currentpage);
            dataContainer.innerHTML ="";
            dataContainer.innerHTML = dataHtml;
        })
    }
 
        
    }
class Pagination {
    changePagination(e){
        const activepage = document.querySelector('.page-link-active');
        activepage.classList.remove('page-link-active');
        e.classList.add("page-link-active");
        
        view.do_makeList(e.dataset.page);
    }

}
const view = new View();
const pagination = new Pagination();
view.do_makeList(1);

paginationEl.forEach(item=>{
    
    item.addEventListener('click',(e)=>{
        e.preventDefault();
        pagination.changePagination(e.target);  
    })
})
nexttBtn.addEventListener("click", ()=>{
view.do_makeList(currentPageParam + 1)
})
pervBtn.addEventListener("click", ()=>{
    view.do_makeList(currentPageParam - 1)
    })
    
})




