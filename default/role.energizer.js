var util = require('util');

var roleEnergizer = {
    targetsPerCreep: 4,
    minNum: 2,
    
    bodies: [ [WORK, MOVE, CARRY, CARRY, CARRY, CARRY], [WORK, MOVE, CARRY, CARRY, CARRY],[WORK, MOVE, CARRY, CARRY],[WORK, MOVE, CARRY] ],
    
    findParam: FIND_STRUCTURES,
    targetFilter: (s) =>  (s.energy === 0 || (s.energy && s.energy < s.energyCapacity)),
    action: (creep, thing) => creep.transfer(thing, RESOURCE_ENERGY),
    
    gather: function(creep){
        var source = creep.pos.findClosestByPath(FIND_STRUCTURES, {filter: (s) => s.structureType == STRUCTURE_CONTAINER && s.store[RESOURCE_ENERGY] > 0});
        
        if(! source){
            return util.harvestEnergy(creep);   
        } else {
            return util.withdrawEnergy(creep, source);
        }
    }
};

module.exports = roleEnergizer;