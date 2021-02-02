
// Get the modal
var modal = document.getElementById("main-nav");

// Get the button that opens the modal
var btn = document.getElementById("btn-slideMenu");

// Get the <span> element that closes the modal
// var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
// btn.onclick = function() {
//   modal.style.display = "block";
// }

// When the user clicks on <span> (x), close the modal
// span.onclick = function() {
//   modal.style.display = "none";
// }



// When the user clicks anywhere outside of the modal, close it
window.addEventListener("click",function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  })
  function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
    modal.style.display = "block";
  }
  
  function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    modal.style.display = "none";
  }