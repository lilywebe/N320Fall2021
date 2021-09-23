let title=document.getElementById("title");
TweenLite.from(title,{duration:2, x:0, alpha:0});

let boxes=document.getElementsByClassName("box");

for(var i=0; i<6; i++){
    TweenLite.from(boxes[i], {duration:2, x:0, alpha:0, delay:i*.1});
}
let rectangle=document.getElementById("rectangle");
TweenLite.from(rectangle,{duration:2, x:0, alpha:0});
for(var i=0; i<boxes.length; i++){
    boxes[i].addEventListener("mouseover", mouseoverAnim)
    boxes[i].addEventListener("mouseout", mouseoutAnim)
    boxes[i].addEventListener("click", clicked)
}

function mouseoverAnim(){
    TweenMax.to(event.target, {duration:.3, alpha:.5});
}

function mouseoutAnim(){
    TweenMax.to(event.target, {duration:.3, alpha:1});
}

function clicked(){
TweenMax.to(event.target,{duration:2, alpha:0});
event.target.removeEventListener("mouseout", mouseoutAnim);
event.target.removeEventListener("mouseover", mouseoverAnim);
}