var util = require('util');

module.exports = {
    run: function(creep){
        var active = creep.memory.active;
        
        var role = require('role.' + creep.memory.role);
    
        if(active){
            var target = creep.pos.findClosestByPath(role.findParam, {filter: role.targetFilter});
   
            if(target){
                switch(role.action(creep, target)){
                    case OK:
                        break;
                    
                    case ERR_NOT_IN_RANGE:
                        creep.moveTo(target);
                        break;
                        
                    case ERR_NOT_ENOUGH_RESOURCES:
                        active = false;
                        break;
                }
            } else {
                creep.say('idle');
            }
        }
        
        if(!active){
            active = role.gather(creep);
        }
        
        creep.memory.active = active;
    }
};