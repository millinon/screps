var util = require('util');

var roleScavenger = {
    targetsPerCreep: 256,
    minNum: 1,

    bodies: [ [WORK, WORK, MOVE, MOVE, CARRY, CARRY], [WORK, MOVE, MOVE, CARRY, CARRY],[WORK, MOVE, CARRY, CARRY],[WORK, MOVE, CARRY] ],

    findParam: FIND_STRUCTURES,
    targetFilter: (s) => s.structureType == STRUCTURE_CONTAINER && s.store[RESOURCE_ENERGY] < s.storeCapacity,
    action: (creep, thing) => creep.transfer(thing, RESOURCE_ENERGY),
    
    gather: function(creep){
        var resource = creep.pos.findClosestByPath(FIND_DROPPED_RESOURCES);
        
        if(resource){
            switch(creep.pickup(resource)){
                case OK:
                    return true;
                case ERR_NOT_IN_RANGE:
                    creep.moveTo(resource);
                    return false;
            }
        }
    }
};

module.exports = roleScavenger;