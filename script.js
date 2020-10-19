"use strict";

const btns = document.querySelectorAll("button"),
      overlay = document.querySelector(".overlay");

// btn.onclick = function() {
//     alert("click");
// };

// btn.onclick = function() {
//     alert("Second click");
// };

let i = 0;
const deleteElement = function(e) {
    console.log(e.currentTarget);
    console.log(e.type);
    // e.target.remove();
    // console.log("Hover");
    // i++;
    // if (i == 1) {
    //     btn.removeEventListener("click", deleteElement);
    // }
};

// btn.addEventListener("click", deleteElement);
// overlay.addEventListener("click", deleteElement);

btns.forEach(btn => {
    btn.addEventListener("click", deleteElement, {once: true});
});

const link = document.querySelector("a");

link.addEventListener("click", function(event) {
    event.preventDefault();

    console.log(event.target);
});