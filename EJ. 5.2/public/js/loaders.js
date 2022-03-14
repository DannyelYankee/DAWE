import Level from "./Level.js";
import SpriteSheet from "./SpriteSheet.js";
import { createBackgroundLayer } from "./layers.js";

export function loadImage(url) {
  // código del ejercicio 3
  return new Promise((resolve) => {
    const image = new Image();
    image.addEventListener("load", () => {
      resolve(image);
    });
    image.src = url;
  });
}

function loadJSON(url) {
  // código del ejercicio 2
  return fetch(url).then((r) => r.json());
}

function createTiles(level, backgrounds) {
  // código del ejercicio 5
  for (var i = 0; i < backgrounds.length; i++) {
    for (var j = 0; j < backgrounds[i].ranges.length; j++) {
      var rango = backgrounds[i].ranges[j];
      for (var x = rango[0]; x < rango[0] + rango[1]; x++) {
        for (var y = rango[2]; y < rango[2] + rango[3]; y++) {
          level.tiles.set(x, y, {
            name: backgrounds[i].tile,
          });
        }
      }
    }
  }
}

function loadSpriteSheet() {
  // código del ejercicio 4;
  return loadJSON("./sprites/sprites.json")
    .then((sheetSpec) =>
      Promise.all([sheetSpec, loadImage(sheetSpec["imageURL"])])
    )
    .then(([sheetSpec, image]) => {
      const sprites = new SpriteSheet(
        image,
        sheetSpec["tileW"],
        sheetSpec["tileH"]
      );
      for (var i = 0; i < sheetSpec["tiles"]["length"]; i++) {
        sprites.defineTile(
          sheetSpec["tiles"][i]["name"],
          sheetSpec["tiles"][i]["index"][0],
          sheetSpec["tiles"][0]["index"][1]
        );
      }
      return sprites;
    });
}
export function loadLevel() {
  return loadJSON("./levels/level.json") // qué tiles hay que poner y dónde dentro de este nivel
    .then((levelSpec) =>
      Promise.all([
        levelSpec,
        loadSpriteSheet(), // cargar imágenes de un spritesheet como sprites
      ])
    )
    .then(([levelSpec, backgroundSprites]) => {
      const level = new Level();
      createTiles(level, levelSpec.backgrounds); // desplegar tiles en la estrucura Matrix

      const backgroundLayer = createBackgroundLayer(level, backgroundSprites); // cargar canvas
      level.background = backgroundLayer; // canvas buffer

      return level;
    });
}
