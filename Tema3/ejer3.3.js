function Punto(x,y){
    this.x = x;
    this.y = y;

    this.suma = function(punto){
        return new Punto(this.x + punto.x, this.y + punto.y);
    }

    
}