/*Grace Murray; July 2st, 2018; Running faucet for energy use visualization
  - color coded*/


var faucet = new Image(109,100);
faucet.src = "faucet.png";
var apps = new Array();
var acc= .02;
var vel= .01;
var i;
var j;
var time = 0;
var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");
var pos;
var invisible;
var adjustFillRate = 1000;

var setup = function(){
    noCanvas();
    //console.log(sim_appliances);
    /*adds the intial drops the array for each appliance*/
    for(i=0; i<sim_appliances.length; i++){
	pos = ((i+1)*70)+(i*120);
	for(j = 0; j<(5*sim_appliances[i].growth_rate); j++){
	    sim_appliances[i].drops.push(new Drop((pos+16)+(14*Math.random()), (90+(300*Math.random()))));
	}
    }
    noStroke();

}

var draw = function(){
    time++;

    /*set background*/
    context.fillStyle = "#FFFFFF";
    context.fillRect(0,0,context.canvas.width, context.canvas.height);
    
    /*draw cup and faucet for each appliance*/
    for(i = 0; i<sim_appliances.length; i++){
        pos=i*120;
	drawCup(pos+(70*(i+1)), sim_appliances[i]);
	/*moves and draws the water drops*/
	for(j=0; j<sim_appliances[i].drops.length; j++){
	    sim_appliances[i].drops[j].move(sim_appliances[i]);
	    if(sim_appliances[i].drops[j].y > (295-sim_appliances[i].waterHeight)){invisible = true;}
	    else{invisible=false;}
	    drawDrop(sim_appliances[i], sim_appliances[i].drops[j].x, sim_appliances[i].drops[j].y, invisible);
	}
	context.globalAlpha = 1;
	context.drawImage(faucet,pos+(i*70),0);
    }

    
}

    var Drop = function(x, y) {
	this.x = x;
	this.y = y;
	this.vel = this.y*acc;
	
	this.move = function(appliance){
	    var maxDepth = 300-(appliance.waterHeight+18);
	    /*resets drops so it's a continual stream*/
	    if(this.y > 300){
		this.y=(65+(300*Math.random()));
                this.vel = this.y*acc;
	    }
	    else{
		this.y+= this.vel;
		this.vel+=acc;
	    }
	}
    }

	var drawDrop = function(appliance, posX, posY, invisible){
	    var running = appliance.get_state();

	    /*method draws a raindrop shape, colored with white->color gradient for 3D effect*/
	    var bluefade = context.createLinearGradient(posX, posY, posX, posY+14);
	    bluefade.addColorStop(0.0, "#fff");
	    bluefade.addColorStop(1.0, appliance.color); 

	    context.beginPath();
	    context.moveTo(posX, posY);
	    context.lineTo(posX-4, posY+6);
	    context.arc(posX, posY+6, 6, Math.PI, 0, true);
	    context.lineTo(posX+4, posY+6);
	    
            if(!running || invisible){context.globalAlpha = 0;}
	    else{context.globalAlpha=.75;}
	    
	    context.fillStyle = bluefade;
	    
	    context.fill();
	}


		var drawCup = function(posX, appliance){    
		    /*draws the cup*/
		    context.fillStyle="#d9d9d9";
		    context.fillRect(posX,130,100,170);
		    
		    /*fills the cup with water*/
		    if(appliance.waterHeight > 170){
			context.fillStyle = appliance.color;
			context.fillRect(posX,130,100,170);
			appliance.waterHeight = 0;
			/*update number of cups already filled*/
			appliance.cups++;
			context.fillStyle="#000000";
			context.font = "bold 14px Trebuchet MS";
			context.fillText(appliance.cups+ " cups filled", (posX+10), 280);
			
			//console.log(sim_appliances);
		    }

		    else{
			if(appliance.running){
			    appliance.waterHeight += (appliance.growth_rate/adjustFillRate);
			}
			context.fillStyle = appliance.color;
			context.fillRect(posX,(300-appliance.waterHeight),100,170);
			/*label w/ number of cups filled*/
			context.fillStyle="#000000";
			context.font = "bold 14px Trebuchet MS";
			context.fillText(appliance.cups + " cups filled", (posX+10), 280);
		    }
		}
