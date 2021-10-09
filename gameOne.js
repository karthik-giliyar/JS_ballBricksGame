const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')

// ctx.moveTo(0, 0)
// ctx.lineTo(250,50)
// ctx.beginPath()
// ctx.rect(10,10,40,40)
// ctx.fillStyle = 'red'
// ctx.fill()
// ctx.stroke()
// ctx.closePath()

const canvasH=canvas.height
const canvasW=canvas.width

let rightpressed=false
let leftpressed=false



let x,y,dx,dy,val,interval,radius,peddleW,peddleX,peddleY,i,rectX,rectY,count=0,rectcollision

let b=[],c=[{a:0,b:0}]


setvar()
drawball()
drawpeddle()
peddlenavigation()
drawBricks()



function peddlenavigation() {

    document.addEventListener('keyup', handleKeyUp)
    document.addEventListener('keydown', handleKeyDown)
    
    function handleKeyUp(e) {
    
        if(e.key === "ArrowLeft"){
            leftpressed=false
        }
    
        if(e.key === "ArrowRight"){
            rightpressed=false
        }
    } 
    
    function handleKeyDown(e) {
    
        if(e.key === "ArrowLeft"){
            leftpressed=true
        }
    
        if(e.key === "ArrowRight"){
            rightpressed=true
        }
    }
}

function detectcollision() {

    if(x+dx>=canvasW || x+dx<=0){
        dx=-dx
    }
    if(y+dy>(canvasH-15)){
        if(x+dx>peddleX && x+dx<=(peddleX+peddleW+5)){
            dy=-dy
        }
    }
   
    if(y+dy<=0){
        dy=-dy
    }


    for(let j=19;j<=49;j=j+10){
        for(let k=0; k<=48;k++){
            if(y < ((b[j].y)+15)){
                if(x > b[k].x && x <= (b[k].x+30)){
                    dy=-dy
                    c.splice(0,0,{a:b[k].x,b:b[j].y})
                    console.log(c)
                    break
                }
            }
        }
    }

    
    b=[]

}
 


function start() {


    if(!interval){

        interval = setInterval(() => {
          
            if(leftpressed && peddleX>0){
                peddleX=peddleX-5
            }

            if(rightpressed && peddleX<(canvasW-peddleW)){
                peddleX=peddleX+5
            }
                 
            detectcollision()
            
            x=x+dx;
            y=y+dy;
    
            checkGameover()
    
            ctx.clearRect(0,0,canvasW,canvasH);
            drawball()
            drawpeddle()
            drawBricks()
          
    
        },40);
    }
} 

function checkGameover() {
    if(y===canvasH){
        alert('game over')
        clearInterval(interval)
        interval=null
        setvar()
        c=[] 
       
    }
  
}

function setvar() {
    x=canvasW/2;
    y=canvasH-20;
    radius=10;
    dx=5;
    dy=-5;
    peddleW=60;
    peddleY=canvasH-10;
    peddleX=canvasW/2-peddleW/2;
    rectX=1;
    rectY=1;
    val=false
    
}



function drawball() {
   
    ctx.beginPath();
    ctx.arc(x,y,radius,0,360,false);
    ctx.fillStyle = 'blue'
    ctx.fill();
    ctx.closePath();
}


function drawpeddle(){
 
    ctx.beginPath();
    ctx.rect(peddleX, peddleY,peddleW,10)
    ctx.fillStyle = "orange"
    ctx.fill();
    ctx.closePath();
}


function drawBricks(){

    for(i=0; i<=49;i++){

        if(rectX==301){
            rectX=1
            rectY=rectY+17
            count++
        }
       
        b.splice(i,0,{x:rectX,y:rectY})

        val=false

        for(let l=0;l<c.length;l++){
            if(rectX===c[l].a && rectY===c[l].b){
               rectX=rectX+30
               val=true
            }
        }

        if(val){
            continue
        }


        ctx.beginPath()
        ctx.rect(rectX,rectY,28,15)
        ctx.fillStyle="brown"
        ctx.fill()
        ctx.stroke()
        ctx.closePath()
        rectX=rectX+30
        
       
    }
    rectX=1
    rectY=1

}

