/* postits.js
 *
 */

window.onload = init;

if (localStorage.getItem("numPostits") == null) {
    localStorage.setItem("numPostits", 0);
}


function init() {
    var button = document.getElementById("add_button");
    button.onclick = createSticky;
    var btn_delete = document.getElementById("delete_button");
    btn_delete.onclick = clearStickyNotes;
    // EJERCICIO A
    // cargar las notas postit de localStorage  
    // cada nota se guarda como un par así: postit_X = texto_de_la_nota
    // donde X es el número de la nota
    // por cada una de ellas, llamar al método
    // addStickyToDOM(texto_de_la_nota);
    let i = 1;
    let total = localStorage.getItem("numPostits");
    console.log(total)
    while (i <= total) {
        let nombre = "postit_" + i;
        let postit = localStorage.getItem(nombre);
        addStickyToDOM(postit);
        i++;
    }


    var espacio = document.getElementById("espacio");
    espacio.innerHTML = getSize() + " KB";

}

function getSize() {
    let _lsTotal = 0,
        _xLen, _x;
    for (_x in localStorage) {
        if (!localStorage.hasOwnProperty(_x)) continue;
        _xLen = (localStorage[_x].length + _x.length) * 2;
        _lsTotal += _xLen;
    }
    return (_lsTotal / 1024).toFixed(2);
}

function createSticky() {
    var value = document.getElementById("note_text").value;
    var numPostits = parseInt(localStorage.getItem("numPostits"));
    numPostits++;
    var nombre = "postit_" + numPostits;

    // EJERCICIO B
    // crear la nota con nombre postit_X, donde X es un número entero
    // (postit_1, postit_2, ...)  y guardarla en el localStorage
    localStorage.setItem(nombre, value);
    localStorage.setItem("numPostits", numPostits);
    addStickyToDOM(value);
    var espacio = document.getElementById("espacio");
    espacio.innerHTML = getSize() + " KB";
}


function addStickyToDOM(value) {
    var stickies = document.getElementById("stickies");
    var postit = document.createElement("li");
    var span = document.createElement("span");
    span.setAttribute("class", "postit");
    span.innerHTML = value;
    postit.appendChild(span);
    stickies.appendChild(postit);
}

function clearStickyNotes() {
    // EJERCICIO C
    // Crear un nuevo botón en la ventana de postit notes que al pulsarlo,
    // elimine las notas de pantalla y de localStorage
    // Algoritmo:	
    // obtener una referencia a la capa "stickies"
    // recorrer los hijos (childNodes) de esa referencia,
    // eliminándolos uno a uno (removeChild)

    for (let i = 1; i <= parseInt(localStorage.getItem("numPostits")); i++) {
        localStorage.removeItem("postit_" + i)
    }
    localStorage.setItem("numPostits", 0);

    var stickies = document.getElementById("stickies");
    while (stickies.firstChild) {
        stickies.removeChild(stickies.firstChild);
    }
    var espacio = document.getElementById("espacio");
    espacio.innerHTML = getSize() + " KB";
}