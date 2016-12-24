var util = require('util');

var roleEnergizer = {
    tagetsPerCreep: 2,
    
    findParam: FIND_STRUCTURES,
    targetFilter: (s) => util.amOwner(s) && s.energy < s.energyCapacity,
    action: (creep, thing) => creep.transfer(thing, RESOURCE_ENERGY)
};

module.exports = roleEnergizer;