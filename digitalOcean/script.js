export default class Gestor {
  constructor() {}
  flechas() {
    var keys = {};
    window.addEventListener(
      "keydown",
      function (e) {
        keys[e.keyCode] = true;
        switch (e.keyCode) {
          case 37:
            this.alert("Has pulsado la flecha izquierda");
            e.preventDefault()
            break;
          case 39:
            this.alert("Has pulsado la flecha derecha");
            e.preventDefault()
            break;
          case 38:
            this.alert("Has pulsado la flecha de arriba");
            e.preventDefault()
            break;
          case 40:
            this.alert("Has pulsado la flecha de abajo");
            e.preventDefault()
            break;
          default:
            break; // do not block other keys
        }
      },
      false
    );
    window.addEventListener(
      "keyup",
      function (e) {
        keys[e.keyCode] = false;
      },
      false
    );
  }
}
