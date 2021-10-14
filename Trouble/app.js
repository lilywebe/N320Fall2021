class GameState {
    constructor() {
        this.pieces = [];
        this.playerturn = 'red';
        this.roll = 0;
        this.colors = ["red", "yellow", "green", "blue"];
        this.winhappened=false;
        this.wincolor=null;
    }

    winner(){
        var wincounts=[["red",0],["yellow",0],["green",0],["blue",0]];
        //check all pieces positions to see if they are in finishing spaces
        this.pieces.forEach(piece=>{
             if(piece.color=="red"){
                 for(var i=101; i<105; i++){
                     if(piece.position==i){
                         wincounts[0][1]++;
                     }
                 }
             }

             else if(piece.color=="yellow"){
                for(var i=111; i<115; i++){
                    if(piece.position==i){
                        wincounts[1][1]++;
                    }
                }
            }

            else if(piece.color=="green"){
                for(var i=121; i<125; i++){
                    if(piece.position==i){
                        wincounts[2][1]++;
                    }
                }
            }

            else if(piece.color=="blue"){
                for(var i=131; i<135; i++){
                    if(piece.position==i){
                        wincounts[3][1]++;
                    }
                }
            }
        })

        for(var i=0; i<4; i++){

            // i one -- I won
            if(wincounts[i][1]==4){
                this.winhappened=true;
                this.wincolor=wincounts[i][0];
                winnerHappened();
            }
        }

    }

    updateforroll() {
        //maybe shouldnt go here idk
        this.pieces.forEach(piece => {
            if (piece.color == this.playerturn) {
                //find potential moves within the current players pegs
                piece.potentialmovement(this.roll);
                //check if piece overlaps with a piece of the SAME color to eliminate potential movement
                this.pieces.forEach(pieceb => {
                    if (pieceb.color == this.playerturn) {
                        if (piece.potentialmove == pieceb.position) {
                            piece.potentialmove = null;
                        }
                    }
                });
            }

        });

    }

    makemove(position) {
        //check if piece overlaps with a piece of a DIFFERENT COLOR to relocate other piece
        //piece making move gets sent to other pieces home instead of other piece getting sent home
        this.pieces.forEach(piece => { 
            if (piece.position == position){
                this.pieces.forEach(pieceb => {
                    if (pieceb.position == piece.potentialmove){
                        pieceb.position = pieceb.homeposition;
                    }});
                
                piece.position=piece.potentialmove;

            }
        });
        this.makenomove();

    }
    makenomove() {

        //remove potential movements from pieces
        this.pieces.forEach(piece => {
            piece.potentialmove=null;
        });

        //change turn to next player
        var nextturn= this.colors.indexOf(this.playerturn)+1;
        console.log("got here");
        console.log(this.pieces);
        this.playerturn=this.colors[nextturn%4];

    }
    piececreation() {
        var position = 0;
        this.colors.forEach(color => {
            for (var i = 1; i < 5; i++) {
                //use positions that don't line up in order to represent home positions
                //red pieces begin in positions 41-44
                //yellow pieces begin in positions 51-54
                //green pieces begin in positions 61-64
                //blue pieces begin in positions 71-74
                if (color == "red") {
                    position = 40 + i;
                }
                else if (color == "yellow") {
                    position = 50 + i;
                }
                else if (color == "green") {
                    position = 60 + i;
                }
                else if (color == "blue") {
                    position = 70 + i;
                }

                this.pieces.push(new Piece(color, position));
            }
        });
    }
}

