/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */



 function Show_Message(Title,message)
{
    
    /*
    $.alert({
            title: Title,
            content: message,
        });
    
    */
    
   $.confirm({
       
    theme: 'supervan', // 'material', 'bootstrap'
    text: "Are you sure you want to delete that comment?",
    confirm: function() {
        
    },
    cancel: function() {
        // nothing to do
    }
});
    
            
}




/*


function Show_Message(Title,message)
{
    $.confirm({
        title: Title,
        content: message,
        type: 'blue',
        typeAnimated: true,
        columnClass: 'small',
        rtl: true,
        alignMiddle: true,
        buttons: {
            RETURN : {
                btnClass: 'btnNO',
                text: 'بازگشت',
                keys: ['enter'],
                action: function () {
										               
                }
            }
        }
    });		
    				
            
}

*/