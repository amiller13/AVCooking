/*FILE DEFINING APPLIANCE OBJECT AND ARRAY OF APPLIANCES FOR VISUALIZATION*/

var MAX_POWER = 100;
var DATA_REFRESH_RATE = 1000;

function ZilkhaAppliance(name, color) {
    this.name = name,
    
    this.drops = new Array();
    this.color = color;
    this.cups = 0;
    this.waterHeight = 0;
    
    this.power = 0,

    this.energy = 0,
    this.ref = 0,
    this.change = false,
    this.running = false,
    this.update = function(){

	var before = this.running; /*used to check if running state has changed*/

        this.energy += this.power*(DATA_REFRESH_RATE/3600000); // convert to kwh
        
	/*updates running state if power is turned on to appliance*/
	if (this.ref >= DATA_REFRESH_RATE) {
            this.power = get_appliance_power(this.name);
	    this.ref = 0;
            if (this.power > 0) {
              this.running = true;
            }
          } else {this.ref += 1;}
	
        var combo = before + this.power;

	/*if appliances had turned on/off, checks change and updates image*/
	if((combo == before || combo == this.power) && before != this.power) {
            this.running = this.running ? false : true;
            this.change = true;
            checkChange(this.name);
	    //console.log("called checkChange");
        }
	
    },

    this.get_energy = function() {
        return this.energy;
    },
    this.get_power = function() {
	return this.power;
    },
    this.get_max_power = function() {
	     return MAX_POWER;
    },
    this.switchState = function() {
	this.running = this.running ? false : true;
    },    
    this.get_state = function(){
	return this.running;
    };
}

/*describes kitchen as array of Appliances*/
function ZilkhaKitchen() {
    this.sim_appliances = [new ZilkhaAppliance("stove", "#cc0000"), new ZilkhaAppliance("fridge", "#70db70"), new ZilkhaAppliance("rangehood", "#ffcc00"), new ZilkhaAppliance("toaster", "#cc99ff"), new ZilkhaAppliance("oven", "#4dc3ff")],
    this.get_appliances = function() { return this.sim_appliances; }
}

kitchen = new ZilkhaKitchen();
sim_appliances = kitchen.get_appliances();
