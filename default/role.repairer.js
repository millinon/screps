var util = require('util');

var roleRepairer = {
    targetsPerCreep: 8,
    minNum: 1,

    bodies: [ [WORK, WORK, MOVE, MOVE, CARRY, CARRY], [WORK, MOVE, MOVE, CARRY, CARRY],[WORK, MOVE, CARRY, CARRY],[WORK, MOVE, CARRY] ],

    findParam: FIND_STRUCTURES,
    targetFilter:(struct) => (struct.structureType == STRUCTURE_ROAD || struct.structureType == STRUCTURE_CONTAINER || (struct.owner && struct.owner.username == 'millinon' )) && struct.hits && struct.hits < struct.hitsMax,
    action: (creep, thing) => creep.repair(thing),
    
    gather: function(creep){
        var source = creep.pos.findClosestByPath(FIND_STRUCTURES, {filter: (s) => s.structureType == STRUCTURE_CONTAINER && s.store[RESOURCE_ENERGY] > 0});
        
        if(! source){
            return util.harvestEnergy(creep);   
        } else {
            return util.withdrawEnergy(creep, source);
        }
    }
};

module.exports = roleRepairer;