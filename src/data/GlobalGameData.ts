const GlobalConfig = {
	ver: 0,
	reset: true
}

const GlobalMaxHp = 50;  // for UI
const GlobalMaxPower = 100;  // for UI
const GlobalMaxFireRate = 10;  // for UI

const GlobalExpTable = [300, 600, 900, 1500, 2400, 3900, 6300, 10200, 16500, 26700, 43200, 69900, 113100, 183000, 296100, 479100, 775200, 1254300, 2029500, 3283800];

const GlobalAllShips: string[] = [
	//"ship_test",
	"ship_hero",
	"ship_row",
	"ship_shot",
	"ship_hunter",
	"ship_soundwave",
	"ship_energy",
	"ship_explosion",
	"ship_focus",
	"ship_missile",
];

const GlobalAllParts: string[] = [
	"part_test1",
	"part_test2",
	"part_meteoroid",
	"part_critical_2",
	"part_elec_induced_gun",
	"part_power_speed_up_2",
	"part_power_battery_2"
];

// all datas
const GlobalShipsData: ShipsData = {
	ship_test: {
		name: "测试号",
		model: "Energy_png",
		scale: 1.2,
		maxHp: 10,
		speed: 200,
		gunName: "测试炮",
		gun: SatelliteGun,
		bullet: StormBullet,
		bulletSpeed: 100,
        fireCD: 10000,
		bulletPower: 10,
		bulletNum: 3,
		bulletHitTimes: 10,
		bulletHitInterval: 1000,
		skill: "shield_ball",
		coins: 10
	},
    ship_hero: {
		name: "英雄号",
		model: "Hero_png",
		scale: 1.2,
		maxHp: 12,
		speed: 200,
		gunName: "单束粒子炮",
		gun: Gun,
		bullet: BlueWaveBullet,
		bulletSpeed: 200,
        fireCD: 100,
		bulletPower: 10,
		bulletNum: 1,
		bulletHitTimes: 1,
		bulletHitInterval: 1000,
		skill: "super_hero",
		coins: 0
	},
    ship_soundwave: {
		name: "音波使者",
		model: "SoundWave_png",
		scale: 1.2,
		maxHp: 12,
		speed: 200,
		gunName: "多重音波炮(低穿透)",
		gun: SoundWaveGun,
		bullet: SoundWaveBullet,
		bulletSpeed: 100,
        fireCD: 300,
		bulletPower: 4,
		bulletNum: 5,
		bulletHitTimes: 2,
		bulletHitInterval: 500,
		skill: "turbo_fire",
		coins: 2500
    },
    ship_energy: {
		name: "超能之翼",
		model: "Energy3_png",
		scale: 1.2,
		maxHp: 15,
		speed: 200,
		gunName: "能量波动(高穿透)",
		gun: EaseGun,
		bullet: ShakeWaveBullet,
		bulletSpeed: 100,
        fireCD: 600,
		bulletPower: 25,
		bulletNum: 1,
		bulletHitTimes: 20,
		bulletHitInterval: 200,
		skill: "shield_ball",
		coins: 2000
    },
    ship_hunter: {
		name: "赏金猎人",
		model: "OrangeFatHeroShip_png",
		scale: 0.4,
		maxHp: 16,
		speed: 200,
		gunName: "制导能量弹(制导)",
		gun: GuideGun,
		bullet: ShakeWave2Bullet,
		bulletSpeed: 150,
        fireCD: 150,
		bulletPower: 18,
		bulletNum: 1,
		bulletHitTimes: 1,
		bulletHitInterval: 1000,
		skill: "turbo_fire",
		coins: 1000
    },
    ship_explosion: {
		name: "爆破者",
		model: "Energy4_png",
		scale: 1.2,
		maxHp: 20,
		speed: 200,
		gunName: "离子炸弹(溅射)",
		gun: ExplosionGun,
		bullet: ExplosionBullet,
		bulletSpeed: 160,
        fireCD: 300,
		bulletPower: 15,
		bulletNum: 1,
		bulletHitTimes: 1,
		bulletHitInterval: 1000,
		skill: "meteoroid_rush",
		coins: 3000
    },
    ship_focus: {
		name: "和谐号",
		model: "Energy2_png",
		scale: 1.2,
		maxHp: 12,
		speed: 200,
		gunName: "聚焦粒子束(中穿透)",
		gun: FocusGun,
		bullet: BlueWaveBullet,
		bulletSpeed: 180,
        fireCD: 200,
		bulletPower: 5,
		bulletNum: 2,
		bulletHitTimes: 5,
		bulletHitInterval: 1000,
		skill: "shield_ball",
		coins: 2800
    },
    ship_row: {
		name: "开拓者",
		model: "RedHeroShip_png",
		scale: 0.4,
		maxHp: 14,
		speed: 200,
		gunName: "多重粒子炮",
		gun: RowGun,
		bullet: BlueWaveBullet,
		bulletSpeed: 160,
        fireCD: 200,
		bulletPower: 9,
		bulletNum: 2,
		bulletHitTimes: 1,
		bulletHitInterval: 1000,
		skill: "ghost_ships",
		coins: 500
    },
    ship_shot: {
		name: "游荡者",
		model: "GreenHeroShip_png",
		scale: 0.4,
		maxHp: 15,
		speed: 200,
		gunName: "发散粒子炮",
		gun: ShotGun,
		bullet: BlueWaveBullet,
		bulletSpeed: 160,
        fireCD: 300,
		bulletPower: 10,
		bulletNum: 5,
		bulletHitTimes: 1,
		bulletHitInterval: 1000,
		skill: "shield_ball",
		coins: 1200
    },
	ship_missile: {
		name: "导弹天使",
		model: "Energy_png",
		scale: 1.2,
		maxHp: 20,
		speed: 200,
		gunName: "制导导弹(制导爆炸)",
		gun: MissileGun,
		bullet: MissileBullet,
		bulletSpeed: 200,
        fireCD: 1000,
		bulletPower: 25,
		bulletNum: 3,
		bulletHitTimes: 1,
		bulletHitInterval: 1000,
		skill: "turbo_fire",
		coins: 5000
    },
};

