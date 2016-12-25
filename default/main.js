var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleRepairer = require('role.repairer');
var roleEnergizer = require('role.energizer');

var roleGeneral = require('role.general');

var util = require('util');


module.exports.loop = function () {

    var rooms = {};

    for(var spawn in Game.spawns){
        
        var spawn = Game.spawns[spawn];
        var doSpawn = ! spawn.spawning;

        var room = spawn.room;

        var mycreeps = room.find(FIND_MY_CREEPS);
        
            ['harvester', 'energizer', 'upgrader', 'repairer', 'builder', 'scavenger'].forEach((value, index, array) => {
                var role = require('role.' + value);
                
                var targets = room.find(role.findParam, {filter: role.targetFilter});
        
                var creeps = mycreeps.filter((creep) => creep.memory.role == value);

                if(doSpawn && creeps.length < Math.max(role.minNum, targets.length / role.targetsPerCreep)){
                    var body = util.chooseBody(spawn, role.bodies);
                
                    var name = value.charAt(0) + Math.floor(Math.random() * 999);
                    
                    if(body){
                        console.log('spawn: ' + spawn.createCreep(body, name, {'role': value}));
                        doSpawn = false;
                    }
                }
            });
            
            
            
        if(! rooms[room.name]){
            var towers = room.find(FIND_MY_STRUCTURES, {filter: (s) => s.structureType == STRUCTURE_TOWER});
            
            for(var index in towers){
                var tower = towers[index];

                var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
                if(closestHostile) {
                    tower.attack(closestHostile);
                }
                
                var closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
                    filter: (structure) => structure.hits < (structure.hitsMax / 0.25)
                });
                if(closestDamagedStructure) {
                    tower.repair(closestDamagedStructure);
                }
            }
            
            rooms[room.name] = true;
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