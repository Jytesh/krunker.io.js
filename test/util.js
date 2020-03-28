const { util } = require('../src/index.js');
const breakLn = () => console.log('\n\n');

const settings = '{"controls":{"jumpKey":32,"crouchKey":16,"meleeKey":81,"swapKey":69,"primKey":84,"reloadKey":82,"sprayKey":70,"inspKey":88,"aimKey":67,"shootKey":-1,"chatKey":13,"voiceKey":86,"listKey":9,"interactKey":71,"interactSecKey":72,"dropKey":90,"wepVisKey":-1,"streakKeys":[49,50,51,52],"moveKeys":[87,83,65,68]},"defaultRegion":"de-fra","lang":"en","resolution":2,"updateRate":0,"aspectRatio":"1920x1500","lowSpec":false,"particles":false,"shadows":"true","ambientShading":false,"showTrails":"true","muzzleFlash":false,"sniperFlap":false,"scaleUI":0.4,"showUI":true,"dynamicHP":true,"showHitInd":true,"showDMG":true,"dmgColor":"#00ff80","critColor":"#fd53db","dmgScale":1,"showChat":true,"showKills":true,"showKillC":true,"showDeaths":"true","showStreak":"true","showMessages":true,"showUnboxings":true,"showPing":true,"showFPS":"true","showSpeed":false,"speedOffX":5,"speedOffY":5.4,"showMedals":true,"hideNames":0,"nametagStyle":0,"crosshairSho":"2","crosshairStyle":"2","crosshairImage":"","crosshairAlways":"true","crosshairColor":"#ffffff","crosshairShadow":"#000000","crosshairUseShadow":true,"crosshairLen":2,"crosshairThick":2,"sensitivityX":1,"sensitivityY":1,"aimSensitivityX":1,"aimSensitivityY":1,"fov":120,"lagComp":1.5,"scrollDir":true,"streamMode":false,"challMode":false,"invertY":false,"sensitivityXCntrl":1,"sensitivityYCntrl":1,"aimSensitivityXCntrl":1,"aimSensitivityYCntrl":1,"deadZoneL":0.3,"deadZoneR":0.25,"triggerThres":0.1,"invertYCntrl":false,"vibration":true,"sound":1,"voiceVolume":1,"fpsFOV":120,"weaponBob":1.5,"weaponLean":1,"weaponOffX":1.3,"weaponOffY":2,"weaponOffZ":2,"hideADS":"true","showWeapon":"true","showWeaponSec":"true","showWeaponMel":"true","hudHealthHigh":"#9eeb56","hudHealthLow":"#eb5656","scoreColor":"#fd53db","scoreShadow":false,"scoreScale":0.9,"scoreOffX":5,"scoreOffY":2.4,"saturation":1.5,"menuSaturation":1,"hue":0,"menuHue":0,"vignette":1,"chatOp":1,"chatBGOp":0.2,"chatTextOutline":false,"chatHeight":2.5,"depthMap":0,"greenScreen":false,"canLoadMods":"true","autoLoadLast":false,"scopeBorders":false,"customScope":"https://cdn.discordapp.com/attachments/600823822639300623/601202431354994690/PhilzGoodScope.png","customHitmarker":"https://cdn.discordapp.com/attachments/608570552768004096/618965028984455188/Waspy5Transparent.png","customADSDot":"","endMessage":"GG all!","customProfile":"https://media.discordapp.net/attachments/645211000039014414/652582827887427622/1s.png","customAmmo":"https://media2.giphy.com/media/Bap9PFewF20es/giphy.gif","customKills":"https://cdn.discordapp.com/attachments/645211000039014414/655082096972529675/postthisdog.jpg","customDeaths":"https://steamuserimages-a.akamaihd.net/ugc/918041694532765297/8485EFF4A486A3FDB2AD05246838AD86920382FF/","customStreak":"https://media2.giphy.com/media/Bap9PFewF20es/giphy.gif","useDamageOverlay":true,"customDamage":"","customTimer":"","customGameOverlay":""}';

console.log('The average damage of all weapons in the game:');
console.log(util.averageStat('weapon', 'damage'));
// 44.58
breakLn();

console.log('Our chances for getting a contraband from heroic spins with 20k KR:');
console.log(util.spinChance('heroic', 'contraband', 20000));
// 20.00
breakLn();

console.log('An array of all classes\' names in the game:');
console.log(util.classes);
/*
[
  'Triggerman', 'Hunter',
  'Run N Gun',  'Spray N Pray',
  'Vince',      'Detective',
  'Marksman',   'Rocketeer',
  'Agent',      'Runner',
  'Bowman',     'Commando'
]
*/
breakLn();

console.log('An array of all weapons\' names in the game:');
console.log(util.weapons);
/*
[
  'Assault Rifle',
  'Sniper Rifle',
  'Submachine Gun',
  'Light Machine Gun',
  'Shotgun',
  'Revolver',
  'Semi Auto',
  'Rocket Launcher',
  'FAMAS'
]
*/
breakLn();

console.log('Stringify Krunker settings JSON:');
console.log(util.stringifySettings(
	settings,
	{
		seperator: ': ', // default: ": "
		lineBreaks: 1, // default: 1
		includeControls: false, // default: true
	},
));
