const resourceGrid = document.getElementById("resourceGrid");
const filters = document.querySelectorAll(".filter");

// Detectăm automat ce fișier de date este încărcat în pagină (gimnaziu, liceuinfo sau liceutic)
function preiaDatele() {
  if (typeof gimnaziu !== "undefined") return gimnaziu;
  if (typeof liceuinfo !== "undefined") return liceuinfo;
  if (typeof liceutic !== "undefined") return liceutic;
  return [];
}

const dateMateriale = preiaDatele();

function afiseazaMateriale(clasaSelectata = "Toate") {
  resourceGrid.innerHTML = "";

  const materialeFiltrate = dateMateriale.filter(
    material => clasaSelectata === "Toate" || material.clasa === clasaSelectata
  );

  if (materialeFiltrate.length === 0) {
    resourceGrid.innerHTML = `<p class="no-results" style="grid-column: 1/-1; color: #8b93a2; padding: 20px 0;">Nu există resurse încărcate pentru această opțiune.</p>`;
    return;
  }

  materialeFiltrate.forEach(material => {
    const article = document.createElement("article");
    article.className = "resource";

    article.innerHTML = `
      <div class="resource-class ${material.culoare}">
        ${material.clasa}
      </div>

      <span class="tag ${material.culoare}-tag">
        ${material.materie ? material.materie.toUpperCase() : 'LABORATOR'}
      </span>

      <h3>${material.titlu}</h3>
      <p>${material.descriere}</p>

      <a href="${material.link}" class="download ${material.culoare}" target="_blank">
        Deschide materialul →
      </a>
    `;

    resourceGrid.appendChild(article);
  });
}

// Event Listeners pentru butoanele de filtru
filters.forEach(filter => {
  filter.addEventListener("click", () => {
    const categorie = filter.dataset.category;

    filters.forEach(button => button.classList.remove("active"));
    filter.classList.add("active");

    afiseazaMateriale(categorie);
  });
});

// Citire Query Param din URL (ex: liceuinfo.html?clasa=IX sau gimnaziu.html?clasa=VII)
const params = new URLSearchParams(window.location.search);
const clasaURL = params.get("clasa");

if (clasaURL) {
  const filtruCorespunzator = document.querySelector(`.filter[data-category="${clasaURL}"]`);

  if (filtruCorespunzator) {
    filters.forEach(button => button.classList.remove("active"));
    filtruCorespunzator.classList.add("active");
    afiseazaMateriale(clasaURL);
  } else {
    afiseazaMateriale();
  }
} else {
  afiseazaMateriale();
}