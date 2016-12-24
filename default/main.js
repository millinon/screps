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

        var sources = room.find(FIND_SOURCES_ACTIVE);
        var harvesters = mycreeps.filter((creep) => creep.memory.role == "harvester");
        if(doSpawn && harvesters.length < roleHarvester.numPerSource * sources.length){
            spawn.createCreep(body, "h" + name, {"role":"harvester", "carry":false});
        }
        
        
        var sinks = room.find(FIND_STRUCTURES, {filter: (struct) => 
            util.amOwner(struct) &&
            (struct.energy == 0 || struct.energy < struct.energyCapacity)
        });
        var energizers = mycreeps.filter((creep) => creep.memory.role == "energizer");
        if(doSpawn && energizers.length < sinks / roleEnergizer.structsPerCreep){
            spawn.createCreep(body, "e" + name, {"role":"energizer", "carry":false});
        }
        

        var upgraders = mycreeps.filter((creep) => creep.memory.role == "upgrader");
        if(doSpawn && upgraders.length < roleUpgrader.numTotal){
            spawn.createCreep(body, "u" + name, {"role":"upgrader"});
        }
        
        var sites = room.find(FIND_CONSTRUCTION_SITES, {filter: util.amOwner } );
        var builders = mycreeps.filter((creep) => creep.memory.role == "builder");
        if(doSpawn &&  builders.length < sites.length / roleBuilder.sitesPerCreep){
            spawn.createCreep(body, "b" + name, {"role":"builder", "building":false});
        }
        
        var structs = room.find(FIND_STRUCTURES, {filter: (struct) =>
            (struct.structureType == STRUCTURE_ROAD || util.amOwner(struct)) && 
            (struct.hits && struct.hits < struct.hitsMax)});
        var repairers = mycreeps.filter((creep) => creep.memory.role == "repairer");
        if(doSpawn && repairers.length < structs.length / roleRepairer.structsPerCreep){
            spawn.createCreep(body, "r" + name, {"role":"repairer", "repairing":false});
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