const GlobalPartsData: PartsData = {
	part_meteoroid: {
		name: "流星之怒",
		model: "PartMeteoroid_png",
		desc: "击败敌方单位有20%几率召唤一颗流星，流星撞击敌方单位将造成200点伤害",
		buffs: ["part_meteoroid"],
	},
	part_power_speed_up_2: {
		name: "聚能回路",
		model: "PartPowerSpeedUp_png",
		desc: "收集能量的速度提升30%",
		buffs: ["part_power_speed_up_2"],
	},
	part_power_battery_2: {
		name: "蓄能器",
		model: "PartBattery_png",
		desc: "当能量耗尽时立即补充25%能量",
		buffs: ["part_power_battery_2"],
	},
	part_critical_2: {
		name: "暴击零件",
		model: "PartCritical2_png",
		desc: "击中敌方目标有20%概率对其造成200%伤害！",
		buffs: ["part_critical_2"],
	},
	part_elec_induced_gun: {
		name: "电磁发射器",
		model: "PartElecInducedGun_png",
		desc: "每5秒向前发射2枚电磁波弹，被每一枚子弹击中的目标有20%概率进入感电状态。攻击感电状态下的单位会额外附加15点感电伤害！",
		buffs: ["part_elec_induced_gun"],
	},
	part_test1: {
		name: "中级攻速零件(测试)",
		model: "PartCDRUp1_png",
		desc: "能够非常快、非常快地、超乎你想像的快，总之很快的去进行射击，通常来讲可以增加10%射速！",
		buffs: ["part_test1"],
	},
	part_test2: {
		name: "中级火力零件(测试)",
		model: "PartPowerUp1_png",
		desc: "增加10%主炮火力",
		buffs: ["part_test2"],
	}
}

const GlobalPlayerInitData: PlayPrefsData = {
	ver: GlobalConfig.ver,
    highscore: {
        score: 0,
        stage: 0,
        shipKey: "",
    },
    maxStage: 0,
    coins: 10000,
	shipsNum: 0,
    ships: {},
};