class Piece {
    constructor(color, position) {
        this.homeposition=position;
        this.position = position;
        this.color = color;
        this.potentialmove = null;
    }
    potentialmovement(roll) {
        var diff = 0;
        //28 spaces on the board not counting home spaces or finish areas
        //positions in finishing spaces labelled in the 100s
        //check if position is a home space (in the 40s up to 75)
        if (roll == 6 && (this.position > 40 && this.position < 75)) {
            //offer start new peg
            if (this.color == "red") {
                //first position on board is red starting point
                this.potentialmove = 1;
            }
            else if (this.color == "yellow") {
                this.potentialmove = 22;
            }
            else if (this.color == "green") {
                this.potentialmove = 8;

            }
            else if (this.color == "blue") {
                this.potentialmove = 15;

            }
        }
        //finishing space checks

        //check if red can move into finishing spaces 
        //red finishing spaces are 101-104
        else if ((this.color == "red") && ((this.position + roll) > 28 && (this.position + roll) <= 32)) {
            diff = ((this.position + roll) - 28);
            this.potentialmove = 100 + diff;
        }

        //check if green can move into finishing spaces
        //green finishing spaces are 121-124
        else if ((this.color == "green") && ((this.position + roll) > 7 && (this.position + roll) <= 11)&&(this.position<8)) {
            diff = ((this.position + roll) - 7);
            this.potentialmove = 120 + diff;
        }

        //check if blue can move into finishing spaces
        //blue finishing spaces are 131-134
        else if ((this.color == "blue") && ((this.position + roll) > 14 && (this.position + roll) <= 18)&&(this.position<15)) {
            diff = ((this.position + roll) - 14);
            this.potentialmove = 130 + diff;
        }

        //check if yellow can move into finishing spaces
        //yellow finishing spaces are 111-114
        else if ((this.color == "yellow") && ((this.position + roll) > 21 && (this.position + roll) <= 25) &&(this.position<22)) {
            diff = ((this.position + roll) - 21);
            this.potentialmove = 110 + diff;
        }

        //check if piece can't move bc its in start pos
        else if ((roll !== 6) && (this.position > 40 && this.position < 75)) {
            this.potentialmove = null;
        }

        //normal potential movements
        else {
            this.potentialmove = this.position + roll;
        }



    }
}

class View{
    constructor(){
        this.boardpositions = [
            [1,2],[1,3],[1,4],[1,5],[1,6],[1,7],[1,8],
            [2,9],[3,9],[4,9],[5,9],[6,9],[7,9],[8,9],
            [9,8], [9,7],[9,6], [9,5], [9,4], [9,3], [9,2],
            [8,1],[7,1],[6,1],[5,1],[4,1],[3,1],[2,1],
            [10,1],[10,2],[10,3],[10,4],
            [11,1],[11,2],[11,3],[11,4],
            [12,1],[12,2],[12,3],[12,4],
            [13,1],[13,2],[13,3],[13,4],
            [14,1],[14,2],[14,3],[14,4],
            [15,1],[15,2],[15,3],[15,4],
            [16,1],[16,2],[16,3],[16,4],
            [17,1],[17,2],[17,3],[17,4]];
    }

