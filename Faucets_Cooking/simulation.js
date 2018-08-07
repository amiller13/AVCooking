/*FILE DEFINING APPLIANCE OBJECT AND POWER VALUES FOR SIMULATION*/

var MAX_POWER = 100000;

var simulation_power_values = { // watts 
    "fridge": [100, 100000, 12, 100], // init power, max_power, growth_rate, shrink_rate
    "light": [100, 20000, 2, 100],
    "rangehood": [100, 30000, 30, 100],
    "oven": [100, 80000, 8, 100],
    "toaster": [100, 10000, 8, 100]
};


/*object describing an Appliance, with name and corresponding color taken as arugments*/
function Appliance(name, color){
    this.name = name;
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
    
    this.switchState = function() {
        this.running = this.running ? false : true;
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

