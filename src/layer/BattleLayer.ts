class BattleLayer extends Layer {
	private world: World;
    private ship: Ship;
	private score: Score;
	
	protected onInit() {
		let stageW = this.stage.stageWidth;
        let stageH = this.stage.stageHeight;
        this.world = new World(this.layer, stageW, stageH);

        //this.world.debugDrawSprite = <egret.Sprite>tutils.createLayer(this.layer, 0x000000, 0.0);

        let ship = new Ship(40, 80);
        this.world.addShip(ship);
        ship.force.force = 1;
        ship.x = stageW * 0.5;
        ship.y = stageH - ship.height * 0.5;
        ship.speed = 50;
        //let gun = Gun.createGun(Gun);
        //let gun = Gun.createGun(SoundWaveGun);
        let gun = Gun.createGun(ShotGun);
		gun.bulletNum = 10;
		gun.bulletAngleDelta = 2;
        gun.fireInterval = 500;
        gun.bulletSpeed = 100;
        ship.addGun(gun);
        ship.gun.autofire();
        this.ship = ship;

        this.layer.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
        this.layer.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
        this.layer.touchEnabled = true;
        
        //let timer = new egret.Timer(20, 0);
        this.layer.addEventListener(egret.TimerEvent.ENTER_FRAME, this.onTimer, this);
        //timer.start();


        this.createTestEnemyShip();
        
		let score = new Score(this.layer);
		score.digits = 10;
		score.score = 0;
		score.setScore(10000, 5000);
	}

	private onTouchBegin(evt: egret.TouchEvent) {
        this.ship.move(evt.localX, evt.localY);
    }

    private onTouchMove(evt: egret.TouchEvent) {
        this.ship.move(evt.localX, evt.localY);
    }

    private onTimer(evt: egret.TimerEvent) {
        this.world.step(1000/this.stage.frameRate);
    }

	// FIXME: test
	createTestEnemyShip() {
		let n = 10;
		for (let i=0; i<n; i++) {
			let ship = new Ship(30, 60);
			this.world.addShip(ship);
			ship.force.force = 2;
			ship.hp.reset(Math.random()*10);
			ship.hp.hp = ship.hp.maxHp;
			ship.x = this.layer.width*Math.random();
			ship.y = this.layer.height*Math.random();
		}
	}
}