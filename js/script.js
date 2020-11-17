window.addEventListener("DOMContentLoaded", () => {
    "use strict";

    const inputUah = document.querySelector("#uah"),
        inputUsd = document.querySelector("#usd");

    inputUah.addEventListener("input", () => {
        const request = new XMLHttpRequest();

        request.open("GET", "js/current.json");
        request.setRequestHeader("Content-type", "application/json; charset=utf-8");
        request.send();

        request.addEventListener("load", () => {
            if (request.status === 200) {
                const data = JSON.parse(request.response);
                inputUsd.value = (+inputUah.value / data.current.usd).toFixed(2);
            } else {
                inputUsd.value = "Что-то пошло не так..";
            }
        });
    });

    inputUsd.addEventListener("input", () => {
        const request = new XMLHttpRequest();

        request.open("GET", "js/current.json");
        request.setRequestHeader("Content-type", "application/json; charset=utf-8");
        request.send();

        request.addEventListener("load", () => {
            if (request.status === 200) {
                const data = JSON.parse(request.response);
                inputUah.value = (+inputUsd.value * data.current.usd).toFixed(2);
            } else {
                inputUah.value = "Что-то пошло не так..";
            }
        });
    });
});