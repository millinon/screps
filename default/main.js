var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleRepairer = require('role.repairer');
var roleEnergizer = require('role.energizer');

var roleGeneral = require('role.general');

var util = require('util');


module.exports.loop = function () {

    var bodies = [ [WORK, WORK, MOVE, MOVE, CARRY, CARRY], [WORK, MOVE, MOVE, CARRY, CARRY],[WORK, MOVE, CARRY, CARRY],[WORK, MOVE, CARRY] ];

    for(var spawn in Game.spawns){
        
        var spawn = Game.spawns[spawn];
        var doSpawn = false;
    
        var body = null;
    
        for(var i = 0; !doSpawn && i < bodies.length; i++){
            switch(spawn.canCreateCreep(bodies[i])){
                case OK:
                    body = bodies[i];
                    doSpawn = true;
                    break;
                case ERR_NOT_ENOUGH_ENERGY:
                    continue;
                default:
                    continue;
            }
        }
        
        var room = spawn.room;

        var mycreeps = room.find(FIND_MY_CREEPS);
        
        var name = Math.floor(Math.random() * 999);
        
        if(doSpawn){
            ['harvester', 'energizer', 'upgrader', 'repairer', 'builder'].forEach((value, index, array) => {
                var role = require('role.' + value);
                
                var targets = room.find(role.findParam, {filter: role.targetFilter});
        
                var creeps = mycreeps.filter((creep) => creep.memory.role == value);
                
                if(creeps.length < (targets.length / role.targetsPerCreep)){
                    spawn.createCreep(body, value.charAt(0) + name, {'role': value});
                }
            });
        }
    }
    
    
    /*var tower = Game.getObjectById('TOWER_ID');
    if(tower) {
        var closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: (structure) => structure.hits < structure.hitsMax
        });
        if(closestDamagedStructure) {
            tower.repair(closestDamagedStructure);
        }

        var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if(closestHostile) {
            tower.attack(closestHostile);
        }
    }*/

    for(var name in Game.creeps) {
        roleGeneral.run(Game.creeps[name]);
    }
}