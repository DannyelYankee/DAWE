export function createBackgroundLayer(level, sprites) {
  const buffer = document.createElement("canvas");
  buffer.width = 2048;
  buffer.height = 240;
  const context = buffer.getContext("2d");

  // ejercicio 8 (Tema 5: Canvas)
  // Por cada tile del level situado en x,y
  // dibujar dicho tile en el contexto de buffer, haciendo uso del método drawTile del objeto sprites
  for(let i = 0; i < level.length; i++){
      for(let j = 0; j < level[i].length; j++){
        sprites.drawTiles(level[i][j].name,context,i,j);
      }
  }
  return buffer;
}
