var util = require('util');

var roleUpgrader = {
    targetsPerCreep: 0.125,
    minNum: 0,

    bodies: [ [WORK, WORK, MOVE, MOVE, CARRY, CARRY], [WORK, MOVE, MOVE, CARRY, CARRY],[WORK, MOVE, CARRY, CARRY],[WORK, MOVE, CARRY] ],

    findParam: FIND_MY_STRUCTURES,
    targetFilter: (s) => s.structureType == STRUCTURE_CONTROLLER,
    action: (creep, thing) => creep.upgradeController(thing),
    
    gather: function(creep){
        var source = creep.pos.findClosestByPath(FIND_STRUCTURES, {filter: (s) => s.structureType == STRUCTURE_CONTAINER && s.store[RESOURCE_ENERGY] > 0});
        
        if(! source){
            return util.harvestEnergy(creep);   
        } else {
            return util.withdrawEnergy(creep, source);
        }
    }
};

module.exports = roleUpgrader;