    makeView(gs){    
    var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute('width', '800');
    svg.setAttribute('height', '800');

    if(gs.winhappened==true){

        //win display
    var win= document.createElementNS("http://www.w3.org/2000/svg", "rect");
    win.setAttribute('x', 200);
    win.setAttribute('y', 200);
    win.setAttribute('height', 200);
    win.setAttribute('width', 200);
    win.setAttribute('fill', gs.wincolor);
    //add click event to start new game
    //win.addEventListener('click', ()=>controller.madeNoMove());
    svg.appendChild(win);
    var wintextback= document.createElementNS("http://www.w3.org/2000/svg", "rect");
    wintextback.setAttribute('x', 265);
    wintextback.setAttribute('y', 280);
    wintextback.setAttribute('height', 25);
    wintextback.setAttribute('width', 75);
    wintextback.setAttribute('fill', "white");
    //add click event to start new game
    //win.addEventListener('click', ()=>controller.madeNoMove());
    svg.appendChild(wintextback);

    var wintext = document.createElementNS("http://www.w3.org/2000/svg", "text");
        wintext.setAttribute('x', 275);
        wintext.setAttribute('y', 300);
        wintext.textContent= gs.wincolor+" won!";
        svg.appendChild(wintext);

    }
    else{

    //board positions
    this.boardpositions.forEach(pos => {
        var circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        circle.setAttribute('cx',this.adjust(pos[0]));
        circle.setAttribute('cy', this.adjust(pos[1]));
        circle.setAttribute('r', 10);
        circle.setAttribute('color', "black");
        svg.appendChild(circle);
        
    });

    //whose turn is it
    var turn = document.createElementNS("http://www.w3.org/2000/svg", "text");
    turn.setAttribute('x', 500);
    turn.setAttribute('y', 200);
    //make text color of player's turn if time

    turn.textContent= "It's "+gs.playerturn+"'s turn";
    svg.appendChild(turn);

    //not gonna move button
    var nomove= document.createElementNS("http://www.w3.org/2000/svg", "rect");
    nomove.setAttribute('x', 500);
    nomove.setAttribute('y', 250);
    nomove.setAttribute('height', 50);
    nomove.setAttribute('width', 200);
    nomove.setAttribute('fill', "yellow");
    nomove.addEventListener('click', ()=>controller.madeNoMove());
    svg.appendChild(nomove);
    var movetext = document.createElementNS("http://www.w3.org/2000/svg", "text");
        movetext.setAttribute('x', 530);
        movetext.setAttribute('y', 280);
        movetext.textContent= "Can't make a move";
        svg.appendChild(movetext);



     //buttons
     var randroll = document.createElementNS("http://www.w3.org/2000/svg", "circle");
     var dicepos = [5,5];
     randroll.setAttribute('cx', this.adjust(dicepos[0]));
     randroll.setAttribute('cy', this.adjust(dicepos[1]));
     randroll.setAttribute('r', 30);
     randroll.setAttribute('fill', "yellow");
     var randomroll= Math.floor(Math.random()*6)+1;
     gs.roll=randomroll;
     randroll.addEventListener('click', ()=>this.showRoll(randomroll, svg));
     svg.appendChild(randroll);
    
    
    this.addPiecestoScreen(gs, svg);
    }

    document.getElementById("gameview").innerHTML="";
    document.getElementById("gameview").appendChild(svg);

    }

    addPiecestoScreen(gs, svg){
         //pegs
         gs.pieces.forEach(piece => {
            var circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
            var pos=this.findPosition(piece.position);
            circle.setAttribute('cx',this.adjust(pos[0]));
            circle.setAttribute('cy', this.adjust(pos[1]));
            circle.setAttribute('r', 10);
            circle.setAttribute('fill', piece.color);
            //THIS IS WRONG
            if(piece.potentialmove!=null){
                circle.addEventListener('click', ()=>controller.moveHappened(piece.position));
            }
            svg.appendChild(circle);
            
        });
    }

    showRoll(randomroll, svg){
        var rolltext = document.createElementNS("http://www.w3.org/2000/svg", "text");
        var rollpos=[5,5]
        rolltext.setAttribute('x', this.adjust(rollpos[0]));
        rolltext.setAttribute('y', this.adjust(rollpos[1]));
        rolltext.textContent= randomroll;
        svg.appendChild(rolltext);
        controller.rollHappened(svg);
        



        

    }

    adjust(number){
        return number*40;
    }

    findPosition(position){

        if(position>40 && position<75){
            return this.boardpositions[27+4*Math.floor(position/10-4)+position%10];
        }
        else if(position>100 &&position <135){
            return this.boardpositions[27+16+4*Math.floor(position/10-10)+position%10];
        }
        else{
            return this.boardpositions[position-1];
        }
    }
}

class Controller {
    constructor() {
        //create new game
        this.gs = new GameState();
        this.gs.piececreation();
        this.view = new View();
        this.view.makeView(this.gs);

    }

    rollHappened(svg){
        this.gs.updateforroll();
        this.view.addPiecestoScreen(this.gs, svg);
        console.log(this.gs.pieces);
    }

    moveHappened(position){
        this.gs.makemove(position);
        this.view = new View();
        this.view.makeView(this.gs);
    }

    madeNoMove(){
        this.gs.makenomove();
        this.view = new View();
        this.view.makeView(this.gs);
    }

    winnerHappened(){
        this.gs.makenomove();
        this.view = new View();
        this.view.makeView(this.gs);
    }

}
var controller= new Controller();


//ISSUES TO FIX
//add animations
//add instructions
//blue freaks out at pos 1 and goes to reds home space