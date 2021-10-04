class GameState{
constructor(){
    this.pieces=[];
    this.playerturn='';
    this.roll=0;
    this.colors=["red", "yellow", "green", "blue"];
}
updateforroll(){
        //maybe shouldnt go here idk
        this.pieces.forEach(piece => {
            if(piece.color==this.playerturn){
                //find potential moves within the current players pegs
                //check if piece overlaps with a piece of a DIFFERENT COLOR to relocate other piece
                //check if piece overlaps with a piece of the SAME color to eliminate potential movement
            }
            
        });

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

class Piece{
constructor(color, position){
    this.position=position;
    this.color=color;
    this.potentialmove=0;
    this.startingpositions=[1,8,15,22];
}
potentialmovement(roll){
    var diff=0;
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
    //finishing space checks

    //check if red can move into finishing spaces 
    //red finishing spaces are 101-104
    else if((this.color=="red")&&((this.position + roll)>28&&(this.position+roll)<=32)){
        diff=((this.position+roll)-28);
        this.potentialmove=100+diff;
    }

    //check if green can move into finishing spaces
    //green finishing spaces are 121-124
    else if((this.color=="green")&&((this.position + roll)>7&&(this.position+roll)<=11)){
        diff=((this.position+roll)-7);
        this.potentialmove=120+diff;
    }

     //check if blue can move into finishing spaces
     //blue finishing spaces are 131-134
     else if((this.color=="blue")&&((this.position + roll)>14&&(this.position+roll)<=18)){
        diff=((this.position+roll)-14);
        this.potentialmove=130+diff;
    }

     //check if yellow can move into finishing spaces
     //yellow finishing spaces are 111-114
     else if((this.color=="yellow")&&((this.position + roll)>21&&(this.position+roll)<=25)){
        diff=((this.position+roll)-21);
        this.potentialmove=110+diff;
    }

    //normal potential movements
    else{
        this.potentialmovement=this.position+roll;
    }
    


}
}

class Controller{
    constructor(){
        //create new game
        this.gs=new GameState();
        this.gs.piececreation();

    }
}