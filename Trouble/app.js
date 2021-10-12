class GameState {
    constructor() {
        this.pieces = [];
        this.playerturn = 'red';
        this.roll = 0;
        this.colors = ["red", "yellow", "green", "blue"];
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
        this.pieces.forEach(piece => {
            if (piece.position == position){
                piece.position=piece.potentialmove;
                this.pieces.forEach(pieceb => {
                    if (pieceb.position == piece.position){
                        pieceb.position = pieceb.homeposition;
                    }});

            }
        });
        this.makenomove();

    }
    makenomove() {

        //remove potential movements from pieces
        this.pieces.forEach(piece => {
            piece.potentialmovement=null;
        });

        //change turn to next player
        var nextturn= this.colors.indexOf(this.playerturn)+1;
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
        else if ((this.color == "green") && ((this.position + roll) > 7 && (this.position + roll) <= 11)) {
            diff = ((this.position + roll) - 7);
            this.potentialmove = 120 + diff;
        }

        //check if blue can move into finishing spaces
        //blue finishing spaces are 131-134
        else if ((this.color == "blue") && ((this.position + roll) > 14 && (this.position + roll) <= 18)) {
            diff = ((this.position + roll) - 14);
            this.potentialmove = 130 + diff;
        }

        //check if yellow can move into finishing spaces
        //yellow finishing spaces are 111-114
        else if ((this.color == "yellow") && ((this.position + roll) > 21 && (this.position + roll) <= 25)) {
            diff = ((this.position + roll) - 21);
            this.potentialmove = 110 + diff;
        }

        //check if piece can't move bc its in start pos
        else if ((roll !== 6) && (this.position > 40 && this.position < 75)) {
            this.potentialmovement = null;
        }

        //normal potential movements
        else {
            this.potentialmovement = this.position + roll;
        }



    }
}

class View{
    constructor(){
        this.boardpositions = [
            [1,1],[1,2],[1,3],[1,4],[1,5],[1,6],[1,7],
            [2,8],[3,8],[4,8],[5,8],[6,8],[7,8],[8,8],
            [9,7], [9,6],[9,5], [9,4], [9,3], [9,2], [9,1],
            [8,0],[7,0],[6,0],[5,0],[4,0],[3,0],[2,0],
            [10,0],[10,1],[10,2],[10,3],
            [11,0],[11,1],[11,2],[11,3],
            [12,0],[12,1],[12,2],[12,3],
            [13,0],[13,1],[13,2],[13,3],
            [14,0],[14,1],[14,2],[14,3],
            [15,0],[15,1],[15,2],[15,3],
            [16,0],[16,1],[16,2],[16,3],
            [17,0],[17,1],[17,2],[17,3]];
    }

    makeView(gs){    
    var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute('width', '800');
    svg.setAttribute('height', '800');
    this.boardpositions.forEach(pos => {
        var circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        circle.setAttribute('cx',this.adjust(pos[0]));
        circle.setAttribute('cy', this.adjust(pos[1]));
        circle.setAttribute('r', 10);
        circle.setAttribute('color', "black");
        svg.appendChild(circle);
        
    });

    //pegs
    gs.pieces.forEach(piece => {
        var circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        var pos=this.findPosition(piece.position);
        circle.setAttribute('cx',this.adjust(pos[0]));
        circle.setAttribute('cy', this.adjust(pos[1]));
        circle.setAttribute('r', 10);
        circle.setAttribute('fill', piece.color);
        svg.appendChild(circle);
        
    });

   
    //buttons
    var randroll = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    var dicepos = [200,150];
    randroll.setAttribute('cx', dicepos[0]);
    randroll.setAttribute('cy', dicepos[1]);
    randroll.setAttribute('r', 30);
    randroll.setAttribute('fill', "yellow");
    var randomroll= Math.floor(Math.random()*6)+1;
    randroll.setAttribute('onclick', () => this.showRoll(randomroll, svg));
    svg.appendChild(randroll);


    document.getElementById("gameview").innerHTML="";
    document.getElementById("gameview").appendChild(svg);

    }

    showRoll(randomroll, svg){
        var rolltext = document.createElementNS("http://www.w3.org/2000/svg", "text");
        rolltext.setAttribute('x', 200);
        rolltext.setAttribute('y', 150);
        rolltext.setAttribute('textContent', randomroll);
        svg.appendChild(rolltext);



        

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
}
var controller= new Controller();