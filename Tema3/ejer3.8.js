class ArrayOrdenado {
  constructor(comparador) {
    this.comparador = comparador;
    this.contenido = [];
  }
  insert(num) {
    console.log(this.contenido);
    let pos = this.contenido.findIndex(x => x > num);
    this.contenido.splice(pos,0,num);
  }
}
