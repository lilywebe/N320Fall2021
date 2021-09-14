let base= document.getElementById("washcanvas");
class WashingMachine{
    basecolor=[20, 200, 100];
    fcloc={x:50, y:50};;
    fcrad=10;
    fccolor=[50,80,200];
    width=50;
    height=50;;
    dialpos={x:100,y:100};
    dialrad=5;
    dialcolor=[90, 10, 30];
    baseloc={x:50, y:50};

    draw(){
        let baserect=document.createElementNS("http://www.w3.org/2000/svg", "rect");
        baserect.setAttribute("fill", `rgb(${this.basecolor[0]}, ${this.basecolor[1]}, ${this.basecolor[2]})`);
        baserect.setAttribute("width", this.width);
        baserect.setAttribute("height", this.height);
        baserect.setAttribute("x", this.baseloc.x);
        baserect.setAttribute("y", this.baseloc.y);
        base.appendChild(baserect);

        let frontcircle=document.createElementNS("http://www.w3.org/2000/svg", "circle");
        frontcircle.setAttribute("fill", `rgb(${this.fccolor[0]}, ${this.fccolor[1]}, ${this.fccolor[2]})`);
        frontcircle.setAttribute("r", this.fcrad);
        frontcircle.setAttribute("cx", this.fcloc.x);
        frontcircle.setAttribute("cy", this.fcloc.y);
        base.appendChild(frontcircle);

        let dial=document.createElementNS("http://www.w3.org/2000/svg", "circle");
        dial.setAttribute("fill", `rgb(${this.dialcolor[0]}, ${this.dialcolor[1]}, ${this.dialcolor[2]})`);
        dial.setAttribute("r", this.dialrad);
        dial.setAttribute("cx", this.dialpos.x);
        dial.setAttribute("cy", this.dialpos.y);
        base.appendChild(dial);
    }
}
class WashingMachineManager{

    baseMachine=[];
    currentMachines=[];

    createMachines(){
        for(let i=0; i<10; i++){
            this.currentMachines[i]=new WashingMachine();
            this.currentMachines[i].baseloc={x:10+i*10, y:100};
            this.currentMachines[i].fcloc={x:10+i*10, y:100};
            this.currentMachines[i].dialpos={x:10+i*10, y:100};
            this.currentMachines[i].draw();
        }
    }

    selectMachine(){

    }

    removeMachines(){

    }
}

let wash=new WashingMachineManager();
wash.createMachines();