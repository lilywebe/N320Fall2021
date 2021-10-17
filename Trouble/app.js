class GameState {
    constructor() {
        this.pieces = [];
        this.playerturn = 'red';
        this.roll = 0;
        this.colors = ["red", "yellow", "green", "blue"];
        this.winhappened = false;
        this.wincolor = null;
        this.click = false;
        this.oldpotential = null;
    }

    //save the piece that is moving's last move as a temp variable
    lastMovement(position) {
        this.pieces.forEach(piece => {
            if (piece.position == position) {
                this.oldpotential = piece.potentialmove;
            }

        })
    }

    //determine if anyone has all four pieces in the finishing spaces
    //to test winner without playing, set wincolor to one of the available colors and winhappened to true
    winner() {
        var wincounts = [["red", 0], ["yellow", 0], ["green", 0], ["blue", 0]];
        //check every piece against color
        this.pieces.forEach(piece => {
            //if piece is red and in finishing position add to win count
            if (piece.color == "red") {
                for (var i = 101; i < 105; i++) {
                    if (piece.position == i) {
                        wincounts[0][1]++;
                    }
                }
            }
            //if piece is yellow and in finishing position add to win count
            else if (piece.color == "yellow") {
                for (var i = 111; i < 115; i++) {
                    if (piece.position == i) {
                        wincounts[1][1]++;
                    }
                }
            }
            //if piece is green and in finishing position add to win count
            else if (piece.color == "green") {
                for (var i = 121; i < 125; i++) {
                    if (piece.position == i) {
                        wincounts[2][1]++;
                    }
                }
            }
            //if piece is blue and in finishing position add to win count
            else if (piece.color == "blue") {
                for (var i = 131; i < 135; i++) {
                    if (piece.position == i) {
                        wincounts[3][1]++;
                    }
                }
            }
        })

        for (var i = 0; i < 4; i++) {

            // if any of the wincounts are equal to four (all pegs in finishing spaces) declare a winner
            if (wincounts[i][1] == 4) {
                this.winhappened = true;
                this.wincolor = wincounts[i][0];
                winnerHappened();
            }
        }

    }

    updateforroll() {
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
        //check every pieces position
        this.pieces.forEach(piece => {
            if (piece.position == position) {
                //against every other pieces position
                this.pieces.forEach(pieceb => {
                    //check if piece overlaps with a piece of a DIFFERENT COLOR to relocate other piece
                    if (pieceb.position == piece.potentialmove) {
                        pieceb.position = pieceb.homeposition;
                    }
                });
                //make piece in question move to new spot
                piece.position = piece.potentialmove;

            }
        });
        //use make no move function to move onto next turn and clear out variables
        this.makenomove();

    }
    makenomove() {

        //remove potential movements from pieces
        this.pieces.forEach(piece => {
            piece.potentialmove = null;
        });

        //change turn to next player
        var nextturn = this.colors.indexOf(this.playerturn) + 1;
        this.playerturn = this.colors[nextturn % 4];

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
        //home position equal to initial position and does not change
        this.homeposition = position;
        this.position = position;
        this.color = color;
        this.potentialmove = null;
    }
    potentialmovement(roll) {
        if (this.position > 40 && this.position < 75) {
            if (roll == 6) {
                //offer start new peg
                if (this.color == "red") {
                    //first position on board is red starting point
                    this.potentialmove = 1;
                }
                else if (this.color == "yellow") {
                    //position 8 is yellow starting point
                    this.potentialmove = 8;
                }
                else if (this.color == "green") {
                    //position 15 is green starting point
                    this.potentialmove = 15;

                }
                else if (this.color == "blue") {
                    //position 22 is blue starting point
                    this.potentialmove = 22;
                }
            }
        }
        else {
            this.potentialmove = this.position;
            //for every space moved forward (represented by roll), run through loop one time
            for (var i = 0; i < roll; i++) {
                if (this.color == "red" && this.potentialmove == 28) {
                    //last positions for red start at 101
                    this.potentialmove = 101;
                }
                else if (this.color == "yellow" && this.potentialmove == 7) {
                    //last positions for yellow start at 111
                    this.potentialmove = 111;
                }
                else if (this.color == "green" && this.potentialmove == 14) {
                    //last positions for green start at 121
                    this.potentialmove = 121;
                }
                else if (this.color == "blue" && this.potentialmove == 21) {
                    //last positions for blue start at 131
                    this.potentialmove = 131;
                }
                else {
                    //normally just move forward
                    this.potentialmove++;
                    //handle loop on board where it goes from 28 to 1
                    if (this.potentialmove == 29) {
                        this.potentialmove = 1;
                    }
                }
                //if peg tries to leave finishing spaces and go past 1*4, stop it
                if (this.potentialmove > 100 && this.potentialmove % 10 > 4) {
                    this.potentialmove = null;
                    break;
                }
            }
        }




    }
}

