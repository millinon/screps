module.exports = {
    harvestEnergy: function(creep){
        if(creep.carry.energy == creep.carryCapacity){
            return true;
        }
        
        var source = creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE, {filter: function(source){
            var creeps = source.pos.findInRange(FIND_CREEPS, 1, {filter: (c) => c.name != creep.name});
            if(creeps.length < 4) return true;
            else return false;
        }});
        
        switch(creep.harvest(source)){
            case OK:
                return false;
            case ERR_NOT_IN_RANGE:
                creep.moveTo(source);
            default:
                return false;
        }
    },
    
    withdrawEnergy: function(creep){
            var source = creep.pos.findClosestByPath(FIND_STRUCTURES, {filter: (s) => s.structureType == STRUCTURE_CONTAINER && s.store[RESOURCE_ENERGY] > 0});
            
            var res = creep.withdraw(source, RESOURCE_ENERGY);
            
            switch(res){
                case OK:
                    break;
                case ERR_NOT_IN_RANGE:
                    creep.moveTo(source);
                    break;
                case ERR_NOT_ENOUGH_RESOURCES:
                case ERR_FULL:
                    return true;
            }
            
            return false;
    },
    
    amOwner: (thing) => !thing.owner || thing.owner.username == 'millinon'
};