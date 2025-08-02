let tipoUsuario = "";
let origen = { departamento: "", ciudad: "" };
let destino = { departamento: "", ciudad: "" };
let dataColombia = [];

// HTML
const btnViajero = document.getElementById("btnViajero");
const btnTransportador = document.getElementById("btnTransportador");

const divTipo = document.getElementById("tipo_usu");
const divOrigen = document.getElementById("ubicacion_origen");
const divDestino = document.getElementById("ubicacion_destino");

const depOrigenSelect = document.getElementById("selec_departamento_origen");
const cityOrigenSelect = document.getElementById("selec_ciudad_origen");
const depDestinoSelect = document.getElementById("selec_departamento_destino");
const cityDestinoSelect = document.getElementById("selec_ciudad_destino");

// Cargar datos del JSON
fetch("data/colombia.json")
  .then(res => res.json())
  .then(data => {
    dataColombia = data;
  })
  .catch(err => console.error("Error cargando JSON:", err));

// Eventos tipo de usuario
btnViajero.addEventListener("click", () => iniciarFlujo("Viajero"));
btnTransportador.addEventListener("click", () => iniciarFlujo("Transportador"));

function iniciarFlujo(tipo) {
  tipoUsuario = tipo;
  divTipo.style.display = "none";
  divOrigen.style.display = "block";

  llenarDepartamentos(depOrigenSelect);
  actualizarCiudades(depOrigenSelect, cityOrigenSelect);

  depOrigenSelect.addEventListener("change", () => {
    actualizarCiudades(depOrigenSelect, cityOrigenSelect);
  });
}

function llenarDepartamentos(select) {
  select.innerHTML = "";
  dataColombia.forEach(dep => {
    const opt = document.createElement("option");
    opt.value = dep.departamento;
    opt.textContent = dep.departamento;
    select.appendChild(opt);
  });
}

function actualizarCiudades(depSelect, citySelect) {
  citySelect.innerHTML = "";
  const seleccionado = dataColombia.find(d => d.departamento === depSelect.value);
  if (seleccionado) {
    seleccionado.ciudades.forEach(ciudad => {
      const opt = document.createElement("option");
      opt.value = ciudad;
      opt.textContent = ciudad;
      citySelect.appendChild(opt);
    });
  }
}

// Paso de origen a destino
document.getElementById("btnOrigenListo").addEventListener("click", () => {
  origen.departamento = depOrigenSelect.value;
  origen.ciudad = cityOrigenSelect.value;

  divOrigen.style.display = "none";
  divDestino.style.display = "block";

  llenarDepartamentos(depDestinoSelect);
  actualizarCiudades(depDestinoSelect, cityDestinoSelect);

  depDestinoSelect.addEventListener("change", () => {
    actualizarCiudades(depDestinoSelect, cityDestinoSelect);
  });
});

// Guardar datos finales
document.getElementById("btnGuardarViaje").addEventListener("click", () => {
  destino.departamento = depDestinoSelect.value;
  destino.ciudad = cityDestinoSelect.value;

  const datosViaje = {
    tipoUsuario,
    origen: { ...origen },
    destino: { ...destino }
  };

  console.log("Datos del viaje:", datosViaje);
  alert("Datos guardados. Mira la consola.");
});