class View {
    constructor() {

        this.boardpositions = [
            //normal board positions
            [3, 4], [3, 5], [3, 6], [3, 7], [3, 8], [3, 9], [3, 10],
            [4, 11], [5, 11], [6, 11], [7, 11], [8, 11], [9, 11], [10, 11],
            [11, 10], [11, 9], [11, 8], [11, 7], [11, 6], [11, 5], [11, 4],
            [10, 3], [9, 3], [8, 3], [7, 3], [6, 3], [5, 3], [4, 3],

            //home positions
            [2, 3], [2, 2], [3, 1], [4, 1],
            [3, 12], [2, 12], [1, 11], [1, 10],
            [12, 11], [12, 12], [11, 13], [10, 13],
            [11, 2], [12, 2], [13, 3], [13, 4],

            //finishing spaces
            [4, 4], [4.5, 4.5], [5, 5], [5.5, 5.5],
            [4, 10], [4.5, 9.5], [5, 9], [5.5, 8.5],
            [10, 10], [9.5, 9.5], [9, 9], [8.5, 8.5],
            [10, 4], [9.5, 4.5], [9, 5], [8.5, 5.5]
        ];
    }

    makeView(gs) {
        //create base SVG
        var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svg.setAttribute('width', '1200');
        svg.setAttribute('height', '800');

        //check if win happened, and only show winner screen if true
        if (gs.winhappened == true) {

            //win display
            var win = document.createElementNS("http://www.w3.org/2000/svg", "rect");
            var winpos = [5, 5];
            win.setAttribute('x', this.adjust(winpos[0]));
            win.setAttribute('y', this.adjust(winpos[1]));
            win.setAttribute('height', 200);
            win.setAttribute('width', 200);

            //green is too dark normally
            if (gs.wincolor == "green") {
                win.setAttribute('fill', "lightgreen");
            }
            //blue also too dark
            else if (gs.wincolor == "blue") {
                win.setAttribute('fill', 'lightblue');
            }
            else {
                win.setAttribute('fill', gs.wincolor);
            }
            //add click event to start new game
            //win.addEventListener('click', ()=>controller.madeNoMove());
            svg.appendChild(win);
            var wintext = document.createElementNS("http://www.w3.org/2000/svg", "text");
            var wintextpos = [6.5, 7.5];
            wintext.setAttribute('x', this.adjust(wintextpos[0]));
            wintext.setAttribute('y', this.adjust(wintextpos[1]));
            wintext.textContent = gs.wincolor + " won!";
            svg.appendChild(wintext);

        }

        //if no winner, do everything else
        else {

            //board positions
            this.boardpositions.forEach(pos => {
                var circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
                circle.setAttribute('cx', this.adjust(pos[0]));
                circle.setAttribute('cy', this.adjust(pos[1]));
                circle.setAttribute('r', 10);
                circle.setAttribute('color', "black");
                svg.appendChild(circle);

            });

            //whose turn is it
            var turn = document.createElementNS("http://www.w3.org/2000/svg", "text");
            var turnpos = [15, 6];
            turn.setAttribute('x', this.adjust(turnpos[0]));
            turn.setAttribute('y', this.adjust(turnpos[1]));
            //make text color of player's turn if time
            if (gs.playerturn != "yellow") {
                turn.setAttribute('fill', gs.playerturn);
            }
            else {
                turn.setAttribute('fill', "#FFDB58")
            }
            turn.textContent = "It's " + gs.playerturn + "'s turn.";

            svg.appendChild(turn);


            //buttons
            var randroll = document.createElementNS("http://www.w3.org/2000/svg", "circle");
            var dicepos = [7, 7];
            randroll.setAttribute('cx', this.adjust(dicepos[0]));
            randroll.setAttribute('cy', this.adjust(dicepos[1]));
            randroll.setAttribute('r', 30);
            randroll.setAttribute('fill', "yellow");
            var randomroll = Math.floor(Math.random() * 6) + 1;
            gs.roll = randomroll;
            var rollpos = [6.65, 7.1];
            var preroll = document.createElementNS("http://www.w3.org/2000/svg", "text");
            preroll.setAttribute('x', this.adjust(rollpos[0]));
            preroll.setAttribute('y', this.adjust(rollpos[1]));
            preroll.textContent = "Roll!";
            randroll.addEventListener('click', () => this.showRoll(randomroll, svg, preroll));
            svg.appendChild(randroll);
            svg.appendChild(preroll);



            //instructions
            var instructions = document.createElementNS("http://www.w3.org/2000/svg", "text");
            var instructpos = [15, 7];
            instructions.setAttribute('x', this.adjust(instructpos[0]));
            instructions.setAttribute('y', this.adjust(instructpos[1]));
            var lines = ["1. Roll the dice by clicking the yellow circle in the middle of the board.",
                "If you roll a 6, you can leave your home space.",
                "2. Any piece eligible to move will flash white.", "Click on the piece you'd like to move.",
                "3. If none of your pieces flash, none are eligible to move yet.", "Click the 'can't make a move' button to advance the game.",
                "4. Win by getting all 4 of your pieces into the your winning spaces!"];
            lines.forEach(line => {
                var line1 = document.createElementNS("http://www.w3.org/2000/svg", "tspan");
                if (lines.indexOf(line) % 2 == 1) {
                    line1.setAttribute('x', this.adjust(instructpos[0]) + 20);
                }
                else {
                    line1.setAttribute('x', this.adjust(instructpos[0]));
                }
                line1.setAttribute('dy', 25);
                line1.textContent = line;
                instructions.append(line1);
            })
            svg.appendChild(instructions);
            this.addPiecestoScreen(gs, svg);
        }

        document.getElementById("gameview").innerHTML = "";
        document.getElementById("gameview").appendChild(svg);

    }

