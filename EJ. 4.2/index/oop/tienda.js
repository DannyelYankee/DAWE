import Producto from './productos.js';

let lib1 = new Producto("Dublinés", "Alfonso Zapico", 18);
let lib2 = new Producto("El arte de volar", "Antonio Altarriba y Kim", 20.9);
let lib3 = new Producto("Próxima estación: Esperanza", "Manu Chao", 15);


export const tienda = [];
tienda.push(lib1);
tienda.push(lib2);
tienda.push(lib3);
