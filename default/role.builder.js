var util = require('util');

var roleBuilder = {
    
    sitesPerCreep: 2,

    findParam: FIND_MY_CONSTRUCTION_SITES,
    targetFilter: (site) => site.progress < site.progressTotal,
    action: (creep,thing) => creep.build(thing)
};

module.exports = roleBuilder;