var util = require('util');

var roleHarvester = {
    targetsPerCreep: 0.25,
    minNum: 2,

    bodies: [ [WORK, WORK, MOVE, MOVE, CARRY, CARRY], [WORK, MOVE, MOVE, CARRY, CARRY],[WORK, MOVE, CARRY, CARRY],[WORK, MOVE, CARRY] ],

    findParam: FIND_STRUCTURES,
    targetFilter: (s) => s.structureType == STRUCTURE_CONTAINER && s.store[RESOURCE_ENERGY] < s.storeCapacity,
    action: (creep, thing) => creep.transfer(thing, RESOURCE_ENERGY),
    
    gather: function(creep){
        return util.harvestEnergy(creep);
    }
};

module.exports = roleHarvester;