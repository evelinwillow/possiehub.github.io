// Get the modal
var modal = document.getElementById("modal");

// Get the footer because it's being silly

var footer = document.getElementsByClassName("footer");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// User agent detection stuff

var ua = window.navigator.userAgent;
var isFirefox64 = false;
var isFirefox = false;

if (ua.indexOf("Firefox/") != -1) {
    var version = parseInt(ua.split("Firefox/")[1]);
    if (version >= 64) {
        isFirefox64 = true;
        isFirefox = true;
    } else {
        isFirefox64 = false;
        isFirefox = true;
    }
}

if (isFirefox) {
    if (isFirefox64) {
        console.log("The user is using Firefox 64 or higher!");
        console.log(ua);
    } else {
        console.log("The user is not using Firefox 64 or higher!");
        console.log(ua);
        modal.style.display = "block";
        footer.style.display = "none";
    }
} else {
    console.log("The user is not using Firefox!");
    console.log(ua);
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}