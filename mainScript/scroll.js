const sections = document.querySelectorAll("section");
let current = 0;
let isScrolling = false;

function scrollToSection(index) {
  if (index >= 0 && index < sections.length) {
    isScrolling = true;
    sections[index].scrollIntoView({ behavior: "smooth" });
    setTimeout(() => { isScrolling = false; }, 1000); 
  }
}

window.addEventListener("wheel", (e) => {
  if (isScrolling) return;

  if (e.deltaY > 0) { 
    current++;
  } else {         
    current--;
  }

  current = Math.max(0, Math.min(sections.length - 1, current));
  scrollToSection(current);
});

