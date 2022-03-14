/*const almacen = [
    { tipo: "lavadora", valor: 5000 },
    { tipo: "lavadora", valor: 650 },
    { tipo: "vaso", valor: 10 },
    { tipo: "armario", valor: 1200 },
    { tipo: "lavadora", valor: 77 },
  ];
  */
  let totalValorLavadorasArrow = almacen
    .filter(item =>  {
      return item.tipo === "lavadora";
    }).reduce(function(total,almacen){
      return total += almacen.valor;
    },0);
  