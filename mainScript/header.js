const header = document.getElementById("header");
    window.addEventListener("scroll", () => {
    if (window.scrollY > 10) {
        header.classList.add("backdrop-blur-sm", "bg-neutral-900/30");
    } else {
        header.classList.remove("backdrop-blur-sm", "bg-neutral-900/30");
    }
    });

const burger = document.getElementById("burger");
  const menu = document.getElementById("menu");

  burger.addEventListener("click", () => {
    menu.classList.toggle("hidden");
  });