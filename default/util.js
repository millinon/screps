module.exports = {
    harvestEnergy: function(creep, source){
        if(creep.carry.energy == creep.carryCapacity){
            return true;
        }
        
        if(!source){
            source = creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE, {filter: function(source){
                var creeps = source.pos.findInRange(FIND_MY_CREEPS, 1, {filter: (c) => c.name != creep.name});
                if(creeps.length < 5) return true;
                else return false;
            }});
        }
        
        var res = creep.harvest(source);
        
        switch(creep.harvest(source)){
            case OK:
                return false;
            case ERR_NOT_IN_RANGE:
                creep.moveTo(source);
            default:
                return false;
        }
    },
    
    withdrawEnergy: function(creep, source){
            if(!source){
                source = creep.pos.findClosestByPath(FIND_STRUCTURES, {filter: (s) => s.structureType == STRUCTURE_CONTAINER && s.store[RESOURCE_ENERGY] > 0});
            }
            
            if(source){
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
            }
            return false;
    },
    
    amOwner: (thing) => !thing.owner || thing.owner.username == 'millinon',
    
    chooseBody: function(spawn, bodies){
        for(var i = 0; i < bodies.length; i++){
            switch(spawn.canCreateCreep(bodies[i])){
                case OK:
                    return bodies[i];
                
                case ERR_NOT_ENOUGH_ENERGY:
                    continue;
                    
                case ERR_RCL_NOT_ENOUGH:
                    console.log('RCL limit hit');
                    return null;
            }
        }
        
        return null;
    }
};