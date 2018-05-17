import React, { Component } from 'react';
import { View, WebView, StatusBar } from 'react-native';

export default class App extends Component {
    render() {

        var webViewCode = `
<html>
<head>
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js"></script>
<script type="text/javascript" src="https://static.codehs.com/gulp/0c46c5da54af4d95de8cd2af3f1ae7c279106565/chs-js-lib/chs.js"></script>

<style>
    body, html {
        margin: 0;
        padding: 0;
    }
    canvas {
        margin: 0px;
        padding: 0px;
        display: inline-block;
        vertical-align: top;
    }
    #btn-container {
        text-align: center;
        padding-top: 10px;
    }
    #btn-play {
        background-color: #8cc63e;
    }
    #btn-stop {
        background-color: #de5844;
    }
    .glyphicon {
        margin-top: -3px;
        color: #FFFFFF;
    }
</style>
</head>

<body>
    <div id="canvas-container" style="margin: 0 auto; ">
        <canvas
        id="game"
        width="400"
        height="480"
        class="codehs-editor-canvas"
        style="width: 100%; height: 100%; margin: 0 auto;"
        ></canvas>
    </div>
    <div id="console"></div>
    <div id="btn-container">
        <button class="btn btn-main btn-lg" id="btn-play" onclick='stopProgram(); runProgram();'><span class="glyphicon glyphicon-play" aria-hidden="true"></span></button>
        <button class="btn btn-main btn-lg" id="btn-stop" onclick='stopProgram();'><span class="glyphicon glyphicon-stop" aria-hidden="true"></span></button>
    </div>

<script>
    var console = {};
    console.log = function(msg){
        $("#console").html($("#console").html() + "     " + msg);
    };

    var runProgram = function() {
        //General variables set up for use throughout the program
var player = new WebImage("https://www.biography.com/.image/t_share/MTIwNjA4NjMzNzQ3NDQxMTY0/john-wilkes-booth-9219681-1-402.jpg");
var playerSize = 70;
var lincoln1 = new WebImage("https://i.pinimg.com/736x/fc/68/88/fc68880e389510786cced74b1e7b045c--special-effects-art-sculptures.jpg");
var lincoln2 = new WebImage("https://i.pinimg.com/736x/fc/68/88/fc68880e389510786cced74b1e7b045c--special-effects-art-sculptures.jpg");
var lincoln3 = new WebImage("https://i.pinimg.com/736x/fc/68/88/fc68880e389510786cced74b1e7b045c--special-effects-art-sculptures.jpg");
var lincolnHealth = 10;
var lincolnHealthB = new Rectangle(128,7);
var lincolnHealthBX = getWidth()-128;
var obstacle1 = new Rectangle(10,500);
var obstacle2 = new Rectangle(10,500);
var shot = new Rectangle(7,7);
var pmovex = 0;
var pmovey = 0;
var omove = 5;
var cooldown = 0;
var winScreen = new WebImage("https://padresteve.files.wordpress.com/2016/04/lincoln-shot.jpg");
//Creates the wall of Lincolns the player must take down
function createLincoln(){
    lincoln1.setSize(128, 170.4);
    lincoln1.setPosition(getWidth()-128,(getHeight()-170.4)/2);
    add(lincoln1);
    lincoln2.setSize(128, 170.4);
    lincoln2.setPosition(getWidth()-128,getHeight()-170.4);
    add(lincoln2);
    lincoln3.setSize(128, 170.4);
    lincoln3.setPosition(getWidth()-128,0);
    add(lincoln3);
    lincolnHealthB.setPosition(lincolnHealthBX,0);
    add(lincolnHealthB);
}
function createPlayer(){
    player.setSize(playerSize,playerSize);
    player.setPosition(getWidth()-400,(getHeight()-playerSize)/2);
    add(player);
}
//Creates the wall the player must shoot around
function createObstacle(){
    obstacle1.setPosition(getWidth()/2, 100);
    add(obstacle1);
    obstacle2.setPosition(getWidth()/2, -450);
    add(obstacle2);
}
function moveWall(){
    obstacle1.move(0, omove);
	obstacle2.move(0, omove);
    if(obstacle1.getY() >= 460){
	   omove = -5;
    }
    else if (obstacle1.getY() <= 100){
	   omove = 5;
    }
    if((obstacle1.getX() <= (shot.getX() + 7)&&obstacle1.getY() <= (shot.getY() + 7))||(obstacle2.getX() <= (shot.getX() + 7)&&obstacle2.getY()+500 >= (shot.getY() + 7))){
        remove(shot);
        shot.setPosition(0,0);
        stopTimer(shotMove);
        cooldown = 0;
   }
}
//Functions for player movement and shooting
function KeyDown(event) {
  switch(event.which){
      //case 37: pmovex = -5; break;
      case 38: pmovey = -5; break;
      //case 39: pmovex = 5; break;
      case 40: pmovey = 5; break;
      //case 65: pmovex = -5; break;w
      //case 68: pmovex = 5; break;
      case 83: pmovey = 5; break;
      case 87: pmovey = -5; break;
  }
  if (event.which == 32 && cooldown == 0){
      shot.setPosition(player.getX()+70, player.getY()+35);
      add(shot);
      setTimer(shotMove,20);
      cooldown = 1;
  }
}
function KeyUp(event) {
   switch(event.which){
      //case 37: pmovex = 0; break;
      case 38: pmovey = 0; break;
      //case 39: pmovex = 0; break;
      case 40: pmovey = 0; break;
      //case 65: pmovex = 0; break;
      //case 68: pmovex = 0; break;
      case 83: pmovey = 0; break;
      case 87: pmovey = 0; break;
  }
}
function move(){
    player.move(pmovex,pmovey);
}
//This line is its own function in order to be used in timers
function shotMove(){
    shot.move(5,0);
}
function lincolnCollide(){
    if(lincoln1.getX() <= (shot.getX() + 7)){
            println("HIT!");
            remove(shot);
            shot.setPosition(0,0);
            stopTimer(shotMove);
            lincolnHealth = lincolnHealth - 1;
            cooldown = 0;
            remove(lincolnHealthB);
            lincolnHealthBX = lincolnHealthBX + 12.8;
            lincolnHealthB.setPosition(lincolnHealthBX,0);
            add(lincolnHealthB);
            if (lincolnHealth <= 0){
                remove(lincoln1);
                remove(lincoln2);
                remove(lincoln3);
                remove(player);
                remove(obstacle1);
                remove(obstacle2);
                winScreen.setSize(400, 480);
                winScreen.setPosition(0,0);
                add(winScreen);
                println("You win!");
            }
    }
}
function start(){
    createLincoln();
    createPlayer();
    createObstacle();
    println("Assassinate him.");
    keyDownMethod(KeyDown);
    keyUpMethod(KeyUp);
    setTimer(move,20);
    setTimer(lincolnCollide,10);
    setTimer(moveWall, 50);
}



        if (typeof start === 'function') {
            start();
        }

        // Overrides setSize() if called from the user's code. Needed because
        // we have to change the canvas size and attributes to reflect the
        // user's desired program size. Calling setSize() from user code only
        // has an effect if Fit to Full Screen is Off. If Fit to Full Screen is
        // On, then setSize() does nothing.
        function setSize(width, height) {
            if (!true) {
                // Call original graphics setSize()
                window.__graphics__.setSize(width, height);

                // Scale to screen width but keep aspect ratio of program
                // Subtract 2 to allow for border
                var canvasWidth = window.innerWidth - 2;
                var canvasHeight = canvasWidth * getHeight() / getWidth();

                // Make canvas reflect desired size set
                adjustMarginTop(canvasHeight);
                setCanvasContainerSize(canvasWidth, canvasHeight);
                setCanvasAttributes(canvasWidth, canvasHeight);
            }
        }
    };

    var stopProgram = function() {
        removeAll();
        window.__graphics__.fullReset();
    }

    window.onload = function() {
        if (!false) {
            $('#btn-container').remove();
        }

        var canvasWidth;
        var canvasHeight;
        if (true) {
            // Get device window width and set program size to those dimensions
            setSize(window.innerWidth, window.innerHeight);
            canvasWidth = getWidth();
            canvasHeight = getHeight();

            if (false) {
                // Make room for buttons if being shown
                $('#btn-container').css('padding', '5px 0');
                canvasHeight -= $('#btn-container').outerHeight();
            }

            setCanvasAttributes(canvasWidth, canvasHeight);
        } else {
            // Scale to screen width but keep aspect ratio of program
            // Subtract 2 to allow for border
            canvasWidth = window.innerWidth - 2;
            canvasHeight = canvasWidth * getHeight() / getWidth();

            // Light border around canvas if not full screen
            $('#canvas-container').css('border', '1px solid #beccd4');

            adjustMarginTop(canvasHeight);
        }

        setCanvasContainerSize(canvasWidth, canvasHeight);

        if (true) {
            runProgram();
        }
    };

    // Set the canvas container width and height.
    function setCanvasContainerSize(width, height) {
        $('#canvas-container').width(width);
        $('#canvas-container').height(height);
    }

    // Set the width and height attributes of the canvas. Allows
    // getTouchCoordinates to sense x and y correctly.
    function setCanvasAttributes(canvasWidth, canvasHeight) {
        $('#game').attr('width', canvasWidth);
        $('#game').attr('height', canvasHeight);
    }

    // Assumes the Fit to Full Screen setting is Off. Adjusts the top margin
    // depending on the Show Play/Stop Buttons setting.
    function adjustMarginTop(canvasHeight) {
        var marginTop = (window.innerHeight - canvasHeight)/2;
        if (false) {
            marginTop -= $('#btn-container').height()/3;
        }
        $('#canvas-container').css('margin-top', marginTop);
    }
</script>
</body>
</html>
`;
        return (
            <View style={{ flex: 1 }}>
                <StatusBar hidden />
                <WebView
                    source={{html: webViewCode, baseUrl: "/"}}
                    javaScriptEnabled={true}
                    style={{ flex: 1 }}
                    scrollEnabled={false}
                    bounces={false}
                    scalesPageToFit={false}
                ></WebView>
            </View>
        );
    }
}
