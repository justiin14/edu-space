const menuBtn = document.getElementById("menuBtn");


if (menuBtn) {

  menuBtn.addEventListener("click", () => {

    const nav = document.querySelector(".nav nav");

    nav.style.display =
      nav.style.display === "flex"
        ? "none"
        : "flex";

    nav.style.position = "absolute";
    nav.style.top = "76px";
    nav.style.left = "0";
    nav.style.right = "0";
    nav.style.padding = "20px";
    nav.style.background = "#fff";
    nav.style.flexDirection = "column";
    nav.style.boxShadow = "0 10px 25px #0001";
  });
}
