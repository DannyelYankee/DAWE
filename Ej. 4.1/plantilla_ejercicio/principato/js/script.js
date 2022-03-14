function inicializarGestores() {
  var imagen = document.getElementById("imagen");
  imagen.onclick = function () {
    clearInterval(reloj);
  };
  var usuario = document.getElementById("usuario");
  usuario.value = "tu@email";

  usuario.onblur = function () {
    if (usuario.value == "") {
      usuario.value = "tu@email";
    }
  };

  usuario.onfocus = function () {
    if (usuario.value == "tu@email") {
      usuario.value = "";
    }
  };

  var item = document.getElementById("combobox");
  item.addEventListener("change", gestorCombo);

  function gestorCombo() {
    console.log(item.value);
    console.log(item.options[item.selectedIndex].text);
    console.log(item.selectedIndex);
  }

  var formulario = document.getElementById("formulario");
  formulario.onsubmit = function () {
    console.log("click en submit");
    return false;
  };
  var num = 0;
  var imagenes = [
    "imagenes/limon.jpg",
    "imagenes/fresas.jpg",
    "imagenes/mandarinas.jpg",
    "imagenes/manzanas.jpg",
    "imagenes/melon.jpg",
    "images/heade_ft.jpg",
  ];
  function cambiarImagen() {
    num = num;
    var imagen = document.getElementById("imagen");
    imagen.style.backgroundImage = "url("+imagenes[num]+")";
    if (num == imagenes.length - 1) {
      num = 0;
    } else {
      num++;
    }
  }
  cambiarImagen(); //Para evitar el delay de la primera llamada.
  var reloj = setInterval(cambiarImagen, 5000);
}

window.onload = inicializarGestores;
