document.addEventListener("DOMContentLoaded", () => {
    const box = document.querySelector(".box");
    const btn = document.querySelector(".btn");
    let pos = 0;

    function boxAnimate() {
        const boxInterval = setInterval(frame, 10);
        function frame() {
            if (pos === 300) {
                clearInterval(boxInterval);
            } else {
                pos++;
                box.style.top = pos + "px";
                box.style.left = pos + "px";
            }
        }
    }

    btn.addEventListener("click", () => {
        if (pos === 300 || pos === 0) {
            pos = 0;
            boxAnimate();
        } else {

        }
    });
});