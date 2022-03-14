var efecto = null;
var clip = "video/demovideo1"; // nombre del vídeo, sin extensión
var pausado = false;
window.onload = function() {
    var video = document.getElementById("video");
    var botonByN = document.getElementById("byn");
    botonByN.onclick = cambiarEfecto;
    var botonNormal = document.getElementById("normal");
    botonNormal.onclick = cambiarEfecto;
    var botonScifi = document.getElementById("scifi");
    botonScifi.onclick = cambiarEfecto;

    var botonRotar = document.getElementById("rotar");
    botonRotar.onclick = loopRotar;

    var botonAudio = document.getElementById("audio");
    botonAudio.onclick = cambiarEfecto;

    var botonPip = document.getElementById("pip");
    botonPip.addEventListener("click", async function() {
        botonPip.disabled = true;

        try {
            if (video !== document.pictureInPictureElement) {
                await video.requestPictureInPicture();
            } else {
                await document.exitPictureInPicture();
            }
        } catch (error) {} finally {
            botonPip.disabled = false;
        }
    });

    video.addEventListener("play", procesarFrame, false);

    video.src = clip + getFormatExtension();
    video.load();

    video.play();
};

function cambiarEfecto(e) {
    var id = e.target.getAttribute("id");
    if (id == "byn") {
        efecto = byn;
    } else if (id == "scifi") {
        efecto = scifi;
        console.log("scifi");
    } else if (id == "audio") {
        efecto = audio;
    } else {
        efecto = null;
    }
}

function pausarVideo() {
    console.log(pausado);
    let boton = document.getElementById("pausa");
    if (!pausado) {
        video.pause();
        boton.value = "Reanuda";
        pausado = true;
    } else {
        video.play();
        boton.value = "Pausa";
        pausado = false;
    }
}

function audio() {
    /* FALTA ARREGLAR */
    console.log("audio");
    loadAudio("audio/soundtrack.mp3").then((audio) => audio.play());
}

function rotar() {
    console.log("rotar");
    /* FALTA ARREGLAR */
    var bufferCanvas = document.getElementById("buffer");
    var displayCanvas = document.getElementById("display");
    var context = bufferCanvas.getContext("2d");
    var display = displayCanvas.getContext("2d");

    var canvasWidth = context.width;
    var canvasHeight = context.height;


    context.translate(canvasWidth / 2, canvasWidth / 2);
    display.translate(canvasWidth / 2, canvasWidth / 2);

    context.rotate(Math.PI / 180);
    display.rotate(Math.PI / 180);

    context.translate(-canvasWidth / 2, -canvasWidth / 2);
    display.translate(-canvasWidth / 2, -canvasWidth / 2);


}

function loopRotar() {
    setInterval(rotar, 100);
}
//
function scifi(pos, r, g, b, data) {
    var offset = pos * 4;
    data[offset] = Math.round(255 - r);
    data[offset + 1] = Math.round(255 - g);
    data[offset + 2] = Math.round(255 - b);
}

function getFormatExtension() {
    var video = document.getElementById("video");
    if (video.canPlayType("video/mp4") != "") {
        return ".mp4";
    } else if (video.canPlayType("video/ogg") != "") {
        return ".ogv";
    } else if (video.canPlayType("video/webm") != "") {
        return ".webm";
    }
}

function procesarFrame(e) {
    var video = document.getElementById("video");

    if (video.paused || video.ended) {
        return;
    }

    var bufferCanvas = document.getElementById("buffer");
    var displayCanvas = document.getElementById("display");
    var buffer = bufferCanvas.getContext("2d");
    var display = displayCanvas.getContext("2d");

    buffer.drawImage(video, 0, 0, bufferCanvas.width, bufferCanvas.height);
    var frame = buffer.getImageData(
        0,
        0,
        bufferCanvas.width,
        bufferCanvas.height
    );
    var length = frame.data.length / 4;

    for (var i = 0; i < length; i++) {
        var r = frame.data[i * 4 + 0];
        var g = frame.data[i * 4 + 1];
        var b = frame.data[i * 4 + 2];
        if (efecto) {
            efecto(i, r, g, b, frame.data);
        }
    }
    display.putImageData(frame, 0, 0);

    setTimeout(procesarFrame, 0);
    // en los navegadores modernos, es mejor usar :
    // requestAnimationFrame(procesarFrame);
}

function byn(pos, r, g, b, data) {
    var gris = (r + g + b) / 3;

    data[pos * 4 + 0] = gris;
    data[pos * 4 + 1] = gris;
    data[pos * 4 + 2] = gris;
}

function loadAudio(url) {
    return new Promise((resolve) => {
        var audio = new Audio(url);
        audio.addEventListener("canplaythrough", () => {
            resolve(audio);
        });
    });
}