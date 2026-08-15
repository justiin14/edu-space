const resourceGrid = document.getElementById("resourceGrid");
const filters = document.querySelectorAll(".filter");


function afiseazaMateriale(categorie = "Toate") {

  resourceGrid.innerHTML = "";

  const materialeFiltrate = materiale.filter(
    material =>
      categorie === "Toate" ||
      material.materie === categorie
  );

  materialeFiltrate.forEach(material => {

    const article = document.createElement("article");

    article.className = "resource";

    article.innerHTML = `
      <div class="resource-class ${material.culoare}">
        ${material.clasa}
      </div>

      <span class="tag ${material.culoare}-tag">
        ${material.materie.toUpperCase()}
      </span>

      <h3>
        ${material.titlu}
      </h3>

      <p>
        ${material.descriere}
      </p>

      <a
        href="${material.link}"
        class="download"
        target="_blank"
      >
        Deschide materialul →
      </a>
    `;

    resourceGrid.appendChild(article);
  });
}


filters.forEach(filter => {

  filter.addEventListener("click", () => {

    const categorie = filter.dataset.category;

    filters.forEach(button => {
      button.classList.remove("active");
    });

    filter.classList.add("active");

    afiseazaMateriale(categorie);
  });
});


const params = new URLSearchParams(window.location.search);
const materieSelectata = params.get("materie");


if (materieSelectata) {

  const filtru = document.querySelector(
    `.filter[data-category="${materieSelectata}"]`
  );

  if (filtru) {

    filters.forEach(button => {
      button.classList.remove("active");
    });

    filtru.classList.add("active");

    afiseazaMateriale(materieSelectata);

  } else {

    afiseazaMateriale();

  }

} else {

  afiseazaMateriale();

}
