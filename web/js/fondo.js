document.addEventListener("DOMContentLoaded", function () {

    const bg = document.getElementById("background-layer");
    const aboutSection = document.querySelector(".about-section");

    window.addEventListener("scroll", function () {

        const triggerPoint = aboutSection.offsetTop - window.innerHeight / 2;

        if (window.scrollY > triggerPoint) {
            bg.classList.add("bitmap-mode");
        } else {
            bg.classList.remove("bitmap-mode");
        }

    });

    // Hover en toda la página
    document.body.addEventListener("mouseenter", () => {
        bg.classList.add("dense");
    });

    document.body.addEventListener("mouseleave", () => {
        bg.classList.remove("dense");
    });

});


document.addEventListener("mousemove", (e) => {
  const bg = document.getElementById("background-layer");

  const xPercent = (e.clientX / window.innerWidth) * 100;
  const yPercent = (e.clientY / window.innerHeight) * 100;

  bg.style.setProperty("--mouse-x", `${xPercent}%`);
  bg.style.setProperty("--mouse-y", `${yPercent}%`);
});