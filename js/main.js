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

    let deadline = "2021-01-06";

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
        modal = document.querySelector(".modal");

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

    modal.addEventListener("click", (e) => {
        console.dir(e);
        if (e.target === modal || e.target.getAttribute("data-close") === "") {
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
        constructor(src, alt, title, descr, price, parentSelector, ...classes) {
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.descr = descr;
            this.price = price;
            this.transfer = 27;
            this.toUAH();
            this.parent = document.querySelector(parentSelector);
            this.classes = classes;
        }

        toUAH() {
            this.price *= this.transfer;
        }

        addCard() {
            const element = document.createElement("div");

            if (this.classes.length === 0) {
                this.classes = "menu__item";
                element.classList.add(this.classes);
            } else {
                this.classes.forEach(item => element.classList.add(item));
            }

            element.innerHTML = `
                <img src=${this.src} alt=${this.alt}>
                <h3 class="menu__item-subtitle">${this.title}</h3>
                <div class="menu__item-descr">${this.descr}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                </div>
            `;

            this.parent.append(element);
        }
    }

    const getResource = async (url) => {
        const res = await fetch(url);        

        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`);
        }

        return await res.json();
    };

    // getResource("http://localhost:3000/menu")
    //     .then(data => {
    //         data.forEach(({img, altimg, title, descr, price}) => {
    //             new MenuCards(img, altimg, title, descr, price, ".menu .container").addCard();
    //         });
    //     });
    
    axios.get("http://localhost:3000/menu")
        .then(data => {
            data.data.forEach(({img, altimg, title, descr, price}) => {
                new MenuCards(img, altimg, title, descr, price, ".menu .container").addCard();
            });
        });

    // getResource("http://localhost:3000/menu")
    //     .then(data => {
    //         data.forEach(({img, altimg, title, descr, price}) => {
    //             const element = document.createElement("div");

    //             element.classList.add("menu__item");

    //             element.innerHTML = `
    //             <img src=${img} alt=$altimg}>
    //             <h3 class="menu__item-subtitle">${title}</h3>
    //             <div class="menu__item-descr">${descr}</div>
    //             <div class="menu__item-divider"></div>
    //             <div class="menu__item-price">
    //                 <div class="menu__item-cost">Цена:</div>
    //                 <div class="menu__item-total"><span>${price}</span> грн/день</div>
    //             </div>
    //         `;

    //         document.querySelector(".menu .container").append(element);
    //         });
    //     });

    // Forms

    const forms = document.querySelectorAll("form");
    const messages = {
        loading: "Загрузка..",
        success: "Форма отправлена. Скоро мы с вами свяжемся!",
        failed: "Упс.. Что-то пошло не так."
    };

    forms.forEach(item => {
        bindPostData(item);
    });

    const postData = async (url, data) => {
        const res = await fetch(url, {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: data
        });

        return await res.json();
    };

    function bindPostData(form) {
        form.addEventListener("submit", (e) => {
            e.preventDefault();

            const imgNotification = document.createElement("img");
            imgNotification.src = "img/form/spinner.svg";
            imgNotification.style.cssText = `
                display: block;
                margin: 0 auto;
            `;

            form.insertAdjacentElement("afterend", imgNotification);

            const formData = new FormData(form);

            const json = JSON.stringify(Object.fromEntries(formData.entries()));

            postData("http://localhost:3000/requests", json)
                .then(data => {
                    console.log(data);
                    showFormNotification(messages.success);
                    imgNotification.remove();
                })
                .catch(() => {
                    showFormNotification(messages.failed);
                })
                .finally(() => {
                    form.reset();
                });
        });
    }

    function showFormNotification(textNotification) {
        const modalForm = document.querySelector(".modal__dialog");

        modalForm.classList.add("hide");
        openModal();

        const formNotification = document.createElement("div");

        formNotification.classList.add("modal__dialog");
        formNotification.innerHTML = `
            <div class="modal__content">
                <div class="modal__close" data-close>×</div>
                <div class="modal__title">${textNotification}</div>
            </div>
        `;

        document.querySelector(".modal").append(formNotification);

        setInterval(() => {
            formNotification.remove();
            modalForm.classList.add("show");
            modalForm.classList.remove("hide");
            closeModal();
        }, 4000);
    }

    // Slider

    const current = document.querySelector("#current"),
          total = document.querySelector("#total"),
          slides = document.querySelectorAll(".offer__slide"),
          arrowLeft = document.querySelector(".offer__slider-prev"),
          arrowRight = document.querySelector(".offer__slider-next"),
          offerSlider = document.querySelector(".offer__slider-inner"),
          slidesWrapper = document.querySelector(".offer__slider-wrapper"),
          width = window.getComputedStyle(slidesWrapper).width;

    let slidesCounter = 1,
        offset = 0;

    current.textContent = `0${slidesCounter}`;

    slides.forEach(item => {
        item.style.width = `${+width.slice(0, width.length - 2)}px`;
    });

    offerSlider.style.display = "flex";
    offerSlider.style.width = `${+width.slice(0, width.length - 2) * slides.length}px`;
    offerSlider.style.transition = "0.5s all";

    slidesWrapper.style.overflow = "hidden";

    if (slides.length < 10) {
        total.textContent = `0${slides.length}`;
    } else {
        total.textContent = slides.length;
    }

    arrowLeft.addEventListener("click", () => {
        if (offset == 0) {
            offset = +width.slice(0, width.length - 2) * (slides.length - 1);
        } else {
            offset -= +width.slice(0, width.length - 2);
        }

        offerSlider.style.transform = `translateX(-${offset}px)`;

        if (slidesCounter == 1) {
            slidesCounter = slides.length;
        } else {
            slidesCounter--;
        }

        if (slidesCounter < 10) {
            current.textContent = `0${slidesCounter}`;
        } else {
            current.textContent = slidesCounter;
        }

        dotActive();
    });

    arrowRight.addEventListener("click", () => {
        if (offset == +width.slice(0, width.length - 2) * (slides.length - 1)) {
            offset = 0;
        } else {
            offset += +width.slice(0, width.length - 2);
        }

        offerSlider.style.transform = `translateX(-${offset}px)`;

        if (slidesCounter == slides.length) {
            slidesCounter = 1;
        } else {
            slidesCounter++;
        }

        if (slidesCounter < 10) {
            current.textContent = `0${slidesCounter}`;
        } else {
            current.textContent = slidesCounter;
        }

        dotActive();
    });

    slidesWrapper.style.position = "relative";

    const dotsParent = document.createElement("div");
    slidesWrapper.append(dotsParent);
    dotsParent.classList.add("carousel-indicators");

    for (let i = 0; i < slides.length; i++) {
        const dots = document.createElement("div");
        dotsParent.append(dots);
        dots.classList.add("dot");
    }

    const dots = document.querySelectorAll(".dot");

    function dotActive() {
        dots.forEach(item => {
            item.style.opacity = 0.5;
        });
    
        dots[slidesCounter - 1].style.opacity = 1;
    }

    dotActive();

    dots.forEach(item => {
        item.addEventListener("click", (e) => {
            dots.forEach((item, index) => {
                if (e.target == item) {
                    slidesCounter = index + 1;

                    offset = +width.slice(0, width.length - 2) * (slidesCounter - 1);

                    offerSlider.style.transform = `translateX(-${offset}px)`;

                    if (slidesCounter < 10) {
                        current.textContent = `0${slidesCounter}`;
                    } else {
                        current.textContent = slidesCounter;
                    }

                    dotActive();
                }
            });
        });
    });
});