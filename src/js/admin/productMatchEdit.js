$(document).ready(function () {
    const productIdTemp = localStorage.getItem("productTempId");
    const name = document.getElementById('productTitle');
    const productCat = document.getElementById('productCat');
    const productDes = document.getElementById('productDes');
    const productImage = document.getElementById('productImage');
    const productTempLike = document.querySelector('.cardtemp');
    const matchpart = document.getElementById("matchPart");

    
    let htmlLiketemp ="";
    let matchProductlist = "";
    let matchselected="";
    let nodeSelected="";
    const productwanamatch = localStorage.getItem("productTempId")

  
    class GetData {
        static async call_getproducttempbyid(P_producttempid) {
            var param = [];
            param.push({ name: 'producttempid', value: P_producttempid });

            let s = await callZf_jslib('activity/producttemp/fetchdata/', 'getproducttempbyid', param, 1);
            return s;
        }
        static async call_getproductmatchbycategoryid(P_producttempid) {
            var param = [];
            param.push({ name: 'producttempid', value: P_producttempid });

            let s = await callZf_jslib('activity/producttemp/fetchdata/', 'getproductmatchbycategoryid', param, 1);
            return s;
        }
     
    }

    class View {
        static filterMatchItem (listOfMatch,id){
            return listOfMatch.filter (e=>e.PRODUCT_ID == id)
        }
        static ChangeMatchSelected (arrObj){
            debugger
            const listOfProduct = document.querySelectorAll('.semiMatch') ; 
           
            Array.from(listOfProduct).map(e=> {
                e.dataset.matched = "false";
            });
            const  htmlMatched = document.getElementById(arrObj[0].PRODUCT_ID);
            htmlMatched.dataset.matched="true";
            return arrObj[0].PRODUCT_ID;
      
              
        }
        static showMatchSelect (){
            
            const listOfProduct = document.querySelectorAll('.semiMatch') ;
            
            listOfProduct.forEach(item=>{
                if(item.dataset.matched=="true"){
                    document.getElementById('span'+item.id).classList.remove('d-none')
                    
                }else{
                   
                    document.getElementById('span'+item.id).classList.add('d-none')
                   
                }
            })  
            
        }
    }
   
    class SetData {

         async  call_setmatchproduct(P_ismatching,P_productcode)
        {
             var param = []; 
                  param.push({name:'ismatching', value:P_ismatching});
                  param.push({name:'productcode', value:P_productcode});
        
                   let s= await  callZf_jslib('activity/producttemp/fetchdata/','setmatchproduct',param,2); 
                  return "ok"; 
        }
         async do_setmatchproduct(P_ismatching,P_productcode){
            const result=await this.call_setmatchproduct(P_ismatching,P_productcode)
            if(result=="ok"){
                window.location.assign(window.location.origin+"/ZSHOP/SHOP/admin/index.html#/productsMatch");
            }

        }
    }
    
 
    GetData.call_getproducttempbyid(productIdTemp).then((e) => {
       
        name.innerHTML = e[0].PRODUCT_NAME;
        productDes.innerHTML = e[0].DESCRIPTION;
        productCat.innerHTML = e[0].CATEGORY_NAME;
        productImage.src = e[0].IMAGE_URL;
//if select match product is exist ---
        nodeSelected=e[0].IS_MATCHING;
    })
    GetData.call_getproductmatchbycategoryid(productIdTemp).then((e)=>{
     
        e.forEach(item => {
            htmlLiketemp += ` <div class="col-4">
            <div class="card cardtemp p-3 semiMatch " id=${item.PRODUCT_ID} data-matched=${(nodeSelected==item.PRODUCT_ID)?"true":"false"}>
                <img class="card-img-top" src=${item.IMAGE_URL} alt="Card image cap">
                
                <div class="card-body">
                  <h5 class="card-title">${item.PRODUCT_NAME}</h5>
                  <p class="card-text">توضیح محصول :${item.DESCRIPTION} </p>
                  <p class="card-text">کد محصول  :${item.PRODUCT_CODE} </p>
                  <span class="badge badge-warning d-none matchSign" id=span${item.PRODUCT_ID}>انتخاب شده جهت ادغام </span>
                  <button class="J-paginationjs-go-button matchButton" data-toggle="modal" data-target="#matchModal"  data-matchId =${item.PRODUCT_ID} >ادغام</buttno>
                  
                  </div>
              </div>
           </div>`;
        });
        productTempLike.innerHTML= htmlLiketemp
       matchProductlist= e;
    }).then(()=>{
            const matchButton = document.querySelectorAll(".matchButton")
            matchButton.forEach(item=>{
                item.addEventListener('click', (e)=>{
                    matchselected= View.filterMatchItem(matchProductlist,e.target.dataset.matchid);
                    
                })
                
            })
//if select match product is exist --- this part show if is selected match is exist             
            View.showMatchSelect();
       }).then(()=>{
//accept match is id for modal in root of admin
        document.getElementById('acceptmatch').addEventListener('click',(e)=>{
            nodeSelected = View.ChangeMatchSelected(matchselected);
            View.showMatchSelect();
        })
     }).then(()=>{
        const matchproductBtn= document.getElementById("matchProduct")
        matchproductBtn.addEventListener("click", ()=>{
            const  setData=new  SetData();
            setData.do_setmatchproduct(nodeSelected,productwanamatch)
            
           })
     })
})
