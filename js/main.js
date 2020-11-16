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

    function openModal() {
        modal.classList.add("show", "fade");
        modal.classList.remove("hide");
        document.body.style.overflow = "hidden";

        clearInterval(openModalByTimer);
    }

    btnModal.forEach(btn => {
        btn.addEventListener("click", () => {
            openModal();
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

    const openModalByTimer = setInterval(openModal, 60000);

    function openModalByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            openModal();
            window.removeEventListener("scroll", openModalByScroll);
        }
    }

    window.addEventListener("scroll", openModalByScroll);

    // Cards

    class MenuCards {
        constructor(src, alt, title, descr, price, parentSelector) {
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.descr = descr;
            this.price = price;
            this.transfer = 27;
            this.toUAH();
            this.parent = document.querySelector(parentSelector);
        }

        toUAH() {
            this.price *= this.transfer;
        }

        addCard() {
            const element = document.createElement("div");

            element.innerHTML = `
                <div class="menu__item">
                    <img src=${this.src} alt=${this.alt}>
                    <h3 class="menu__item-subtitle">${this.title}</h3>
                    <div class="menu__item-descr">${this.descr}</div>
                    <div class="menu__item-divider"></div>
                    <div class="menu__item-price">
                        <div class="menu__item-cost">Цена:</div>
                        <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                    </div>
                </div>
            `;

            this.parent.append(element);
        }
    }

    new MenuCards(
        "img/tabs/vegy.jpg",
        "vegy",
        'Меню "Фитнес"',
        'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
        9,
        ".menu .container"
    ).addCard();

    new MenuCards(
        "img/tabs/elite.jpg",
        "elite",
        'Меню “Премиум”',
        'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
        20,
        ".menu .container"
    ).addCard();

    new MenuCards(
        "img/tabs/post.jpg",
        "post",
        'Меню "Постное"',
        'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
        16,
        ".menu .container"
    ).addCard();
});