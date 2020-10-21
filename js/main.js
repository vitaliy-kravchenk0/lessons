document.addEventListener("DOMContentLoaded", () => {
    "use strict";

    // touchstart
    // touchmove
    // touchend
    // touchenter
    // touchleave
    // touchcancel


    const box = document.querySelector(".box");

    box.addEventListener("touchstart", (e) => {
        e.preventDefault();

        console.log("Start");
        console.log(e.targetTouches);
    });

    box.addEventListener("touchmove", (e) => {
        e.preventDefault();

        console.log(e.targetTouches[0].pageX);
    });

    // box.addEventListener("touchend", (e) => {
    //     e.preventDefault();

    //     console.log("End");
    // });
});

// touches
// targetTouches
// changedYouches