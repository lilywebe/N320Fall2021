//Inheritance
//animal, cat, dog
//drink, water, soda




//Encapsulation
//dog -set weight
//person -set height





//Abstraction
//pathagorean theorem
//area of triangle

class Triangle{
    constructor(height, length){
        this.height=height;
        this.length=length;
    }
    area(){
        return this.height*this.length*.5;
    }

}

var tri= new Triangle(4,5);
console.log(tri.area());





//Polymorphism 
//Record, album, single
//Coffee, macchiato, frappucino
