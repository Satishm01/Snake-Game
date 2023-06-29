var blocksize= 20;
var rows = 25;
var cols = 25;
var board;
var context;

//snake head
var snakex=blocksize*5;
var snakey=blocksize*5;

//food
// var foodx=blocksize*10;
// var foody=blocksize*10;
var foodx;
var foody;

var gameover=false;

//velocity for the snake
var velocityx=0;
var velocityy=0;

//increase body when snake have food
var snakebody=[]

window.onload=function()
{
    board=document.getElementById("board");
    board.height=rows*blocksize;
    board.width=cols*blocksize;
    context=board.getContext("2d");//used for drawing on the board

    placefood()
    document.addEventListener("keyup",changeDirection);
    // update();
    setInterval(update,1000/10);  //100 milliseconds refresh
}
function update(){
    //for boxsize
    if(gameover)
    {
        return;
    }
    context.fillStyle="black";
    context.fillRect(0,0,board.width,board.height);
 
        //for food size
    context.fillStyle=("red");
    context.fillRect(foodx,foody,blocksize,blocksize);

    if(snakex==foodx && snakey==foody)
    {
        snakebody.push([foodx,foody])
        placefood();
    }

    for(let i=snakebody.length-1;i>=0;i--)
    {
        snakebody[i]=snakebody[i-1];
    }
    if(snakebody.length)
    {
        snakebody[0]=[snakex,snakey];
    }
    //for snake size
    context.fillStyle=("lime");
    snakex+=velocityx*blocksize;
    snakey+=velocityy*blocksize;
    context.fillRect(snakex,snakey,blocksize,blocksize);

    for(let i=0;i<snakebody.length;i++)
    {
        context.fillRect(snakebody[i][0],snakebody[i][1],blocksize,blocksize); 
    }


//gameover condition
if(snakex<0 || snakex >cols*blocksize || snakey<0 || snakey>rows*blocksize)
{
    gameover=true;
    alert("Game over !! Refresh again");
}

for(let i=0;i<snakebody.length;i++)
{
    if(snakex==snakebody[i][0]  && snakey==snakebody[i][1] )
    {
        gameover=true;
        alert("You have eaten your own body !! ,Refresh to restart");
    }
}

}

function changeDirection(e)
{
    if(e.code=="ArrowUp" && velocityy!=1){
        velocityx=0;
        velocityy=-1;
    }
    else if(e.code=="ArrowDown" && velocityy!=-1){
        velocityx=0;
        velocityy=1;
    }
    else if(e.code=="ArrowLeft" && velocityx!=1){
        velocityx=-1;
        velocityy=0;
    }
    else if(e.code=="ArrowRight" && velocityx!=-1){
        velocityx=1;
        velocityy=0;
    }
}

function placefood()
{
    //(0-1)*cols->(0-19.9999)->(0-19)*20
  foodx=Math.floor(Math.random()*cols)*blocksize;
  foody=Math.floor(Math.random()*rows)*blocksize;  
}