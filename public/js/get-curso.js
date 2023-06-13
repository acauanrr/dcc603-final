const divCurso = document.querySelector("#curso");

function read_cookie(name) {
  var result = document.cookie.match(new RegExp(name + "=([^;]+)"));
  result && (result = JSON.parse(result[1]));
  return result;
}

console.log("id do curso: " + read_cookie("cursoid"));

async function consultaCurso() {
  let cursoid = read_cookie("cursoid");
  console.log("Aquiiiii"+cursoid)
  const response = await fetch(
    `http://localhost:3000/cursos/pagejson/${cursoid}`
  );
  const curso = await response.json();
  preencheTela(curso);
  console.log(curso);
}

function preencheTela(curso) {
  const novoCursoHTML = `<div class="card-curso">
    <div class="card-image-curso">
      <img
        src="/images/cards/${curso.image}"
        width="100%"
        alt="SGC logo"
      />
    </div>
    <div class="card-content-curso">
      <h2 class="card-title-curso">${curso.name}</h2>
      <div>
        <span class="card-content-curso-word">Descição: </span>
        <span
          >${curso.description}</span
        >
      </div>
      <div>
        <span class="card-content-curso-word">Data de Inicio: </span>
        <span>${curso.date_start}</span>
      </div>
      <div>
        <span class="card-content-curso-word">Tags: </span>
        <span>${curso.tags}</span>
      </div>
    </div>

    <div class="card-footer-curso">
      <button type="button" class="action-curso">Inscrever-se</button>
    </div>
  </div>
    `;
  divCurso.innerHTML = divCurso.innerHTML + novoCursoHTML;
}

consultaCurso();
