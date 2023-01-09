const canvas = document.getElementById("myGame");
const context = canvas.getContext("2d");

const width = 400;
const height = 600;


// draw rect funtion
function drawRect(x,y,w,h,color){
    context.fillStyle = color;
    context.fillRect(x,y,w,h);
}


// Draw a circle
function drawCircle(x,y,r,color){
    context.fillStyle = color;
    context.beginPath();
    context.arc(x,y,r,0,Math.PI*2,false);
    context.closePath();
    context.fill();
}

// Create the ball 
const ball = {
    x: canvas.width/2,
    y: canvas.height/2,
    radius: 10,
    speed:1,
    velocityX : 5,
    velocityY : 5,
    color: "white"
}

//Create the user paddle
const com = {
    x: canvas.width/2 - 50/2,
    y: 10,
    width: 50,
    height: 10,
    color: "white",
    score: 0
}


// Create the computer paddle
const user = {
    x: canvas.width/2 - 50/2,
    y: 580,
    width: 50,
    height: 10,
    color: "white",
    score: 0
}

// Center Line
function centerLine(){
    context.beginPath();
    context.setLineDash([10]);
    context.moveTo(0,height/2);
    context.lineTo(width, height/2);
    context.strokeStyle = 'white';
    context.stroke();
}

// scores
function drawText(text,x,y,color){
    context.fillStyle = color;
    context.font = "32px Josefin Sans";
    context.fillText(text,x,y)
}

// render the game
function render(){
    // make canvas
    drawRect(0, 0, 400, 600,"black");
    // draw center line
    centerLine()
    // draw score
    drawText(user.score,20,canvas.height/2 + 50,"white");
    drawText(com.score,20,canvas.height/2 - 30,"white");
    // draw the user and com pddle
    drawRect(user.x, user.y, user.width, user.height, user.color);
    drawRect(com.x, com.y, com.width, com.height, com.color)
    // draw the ball
    drawCircle(ball.x, ball.y, ball.radius, ball.color);
}
// // Control the user paddle
canvas.addEventListener("mousemove", movePaddle);

function movePaddle(e){
    let rect = canvas.getBoundingClientRect();

    user.x = e.clientX - rect.left - user.width/2;
}

// // control the upper paddle
// window.addEventListener('keydown', control)
// function control(e){
//     if(e.keyCode === 37){
//         if(com.x > 50){
//             com.x -= 80
//         }
//     }
//     else if(e.keyCode === 39){
//         if(com.x < 310){
//             com.x += 80
//         }
        
//     }
//     else if(e.keyCode === 65){
//         if(user.x > 50){
//             user.x -= 80
//         }
//     }
//     else if(e.keyCode === 68){
//         if(user.x < 310){
//             user.x += 80
//         }
        
//     }
// }



//Game over function
function showGameOver() {
    // Hide Canvas
    canvas.style.display = "none";
    const can = document.getElementById("can");
    can.style.display ="none";
    // Container
    const result = document.getElementById("result");
    result.style.display = "block"
  }

// Collios detection
function collision(b,p){
    b.top = b.y - b.radius;
    b.bottom = b.y + b.radius;
    b.left = b.x - b.radius;
    b.right = b.x + b.radius;

    p.top = p.y;
    p.bottom = p.y + p.height;
    p.left = p.x;
    p.right = p.x + p.width;

   if(p.right > b.left && p.left < b.right && b.bottom > p.top && b.top < p.bottom){
       return true
   };
       
}

// reset ball for game over
function resetBall(){
    ball.y = canvas.height/2;
    ball.x = canvas.width/2;

    ball.speed = 1;
    ball.velocityY = -ball.velocityY;

}

//Update 
function update(){
    ball.x += ball.velocityX*ball.speed;
    ball.y += ball.velocityY*ball.speed;
    

    // // Simple AI to control the com paddle
    let computerLevel = 0.1
    com.x += (ball.x - (com.x + com.width/2)) + computerLevel;
    if(ball.speed > 2){
        com.x =+ ball.x + 100
    }

    if(ball.x + ball.radius > canvas.width || ball.x - ball.radius < 0){
        ball.velocityX = -ball.velocityX;
    }

    let player = (ball.y < canvas.height/2) ? com : user;

    if(collision(ball,player)){
        ball.velocityY = -ball.velocityY;
         ball.speed += 0.1;
        console.log(collision(ball,player))
    }

    // points
    if(ball.y - ball.radius < 0){
        // user win
        user.score++;
        resetBall()
    }else if(ball.y + ball.radius > canvas.height){
        // com win
        com.score++;
        resetBall()
    }

    //game over
    if(user.score > 4 || com.score > 4){
        clearInterval(loop);
        showGameOver();

    }
}

function game(){
    update();
    render();
}


//loop
const loop = setInterval(game, 1000/50);