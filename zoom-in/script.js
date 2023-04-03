
let imageContainer = document.getElementById("image-container");
let productImage = document.getElementById("product-image");
let overlay = document.getElementById("overlay");
let mouseOverlay = document.getElementById("mouse-overlay");

//events object(stores events for touch, mouse)
let events = {
    mouse: {
        move: "mousemove",
    },
    touch: {
       move: "touchmove",  
    },
};

//initially blank
let deviceType = "";
//checks for device type
function isTouchDevice() {
    try {
        deviceType = "touch";
        document.createEvent("TouchEvent");
        return true;
    } catch (e) {
        deviceType = "mouse";
        return false;
    }
}
//hides overlay
const hideElement = () => {
    overlay.style.display = "none";
    mouseOverlay.style.display = "none";
};


//check device so that deviceType variable is set to touch or mouse
isTouchDevice();

imageContainer.addEventListener(events[deviceType].move, (e) => {
    //try catch to avoid any errors for touch screens
    try {
       var x = !isTouchDevice() ? e.pageX : e.touches[0].pageX;
       var y = !isTouchDevice() ? e.pageY : e.touches[0].pageY;
    } catch (e) {}
    let imageWidth = imageContainer.offsetWidth;
    let imageHeight = imageContainer.offsetHeight;
    if (
        imageWidth - (x - imageContainer.offsetLeft) < 15 || x - imageContainer.offsetLeft < 15 ||
        imageHeight - (y - imageContainer.offsetTop) < 15 || y - imageContainer.offsetTop < 15
    ) {
        hideElement();
    } else {
        overlay.style.display = "block";
        mouseOverlay.style.display = "inline-block"
    }

    var posX = ((x - imageContainer.offsetLeft) /
    imageWidth).toFixed(4) * 100;
    var posY = ((y - imageContainer.offsetTop) /
    imageHeight).toFixed(4) * 100;

    overlay.style.backgroundPosition = posX + "%" + posY + "%";

    mouseOverlay.style.top = y + "px";
    mouseOverlay.style.left = x + "px";
});