    addPiecestoScreen(gs, svg) {
        //pegs
        gs.pieces.forEach(piece => {
            var circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
            var pos = this.findPosition(piece.position);
            circle.setAttribute('cx', this.adjust(pos[0]));
            circle.setAttribute('cy', this.adjust(pos[1]));
            circle.setAttribute('r', 10);
            circle.setAttribute('fill', piece.color);
            if (piece.potentialmove != null) {
                circle.addEventListener('click', () => controller.moveHappened(piece.position));

                // I stole this from a GSAP forum, sorry
                //it makes my pegs flash white and back to their original color
                let colors = ['white', piece.color],
                    duration = 2,
                    gap = 0.5;

                let tlHome = gsap.timeline({
                    repeat: -1,
                    repeatRefresh: true
                });

                colors.forEach(function (color, index) {
                    tlHome.to(circle, {
                        duration: 2,
                        fill: color
                    }, (duration + gap) * index);
                });
            }
            //make pegs that are moving fade into their new spot
            else if (gs.oldpotential == piece.position && gs.click == true) {
                TweenLite.from(circle, { duration: 2, x: piece.position[0], y: piece.position[1], alpha: 0 });
            }
            svg.appendChild(circle);

        });
    }


    //show roll number, add not gonna move button post roll, clear "roll" from roll number
    showRoll(randomroll, svg, preroll) {
        preroll.textContent = "";
        var rolltext = document.createElementNS("http://www.w3.org/2000/svg", "text");
        var rollpos = [6.9, 7.1];
        rolltext.setAttribute('x', this.adjust(rollpos[0]));
        rolltext.setAttribute('y', this.adjust(rollpos[1]));
        rolltext.textContent = randomroll;
        svg.appendChild(rolltext);

        //not gonna move button
        var nomove = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        var nomovepos = [15, 3];
        nomove.setAttribute('x', this.adjust(nomovepos[0]));
        nomove.setAttribute('y', this.adjust(nomovepos[1]));
        nomove.setAttribute('height', 50);
        nomove.setAttribute('width', 200);
        nomove.setAttribute('fill', "yellow");
        nomove.addEventListener('click', () => controller.madeNoMove());
        svg.appendChild(nomove);
        var movetext = document.createElementNS("http://www.w3.org/2000/svg", "text");
        movetext.setAttribute('x', this.adjust(nomovepos[0] + .8));
        movetext.setAttribute('y', this.adjust(nomovepos[1] + .75));
        movetext.textContent = "Can't make a move";
        svg.appendChild(movetext);

        controller.rollHappened(svg);






    }

    //adjust position from grid to apply to screen position
    adjust(number) {
        return number * 40;
    }

    //turns position number into x, y in board positions array
    findPosition(position) {

        if (position > 40 && position < 75) {
            return this.boardpositions[27 + 4 * Math.floor(position / 10 - 4) + position % 10];
        }
        else if (position > 100 && position < 135) {
            return this.boardpositions[27 + 16 + 4 * Math.floor(position / 10 - 10) + position % 10];
        }
        else {
            return this.boardpositions[position - 1];
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

    rollHappened(svg) {
        this.gs.updateforroll();
        this.view.addPiecestoScreen(this.gs, svg);
        console.log(this.gs.pieces);
    }

    moveHappened(position) {
        this.gs.click = true;
        this.gs.lastMovement(position);
        this.gs.makemove(position);
        this.gs.winner();
        this.view = new View();
        this.view.makeView(this.gs);
        this.gs.click = false;
    }

    madeNoMove() {
        this.gs.makenomove();
        this.view = new View();
        this.view.makeView(this.gs);
    }

    winnerHappened() {
        this.gs.makenomove();
        this.view = new View();
        this.view.makeView(this.gs);
    }

}
var controller = new Controller();


//ISSUES TO FIX
//add animations
//done for the most part, still want animations on instructions

