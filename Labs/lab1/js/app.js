class RainDrop {
    //this class is for describing the rain drops
    constructor(){
        this.rx=Math.random()*400;
        this.ry=0;
        this.speed=3+ Math.random()*2;
    } 
    //move raindrop vertically
   update(){
        this.ry+=this.speed;
    }
    //draw rain drops
    drawthis(){
        noStroke();
        fill([179, 217, 255]);
        triangle(this.rx-5, this.ry, this.rx+5, this.ry, this.rx, this.ry-20);
        circle(this.rx, this.ry, 10);
    }
}

class RainManager{
    //create array of drops and set update to update every other time
    constructor(){
        this.drops=[];
        this.updatecount=2;
    }
    update(){
        //update to create a raindrop every other time
        if(this.updatecount==2){
            this.drops.push(new RainDrop());
            this.updatecount=0; 
        }
        this.updatecount++;
        //update every drop and check if it hit the ground
        //if hit, delete from list and make ground wetter
        this.drops.forEach(drop => {
            drop.update();
            if(drop.ry>=250){
                this.drops.splice(this.drops.indexOf(drop),1);
                theGround.makeWetter();
            }
            
        });
    
    }
    //draw each drop
    drawthis(){
        this.drops.forEach(drop => {
            drop.drawthis();
            
        });
    }
    
}

class Ground{
    constructor(){
        //start wetness at 5%
        this.wetness=5;
        this.raincount=0;
    }
    //update wetness to reflect number of raindrops to have hit the ground
    makeWetter(){
        this.raincount++;
        if(this.raincount==10){
            if(this.wetness<100){
            this.wetness+=5;
            }
            this.raincount=0;
        }
    }
    //draw ground with wetness assigned by makeWetter
    drawthis(){
        fill([0,255,255*this.wetness/100]);
        rect(0,200,400,100);
    }
}

function setup(){
 createCanvas(400,300);

}

var theGround= new Ground();
var rainManagement = new RainManager();

function draw(){
    
    background(0,0,100);
    theGround.drawthis();
    rainManagement.update();
    rainManagement.drawthis();


    
}

