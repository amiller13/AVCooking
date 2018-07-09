var MAX_POWER = 100000;

var simulation_power_values = { // watts 
    "fridge": [100, 100000, 10, 100], // init power, max_power, growth_rate, shrink_rate
    "light": [100, 20000, 5, 100],
    "rangehood": [100, 30000, 30, 100],
    "oven": [100, 80000, 15, 100],
    "toaster": [100, 10000, 10, 100]
};


/*G: changed a lot of commas to semicolons - should I have done that? */
function Appliance(name, color){ // maybe add power information taken from config
    this.name = name;
    /*G: I added these:*/
    this.waterHeight = 0;
    this.drops = new Array();
    this.cups = 0;
    this.color = color;

    this.running = false;
    this.energy = 0;
    this.min_power = simulation_power_values[name][0];
    this.power = simulation_power_values[name][0];
    this.max_power = simulation_power_values[name][1];
    this.growth_rate = simulation_power_values[name][2];
    this.shrink_rate = simulation_power_values[name][3];
    this.switchState = function() {
        this.running = this.running ? false : true;
    };
    this.update = function() {
        if(this.running){
	    this.power = Math.min(this.power + this.growth_rate, this.max_power);
            this.energy += this.power*(REFRESH_RATE/3600000); // convert to kwh
        } else {
	    this.power = Math.max(this.power - this.shrink_rate, 0);
	}
    };
    this.get_energy = function() {
        return this.energy;
    };
    this.get_power = function() {
	return this.power;
    };
    this.get_max_power = function() {
	return MAX_POWER;
    };
    this.get_min_power = function() {
	return this.min_power;
    }
    this.get_state = function(){
	return this.running;
    }
}

