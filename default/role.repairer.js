var util = require('util');

var roleRepairer = {

    structsPerCreep: 8,

    findParam: FIND_STRUCTURES,
    targetFilter:(struct) => (struct.structureType == STRUCTURE_ROAD || (struct.owner && struct.owner.username == 'millinon' )) && struct.hits && struct.hits < struct.hitsMax,
    action: (creep, thing) => creep.repair(thing)
};

module.exports = roleRepairer;