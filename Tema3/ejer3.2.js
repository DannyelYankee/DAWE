class Locutor{
    constructor(nombre,verbo){
        this.nombre = nombre;
        this.verbo = verbo || "dice";
    }
    dice(text){
        console.log(this.nombre + " " + this.verbo + " '" + text + "'")

    }
}

class Feriante extends Locutor{
    dice(text){
        let upperText = text.toUpperCase();        
        return super.dice(upperText);
    }
}