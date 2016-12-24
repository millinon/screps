var util = require('util');

var roleHarvester = {
    targetsPerCreep: 1,

    findParam: FIND_STRUCTURES,
    targetFilter: (s) => s.structureType == STRUCTURE_CONTAINER && s.store[RESOURCE_ENERGY] < s.storeCapacity,
    action: (creep, thing) => creep.transfer(thing, RESOURCE_ENERGY),
};

module.exports = roleHarvester;