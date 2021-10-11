song = "";

function preload(){
    song=loadSound("music.mp3");
}
leftWristX = 0;
leftWristY = 0;
rightWristX =0;
rightWristY =0;
scoreleftwrist =0;
scorerightwrist=0;

function setup() {
    canvas = createCanvas(600,500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video,modelloaded);
    poseNet.on('pose',gotPoses);
}

function modelloaded(){
    console.log('PoseNet Is Initialized');
}
function draw() {
    image(video,0,0,600,500);

    fill("#FF0000");
    stroke("#FF0000");
    if(scorerightwrist > 0.2)
    {
    circle(rightWristX,rightWristY,20);

    if(rightWristY >0 && rightWristY <= 100)
    {
        document.getElementById("speed").innerHTML = "speed = 0.5x";
        song.rate(0.5);
    }
    else if(rightWristY >100 && rightWristY <=200)
    {
        document.getElementById("speed").innerHTML = "speed = 1x";
        song.rate(1);
    }
    else if(rightWristY >100 && rightWristY <= 300)
    {
        document.getElementById("speed").innerHTML = "speed = 1.5x";
        song.rate(1.5);
    }
    else if(rightWristY >300 && rightWristY <=400)
    {
        document.getElementById("speed").innerHTML = "speed = 2x";
        song.rate(2);
    }
    else if(rightWristY >400 && rightWristY <= 500)
    {
        document.getElementById("speed").innerHTML = "speed = 2x";
        song.rate(2)
    }
}
    if(scoreleftwrist > 0.2)
    {

    
    circle(leftWristX,leftWristY,20);
    InNumberleftWristY = Number(leftWristY);
    remove_decimals = floor(InNumberleftWristY);
    leftWristY_divide_1000 = remove_decimals/100;
    volume = leftWristY_divide_1000 *2 ;
    document.getElementById("volume").innerHTML = "volume = " + volume;
    song.setVolume(volume);
    } 
}


function play()
{
    song.play();
    song.setVolume(1);
    song.rate(1);
}
function gotPoses(results)
{
    if(scoreleftwrist > 0.2 )
    {
        console.log(results);
        scorerightwrist = results [0].pose.keypoints[10].score;
        scoreleftwrist = results[0].pose.keypoints[9].score;
        console.log( "scorerightWrist =" + scorerightWrist + "scoreleftwrist = " + scoreleftwrist);

        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("leftWristX =" + leftWristX +"leftWristY ="+ leftWristY);

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("rightWristX = " + rightWristX +"rightWristY = "+ rightWristY);
    }
}