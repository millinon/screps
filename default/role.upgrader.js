var util = require('util');

var roleUpgrader = {
    targetsPerCreep: 0.5,

    findParam: FIND_MY_STRUCTURES,
    targetFilter: (s) => s.structureType == STRUCTURE_CONTROLLER,
    action: (creep, thing) => creep.upgradeController(thing)
};

module.exports = roleUpgrader;