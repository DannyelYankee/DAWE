class Punto{
    constructor(x,y){
        this.x = x;
        this.y = y;
    }
    get xCoordenate(){
        return this.x;
    }
    get yCoordenate(){
        return this.y;
    }
    suma (punto){
        let newX = this.x + punto.xCoordenate;
        let newY = this.y + punto.yCoordenate;
        return new Punto(newX, newY);
    }
}