document.addEventListener("DOMContentLoaded", () => {

    // Tabs

    const tabsParent = document.querySelector(".tabheader__items"),
        tabs = tabsParent.querySelectorAll(".tabheader__item"),
        tabsContent = document.querySelectorAll(".tabcontent");

    function hideContent() {
        tabsContent.forEach(item => {
            item.classList.add("hide");
            item.classList.remove("show", "fade");
        });

        tabs.forEach(item => {
            item.classList.remove("tabheader__item_active");
        });
    }

    function showContent(i = 0) {
        tabsContent[i].classList.add("show", "fade");
        tabsContent[i].classList.remove("hide");
        tabs[i].classList.add("tabheader__item_active");
    }

    tabsParent.addEventListener("click", (e) => {
        const target = e.target;

        if (target && target.classList == "tabheader__item") {
            tabs.forEach((item, i) => {
                if (item == target) {
                    hideContent();
                    showContent(i);
                }
            });
        }
    });

    hideContent();
    showContent();

    // Timer

    let deadline = "2020-11-01";

    function getEndTime(endTime) {
        const total = new Date(endTime) - new Date(),
            days = Math.floor(total / (1000 * 60 * 60 * 24)),
            hours = Math.floor(total / (1000 * 60 * 60) % 24),
            minutes = Math.floor(total / (1000 * 60) % 60),
            seconds = Math.floor(total / 1000 % 60);

        return {
            total: total,
            days: days,
            hours: hours,
            minutes: minutes,
            seconds: seconds
        };
    }

    function addZero(num) {
        if (num >= 0 && num < 10) {
            return "0" + num;
        } else {
            return num;
        }
    }

    function getElements(endTime) {
        const days = document.querySelector("#days"),
            hours = document.querySelector("#hours"),
            minutes = document.querySelector("#minutes"),
            seconds = document.querySelector("#seconds"),
            timer = setInterval(setTime, 1000);

        setTime();

        function setTime() {
            let time = getEndTime(endTime);

            days.textContent = addZero(time.days);
            hours.textContent = addZero(time.hours);
            minutes.textContent = addZero(time.minutes);
            seconds.textContent = addZero(time.seconds);

            if (time.total <= 0) {
                clearInterval(timer);

                days.textContent = "00";
                hours.textContent = "00";
                minutes.textContent = "00";
                seconds.textContent = "00";
            } else {

            }
        }
    }

    getElements(deadline);

    // Modal

    const btnModal = document.querySelectorAll(".btn_modal"),
        modal = document.querySelector(".modal"),
        modalClose = document.querySelector(".modal__close");

    btnModal.forEach(btn => {
        btn.addEventListener("click", () => {
            modal.classList.add("show", "fade");
            modal.classList.remove("hide");
            document.body.style.overflow = "hidden";
        });
    });

    function closeModal() {
        modal.classList.add("hide");
        modal.classList.remove("show", "fade");
        document.body.style.overflow = "";
    }

    modalClose.addEventListener("click", closeModal);

    modal.addEventListener("click", (e) => {
        console.dir(e);
        if (e.target === modal) {
            closeModal();
        }
    });

    document.addEventListener("keydown", (e) => {
        if (e.code === "Escape" && modal.classList.contains("show")) {
            closeModal();
        }
    });
});