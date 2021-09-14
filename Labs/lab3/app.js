class Game{
    foundcircles=0;
    totalcircles=0;
    searchcolor="pink";
    normalcolor="#7700AA";
    gameZone=document.getElementById("gameZone");
    foundBar= new FoundBar();
    constructor(){
        //make the circles
        for (var i=0; i<25; i++){
            //create circle
            let newCircle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    
            //circle styling
            newCircle.classList.add("gameCirc");

            newCircle.setAttribute("cx", Math.random()*400);
            newCircle.setAttribute("cy", Math.random()*400);

            //randomly choose what revealed color the circle is
            if(Math.random()< .3){
                newCircle.dataset.hiddenColor=this.searchcolor;
                this.totalcircles++;
            }
            else{
                newCircle.dataset.hiddenColor=this.normalcolor;
            }

            //mouse events
            newCircle.addEventListener("mouseover", (event) => {
                event.target.style.fill=event.target.dataset.hiddenColor;
            })

            newCircle.addEventListener("mouseout", (event) => {
                event.target.style.fill="#000";
            })

            newCircle.addEventListener("click", (event)=>{
                if(event.target.dataset.hiddenColor==this.searchcolor){
                    event.target.remove();

                    //store how many have been clicked on
                    this.foundcircles++;

                    //update found bar
                    this.foundBar.setPercent(this.foundcircles/this.totalcircles);
                }
            })

            //add circle to screen
            this.gameZone.appendChild(newCircle);
        }
    }
}

class FoundBar{
    element=document.getElementById("foundbar");
    maxsize=130;
    percent =0;

    setPercent(percent){
        this.percent = percent;
        this.element.setAttribute("width", (this.percent*this.maxsize));
    }
}


let g = new Game();