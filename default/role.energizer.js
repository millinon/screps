var util = require('util');

var roleEnergizer = {

    structsPerCreep: 2,

    findParam: FIND_STRUCTURES,
    targetFilter: (s) => util.amOwner(s) && s.structureType != STRUCTURE_CONTAINER && s.energy < s.energyCapacity,
    action: (creep, thing) => creep.transfer(thing, RESOURCE_ENERGY)
};

module.exports = roleEnergizer;