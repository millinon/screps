var util = require('util');

var roleBuilder = {
    targetsPerCreep: 1,
    minNum: 0,

    bodies: [ [WORK, WORK, MOVE, MOVE, CARRY, CARRY], [WORK, MOVE, MOVE, CARRY, CARRY],[WORK, MOVE, CARRY, CARRY],[WORK, MOVE, CARRY] ],

    findParam: FIND_MY_CONSTRUCTION_SITES,
    targetFilter: (site) => site.progress < site.progressTotal,
    action: (creep,thing) => creep.build(thing),
    
    gather: function(creep){
        var source = creep.pos.findClosestByPath(FIND_STRUCTURES, {filter: (s) => s.structureType == STRUCTURE_CONTAINER && s.store[RESOURCE_ENERGY] > 0});
        
        if(! source){
            return util.harvestEnergy(creep);   
        } else {
            return util.withdrawEnergy(creep, source);
        }
    }
};

module.exports = roleBuilder;