document.addEventListener("DOMContentLoaded", () => {
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
});