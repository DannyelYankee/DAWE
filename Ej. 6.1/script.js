var canvas = document.getElementById("lienzo");
      var context = canvas.getContext("2d");
      var logo = new Image();

      function imagen(x, y) {
        logo.src = "./spritesheet.png";
        logo.onload = function () {
          context.drawImage(logo, 0, 0);
          if (x < 448 && y < 444) {
            cuadradoRojo(context, x, y);
            zoom(logo, context);
            context.stroke();
            zoom(x, y);
            flechas(context, x, y);
          }
        };
      }

      function cuadradoRojo(context, x, y) {
        context.lineWidth = 2;
        context.strokeStyle = "red";
        console.log(x, y);
        context.strokeRect(x, y, 28, 36);
        context.stroke();
        posicion(context, x, y);
      }
      function posicion(context, x, y) {
        context.font = "10px Arial";
        context.fillStyle = "red";
        context.fillText("(" + x + ", " + y + ")", 430, 10);
      }
      function zoom(x, y) {
        let canvas = document.getElementById("lienzo");
        let context = canvas.getContext("2d");
        let logo = new Image();
        logo.src = "./spritesheet.png";
        logo.onload = function () {
          context.drawImage(logo, x, y, 28, 38, 480, 0, 56, 75);
        };
      }
      function flechas(context, x, y) {
        var keys = {};
        window.addEventListener(
          "keydown",
          function (e) {
            keys[e.keyCode] = true;
            switch (e.keyCode) {
              case 37:
                e.preventDefault();
                if (x != 0) {
                  imagen(x - 1, y);
                }
                break;
              case 39:
                e.preventDefault();
                if (x != 447) {
                  imagen(x + 1, y);
                }
                break;
              case 38:
                e.preventDefault();
                if (y != 0) {
                  imagen(x, y - 1);
                }
                break;
              case 40:
                e.preventDefault();
                if (y != 443) {
                  imagen(x, y + 1);
                }
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
          true
        );
      }
      imagen(0, 0);