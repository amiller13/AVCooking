/*Grace Murray; July 11th, 2018; An energy use visualization using color coded running faucets*/


/*VARIABLE DECLARATIONS*/
/*image for faucet*/
var faucet = new Image(218,200);
faucet.src = "faucet.png";

/*acceleration and velocity variables describing how the water droplets fall from the faucet*/
var acc= .02;
var vel= .01;

var time = 0; /*incremented with each execution of the draw function*/

/*variables creating canvas in html document on which to draw the visualization*/
var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");

var pos; /*position for each faucet in canvas*/
var invisible; /*used to make drops disappear as they hit the water in the cup*/
var adjustFillRate = 1000; /*rate at which the cups fill (relative to appliance power)*/


/*SETS UP CANVAS AND DRAWING SETTINGS*/
var setup = function(){
    noCanvas();
    noStroke();
}


/*DRAW FUNCTION GETS CALLED REPEATEDLY, 60 TIMES/SECOND*/
var draw = function(){
    time++;

    /*set background*/
    context.fillStyle = "#FFFFFF";
    context.fillRect(0,0,context.canvas.width, context.canvas.height);

    /*draw cup and faucet for each appliance*/
    for(i = 0; i<sim_appliances.length; i++){

	/*adjust number of drops in array to match power*/
	if(sim_appliances[i].running){
	    pos = ((i+1)*140)+(i*240);

	    /*if power has inreased, add drops to array*/
	    if((sim_appliances[i].drops.length < sim_appliances[i].power) && (sim_appliances[i].drops.length<100)){
		while((sim_appliances[i].drops.length < sim_appliances[i].power) && (sim_appliances[i].drops.length<100)){
		    sim_appliances[i].drops.push(new Drop((pos+40)+(14*Math.random()), (150+(600*Math.random()))));
		}
	    }
	    /*if power has decreased, remove drops from array*/
	    else if((sim_appliances[i].drops.length > sim_appliances[i].power) && (sim_appliances[i].drops.length != 1)){
		sim_appliances[i].drops = sim_appliances[i].drops.slice(0, sim_appliances[i].power);
	    }

	}

	/*set power of appliance to value in data array(declared in app_data.js, corresponds to values in ApplianceData3.csv- changed by fetch.js)*/
	sim_appliances[i].power = data[sim_appliances[i].name];

	/*call update function to check running status etc.*/
	sim_appliances[i].update();

	/*adjust position to draw faucets and cups at equal interval across canvas*/
	pos=i*240;

	//console.log(sim_appliances);
	//console.log(i);

	drawCup((pos+(140*(i+1))), sim_appliances[i]);
	/*moves and draws the water drops*/
	for(j=0; j<sim_appliances[i].drops.length; j++){
	    sim_appliances[i].drops[j].move(sim_appliances[i]);
	    if(sim_appliances[i].drops[j].y > (590-sim_appliances[i].waterHeight)){invisible = true;}
	    else{
		invisible=false;
		//console.log("invisible false");
	    }
	    drawDrop(sim_appliances[i], sim_appliances[i].drops[j].x, sim_appliances[i].drops[j].y, invisible);
	    //console.log("drew drops");
	}
	/*resets globalAlpha (opacity) to 1, as it may have been set to 0 if an appliance is not running*/
	context.globalAlpha = 1;
	context.drawImage(faucet, pos+(i*140),0);
    }
}

/*an object describing a water drop with position, velocity, and a move function*/
var Drop = function(x, y) {
    this.x = x;
    this.y = y;
    this.vel = this.y*acc;

    this.move = function(appliance){
	var maxDepth = 600-(appliance.waterHeight+18);
	/*resets drops so it's a continual stream*/
	if(this.y > 600){
	    this.y=(150+(600*Math.random()));
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
    //console.log(running);

    /*method draws a raindrop shape, colored with white->color gradient for 3D effect*/
    var bluefade = context.createLinearGradient(posX, posY, posX, posY+28);
    bluefade.addColorStop(0.0, "#fff");
    bluefade.addColorStop(1.0, appliance.color);

    /*defines path to draw a teardrop shape*/
    context.beginPath();
    context.moveTo(posX, posY);
    context.lineTo(posX-8, posY+12);
    context.arc(posX, posY+12, 12, Math.PI, 0, true);
    context.lineTo(posX+8, posY+12);

    /*makes drops invisible if the appliance is not running*/
    if(!running || invisible){
	context.globalAlpha = 0;
	//console.log("not running or invisible");
    }
    else{
	//appliance.power = data[appliance.name];
	//appliance.energy += appliance.power;
	context.globalAlpha=.75;
	//console.log("running and not invisible");
    }

    context.fillStyle = bluefade;
    context.fill();
}


var drawCup = function(posX, appliance){
    /*draws the cup (simply a rectangle)*/
    context.fillStyle="#d9d9d9";
    context.fillRect(posX,260,200,340);

    // console.log(appliance.name + " wh = " + appliance.waterHeight);

    /*resets if the water height reaches the top of the cup*/
    if(appliance.waterHeight > 340){
	context.fillStyle = appliance.color;
	context.fillRect(posX,260,200,340);
	appliance.waterHeight = 0;
	/*update number of cups already filled*/
	appliance.cups++;
	context.fillStyle="#000000";
	context.font = "bold 20px Trebuchet MS";
	context.fillText(appliance.cups+ " cups filled", (posX+35),540);

	//console.log(sim_appliances);
    }

    else{
	/*updates water height*/
	if(appliance.running){
	    appliance.waterHeight += (appliance.power/adjustFillRate);
	}
	context.fillStyle = appliance.color;
	context.fillRect(posX,(600-appliance.waterHeight),200,340);
	/*label w/ number of cups filled*/
	context.fillStyle="#000000";
	context.font = "bold 20px Trebuchet MS";
	context.fillText(appliance.cups + " cups filled", (posX+35), 540);
    }
}
