const el = document.getElementById("fade");

setTimeout(() => {
  el.classList.remove("opacity-0");
  el.classList.add("opacity-100");
}, 500); 
