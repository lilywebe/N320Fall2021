class RainDrop {
    //this class is for describing the rain drops
    constructor(){
        this.rx=Math.random()*400;
        this.ry=0;
        this.speed=3+ Math.random()*2;
    } 

   update(){
        this.ry+=this.speed;
    }

    drawthis(){
        noStroke();
        fill([179, 217, 255]);
        triangle(this.rx-5, this.ry, this.rx+5, this.ry, this.rx, this.ry-20);
        circle(this.rx, this.ry, 10);
    }
}

class RainManager{
    //this class takes the raindrop description and makes many of them
    //also it finds when they've hit the ground
    constructor(){
        this.drops=[];
        this.updatecount=2;
    }
    update(){
        if(this.updatecount==2){
            this.drops.push(new RainDrop());
            this.updatecount=0; 
        }
        this.updatecount++;
        this.drops.forEach(drop => {
            drop.update();
            if(drop.ry>=250){
                this.drops.splice(this.drops.indexOf(drop),1);
                theGround.makeWetter();
            }
            
        });
    
    }
    drawthis(){
        this.drops.forEach(drop => {
            drop.drawthis();
            
        });
    }
    
}

class Ground{
    //this class is for describing the ground
    //turns bluer whenever 10 raindrops hit it
    constructor(){
        this.wetness=0;
        this.raincount=0;
    }
    makeWetter(){
        this.raincount++;
        if(this.raincount==10){
            this.wetness++;
            this.raincount=0;
        }
    }
    drawthis(){
        fill([0,255,255*Math.atan(this.wetness/50)]);
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

