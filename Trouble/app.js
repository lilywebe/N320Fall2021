class GameState{
constructor(){
    this.pieces=[];
    this.playerturn='';
    this.roll=0;
    this.colors=["red", "yellow", "green", "blue"];
}
updateforroll(){

}
makemove(){

}
makenomove(){

}
piececreation(){
    var position=0;
this.colors.forEach(color => {
    for(var i=1; i<5; i++){
        //use positions that don't line up in order to represent home positions
        //red pieces begin in positions 41-44
        //yellow pieces begin in positions 51-54
        //green pieces begin in positions 61-64
        //blue pieces begin in positions 71-74
        if(color=="red"){
            position = 40+i;
        }
        else if(color=="yellow"){
            position = 50+i;
        }
        else if(color=="green"){
            position = 60+i;
        }
        else if(color=="blue"){
            position = 70+i;
        }
        
        this.pieces.push(new Piece(color,position));
    }
});
}
}

class Piece extends GameState{
constructor(color, position){
    this.position=position;
    this.color=color;
    this.potentialmove=0;
}
potentialmovement(roll){
    //28 spaces on the board not counting home spaces or finish areas
    //positions in finishing spaces labelled in the 100s
    //check if position is a home space (in the 40s up to 75)
    if(roll==6 && (this.position>40 && this.position<75)){
        //offer start new peg
        if(this.color=="red"){
            //first position on board is red starting point
            this.potentialmove=1;
        }
        else if(this.color=="yellow"){
            this.potentialmove=22;
        }
        else if(this.color=="green"){
            this.potentialmove=8;

        }
        else if(this.color=="blue"){
            this.potentialmove=15;

        }
    }


}
}

class Controller extends GameState{
    constructor(){
        //create new game
        gs=new GameState();

    }
}